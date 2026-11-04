import { IconClock, IconPin, IconShield, IconUsers } from "./Icons";

const ITEMS = [
  { icon: IconClock, title: "Quotes in 24 hours", desc: "Free and no obligation" },
  { icon: IconShield, title: "Satisfaction guarantee", desc: "We re-clean any spot free" },
  { icon: IconUsers, title: "Owner on every job", desc: "You deal with Mike directly" },
  { icon: IconPin, title: "Locally owned", desc: "Serving Broome County, NY" },
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
