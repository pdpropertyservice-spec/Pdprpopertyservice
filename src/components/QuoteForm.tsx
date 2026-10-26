import { useState, type ChangeEvent, type FormEvent } from "react";
import { IconArrow, IconCheckCircle } from "./Icons";
import { BUSINESS, PHONE } from "../content";

type Status = "idle" | "sending" | "sent" | "error";

const PROPERTY = ["Home", "Business"];
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Sends a quote request to Formspree. Throws on failure. */
async function sendQuote(payload: Record<string, string>) {
  const res = await fetch(`https://formspree.io/f/${BUSINESS.formspreeId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Form service returned ${res.status}`);
}

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

/** The two-field quote bar in the hero: name and a way to reach you. */
export function QuickQuote() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const payload: Record<string, string> = {
      _subject: `Window cleaning quote request from ${name}`,
      form: "Quick quote (top of page)",
      name,
      contact,
    };
    if (EMAIL_RE.test(contact.trim())) payload.email = contact.trim();
    try {
      await sendQuote(payload);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="quick quick__done" role="status">
        <IconCheckCircle />
        <span>
          <strong>Thanks, {name.split(" ")[0] || "neighbor"}. Your request is in.</strong>
          <p>
            Michael will reach out within 24 hours. Need us sooner? Call or text <a href={PHONE.href}>{PHONE.display}</a>.
          </p>
        </span>
      </div>
    );
  }

  return (
    <div className="quick">
      <form className="quick__form" onSubmit={onSubmit} aria-label="Quick quote request">
        <div className="quick__field">
          <label className="sr-only" htmlFor="qq-name">
            Your name
          </label>
          <input
            id="qq-name"
            required
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="quick__field">
          <label className="sr-only" htmlFor="qq-contact">
            Phone or email
          </label>
          <input
            id="qq-contact"
            required
            autoComplete="tel"
            placeholder="Phone or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Get my free quote"}
          {status !== "sending" && <IconArrow />}
        </button>
      </form>
      {status === "error" ? (
        <p className="quick__alt form__error" role="alert">
          Your request didn't go through. Please try again, or call or text <a href={PHONE.href}>{PHONE.display}</a>.
        </p>
      ) : (
        <p className="quick__alt">
          No obligation. Prefer to talk? Call or text <a href={PHONE.href}>{PHONE.display}</a>.
        </p>
      )}
    </div>
  );
}

/** The full quote request form near the bottom of the page. */
export function QuoteForm({ idPrefix }: { idPrefix: string }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const id = (k: string) => `${idPrefix}-${k}`;

  const update =
    (key: keyof typeof EMPTY) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  const choose = (key: keyof typeof EMPTY) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const payload: Record<string, string> = {
      _subject: `Window cleaning quote request from ${form.name}`,
      form: "Full quote form",
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
    if (EMAIL_RE.test(contact)) payload.email = contact;

    try {
      await sendQuote(payload);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon">
          <IconCheckCircle />
        </span>
        <h3>Thanks, {form.name.split(" ")[0] || "neighbor"}. Your request is in.</h3>
        <p>
          Michael will get back to you within 24 hours. Need us sooner? Call or text{" "}
          <a href={PHONE.href}>{PHONE.display}</a>.
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
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__row form__row--2">
        <div className="field">
          <label htmlFor={id("name")}>Your name</label>
          <input id={id("name")} className="input" required autoComplete="name" value={form.name} onChange={update("name")} />
        </div>
        <div className="field">
          <label htmlFor={id("contact")}>Phone or email</label>
          <input
            id={id("contact")}
            className="input"
            required
            autoComplete="tel"
            value={form.contact}
            onChange={update("contact")}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor={id("address")}>
          Street address or town <span className="field__opt">(optional)</span>
        </label>
        <input
          id={id("address")}
          className="input"
          autoComplete="street-address"
          value={form.address}
          onChange={update("address")}
        />
      </div>

      <Choice name={id("property")} legend="Property" options={PROPERTY} value={form.property} onChange={choose("property")} />
      <Choice name={id("clean")} legend="Cleaning" options={CLEAN} value={form.clean} onChange={choose("clean")} />
      <Choice
        name={id("frequency")}
        legend="How often"
        options={FREQUENCY}
        value={form.frequency}
        onChange={choose("frequency")}
      />

      <div className="field">
        <label htmlFor={id("windows")}>
          About how many windows? <span className="field__opt">(optional)</span>
        </label>
        <select id={id("windows")} className="input" value={form.windows} onChange={update("windows")}>
          <option value="">Choose one</option>
          {WINDOW_COUNTS.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={id("details")}>
          Anything else we should know? <span className="field__opt">(optional)</span>
        </label>
        <textarea
          id={id("details")}
          className="input"
          rows={3}
          placeholder="For example: two-story house, a few hard-to-reach windows"
          value={form.details}
          onChange={update("details")}
        />
      </div>

      {status === "error" && (
        <p className="form__error" role="alert">
          Your request didn't go through. Please try again, or call or text <a href={PHONE.href}>{PHONE.display}</a>.
        </p>
      )}

      <button type="submit" className="btn btn--primary btn--lg form__submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my quote request"}
        {status !== "sending" && <IconArrow />}
      </button>
      <p className="form__note">We reply within 24 hours. We only use your info to send your quote.</p>
    </form>
  );
}
