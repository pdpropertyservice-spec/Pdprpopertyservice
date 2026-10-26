const STEPS = [
  {
    title: "Ask for a free quote",
    desc: "Call, text, or use the form below. Tell us roughly how many windows you have and whether you want outside only or inside and outside.",
  },
  {
    title: "Get a flat-rate price",
    desc: "We send an honest, upfront price, usually within 24 hours, and book a day that works for you.",
  },
  {
    title: "We clean, you check",
    desc: "We clean every pane, then you take a look. If any spot isn't right, we'll come back and re-clean it free.",
  },
];

export function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <header className="section-head">
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
      </div>
    </section>
  );
}
