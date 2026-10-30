import sqlite3
import time
from datetime import datetime, timezone

from .models import Position

SCHEMA = """
CREATE TABLE IF NOT EXISTS positions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mint TEXT NOT NULL, symbol TEXT, decimals INTEGER,
  tokens_raw TEXT NOT NULL, cost_sol REAL, initial_cost_sol REAL, entry_price REAL, peak_price REAL,
  entry_liquidity_usd REAL, opened_at REAL, partial_taken INTEGER DEFAULT 0,
  realized_sol REAL DEFAULT 0, status TEXT DEFAULT 'open',
  closed_at REAL, pnl_sol REAL, close_reason TEXT, mode TEXT
);
CREATE TABLE IF NOT EXISTS seen (mint TEXT PRIMARY KEY, ts REAL, verdict TEXT);
"""


def _row_to_pos(r) -> Position:
    return Position(
        id=r["id"], mint=r["mint"], symbol=r["symbol"], decimals=r["decimals"],
        tokens_raw=int(r["tokens_raw"]), cost_sol=r["cost_sol"], initial_cost_sol=r["initial_cost_sol"], entry_price=r["entry_price"],
        peak_price=r["peak_price"], entry_liquidity_usd=r["entry_liquidity_usd"],
        opened_at=r["opened_at"], partial_taken=bool(r["partial_taken"]),
        realized_sol=r["realized_sol"], status=r["status"],
    )


class Store:
    def __init__(self, path: str, mode: str = "paper"):
        self.db = sqlite3.connect(path)
        self.db.row_factory = sqlite3.Row
        self.db.executescript(SCHEMA)
        self.mode = mode

    def open_positions(self) -> list[Position]:
        rows = self.db.execute("SELECT * FROM positions WHERE status='open' AND mode=?", (self.mode,))
        return [_row_to_pos(r) for r in rows]

    def add_position(self, mint, symbol, decimals, tokens_raw, cost_sol, entry_price, liquidity_usd) -> int:
        cur = self.db.execute(
            "INSERT INTO positions (mint,symbol,decimals,tokens_raw,cost_sol,initial_cost_sol,entry_price,peak_price,"
            "entry_liquidity_usd,opened_at,mode) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            (mint, symbol, decimals, str(tokens_raw), cost_sol, cost_sol, entry_price, entry_price,
             liquidity_usd, time.time(), self.mode),
        )
        self.db.commit()
        return cur.lastrowid

    def update_peak(self, pos_id: int, peak: float):
        self.db.execute("UPDATE positions SET peak_price=? WHERE id=?", (peak, pos_id))
        self.db.commit()

    def record_partial(self, pos_id: int, tokens_left: int, cost_left: float, proceeds: float):
        self.db.execute(
            "UPDATE positions SET tokens_raw=?, cost_sol=?, realized_sol=realized_sol+?, partial_taken=1 WHERE id=?",
            (str(tokens_left), cost_left, proceeds, pos_id),
        )
        self.db.commit()

    def close(self, pos: Position, proceeds: float, reason: str):
        pnl = pos.realized_sol + proceeds - pos.initial_cost_sol
        self.db.execute(
            "UPDATE positions SET status='closed', closed_at=?, pnl_sol=?, close_reason=?, tokens_raw='0' WHERE id=?",
            (time.time(), pnl, reason, pos.id),
        )
        self.db.commit()
        return pnl

    def mark_seen(self, mint: str, verdict: str):
        self.db.execute("INSERT OR REPLACE INTO seen VALUES (?,?,?)", (mint, time.time(), verdict))
        self.db.commit()

    def was_seen(self, mint: str, retry_after_s: float = 1800) -> bool:
        r = self.db.execute("SELECT ts, verdict FROM seen WHERE mint=?", (mint,)).fetchone()
        if not r:
            return False
        # rejected tokens get re-evaluated after a while (momentum / liquidity change); entered ones never
        return r["verdict"] == "entered" or time.time() - r["ts"] < retry_after_s

    def held_before(self, mint: str) -> bool:
        return self.db.execute("SELECT 1 FROM positions WHERE mint=? AND mode=?", (mint, self.mode)).fetchone() is not None

    def realized_pnl_today(self) -> float:
        start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0).timestamp()
        r = self.db.execute(
            "SELECT COALESCE(SUM(pnl_sol),0) s FROM positions WHERE status='closed' AND closed_at>=? AND mode=?",
            (start, self.mode),
        ).fetchone()
        return r["s"]

    def recent_closed_pnls(self, n: int) -> list[float]:
        rows = self.db.execute(
            "SELECT pnl_sol FROM positions WHERE status='closed' AND mode=? ORDER BY closed_at DESC LIMIT ?",
            (self.mode, n),
        )
        return [r["pnl_sol"] for r in rows]
