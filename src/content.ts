// Business details used across the site. Change them here and every section updates.

/** The site's look: "light" (white) or "dark" (black). */
export const SITE_THEME: "light" | "dark" = "light";

export const BUSINESS = {
  name: "Pav's Window Co.",
  owner: "Michael Pavlisak",
  email: "pdpropertyservice@gmail.com",
  phone: { display: "(607) 759-8829", href: "tel:+16077598829" },
  formspreeId: "xojzondl",
  towns: ["Binghamton", "Vestal", "Endicott", "Johnson City"],
} as const;

export const PHONE = BUSINESS.phone;

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "Our work", href: "#work" },
  { label: "How it works", href: "#process" },
  { label: "Why Pav's", href: "#why" },
  { label: "FAQ", href: "#faq" },
];
