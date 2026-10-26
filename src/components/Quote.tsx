import { useState, type ChangeEvent, type FormEvent } from "react";
import { IconArrow, IconCheckCircle, IconMail, IconPhone, IconPin } from "./Icons";
import { BUSINESS, MAIN_PHONE } from "../content";

type Status = "idle" | "sending" | "sent" | "error";

const PROPERTY = ["Home", "Storefront / business"];
const CLEAN = ["Outside only", "Inside & outside", "Not sure yet"];
const FREQUENCY = ["One-time", "Every two weeks", "Monthly"];
const WINDOW_COUNTS = ["Fewer than 10", "10 to 20", "21 to 35", "More than 35", "Not sure"];

const EMPTY = {
  name: "",
  contact: "",
  address: "",
  property: PROPERTY[0],
  clean: CLEAN[1],
  frequency: FREQUENCY[0],
  windows: "",
  details: "",
};

function Choice({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="field field--choice">
      <legend>{legend}</legend>
      <div className="seg">
        {options.map((o, i) => {
          const id = `${name}-${i}`;
          return (
            <label key={o} htmlFor={id}>
              <input id={id} type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
              <span>{o}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Quote() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (key: keyof typeof EMPTY) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  const choose = (key: keyof typeof EMPTY) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const payload: Record<string, string> = {
      _subject: `Window cleaning quote request from ${form.name}`,
      name: form.name,
      contact: form.contact,
      address: form.address || "Not given",
      property: form.property,
      cleaning: form.clean,
      frequency: form.frequency,
      windows: form.windows || "Not given",
      details: form.details || "None",
    };
    const contact = form.contact.trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) payload.email = contact;

    try {
      const res = await fetch(`https://formspree.io/f/${BUSINESS.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Form service returned ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section quote" id="quote">
      <div className="wrap quote__grid">
        <div className="quote__intro">
          <p className="eyebrow">Free quote</p>
          <h2>Get your free window cleaning quote</h2>
          <p className="lead">
            Tell us a little about your windows and we'll send a flat-rate price, usually within 24 hours. No
            pressure and no obligation.
          </p>
          <ul className="contact-list">
            {BUSINESS.phones.map((ph) => (
              <li key={ph.href}>
                <span className="contact-list__icon">
                  <IconPhone />
                </span>
                <span>
                  <span className="contact-list__label">Call or text {ph.name}</span>
                  <a href={ph.href}>{ph.display}</a>
                </span>
              </li>
            ))}
            <li>
              <span className="contact-list__icon">
                <IconMail />
              </span>
              <span>
                <span className="contact-list__label">Email</span>
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </span>
            </li>
            <li>
              <span className="contact-list__icon">
                <IconPin />
              </span>
              <span>
                <span className="contact-list__label">Service area</span>
                <span className="contact-list__value">Broome County, NY</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="form-card">
          {status === "sent" ? (
            <div className="form-success" role="status">
              <span className="form-success__icon">
                <IconCheckCircle />
              </span>
              <h3>Thanks, {form.name.split(" ")[0] || "neighbor"}! Your request is in.</h3>
              <p>
                We'll get back to you within 24 hours. Need us sooner? Call or text{" "}
                <a href={MAIN_PHONE.href}>{MAIN_PHONE.display}</a>.
              </p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setForm(EMPTY);
                  setStatus("idle");
                }}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit}>
              <div className="form__row form__row--2">
                <div className="field">
                  <label htmlFor="q-name">Your name</label>
                  <input
                    id="q-name"
                    className="input"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                  />
                </div>
                <div className="field">
                  <label htmlFor="q-contact">Phone or email</label>
                  <input
                    id="q-contact"
                    className="input"
                    required
                    autoComplete="tel"
                    value={form.contact}
                    onChange={update("contact")}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="q-address">
                  Street address or town <span className="field__opt">(optional)</span>
                </label>
                <input
                  id="q-address"
                  className="input"
                  autoComplete="street-address"
                  value={form.address}
                  onChange={update("address")}
                />
              </div>

              <Choice name="q-property" legend="Property" options={PROPERTY} value={form.property} onChange={choose("property")} />
              <Choice name="q-clean" legend="Cleaning" options={CLEAN} value={form.clean} onChange={choose("clean")} />
              <Choice name="q-frequency" legend="How often" options={FREQUENCY} value={form.frequency} onChange={choose("frequency")} />

              <div className="field">
                <label htmlFor="q-windows">
                  About how many windows? <span className="field__opt">(optional)</span>
                </label>
                <select id="q-windows" className="input" value={form.windows} onChange={update("windows")}>
                  <option value="">Choose one</option>
                  {WINDOW_COUNTS.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="q-details">
                  Anything else we should know? <span className="field__opt">(optional)</span>
                </label>
                <textarea
                  id="q-details"
                  className="input"
                  rows={3}
                  placeholder="For example: two-story house, a few hard-to-reach windows"
                  value={form.details}
                  onChange={update("details")}
                />
              </div>

              {status === "error" && (
                <p className="form__error" role="alert">
                  Your request didn't go through. Please try again, or call or text{" "}
                  <a href={MAIN_PHONE.href}>{MAIN_PHONE.display}</a>.
                </p>
              )}

              <button type="submit" className="btn btn--amber btn--lg form__submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send my quote request"}
                {status !== "sending" && <IconArrow />}
              </button>
              <p className="form__note">We reply within 24 hours. We only use your info to send your quote.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
