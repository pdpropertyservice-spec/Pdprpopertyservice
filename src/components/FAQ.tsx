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
    q: "How much does pressure washing cost?",
    a: "Every property is different. Use the instant quote calculator on this page to build a custom estimate based on your home, driveway, deck, and any add-ons—then we'll confirm a flat-rate quote, usually within 24 hours.",
  },
  {
    q: "Will pressure washing damage my surfaces?",
    a: "Not when it's done right. We match the technique and pressure to each material—using gentle soft-wash methods for siding and roofs, and higher pressure only where it's safe. Your property is in experienced, careful hands.",
  },
  {
    q: "Do I need to be home during the service?",
    a: "Not necessarily. As long as we have access to the areas being cleaned and a water source, you're welcome to go about your day. We'll confirm everything beforehand and send before & after photos.",
  },
  {
    q: "What other services do you offer?",
    a: "Beyond pressure washing, PD Property Services also offers window cleaning, garbage can cleaning, and seasonal snow removal at honest starting rates. Availability varies by season and job, so just ask and we'll let you know.",
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
