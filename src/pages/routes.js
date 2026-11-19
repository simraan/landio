/**
 * Popular Routes — the hub-and-spoke scale engine.
 *   - routesHub()  → /routes/ pillar listing every route, grouped metro vs. long-haul.
 *   - routePages() → one page per route with a UNIQUE H1 and body (distance,
 *                    context), fleet options, a booking CTA, and a
 *                    link back to the hub. Service + BreadcrumbList JSON-LD.
 *
 * No distances or drive times: they had no source and were removed (logged in
 * docs/FACTS.md → "Needs source"). Re-add only with a verified source.
 */

import { SITE, serviceJsonLd, breadcrumbJsonLd, collectionJsonLd, DEFAULT_SITE_URL, CAPACITY, paxLabel, ATL_HUB_PATH, HUBS, ROUTES as ROUTE_MAP } from "../config.js";
import { esc, btnIcon } from "../templates/partials.js";
import { breadcrumb, fleetSection, contactSection, cbox } from "./_sections.js";

/* ------------------------------------------------------------------ *
 * Route data. `kind` = "metro" (ATL airport ⇄ area) or "longhaul"
 * (Atlanta ⇄ Georgia/regional city). Each route has a unique context blurb.
 * ------------------------------------------------------------------ */
const ROUTES = [
  // Metro "Atlanta Airport → <area>" pages were migrated to /areas/<city>-car-
  // service/ in wave 1 (301s in redirects.js). /routes/ is now long-distance only.
  // --- Long-haul: Atlanta ⇄ regional city ---------------------------------
  {
    kind: "longhaul", slug: "atlanta-to-athens", area: "Athens, GA",
    context:
      "Athens, home to the University of Georgia, sits northeast of Atlanta via I-85 and US-316. A-Town Limo covers the trip for game days, campus visits, and business travel.",
    landmarks: "the University of Georgia, Sanford Stadium, and downtown Athens",
  },
  {
    kind: "longhaul", slug: "atlanta-to-savannah", area: "Savannah, GA",
    context:
      "Savannah, on the coast, is a long-haul trip southeast of Atlanta via I-16. We handle the run for weddings, getaways, and executive travel in comfort, with stops as needed.",
    landmarks: "Savannah's Historic District, River Street, and Forsyth Park",
  },
  {
    kind: "longhaul", slug: "atlanta-to-macon", area: "Macon, GA",
    context:
      "Macon sits south of Atlanta on I-75. A-Town Limo provides chauffeured service for the central-Georgia city's events, business travel, and the Cherry Blossom Festival.",
    landmarks: "the Macon Coliseum, downtown Macon, and Mercer University",
  },
  {
    kind: "longhaul", slug: "atlanta-to-augusta", area: "Augusta, GA",
    context:
      "Augusta, on the South Carolina border, is east of Atlanta via I-20. We cover the route year-round, including the high-demand Masters Tournament week each spring.",
    landmarks: "Augusta National, the Savannah River, and downtown Augusta",
  },
  {
    kind: "longhaul", slug: "atlanta-to-chattanooga", area: "Chattanooga, TN",
    context:
      "Chattanooga sits just over the Tennessee line, north of Atlanta via I-75. A-Town Limo handles the interstate run for business trips, getaways, and group travel.",
    landmarks: "the Tennessee Aquarium, Lookout Mountain, and downtown Chattanooga",
  },
  {
    kind: "longhaul", slug: "atlanta-to-greenville-sc", area: "Greenville, SC",
    context:
      "Greenville, South Carolina, is northeast of Atlanta via I-85. We provide chauffeured long-haul service for corporate travel and getaways to the upstate city.",
    landmarks: "downtown Greenville, Falls Park on the Reedy, and the Peace Center",
  },
];

const label = (r) => (r.kind === "metro" ? `Atlanta Airport (ATL) to ${r.area}` : `Atlanta to ${r.area}`);
// Long-distance routes use the wave-1 slugs from config (ROUTES); the old
// /routes/atlanta-to-<city>/ URLs 301 to them (redirects.js).
const routePath = (r) => (r.kind === "metro" ? `/routes/${r.slug}/` : ROUTE_MAP.find((x) => x.oldSlug === r.slug).path);

/* ------------------------------- Hub ------------------------------------ */
function hubGroup(title, blurb, list) {
  const cards = list
    .map(
      (r) => `
          ${cbox({ cls: "route-card card-surface", title: label(r), act: { href: routePath(r), cue: "View route" },
            bodyHtml: `<p class="route-card__meta">${r.kind === "metro" ? "Airport transfer · Metro Atlanta" : "Long-distance from Atlanta"}</p>` })}`
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
  const longhaul = ROUTES.filter((r) => r.kind === "longhaul");
  const items = longhaul.map((r) => ({ name: label(r), path: routePath(r) }));

  const hero = `
    <section class="hero hero--page">
      <div class="container">
        <div style="max-width:760px">
          <p class="hero__eyebrow">Long-Distance Routes</p>
          <h1>Atlanta Long-Distance Car Service Routes</h1>
          <p class="hero__area" style="max-width:62ch">Chauffeured long-distance trips from Atlanta across Georgia and the surrounding region, with no surge pricing. For rides between Hartsfield-Jackson (ATL) and metro Atlanta, see the <a href="${HUBS.areas.path}">areas we serve</a>.</p>
          <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Get an Instant Quote</button>
            <a class="btn btn-ghost" href="${ATL_HUB_PATH}">${btnIcon("airplane")}Atlanta Airport Car Service</a>
          </div>
        </div>
      </div>
    </section>`;

  return {
    path: "/routes/",
    title: "Long-Distance Routes",
    description:
      "Atlanta long-distance car service — chauffeured trips with no surge pricing to Athens, Savannah, Macon, Augusta, Chattanooga, and Greenville. ATL metro transfers under Areas.",
    bodyClass: "page-routes",
    cluster: "routes",
    hub: true,
    card: { title: "Atlanta long-distance routes", text: "Chauffeured trips from Atlanta to cities across Georgia and the region.", icon: "route" },
    jsonLd: [collectionJsonLd(DEFAULT_SITE_URL, { name: "Long-Distance Routes", path: "/routes/", items })],
    main: [
      hero,
      hubGroup(
        "Long-Haul & Regional Routes",
        "Chauffeured trips from Atlanta to cities across Georgia and the surrounding region.",
        longhaul
      ),
      contactSection(),
    ].join("\n"),
  };
}

/* ---------------------------- Route pages ------------------------------- */
function routeBody(r) {
  const fleetLine =
    r.kind === "longhaul"
      ? `For long-haul comfort, most clients choose the Executive Sedan or SUV; the Sprinter van carries groups of ${paxLabel(CAPACITY.sprinter)}.`
      : `Choose the Executive Sedan for ${paxLabel(CAPACITY.sedan)}, the Executive SUV for ${paxLabel(CAPACITY.suv)} with luggage, or the Sprinter van for groups of ${paxLabel(CAPACITY.sprinter)}.`;
  return `
    <section class="section" aria-labelledby="route-intro">
      <div class="container prose-wide">
        <div class="section-head section-head--left">
          <span class="eyebrow">${r.kind === "metro" ? "Airport transfer · Metro Atlanta" : "Long-distance from Atlanta"}</span>
          <h2 id="route-intro">${esc(label(r))} car service</h2>
        </div>
        <p class="text-secondary">${esc(r.context)}</p>
        <p class="text-secondary">A-Town Limo serves this route 24/7 with professional chauffeurs, upfront quotes, and no surge pricing. ${esc(fleetLine)} Destinations near ${esc(r.area)} include ${esc(r.landmarks)}.</p>
        <p class="text-secondary">${r.kind === "metro"
          ? `Landing at Hartsfield-Jackson? See how pickups work for rides <a href="${ATL_HUB_PATH}">from Atlanta airport (ATL)</a>, including flight tracking and meet &amp; greet.`
          : `Flying into Atlanta first? We can start your trip with a pickup <a href="${ATL_HUB_PATH}">from Atlanta airport (ATL)</a>.`}</p>
        <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.5rem">
          <button type="button" class="btn btn-primary" data-open-quote data-route-from="${esc(r.kind === "metro" ? "Hartsfield-Jackson Atlanta Airport (ATL)" : "Atlanta, GA")}" data-route-to="${esc(r.area)}">${btnIcon("calendar")}Quote ${esc(label(r))}</button>
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
  const description = `${label(r)} car service with A-Town Limo — chauffeured, 24/7, no surge pricing. Sedan, SUV, or Sprinter van.`;
  return {
    path: routePath(r),
    title: label(r),
    description,
    bodyClass: "page-route",
    cluster: r.kind === "metro" ? "areas" : "routes",
    card: { title: r.kind === "metro" ? `ATL to ${r.area}` : `Atlanta to ${r.area}`, text: r.context.split(". ")[0] + ".", icon: r.kind === "metro" ? "pin" : "route" },
    jsonLd: [
      serviceJsonLd(DEFAULT_SITE_URL, { name, path: routePath(r), description }),
      breadcrumbJsonLd(DEFAULT_SITE_URL, trail),
    ],
    main: [
      breadcrumb(trail),
      routeBody(r),
      fleetSection({ heading: "Choose Your Vehicle", intro: "Every A-Town route is served by these three vehicles." }),
      contactSection(),
    ].join("\n"),
  };
}

/** Route list for other pages (e.g. the ATL hub's "Popular Rides" tables). */
export const ROUTE_LIST = ROUTES.map((r) => ({
  kind: r.kind,
  area: r.area,
  label: r.kind === "metro" ? `ATL to ${r.area}` : `Atlanta to ${r.area}`,
  path: routePath(r),
}));

export function routePages() {
  return ROUTES.map(render);
}
