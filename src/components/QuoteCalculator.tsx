import { useState, useMemo } from "react";
import { SectionHeading } from "./Primitives";
import { IconCheck } from "./Icons";
import { cn } from "../utils/cn";

const PROPERTY_TYPES = [
  { id: "townhouse", label: "Townhouse / Small Home", basePrice: 0 },
  { id: "single", label: "Single Family Home", basePrice: 25 },
  { id: "large", label: "Large Two-Story Home", basePrice: 50 },
  { id: "estate", label: "Estate / Complex Property", basePrice: 100 },
  { id: "commercial", label: "Commercial Storefront / Facility", basePrice: 125 },
] as const;

const BUILDUP_LEVELS = [
  { id: "light", label: "Light maintenance clean", desc: "12 months or less of buildup", multiplier: 0.95 },
  { id: "standard", label: "Standard algae and dirt buildup", desc: "Typical 1-3 year exterior reset", multiplier: 1.0 },
  { id: "heavy", label: "Heavy organic growth / oil / staining", desc: "Requires stronger dwell time and post-treatment", multiplier: 1.25 },
] as const;

const ACCESS_LEVELS = [
  { id: "easy", label: "Easy access", desc: "Clear paths and normal grade", modifier: 0 },
  { id: "tight", label: "Tight access or steep grade", desc: "Extra setup/safety time", modifier: 35 },
  { id: "complex", label: "Complex access / multi-level", desc: "Difficult water access or safety staging", modifier: 75 },
] as const;

const SETUP_FEE = 35;

export function QuoteCalculator() {
  const [propertyType, setPropertyType] = useState<(typeof PROPERTY_TYPES)[number]["id"]>("single");
  const [buildup, setBuildup] = useState<(typeof BUILDUP_LEVELS)[number]["id"]>("standard");
  const [access, setAccess] = useState<(typeof ACCESS_LEVELS)[number]["id"]>("easy");
  const [selectedServices, setSelectedServices] = useState<string[]>(["house", "driveway"]);

  const [houseSqft, setHouseSqft] = useState(2000);
  const [drivewayCars, setDrivewayCars] = useState(2);
  const [deckL, setDeckL] = useState(15);
  const [deckW, setDeckW] = useState(10);
  const [binCount, setBinCount] = useState(2);
  const [roofEnabled, setRoofEnabled] = useState(false);
  const [gutterEnabled, setGutterEnabled] = useState(false);

  // Formspree Lead Capture State
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    const propBase = PROPERTY_TYPES.find((p) => p.id === propertyType)?.basePrice ?? 0;
    const buildupMult = BUILDUP_LEVELS.find((b) => b.id === buildup)?.multiplier ?? 1.0;
    const accessMod = ACCESS_LEVELS.find((a) => a.id === access)?.modifier ?? 0;

    const lineItems: { id: string; label: string; desc: string; price: number }[] = [];

    if (selectedServices.includes("house")) {
      const price = Math.max(199, Math.round(houseSqft * 0.16));
      lineItems.push({ id: "house", label: "House Soft Washing", desc: `${houseSqft} sq ft`, price });
    }

    if (selectedServices.includes("driveway")) {
      const price = 125 + Math.max(0, drivewayCars - 2) * 45;
      lineItems.push({ id: "driveway", label: "Driveway Surface Cleaning", desc: `${drivewayCars} car capacity`, price });
    }

    if (selectedServices.includes("deck")) {
      const sqft = deckL * deckW;
      const price = Math.max(175, Math.round(sqft * 0.65));
      lineItems.push({ id: "deck", label: "Deck / Patio Restoration", desc: `${deckL}ft × ${deckW}ft (${sqft} sq ft)`, price });
    }

    if (selectedServices.includes("bins")) {
      const price = binCount * 20;
      lineItems.push({ id: "bins", label: "Garbage Can Cleaning", desc: `${binCount} bins`, price });
    }

    if (roofEnabled) {
      lineItems.push({ id: "roof", label: "Roof Treatment", desc: "Starting service", price: 299 });
    }

    if (gutterEnabled) {
      lineItems.push({ id: "gutter", label: "Gutter Brightening", desc: "Starting service", price: 99 });
    }

    const subtotal = lineItems.reduce((sum, item) => sum + item.price, 0);
    const discount = lineItems.length >= 3 ? Math.round(subtotal * 0.1) : 0;
    const baseTotal = (subtotal - discount + propBase + accessMod) * buildupMult;
    const total = Math.round(baseTotal + SETUP_FEE);
    const low = Math.round((total * 0.92) / 5) * 5;
    const high = Math.round((total * 1.08) / 5) * 5;

    return { lineItems, subtotal, discount, propBase, accessMod, low, high };
  }, [propertyType, buildup, access, selectedServices, houseSqft, drivewayCars, deckL, deckW, binCount, roofEnabled, gutterEnabled]);

  const handleBook = async () => {
    const FORMSPREE_ID = "xjgddlaw";

    setSubmitStatus("submitting");
    const lines = estimate.lineItems.map((item) => `- ${item.label} (${item.desc}): $${item.price}`).join("\n");

    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          subject: "New Calculator Estimate Request",
          name: customerName,
          contact: customerContact,
          address: customerAddress,
          propertyType,
          condition: buildup,
          access,
          services: lines,
          subtotal: `$${estimate.subtotal}`,
          estimatedTotal: `$${estimate.low} - $${estimate.high}`,
        }),
      });
      setSubmitStatus("success");
    } catch (err) {
      alert("Error sending request. Please call us directly.");
      setSubmitStatus("idle");
    }
  };

  return (
    <section id="quote" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Instant Quote"
          title="Build your"
          highlight="custom package"
          subtitle="Get a competitive, market-accurate estimate instantly. Select your property size and needs below."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500/20 text-xs font-black text-forest-300">1</span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-forest-300">Property Scale</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PROPERTY_TYPES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPropertyType(p.id)}
                    className={cn(
                      "relative flex flex-col items-start rounded-xl border p-4 text-left transition-all",
                      propertyType === p.id ? "border-forest-400/50 bg-forest-500/10 shadow-lg" : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    )}
                  >
                    <span className="text-sm font-semibold text-white">{p.label}</span>
                    <span className="mt-1 text-xs text-silver-500">
                      {p.basePrice > 0 ? `+$${p.basePrice} size adj.` : "Base scale"}
                    </span>
                    {propertyType === p.id && <IconCheck className="absolute right-3 top-3 h-4 w-4 text-forest-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500/20 text-xs font-black text-forest-300">2</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-forest-300">Buildup Level</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {BUILDUP_LEVELS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBuildup(b.id)}
                      className={cn("rounded-xl border p-4 text-left transition-all", buildup === b.id ? "border-forest-400/50 bg-forest-500/10" : "border-white/10 bg-white/[0.02] hover:border-white/20")}
                    >
                      <span className={cn("text-sm font-semibold", buildup === b.id ? "text-white" : "text-silver-200")}>{b.label}</span>
                      <span className="mt-1 block text-xs text-silver-500">{b.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500/20 text-xs font-black text-forest-300">3</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-forest-300">Access Complexity</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {ACCESS_LEVELS.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAccess(a.id)}
                      className={cn("rounded-xl border p-4 text-left transition-all", access === a.id ? "border-forest-400/50 bg-forest-500/10" : "border-white/10 bg-white/[0.02] hover:border-white/20")}
                    >
                      <span className={cn("text-sm font-semibold", access === a.id ? "text-white" : "text-silver-200")}>{a.label}</span>
                      <span className="mt-1 block text-xs text-silver-500">{a.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500/20 text-xs font-black text-forest-300">4</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-forest-300">Services & Measured Surfaces</h3>
                </div>
                {estimate.lineItems.length >= 3 && <span className="rounded-full bg-forest-500/20 px-3 py-1 text-xs font-bold text-forest-300">3+ services save 10%</span>}
              </div>

              <div className="flex flex-col gap-4">
                <ServiceItem label="House Soft Washing" isSelected={selectedServices.includes("house")} onToggle={() => toggleService("house")} unit={`${houseSqft} sq ft`}>
                  <input type="range" min="800" max="6000" step="100" value={houseSqft} onChange={(e) => setHouseSqft(Number(e.target.value))} className="slider-thumb h-2 w-full cursor-pointer rounded-lg bg-white/10" />
                </ServiceItem>

                <ServiceItem label="Driveway Surface Cleaning" isSelected={selectedServices.includes("driveway")} onToggle={() => toggleService("driveway")} unit={`${drivewayCars} car capacity`}>
                  <input type="range" min="2" max="10" step="1" value={drivewayCars} onChange={(e) => setDrivewayCars(Number(e.target.value))} className="slider-thumb h-2 w-full cursor-pointer rounded-lg bg-white/10" />
                </ServiceItem>

                <ServiceItem label="Deck / Patio Restoration" isSelected={selectedServices.includes("deck")} onToggle={() => toggleService("deck")} unit={`${deckL}ft × ${deckW}ft (${deckL * deckW} sq ft)`}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[10px] uppercase tracking-wider text-silver-500">Length (ft)</label>
                      <input type="range" min="5" max="50" step="1" value={deckL} onChange={(e) => setDeckL(Number(e.target.value))} className="slider-thumb h-2 w-full cursor-pointer rounded-lg bg-white/10" />
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] uppercase tracking-wider text-silver-500">Width (ft)</label>
                      <input type="range" min="5" max="50" step="1" value={deckW} onChange={(e) => setDeckW(Number(e.target.value))} className="slider-thumb h-2 w-full cursor-pointer rounded-lg bg-white/10" />
                    </div>
                  </div>
                </ServiceItem>

                <ServiceItem label="Garbage Can Cleaning" isSelected={selectedServices.includes("bins")} onToggle={() => toggleService("bins")} unit={`${binCount} bins ($20/ea)`}>
                  <input type="range" min="1" max="8" step="1" value={binCount} onChange={(e) => setBinCount(Number(e.target.value))} className="slider-thumb h-2 w-full cursor-pointer rounded-lg bg-white/10" />
                </ServiceItem>

                <ToggleItem label="Roof Treatment" enabled={roofEnabled} onToggle={() => setRoofEnabled((v) => !v)} />
                <ToggleItem label="Gutter Brightening" enabled={gutterEnabled} onToggle={() => setGutterEnabled((v) => !v)} />
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col rounded-2xl border border-forest-400/30 bg-forest-950/50 p-6 shadow-2xl">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-forest-300">Live Quote</h3>
              <div className="space-y-3 border-b border-white/10 pb-5 text-sm">
                {estimate.lineItems.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3">
                    <div>
                      <p className="text-silver-300">{item.label}</p>
                      <p className="text-xs text-silver-500">{item.desc}</p>
                    </div>
                    <span className="font-bold text-forest-300">${item.price}</span>
                  </div>
                ))}
                {estimate.discount > 0 && (
                  <div className="flex justify-between font-bold text-forest-300">
                    <span>Bundle Savings</span>
                    <span>-${estimate.discount}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2 py-5 text-xs text-silver-500">
                <div className="flex justify-between"><span>Property Adj.</span><span>${estimate.propBase}</span></div>
                <div className="flex justify-between"><span>Access Fee</span><span>${estimate.accessMod}</span></div>
                <div className="flex justify-between"><span>Visit Fee</span><span>${SETUP_FEE}</span></div>
              </div>
              <div className="rounded-xl border border-forest-400/40 bg-forest-500/5 p-5 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-silver-500">Estimated Range</span>
                <div className="mt-1 silver-text text-4xl font-black">${estimate.low} - ${estimate.high}</div>
              </div>
              {submitStatus === "success" ? (
                <div className="mt-6 rounded-xl border border-forest-400/30 bg-forest-500/20 p-5 text-center shadow-lg">
                  <IconCheck className="mx-auto mb-2 h-8 w-8 text-forest-400" />
                  <h4 className="text-lg font-bold text-white">Quote Request Sent!</h4>
                  <p className="mt-1 text-sm text-silver-300">Michael will review your details and contact you shortly.</p>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-silver-500 outline-none transition-colors focus:border-forest-400/60 focus:bg-white/[0.07]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Phone or Email"
                    value={customerContact}
                    onChange={(e) => setCustomerContact(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-silver-500 outline-none transition-colors focus:border-forest-400/60 focus:bg-white/[0.07]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Property Address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-silver-500 outline-none transition-colors focus:border-forest-400/60 focus:bg-white/[0.07]"
                  />
                  <button
                    onClick={handleBook}
                    disabled={estimate.lineItems.length === 0 || !customerName || !customerContact || submitStatus === "submitting"}
                    className="w-full rounded-xl bg-forest-500 py-4 font-bold text-white transition-all hover:bg-forest-600 disabled:opacity-50 disabled:grayscale"
                  >
                    {submitStatus === "submitting" ? "Sending..." : "Request This Package"}
                  </button>
                  <p className="text-center text-xs text-silver-500 mt-2">No commitment. Fast follow-up.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ label, isSelected, onToggle, unit, children }: { label: string; isSelected: boolean; onToggle: () => void; unit: string; children: React.ReactNode; }) {
  return (
    <div className={cn("rounded-xl border p-5 transition-all", isSelected ? "border-forest-400/30 bg-forest-500/5" : "border-white/10 bg-white/[0.02]")}>
      <label className="flex cursor-pointer items-start gap-3">
        <input type="checkbox" checked={isSelected} onChange={onToggle} className="mt-0.5 h-5 w-5 appearance-none rounded border-2 border-white/20 bg-white/5 checked:bg-forest-500" />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className={cn("text-sm font-semibold", isSelected ? "text-white" : "text-silver-300")}>{label}</span>
            {isSelected && <span className="text-xs font-bold text-forest-300">{unit}</span>}
          </div>
          {isSelected && <div className="mt-4">{children}</div>}
        </div>
      </label>
    </div>
  );
}

function ToggleItem({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: () => void; }) {
  return (
    <div className={cn("rounded-xl border p-5 transition-all", enabled ? "border-forest-400/30 bg-forest-500/5" : "border-white/10 bg-white/[0.02]")}>
      <label className="flex cursor-pointer items-center gap-3">
        <input type="checkbox" checked={enabled} onChange={onToggle} className="h-5 w-5 appearance-none rounded border-2 border-white/20 bg-white/5 checked:bg-forest-500" />
        <span className={cn("text-sm font-semibold", enabled ? "text-white" : "text-silver-300")}>{label}</span>
      </label>
    </div>
  );
}
