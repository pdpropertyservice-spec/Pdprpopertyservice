import { IconCalendar, IconCheck, IconCheckCircle, IconRepeat, IconWindow } from "./Icons";

const INK = "#0E2133";
const NAVY = "#16324A";
const GLASS = "#BFE2F7";
const AMBER = "#F4B63F";

/** A window: frame, glass, cross bars and a shine line. */
function Pane({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill={GLASS} stroke={NAVY} strokeWidth="3" />
      <path d={`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`} stroke={NAVY} strokeWidth="2.5" />
      <path
        d={`M${x + 5} ${y + h / 2 - 5} L${x + w / 2 - 5} ${y + 5}`}
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </g>
  );
}

function Sparkle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -9 C1 -3 3 -1 9 0 C3 1 1 3 0 9 C-1 3 -3 1 -9 0 C-3 -1 -1 -3 0 -9Z"
      fill={AMBER}
    />
  );
}

function HouseArt() {
  return (
    <svg viewBox="0 0 320 190" role="img" aria-label="Illustration of a house with sparkling clean windows">
      <rect x="0" y="176" width="320" height="14" fill="#CFE3D3" />
      <rect x="208" y="34" width="20" height="44" fill={NAVY} />
      <rect x="78" y="84" width="164" height="92" fill="#FFFFFF" stroke="#C3D1DC" strokeWidth="2" />
      <path d="M64 88 L160 26 L256 88 Z" fill={NAVY} />
      <rect x="60" y="84" width="200" height="8" rx="2" fill={INK} />
      <circle cx="160" cy="62" r="11" fill={GLASS} stroke="#FFFFFF" strokeWidth="3" />
      <Pane x={94} y={106} w={44} h={40} />
      <Pane x={182} y={106} w={44} h={40} />
      <rect x="143" y="120" width="34" height="56" rx="2" fill={AMBER} />
      <circle cx="170" cy="150" r="2.5" fill={INK} />
      <ellipse cx="56" cy="174" rx="32" ry="15" fill="#7FAE8E" />
      <ellipse cx="268" cy="174" rx="30" ry="14" fill="#7FAE8E" />
      <Sparkle x={86} y={104} />
      <Sparkle x={236} y={142} s={0.75} />
      <Sparkle x={176} y={56} s={0.6} />
    </svg>
  );
}

function StorefrontArt() {
  const stripes = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg viewBox="0 0 320 190" role="img" aria-label="Illustration of a storefront with sparkling clean glass">
      <rect x="0" y="176" width="320" height="14" fill="#DCE5EC" />
      <rect x="44" y="22" width="232" height="154" fill="#FFFFFF" stroke="#C3D1DC" strokeWidth="2" />
      <rect x="40" y="18" width="240" height="12" rx="2" fill={INK} />
      <Pane x={68} y={42} w={48} h={32} />
      <Pane x={136} y={42} w={48} h={32} />
      <Pane x={204} y={42} w={48} h={32} />
      <rect x="62" y="86" width="196" height="14" rx="3" fill={NAVY} />
      {stripes.map((i) => (
        <rect key={i} x={52 + i * 20} y="104" width="20" height="16" fill={i % 2 ? "#FCE6B0" : AMBER} />
      ))}
      <path
        d={`M52 120 ${stripes.map(() => "q 10 10 20 0").join(" ")}`}
        fill={AMBER}
        stroke={AMBER}
        strokeWidth="1"
      />
      <rect x="58" y="134" width="80" height="42" fill={GLASS} stroke={NAVY} strokeWidth="3" />
      <rect x="182" y="134" width="80" height="42" fill={GLASS} stroke={NAVY} strokeWidth="3" />
      <rect x="146" y="134" width="28" height="42" fill={GLASS} stroke={NAVY} strokeWidth="3" />
      <rect x="166" y="150" width="3" height="12" rx="1.5" fill={NAVY} />
      <path d="M66 166 L92 140 M78 168 L100 146" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <path d="M190 166 L216 140 M202 168 L224 146" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <Sparkle x={130} y={140} />
      <Sparkle x={256} y={168} s={0.75} />
    </svg>
  );
}

const CLEANS = [
  { title: "Outside only", desc: "We clean the outside of every window. You don't need to be home." },
  { title: "Inside & outside", desc: "Both sides of every pane for the clearest view. Our most complete clean." },
];

const FREQUENCY = [
  { icon: IconCalendar, title: "One-time clean", desc: "A seasonal refresh, or before guests arrive" },
  { icon: IconRepeat, title: "Every two weeks", desc: "Popular with storefronts" },
  { icon: IconWindow, title: "Once a month", desc: "Keeps your glass clear all year" },
];

const INCLUDED = [
  "Every pane cleaned edge to edge",
  "Corners and edges detailed",
  "Drips wiped from frames and sills",
  "Streak-free, or we re-clean it free",
];

export function Services() {
  return (
    <section className="section section--white" id="services">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">What we clean</p>
          <h2>Windows are all we do.</h2>
          <p className="lead">
            That means every pane gets our full attention, whether it's your home or your storefront.
          </p>
        </header>

        <div className="svc-grid">
          <article className="svc">
            <div className="svc__art">
              <HouseArt />
            </div>
            <div className="svc__body">
              <p className="svc__kicker">Residential</p>
              <h3>Home window cleaning</h3>
              <p>Clear, streak-free windows for houses of every size, from small homes to large two-story houses.</p>
              <ul className="checks">
                <li>
                  <IconCheck /> Single-story and two-story homes
                </li>
                <li>
                  <IconCheck /> Outside only, or inside and outside
                </li>
                <li>
                  <IconCheck /> One-time cleans or a regular schedule
                </li>
              </ul>
            </div>
          </article>

          <article className="svc">
            <div className="svc__art">
              <StorefrontArt />
            </div>
            <div className="svc__body">
              <p className="svc__kicker">Commercial</p>
              <h3>Storefront &amp; business windows</h3>
              <p>Clean glass makes a great first impression. We keep storefronts and business windows looking sharp.</p>
              <ul className="checks">
                <li>
                  <IconCheck /> Storefront windows and glass doors
                </li>
                <li>
                  <IconCheck /> Offices and commercial buildings
                </li>
                <li>
                  <IconCheck /> Regular cleanings every two weeks or monthly
                </li>
              </ul>
            </div>
          </article>
        </div>

        <div className="choose">
          <div className="choose__panel">
            <h3 className="choose__title">Pick your clean</h3>
            <div className="choose__opts choose__opts--2">
              {CLEANS.map((c) => (
                <div className="opt" key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.desc}</span>
                </div>
              ))}
            </div>
            <p className="choose__note">Not sure which you need? We'll help you decide when we quote.</p>
          </div>
          <div className="choose__panel">
            <h3 className="choose__title">Pick how often</h3>
            <ul className="freq">
              {FREQUENCY.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.title}>
                    <span className="freq__icon">
                      <Icon />
                    </span>
                    <span>
                      <strong>{f.title}</strong>
                      <span>{f.desc}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="included">
          <h3>Every clean includes</h3>
          <ul>
            {INCLUDED.map((t) => (
              <li key={t}>
                <IconCheckCircle /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
