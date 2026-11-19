/**
 * /services/ — the MASTER SERVICES page (premium, conversion-focused).
 *
 * Services hub (keeps its SEO title, canonical, breadcrumb and CollectionPage +
 * ItemList schema), rebuilt as a landing experience. Every core service page is
 * linked from the category grids, so no service page is orphaned. The SEO scale
 * wave adds the routes / areas / venues / events directory sections back.
 */

import { SITE, PRIMARY_AIRPORT_PICKUP, DEFAULT_SITE_URL } from "../config.js";
import { esc, btnIcon } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { cbox } from "./_sections.js";
import { icon } from "../templates/icons.js";

const PATH = "/services/";
const HERO_IMAGE = "/assets/img/hero/hamptons-hero";

/** Per-service presentation: image + short, specific description. Titles/URLs
 *  come from `config.js` (single source of truth) so they never drift. */
const SVC = {
  "airport-transfers":   { img: "/assets/img/fleet/executive-suv",  alt: "Landio Luxury SUV for DC-area airport transfers",        desc: "Flight-tracked, door-to-door transfers to and from Dulles (IAD), Reagan National (DCA) and BWI." },
  "corporate-executive": { img: "/assets/img/fleet/executive-sedan", alt: "Landio Executive Sedan for corporate travel",            desc: "Discreet, punctual chauffeured travel for executives, clients and corporate programs." },
  "fbo-private-jet":     { img: "/assets/img/fleet/sprinter-van",    alt: "Landio Sprinter Van for private aviation transfers",     desc: "Crew-coordinated transfers at Signature (IAD, DCA, BWI), Manassas, Leesburg, Montgomery County Airpark and Frederick." },
  "diplomatic-transportation": { img: "/assets/img/fleet/executive-sedan", alt: "Landio Executive Sedan for diplomatic transportation", desc: "Protocol-aware, confidential chauffeur service for embassies, missions and visiting dignitaries." },
  "group-transfers":     { img: "/assets/img/fleet/motor-coach",     alt: "Landio Charter Bus for group transportation",            desc: "Sprinter Vans, Mini Buses and Charter Buses for corporate groups, conferences and events." },
  "meet-and-greet":      { img: "/assets/img/fleet/executive-sedan", alt: "Landio Executive Sedan for terminal meet & greet",       desc: "Your chauffeur greets you inside the terminal with a name sign and luggage assistance." },
  "hourly-chauffeur":    { img: "/assets/img/fleet/executive-suv",   alt: "Landio Luxury SUV for hourly chauffeur service",         desc: "A dedicated chauffeur and vehicle by the hour for meetings, roadshows and multi-stop days." },
};

const CATEGORIES = [
  {
    id: "services",
    eyebrow: "Airport & Aviation",
    h2: "Airport &amp; Private Aviation",
    lede: "Flight-tracked arrivals, in-terminal greetings and crew-coordinated planeside transfers across Dulles, Reagan National, BWI and every FBO we serve.",
    slugs: ["airport-transfers", "meet-and-greet", "fbo-private-jet"],
  },
  {
    id: "corporate",
    eyebrow: "Corporate & Diplomatic",
    h2: "Corporate, Diplomatic &amp; Group Travel",
    lede: "Executive journeys, protocol-aware diplomatic service, by-the-hour charters and large-group transport — coordinated down to the last detail.",
    slugs: ["corporate-executive", "diplomatic-transportation", "group-transfers", "hourly-chauffeur"],
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
          <h1 id="svc-hero-title">DC Metro Chauffeured Car Services</h1>
          <p class="hero__area" style="max-width:62ch">Luxury chauffeured car &amp; limo service across Washington, DC, Maryland and Northern Virginia — airport transfers, meet &amp; greet, corporate and executive travel, diplomatic transportation, private aviation and group transport.</p>
          <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
            <a class="btn btn-primary" href="#services">${btnIcon("grid")}Explore Our Services</a>
            <button type="button" class="btn btn-ghost" data-open-quote>${btnIcon("calendar")}Request a Quote</button>
          </div>
          <div class="hero__divider" aria-hidden="true"></div>
          <ul class="hero__trust">
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("clock", { size: 15 })}</span>24/7 dispatch</li>
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("plane", { size: 15 })}</span>Flight-tracked arrivals</li>
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("tag", { size: 15 })}</span>No surge pricing</li>
          </ul>
        </div>
      </div>
    </section>`;

/* ---- Service category grids ------------------------------------------- */
const svcCard = (slug) => {
  const meta = svcByslug[slug];
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
  const description = "Every Landio chauffeured service in one place: DC-area airport car service, meet & greet, corporate and executive travel, diplomatic transportation, group transfers, private aviation, hourly charters, and our premium fleet.";

  const listed = [...SITE.services];

  return landingPage({
    path: PATH,
    title: "All Services & Destinations",
    titleFull: "DC Car Services & Destinations | Landio Limo Services",
    description,
    summary: "Master directory of every Landio service, airport line, and vehicle.",
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

// Keep the airport pickup string referenced for future prefill tweaks.
void PRIMARY_AIRPORT_PICKUP;
