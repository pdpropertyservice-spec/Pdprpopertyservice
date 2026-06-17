import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const IconSpray = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M3 14a4 4 0 0 1 4-4h2V7H7L5 4" /><rect x="9" y="9" width="9" height="11" rx="2" /><path d="M14 3h.01M17 5h.01M20 4h.01M19 8h.01M16 9h.01" /></svg>
);
export const IconLeaf = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 8-5 12-9 12Z" /><path d="M4 20c2-4 5-6 9-7" /></svg>
);
export const IconSnow = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 2v20M4 5l16 14M20 5 4 19M2 12h20" /></svg>
);
export const IconTruck = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M2 7h11v9H2zM13 10h4l3 3v3h-7" /><circle cx="6.5" cy="18" r="1.6" /><circle cx="16.5" cy="18" r="1.6" /></svg>
);
export const IconStar = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
);
export const IconShield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconClock = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconHeart = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 20s-7-4.5-9-9a4.5 4.5 0 0 1 9-2 4.5 4.5 0 0 1 9 2c-2 4.5-9 9-9 9Z" /></svg>
);
export const IconDollar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
);
export const IconPhone = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>
);
export const IconMail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const IconPin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const IconCheck = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="m20 6-11 11-5-5" /></svg>
);
export const IconArrow = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconPlus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconSparkle = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" /></svg>
);
