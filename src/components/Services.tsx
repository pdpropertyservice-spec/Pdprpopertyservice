import { IconCalendar, IconCheck, IconCheckCircle, IconHome, IconRepeat, IconStore, IconWindow } from "./Icons";

const SERVICES = [
  {
    icon: IconHome,
    kicker: "Residential",
    title: "Home window cleaning",
    desc: "Clear, streak-free windows for houses of every size, from small homes to large two-story houses.",
    items: ["Single-story and two-story homes", "Outside only, or inside and outside", "One-time cleans or a regular schedule"],
  },
  {
    icon: IconStore,
    kicker: "Commercial",
    title: "Storefront & business windows",
    desc: "Clean glass makes a strong first impression. We keep storefronts and business windows looking sharp.",
    items: ["Storefront windows and glass doors", "Offices and commercial buildings", "Regular cleanings every two weeks or monthly"],
  },
];

const CLEANS = [
  { title: "Outside only", desc: "We clean the outside of every window. You don't need to be home." },
  { title: "Inside & outside", desc: "Both sides of every pane for the clearest view. Our most complete clean." },
];

const FREQUENCY = [
  { icon: IconCalendar, title: "One-time clean", desc: "A seasonal refresh, or before guests arrive" },
  { icon: IconRepeat, title: "Every two weeks", desc: "Popular with storefronts" },
  { icon: IconWindow, title: "Once a month", desc: "Keeps your glass clear all year" },
];

const INCLUDED = [
  "Every pane cleaned edge to edge",
  "Corners and edges detailed",
  "Drips wiped from frames and sills",
  "Streak-free, or we re-clean it free",
];

export function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">What we clean</p>
          <h2 className="silver">Windows are all we do.</h2>
          <p className="lead">That means every pane gets our full attention, whether it's your home or your storefront.</p>
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
                  <p className="svc__kicker">{s.kicker}</p>
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

        <div className="choose">
          <div className="choose__panel panel">
            <h3 className="choose__title">Pick your clean</h3>
            <div className="choose__opts">
              {CLEANS.map((c) => (
                <div className="opt" key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.desc}</span>
                </div>
              ))}
            </div>
            <p className="choose__note">Not sure which you need? We'll help you decide when we quote.</p>
          </div>
          <div className="choose__panel panel">
            <h3 className="choose__title">Pick how often</h3>
            <ul className="freq">
              {FREQUENCY.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.title}>
                    <span className="freq__icon">
                      <Icon />
                    </span>
                    <span>
                      <strong>{f.title}</strong>
                      <span>{f.desc}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
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
