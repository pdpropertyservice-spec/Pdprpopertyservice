import { IconCheck, IconCheckCircle, IconHome, IconStore, IconWindow } from "./Icons";

const SERVICES = [
  {
    icon: IconStore,
    title: "Storefronts & restaurants",
    price: "From $50 a visit",
    desc: "Clean glass makes a strong first impression. Set it and forget it with a regular schedule.",
    items: ["Every 2 weeks or once a month", "Glass doors and entryways", "Inside glass on request"],
  },
  {
    icon: IconWindow,
    title: "Dealerships & offices",
    price: "Custom quote",
    desc: "Big showroom and office glass, kept spotless so your space looks its best.",
    items: ["Tall glass reached from the ground", "Weekly or every 2 weeks", "Scheduled around your hours"],
  },
  {
    icon: IconHome,
    title: "Homes",
    price: "Free quote",
    desc: "Streak-free windows for single-story and two-story homes.",
    items: ["Outside only, or inside and out", "One-time or seasonal cleans", "Spring and fall favorites"],
  },
];

const INCLUDED = [
  "Every pane cleaned edge to edge",
  "Corners and edges detailed",
  "Drips wiped from frames and sills",
  "Streak-free, or re-cleaned free",
];

export function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">Services</p>
          <h2 className="silver">Window cleaning, done right.</h2>
          <p className="lead">Windows are all we do, so every pane gets full attention.</p>
        </header>

        <div className="svc-grid">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <article className="svc panel" key={s.title}>
                <div className="svc__top">
                  <span className="badge-icon">
                    <Icon />
                  </span>
                  <span className="svc__price">{s.price}</span>
                </div>
                <h3>{s.title}</h3>
                <p className="svc__desc">{s.desc}</p>
                <ul className="checks">
                  {s.items.map((it) => (
                    <li key={it}>
                      <IconCheck /> {it}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="included">
          <h3>Every clean includes</h3>
          <ul>
            {INCLUDED.map((t) => (
              <li key={t}>
                <IconCheckCircle /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
