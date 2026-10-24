import { useReveal } from "./hooks/useReveal";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Benefits } from "./components/Benefits";
import { FAQ } from "./components/FAQ";
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
        <Process />
        <Benefits />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
