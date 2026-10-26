import { Logo } from "./Logo";
import { BUSINESS, NAV, PHONE } from "../content";

const SERVICES = ["Home windows", "Storefront & business", "Inside & outside", "Regular cleanings"];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo variant="footer" />
            <p>Window cleaning for homes and storefronts in {BUSINESS.region}.</p>
            <p className="footer__owner">Owned and operated by {BUSINESS.owner}.</p>
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
              <li>
                <a href={PHONE.href}>{PHONE.display}</a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="footer__email">
                  {BUSINESS.email}
                </a>
              </li>
              <li>{BUSINESS.region}</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {BUSINESS.name} All rights reserved.
          </span>
          <span>Locally owned and operated in {BUSINESS.region}</span>
        </div>
      </div>
    </footer>
  );
}
