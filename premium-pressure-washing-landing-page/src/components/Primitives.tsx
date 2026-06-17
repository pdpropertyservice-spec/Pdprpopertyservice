import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "reveal inline-flex items-center gap-2 rounded-full border border-forest-400/30 bg-forest-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-forest-300",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="reveal mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl" data-delay="60">
        {title} {highlight && <span className="text-forest-400">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="reveal mt-4 text-lg leading-relaxed text-silver-300" data-delay="120">
          {subtitle}
        </p>
      )}
    </div>
  );
}
