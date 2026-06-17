import { cn } from "../utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#home" className={cn("group flex items-center gap-3", className)} aria-label="PD Property Services home">
      <span className="relative flex h-11 w-11 items-center justify-center">
        {/* swoosh ring */}
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d="M14 8a20 20 0 1 0 0 32"
            fill="none"
            stroke="url(#gradGreen)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="transition-transform duration-700 group-hover:rotate-[8deg]"
            style={{ transformOrigin: "center" }}
          />
          <path
            d="M18 6a22 22 0 1 0 0 36"
            fill="none"
            stroke="url(#gradSilver)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="gradGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4fac6c" />
              <stop offset="100%" stopColor="#143b25" />
            </linearGradient>
            <linearGradient id="gradSilver" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#7e8c92" />
            </linearGradient>
          </defs>
        </svg>
        <span className="silver-text relative text-lg font-black tracking-tighter">PD</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="silver-text text-sm font-extrabold uppercase tracking-[0.18em]">Property</span>
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-forest-400">Services</span>
      </span>
    </a>
  );
}
