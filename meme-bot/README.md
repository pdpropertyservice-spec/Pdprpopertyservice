# memebot — Solana meme-coin trading bot

Scans newly listed Solana tokens (DexScreener), screens them for rug/honeypot risk, buys momentum
through Jupiter, and manages exits automatically. **Paper mode is the default** — it uses real Jupiter
quotes but sends nothing on-chain.

## Quick start (paper)
```bash
cd meme-bot
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # tweak limits if you like
python -m memebot           # paper trading, loops every POLL_SECONDS
python -m memebot --status  # open positions + today's PnL
pytest                      # unit tests
```
Run paper mode for at least a week and read `memebot.log` before you consider live.

## Going live
1. Create a **new, dedicated wallet** (not your main one). Fund it with only what you can afford to lose
   (`BUDGET_SOL` + `RESERVE_SOL`). The bot signs locally; the key never leaves your machine.
2. Put the base58 private key in `.env` (`SOLANA_PRIVATE_KEY`), use a paid RPC, set `LIVE_TRADING=yes`.
3. `python -m memebot --live`. Run it on an always-on box (small VPS) — not a laptop that sleeps.

**Kill switch:** `touch STOP` blocks new entries immediately (open positions still get managed).
Ctrl-C stops everything; positions stay in the wallet and DB — sell manually if needed.

## What it does
| Stage | Logic |
|---|---|
| Discover | DexScreener latest profiles + boosts → SOL-quoted Solana pairs |
| Screen | age, liquidity, 1h volume, FDV, 1h/5m momentum, buy/sell ratio |
| Safety (fail-closed) | mint + freeze authority revoked (on-chain), RugCheck has no *danger* risks, Jupiter **sell route exists** and a buy→sell round trip loses < `MAX_ROUNDTRIP_LOSS_PCT` |
| Entry gates | max positions, `BUDGET_SOL`, wallet reserve, daily loss limit, N-losses-in-a-row pause, kill switch |
| Exits | stop loss, partial take-profit, trailing stop, liquidity-pull exit (<50% of entry), time stop |

## Honest limitations
- **Meme coins are a negative-expectation game for most participants.** Filters reduce obvious rugs; they
  don't create an edge. Insiders and faster bots see these tokens before DexScreener lists them. Expect
  to lose money, and expect most of the gains to come from a few trades.
- Tokens can pass every check and still be dumped by their deployer or top holders (RugCheck's holder-concentration
  flags help, but not always). Stop-losses don't protect against a pool going to zero in one block.
- Polling every 15s is slow vs. sniper bots; this is a swing/momentum bot, not a sniper.
- Written without access to live APIs in the dev sandbox: logic is unit-tested with fakes, but the HTTP/RPC
  integrations (DexScreener, RugCheck, Jupiter lite-api, transaction signing) have **not** been run against
  mainnet. Paper mode exercises the first three; the signing/sending path is only exercised in `--live`.
  Make a first live test with a tiny `POSITION_SOL` (e.g. 0.01).
- Paper balance resets on restart (positions persist).
- Not financial or tax advice; every trade is a taxable event in most jurisdictions.
