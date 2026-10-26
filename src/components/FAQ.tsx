import { IconPhone, IconPlus } from "./Icons";
import { BUSINESS, PHONE } from "../content";

const FAQS = [
  {
    q: "What areas do you serve?",
    a: "We serve Binghamton, Vestal, Endicott, Johnson City, and nearby towns across Broome County, NY. Not sure if you're in range? Call or text and we'll let you know.",
  },
  {
    q: "How much does window cleaning cost?",
    a: "It depends on how many windows you have, whether you want outside only or inside and outside, and how easy they are to reach. Send a quick request and you'll get a free, flat-rate quote, usually within 24 hours.",
  },
  {
    q: "Do you clean inside and outside?",
    a: "Yes. You can choose outside only, or a full inside-and-outside clean. Just say which you'd like when you ask for a quote.",
  },
  {
    q: "Do I need to be home?",
    a: "Not for outside-only cleaning, as long as the windows can be reached. For inside cleaning, someone will need to let us in. We'll confirm the details before the day.",
  },
  {
    q: "Do you offer regular cleanings?",
    a: "Yes. We clean every two weeks or once a month for homes and storefronts, so your windows stay clear all year.",
  },
  {
    q: "What if I'm not happy with a spot?",
    a: "Tell us and we'll come back and re-clean it for free. That's our satisfaction guarantee.",
  },
  {
    q: "How do I book?",
    a: `Call or text Michael at ${PHONE.display}, email ${BUSINESS.email}, or use the quote form on this page.`,
  },
];

export function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="wrap faq">
        <div className="faq__intro">
          <p className="eyebrow">Questions</p>
          <h2>Common questions</h2>
          <p className="lead">Have a question that isn't here? Happy to help.</p>
          <a className="btn btn--ghost" href={PHONE.href}>
            <IconPhone /> Call or text {PHONE.display}
          </a>
        </div>
        <div className="faq__list">
          {FAQS.map((f, i) => (
            <details className="qa" key={f.q} open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <span className="qa__icon" aria-hidden="true">
                  <IconPlus />
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
