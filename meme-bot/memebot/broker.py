import logging

from solders.keypair import Keypair
from solders.transaction import VersionedTransaction

from .config import LAMPORTS
from .jupiter import Jupiter
from .models import Fill
from .rpc import Rpc

log = logging.getLogger("broker")


class PaperBroker:
    """Fills at real Jupiter quotes (so slippage/price impact are realistic) but sends nothing on-chain."""

    def __init__(self, jup: Jupiter, start_sol: float):
        self.jup = jup
        self.balance = start_sol

    def sol_balance(self) -> float:
        return self.balance

    def buy(self, mint: str, sol: float) -> Fill | None:
        q = self.jup.buy_quote(mint, sol)
        if not q or sol > self.balance:
            return None
        self.balance -= sol
        return Fill(mint, int(q["outAmount"]), sol, "paper")

    def sell(self, mint: str, tokens_raw: int) -> Fill | None:
        q = self.jup.sell_quote(mint, tokens_raw)
        if not q:
            return None
        sol = int(q["outAmount"]) / LAMPORTS
        self.balance += sol
        return Fill(mint, tokens_raw, sol, "paper")


class LiveBroker:
    def __init__(self, jup: Jupiter, rpc: Rpc, private_key_b58: str):
        self.jup, self.rpc = jup, rpc
        self.kp = Keypair.from_base58_string(private_key_b58)
        self.pubkey = str(self.kp.pubkey())

    def sol_balance(self) -> float:
        return self.rpc.sol_balance(self.pubkey)

    def _swap(self, quote: dict) -> str:
        raw = VersionedTransaction.from_bytes(self.jup.swap_tx(quote, self.pubkey))
        signed = VersionedTransaction(raw.message, [self.kp])
        return self.rpc.send_and_confirm(bytes(signed))

    def buy(self, mint: str, sol: float) -> Fill | None:
        q = self.jup.buy_quote(mint, sol)
        if not q:
            return None
        before_tokens = self.rpc.token_balance_raw(self.pubkey, mint)
        sig = self._swap(q)
        got = self.rpc.token_balance_raw(self.pubkey, mint) - before_tokens
        if got <= 0:  # RPC lag: fall back to quoted amount rather than orphaning the position
            log.warning("could not read post-buy balance, using quote outAmount")
            got = int(q["outAmount"])
        return Fill(mint, got, sol, sig)

    def sell(self, mint: str, tokens_raw: int) -> Fill | None:
        q = self.jup.sell_quote(mint, tokens_raw)
        if not q:
            return None
        before = self.rpc.sol_balance(self.pubkey)
        sig = self._swap(q)
        after = self.rpc.sol_balance(self.pubkey)
        received = after - before if after > before else int(q["outAmount"]) / LAMPORTS
        return Fill(mint, tokens_raw, received, sig)
