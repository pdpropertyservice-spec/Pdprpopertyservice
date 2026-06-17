import { SectionHeading } from "./Primitives";
import { IconStar } from "./Icons";

const REVIEWS = [
  {
    quote:
      "Our driveway looked brand new—I genuinely couldn't believe it was the same concrete. Michael was on time, professional, and the price was fair. Booking again for the deck.",
    name: "Sarah K.",
    place: "Vestal, NY",
  },
  {
    quote:
      "The siding on our house had years of green algae and now it's spotless. PD Property Services did an amazing job and left everything tidy. Highly recommend to anyone local.",
    name: "Dave M.",
    place: "Binghamton, NY",
  },
  {
    quote:
      "Quick quote, showed up when they said, and the results speak for themselves. Patio and walkway look incredible. Great local business that actually cares.",
    name: "Linda R.",
    place: "Endicott, NY",
  },
  {
    quote:
      "Michael cleaned up our driveway and front walk better than we expected. Fair price, easy communication, and everything looked noticeably brighter when he finished.",
    name: "Mark T.",
    place: "Johnson City, NY",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-forest-700/15 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Real reviews"
          title="Loved by"
          highlight="local homeowners"
          subtitle="We've earned our reputation one spotless property at a time."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.name}
              data-delay={`${(i % 2) * 120}`}
              className="reveal group relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-forest-400/30"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <IconStar key={j} className="h-4 w-4 text-forest-400" />
                ))}
              </div>
              <blockquote className="text-silver-200">"{r.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-forest-500 to-forest-800 text-sm font-bold text-white">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-silver-400">{r.place}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
