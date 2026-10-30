import base64
import time

import requests


class Rpc:
    def __init__(self, url: str):
        self.url = url
        self.s = requests.Session()

    def call(self, method: str, params: list):
        r = self.s.post(self.url, json={"jsonrpc": "2.0", "id": 1, "method": method, "params": params}, timeout=15)
        r.raise_for_status()
        j = r.json()
        if "error" in j:
            raise RuntimeError(f"rpc {method}: {j['error']}")
        return j["result"]

    def mint_info(self, mint: str) -> dict | None:
        """Parsed SPL mint: decimals, mintAuthority, freezeAuthority. None if not a mint."""
        v = self.call("getAccountInfo", [mint, {"encoding": "jsonParsed"}])["value"]
        if not v or not isinstance(v["data"], dict):
            return None
        parsed = v["data"].get("parsed", {})
        return parsed.get("info") if parsed.get("type") == "mint" else None

    def sol_balance(self, owner: str) -> float:
        return self.call("getBalance", [owner, {"commitment": "confirmed"}])["value"] / 1e9

    def token_balance_raw(self, owner: str, mint: str) -> int:
        res = self.call("getTokenAccountsByOwner", [owner, {"mint": mint}, {"encoding": "jsonParsed", "commitment": "confirmed"}])
        return sum(int(a["account"]["data"]["parsed"]["info"]["tokenAmount"]["amount"]) for a in res["value"])

    def send_and_confirm(self, raw_tx: bytes, timeout_s: float = 60) -> str:
        sig = self.call("sendTransaction", [base64.b64encode(raw_tx).decode(), {
            "encoding": "base64", "skipPreflight": False, "maxRetries": 3, "preflightCommitment": "confirmed"}])
        deadline = time.time() + timeout_s
        while time.time() < deadline:
            st = self.call("getSignatureStatuses", [[sig], {"searchTransactionHistory": False}])["value"][0]
            if st:
                if st.get("err"):
                    raise RuntimeError(f"tx {sig} failed on-chain: {st['err']}")
                if st.get("confirmationStatus") in ("confirmed", "finalized"):
                    return sig
            time.sleep(1.5)
        raise TimeoutError(f"tx {sig} not confirmed in {timeout_s}s (check explorer before retrying!)")
