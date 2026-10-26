import { WindowWipe } from "./WindowWipe";
import { IconArrow, IconCheck, IconPhone } from "./Icons";
import { MAIN_PHONE } from "../content";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Window cleaning · Broome County, NY</p>
          <h1>
            <span className="mark">Spotless windows</span> for Broome County homes &amp; storefronts.
          </h1>
          <p className="hero__lede">
            Pav's Window Co. is a locally owned window cleaning company. We clean every pane edge to edge,
            inside and out. If you're not happy with a spot, we'll come back and re-clean it free.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--amber btn--lg" href="#quote">
              Get my free quote <IconArrow />
            </a>
            <a className="btn btn--ghost btn--lg" href={MAIN_PHONE.href}>
              <IconPhone /> {MAIN_PHONE.display}
            </a>
          </div>
          <ul className="hero__assure">
            <li>
              <IconCheck /> Free quotes, usually within 24 hours
            </li>
            <li>
              <IconCheck /> Locally owned &amp; operated
            </li>
            <li>
              <IconCheck /> Satisfaction guaranteed
            </li>
          </ul>
        </div>
        <div className="hero__visual">
          <WindowWipe />
        </div>
      </div>
    </section>
  );
}
