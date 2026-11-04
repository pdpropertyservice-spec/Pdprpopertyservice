import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SITE_THEME } from "./content";

// A preview can override the look before this runs; otherwise use the chosen one.
document.documentElement.dataset.theme ||= SITE_THEME;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
