import { Logo } from "./Logo";
import { BUSINESS, NAV } from "../content";

const SERVICES = ["Home windows", "Storefront & business", "Inside & outside", "Regular cleanings"];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo light />
            <p>Window cleaning for homes and storefronts in Broome County, NY.</p>
            <p className="footer__owners">Owned and operated by {BUSINESS.owners}.</p>
          </div>

          <div>
            <h3>Services</h3>
            <ul>
              {SERVICES.map((s) => (
                <li key={s}>
                  <a href="#services">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              {NAV.filter((l) => l.href !== "#services").map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
              <li>
                <a href="#quote">Free quote</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              {BUSINESS.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href}>
                    {p.name}: {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="footer__email">
                  {BUSINESS.email}
                </a>
              </li>
              <li>Broome County, NY</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Pav's Window Co. All rights reserved.</p>
          <p>Locally owned and operated in Broome County, NY.</p>
        </div>
      </div>
    </footer>
  );
}
