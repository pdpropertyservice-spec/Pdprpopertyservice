import { IconArrow, IconCheck, IconPhone } from "./Icons";
import { PHONE } from "../content";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Window cleaning · Broome County, NY</p>
          <h1>
            Crystal-clear windows for <span className="accent-text">homes &amp; businesses.</span>
          </h1>
          <p className="hero__lede">
            Storefronts, restaurants, dealerships and homes across Binghamton, Vestal, Endicott and Johnson City.
            Locally owned, with the owner on every job.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary btn--lg" href="#quote">
              Get a free quote <IconArrow />
            </a>
            <a className="btn btn--ghost btn--lg" href={PHONE.href}>
              <IconPhone /> {PHONE.display}
            </a>
          </div>
          <ul className="hero__assure">
            <li>
              <IconCheck /> Free quotes, usually within 24 hours
            </li>
            <li>
              <IconCheck /> Storefront service from $50 a visit
            </li>
            <li>
              <IconCheck /> Not happy with a spot? Re-cleaned free
            </li>
          </ul>
        </div>

        <figure className="hero__photo">
          <img
            src="images/work/hero-pole.webp"
            srcSet="images/work/hero-pole-800.webp 800w, images/work/hero-pole.webp 1400w"
            sizes="(min-width: 1024px) 560px, 92vw"
            width={1400}
            height={1050}
            alt="Mike Pavlisak cleaning tall showroom windows with a water-fed pole"
            fetchPriority="high"
          />
          <figcaption>Showroom glass at a dealership in Endicott</figcaption>
        </figure>
      </div>
    </section>
  );
}
