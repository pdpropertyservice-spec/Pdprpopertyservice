import { SectionHeading } from "./Primitives";
import { IconPhone, IconCheck, IconSparkle } from "./Icons";

const STEPS = [
  {
    icon: IconPhone,
    title: "Request a free quote",
    desc: "Call, text, or send the quick form below. Tell us roughly how many windows you have and whether you want outside only or inside & outside.",
  },
  {
    icon: IconCheck,
    title: "Get a flat-rate price",
    desc: "We'll send an honest, upfront quote, usually within 24 hours, and book a time that works for you.",
  },
  {
    icon: IconSparkle,
    title: "Enjoy the view",
    desc: "We clean every pane with care and detail. Not thrilled with a spot? We come back and re-clean it free.",
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-forest-900/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Clear windows in"
          highlight="three easy steps"
          subtitle="No hassle, no pressure. Just spotless glass."
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.title}
                data-delay={`${i * 100}`}
                className="reveal relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7"
              >
                <span className="silver-text absolute right-6 top-4 text-6xl font-black opacity-20">{i + 1}</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500/30 to-forest-800/30 text-forest-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-400">{s.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
