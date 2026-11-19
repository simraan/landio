/**
 * Shared building blocks for the wave-1 page types (terminal, guide, area,
 * venue, event, FBO, route, hubs). Page renderers combine these with content
 * from src/content/*.js and the link maps in config.js — no page is
 * hand-written per city/venue.
 */

import {
  SITE,
  PHONE,
  PRICING,
  CANCELLATION,
  DEFAULT_SITE_URL,
  AREAS,
  VENUES,
  EVENTS,
  FBOS,
  ROUTES,
  GUIDES,
  HUBS,
  bySlug,
} from "../config.js";
import { esc } from "../templates/partials.js";

export const ORIGIN = DEFAULT_SITE_URL.replace(/\/+$/, "");
export const abs = (path) => `${ORIGIN}${path}`;

/**
 * Venue slug → booking-form place string. MUST match the PLACES datalist in
 * templates/partials.js so the quote popup pre-selects the venue. Shared by the
 * event and venue page renderers.
 */
export const VENUE_PLACE = {
  "mercedes-benz-stadium": "Mercedes-Benz Stadium, Atlanta, GA",
  "state-farm-arena": "State Farm Arena, Atlanta, GA",
  "georgia-world-congress-center": "Georgia World Congress Center, Atlanta, GA",
  "truist-park": "Truist Park & The Battery, Atlanta, GA",
  "fox-theatre": "Fox Theatre, Atlanta, GA",
  "gas-south-arena": "Gas South Arena, Duluth, GA",
};

export const HERO_IMG = {
  base: "/assets/img/hero/hamptons-hero",
  widths: [640, 1024, 1500],
  width: 1500,
  height: 844,
  alt: "Aura Hamptons chauffeured car at a Hamptons estate",
};

/** Sources used across pages: key → [url, label]. Every fact cites one. */
export const SRC = {
  atlGT: ["https://www.atl.com/ground-transportation/", "ATL Ground Transportation"],
  atlMaps: ["https://www.atl.com/maps/", "ATL Maps & Directions"],
  atlFaq: ["https://www.atl.com/faq/", "ATL FAQ"],
  atlSecurity: ["https://www.atl.com/passenger-information/passenger-security/", "ATL Passenger Security"],
  atlIntl: ["https://www.atl.com/passenger-information/international-terminal/", "ATL International Terminal"],
  atlFactsheet: ["https://www.atl.com/about-old/atl-factsheet/", "ATL fact sheet"],
  atlNavigate: ["https://www.atl.com/traveling-soon-heres-how-to-navigate-atl-like-a-pro/", "ATL: navigate like a pro"],
  atlPlaneTrain: ["https://www.atl.com/the-plane-train-getting-you-there-since-1980/", "ATL: the Plane Train"],
  atlAbout: ["https://www.atl.com/about-atl/", "About ATL"],
  atlArt: ["https://www.atl.com/about-old/airport-art-program/", "ATL Airport Art Program"],
  marta: ["https://www.itsmarta.com/getting-to-airport.aspx", "MARTA: Getting to the Airport"],
  aci: ["https://aci.aero/2026/07/15/worlds-busiest-airports-atlanta-holds-asia-climbs-strong-demand-while-asia-pacific-growth-reshape-the-rankings/", "ACI World, Jul 2026"],
  mbs: ["https://mercedesbenzstadium.com/", "Mercedes-Benz Stadium"],
  mbsParking: ["https://mercedesbenzstadium.com/parking-and-transportation", "Mercedes-Benz Stadium parking & transportation"],
  sfa: ["https://www.statefarmarena.com/", "State Farm Arena"],
  truist: ["https://www.mlb.com/braves/ballpark", "Truist Park (Atlanta Braves)"],
  battery: ["https://batteryatl.com/", "The Battery Atlanta"],
  gwcc: ["https://www.gwcca.org/", "Georgia World Congress Center"],
  gassouth: ["https://www.gassouthdistrict.com/", "Gas South District"],
  fox: ["https://www.foxtheatre.org/visit/directions-parking", "Fox Theatre directions & parking"],
  pdk: ["https://pdkairport.com/", "DeKalb-Peachtree Airport (PDK)"],
  fty: ["https://www.fultoncountyga.gov/Inside-Fulton-County/Fulton-County-Departments/Public-Works/Airport", "Fulton County Airport"],
  ftyWiki: ["https://en.wikipedia.org/wiki/Fulton_County_Airport_(Georgia)", "Fulton County Airport (Wikipedia)"],
};

/** FBO slug → booking-form place string (must match PLACES in partials.js). */
export const FBO_PLACE = {
  pdk: "PDK — DeKalb-Peachtree Airport (Private/FBO)",
  fty: "FTY — Fulton County Airport (Private/FBO)",
};

export const ext = (href, text) => `<a href="${esc(href)}" rel="noopener" target="_blank">${esc(text)}</a>`;
export const tel = () => `<a href="tel:${esc(PHONE.e164)}">${esc(PHONE.display)}</a>`;
/** "Sources: A; B." line from SRC keys or [url, label] pairs. */
export const sources = (...keys) =>
  `Sources: ${keys.map((k) => (Array.isArray(k) ? ext(...k) : ext(...SRC[k]))).join("; ")}.`;

/** Standard "At a Glance" tiles; every tile opens the quote with this page's trip context. */
export function glanceTiles(modal = {}) {
  return [
    { icon: "clock", text: SITE.hours, act: { modal } },
    { icon: "tag", text: PRICING.surge, act: { modal } },
    { icon: "refresh", text: CANCELLATION.short, act: { href: "/terms-of-service/#cancellation", cue: "Read the policy" } },
    { icon: "message", text: SITE.responseShort, act: { href: "/contact/", cue: "Contact us" } },
    SITE.chauffeurDetailsBeforePickup
      ? { icon: "userCheck", text: SITE.chauffeurDetailsLine, act: { modal } }
      : { icon: "wifi", text: "Complimentary Wi-Fi", act: { modal } },
  ];
}

export const FLEET_BANDS = [
  { label: "1–3", max: 3 },
  { label: "4", max: 4 },
  { label: "5–6", max: 6 },
  { label: "7–14", max: 14 },
];

export const vehicle = (key) => SITE.fleet.find((v) => v.key === key);
export const vehicleSpec = (v) => `${v.name}: ${v.pax}${v.bags ? `, ${v.bags} bags` : ""}`;
export const fleetAnswer = () => `${["sedan", "suv", "sprinter"].map((k) => vehicleSpec(vehicle(k))).join(". ")}.`;

/** Service node for the page @graph. */
export function serviceNode({ path, name, serviceType, description, areaServed }) {
  return {
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    serviceType,
    url: abs(path),
    description,
    provider: { "@id": `${ORIGIN}/#business` },
    areaServed: areaServed || { "@type": "AdministrativeArea", name: "Metro Atlanta", containedInPlace: { "@type": "State", name: "Georgia" } },
  };
}

/** CollectionPage + ItemList node for hubs. */
export function collectionNode({ path, name, description, items }) {
  return {
    "@type": "CollectionPage",
    "@id": `${abs(path)}#collection`,
    name,
    url: abs(path),
    description,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.path) })),
    },
  };
}

/* ---- Link cards generated from the page maps (used by "nearby"/related grids). */
export const card = (path, title, text, icon = "pin", cta = "View page") => ({ href: path, requires: path, title, text, icon, cta });
export const areaCard = (slug, text) => { const a = bySlug(AREAS, slug); return card(a.path, `${a.name} car service`, text || `Car service and ATL transfers in ${a.name}.`, "pin", "View area"); };
export const venueCard = (slug, text) => { const v = bySlug(VENUES, slug); return card(v.path, `${v.name} car service`, text || `Drop-off and pickup plans for ${v.name}.`, "pin", "View venue"); };
export const eventCard = (slug, text) => { const e = bySlug(EVENTS, slug); return card(e.path, `${e.name} transportation`, text || `Rides for ${e.name}.`, "calendar", "View event"); };
export const fboCard = (slug, text) => { const f = bySlug(FBOS, slug); return card(f.path, `${f.code} private jet car service`, text || `Transfers at ${f.name} (${f.code}).`, "plane", "View airfield"); };
export const routeCard = (slug, text) => { const r = bySlug(ROUTES, slug); return card(r.path, `${r.label} car service`, text || `Chauffeured long-distance trip to ${r.city}.`, "route", "View route"); };
export const guideCard = (slug, text) => { const g = bySlug(GUIDES, slug); return card(g.path, g.title, text || "ATL airport guide.", "pin", "Read the guide"); };
export const hubCard = (key, text, icon = "grid") => card(HUBS[key].path, HUBS[key].name, text, icon, "Open hub");
export const fleetCard = (key) => {
  const v = vehicle(key);
  return card(`/fleet/${v.slug}/`, v.name, `${v.pax}${v.bags ? `, ${v.bags} bags` : ""}.`, key === "sprinter" ? "van" : "car", "View vehicle");
};

/** "See all services & destinations" line for every hub (brief §11). */
export const allServicesLine = () => `See <a href="${HUBS.services.path}">all services &amp; destinations</a>.`;
