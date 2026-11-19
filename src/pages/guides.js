/**
 * ATL airport guides — hub + guide articles (SEO-PLAN.md §5, BUILD ORDER §5).
 *   - guidesHub()  → /atl-airport-guide/ pillar (CollectionPage + ItemList).
 *   - guidePages() → one article per guide with content in src/content/guides.js
 *                    (FAQPage + BreadcrumbList JSON-LD — informational, not a Service).
 *
 * Structure from templates/landing.js + _kit.js; words and sourced facts from
 * src/content/guides.js and config.js. A guide is built iff it has a GUIDE_PAGES
 * entry. Each article links to its terminal page in the hero answer (first 150
 * words), per config GUIDES[].terminal.
 */

import { HUBS, GUIDES, ATL_TERMINALS, bySlug } from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { HUB, GUIDE_PAGES } from "../content/guides.js";
import { HERO_IMG, sources, collectionNode } from "./_kit.js";

const BUILT_GUIDE_SLUGS = Object.keys(GUIDE_PAGES);
const builtGuides = () => BUILT_GUIDE_SLUGS.map((slug) => bySlug(GUIDES, slug));

const GUIDE_SOURCES = `${sources("atlMaps", "atlPlaneTrain", ["https://www.travelagentcentral.com/transportation/atlanta-retains-worlds-busiest-airport-crown", "Travel Agent Central"])}`;

/* -------------------------------- Hub ---------------------------------- */
export function guidesHub() {
  const path = HUBS.guides.path;
  const items = builtGuides().map((g) => ({ name: g.title, path: g.path }));

  return landingPage({
    path,
    title: HUB.title,
    titleFull: HUB.titleFull,
    description: HUB.description,
    summary: HUB.summary,
    bodyClass: "page-guides-hub",
    cluster: "airport",
    hub: true,
    card: { title: "ATL airport guide", text: HUB.summary, icon: "pin" },
    trail: [
      { name: "Home", path: "/" },
      { name: "ATL Airport Guide", path },
    ],
    faqs: HUB.faqs,
    graph: [collectionNode({ path, name: HUB.h1, description: HUB.description, items })],
    sections: [
      ["hero", {
        eyebrow: "ATL Airport Guide",
        h1: HUB.h1,
        answerHtml: esc(HUB.answer),
        chips: HUB.chips,
        image: HERO_IMG,
        form: false,
      }],

      ["intro", {
        label: "About this guide",
        eyebrow: "Know Before You Fly",
        cols: HUB.introCols.map((c, i) => ({
          id: `guides-intro-${i}`,
          icon: c.icon,
          h2: c.h2,
          act: { modal: {} },
          html: c.html,
        })),
      }],

      ["links", {
        id: "guides-list",
        eyebrow: "Guides",
        h2: "ATL Airport Guides",
        lede: "Plain-language answers to the questions travelers ask about Hartsfield-Jackson.",
        items: builtGuides().map((g) => ({
          href: g.path,
          icon: "pin",
          title: g.title,
          text: GUIDE_PAGES[g.slug].summary,
          cta: "Read the guide",
        })),
      }],

      ["why", {
        id: "guides-why",
        eyebrow: "Arrivals, Handled",
        h2: "Why Fly In With A-Town",
        items: HUB.why,
      }],

      ["faq", { heading: "ATL Airport Guide FAQ", eyebrow: "Good to Know" }],

      ["contact"],
    ],
  });
}

/* ----------------------------- Guide articles --------------------------- */
function guidePage(slug) {
  const c = GUIDE_PAGES[slug];
  const g = bySlug(GUIDES, slug);
  const path = g.path;
  const terminal = ATL_TERMINALS[g.terminal]; // linked in the hero answer
  const other = builtGuides().find((x) => x.slug !== slug);

  return landingPage({
    path,
    title: c.title,
    titleFull: c.titleFull,
    description: c.description,
    summary: c.summary,
    bodyClass: `page-guide page-guide-${slug}`,
    cluster: "airport",
    card: { title: g.title, text: c.summary, icon: "pin" },
    trail: [
      { name: "Home", path: "/" },
      { name: "ATL Airport Guide", path: HUBS.guides.path },
      { name: g.title, path },
    ],
    faqs: c.faqs,
    graph: [], // informational: FAQPage + BreadcrumbList added by the template
    sections: [
      ["hero", {
        eyebrow: "ATL Airport Guide",
        h1: c.h1,
        // Raw HTML: the answer carries the in-body link to the terminal page
        // (guide rule: terminal linked in the first 150 words).
        answerHtml: `${c.answerLead} ${c.linkIntro} ${c.terminalLinkHtml}.`,
        chips: c.chips,
        image: HERO_IMG,
        form: false,
      }],

      ["facts", {
        id: `facts-${slug}`,
        eyebrow: "At a Glance",
        h2: `${g.title.replace(/[?]/g, "")} — the Essentials`.replace(/\s+/g, " ").trim(),
        items: c.facts,
        sourcesHtml: GUIDE_SOURCES,
      }],

      ["tabtext", {
        id: `body-${slug}`,
        idBase: `body-${slug}`,
        eyebrow: "The Details",
        h2: "How It Works",
        tabsLabel: `${g.title} sections`,
        tabs: c.tabs,
        sourcesHtml: GUIDE_SOURCES,
      }],

      ["faq", { heading: `${g.title} — FAQ`, eyebrow: "Good to Know" }],

      ["links", {
        id: `explore-${slug}`,
        eyebrow: "Plan Your Arrival",
        h2: "From the Gate to the Car",
        items: [
          { href: terminal.page, icon: "plane", title: `ATL ${g.terminal === "domestic" ? "Domestic" : "International"} Terminal car service`, text: "Where your chauffeur meets you and how pickup works.", cta: "View terminal" },
          { href: HUBS.airport.path, icon: "plane", title: "Atlanta Airport Car Service", text: "The full ATL hub: routes, fleet, and booking.", cta: "Open hub" },
          ...(other ? [{ href: other.path, icon: "pin", title: other.title, text: GUIDE_PAGES[other.slug].summary, cta: "Read the guide" }] : []),
          { href: "/fleet/", icon: "car", title: "Our fleet", text: "Executive Sedan, Executive SUV, and Sprinter Van.", cta: "View fleet" },
          { href: "/reservations/", icon: "calendar", title: "Reserve your ride", text: "Book your ATL pickup online.", cta: "Reserve" },
        ],
      }],

      ["contact"],
    ],
  });
}

export function guidePages() {
  return BUILT_GUIDE_SLUGS.map(guidePage);
}
