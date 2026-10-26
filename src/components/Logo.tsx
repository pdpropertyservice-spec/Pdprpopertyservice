import { useId } from "react";

type Tone = "day" | "night";

/** The Pav's mark: a "P" whose loop is a four-pane window.
 *  `day` draws the P in ink for light backgrounds; `night` draws it in brushed silver. */
export function LogoMark({ className, tone = "day" }: { className?: string; tone?: Tone }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const body = tone === "night" ? ["#FFFFFF", "#C9D1D5", "#8E9AA0", "#E6EBED"] : ["#2A3B32", "#1B2A22", "#0E1A14", "#243229"];
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={body[0]} />
          <stop offset="0.42" stopColor={body[1]} />
          <stop offset="0.7" stopColor={body[2]} />
          <stop offset="1" stopColor={body[3]} />
        </linearGradient>
        <linearGradient id={`${id}-e`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#45DFA0" />
          <stop offset="0.55" stopColor="#0F9A66" />
          <stop offset="1" stopColor="#075B3D" />
        </linearGradient>
      </defs>
      <path d="M10 5H31a11 11 0 0 1 11 11v4a11 11 0 0 1-11 11H18v12h-8Z" fill={`url(#${id}-s)`} />
      <path d="M18 11h13a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H18Z" fill={`url(#${id}-e)`} />
      <path d="M26.5 11v14M18 18h17" stroke={tone === "night" ? `url(#${id}-s)` : "#FFFFFF"} strokeWidth="1.8" />
      <path d="M20 16.2 24.2 12" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export function Logo({ tone = "day" }: { tone?: Tone }) {
  return (
    <a href="#top" className={tone === "night" ? "logo logo--night" : "logo"} aria-label="Pav's Window Co. home">
      <LogoMark className="logo__mark" tone={tone} />
      <span className="logo__text" aria-hidden="true">
        <span className="logo__name">PAV'S</span>
        <span className="logo__sub">Window Co.</span>
      </span>
    </a>
  );
}
