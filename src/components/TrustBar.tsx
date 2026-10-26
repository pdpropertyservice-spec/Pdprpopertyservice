import { IconClock, IconShield, IconUsers, IconWindow } from "./Icons";

const ITEMS = [
  { icon: IconClock, title: "Quotes in 24 hours", desc: "Free and no obligation" },
  { icon: IconShield, title: "Satisfaction guarantee", desc: "We re-clean any spot free" },
  { icon: IconUsers, title: "Owner-operated", desc: "Michael is on every job" },
  { icon: IconWindow, title: "Windows only", desc: "Homes and storefronts" },
];

export function TrustBar() {
  return (
    <section className="trust" aria-label="Why customers choose us">
      <ul className="wrap trust__list">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.title}>
              <Icon />
              <span>
                <strong>{it.title}</strong>
                <span>{it.desc}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
