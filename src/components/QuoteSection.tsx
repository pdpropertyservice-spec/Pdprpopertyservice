import { QuoteForm } from "./QuoteForm";
import { IconMail, IconPhone, IconPin } from "./Icons";
import { BUSINESS, PHONE } from "../content";

export function QuoteSection() {
  return (
    <section className="section quote" id="quote">
      <div className="wrap quote__grid">
        <div className="quote__intro">
          <p className="eyebrow">Free quote</p>
          <h2 className="silver">Get your free window cleaning quote</h2>
          <p className="lead">
            Tell us a little about your windows and you'll get a flat-rate price, usually within 24 hours. No pressure
            and no obligation.
          </p>
          <ul className="contact-list">
            <li>
              <span className="badge-icon">
                <IconPhone />
              </span>
              <span>
                <span className="contact-list__label">Call or text Michael</span>
                <a href={PHONE.href}>{PHONE.display}</a>
              </span>
            </li>
            <li>
              <span className="badge-icon">
                <IconMail />
              </span>
              <span>
                <span className="contact-list__label">Email</span>
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </span>
            </li>
            <li>
              <span className="badge-icon">
                <IconPin />
              </span>
              <span>
                <span className="contact-list__label">Service area</span>
                <span className="contact-list__value">Broome County, NY</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="form-card panel">
          <QuoteForm idPrefix="fq" />
        </div>
      </div>
    </section>
  );
}
