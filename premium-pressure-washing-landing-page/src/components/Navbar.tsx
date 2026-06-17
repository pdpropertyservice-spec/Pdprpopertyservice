import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Logo } from "./Logo";
import { IconPhone } from "./Icons";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#showcase" },
  { label: "Why Us", href: "#benefits" },
  { label: "Quote", href: "#quote" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500",
            scrolled ? "glass-strong shadow-2xl shadow-black/40" : "border border-transparent"
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-silver-300 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+16077598829"
              className="hidden items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-sm font-semibold text-silver-200 transition-all hover:border-forest-400/50 hover:text-white sm:flex"
            >
              <IconPhone className="h-4 w-4 text-forest-400" />
              (607) 759-8829
            </a>
            <a
              href="#quote"
              className="group relative hidden overflow-hidden rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-forest-900/40 transition-transform hover:scale-[1.03] md:inline-flex"
            >
              <span className="relative z-10">Free Quote</span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-silver-200 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <div className="flex flex-col gap-1.5">
                <span className={cn("h-0.5 w-5 bg-current transition-all", open && "translate-y-2 rotate-45")} />
                <span className={cn("h-0.5 w-5 bg-current transition-all", open && "opacity-0")} />
                <span className={cn("h-0.5 w-5 bg-current transition-all", open && "-translate-y-2 -rotate-45")} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 lg:hidden",
            open ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="glass-strong flex flex-col gap-1 rounded-2xl p-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-silver-200 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#quote"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-gradient-to-br from-forest-500 to-forest-700 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
