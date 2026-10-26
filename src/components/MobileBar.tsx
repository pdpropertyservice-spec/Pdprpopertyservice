import { IconArrow, IconPhone } from "./Icons";
import { MAIN_PHONE } from "../content";

/** Call and quote buttons pinned to the bottom of the screen on phones. */
export function MobileBar() {
  return (
    <div className="mbar">
      <a className="btn btn--ghost" href={MAIN_PHONE.href}>
        <IconPhone /> Call
      </a>
      <a className="btn btn--amber" href="#quote">
        Free quote <IconArrow />
      </a>
    </div>
  );
}
