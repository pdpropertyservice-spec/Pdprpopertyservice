import logging
import time

import requests

from .models import Candidate

log = logging.getLogger("discovery")
DEX = "https://api.dexscreener.com"


def _get(url, timeout=10):
    r = requests.get(url, timeout=timeout, headers={"accept": "application/json"})
    r.raise_for_status()
    return r.json()


def pairs_for(mints: list[str]) -> dict[str, dict]:
    """Best SOL-quoted pair (by liquidity) per mint. DexScreener allows 30 addresses per call."""
    best: dict[str, dict] = {}
    for i in range(0, len(mints), 30):
        chunk = mints[i:i + 30]
        try:
            data = _get(f"{DEX}/tokens/v1/solana/{','.join(chunk)}")
        except requests.RequestException as e:
            log.warning("dexscreener pairs fetch failed: %s", e)
            continue
        for p in data or []:
            if p.get("quoteToken", {}).get("address") != "So11111111111111111111111111111111111111112":
                continue
            m = p["baseToken"]["address"]
            liq = (p.get("liquidity") or {}).get("usd") or 0
            if m not in best or liq > (best[m].get("liquidity") or {}).get("usd", 0):
                best[m] = p
    return best


def to_candidate(p: dict, now: float | None = None) -> Candidate | None:
    try:
        now = now or time.time()
        created = p.get("pairCreatedAt")
        if not created:
            return None
        tx5 = (p.get("txns") or {}).get("m5") or {}
        ch = p.get("priceChange") or {}
        return Candidate(
            mint=p["baseToken"]["address"], symbol=p["baseToken"].get("symbol", "?"),
            pair=p["pairAddress"], price_native=float(p["priceNative"]), price_usd=float(p.get("priceUsd") or 0),
            liquidity_usd=float((p.get("liquidity") or {}).get("usd") or 0),
            volume_h1=float((p.get("volume") or {}).get("h1") or 0),
            buys_m5=int(tx5.get("buys", 0)), sells_m5=int(tx5.get("sells", 0)),
            change_m5=float(ch.get("m5") or 0), change_h1=float(ch.get("h1") or 0),
            age_minutes=(now - created / 1000) / 60, fdv=float(p.get("fdv") or 0),
        )
    except (KeyError, TypeError, ValueError):
        return None


def discover() -> list[Candidate]:
    """Pull recently listed / promoted Solana tokens and enrich with pair stats."""
    mints: list[str] = []
    for path in ("/token-profiles/latest/v1", "/token-boosts/latest/v1"):
        try:
            for t in _get(DEX + path):
                if t.get("chainId") == "solana" and t["tokenAddress"] not in mints:
                    mints.append(t["tokenAddress"])
        except requests.RequestException as e:
            log.warning("dexscreener %s failed: %s", path, e)
    out = []
    for p in pairs_for(mints).values():
        c = to_candidate(p)
        if c:
            out.append(c)
    return out
