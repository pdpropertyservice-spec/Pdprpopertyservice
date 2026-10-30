import logging
import time

from . import discovery, risk, safety
from .config import LAMPORTS, Config
from .jupiter import Jupiter
from .rpc import Rpc
from .store import Store

log = logging.getLogger("engine")


class Engine:
    def __init__(self, cfg: Config, store: Store, broker, jup: Jupiter, rpc: Rpc,
                 discover=discovery.discover, pairs_for=discovery.pairs_for, rugcheck=safety.rugcheck_danger,
                 clock=time.time):
        self.cfg, self.store, self.broker, self.jup, self.rpc = cfg, store, broker, jup, rpc
        self.discover, self.pairs_for, self.rugcheck, self.clock = discover, pairs_for, rugcheck, clock

    def tick(self):
        self.monitor()
        self.scan()

    # ---- exits ----
    def _price(self, pos, pair) -> tuple[float, float] | None:
        if pair:
            return float(pair["priceNative"]), float((pair.get("liquidity") or {}).get("usd") or 0)
        q = self.jup.sell_quote(pos.mint, pos.tokens_raw)  # fallback: what we could actually get right now
        if q:
            return int(q["outAmount"]) / LAMPORTS / (pos.tokens_raw / 10 ** pos.decimals), 0.0
        return None

    def monitor(self):
        positions = self.store.open_positions()
        if not positions:
            return
        pairs = self.pairs_for([p.mint for p in positions])
        for pos in positions:
            px = self._price(pos, pairs.get(pos.mint))
            if not px:
                log.warning("%s: no price available, will retry", pos.symbol)
                continue
            price, liq = px
            if price > pos.peak_price:
                self.store.update_peak(pos.id, price)
            d = risk.exit_decision(pos, price, liq, self.clock(), self.cfg)
            log.info("%s %+.1f%% (peak %+.1f%%)", pos.symbol, (price / pos.entry_price - 1) * 100,
                     (max(price, pos.peak_price) / pos.entry_price - 1) * 100)
            if d:
                self._sell(pos, d)

    def _sell(self, pos, d: risk.ExitDecision):
        amount = pos.tokens_raw if d.sell_fraction >= 1 else int(pos.tokens_raw * d.sell_fraction)
        try:
            fill = self.broker.sell(pos.mint, amount)
        except Exception as e:
            log.error("SELL FAILED %s: %s (will retry next tick)", pos.symbol, e)
            return
        if not fill:
            log.error("SELL FAILED %s: no route (will retry next tick)", pos.symbol)
            return
        if d.sell_fraction >= 1:
            pnl = self.store.close(pos, fill.sol, d.reason)
            log.info("CLOSED %s | %s | received %.4f SOL | PnL %+.4f SOL", pos.symbol, d.reason, fill.sol, pnl)
        else:
            cost_left = pos.cost_sol * (1 - d.sell_fraction)
            self.store.record_partial(pos.id, pos.tokens_raw - amount, cost_left, fill.sol)
            log.info("PARTIAL %s | %s | received %.4f SOL", pos.symbol, d.reason, fill.sol)

    # ---- entries ----
    def scan(self):
        block = risk.entry_allowed(self.cfg, self.store, self.broker.sol_balance())
        if block:
            log.info("entries blocked: %s", block)
            return
        for c in sorted(self.discover(), key=lambda c: c.change_h1, reverse=True):
            if self.store.held_before(c.mint) or self.store.was_seen(c.mint):
                continue
            if safety.passes_entry_filters(c, self.cfg):
                continue
            v = safety.check_token(c, self.cfg, self.rpc, self.jup, self.rugcheck)
            if not v.ok:
                log.info("reject %s (%s): %s", c.symbol, c.mint[:6], v.reason)
                self.store.mark_seen(c.mint, "rejected")
                continue
            if risk.entry_allowed(self.cfg, self.store, self.broker.sol_balance()):
                return
            try:
                fill = self.broker.buy(c.mint, self.cfg.position_sol)
            except Exception as e:
                log.error("BUY FAILED %s: %s", c.symbol, e)
                self.store.mark_seen(c.mint, "rejected")
                continue
            if not fill:
                self.store.mark_seen(c.mint, "rejected")
                continue
            price = fill.sol / (fill.tokens_raw / 10 ** v.decimals)
            self.store.add_position(c.mint, c.symbol, v.decimals, fill.tokens_raw, fill.sol, price, c.liquidity_usd)
            self.store.mark_seen(c.mint, "entered")
            log.info("BOUGHT %s (%s) %.3f SOL @ %.3e | liq $%.0f vol1h $%.0f +%.0f%%/1h",
                     c.symbol, c.mint, fill.sol, price, c.liquidity_usd, c.volume_h1, c.change_h1)
