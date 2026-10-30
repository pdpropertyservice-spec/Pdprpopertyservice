import os
from dataclasses import dataclass

from .config import Config
from .models import Position
from .store import Store


@dataclass
class ExitDecision:
    sell_fraction: float  # 1.0 = close, 0<x<1 = partial
    reason: str


def entry_allowed(cfg: Config, store: Store, wallet_sol: float) -> str | None:
    """Portfolio-level gate. Returns reason to block new entries, else None."""
    if os.path.exists(cfg.stop_file):
        return f"kill switch ({cfg.stop_file} file present)"
    open_pos = store.open_positions()
    if len(open_pos) >= cfg.max_open_positions:
        return "max open positions"
    deployed = sum(p.cost_sol for p in open_pos)
    if deployed + cfg.position_sol > cfg.budget_sol:
        return "budget exhausted"
    if wallet_sol - cfg.position_sol < cfg.reserve_sol:
        return "wallet below reserve"
    if store.realized_pnl_today() <= -cfg.daily_loss_limit_sol:
        return "daily loss limit hit"
    recent = store.recent_closed_pnls(cfg.max_consecutive_losses)
    if len(recent) == cfg.max_consecutive_losses and all(p < 0 for p in recent):
        return f"{cfg.max_consecutive_losses} losses in a row — paused (delete losing rows or restart after review)"
    return None


def exit_decision(pos: Position, price: float, liquidity_usd: float, now: float, cfg: Config) -> ExitDecision | None:
    gain = (price / pos.entry_price - 1) * 100
    peak_gain = (max(pos.peak_price, price) / pos.entry_price - 1) * 100
    peak = max(pos.peak_price, price)

    if liquidity_usd and pos.entry_liquidity_usd and liquidity_usd < 0.5 * pos.entry_liquidity_usd:
        return ExitDecision(1.0, f"liquidity pulled ({liquidity_usd:,.0f} vs {pos.entry_liquidity_usd:,.0f})")
    if gain <= -cfg.stop_loss_pct:
        return ExitDecision(1.0, f"stop loss {gain:.0f}%")
    if peak_gain >= cfg.trail_activate_pct and price <= peak * (1 - cfg.trail_pct / 100):
        return ExitDecision(1.0, f"trailing stop (peak +{peak_gain:.0f}%, now {gain:+.0f}%)")
    if not pos.partial_taken and gain >= cfg.take_profit_pct:
        return ExitDecision(cfg.tp_sell_fraction, f"take profit +{gain:.0f}%")
    if (now - pos.opened_at) / 60 >= cfg.max_hold_minutes:
        return ExitDecision(1.0, f"time stop ({cfg.max_hold_minutes:.0f}m, {gain:+.0f}%)")
    return None
