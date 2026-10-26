import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { IconArrow, IconClose, IconMenu, IconPhone } from "./Icons";
import { NAV, PHONE } from "../content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={scrolled || open ? "header is-scrolled" : "header"}>
      <div className="wrap header__inner">
        <Logo />

        <nav className="nav" aria-label="Main">
          {NAV.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={PHONE.href}>
            <IconPhone /> {PHONE.display}
          </a>
          <a className="btn btn--primary header__cta" href="#quote">
            Free quote
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="mobile-nav" hidden={!open}>
        <nav className="wrap mobile-nav__inner" aria-label="Mobile">
          {NAV.map((l) => (
            <a key={l.href} className="mobile-nav__link" href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <div className="mobile-nav__actions">
            <a className="btn btn--ghost" href={PHONE.href} onClick={close}>
              <IconPhone /> Call or text {PHONE.display}
            </a>
            <a className="btn btn--primary" href="#quote" onClick={close}>
              Get a free quote <IconArrow />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
