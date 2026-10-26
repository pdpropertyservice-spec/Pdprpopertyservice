import { useId } from "react";

/** The Pav's mark: a "P" whose loop is a four-pane window. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.42" stopColor="#C9D1D5" />
          <stop offset="0.7" stopColor="#8E9AA0" />
          <stop offset="1" stopColor="#E6EBED" />
        </linearGradient>
        <linearGradient id={`${id}-e`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#45DFA0" />
          <stop offset="0.55" stopColor="#0F9A66" />
          <stop offset="1" stopColor="#075B3D" />
        </linearGradient>
      </defs>
      <path d="M10 5H31a11 11 0 0 1 11 11v4a11 11 0 0 1-11 11H18v12h-8Z" fill={`url(#${id}-s)`} />
      <path d="M18 11h13a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H18Z" fill={`url(#${id}-e)`} />
      <path d="M26.5 11v14M18 18h17" stroke={`url(#${id}-s)`} strokeWidth="1.8" />
      <path d="M20 16.2 24.2 12" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Pav's Window Co. home">
      <LogoMark className="logo__mark" />
      <span className="logo__text" aria-hidden="true">
        <span className="logo__name silver">PAV'S</span>
        <span className="logo__sub">Window Co.</span>
      </span>
    </a>
  );
}
