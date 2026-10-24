import { IconArrow, IconPhone, IconStar, IconShield, IconCheck, IconPin } from "./Icons";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full bg-forest-700/30 blur-[120px] animate-drift" />
        <div className="absolute -right-24 top-40 h-[28rem] w-[28rem] rounded-full bg-forest-500/20 blur-[120px] animate-float-slow" />
        <div className="absolute inset-0 grain opacity-60" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-forest-400/30 bg-forest-500/10 px-3.5 py-1.5 text-xs font-semibold text-forest-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forest-400" />
            </span>
            Now booking in Broome County, NY & surrounding areas
          </div>

          <h1 className="reveal mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl" data-delay="80">
            Windows so clean,{" "}
            <span className="relative whitespace-nowrap">
              <span className="silver-sheen">you'll forget</span>
            </span>{" "}
            <span className="text-forest-400">they're there</span>.
          </h1>

          <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-silver-300" data-delay="160">
            Pav's Window Co. brings the shine back to your home or storefront—
            spotless glass and detailed edges, inside and out, with one-time or
            recurring service. <span className="text-silver-100 font-medium">Crystal clear, every time.</span>
          </p>

          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row" data-delay="240">
            <a
              href="#quote"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-forest-400 to-forest-700 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-forest-900/40 transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">Get My Free Quote</span>
              <IconArrow className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="tel:+16077598829"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-silver-100 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
            >
              <IconPhone className="h-5 w-5 text-forest-400" />
              (607) 759-8829
            </a>
          </div>

          {/* Trust row */}
          <div className="reveal mt-10 flex flex-wrap items-center gap-x-7 gap-y-4" data-delay="320">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4 text-forest-400" />
                ))}
              </div>
              <span className="text-sm text-silver-300">
                <span className="font-semibold text-white">5.0</span> rated locally
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-silver-300">
              <IconShield className="h-5 w-5 text-forest-400" />
              Satisfaction guaranteed
            </div>
            <div className="flex items-center gap-2 text-sm text-silver-300">
              <IconPin className="h-5 w-5 text-forest-400" />
              Locally owned
            </div>
          </div>
        </div>

            {/* Visual */}
        <div className="reveal relative" data-delay="200">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-forest-600/30 to-transparent blur-2xl" />
          <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl shadow-black/60">
            <WindowArt className="h-[26rem] w-full transition-transform duration-[1.2s] group-hover:scale-105 sm:h-[32rem]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />

            {/* Floating stat card */}
            <div className="glass-strong absolute bottom-5 left-5 flex animate-float items-center gap-3 rounded-2xl px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-500/20 text-forest-300">
                <IconCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Satisfaction Guaranteed</p>
                <p className="text-xs text-silver-400">Or we re-clean it free</p>
              </div>
            </div>
            
            {/* corner badge */}
            <div className="glass absolute right-5 top-5 rounded-2xl px-4 py-2 text-center shadow-xl">
              <p className="silver-text text-xl font-black">Local</p>
              <p className="text-[0.55rem] font-semibold uppercase tracking-wider text-silver-400">Owner-operated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WindowArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 640" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label="A window half cleaned with a squeegee, showing streak-free glass">
      <defs>
        <linearGradient id="hw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7cc6ec" />
          <stop offset="55%" stopColor="#b0def5" />
          <stop offset="100%" stopColor="#eef8fd" />
        </linearGradient>
        <linearGradient id="hw-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0e13" />
          <stop offset="100%" stopColor="#133e5a" />
        </linearGradient>
        <filter id="hw-grime" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="7" />
          <feColorMatrix values="0 0 0 0 0.42  0 0 0 0 0.39  0 0 0 0 0.33  0 0 0 1.25 -0.3" />
        </filter>
        <clipPath id="hw-glass">
          <rect x="132" y="112" width="160" height="196" rx="4" />
          <rect x="308" y="112" width="160" height="196" rx="4" />
          <rect x="132" y="324" width="160" height="196" rx="4" />
          <rect x="308" y="324" width="160" height="196" rx="4" />
        </clipPath>
        <clipPath id="hw-dirty">
          <path d="M100 80 H600 V560 H360 L360 80 Z" />
        </clipPath>
      </defs>

      <rect width="600" height="640" fill="url(#hw-wall)" />
      <rect x="100" y="80" width="400" height="472" rx="10" fill="#e3e8ea" />
      <rect x="116" y="96" width="368" height="440" rx="6" fill="#c8d1d4" />

      <g clipPath="url(#hw-glass)">
        <rect x="100" y="80" width="400" height="472" fill="url(#hw-sky)" />
        <ellipse cx="210" cy="190" rx="44" ry="20" fill="#ffffff" opacity="0.9" />
        <ellipse cx="245" cy="182" rx="34" ry="18" fill="#ffffff" opacity="0.9" />
        <ellipse cx="420" cy="240" rx="40" ry="16" fill="#ffffff" opacity="0.8" />
        <path d="M100 470 Q220 420 330 455 T500 440 V560 H100 Z" fill="#1e8bc6" opacity="0.35" />
        <path d="M150 300 L250 130 L275 130 L175 300 Z" fill="#ffffff" opacity="0.35" />
        <path d="M190 500 L290 330 L302 330 L202 500 Z" fill="#ffffff" opacity="0.3" />
        <g clipPath="url(#hw-dirty)">
          <rect x="100" y="80" width="400" height="472" filter="url(#hw-grime)" opacity="0.95" />
          <rect x="100" y="80" width="400" height="472" fill="#6b6455" opacity="0.25" />
        </g>
      </g>

      <rect x="292" y="104" width="16" height="424" fill="#e3e8ea" />
      <rect x="124" y="308" width="352" height="16" fill="#e3e8ea" />
      <rect x="84" y="548" width="432" height="22" rx="4" fill="#f4f6f7" />

      <g transform="translate(360 300) rotate(-8)">
        <rect x="-10" y="-150" width="20" height="300" rx="6" fill="#0a0e13" />
        <rect x="-4" y="-150" width="8" height="300" rx="3" fill="#3ea8df" />
        <rect x="10" y="-22" width="70" height="44" rx="10" fill="#156fa3" />
        <rect x="76" y="-12" width="120" height="24" rx="12" fill="#134a6c" />
      </g>
    </svg>
  );
}
