import time

import pytest

from memebot import risk, safety
from memebot.broker import PaperBroker
from memebot.config import Config
from memebot.engine import Engine
from memebot.models import Candidate, Fill
from memebot.store import Store


def cand(**kw):
    base = dict(mint="MINT" + "1" * 40, symbol="DOGE2", pair="P", price_native=1e-7, price_usd=1e-5,
                liquidity_usd=50_000, volume_h1=80_000, buys_m5=40, sells_m5=20, change_m5=3, change_h1=60,
                age_minutes=90, fdv=500_000)
    base.update(kw)
    return Candidate(**base)


@pytest.fixture
def cfg(tmp_path):
    return Config(db_path=str(tmp_path / "t.db"), stop_file=str(tmp_path / "STOP"))


@pytest.fixture
def store(cfg):
    return Store(cfg.db_path, "paper")


def open_pos(store, entry=1.0, cost=0.05, liq=50_000):
    pid = store.add_position("M" * 44, "T", 6, 1_000_000, cost, entry, liq)
    return next(p for p in store.open_positions() if p.id == pid)


# ---- entry filters ----
def test_good_candidate_passes(cfg):
    assert safety.passes_entry_filters(cand(), cfg) is None


@pytest.mark.parametrize("kw", [
    dict(liquidity_usd=1000), dict(age_minutes=2), dict(age_minutes=5000), dict(change_h1=900),
    dict(change_h1=-5), dict(buys_m5=5, sells_m5=20), dict(volume_h1=100), dict(fdv=9e9), dict(change_m5=-4),
    dict(buys_m5=3, sells_m5=1),  # too few trades to trust
])
def test_bad_candidates_rejected(cfg, kw):
    assert safety.passes_entry_filters(cand(**kw), cfg) is not None


# ---- exits ----
def test_stop_loss(cfg, store):
    p = open_pos(store)
    assert risk.exit_decision(p, 0.65, 50_000, time.time(), cfg).sell_fraction == 1.0
    assert risk.exit_decision(p, 0.8, 50_000, time.time(), cfg) is None


def test_take_profit_partial_once(cfg, store):
    p = open_pos(store)
    d = risk.exit_decision(p, 2.1, 50_000, time.time(), cfg)
    assert d.sell_fraction == cfg.tp_sell_fraction
    p.partial_taken = True
    assert risk.exit_decision(p, 2.1, 50_000, time.time(), cfg) is None


def test_trailing_stop_only_after_activation(cfg, store):
    p = open_pos(store)
    p.peak_price = 1.2  # +20% peak < activation
    assert risk.exit_decision(p, 0.88, 50_000, time.time(), cfg) is None
    p.peak_price = 1.8  # +80% peak, now down >25% from peak
    assert "trailing" in risk.exit_decision(p, 1.3, 50_000, time.time(), cfg).reason


def test_liquidity_pull_and_time_stop(cfg, store):
    p = open_pos(store)
    assert "liquidity" in risk.exit_decision(p, 1.0, 10_000, time.time(), cfg).reason
    assert "time" in risk.exit_decision(p, 1.0, 50_000, time.time() + 3 * 3600, cfg).reason


# ---- portfolio risk ----
def test_entry_gates(cfg, store, tmp_path):
    assert risk.entry_allowed(cfg, store, 1.0) is None
    assert "reserve" in risk.entry_allowed(cfg, store, 0.06)
    (tmp_path / "STOP").write_text("")
    assert "kill switch" in risk.entry_allowed(cfg, store, 1.0)


def test_max_positions_and_budget(cfg, store):
    cfg.max_open_positions = 2
    for i in range(2):
        store.add_position(f"M{i}", "T", 6, 1, 0.05, 1.0, 1)
    assert "max open" in risk.entry_allowed(cfg, store, 1.0)
    cfg.max_open_positions = 10
    cfg.budget_sol = 0.12
    assert "budget" in risk.entry_allowed(cfg, store, 1.0)


def test_daily_loss_limit_and_loss_streak(cfg, store):
    for i in range(4):
        pid = store.add_position(f"M{i}", "T", 6, 1, 0.05, 1.0, 1)
        store.close(next(p for p in store.open_positions() if p.id == pid), 0.02, "stop")  # -0.03 each
    assert "losses in a row" in risk.entry_allowed(cfg, store, 1.0)
    cfg.max_consecutive_losses = 99
    cfg.daily_loss_limit_sol = 0.1
    assert "daily loss" in risk.entry_allowed(cfg, store, 1.0)


def test_pnl_includes_partial_proceeds(store):
    p = open_pos(store, cost=0.10)
    store.record_partial(p.id, 500_000, 0.05, 0.12)  # sold half for 0.12
    p = store.open_positions()[0]
    assert store.close(p, 0.03, "x") == pytest.approx(0.12 + 0.03 - 0.10)


# ---- engine end-to-end with fakes ----
class FakeJup:
    def buy_quote(self, mint, sol): return {"outAmount": str(int(sol * 1e9 * 10))}  # 10 tokens(9dec) per lamport-ish
    def sell_quote(self, mint, raw): return {"outAmount": str(int(raw / 10 * self.sell_mult))}
    sell_mult = 1.0


class FakeRpc:
    def mint_info(self, m): return {"decimals": 6, "mintAuthority": None, "freezeAuthority": None}


def make_engine(cfg, store, c, jup=None, rpc=None, rugcheck=lambda m: None, pair_price=None):
    jup = jup or FakeJup()
    pairs = lambda mints: {m: {"priceNative": str(pair_price[0]), "liquidity": {"usd": pair_price[1]}} for m in mints}
    return Engine(cfg, store, PaperBroker(jup, 1.0), jup, rpc or FakeRpc(),
                  discover=lambda: [c], pairs_for=pairs, rugcheck=rugcheck)


def test_engine_buys_then_stops_out(cfg, store):
    c = cand()
    e = make_engine(cfg, store, c, pair_price=(0, 50_000))
    e.scan()
    [pos] = store.open_positions()
    assert pos.cost_sol == cfg.position_sol
    e.pairs_for = lambda mints: {m: {"priceNative": str(pos.entry_price * 0.5), "liquidity": {"usd": 50_000}} for m in mints}
    e.monitor()
    assert store.open_positions() == []
    row = store.db.execute("SELECT status, close_reason FROM positions").fetchone()
    assert row["status"] == "closed" and "stop loss" in row["close_reason"]


def test_engine_rejects_unrevoked_mint_and_rugcheck(cfg, store):
    class BadRpc:
        def mint_info(self, m): return {"decimals": 6, "mintAuthority": "X", "freezeAuthority": None}
    make_engine(cfg, store, cand(), rpc=BadRpc(), pair_price=(1, 1)).scan()
    assert store.open_positions() == []
    store2 = Store(cfg.db_path + "2", "paper")
    make_engine(cfg, store2, cand(), rugcheck=lambda m: "rugcheck danger: x", pair_price=(1, 1)).scan()
    assert store2.open_positions() == []


def test_engine_rejects_honeypot_roundtrip(cfg, store):
    j = FakeJup(); j.sell_mult = 0.5  # lose 50% round trip
    make_engine(cfg, store, cand(), jup=j, pair_price=(1, 1)).scan()
    assert store.open_positions() == []


def test_engine_rejects_no_sell_route(cfg, store):
    class NoSell(FakeJup):
        def sell_quote(self, *a): return None
    make_engine(cfg, store, cand(), jup=NoSell(), pair_price=(1, 1)).scan()
    assert store.open_positions() == []


def test_failed_sell_keeps_position_open(cfg, store):
    e = make_engine(cfg, store, cand(), pair_price=(0, 50_000))
    e.scan()
    pos = store.open_positions()[0]
    e.broker.sell = lambda *a: None
    e.pairs_for = lambda mints: {m: {"priceNative": str(pos.entry_price * 0.1), "liquidity": {"usd": 50_000}} for m in mints}
    e.monitor()
    assert len(store.open_positions()) == 1
