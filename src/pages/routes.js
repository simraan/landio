/**
 * Popular intercity routes — hub + spokes.
 *   - routesHub()  → /routes/ pillar listing every route.
 *   - routePages() → one page per route with a unique H1 and body, fleet
 *                    options, a booking CTA, and a link back to the hub.
 *
 * DC-metro intercity corridors (Washington, DC ⇄ a Northeast/regional city).
 * Airport ⇄ area transfers live under /areas/ and /dc-airport-car-service/.
 * No unsourced distances or drive times.
 */

import { SITE, serviceJsonLd, breadcrumbJsonLd, collectionJsonLd, DEFAULT_SITE_URL, CAPACITY, paxLabel, ATL_HUB_PATH, HUBS } from "../config.js";
import { esc, btnIcon } from "../templates/partials.js";
import { breadcrumb, fleetSection, contactSection, cbox } from "./_sections.js";

const ROUTES = [
  {
    slug: "washington-dc-to-new-york-city", from: "Washington, DC", to: "New York City",
    context: "The Washington, DC ↔ New York City corridor is one of the busiest in the country, running up I-95 through Baltimore, Philadelphia, and New Jersey. Landio covers the trip door to door for executives, events, and travelers who'd rather not fly the shuttle.",
    landmarks: "Midtown Manhattan, the Financial District, and the wider New York metro area",
  },
  {
    slug: "washington-dc-to-philadelphia", from: "Washington, DC", to: "Philadelphia",
    context: "Philadelphia sits up I-95 from Washington, DC, a common corridor for corporate travel, conferences, and events. Landio runs the trip in executive comfort, with upfront pricing and stops as needed.",
    landmarks: "Center City, the Pennsylvania Convention Center, and Philadelphia International Airport",
  },
  {
    slug: "washington-dc-to-baltimore", from: "Washington, DC", to: "Baltimore",
    context: "Baltimore is a short run north of Washington, DC via I-95 or the Baltimore-Washington Parkway. Landio handles the corridor for business travel, events, cruise-port transfers, and BWI connections.",
    landmarks: "the Inner Harbor, the convention center, and the stadiums at Camden Yards",
  },
  {
    slug: "washington-dc-to-annapolis", from: "Washington, DC", to: "Annapolis",
    context: "Annapolis, Maryland's capital on the Chesapeake Bay, sits east of Washington, DC via US-50. Landio covers the route for Naval Academy events, waterfront weddings, and corporate travel.",
    landmarks: "the United States Naval Academy, the Maryland State House, and City Dock",
  },
  {
    slug: "washington-dc-to-richmond", from: "Washington, DC", to: "Richmond",
    context: "Richmond, Virginia's capital, sits south of Washington, DC on I-95. Landio runs the corridor for state-government travel, business trips, and events in executive comfort.",
    landmarks: "downtown Richmond, the Virginia State Capitol, and the James River district",
  },
];

const label = (r) => `${r.from} to ${r.to}`;
const routePath = (r) => `/routes/${r.slug}/`;

/* ------------------------------- Hub ------------------------------------ */
function hubGroup(title, blurb, list) {
  const cards = list
    .map(
      (r) => `
          ${cbox({ cls: "route-card card-surface", title: label(r), act: { href: routePath(r), cue: "View route" },
            bodyHtml: `<p class="route-card__meta">Intercity · from Washington, DC</p>` })}`
    )
    .join("");
  return `
    <section class="section" aria-labelledby="rg-${title.replace(/\s+/g, "-").toLowerCase()}">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Popular Routes</span>
          <h2 id="rg-${title.replace(/\s+/g, "-").toLowerCase()}">${esc(title)}</h2>
          <p class="text-secondary">${esc(blurb)}</p>
        </div>
        <ul class="route-card-grid">${cards}</ul>
      </div>
    </section>`;
}

export function routesHub() {
  const items = ROUTES.map((r) => ({ name: label(r), path: routePath(r) }));

  const hero = `
    <section class="hero hero--page">
      <div class="container">
        <div style="max-width:760px">
          <p class="hero__eyebrow">Intercity Routes</p>
          <h1>DC Intercity Car Service Routes</h1>
          <p class="hero__area" style="max-width:62ch">Chauffeured intercity trips from Washington, DC up and down the Northeast corridor, with no surge pricing. For airport transfers, see the <a href="${ATL_HUB_PATH}">DC airport car service</a> hub and the <a href="${HUBS.areas.path}">areas we serve</a>.</p>
          <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Get an Instant Quote</button>
            <a class="btn btn-ghost" href="${ATL_HUB_PATH}">${btnIcon("airplane")}DC Airport Car Service</a>
          </div>
        </div>
      </div>
    </section>`;

  return {
    path: "/routes/",
    title: "Intercity Routes",
    description:
      "DC intercity car service — chauffeured trips with no surge pricing from Washington, DC to New York City, Philadelphia, Baltimore, Annapolis, and Richmond.",
    bodyClass: "page-routes",
    cluster: "routes",
    hub: true,
    card: { title: "DC intercity routes", text: "Chauffeured trips from Washington, DC across the Northeast corridor.", icon: "route" },
    jsonLd: [collectionJsonLd(DEFAULT_SITE_URL, { name: "Intercity Routes", path: "/routes/", items })],
    main: [
      hero,
      hubGroup(
        "Intercity & Corridor Routes",
        "Chauffeured trips from Washington, DC to cities across the Northeast and the region.",
        ROUTES
      ),
      contactSection(),
    ].join("\n"),
  };
}

/* ---------------------------- Route pages ------------------------------- */
function routeBody(r) {
  const fleetLine = `For intercity comfort, most clients choose the Executive Sedan or Executive SUV; the Sprinter van carries groups of ${paxLabel(CAPACITY.sprinter)}, with minibuses and charter buses for larger parties.`;
  return `
    <section class="section" aria-labelledby="route-intro">
      <div class="container prose-wide">
        <div class="section-head section-head--left">
          <span class="eyebrow">Intercity · from Washington, DC</span>
          <h2 id="route-intro">${esc(label(r))} car service</h2>
        </div>
        <p class="text-secondary">${esc(r.context)}</p>
        <p class="text-secondary">Landio serves this route 24/7 with professional chauffeurs, upfront quotes, and no surge pricing. ${esc(fleetLine)} Destinations near ${esc(r.to)} include ${esc(r.landmarks)}.</p>
        <p class="text-secondary">Starting from one of the DC-area airports? See how pickups work for rides <a href="${ATL_HUB_PATH}">from Dulles, Reagan National, and BWI</a>, including flight tracking and meet &amp; greet.</p>
        <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.5rem">
          <button type="button" class="btn btn-primary" data-open-quote data-route-from="${esc(r.from)}" data-route-to="${esc(r.to)}">${btnIcon("calendar")}Quote ${esc(label(r))}</button>
          <a class="btn btn-ghost" href="/routes/">${btnIcon("map")}All Routes</a>
        </div>
      </div>
    </section>`;
}

function render(r) {
  const name = `${label(r)} car service`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Popular Routes", path: "/routes/" },
    { name: label(r), path: routePath(r) },
  ];
  const description = `${label(r)} car service with Landio — chauffeured, 24/7, no surge pricing. Sedan, SUV, or Sprinter van.`;
  return {
    path: routePath(r),
    title: label(r),
    description,
    bodyClass: "page-route",
    cluster: "routes",
    card: { title: label(r), text: r.context.split(". ")[0] + ".", icon: "route" },
    jsonLd: [
      serviceJsonLd(DEFAULT_SITE_URL, { name, path: routePath(r), description }),
      breadcrumbJsonLd(DEFAULT_SITE_URL, trail),
    ],
    main: [
      breadcrumb(trail),
      routeBody(r),
      fleetSection({ heading: "Choose Your Vehicle", intro: "Every Landio route is served by our full fleet." }),
      contactSection(),
    ].join("\n"),
  };
}

/** Route list for other pages. */
export const ROUTE_LIST = ROUTES.map((r) => ({ kind: "intercity", area: r.to, label: label(r), path: routePath(r) }));

export function routePages() {
  return ROUTES.map(render);
}
