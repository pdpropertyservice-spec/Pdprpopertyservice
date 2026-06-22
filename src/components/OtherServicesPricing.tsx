import { SectionHeading } from "./Primitives";
import { IconTruck, IconSnow, IconSparkle, IconCheck } from "./Icons";

const CARDS = [
  {
    icon: IconSparkle,
    title: "Garbage Can Cleaning",
    price: "$20 per can",
    details: "Quick exterior & interior rinse/clean",
    notes: ["Simple flat pricing", "Multi-can jobs welcome", "Best bundled with other services"],
  },
  {
    icon: IconSnow,
    title: "Snow Removal",
    price: "From $45/visit",
    details: "Driveways and walkways",
    notes: ["Single visit pricing", "Weather depth affects final quote", "Seasonal availability"],
  },
  {
    icon: IconTruck,
    title: "Single Item Hauling",
    price: "From $75",
    details: "One large item pickup & disposal",
    notes: ["Couches, appliances, mattresses", "1 large item at a time", "Limited haul capacity"],
  },
];

export function OtherServicesPricing() {
  return (
    <section id="other-pricing" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-forest-900/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Starting rates"
          title="Simple pricing for"
          highlight="other services"
          subtitle="Pressure washing is our primary specialty. For our additional services, we keep pricing straightforward with honest starting rates and confirm the final total once we see the scope."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                data-delay={`${i * 90}`}
                className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-forest-400/30"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-forest-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500/25 to-forest-800/25 text-forest-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{card.title}</h3>
                <p className="mt-3 silver-text text-3xl font-black">{card.price}</p>
                <p className="mt-2 text-sm text-silver-400">{card.details}</p>
                <ul className="mt-5 space-y-2.5">
                  {card.notes.map((note) => (
                    <li key={note} className="flex items-start gap-2.5 text-sm text-silver-300">
                      <span className="mt-0.5 flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full bg-forest-500/20 text-forest-300">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="reveal mt-8 rounded-2xl border border-forest-400/20 bg-gradient-to-br from-forest-950/35 to-white/[0.02] p-6 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Honest note on availability</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-silver-300">
                These are starting rates only. Since these services are offered more selectively than pressure washing,
                final pricing depends on job size, access, material to remove, property conditions, weather, and current equipment availability.
              </p>
            </div>
            <a
              href="#quote"
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-forest-400 to-forest-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-forest-900/30 transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Request a custom quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
