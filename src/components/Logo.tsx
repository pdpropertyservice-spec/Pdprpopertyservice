import { cn } from "../utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#home" className={cn("group flex items-center gap-3", className)} aria-label="Pav's Window Co. home">
      <span className="relative flex h-11 w-11 items-center justify-center">
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="logoGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7cc6ec" />
              <stop offset="100%" stopColor="#135985" />
            </linearGradient>
            <linearGradient id="logoFrame" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#7e8c92" />
            </linearGradient>
          </defs>
          <rect x="5" y="5" width="38" height="38" rx="7" fill="url(#logoGlass)" />
          <rect x="5" y="5" width="38" height="38" rx="7" fill="none" stroke="url(#logoFrame)" strokeWidth="3" />
          <path d="M24 6.5v35M6.5 24h35" stroke="url(#logoFrame)" strokeWidth="2.5" />
          <path
            d="M10 19.5l7-7M10 14l2.5-2.5"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
            className="transition-opacity duration-500 group-hover:opacity-100"
          />
          <path d="M34 28.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="#ffffff" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="silver-text text-lg font-black tracking-tight">Pav's</span>
        <span className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.28em] text-forest-400">Window Co.</span>
      </span>
    </a>
  );
}
