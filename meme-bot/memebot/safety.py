"""Pre-trade checks. Everything fails CLOSED: if a check can't be completed, we don't buy."""
import logging
from dataclasses import dataclass

import requests

from .config import Config
from .jupiter import Jupiter
from .models import Candidate
from .rpc import Rpc

log = logging.getLogger("safety")


@dataclass
class Verdict:
    ok: bool
    reason: str = ""
    decimals: int = 0
    tokens_raw_est: int = 0


def passes_entry_filters(c: Candidate, cfg: Config) -> str | None:
    """Pure momentum/liquidity screen. Returns rejection reason or None."""
    if not (cfg.min_age_minutes <= c.age_minutes <= cfg.max_age_minutes):
        return f"age {c.age_minutes:.0f}m"
    if c.liquidity_usd < cfg.min_liquidity_usd:
        return f"liquidity ${c.liquidity_usd:,.0f}"
    if c.volume_h1 < cfg.min_volume_h1_usd:
        return f"volume_h1 ${c.volume_h1:,.0f}"
    if c.fdv and c.fdv > cfg.max_fdv_usd:
        return f"fdv ${c.fdv:,.0f}"
    if not (cfg.min_change_h1_pct <= c.change_h1 <= cfg.max_change_h1_pct):
        return f"change_h1 {c.change_h1:.0f}%"
    if c.change_m5 < 0:
        return f"negative m5 {c.change_m5:.1f}%"
    ratio = c.buys_m5 / max(c.sells_m5, 1)
    if c.buys_m5 + c.sells_m5 < 10 or ratio < cfg.min_buy_sell_ratio_m5:
        return f"m5 buys/sells {c.buys_m5}/{c.sells_m5}"
    return None


def rugcheck_danger(mint: str) -> str | None:
    """Returns a reason string if RugCheck flags danger-level risks (or is unreachable)."""
    try:
        r = requests.get(f"https://api.rugcheck.xyz/v1/tokens/{mint}/report/summary", timeout=10)
        r.raise_for_status()
        risks = r.json().get("risks") or []
    except (requests.RequestException, ValueError) as e:
        return f"rugcheck unavailable ({e.__class__.__name__})"
    danger = [x.get("name", "?") for x in risks if x.get("level") == "danger"]
    return "rugcheck danger: " + ", ".join(danger) if danger else None


def check_token(c: Candidate, cfg: Config, rpc: Rpc, jup: Jupiter, rugcheck=rugcheck_danger) -> Verdict:
    try:
        info = rpc.mint_info(c.mint)
    except Exception as e:
        return Verdict(False, f"mint lookup failed: {e}")
    if not info:
        return Verdict(False, "not a standard SPL mint")
    if info.get("mintAuthority"):
        return Verdict(False, "mint authority not revoked")
    if info.get("freezeAuthority"):
        return Verdict(False, "freeze authority not revoked")

    reason = rugcheck(c.mint)
    if reason:
        return Verdict(False, reason)

    # Honeypot / tax / thin-pool test: simulate buy then immediately selling what we'd receive.
    buy = jup.buy_quote(c.mint, cfg.position_sol)
    if not buy:
        return Verdict(False, "no buy route")
    out_raw = int(buy["outAmount"])
    sell = jup.sell_quote(c.mint, out_raw)
    if not sell:
        return Verdict(False, "no SELL route (possible honeypot)")
    back = int(sell["outAmount"]) / 1e9
    loss_pct = (1 - back / cfg.position_sol) * 100
    if loss_pct > cfg.max_roundtrip_loss_pct:
        return Verdict(False, f"round-trip loss {loss_pct:.0f}% (tax/impact)")
    return Verdict(True, "ok", decimals=int(info["decimals"]), tokens_raw_est=out_raw)
