/**
 * Aura Hamptons build script — Node 22, zero dependencies.
 *
 * Responsibilities:
 *   1. Render static HTML per page from templates + the SSOT config.
 *   2. Content-hash client CSS/JS so deploys bust caches cleanly.
 *   3. Copy self-hosted fonts and static assets into dist/.
 *   4. Generate robots.txt, sitemap.xml, llms.txt, _redirects, _headers.
 *
 * No framework, no bundler, no runtime deps. Web-standard output only.
 * Run: `node src/build.js`  (or `npm run build`)
 */

import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { SITE, BUILT, DEFAULT_SITE_URL } from "./config.js";
import { renderPage } from "./templates/layout.js";
import { home } from "./pages/home.js";
import { about } from "./pages/about.js";
import { servicesPage } from "./pages/services.js";
import { serviceSpokes } from "./pages/service-spokes.js";
import { fleetPage } from "./pages/fleet.js";
import { vehiclePages } from "./pages/vehicles.js";
import { contact } from "./pages/contact.js";
import { becomePartner } from "./pages/become-a-partner.js";
import { reservations } from "./pages/reservations.js";
import { areasHub, areaPages } from "./pages/areas.js";
import { fboHub, fboPages } from "./pages/fbos.js";
import { airport } from "./pages/airport.js";
import { routesHub, routePages } from "./pages/routes.js";
import { guidesHub, guidePages } from "./pages/guides.js";
import { terminalPages } from "./pages/terminals.js";
import { venuesPage, venuePages } from "./pages/venues.js";
import { eventsPage, eventPages } from "./pages/events.js";
import { legalPages } from "./pages/legal.js";
import { thankyou } from "./pages/thankyou.js";
import { notFound } from "./pages/notfound.js";
import { renderRedirectsFile, renderHeadersFile } from "./redirects.js";
import { renderLlmsTxt } from "./llms.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = __dirname;
const DIST = join(ROOT, "dist");

/**
 * Canonical origin. SITE_URL env, else the production domain. Deliberately NOT
 * CF_PAGES_URL: preview builds must still canonicalize to the production domain.
 */
const SITE_URL = process.env.SITE_URL || DEFAULT_SITE_URL;
const YEAR = new Date().getFullYear();

/**
 * Indexing switch. NOINDEX by default (pre-launch: the live WordPress site still
 * owns the domain). Set NOINDEX=false in Cloudflare Pages at launch — that
 * flips every page to index,follow and robots.txt to allow + sitemap.
 */
const NOINDEX_ALL = process.env.NOINDEX !== "false";

/**
 * Google Tag Manager container ID from env GTM_ID. Unset (or malformed) → no
 * GTM code is emitted at all.
 */
const GTM_ID = /^GTM-[A-Z0-9]+$/.test(process.env.GTM_ID || "") ? process.env.GTM_ID : "GTM-W5JNP5HT";

/**
 * Google Analytics 4 Measurement ID from env GA4_ID. Unset (or malformed) → no
 * GA4 code is emitted. Hardcoded default so GA4 works without the env var.
 */
const GA4_ID = /^G-[A-Z0-9]+$/.test(process.env.GA4_ID || "") ? process.env.GA4_ID : "G-33BDL98P6F";

/**
 * Google Maps API key (public, referrer-restricted) from env
 * PUBLIC_GOOGLE_MAPS_API_KEY. Injected into the page so the booking form's
 * pickup/drop-off fields get live Google Places (New) autocomplete. Unset or
 * malformed → no Maps script is emitted and the fields fall back to the
 * built-in DMV location list.
 */
const MAPS_KEY = /^AIza[0-9A-Za-z_-]{20,}$/.test(process.env.PUBLIC_GOOGLE_MAPS_API_KEY || "")
  ? process.env.PUBLIC_GOOGLE_MAPS_API_KEY
  : "";

/** Short content hash for cache-busting hashed asset filenames. */
const hash = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 10);

/**
 * Template registry. `headlines.json` is the page manifest — one entry per
 * page naming the template that renders it. Each template returns a page object
 * (path, title, description, main, jsonLd, …). Factory templates return arrays
 * that expand to many pages (service spokes, vehicles, routes).
 */
const TEMPLATES = {
  home,
  about,
  servicesPage,
  serviceSpokes, // → array of 6 service spokes
  fleetPage,
  vehiclePages, // → array of 6 vehicle pages
  contact,
  becomePartner,
  reservations,
  areasHub,
  areaPages, // → one page per config AREAS entry
  fboHub,
  fboPages, // → 7 FBO field pages
  airport, // → DC airport hub
  terminalPages, // → IAD/DCA/BWI airport pages
  routesHub,
  routePages, // → intercity route pages
  venuesPage,
  venuePages, // → 6 venue detail pages under /services/
  eventsPage,
  eventPages, // → event pages under /events/
  guidesHub,
  guidePages, // → DC travel guides
  legalPages, // → array of 2
  thankyou,
  notFound,
};

function loadPages() {
  const manifest = JSON.parse(readFileSync(join(SRC, "headlines.json"), "utf8"));
  const pages = [];
  // Entries flagged `"directory": true` (the /services/ master directory) run
  // last and receive every other page, so they list pages built now or later
  // with no manual edits.
  const run = (entry, ctx) => {
    const make = TEMPLATES[entry.template];
    if (!make) {
      throw new Error(
        `headlines.json: no template "${entry.template}" registered in build.js`
      );
    }
    const { template, note, directory, ...overrides } = entry;
    const out = make(ctx);
    if (Array.isArray(out)) {
      pages.push(...out);
    } else {
      pages.push({ ...out, ...overrides });
    }
  };
  for (const entry of manifest.filter((e) => !e.directory)) run(entry);
  for (const entry of manifest.filter((e) => e.directory)) run(entry, { pages: [...pages] });
  return pages;
}

/** Visible text of the first <h1>, and the <title>. */
const h1Of = (html) => ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const titleOf = (html) => ((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "").trim();

/**
 * docs/LINK-TODO.md entries whose target page now exists — printed so they can
 * be added (if not automatic) and deleted from the file.
 */
function resolvableTodos(builtPaths) {
  const file = join(ROOT, "docs", "LINK-TODO.md");
  if (!existsSync(file)) return [];
  return readFileSync(file, "utf8")
    .split("\n")
    .filter((l) => l.startsWith("- ["))
    .filter((l) => {
      // Targets = the backticked paths right after "→" (comma-separated list).
      const after = l.split("→")[1] || "";
      const targets = (after.split(" · ")[0].match(/`(\/[^`\s]*)`/g) || []).map((t) => t.slice(1, -1));
      return targets.some((t) => builtPaths.has(t));
    })
    .map((l) => l.slice(0, 140));
}

/** sitemap.xml from the intended-index pages (page.noindex !== true). */
function emitSitemap(pages) {
  const origin = SITE_URL.replace(/\/+$/, "");
  const urls = pages
    .filter((p) => !p.noindex && !p.path.endsWith(".html"))
    .map((p) => `  <url><loc>${origin}${p.path}</loc></url>`);
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join("\n") +
    `\n</urlset>\n`;
  writeFileSync(join(DIST, "sitemap.xml"), xml);
  return urls.length;
}

/** _redirects + _headers — Cloudflare Pages edge rules. */
function emitEdgeFiles(builtPaths) {
  writeFileSync(join(DIST, "_redirects"), renderRedirectsFile(builtPaths));
  writeFileSync(join(DIST, "_headers"), renderHeadersFile());
}

/** llms.txt — AI/LLM-search discovery file (indexable pages only). */
function emitLlms(pages) {
  writeFileSync(join(DIST, "llms.txt"), renderLlmsTxt(SITE_URL, pages));
}

/**
 * Links to pages that don't exist yet are written as
 * `<li data-requires="/future/path/">…</li>` (or any element). If the path is
 * built, keep the element (minus the attribute); otherwise drop it entirely —
 * so future cards appear automatically once their page ships, and never as
 * dead links before that.
 */
function resolveRequires(html, builtPaths) {
  return html.replace(
    /<(\w+)([^>]*?)\sdata-requires="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g,
    (_, tag, pre, path, post, inner) =>
      builtPaths.has(path) ? `<${tag}${pre}${post}>${inner}</${tag}>` : ""
  );
}

/**
 * Clickable boxes mapped to a FUTURE page carry
 * `data-future="/path/" data-future-cue="Cue"` and act as a quote button (or
 * an interim link) today. Once /path/ is built, rewrite the box's single
 * .cbox__action into a link to it and swap the cue + accessible name.
 */
function resolveFuture(html, builtPaths) {
  return html.replace(
    /<(\w+)([^>]*?) data-future="([^"]+)" data-future-cue="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g,
    (whole, tag, pre, path, cue, post, inner) => {
      if (!builtPaths.has(path)) return whole;
      const label = (inner.match(/data-card-label="([^"]*)"/) || [])[1] || "";
      const aria = `${label}, ${cue}`;
      const link = `<a class="cbox__action" href="${path}" aria-label="${aria}" data-card-label="${label}">`;
      const next = inner
        .replace(/<(button|a) [^>]*class="cbox__action"[^>]*>/, link)
        .replace(/<\/button>/, "</a>")
        .replace(/(<span class="cbox__cue" aria-hidden="true">)[^<]*(<\/span>)/, `$1${cue} →$2`);
      return `<${tag}${pre}${post}>${next}</${tag}>`;
    }
  );
}

/** Every site-relative href, src, and srcset URL in a page (query/hash
 *  stripped; tel/mailto/http ignored) — links AND images must resolve. */
function internalHrefs(html) {
  const urls = [...html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)].map((m) => m[1]);
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u.startsWith("/")) urls.push(u.split(/[?#]/)[0]);
    }
  }
  return urls;
}

/** A link resolves if it is a built page path, an emitted asset, or a source asset/font. */
function linkResolves(href, builtPaths) {
  if (builtPaths.has(href)) return true;
  if (href.startsWith("/assets/") && (existsSync(join(DIST, href)) || existsSync(join(ROOT, href)))) return true;
  if (href.startsWith("/fonts/") && existsSync(join(ROOT, href))) return true;
  if (href.startsWith("/api/")) return true; // Pages Functions
  return false;
}

function clean() {
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(join(DIST, "assets"), { recursive: true });
  mkdirSync(join(DIST, "fonts"), { recursive: true });
}

/** Hash + emit a client asset; returns its site-absolute href. */
function emitAsset(srcPath, name, ext) {
  const buf = readFileSync(srcPath);
  const file = `${name}.${hash(buf)}.${ext}`;
  writeFileSync(join(DIST, "assets", file), buf);
  return `/assets/${file}`;
}

function copyFonts() {
  const fontsDir = join(ROOT, "fonts");
  if (existsSync(fontsDir)) {
    cpSync(fontsDir, join(DIST, "fonts"), { recursive: true });
  }
}

/** Copy self-hosted images, preserving paths so references stay stable. */
function copyImages() {
  const imgDir = join(ROOT, "assets", "img");
  if (existsSync(imgDir)) {
    cpSync(imgDir, join(DIST, "assets", "img"), { recursive: true });
  }
}

/** robots.txt — allow + sitemap by default; disallow-all when NOINDEX=true. */
function emitRobots() {
  const body = NOINDEX_ALL
    ? [
        "# Pre-launch build — indexing disabled. Set NOINDEX=false at launch.",
        "User-agent: *",
        "Disallow: /",
        "",
      ]
    : [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${SITE_URL.replace(/\/+$/, "")}/sitemap.xml`,
        "",
      ];
  writeFileSync(join(DIST, "robots.txt"), body.join("\n"));
}

function build() {
  const t0 = Date.now();
  clean();

  const cssHref = emitAsset(join(SRC, "styles.css"), "styles", "css");
  const jsHref = emitAsset(join(SRC, "client", "main.js"), "main", "js");

  const assets = {
    cssHref,
    jsHref,
    siteUrl: SITE_URL,
    year: YEAR,
    noindexAll: NOINDEX_ALL,
    gtmId: GTM_ID,
    ga4Id: GA4_ID,
    mapsKey: MAPS_KEY,
  };

  const pages = loadPages();
  const builtPaths = new Set(pages.map((p) => p.path));
  builtPaths.forEach((p) => BUILT.add(p)); // nav/footer read this (config.isBuilt)
  const deadLinks = [];
  const seen = new Set();
  const inbound = new Map(); // path → set of pages linking to it
  const titles = new Map();
  const h1s = new Map();
  let count = 0;
  for (const page of pages) {
    if (seen.has(page.path)) {
      throw new Error(`duplicate page path: ${page.path}`);
    }
    seen.add(page.path);

    const html = resolveFuture(resolveRequires(renderPage(page, assets), builtPaths), builtPaths);
    for (const href of internalHrefs(html)) {
      if (!linkResolves(href, builtPaths)) deadLinks.push(`${page.path} → ${href}`);
      if (href !== page.path) (inbound.get(href) || inbound.set(href, new Set()).get(href)).add(page.path);
    }
    if (!page.noindex) {
      const t = titleOf(html), h = h1Of(html);
      (titles.get(t) || titles.set(t, []).get(t)).push(page.path);
      if (h) (h1s.get(h) || h1s.set(h, []).get(h)).push(page.path);
    }
    const rel = page.path.replace(/^\/+/, "");
    const outPath = page.path.endsWith(".html")
      ? join(DIST, rel)
      : page.path === "/"
      ? join(DIST, "index.html")
      : join(DIST, rel, "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    count++;
  }

  if (deadLinks.length) {
    throw new Error(
      `dead internal link(s) — fix them or log the target in docs/LINK-TODO.md:\n  ` +
        [...new Set(deadLinks)].join("\n  ")
    );
  }

  // Duplicate <title>/<h1> and orphan pages fail the build (SEO-PLAN §6).
  const dupes = [...titles, ...h1s].filter(([, list]) => list.length > 1).map(([k, list]) => `"${k}" on ${list.join(", ")}`);
  if (dupes.length) throw new Error(`duplicate title/H1:\n  ${dupes.join("\n  ")}`);
  const orphans = pages.filter((p) => !p.noindex && p.path !== "/" && !p.path.endsWith(".html") && !inbound.has(p.path)).map((p) => p.path);
  if (orphans.length) throw new Error(`orphan page(s) — nothing links to them:\n  ${orphans.join("\n  ")}`);

  copyFonts();
  copyImages();
  emitRobots();
  const sitemapCount = emitSitemap(pages);
  emitLlms(pages);
  emitEdgeFiles(builtPaths);
  const todos = resolvableTodos(builtPaths);

  console.log(
    `✓ built ${count} page(s) → dist/  [${Date.now() - t0}ms]\n` +
      `  site:     ${SITE_URL}\n` +
      `  noindex:  ${NOINDEX_ALL}${NOINDEX_ALL ? " (set NOINDEX=false at launch)" : ""}\n` +
      `  gtm:      ${GTM_ID || "(none — GTM_ID unset)"}\n` +
      `  sitemap:  ${sitemapCount} url(s)\n` +
      `  css:      ${cssHref}\n` +
      `  js:       ${jsHref}` +
      (todos.length ? `\n  LINK-TODO: ${todos.length} entr${todos.length === 1 ? "y targets a page that now exists" : "ies target pages that now exist"} — add the link if not automatic, then delete:\n    ${todos.join("\n    ")}` : "")
  );
}

build();
