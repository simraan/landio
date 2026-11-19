/**
 * Metro-Atlanta area pages — hub + area spokes (SEO-PLAN.md §5, BUILD ORDER §6).
 *   - areasHub()  → /areas/ pillar (CollectionPage + ItemList of all areas).
 *   - areaPages() → one page per config AREAS entry (Service + BreadcrumbList +
 *                   FAQPage). Content from src/content/areas.js; cross-links
 *                   (neighbors, venues, fbo, routes) from the AREAS map, each
 *                   requires:-gated so it appears only once its target is built.
 *
 * These replace the legacy /routes/atlanta-airport-to-<city>/ metro pages; the
 * 301s are emitted by redirects.js once the area is built and the old route is
 * gone (ROUTES in routes.js now holds long-distance only).
 */

import { SITE, PHONE, HUBS, AREAS } from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { HUB, AREA_CONTENT } from "../content/areas.js";
import {
  HERO_IMG, glanceTiles, serviceNode, collectionNode,
  areaCard, venueCard, fboCard, routeCard,
} from "./_kit.js";

/* -------------------------------- Hub ---------------------------------- */
export function areasHub() {
  const path = HUBS.areas.path;
  const items = AREAS.map((a) => ({ name: `${a.name} Car Service`, path: a.path }));

  return landingPage({
    path,
    title: HUB.title,
    titleFull: HUB.titleFull,
    description: HUB.description,
    summary: HUB.summary,
    bodyClass: "page-areas-hub",
    cluster: "areas",
    hub: true,
    card: { title: "Atlanta areas we serve", text: HUB.summary, icon: "pin" },
    trail: [
      { name: "Home", path: "/" },
      { name: "Areas We Serve", path },
    ],
    faqs: HUB.faqs,
    graph: [collectionNode({ path, name: HUB.h1, description: HUB.description, items })],
    sections: [
      ["hero", {
        eyebrow: "Metro Atlanta · 24/7",
        h1: HUB.h1,
        answerHtml: esc(HUB.answer),
        chips: HUB.chips,
        image: HERO_IMG,
        form: false,
      }],

      ["intro", {
        label: "What we cover",
        eyebrow: "Across the Metro",
        cols: HUB.introCols.map((c, i) => ({
          id: `areas-intro-${i}`,
          icon: c.icon,
          h2: c.h2,
          act: { modal: {} },
          html: c.html,
        })),
      }],

      ["links", {
        id: "areas-list",
        eyebrow: "Areas",
        h2: "Car Service by Atlanta Area",
        lede: "Pick your city or neighborhood for airport transfers and local chauffeur service.",
        items: AREAS.map((a) => ({
          href: a.path,
          icon: "pin",
          title: `${a.name} car service`,
          text: (AREA_CONTENT[a.slug].context.split(/[.—]/)[0] || "").trim() + ".",
          cta: "View area",
        })),
      }],

      ["why", {
        id: "areas-why",
        eyebrow: "One Standard, Everywhere",
        h2: "The Same Service in Every Area",
        items: HUB.why,
      }],

      ["faq", { heading: "Atlanta Areas FAQ", eyebrow: "Good to Know" }],

      ["contact"],
    ],
  });
}

/* ----------------------------- Area pages ------------------------------ */
function areaPage(a) {
  const c = AREA_CONTENT[a.slug];
  const path = a.path;
  const pickup = a.pickup;
  const name = a.name;
  const description = `Car service in ${name} and ATL airport transfers — flight-tracked, 24/7, no surge pricing. Reserve with A-Town Limo or call ${PHONE.local}.`;

  // Explore-nearby cards: neighbors + venues + fbo + long-distance routes, all
  // requires:-gated by the _kit card builders (built targets show, rest drop).
  const nearby = [
    ...a.neighbors.map((s) => areaCard(s)),
    ...a.venues.map((s) => venueCard(s)),
    ...(a.fbo ? [fboCard(a.fbo)] : []),
    ...a.routes.map((s) => routeCard(s)),
  ];

  return landingPage({
    path,
    title: `${name} Car Service`,
    titleFull: `${name} Car Service | A-Town Limo`,
    description,
    summary: `Chauffeured car service in ${name} and Hartsfield-Jackson (ATL) airport transfers — ${c.context}`,
    bodyClass: `page-area page-area-${a.slug}`,
    cluster: "areas",
    card: { title: `${name} car service`, text: (c.context.split(/[.—]/)[0] || "").trim() + ".", icon: "pin" },
    defaultPickup: pickup,
    trail: [
      { name: "Home", path: "/" },
      { name: "Areas We Serve", path: HUBS.areas.path },
      { name: `${name} Car Service`, path },
    ],
    faqs: areaFaqs(a, c),
    graph: [
      serviceNode({
        path,
        name: `${name} Car Service`,
        serviceType: "Car service",
        description,
        areaServed: { "@type": "City", name, containedInPlace: { "@type": "State", name: "Georgia" } },
      }),
    ],
    sections: [
      ["hero", {
        eyebrow: c.base ? "Our Home Base · Metro Atlanta" : "Metro Atlanta · 24/7",
        h1: `${name} Car Service`,
        answerHtml: esc(`A-Town Limo provides chauffeured car service in ${name} plus Hartsfield-Jackson (ATL) airport transfers, ${SITE.hours}. ${c.context}`),
        chips: [
          { icon: "radar", text: "ATL transfers" },
          { icon: "tag", text: "No surge pricing" },
          { icon: c.base ? "shield" : "car", text: c.base ? "Based in Duluth" : "Door-to-door" },
        ],
        image: HERO_IMG,
        prefillPickup: pickup,
        formId: `${a.slug}-quote`,
        formHeading: `Get Your ${name} Quote`,
        formLocation: path,
      }],

      ["trust", {
        id: `glance-${a.slug}`,
        eyebrow: "At a Glance",
        h2: `${name} Car Service at a Glance`,
        tiles: glanceTiles({ pickup }),
      }],

      ["intro", {
        label: "Airport and local service",
        eyebrow: `Car Service in ${name}`,
        cols: [
          {
            id: `atl-${a.slug}`,
            icon: "radar",
            h2: `${name} to ATL Airport`,
            act: { modal: { pickup, dropoff: "Hartsfield-Jackson Atlanta International Airport (ATL)" } },
            cue: "Book an airport ride",
            html: `<p>Your chauffeur runs the trip between ${name} and Hartsfield-Jackson (ATL) via ${c.highway}, with real-time flight tracking on arrivals, meet &amp; greet, and no charge for flight delays. Pickups move with your actual landing time, ${SITE.hours}.</p>`,
          },
          {
            id: `local-${a.slug}`,
            icon: "car",
            h2: `Getting Around ${name}`,
            act: { modal: { pickup } },
            cue: "Book a local ride",
            html: `<p>${c.local} Destinations near ${name} include ${c.landmarks}. Book point to point or keep a car by the hour for meetings, dinners, and events — upfront quotes, no surge pricing.</p>`,
          },
        ],
      }],

      // No generic "why"/"steps" on the 10 area spokes: the hub carries "why",
      // and the hero + every clickable box already open the quote. Keeps each
      // area page's body to its unique content (hero, intro, nearby, FAQ) and
      // holds same-type overlap down (docs/DECISIONS.md).
      ["faq", { heading: `${name} Car Service FAQ`, eyebrow: "Good to Know" }],

      ["links", {
        id: `nearby-${a.slug}`,
        eyebrow: "Explore Nearby",
        h2: `Near ${name}`,
        lede: "Neighboring areas, venues, and long-distance routes we cover from here.",
        items: nearby,
      }],

      ["links", {
        id: `plan-${a.slug}`,
        eyebrow: "Plan Your Ride",
        h2: "Plan Your Ride",
        items: [
          { href: HUBS.airport.path, icon: "plane", title: "Atlanta Airport Car Service", text: "The full ATL hub: terminals, routes, and booking.", cta: "Open hub" },
          { href: HUBS.areas.path, icon: "pin", title: "All Atlanta areas", text: "Every city and neighborhood we serve.", cta: "View areas" },
          { href: "/fleet/", icon: "car", title: "Our fleet", text: "Executive Sedan, Executive SUV, and Sprinter Van.", cta: "View fleet" },
          { href: "/reservations/", icon: "calendar", title: "Reserve your ride", text: "Book your pickup online.", cta: "Reserve" },
        ],
      }],

      ["contact"],
    ],
  });
}

/** Area-specific FAQ + shared policy answers (keeps each page's FAQ distinct). */
function areaFaqs(a, c) {
  return [
    {
      q: `Do you provide car service to and from ATL airport in ${a.name}?`,
      a: `Yes. A-Town Limo runs Hartsfield-Jackson (ATL) airport transfers to and from ${a.name} via ${c.highway}, ${SITE.hours}, with flight tracking on arrivals and no charge for flight delays.`,
    },
    {
      q: `Where do you pick up in ${a.name}?`,
      a: `Anywhere in ${a.name} — your home, office, or hotel. Near ${c.landmarks}, or anywhere else in the area. Enter your exact address when you book and we confirm the details.`,
    },
    {
      q: `Which vehicle should I book for a ${a.name} trip?`,
      a: `The Executive Sedan seats up to 4, the Executive SUV up to 6 with luggage, and the Sprinter van up to 14. Choose by group size first, then luggage. ${SITE.responsePromise}`,
    },
    { q: "Is there surge pricing on busy days?", a: `No. ${PHONE.display} or the booking form gets you an upfront quote. A-Town Limo has no surge pricing — the price depends on distance, vehicle, duration, tolls, and stops.` },
    { q: "What is your cancellation policy?", a: SITE.cancellation.full },
  ];
}

export function areaPages() {
  return AREAS.map(areaPage);
}
