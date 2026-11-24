/**
 * DC-area airport pages — renderer. One page per airport the client serves
 * (IAD, DCA, BWI), built from src/content/terminals.js. Structure comes from the
 * shared landing template; business facts from config.js.
 *
 *   /dc-airport-car-service/iad/
 *   /dc-airport-car-service/dca/
 *   /dc-airport-car-service/bwi/
 *
 * All three airports share the same premium section structure and styling
 * (.page-terminal in styles.css). Everything airport-specific — facts, routes,
 * headings, final-CTA wording, SEO/meta, booking prefills — is data-driven from
 * the per-airport content block (and its `x` extension), so there is no
 * per-airport code branching here.
 */

import { SITE, ATL_HUB_PATH, AREAS, bySlug } from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { TERMINALS } from "../content/terminals.js";
import { HERO_IMG, serviceNode, abs } from "./_kit.js";
import { fleetCards, googleReviews, eventCta, photoMarquee, airportGlance } from "./_sections.js";

const airportPath = (key) => `/dc-airport-car-service/${key}/`;
const toStep = ([icon, title, text]) => ({ icon, title, text });

// Google Reviews is temporarily hidden on the airport pages (client request).
// The section, component and data are preserved — flip this to true (or delete
// the guard) to restore it on all three pages. Homepage reviews are unaffected.
const SHOW_AIRPORT_REVIEWS = false;

/* Fleet showcase strip shown right after the hero — reuses the homepage photo
   marquee (photoMarquee) with real fleet/vehicle imagery, no Instagram branding.
   Identical on all three airports so they stay visually consistent. */
const SHOWCASE_IMAGES = [
  { webp: "/assets/img/instagram/ig-1.webp", jpg: "/assets/img/instagram/ig-1.jpg", alt: "Landio Limo Services luxury van" },
  { webp: "/assets/img/instagram/ig-3.webp", jpg: "/assets/img/instagram/ig-3.jpg", alt: "Landio Limo Services luxury SUV" },
  { webp: "/assets/img/instagram/ig-4.webp", jpg: "/assets/img/instagram/ig-4.jpg", alt: "Landio Limo Services luxury sedan and SUV" },
  { webp: "/assets/img/instagram/ig-6.webp", jpg: "/assets/img/instagram/ig-6.jpg", alt: "Landio Limo Services luxury van interior with LED lighting" },
  { webp: "/assets/img/instagram/ig-7.webp", jpg: "/assets/img/instagram/ig-7.jpg", alt: "Landio Limo Services luxury van interiors" },
  { webp: "/assets/img/instagram/ig-8.webp", jpg: "/assets/img/instagram/ig-8.jpg", alt: "Landio Limo Services luxury SUV" },
];
const showcaseSection = (alt) => `
    <section class="${alt ? "section section--alt" : "section"} lp-showcase" aria-labelledby="fleet-showcase-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Our Luxury Fleet</span>
          <h2 id="fleet-showcase-title" class="lp-h2-compact">Arrive in Signature Style</h2>
        </div>
      </div>${photoMarquee(SHOWCASE_IMAGES)}
    </section>`;

// "Dulles (IAD)" for IAD/DCA, "BWI" for BWI (avoids a redundant "BWI (BWI)").
const fromLabel = (t) => (t.h1short === t.code ? t.code : `${t.h1short} (${t.code})`);

/* "Popular Routes" rows — reuses the landing template's native route component
   (rideTable via the `routes` section). Each row links to the real destination
   area page and carries a Quote CTA that prefills <airport> → destination.
   Destinations come from the AREAS SSOT, so no travel times, distances or prices
   are invented. bySlug throws on a typo → the build fails fast. */
const routeRows = (t, slugs) =>
  slugs.map((s) => {
    const a = bySlug(AREAS, s);
    return { path: a.path, label: `${fromLabel(t)} to ${a.name}`, area: a.pickup };
  });

/* "Choose Your Vehicle" fleet band — reuses the homepage fleet cards (SITE.fleet
   order: Sedan, SUV, Sprinter, Stretch Limo, Minibus, Charter Bus) and the
   homepage .section-head / .fleet-grid design. `alt` keeps the alternating
   background rhythm. */
const fleetSection = (t) => (alt) => `
    <section class="section${alt ? " section--alt" : ""}" aria-labelledby="${t.key}-fleet-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Choose Your Vehicle</span>
          <h2 id="${t.key}-fleet-title">The Right Vehicle for Your ${t.code} Transfer</h2>
          <p class="text-secondary">From a solo arrival to a full group, pick the class that fits your party and luggage — every Landio vehicle runs flight-tracked transfers between ${fromLabel(t)} and anywhere across Washington, DC, Maryland, and Northern Virginia.</p>
        </div>
        <ul class="fleet-grid">${fleetCards(SITE.fleet)}</ul>
      </div>
    </section>`;

function terminalPage(t) {
  const path = airportPath(t.key);
  const pickup = `${t.name} (${t.code})`;
  const arriveAct = { modal: { pickup }, cue: "Book this pickup" };
  const departAct = { modal: { dropoff: pickup }, cue: "Book a ride here" };
  const nick = t.h1short; // "Dulles" / "Reagan National" / "BWI"

  // The other two airports, for the "Plan the Rest of Your Trip" cross-links.
  const others = Object.values(TERMINALS).filter((x) => x.key !== t.key);

  return landingPage({
    path,
    title: t.title,
    titleFull: t.titleFull,
    description: t.description,
    summary: t.summary,
    bodyClass: `page-terminal page-airport-${t.key}`,
    cluster: "airport",
    card: { title: `${t.code} airport car service`, text: t.summary, icon: "plane" },
    defaultPickup: pickup,
    // Each airport page has its own dedicated final CTA (the event-cta band
    // below), so suppress the generic sitewide pre-footer cta-band on all three.
    hidePreFooterCta: true,
    trail: [
      { name: "Home", path: "/" },
      { name: "DC Airport Car Service", path: ATL_HUB_PATH },
      { name: `${t.code} Airport Car Service`, path },
    ],
    faqs: t.faqs,
    graph: [
      serviceNode({ path, name: t.h1, serviceType: "Airport transfer", description: t.description }),
      { "@type": "Airport", "@id": `${abs(path)}#airport`, name: t.name, iataCode: t.code },
    ],
    sections: [
      ["hero", {
        eyebrow: `${t.code} Airport Transfers · 24/7`,
        h1: t.h1,
        // Gold-accented H1 to match the homepage hero. Text content is identical
        // to `h1`/`title`, so SEO/meta are unchanged.
        h1Html: `${t.code} Airport Car Service (<span class="gold">${esc(nick)}</span>)`,
        answerHtml: esc(t.answer),
        chips: t.chips,
        image: HERO_IMG,
        prefillPickup: pickup,
        formId: `${t.key}-quote`,
        formHeading: `Get Your ${t.code} Quote`,
        formLocation: path,
      }],

      // Fleet showcase slider — immediately after the hero (reuses the homepage
      // photo marquee; no Instagram branding). Identical on all three airports.
      ["html", { render: showcaseSection }],

      // Fleet moved up to sit right after the showcase.
      ["html", { render: fleetSection(t) }],

      // At a Glance — premium panel: airport-specific heading + key-stat row, a
      // 3×2 grid of six information cards, and a summary with a gold left border.
      // Every stat and card links to a real on-page section or existing page
      // (no dead links). Numbers come from the CAPACITY / fleet SSOT.
      ["html", {
        render: (alt) => airportGlance({
          id: `glance-${t.key}`,
          title: `${t.code} Airport Car Service at a Glance`,
          stats: [
            { num: "56", label: "Max Passengers", href: `#${t.key}-fleet-title` },
            { num: "6", label: "Vehicle Classes", href: "/fleet/" },
            { num: "3", label: "DC Airports", href: ATL_HUB_PATH },
            { num: "24/7", label: "Dispatch", href: "/contact/" },
          ],
          cards: [
            { icon: "plane", title: "Airport Transfers", desc: `Flight-tracked transfers to and from ${t.code}, door to door across the DC metro.`, href: `#pd-${t.key}` },
            { icon: "users", title: "Capacity", desc: "From an Executive Sedan up to a 56-passenger Charter Bus, sized to your party and luggage.", href: `#${t.key}-fleet-title` },
            { icon: "radar", title: "Flight Tracking", desc: "Share your airline and flight number; your pickup adjusts to your actual landing, delayed or early.", href: `#flow-${t.key}` },
            { icon: "pin", title: "Service Area", desc: "Washington, DC, Maryland and Northern Virginia, plus the Northeast corridor.", href: `#routes-${t.key}` },
            { icon: "calendar", title: "Weddings & Events", desc: "Flight-tracked group airport transfers for arriving wedding and event guests.", href: "/events/" },
            { icon: "van", title: "Group Vehicles", desc: "Sprinter Vans, Mini Buses and Charter Buses for arriving groups and families.", href: "/fleet/" },
          ],
          summary: `Landio Limo Services provides flight-tracked, door-to-door airport car service between ${t.x.midName} (${t.code}) and anywhere across Washington, DC, Maryland, and Northern Virginia. Meet & greet inside the terminal is available on request, with 24/7 dispatch, including holidays.`,
          alt,
        }),
      }],

      ["intro", {
        label: "Pickup and drop-off",
        eyebrow: "Pickup & Drop-off",
        h2: `Airport Pickup & Drop-off at ${t.code}`,
        h2Id: `pd-${t.key}`,
        colTitleTag: "h3",
        cols: [
          { id: `pickup-${t.key}`, icon: "radar", h2: `Pickup at ${t.code}`, act: arriveAct, cue: "Book a pickup", html: t.pickupText },
          { id: `dropoff-${t.key}`, icon: "plane", h2: `Drop-off for ${t.code} Departures`, act: departAct, cue: "Book a drop-off", html: t.dropoffText },
        ],
      }],

      ["timeline", {
        id: `flow-${t.key}`,
        idBase: `flow-${t.key}`,
        eyebrow: "Step by Step",
        h2: `Your ${t.code} Ride, Step by Step`,
        ledeHtml: esc(`Follow a Landio transfer at ${t.code} step by step — choose Arriving or Leaving to see exactly what happens and where you'll meet your chauffeur.`),
        tabsLabel: `${t.code} flow`,
        tabs: [
          { label: `Arriving at ${t.code}`, title: `Meeting your chauffeur at ${t.code}`, point: t.arriving.point, act: arriveAct, pointCue: "Book this pickup", pointTitle: "Before you land", pointIcon: "message", steps: t.arriving.steps.map(toStep) },
          { label: `Leaving from ${t.code}`, title: `Getting to ${t.code} for your flight`, point: t.departing.point, act: departAct, pointCue: "Book a ride here", pointTitle: "Before your flight", pointIcon: "message", steps: t.departing.steps.map(toStep) },
        ],
        footHtml: "We confirm your exact meeting point when you book.",
      }],

      // "Why Choose Landio" benefits grid.
      ["why", {
        id: `why-${t.key}`,
        eyebrow: "Why Landio",
        h2: `Why Choose Landio for ${nick} Airport Transfers?`,
        lede: `The reasons DC-metro travelers rely on Landio for ${nick} — from the first quote to the final drop-off.`,
        items: [
          { icon: "radar", title: "Real-time flight tracking", text: "We watch your inbound flight and shift your pickup to your actual landing — early or delayed, we're there." },
          { icon: "userCheck", title: "Professional, vetted chauffeurs", text: `Experienced, background-checked drivers who know ${nick} and every route across the DC metro.` },
          { icon: "clock", title: "Punctual pickups", text: "Live tracking and built-in margin keep your car ready and waiting — not the other way around." },
          { icon: "tag", title: "One upfront price", text: "A flat quote confirmed before you book — no surge, no meter, no surprises at the curb." },
          { icon: "car", title: "Immaculate luxury fleet", text: "Sedans to charter buses, each late-model and meticulously maintained inside and out." },
          { icon: "pin", title: "Reliable, round-the-clock", text: `24/7 service to and from ${t.code} across Washington, DC, Maryland, and Northern Virginia.` },
        ],
      }],

      // Google Reviews — temporarily hidden on the airport pages per client
      // request (SHOW_AIRPORT_REVIEWS). The component and review data are
      // preserved and reused from the homepage; flip the flag to restore here.
      ...(SHOW_AIRPORT_REVIEWS
        ? [["html", {
            render: (alt) => googleReviews({
              id: `reviews-${t.key}`,
              h2: `What ${nick} Travelers Say`,
              lede: `Travelers to and from ${t.x.midName} (${t.code}) share their Landio Limo Services experience on Google. Read their reviews — and leave your own.`,
              alt,
            }),
          }]]
        : []),

      // Popular Routes — the landing template's native `routes` section
      // (tabbedRoutes/rideTable): a link to each destination's area page plus a
      // Quote CTA that prefills this airport → destination.
      ["routes", {
        id: `routes-${t.key}`,
        idBase: `routes-${t.key}`,
        eyebrow: "Popular Routes",
        h2: `Popular Routes from ${nick} Airport`,
        lede: `Our most-requested ${fromLabel(t)} transfers across the DC metro. Open a destination for details, or tap Quote to start a prefilled booking.`,
        tabsLabel: `${nick} route groups`,
        pickup,
        groups: t.x.routeGroups.map((g) => ({ label: g.label, caption: g.caption, routes: routeRows(t, g.slugs) })),
        moreHtml: `See all <a href="/areas/">DC-metro areas we serve</a>.`,
      }],

      ["faq", { heading: `${t.code} Airport Car Service FAQ`, eyebrow: "Good to Know" }],

      // Bottom flow: cleaned "Plan the Rest of Your Trip" (sibling airports +
      // airport services — destinations already live in Popular Routes) then a
      // dedicated final booking CTA. Contact + shared footer follow.
      ["links", {
        id: `explore-${t.key}`,
        eyebrow: "Keep Exploring",
        h2: "Plan the Rest of Your Trip",
        lede: `The other airports we serve and the services that round out your ${nick} transfer.`,
        items: [
          ...others.map((o) => ({ href: airportPath(o.key), icon: "plane", title: `${o.code} airport car service`, text: o.x.blurb, cta: "View airport" })),
          { href: ATL_HUB_PATH, icon: "route", title: "DC Airport Car Service", text: "The full hub for IAD, DCA, and BWI transfers.", cta: "Open hub" },
          { href: "/private-jet-fbo-transfers/", icon: "plane", title: "Private jet & FBO transfers", text: `Flying private? Signature ${nick} and the region's FBOs.`, cta: "View FBOs" },
          { href: "/services/meet-and-greet/", icon: "sign", title: "Meet & greet service", text: "In-terminal greeting with a name sign and bag help.", cta: "How it works" },
        ],
      }],

      // Dedicated final booking CTA — reuses the homepage event-cta band (same
      // design + button styles). Primary button prefills this airport as pickup;
      // the call block uses the verified phone.
      ["html", {
        render: () => eventCta({
          eyebrow: `${t.x.ctaNick} Transfers · 24/7`,
          headingHtml: `Ready for Your <span class="gold">${esc(t.x.ctaNick)}</span> Transfer?`,
          lede: `Flight-tracked pickups, professional chauffeurs, and one upfront price. Book your ${t.x.midName} (${t.code}) ride in minutes — or call us any hour for immediate help.`,
          ctaLabel: `Book Your ${t.code} Ride`,
          prefillPickup: pickup,
          callLabel: "Call for immediate assistance",
        }),
      }],

      // Contact — Instagram CTA suppressed on airport pages (client request);
      // the homepage and every other page keep theirs.
      ["contact", { hideSocial: true }],
    ],
  });
}

export function terminalPages() {
  return Object.values(TERMINALS).map(terminalPage);
}
