from dataclasses import dataclass


@dataclass
class Candidate:
    mint: str
    symbol: str
    pair: str
    price_native: float  # SOL per whole token
    price_usd: float
    liquidity_usd: float
    volume_h1: float
    buys_m5: int
    sells_m5: int
    change_m5: float
    change_h1: float
    age_minutes: float
    fdv: float


@dataclass
class Fill:
    mint: str
    tokens_raw: int
    sol: float  # SOL spent (buy) or received (sell), fees excluded
    signature: str = ""


@dataclass
class Position:
    id: int
    mint: str
    symbol: str
    decimals: int
    tokens_raw: int
    cost_sol: float          # cost basis of the tokens still held
    initial_cost_sol: float  # total SOL originally spent
    entry_price: float       # SOL per whole token
    peak_price: float
    entry_liquidity_usd: float
    opened_at: float
    partial_taken: bool
    realized_sol: float      # proceeds already taken (e.g. from partial TP)
    status: str              # open | closed
