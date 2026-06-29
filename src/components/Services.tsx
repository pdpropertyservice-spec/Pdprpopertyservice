import { SectionHeading } from "./Primitives";
import { IconSpray, IconSparkle, IconSnow, IconArrow } from "./Icons";

const SERVICES = [
  {
    icon: IconSpray,
    title: "Pressure Washing",
    tag: "Our specialty",
    featured: true,
    desc: "Driveways, sidewalks, patios, siding, decks, and fences—blasted free of dirt, mold, algae, and stubborn stains with the right pressure for every surface.",
    items: ["Driveways & concrete", "House & vinyl siding", "Decks, patios & fences"],
  },
  {
    icon: IconSparkle,
    title: "Window Cleaning",
    desc: "Commercial storefront and residential window cleaning with clean glass, detailed edges, and reliable recurring options.",
    items: ["Storefront glass", "Inside & outside", "Bi-weekly or monthly routes"],
  },
  {
    icon: IconSparkle,
    title: "Garbage Can Cleaning",
    desc: "Quick and affordable sanitizing of your nasty trash and recycling bins—just $20 per can.",
    items: ["Interior & exterior rinse", "Multi-can pricing", "Bundle with other services"],
  },
  {
    icon: IconSnow,
    title: "Snow Removal",
    desc: "Reliable winter clearing for driveways and walkways—keeping your property safe and accessible all season.",
    items: ["Driveway & walkway clearing", "Seasonal availability"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title="One crew for your"
          highlight="entire property"
          subtitle="Pressure washing is our craft—but PD Property Services keeps your home looking its best in every season."
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
