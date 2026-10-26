import { IconArrow, IconPhone } from "./Icons";
import { PHONE } from "../content";

const STEPS = [
  {
    title: "Ask for a free quote",
    desc: "Call, text, or use the form. Tell us roughly how many windows you have and whether you want outside only or inside and outside.",
  },
  {
    title: "Get a flat-rate price",
    desc: "You get an honest, upfront price, usually within 24 hours, and we book a day that works for you.",
  },
  {
    title: "We clean, you check",
    desc: "Every pane gets cleaned, then you take a look. If any spot isn't right, we come back and re-clean it free.",
  },
];

export function Process() {
  return (
    <section className="section section--soft" id="process">
      <div className="wrap">
        <header className="section-head section-head--center">
          <p className="eyebrow">How it works</p>
          <h2>Clear windows in three simple steps.</h2>
        </header>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="step__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
        <div className="steps__cta">
          <a className="btn btn--primary btn--lg" href="#quote">
            Start with a free quote <IconArrow />
          </a>
          <a className="btn btn--ghost btn--lg" href={PHONE.href}>
            <IconPhone /> {PHONE.display}
          </a>
        </div>
      </div>
    </section>
  );
}
