const STATS = [
  { value: "Local", label: "Owner-operated" },
  { value: "Insured", label: "& equipped right" },
  { value: "24h", label: "Quote turnaround" },
  { value: "100%", label: "Satisfaction promise" },
];

export function SocialProof() {
  return (
    <section className="relative border-y border-white/5 bg-white/[0.015] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="reveal text-center text-xs font-semibold uppercase tracking-[0.3em] text-silver-500">
          Trusted by homeowners & businesses across Broome County
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="reveal text-center"
              data-delay={`${i * 90}`}
            >
              <p className="silver-text text-3xl font-black sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-silver-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
