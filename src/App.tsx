import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { WhyUs } from "./components/WhyUs";
import { ServiceArea } from "./components/ServiceArea";
import { FAQ } from "./components/FAQ";
import { Quote } from "./components/Quote";
import { Footer } from "./components/Footer";
import { MobileBar } from "./components/MobileBar";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Process />
        <WhyUs />
        <ServiceArea />
        <FAQ />
        <Quote />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
