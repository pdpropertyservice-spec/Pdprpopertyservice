// Runs after `vite build`: fills dist/index.html's <div id="root"> with the page's HTML,
// so Google and other search engines can read the content without running JavaScript.
// The browser then takes over the same markup (see src/main.tsx).
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
// Built inside node_modules so the bundle finds react the normal way.
const tmp = path.join(root, "node_modules", ".cache", "prerender", "app.cjs");

esbuild.buildSync({
  stdin: {
    contents: `import { renderToString } from "react-dom/server"; import App from "./src/App"; import { createElement } from "react"; module.exports = () => renderToString(createElement(App));`,
    resolveDir: root,
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  outfile: tmp,
  external: ["react", "react-dom"],
  loader: { ".css": "empty" },
  logLevel: "warning",
});

// React adds image <link rel="preload"> tags at the start; they belong in <head>, not inside the app.
const html = require(tmp)().replace(/^(?:<link [^>]*\/>)+/, "");
const file = path.resolve(root, process.argv[2] || "dist/index.html");
const page = fs.readFileSync(file, "utf8");
const re = /<div id="root"><\/div>/;
if (!re.test(page)) throw new Error(`${file} has no empty <div id="root">`);
fs.writeFileSync(file, page.replace(re, () => `<div id="root">${html}</div>`));
console.log(`Pre-rendered ${Math.round(html.length / 1024)} KB of page content into ${path.relative(root, file)}`);
