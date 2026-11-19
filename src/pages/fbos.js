/**
 * Private jet / FBO transfers — hub + field pages (SEO-PLAN.md §5, BUILD ORDER §9).
 *   - fboHub()   → /private-jet-fbo-transfers/ pillar (CollectionPage + ItemList).
 *   - fboPages() → one page per config FBOS entry with an FBO_PAGES block
 *                  (Service + BreadcrumbList + FAQPage). This hub replaces the
 *                  legacy /services/fbo-private-jet/ spoke (301 in redirects.js).
 *
 * Scope: transfers to/from the FBOs on the field, crew-coordinated — no ramp-
 * access claims (docs/OPEN-QUESTIONS.md). Facts sourced in docs/FACTS.md.
 */

import { HUBS, FBOS, AREAS, bySlug } from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { HUB, FBO_PAGES } from "../content/fbos.js";
import { HERO_IMG, glanceTiles, sources, serviceNode, collectionNode, areaCard, FBO_PLACE } from "./_kit.js";

const BUILT_FBO_SLUGS = Object.keys(FBO_PAGES);
const builtFbos = () => BUILT_FBO_SLUGS.map((slug) => bySlug(FBOS, slug));

/* -------------------------------- Hub ---------------------------------- */
export function fboHub() {
  const path = HUBS.fbo.path;
  const items = builtFbos().map((f) => ({ name: `${f.code} private jet car service`, path: f.path }));

  return landingPage({
    path,
    title: HUB.title,
    titleFull: HUB.titleFull,
    description: HUB.description,
    summary: HUB.summary,
    bodyClass: "page-fbo-hub",
    cluster: "fbo",
    hub: true,
    card: { title: "Private jet & FBO transfers", text: HUB.summary, icon: "plane" },
    trail: [
      { name: "Home", path: "/" },
      { name: "Private Jet & FBO Transfers", path },
    ],
    faqs: HUB.faqs,
    graph: [
      serviceNode({ path, name: "Private Jet & FBO Car Service", serviceType: "Private aviation transfer", description: HUB.description }),
      collectionNode({ path, name: HUB.h1, description: HUB.description, items }),
    ],
    sections: [
      ["hero", {
        eyebrow: "Private Aviation · 24/7",
        h1: HUB.h1,
        answerHtml: esc(HUB.answer),
        chips: HUB.chips,
        image: HERO_IMG,
        form: false,
      }],

      ["intro", {
        label: "How private transfers work",
        eyebrow: "Curbside to Cabin",
        cols: HUB.introCols.map((c, i) => ({
          id: `fbo-intro-${i}`,
          icon: c.icon,
          h2: c.h2,
          act: { modal: {} },
          html: c.html,
        })),
      }],

      ["links", {
        id: "fbo-list",
        eyebrow: "Airfields",
        h2: "Atlanta Private-Jet Airports We Serve",
        lede: "Chauffeured transfers to and from the FBOs at Atlanta's private-aviation airports.",
        items: builtFbos().map((f) => ({
          href: f.path,
          icon: "plane",
          title: `${f.code} private jet car service`,
          text: FBO_PAGES[f.slug].summary,
          cta: "View airfield",
        })),
      }],

      ["why", {
        id: "fbo-why",
        eyebrow: "What You Get",
        h2: "Private Aviation Transfers, Handled",
        items: HUB.why,
      }],

      ["faq", { heading: "Private Jet & FBO Transfers FAQ", eyebrow: "Good to Know" }],

      ["contact"],
    ],
  });
}

/* ----------------------------- Field pages ------------------------------ */
function fboPage(slug) {
  const c = FBO_PAGES[slug];
  const f = bySlug(FBOS, slug);
  const path = f.path;
  const place = FBO_PLACE[slug];
  const nearby = (f.areas || []).map((s) => areaCard(s)); // areas are built → live

  return landingPage({
    path,
    title: c.title,
    titleFull: c.titleFull,
    description: c.description,
    summary: c.summary,
    bodyClass: `page-fbo page-fbo-${slug}`,
    cluster: "fbo",
    card: { title: `${f.code} private jet car service`, text: c.summary, icon: "plane" },
    defaultPickup: place,
    trail: [
      { name: "Home", path: "/" },
      { name: "Private Jet & FBO Transfers", path: HUBS.fbo.path },
      { name: `${f.code} Private Jet Car Service`, path },
    ],
    faqs: c.faqs,
    graph: [serviceNode({ path, name: c.h1, serviceType: "Private aviation transfer", description: c.description })],
    sections: [
      ["hero", {
        eyebrow: `${f.code} · Private Aviation`,
        h1: c.h1,
        answerHtml: esc(c.answer),
        chips: c.chips,
        image: HERO_IMG,
        prefillPickup: place,
        formId: `${slug}-quote`,
        formHeading: `Get Your ${f.code} Quote`,
        formLocation: path,
      }],

      ["trust", {
        id: `glance-${slug}`,
        eyebrow: "At a Glance",
        h2: `${f.code} Private Jet Car Service at a Glance`,
        tiles: glanceTiles({ pickup: place }),
      }],

      ["facts", {
        id: `facts-${slug}`,
        eyebrow: "The Essentials",
        h2: `${f.code}: The Essentials`,
        items: c.facts,
        sourcesHtml: sources(...c.factsSources),
      }],

      ["intro", {
        label: "Arrivals and departures",
        eyebrow: "Arrivals & Departures",
        cols: c.introCols.map((col, i) => ({
          id: `fbo-pg-intro-${slug}-${i}`,
          icon: col.icon,
          h2: col.h2,
          act: { modal: i === 0 ? { pickup: place } : { dropoff: place } },
          cue: i === 0 ? "Book a pickup" : "Book a departure",
          html: col.html,
        })),
      }],

      ["why", {
        id: `why-${slug}`,
        eyebrow: "Why A-Town",
        h2: `A ${f.code} Transfer, Done Right`,
        items: c.why.map((w) => ({ ...w, act: { modal: { pickup: place } } })),
      }],

      ["faq", { heading: `${f.code} Private Jet Car Service FAQ`, eyebrow: "Good to Know" }],

      ["links", {
        id: `nearby-${slug}`,
        eyebrow: "Nearby",
        h2: `Areas Near ${f.code}`,
        lede: "Metro-Atlanta areas we drive to and from this airfield.",
        items: nearby,
      }],

      ["links", {
        id: `plan-${slug}`,
        eyebrow: "Plan Your Ride",
        h2: "Plan Your Ride",
        items: [
          { href: HUBS.fbo.path, icon: "plane", title: "All private-jet airports", text: "Every FBO airfield we serve around Atlanta.", cta: "View airfields" },
          { href: HUBS.airport.path, icon: "plane", title: "Atlanta Airport Car Service", text: "Commercial flights? See our ATL hub.", cta: "Open hub" },
          { href: "/fleet/", icon: "car", title: "Our fleet", text: "Executive Sedan, Executive SUV, and Sprinter Van.", cta: "View fleet" },
          { href: "/reservations/", icon: "calendar", title: "Reserve your ride", text: "Book your private-aviation transfer online.", cta: "Reserve" },
        ],
      }],

      ["contact"],
    ],
  });
}

export function fboPages() {
  return BUILT_FBO_SLUGS.map(fboPage);
}
