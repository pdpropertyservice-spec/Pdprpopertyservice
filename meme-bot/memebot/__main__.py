import argparse
import logging
import os
import sys
import time

from .broker import LiveBroker, PaperBroker
from .config import Config
from .engine import Engine
from .jupiter import Jupiter
from .rpc import Rpc
from .store import Store


def load_dotenv(path=".env"):
    if not os.path.exists(path):
        return
    for line in open(path):
        line = line.split("#", 1)[0].strip()
        if "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())


def main():
    ap = argparse.ArgumentParser(prog="memebot", description="Solana meme-coin trading bot (paper mode by default)")
    ap.add_argument("--live", action="store_true", help="trade real funds (also requires LIVE_TRADING=yes)")
    ap.add_argument("--once", action="store_true", help="run a single scan/monitor cycle and exit")
    ap.add_argument("--status", action="store_true", help="print open positions and PnL, then exit")
    args = ap.parse_args()

    load_dotenv()
    cfg = Config.from_env()
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s",
                        handlers=[logging.StreamHandler(), logging.FileHandler("memebot.log")])
    log = logging.getLogger("main")

    mode = "live" if args.live else "paper"
    store = Store(cfg.db_path, mode)
    if args.status:
        for p in store.open_positions():
            print(f"{p.symbol:10} cost {p.cost_sol:.3f} SOL  opened {time.ctime(p.opened_at)}  {p.mint}")
        print(f"realized PnL today ({mode}): {store.realized_pnl_today():+.4f} SOL")
        return

    jup = Jupiter(cfg.jupiter_base, cfg.slippage_bps, cfg.priority_fee_lamports)
    rpc = Rpc(cfg.solana_rpc_url)
    if args.live:
        if os.environ.get("LIVE_TRADING", "").lower() != "yes":
            sys.exit("Refusing to trade live: set LIVE_TRADING=yes in .env to confirm.")
        if not cfg.solana_private_key:
            sys.exit("SOLANA_PRIVATE_KEY not set.")
        broker = LiveBroker(jup, rpc, cfg.solana_private_key)
        log.warning("LIVE MODE wallet %s balance %.4f SOL budget %.2f SOL", broker.pubkey, broker.sol_balance(), cfg.budget_sol)
    else:
        broker = PaperBroker(jup, cfg.paper_start_sol)
        log.info("PAPER MODE (no real trades). Use --live to trade real funds.")

    engine = Engine(cfg, store, broker, jup, rpc)
    while True:
        try:
            engine.tick()
        except Exception:
            log.exception("tick failed")
        if args.once:
            break
        time.sleep(cfg.poll_seconds)


if __name__ == "__main__":
    main()
