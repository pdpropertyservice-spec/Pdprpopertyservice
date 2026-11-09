const PAIRS = [
  {
    before: "images/work/storefront-before.webp",
    after: "images/work/storefront-after.webp",
    w: 520,
    h: 781,
    caption: "Restaurant windows in Vestal, outside",
    alt: "the restaurant's side windows",
  },
  {
    before: "images/work/inside-before.webp",
    after: "images/work/inside-after.webp",
    w: 520,
    h: 686,
    caption: "Built-up film and streaks, cleaned from the inside",
    alt: "a back-room window seen from inside",
  },
];

const PHOTOS = [
  { src: "images/work/dealership.webp", w: 1200, h: 675, caption: "Dealership showroom, Endicott", wide: true },
  { src: "images/work/restaurant-front.webp", w: 600, h: 800, caption: "Restaurant storefront, Vestal", wide: false },
  { src: "images/work/restaurant-glass.webp", w: 450, h: 600, caption: "Patio glass, Vestal", wide: false },
];

export function Work() {
  return (
    <section className="section section--alt" id="work">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">Recent work</p>
          <h2 className="silver">See the difference.</h2>
          <p className="lead">Real jobs from around Broome County. Same windows, before and after.</p>
        </header>

        <div className="work__pairs">
          {PAIRS.map((p) => (
            <figure className="pair" key={p.caption}>
              <div className="pair__imgs">
                <div className="pair__side">
                  <img src={p.before} width={p.w} height={p.h} loading="lazy" alt={`Before window cleaning: ${p.alt}, dirty and streaked`} />
                  <span className="tag">Before</span>
                </div>
                <div className="pair__side">
                  <img src={p.after} width={p.w} height={p.h} loading="lazy" alt={`After window cleaning by Pav's Window Co.: ${p.alt}, streak-free`} />
                  <span className="tag tag--after">After</span>
                </div>
              </div>
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="work__photos">
          {PHOTOS.map((p) => (
            <figure className={p.wide ? "shot shot--wide" : "shot"} key={p.src}>
              <img src={p.src} width={p.w} height={p.h} loading="lazy" alt={`Commercial window cleaning by Pav's Window Co.: ${p.caption}, NY`} />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
