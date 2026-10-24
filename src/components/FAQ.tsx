import { useState } from "react";
import { SectionHeading } from "./Primitives";
import { IconPlus } from "./Icons";
import { cn } from "../utils/cn";

const FAQS = [
  {
    q: "What areas do you serve?",
    a: "We proudly serve Broome County, NY and the surrounding areas—including Binghamton, Vestal, Endicott, Johnson City, and nearby towns. Not sure if you're in range? Just reach out and we'll let you know.",
  },
  {
    q: "How much does window cleaning cost?",
    a: "Every property is different. Pricing depends on how many windows you have, outside-only vs. inside & outside, and how easy they are to reach. Send us a quick request and we'll get you a free, flat-rate quote, usually within 24 hours.",
  },
  {
    q: "Do you clean inside and outside?",
    a: "Yes. Choose outside-only or a full inside-and-outside clean—just let us know which you'd like when you request your quote.",
  },
  {
    q: "Do I need to be home during the service?",
    a: "For outside-only cleaning, no—as long as we can reach the windows, you're welcome to go about your day. For inside & outside cleaning, someone will need to let us in. We'll confirm everything beforehand.",
  },
  {
    q: "Do you offer recurring window cleaning?",
    a: "Yes. We offer bi-weekly and monthly routes for homes and storefronts so your windows stay clear all year. Reach out and we'll put together a plan for your property.",
  },
  {
    q: "How do I book?",
    a: "Call or text us at (607) 759-8829 (Michael) or (607) 340-5957 (Takota), email pdpropertyservice@gmail.com, or fill out the quick quote form on this page. We'll get right back to you.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="Questions" title="Frequently asked" highlight="questions" />

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                data-delay={`${i * 60}`}
                className={cn(
                  "reveal overflow-hidden rounded-2xl border transition-colors duration-300",
                  isOpen ? "border-forest-400/30 bg-white/[0.03]" : "border-white/10 bg-white/[0.02]"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white">{f.q}</span>
                  <span
                    className={cn(
                      "flex h-7 w-7 flex-none items-center justify-center rounded-full border border-white/15 text-forest-300 transition-transform duration-300",
                      isOpen && "rotate-45 bg-forest-500/20"
                    )}
                  >
                    <IconPlus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-silver-300">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
