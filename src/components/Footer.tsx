import { Logo } from "./Logo";
import { IconPhone, IconMail, IconPin } from "./Icons";

const SERVICES = ["Pressure Washing", "Junk Removal", "Snow Removal", "Lawn Care"];
const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#showcase" },
  { label: "Why Us", href: "#benefits" },
  { label: "Get a Quote", href: "#quote" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-white/[0.015]">
      {/* top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-forest-500/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver-400">
              Professional pressure washing & property maintenance.
              <span className="block font-medium text-silver-200">Your property. Our priority.</span>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-silver-400 transition-colors hover:text-forest-300">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-silver-400 transition-colors hover:text-forest-300">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Get in touch</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="tel:+16077598829" className="flex items-center gap-2.5 text-sm text-silver-300 hover:text-forest-300">
                  <IconPhone className="h-4 w-4 text-forest-400" /> Michael: (607) 759-8829
                </a>
              </li>
              <li>
                <a href="tel:+16073405957" className="flex items-center gap-2.5 text-sm text-silver-300 hover:text-forest-300">
                  <IconPhone className="h-4 w-4 text-forest-400" /> Takota: (607) 340-5957
                </a>
              </li>
              <li>
                <a href="mailto:pdpropertyservice@gmail.com" className="flex items-center gap-2.5 text-sm text-silver-300 hover:text-forest-300">
                  <IconMail className="h-4 w-4 text-forest-400" /> pdpropertyservice@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-silver-300">
                <IconPin className="h-4 w-4 text-forest-400" /> Broome County, NY
              </li>
            </ul>
            <p className="mt-4 text-sm text-silver-400">Owners: <span className="font-semibold text-white">Michael Pavlisak & Takota Dunlap</span></p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-silver-500">© {new Date().getFullYear()} PD Property Services. All rights reserved.</p>
          <p className="text-xs text-silver-500">Proudly serving Broome County & surrounding areas.</p>
        </div>
      </div>
    </footer>
  );
}
