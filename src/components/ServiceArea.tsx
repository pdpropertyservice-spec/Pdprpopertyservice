import { IconPhone, IconPin } from "./Icons";
import { BUSINESS, PHONE } from "../content";

/* Towns along the Susquehanna, drawn as a simple schematic rather than a true map. */
const PINS = [
  { name: "Endicott", x: 88, y: 152, above: true },
  { name: "Johnson City", x: 198, y: 140, above: true },
  { name: "Binghamton", x: 312, y: 150, above: true },
  { name: "Vestal", x: 150, y: 240, above: false },
];

function AreaMap() {
  return (
    <div className="area-map" aria-hidden="true">
      <svg viewBox="0 0 400 376">
        <defs>
          <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4f6772" />
            <stop offset="1" stopColor="#a9b8c0" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="190" r="150" fill="none" stroke="#47cd69" strokeWidth="1.5" strokeDasharray="6 7" opacity="0.6" />
        <circle cx="200" cy="190" r="104" fill="none" stroke="#47cd69" strokeWidth="1" strokeDasharray="3 6" opacity="0.35" />
        <path
          d="M20 210c50-10 70-50 120-44s70 36 120 22 60-22 120-30"
          fill="none"
          stroke="url(#river)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M20 210c50-10 70-50 120-44s70 36 120 22 60-22 120-30"
          fill="none"
          stroke="#d4d1d1"
          strokeWidth="3"
          strokeDasharray="1 12"
          strokeLinecap="round"
          opacity="0.9"
        />
        {PINS.map((p) => (
          <g key={p.name} transform={`translate(${p.x} ${p.y})`}>
            <circle r="18" fill="#47cd69" opacity="0.14" />
            <circle r="9" fill="#050806" stroke="#47cd69" strokeWidth="3" />
            <circle r="3" fill="#47cd69" />
            <text className="map-label" x="0" y={p.above ? -22 : 40} textAnchor="middle">
              {p.name}
            </text>
          </g>
        ))}
        <text className="map-sub" x="200" y="364" textAnchor="middle">
          BROOME COUNTY, NY
        </text>
      </svg>
    </div>
  );
}

export function ServiceArea() {
  return (
    <section className="section section--soft" id="area">
      <div className="wrap area">
        <div className="area__inner">
          <p className="eyebrow">Service area</p>
          <h2>Proudly serving {BUSINESS.region}</h2>
          <p className="lead">
            We clean windows across the Triple Cities and the surrounding towns. If you're close by, we can probably
            help.
          </p>
          <ul className="area__towns">
            {BUSINESS.towns.map((t) => (
              <li key={t}>
                <IconPin /> {t}
              </li>
            ))}
            <li className="area__more">&amp; nearby towns</li>
          </ul>
          <p className="area__foot">
            Not sure if you're in range? Call or text{" "}
            <a href={PHONE.href}>
              <IconPhone /> {PHONE.display}
            </a>{" "}
            and we'll let you know.
          </p>
        </div>
        <AreaMap />
      </div>
    </section>
  );
}
