/**
 * /services/ — the MASTER SERVICES page (premium, conversion-focused).
 *
 * Still the services hub (keeps its SEO title, canonical, breadcrumb and
 * CollectionPage + ItemList schema), but rebuilt as a landing experience that
 * reuses the Group Transfers premium design system (`page-group-transfers`):
 *   1. Premium hero            3. Corporate/Group/Hourly
 *   2. Airport & Aviation      4. Trust strip
 *                              5. Contact / Final CTA
 *
 * Every one of the six core service pages is linked from the two category
 * grids, so no service page is orphaned when the old directory grid is removed.
 * Rendered by build.js (still flagged "directory": true in headlines.json; the
 * injected `pages` list is no longer needed — the six services are the fixed
 * source of truth here).
 */

import { SITE, PRIMARY_AIRPORT_PICKUP, DEFAULT_SITE_URL } from "../config.js";
import { esc, btnIcon } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { cbox } from "./_sections.js";
import { icon } from "../templates/icons.js";
import { ROUTE_CARDS } from "./route-spokes.js";
import { TOWN_CARDS } from "./service-spokes.js";

const PATH = "/services/";
const HERO_IMAGE = "/assets/img/hero/hamptons-hero";

/** Per-service presentation: image + short, specific description. Titles/URLs
 *  come from `config.js` (single source of truth) so they never drift. */
const SVC = {
  "airport-transfers":   { img: "/assets/img/fleet/executive-suv",  alt: "Aura Hamptons Luxury SUV for Hamptons airport transfers",          desc: "Flight-tracked, door-to-door transfers to and from JFK, LGA, EWR, ISP, FOK and HTO." },
  "meet-and-greet":      { img: "/assets/img/fleet/executive-sedan", alt: "Aura Hamptons Executive Sedan for terminal meet & greet",          desc: "Your chauffeur greets you inside the terminal with a name sign and luggage assistance." },
  "fbo-private-jet":     { img: "/assets/img/fleet/sprinter-jet",    alt: "Aura Hamptons Sprinter Jet interior for private aviation transfers", desc: "Seamless planeside and FBO transfers at East Hampton, Gabreski and area terminals." },
  "corporate-executive": { img: "/assets/img/fleet/executive-sedan", alt: "Aura Hamptons Executive Sedan for corporate travel",               desc: "Discreet, punctual chauffeured travel for executives, clients and corporate programs." },
  "group-transfers":     { img: "/assets/img/fleet/motor-coach",     alt: "Aura Hamptons Motor Coach for group transportation",               desc: "Sprinter Vans, Mini Buses and Motor Coaches for weddings, corporate groups and events." },
  "hourly-chauffeur":    { img: "/assets/img/fleet/executive-suv",   alt: "Aura Hamptons Luxury SUV for hourly chauffeur service",            desc: "A dedicated chauffeur and vehicle by the hour for tours, dining and multi-stop days." },
  "wedding-transportation": { img: "/assets/img/hero/hamptons-hero", alt: "The Hamptons — Aura Hamptons wedding transportation",             desc: "Bridal party, ceremony-to-reception and guest shuttles coordinated across your wedding weekend." },
  "prom-transportation":     { img: "/assets/img/fleet/executive-suv",  alt: "Aura Hamptons Luxury SUV for Hamptons prom transportation",      desc: "Safe, stylish prom-night rides — the whole group together with a professional chauffeur." },
  "party-bus":               { img: "/assets/img/fleet/mini-bus",       alt: "Aura Hamptons Mini Bus for Hamptons group celebrations",        desc: "Group celebrations — birthdays, bachelorette parties and nights out on our group fleet." },
  "east-quogue-car-service": { img: "/assets/img/fleet/executive-sedan", alt: "Aura Hamptons Executive Sedan for East Quogue car service",     desc: "Airport transfers, local rides and NYC trips in East Quogue and the western Hamptons." },
  "hamptons-wine-tours":     { img: "/assets/img/hero/hamptons-hero",    alt: "Aura Hamptons chauffeured Hamptons wine tour",                 desc: "Chauffeured vineyard-hopping across the East End — a designated chauffeur and custom itineraries." },
  "north-fork-wine-tours":   { img: "/assets/img/hero/hamptons-hero",    alt: "Aura Hamptons chauffeured North Fork wine tour",               desc: "Chauffeured wine tours across Long Island's North Fork wine country." },
  "sedan-service":           { img: "/assets/img/fleet/executive-sedan", alt: "Aura Hamptons Executive Sedan",                                desc: "Executive Sedan for airport transfers, executive travel and couples." },
  "suv-service":             { img: "/assets/img/fleet/executive-suv",   alt: "Aura Hamptons Luxury SUV",                                     desc: "Luxury SUV with room for passengers and luggage — families and airport runs." },
  "sprinter-van-service":    { img: "/assets/img/fleet/sprinter-van",    alt: "Aura Hamptons Sprinter Van",                                   desc: "Sprinter Van group transportation for events and group travel." },
};

/* Services shown on this landing that are intentionally NOT in SITE.services
 * (kept off the homepage/nav auto-lists); title + URL resolved here. */
const EXTRA = {
  "wedding-transportation": { title: "Wedding Transportation", url: "/services/wedding-transportation/" },
  "prom-transportation": { title: "Prom Transportation", url: "/services/prom-transportation/" },
  "party-bus": { title: "Party Bus", url: "/services/party-bus/" },
  "east-quogue-car-service": { title: "East Quogue Car Service", url: "/services/east-quogue-car-service/" },
  "hamptons-wine-tours": { title: "Hamptons Wine Tours", url: "/services/hamptons-wine-tours/" },
  "north-fork-wine-tours": { title: "North Fork Wine Tours", url: "/services/north-fork-wine-tours/" },
  "sedan-service": { title: "Sedan Service", url: "/services/sedan-service/" },
  "suv-service": { title: "SUV Service", url: "/services/suv-service/" },
  "sprinter-van-service": { title: "Sprinter Van Service", url: "/services/sprinter-van-service/" },
};

// Migrated airport→destination route pages: register each as a landing card
// (title/URL + image/description) so the "Airport Transfers & Routes" category
// stays in sync with route-spokes.js automatically.
ROUTE_CARDS.forEach((r) => {
  EXTRA[r.slug] = { title: r.title, url: r.url };
  SVC[r.slug] = { img: r.img, alt: r.alt, desc: r.blurb };
});
TOWN_CARDS.forEach((r) => {
  EXTRA[r.slug] = { title: r.title, url: r.url };
  SVC[r.slug] = { img: r.img, alt: r.alt, desc: r.blurb };
});

const CATEGORIES = [
  {
    id: "services",
    eyebrow: "Airport & Aviation",
    h2: "Airport &amp; Private Aviation",
    lede: "Flight-tracked arrivals, in-terminal greetings and planeside transfers across every airport and FBO we serve.",
    slugs: ["airport-transfers", "meet-and-greet", "fbo-private-jet"],
  },
  {
    id: "routes",
    eyebrow: "Airport Transfers",
    h2: "Airport Transfers &amp; Routes",
    lede: "Direct, flight-tracked car service between the New York airports and every Hamptons village — door to door, 24/7.",
    slugs: ROUTE_CARDS.filter((r) => r.group === "airport").map((r) => r.slug),
  },
  {
    id: "city-routes",
    eyebrow: "The Corridor",
    h2: "City-to-Hamptons Routes",
    lede: "Direct chauffeured transfers between New York City, the boroughs, New Jersey and the Hamptons — no changing cars.",
    slugs: ROUTE_CARDS.filter((r) => r.group === "city").map((r) => r.slug),
  },
  {
    id: "local-routes",
    eyebrow: "Around the East End",
    h2: "Local Hamptons Routes",
    lede: "Point-to-point chauffeured trips between the Hamptons' villages and hamlets.",
    slugs: ROUTE_CARDS.filter((r) => r.group === "local").map((r) => r.slug),
  },
  {
    id: "on-demand",
    eyebrow: "On-Demand & Group",
    h2: "Corporate, Group &amp; Hourly Travel",
    lede: "Executive journeys, by-the-hour charters and large-group transport — coordinated down to the last detail.",
    slugs: ["corporate-executive", "group-transfers", "hourly-chauffeur"],
  },
  {
    id: "celebrations",
    eyebrow: "Weddings & Events",
    h2: "Weddings &amp; Celebrations",
    lede: "Premium chauffeured transportation for life's milestones — the couple, the party, and every guest, moved on schedule.",
    slugs: ["wedding-transportation", "prom-transportation", "party-bus"],
  },
  {
    id: "towns",
    eyebrow: "Local Car Service",
    h2: "Local Town Car Service",
    lede: "Door-to-door chauffeured car service in the Hamptons' villages and hamlets — airport transfers, local rides, and New York City trips.",
    slugs: ["east-quogue-car-service", ...TOWN_CARDS.map((t) => t.slug)],
  },
  {
    id: "tours",
    eyebrow: "Tours & Experiences",
    h2: "Wine Tours",
    lede: "Chauffeured vineyard-hopping across the East End and the North Fork — a designated chauffeur, your group together, and a day built around the wineries you choose.",
    slugs: ["hamptons-wine-tours", "north-fork-wine-tours"],
  },
  {
    id: "vehicles",
    eyebrow: "By Vehicle",
    h2: "Vehicle Services",
    lede: "Prefer to book by vehicle? Choose the Executive Sedan, Luxury SUV, or Sprinter Van for your trip.",
    slugs: ["sedan-service", "suv-service", "sprinter-van-service"],
  },
];

const svcByslug = Object.fromEntries(SITE.services.map((s) => [s.slug, s]));

/** Picture for a service card (16:9, lazy — hero is the only eager image). */
const cardPic = (base, alt) => `
        <picture>
          <source type="image/webp" srcset="${base}-640.webp 640w, ${base}-1024.webp 1024w" sizes="(min-width:900px) 32vw, (min-width:560px) 46vw, 92vw">
          <img src="${base}-1024.jpg" srcset="${base}-640.jpg 640w, ${base}-1024.jpg 1024w" sizes="(min-width:900px) 32vw, (min-width:560px) 46vw, 92vw" alt="${esc(alt)}" width="1024" height="576" loading="lazy" decoding="async">
        </picture>`;

/* ---- Section 1: premium hero ------------------------------------------ */
const heroSection = () => `
    <section class="hero hero--page hero--image page-services__hero" aria-labelledby="svc-hero-title">
      <picture class="hero__bg" aria-hidden="true">
        <source type="image/webp" srcset="${HERO_IMAGE}-640.webp 640w, ${HERO_IMAGE}-1024.webp 1024w, ${HERO_IMAGE}-1500.webp 1500w" sizes="100vw">
        <img src="${HERO_IMAGE}-1500.jpg" srcset="${HERO_IMAGE}-640.jpg 640w, ${HERO_IMAGE}-1024.jpg 1024w, ${HERO_IMAGE}-1500.jpg 1500w" sizes="100vw" alt="" width="1500" height="844" fetchpriority="high" decoding="async">
      </picture>
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="container">
        <div>
          <p class="hero__eyebrow">Our Services</p>
          <h1 id="svc-hero-title">Hamptons Chauffeured Car Services</h1>
          <p class="hero__area" style="max-width:62ch">Premium chauffeured car &amp; limo service across the Hamptons, the East End of Long Island and the New York City corridor — airport transfers, meet &amp; greet, corporate travel, group transport, private aviation and hourly charters.</p>
          <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
            <a class="btn btn-primary" href="#services">${btnIcon("grid")}Explore Our Services</a>
            <button type="button" class="btn btn-ghost" data-open-quote>${btnIcon("calendar")}Request a Quote</button>
          </div>
          <div class="hero__divider" aria-hidden="true"></div>
          <ul class="hero__trust">
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("users", { size: 15 })}</span>100+ happy clients</li>
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("clock", { size: 15 })}</span>24/7 concierge</li>
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("shield", { size: 15 })}</span>15+ years of excellence</li>
          </ul>
        </div>
      </div>
    </section>`;

/* ---- Sections 2–3: service category grids ----------------------------- */
const svcCard = (slug) => {
  const meta = svcByslug[slug] || EXTRA[slug];
  const pres = SVC[slug];
  if (!meta || !pres) return "";
  return cbox({
    cls: "svc-card card-surface",
    lead: `<div class="svc-card__media">${cardPic(pres.img, pres.alt)}</div>`,
    title: meta.title,
    titleCls: "svc-card__title",
    act: { href: meta.url },
    cue: "Explore Service",
    bodyHtml: `<p class="svc-card__desc">${esc(pres.desc)}</p>`,
  });
};

const categorySection = (c) => (alt) => `
    <section id="${c.id}" class="section${alt ? " section--alt" : ""}" aria-labelledby="svc-cat-${c.id}">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">${esc(c.eyebrow)}</span>
          <h2 id="svc-cat-${c.id}">${c.h2}</h2>
          <p class="text-secondary">${esc(c.lede)}</p>
        </div>
        <ul class="svc-grid">${c.slugs.map(svcCard).join("")}
        </ul>
      </div>
    </section>`;

export function servicesPage() {
  const origin = DEFAULT_SITE_URL.replace(/\/+$/, "");
  const description = "Every Aura Hamptons chauffeured service in one place: Hamptons airport car service, meet & greet, corporate and executive travel, group transfers, private aviation, hourly charters, and our premium fleet.";

  const listed = [...SITE.services, ...Object.values(EXTRA)];

  return landingPage({
    path: PATH,
    title: "All Services & Destinations",
    titleFull: "Hamptons Car Services & Destinations | Aura Hamptons",
    description,
    summary: "Master directory of every Aura Hamptons service, airport page, village, route, and vehicle.",
    bodyClass: "page-services page-group-transfers",
    defaultPickup: "",
    trail: [{ name: "Home", path: "/" }, { name: "All Services & Destinations", path: PATH }],
    headExtra: `<link rel="preload" as="image" type="image/webp" fetchpriority="high" imagesrcset="${esc(`${HERO_IMAGE}-640.webp 640w, ${HERO_IMAGE}-1024.webp 1024w, ${HERO_IMAGE}-1500.webp 1500w`)}" imagesizes="100vw">`,
    graph: [{
      "@type": "CollectionPage",
      "@id": `${origin}${PATH}#directory`,
      name: "All Services & Destinations",
      url: `${origin}${PATH}`,
      description,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: listed.length,
        itemListElement: listed.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: `${origin}${p.url}` })),
      },
    }],
    sections: [
      ["html", { render: () => heroSection() }],
      ...CATEGORIES.map((c) => ["html", { render: categorySection(c) }]),
      ["contact"],
    ],
  });
}

// Keep the ATL pickup string referenced for future prefill tweaks.
void PRIMARY_AIRPORT_PICKUP;
