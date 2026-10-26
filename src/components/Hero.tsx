import { QuoteForm } from "./QuoteForm";
import { IconCheck, IconPhone } from "./Icons";
import { PHONE } from "../content";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glass" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Broome County, NY</p>
          <h1 className="silver">
            Crystal-clear windows for <span className="emerald">homes &amp; storefronts.</span>
          </h1>
          <p className="hero__lede">
            Pav's Window Co. is a locally owned window cleaning company serving Binghamton, Vestal, Endicott,
            Johnson City and the rest of Broome County. Every pane is cleaned edge to edge, inside and out, and
            backed by a satisfaction guarantee.
          </p>
          <ul className="hero__assure">
            <li>
              <IconCheck /> Free quotes, usually within 24 hours
            </li>
            <li>
              <IconCheck /> Owner on every job
            </li>
            <li>
              <IconCheck /> Not happy with a spot? We re-clean it free
            </li>
          </ul>
          <a className="hero__call" href={PHONE.href}>
            <span className="hero__call-icon">
              <IconPhone />
            </span>
            <span>
              <span className="hero__call-label">Prefer to talk? Call or text</span>
              <span className="hero__call-number">{PHONE.display}</span>
            </span>
          </a>
        </div>

        <div className="hero__card panel">
          <div className="hero__card-head">
            <h2>Get a free quote</h2>
            <p>Takes about 30 seconds.</p>
          </div>
          <QuoteForm compact idPrefix="hq" />
        </div>
      </div>
    </section>
  );
}
