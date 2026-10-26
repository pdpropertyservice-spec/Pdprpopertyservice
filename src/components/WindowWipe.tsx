import { useEffect, useId, useMemo, useRef, useState, type PointerEvent } from "react";
import { IconDrag } from "./Icons";

/** The view through the window: Southern Tier sky and rolling hills. */
function Scene({ idp }: { idp: string }) {
  return (
    <svg className="wipe__svg" viewBox="0 0 600 680" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${idp}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5FAEE3" />
          <stop offset="0.5" stopColor="#B5DDF5" />
          <stop offset="1" stopColor="#EEF8FD" />
        </linearGradient>
        <radialGradient id={`${idp}-sun`}>
          <stop offset="0" stopColor="#FFF9E3" />
          <stop offset="0.3" stopColor="#FFF1C4" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFF1C4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="680" fill={`url(#${idp}-sky)`} />
      <circle cx="438" cy="168" r="160" fill={`url(#${idp}-sun)`} />
      <circle cx="438" cy="168" r="38" fill="#FFFBEC" />
      <g fill="#FFFFFF">
        <g opacity="0.95">
          <ellipse cx="150" cy="150" rx="70" ry="22" />
          <ellipse cx="125" cy="134" rx="38" ry="26" />
          <ellipse cx="172" cy="128" rx="34" ry="28" />
        </g>
        <g opacity="0.8">
          <ellipse cx="330" cy="275" rx="58" ry="17" />
          <ellipse cx="312" cy="262" rx="30" ry="20" />
          <ellipse cx="350" cy="258" rx="26" ry="20" />
        </g>
        <g opacity="0.7">
          <ellipse cx="540" cy="340" rx="44" ry="13" />
          <ellipse cx="528" cy="330" rx="22" ry="15" />
        </g>
      </g>
      <path d="M0 425 C 90 378 175 392 255 418 S 425 376 600 405 V680 H0Z" fill="#B9D4DE" />
      <path d="M0 478 C 110 438 215 452 305 482 S 480 442 600 468 V680 H0Z" fill="#8EB6A8" />
      <path d="M0 520 C 140 505 300 528 600 512 L600 534 C 320 552 150 530 0 546Z" fill="#D6ECF6" opacity="0.85" />
      <path d="M0 548 C 125 510 245 528 335 556 S 505 522 600 540 V680 H0Z" fill="#6A9A84" />
      <g fill="#4F806A">
        <circle cx="70" cy="548" r="15" />
        <circle cx="90" cy="542" r="18" />
        <circle cx="112" cy="550" r="13" />
        <circle cx="430" cy="536" r="14" />
        <circle cx="450" cy="530" r="17" />
        <circle cx="472" cy="538" r="12" />
      </g>
      <path d="M0 612 C 150 586 300 600 420 616 S 560 600 600 606 V680 H0Z" fill="#456F5C" />
    </svg>
  );
}

/** Seeded random numbers so the dirt pattern is the same on every visit. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Grime({ idp }: { idp: string }) {
  const { spots, drips } = useMemo(() => {
    const r = rng(42);
    const spots = Array.from({ length: 80 }, () => ({ x: r() * 600, y: r() * 680, r: 2 + r() * 6 }));
    const drips = Array.from({ length: 16 }, () => ({ x: 20 + r() * 560, y: r() * 260, len: 90 + r() * 220 }));
    return { spots, drips };
  }, []);

  return (
    <svg className="wipe__grime" viewBox="0 0 600 680" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <filter id={`${idp}-noise`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.028" numOctaves="4" seed="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.43  0 0 0 0 0.39  0 0 0 0 0.31  0 0 0 1.35 -0.47" />
        </filter>
      </defs>
      <rect width="600" height="680" fill="#D5CDB9" opacity="0.22" />
      <rect width="600" height="680" filter={`url(#${idp}-noise)`} />
      <g fill="none" stroke="#6E604A" strokeOpacity="0.28" strokeWidth="2.4" strokeLinecap="round">
        {drips.map((d, i) => (
          <path key={i} d={`M${d.x} ${d.y} q 4 ${d.len / 2} 0 ${d.len}`} />
        ))}
      </g>
      <g>
        {spots.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" fillOpacity="0.16" stroke="#7A6B52" strokeOpacity="0.32" />
        ))}
      </g>
    </svg>
  );
}

const START = 24;
const END = 58;

export function WindowWipe() {
  const idp = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const userMoved = useRef(false);
  const [p, setP] = useState(START);

  // A short demo wipe when the page loads, skipped for people who prefer less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(END);
      return;
    }
    let frame = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (userMoved.current) return;
      if (start === null) start = t;
      const k = Math.min(1, (t - start) / 1700);
      const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setP(START + (END - START) * eased);
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    const timer = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 500);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  const moveTo = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const v = ((clientX - box.left) / box.width) * 100;
    setP(Math.max(2, Math.min(98, v)));
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    userMoved.current = true;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <figure className="wipe-card">
      <div
        ref={ref}
        className="wipe"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="wipe__layer">
          <Scene idp={`${idp}c`} />
        </div>
        <div className="wipe__layer wipe__dirty" style={{ clipPath: `inset(0 0 0 ${p}%)` }}>
          <div className="wipe__layer wipe__blur">
            <Scene idp={`${idp}d`} />
          </div>
          <Grime idp={idp} />
        </div>

        <div className="wipe__frame" aria-hidden="true" />

        <span className={p > 18 ? "wipe__tag wipe__tag--after" : "wipe__tag wipe__tag--after is-hidden"}>After</span>
        <span className={p < 82 ? "wipe__tag wipe__tag--before" : "wipe__tag wipe__tag--before is-hidden"}>Before</span>

        <div className="squeegee" style={{ left: `${p}%` }} aria-hidden="true">
          <span className="squeegee__blade" />
          <span className="squeegee__handle" />
        </div>

        <input
          className="sr-only"
          type="range"
          min={0}
          max={100}
          value={Math.round(p)}
          aria-label="Squeegee position. Move it to clean the window."
          onChange={(e) => {
            userMoved.current = true;
            setP(Math.max(2, Math.min(98, Number(e.target.value))));
          }}
        />
      </div>
      <figcaption className="wipe__hint">
        <IconDrag /> Drag the squeegee across the glass
      </figcaption>
    </figure>
  );
}
