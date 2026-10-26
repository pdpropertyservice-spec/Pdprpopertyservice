type Props = { variant?: "header" | "footer" };

/** Pav's Window Co. logo artwork. The image already contains the name and tagline. */
export function Logo({ variant = "header" }: Props) {
  return (
    <a href="#top" className={`logo logo--${variant}`} aria-label="Pav's Window Co. home">
      <img src="/images/logo-small.webp" width={700} height={336} alt="" decoding="async" />
    </a>
  );
}
