import { SectionHeading } from "./Primitives";
import { IconWindow, IconStore, IconSqueegee, IconRepeat, IconArrow } from "./Icons";

const SERVICES = [
  {
    icon: IconWindow,
    title: "Residential Windows",
    tag: "Most popular",
    featured: true,
    desc: "Spotless glass for homes of every size—from townhouses to large two-story houses—with detailed edges and a streak-free finish.",
    items: ["Single & two-story homes", "Outside-only or inside & out", "Free, no-obligation quotes"],
  },
  {
    icon: IconStore,
    title: "Storefront & Commercial",
    desc: "Clean, clear glass that makes a great first impression on your customers, with reliable recurring options.",
    items: ["Storefront glass & doors", "Commercial facilities", "Recurring route options"],
  },
  {
    icon: IconSqueegee,
    title: "Inside & Outside Detail",
    desc: "Both sides of every pane cleaned, so your view is clear no matter which side you're looking from.",
    items: ["Both sides of the glass", "Detailed edges", "Satisfaction guaranteed"],
  },
  {
    icon: IconRepeat,
    title: "Recurring Service",
    desc: "Set it and forget it. Regular routes keep your windows clear all year without you having to think about it.",
    items: ["Bi-weekly routes", "Monthly routes", "Homes & storefronts"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Window cleaning,"
          highlight="done right"
          subtitle="Windows are all we do at Pav's Window Co.—so every pane gets our full attention, at home or at your storefront."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                data-delay={`${i * 100}`}
                className={`reveal group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1.5 ${
                  s.featured
                    ? "border-forest-400/40 bg-gradient-to-b from-forest-600/15 to-transparent lg:row-span-1"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-forest-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                {s.tag && (
                  <span className="absolute right-4 top-4 rounded-full bg-forest-500/20 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-forest-300">
                    {s.tag}
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500/30 to-forest-800/30 text-forest-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-400">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-silver-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest-400" />
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href="#quote"
                  className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-forest-300 transition-colors hover:text-forest-200"
                >
                  Request this service
                  <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
