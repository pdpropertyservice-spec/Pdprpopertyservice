const SRCSET = "images/logo-320.webp 320w, images/logo-640.webp 640w, images/logo-1200.webp 1200w";

/** The Pav's Window Co. badge logo. `large` is the hero version. */
export function Logo({ large = false, className = "" }: { large?: boolean; className?: string }) {
  if (large) {
    return (
      <img
        className={`logo-img logo-img--hero ${className}`}
        src="images/logo-1200.webp"
        srcSet={SRCSET}
        sizes="(min-width: 1024px) 460px, 92vw"
        width={1200}
        height={594}
        alt="Pav's Window Co."
        fetchPriority="high"
      />
    );
  }
  return (
    <a href="#top" className={`logo ${className}`} aria-label="Pav's Window Co. home">
      <img
        className="logo-img"
        src="images/logo-320.webp"
        srcSet={SRCSET}
        sizes="(min-width: 720px) 132px, 112px"
        width={320}
        height={158}
        alt=""
      />
    </a>
  );
}
