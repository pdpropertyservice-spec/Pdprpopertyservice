import { useState, type FormEvent } from "react";
import { IconPhone, IconMail, IconPin, IconCheck, IconArrow } from "./Icons";

export function CTA() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({ name: "", contact: "", service: "Pressure Washing", message: "" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const FORMSPREE_ID = "xjgddlaw";

    setStatus("submitting");
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          subject: `Website Lead: ${form.service}`,
          name: form.name,
          contact: form.contact,
          service: form.service,
          message: form.message
        }),
      });
      setStatus("success");
    } catch (err) {
      alert("Something went wrong. Please try calling or emailing us directly.");
      setStatus("idle");
    }
  };

  return (
    <section id="quote" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-forest-600/25 blur-[130px] animate-float-slow" />
        <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-forest-800/30 blur-[130px] animate-drift" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass-strong overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
          <div className="grid lg:grid-cols-2">
            {/* Left: pitch */}
            <div className="relative flex flex-col justify-center p-8 sm:p-12">
              <span className="reveal inline-flex w-fit items-center gap-2 rounded-full border border-forest-400/30 bg-forest-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-forest-300">
                Free Quote
              </span>
              <h2 className="reveal mt-5 text-3xl font-black leading-tight text-white sm:text-4xl" data-delay="60">
                Ready for a property that{" "}
                <span className="silver-sheen">turns heads?</span>
              </h2>
              <p className="reveal mt-4 text-silver-300" data-delay="120">
                Tell us what needs cleaning and we'll send a fast, honest quote—
                usually within 24 hours. No pressure, no obligation.
              </p>

              <ul className="reveal mt-8 space-y-4" data-delay="180">
                <li className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-500/15 text-forest-300"><IconPhone className="h-5 w-5" /></span>
                  <a href="tel:+16077598829" className="font-semibold text-white hover:text-forest-300">(607) 759-8829</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-500/15 text-forest-300"><IconMail className="h-5 w-5" /></span>
                  <a href="mailto:pdpropertyservice@gmail.com" className="font-semibold text-white hover:text-forest-300 break-all">pdpropertyservice@gmail.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-500/15 text-forest-300"><IconPin className="h-5 w-5" /></span>
                  <span className="font-semibold text-white">Broome County, NY & surrounding areas</span>
                </li>
              </ul>
            </div>

            {/* Right: form */}
            <div className="relative border-t border-white/10 bg-white/[0.02] p-8 sm:p-12 lg:border-l lg:border-t-0">
              {status === "success" ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-500/20 text-forest-300">
                    <IconCheck className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-white">Request Sent!</h3>
                  <p className="mt-2 max-w-sm text-silver-300">
                    Thanks for reaching out, {form.name}. Michael will review your details and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-silver-300">Name</label>
                    <input
                      id="name" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-silver-500 outline-none transition-colors focus:border-forest-400/60 focus:bg-white/[0.07]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-silver-300">Phone or email</label>
                    <input
                      id="contact" required value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      placeholder="How can we reach you?"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-silver-500 outline-none transition-colors focus:border-forest-400/60 focus:bg-white/[0.07]"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-silver-300">Service needed</label>
                    <select
                      id="service" value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-forest-400/60 focus:bg-white/[0.07] [&>option]:bg-ink-900"
                    >
                      <option>Pressure Washing</option>
                      <option>Junk Removal</option>
                      <option>Snow Removal</option>
                      <option>Lawn Care</option>
                      <option>Multiple services</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-silver-300">Details</label>
                    <textarea
                      id="message" rows={3} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your property and what you'd like cleaned…"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-silver-500 outline-none transition-colors focus:border-forest-400/60 focus:bg-white/[0.07]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-forest-400 to-forest-700 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-forest-900/40 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {status === "submitting" ? "Sending..." : "Send my request"}
                    <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-xs text-silver-500">No spam, ever. We only use your info to send your quote.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
