import os
from dataclasses import dataclass, fields

SOL_MINT = "So11111111111111111111111111111111111111112"
LAMPORTS = 1_000_000_000


@dataclass
class Config:
    solana_private_key: str = ""
    solana_rpc_url: str = "https://api.mainnet-beta.solana.com"

    budget_sol: float = 1.0
    position_sol: float = 0.05
    max_open_positions: int = 4
    daily_loss_limit_sol: float = 0.2
    max_consecutive_losses: int = 4
    reserve_sol: float = 0.02

    stop_loss_pct: float = 30
    take_profit_pct: float = 100
    tp_sell_fraction: float = 0.5
    trail_activate_pct: float = 40
    trail_pct: float = 25
    max_hold_minutes: float = 120

    min_liquidity_usd: float = 15000
    min_volume_h1_usd: float = 20000
    min_age_minutes: float = 15
    max_age_minutes: float = 720
    min_buy_sell_ratio_m5: float = 1.2
    min_change_h1_pct: float = 10
    max_change_h1_pct: float = 300
    max_fdv_usd: float = 5_000_000

    slippage_bps: int = 300
    max_roundtrip_loss_pct: float = 20
    priority_fee_lamports: int = 200000
    poll_seconds: float = 15

    db_path: str = "memebot.db"
    stop_file: str = "STOP"
    jupiter_base: str = "https://lite-api.jup.ag/swap/v1"
    paper_start_sol: float = 1.0

    @classmethod
    def from_env(cls, env=None) -> "Config":
        env = os.environ if env is None else env
        kwargs = {}
        for f in fields(cls):
            raw = env.get(f.name.upper())
            if raw is None or raw == "":
                continue
            kwargs[f.name] = f.type(raw) if callable(f.type) else raw
        return cls(**kwargs)
