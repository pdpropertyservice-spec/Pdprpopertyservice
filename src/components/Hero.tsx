import { QuickQuote } from "./QuoteForm";
import { WindowVisual } from "./WindowVisual";
import { IconCheck } from "./Icons";
import { BUSINESS } from "../content";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Window cleaning · {BUSINESS.region}</p>
          <h1>
            Let the light <span className="accent">back in.</span>
          </h1>
          <p className="hero__lede">
            Streak-free window cleaning for homes and storefronts in Binghamton, Vestal, Endicott, Johnson City
            and across Broome County. Michael, the owner, is on every job.
          </p>
          <QuickQuote />
          <ul className="hero__assure">
            <li>
              <IconCheck /> Free quotes within 24 hours
            </li>
            <li>
              <IconCheck /> Flat-rate pricing
            </li>
            <li>
              <IconCheck /> Any missed spot re-cleaned free
            </li>
          </ul>
        </div>

        <div className="hero__visual">
          <WindowVisual />
        </div>
      </div>
    </section>
  );
}
