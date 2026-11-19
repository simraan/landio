/**
 * landingPage(cfg) — the shared landing-page template.
 *
 * Every page type (ATL hub, terminal, area, venue, event, route, FBO) is built
 * from this one template. A page passes CONTENT; the template owns STRUCTURE:
 * breadcrumb, section rendering, alternating backgrounds, schema assembly,
 * and the hero-image preload.
 *
 * Sections are switched on/off per page by listing them in `cfg.sections`, in
 * order: [[name, opts], ...]. Available names: see RENDER below.
 *
 * cfg = {
 *   path, title, titleFull, description, summary, bodyClass,
 *   trail: [{ name, path }],          // breadcrumb + BreadcrumbList
 *   faqs: [{ q, a }],                 // FAQ section + FAQPage (same data → parity)
 *   graph: [schema nodes],            // page nodes merged into the business @graph
 *   defaultPickup,                    // prefill for every Book/Quote button on the page
 *   cluster, hub, card: { title, text, icon }   // listing on the /services/ directory
 *   sections: [[name, opts], ...],
 * }
 */

import { DEFAULT_SITE_URL, faqJsonLd, breadcrumbJsonLd } from "../config.js";
import { esc } from "./partials.js";
import {
  breadcrumb,
  heroSplit,
  trustStrip,
  introSplit,
  fleetPicker,
  tabbedTimeline,
  threeStepsSection,
  tabbedRoutes,
  iconGrid,
  linkCards,
  kbybSection,
  faqSection,
  contactSection,
  factsSection,
  tabbedText,
  tableSection,
} from "../pages/_sections.js";

/** name → (opts, { alt, cfg }) => html */
const RENDER = {
  hero: (o) => heroSplit(o),
  trust: trustStrip,
  intro: introSplit,
  fleet: fleetPicker,
  timeline: tabbedTimeline,
  steps: (o, { alt }) => threeStepsSection({ ...o, alt }),
  routes: tabbedRoutes,
  why: iconGrid,
  links: linkCards,
  kbyb: kbybSection,
  faq: (o, { alt, cfg }) => faqSection(cfg.faqs, { ...o, alt }),
  contact: (o, { alt }) => contactSection({ ...o, alt, variant: "landing" }),
  facts: factsSection,
  tabtext: tabbedText,
  table: tableSection,
  // Escape hatch for a one-off section: o.render(alt) → html.
  html: (o, { alt }) => o.render(alt),
};

export function landingPage(cfg) {
  const origin = DEFAULT_SITE_URL.replace(/\/+$/, "");
  const url = `${origin}${cfg.path}`;

  // Alternate backgrounds after the hero: #101010, #0A0A0A, #101010, …
  let n = 0;
  const sections = cfg.sections.map(([name, opts = {}]) => {
    const render = RENDER[name];
    if (!render) throw new Error(`landingPage: unknown section "${name}" on ${cfg.path}`);
    const alt = name === "hero" ? false : n++ % 2 === 0;
    return render(opts, { alt, cfg });
  });

  // Preload the hero image (LCP) with the same srcset the <picture> uses.
  const heroOpts = (cfg.sections.find(([name]) => name === "hero") || [])[1];
  let headExtra = cfg.headExtra || "";
  if (heroOpts && heroOpts.image) {
    const { base, widths } = heroOpts.image;
    headExtra += `<link rel="preload" as="image" type="image/webp" fetchpriority="high" imagesrcset="${esc(widths.map((w) => `${base}-${w}.webp ${w}w`).join(", "))}" imagesizes="100vw">`;
  }

  const graph = [
    ...(cfg.graph || []),
    cfg.faqs && cfg.faqs.length ? { ...faqJsonLd(cfg.faqs), "@id": `${url}#faq` } : null,
    cfg.trail && cfg.trail.length ? { ...breadcrumbJsonLd(DEFAULT_SITE_URL, cfg.trail), "@id": `${url}#breadcrumb` } : null,
  ].filter(Boolean);

  return {
    path: cfg.path,
    title: cfg.title,
    titleFull: cfg.titleFull,
    description: cfg.description,
    summary: cfg.summary,
    bodyClass: `page-landing ${cfg.bodyClass || ""}`.trim(),
    defaultPickup: cfg.defaultPickup,
    faqs: cfg.faqs,
    // Directory metadata (/services/ lists every page by cluster).
    cluster: cfg.cluster,
    hub: cfg.hub,
    card: cfg.card,
    noindex: cfg.noindex,
    graph,
    headExtra,
    main: [breadcrumb(cfg.trail || []), ...sections].join("\n"),
  };
}
