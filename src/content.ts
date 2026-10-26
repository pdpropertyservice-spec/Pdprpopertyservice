// Business details used across the site. Change them here and every section updates.
export const BUSINESS = {
  name: "Pav's Window Co.",
  email: "pdpropertyservice@gmail.com",
  owners: "Michael Pavlisak & Takota Dunlap",
  formspreeId: "xojzondl",
  phones: [
    { name: "Michael", display: "(607) 759-8829", href: "tel:+16077598829" },
    { name: "Takota", display: "(607) 340-5957", href: "tel:+16073405957" },
  ],
  towns: ["Binghamton", "Vestal", "Endicott", "Johnson City"],
} as const;

export const MAIN_PHONE = BUSINESS.phones[0];

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Why Pav's", href: "#why" },
  { label: "Service area", href: "#area" },
  { label: "FAQ", href: "#faq" },
];
