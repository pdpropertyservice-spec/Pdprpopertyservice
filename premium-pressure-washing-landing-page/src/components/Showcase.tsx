import { SectionHeading } from "./Primitives";
import { IconCheck } from "./Icons";

const GALLERY = [
  {
    img: "/images/deck.jpg",
    title: "Decks & patios reborn",
    desc: "Weathered, grey wood and grimy pavers brought back to life—ready for summer evenings.",
  },
  {
    img: "/images/siding.jpg",
    title: "Spotless siding",
    desc: "Green algae and dirt streaks washed away with soft-wash safe pressure for your home.",
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-forest-700/20 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The results"
          title="See the"
          highlight="transformation"
          subtitle="Decades of buildup, gone. Here's a clean side-by-side look at the difference professional pressure washing makes on the same surface."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <div className="reveal" data-delay="80">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
              <img
                src="/images/split-concrete.jpg"
                alt="Concrete driveway before and after pressure washing"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
              <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-silver-200 backdrop-blur">
                Before
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-forest-500/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur">
                After
              </span>
            </div>
          </div>
          <div className="reveal" data-delay="160">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              A clean that actually <span className="text-forest-400">lasts</span>.
            </h3>
            <p className="mt-4 text-silver-300">
              We don't just rinse the surface. We use the correct pressure,
              professional-grade detergents, and proven technique for each
              material—so the results look incredible and stay that way longer.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Surface-safe pressure & soft-wash methods",
                "Eco-conscious, pet-friendly detergents",
                "Edge-to-edge, streak-free finish",
                "Before & after photos with every job",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-forest-500/20 text-forest-300">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-silver-200">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {GALLERY.map((g, i) => (
            <article
              key={g.title}
              data-delay={`${i * 120}`}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={g.img}
                alt={g.title}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-[1.1s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-bold text-white">{g.title}</h3>
                <p className="mt-1 text-sm text-silver-300">{g.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
