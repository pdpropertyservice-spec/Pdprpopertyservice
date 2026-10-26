import { useId } from "react";

function useSvgId() {
  return useId().replace(/[^a-zA-Z0-9_-]/g, "");
}

export function LogoMark({ className }: { className?: string }) {
  const id = useSvgId();
  const fill = `url(#${id}-pane)`;
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-pane`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9BD3F4" />
          <stop offset="1" stopColor="#1B78BE" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="37" height="37" rx="8" className="logo__frame" />
      <rect x="6" y="6" width="12.5" height="12.5" rx="2.5" fill={fill} />
      <rect x="21.5" y="6" width="12.5" height="12.5" rx="2.5" fill={fill} />
      <rect x="6" y="21.5" width="12.5" height="12.5" rx="2.5" fill={fill} />
      <rect x="21.5" y="21.5" width="12.5" height="12.5" rx="2.5" fill={fill} />
      <path d="M9 15 15 9M9 10.6 10.6 9" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={light ? "logo logo--light" : "logo"} aria-label="Pav's Window Co. home">
      <LogoMark className="logo__mark" />
      <span className="logo__text" aria-hidden="true">
        <span className="logo__name">Pav's</span>
        <span className="logo__sub">Window Co.</span>
      </span>
    </a>
  );
}
