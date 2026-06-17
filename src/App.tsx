import { useReveal } from "./hooks/useReveal";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { Services } from "./components/Services";
import { OtherServicesPricing } from "./components/OtherServicesPricing";
import { Showcase } from "./components/Showcase";
import { Benefits } from "./components/Benefits";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { QuoteCalculator } from "./components/QuoteCalculator";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function App() {
  useReveal();

  return (
    <div className="relative min-h-screen bg-ink-950 text-silver-200 antialiased">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <OtherServicesPricing />
        <Showcase />
        <Benefits />
        <Testimonials />
        <QuoteCalculator />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
