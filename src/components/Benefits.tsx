import { SectionHeading } from "./Primitives";
import { IconShield, IconClock, IconDollar, IconHeart, IconPin, IconSparkle } from "./Icons";

const BENEFITS = [
  { icon: IconPin, title: "Local & owner-operated", desc: "Owner Michael Pavlisak is on every job. You get a neighbor who genuinely cares, not a faceless franchise." },
  { icon: IconShield, title: "Fully insured & equipped", desc: "Commercial-grade gear and full coverage mean total peace of mind for your property." },
  { icon: IconClock, title: "Fast, reliable scheduling", desc: "Free quote within 24 hours and punctual arrivals that respect your time." },
  { icon: IconDollar, title: "Honest, upfront pricing", desc: "Transparent flat quotes with no hidden fees or pushy upsells—ever." },
  { icon: IconSparkle, title: "Detail-obsessed finish", desc: "We sweat the edges, corners, and trim others skip for a truly complete clean." },
  { icon: IconHeart, title: "Satisfaction guaranteed", desc: "Not thrilled with a spot? We come back and re-clean it free. Simple as that." },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why PD Property Services"
          title="The clean done right—"
          highlight="every time"
          subtitle="Your property. Our priority. Here's why Broome County homeowners keep calling us back."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                data-delay={`${(i % 3) * 100}`}
                className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:border-forest-400/30 hover:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-forest-600/20 to-transparent text-forest-300 transition-all duration-500 group-hover:scale-110 group-hover:border-forest-400/40">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-400">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
