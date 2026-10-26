import { IconArrow, IconPhone } from "./Icons";
import { PHONE } from "../content";

/** Call and quote buttons pinned to the bottom of the screen on phones. */
export function MobileBar() {
  return (
    <div className="mbar">
      <a className="btn btn--ghost" href={PHONE.href}>
        <IconPhone /> Call
      </a>
      <a className="btn btn--primary" href="#quote">
        Free quote <IconArrow />
      </a>
    </div>
  );
}
