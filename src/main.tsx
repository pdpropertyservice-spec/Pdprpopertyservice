import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SITE_THEME } from "./content";

// A preview can override the look before this runs; otherwise use the chosen one.
document.documentElement.dataset.theme ||= SITE_THEME;

// The built page is pre-filled by scripts/prerender.cjs (so search engines can read it
// without running scripts); React then takes it over. If it's empty, render from scratch.
const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
