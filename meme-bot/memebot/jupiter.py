import base64
import logging
import time

import requests

from .config import LAMPORTS, SOL_MINT

log = logging.getLogger("jupiter")


class Jupiter:
    def __init__(self, base: str, slippage_bps: int, priority_fee_lamports: int):
        self.base = base.rstrip("/")
        self.slippage_bps = slippage_bps
        self.priority_fee = priority_fee_lamports
        self.s = requests.Session()

    def quote(self, in_mint: str, out_mint: str, amount: int) -> dict | None:
        for attempt in range(3):
            try:
                r = self.s.get(f"{self.base}/quote", timeout=10, params={
                    "inputMint": in_mint, "outputMint": out_mint, "amount": amount,
                    "slippageBps": self.slippage_bps, "restrictIntermediateTokens": "true",
                })
                if r.status_code == 429:
                    time.sleep(1 + attempt)
                    continue
                if r.status_code != 200:
                    log.info("quote %s->%s rejected: %s", in_mint[:6], out_mint[:6], r.text[:120])
                    return None
                return r.json()
            except requests.RequestException as e:
                log.warning("quote error: %s", e)
        return None

    def buy_quote(self, mint: str, sol: float) -> dict | None:
        return self.quote(SOL_MINT, mint, int(sol * LAMPORTS))

    def sell_quote(self, mint: str, tokens_raw: int) -> dict | None:
        return self.quote(mint, SOL_MINT, tokens_raw)

    def swap_tx(self, quote: dict, user_pubkey: str) -> bytes:
        r = self.s.post(f"{self.base}/swap", timeout=15, json={
            "quoteResponse": quote, "userPublicKey": user_pubkey, "wrapAndUnwrapSol": True,
            "dynamicComputeUnitLimit": True, "prioritizationFeeLamports": self.priority_fee,
        })
        r.raise_for_status()
        return base64.b64decode(r.json()["swapTransaction"])
