/**
 * DC-area airport pages — renderer. One page per airport the client serves
 * (IAD, DCA, BWI), built from src/content/terminals.js. Structure comes from the
 * shared landing template; business facts from config.js.
 *
 *   /dc-airport-car-service/iad/
 *   /dc-airport-car-service/dca/
 *   /dc-airport-car-service/bwi/
 */

import { SITE, ATL_HUB_PATH, AREAS, bySlug } from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { TERMINALS } from "../content/terminals.js";
import { HERO_IMG, glanceTiles, serviceNode, abs } from "./_kit.js";
import { fleetCards, googleReviews, eventCta } from "./_sections.js";

const airportPath = (key) => `/dc-airport-car-service/${key}/`;
const toStep = ([icon, title, text]) => ({ icon, title, text });

/* IAD-only "Popular Routes" rows — reuses the landing template's native route
   component (rideTable via the `routes` section). Each row links to the real
   destination area page and carries a Quote CTA that prefills Dulles (IAD) → the
   destination. Destinations come from the AREAS SSOT, so no travel times,
   distances, or prices are invented. bySlug throws on a typo → build fails fast. */
const iadRouteRows = (slugs) =>
  slugs.map((s) => {
    const a = bySlug(AREAS, s);
    return { path: a.path, label: `Dulles (IAD) to ${a.name}`, area: a.pickup };
  });

/* IAD-only "Choose Your Vehicle" section — reuses the homepage fleet cards
   (SITE.fleet order: Sedan, SUV, Sprinter, Stretch Limo, Minibus, Charter Bus)
   and the homepage .section-head / .fleet-grid design. `alt` keeps the page's
   alternating background rhythm. */
const iadFleetSection = (alt) => `
    <section class="section${alt ? " section--alt" : ""}" aria-labelledby="iad-fleet-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Choose Your Vehicle</span>
          <h2 id="iad-fleet-title">The Right Vehicle for Your IAD Transfer</h2>
          <p class="text-secondary">From a solo arrival to a full group, pick the class that fits your party and luggage — every Landio vehicle runs flight-tracked transfers between Dulles (IAD) and anywhere across Washington, DC, Maryland, and Northern Virginia.</p>
        </div>
        <ul class="fleet-grid">${fleetCards(SITE.fleet)}</ul>
      </div>
    </section>`;

function terminalPage(t) {
  const path = airportPath(t.key);
  const pickup = `${t.name} (${t.code})`;
  const arriveAct = { modal: { pickup }, cue: "Book this pickup" };
  const departAct = { modal: { dropoff: pickup }, cue: "Book a ride here" };

  // Other airports, for the "keep planning" links.
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
        h1Html: t.h1Html, // only IAD sets this (gold accent); others fall back to esc(h1)
        answerHtml: esc(t.answer),
        chips: t.chips,
        image: HERO_IMG,
        prefillPickup: pickup,
        formId: `${t.key}-quote`,
        formHeading: `Get Your ${t.code} Quote`,
        formLocation: path,
      }],

      ["trust", {
        id: `glance-${t.key}`,
        eyebrow: "At a Glance",
        h2: `${t.code} Airport Car Service at a Glance`,
        // IAD gets concise, balanced tile labels + an airport overview strip.
        // DCA/BWI keep the shared glanceTiles and render no overview.
        tiles: t.key === "iad"
          ? [
              { icon: "clock", text: "24/7, including holidays", act: arriveAct },
              { icon: "tag", text: "No surge pricing", act: arriveAct },
              { icon: "refresh", text: "Free cancellation up to 24h", act: { href: "/terms-of-service/#cancellation", cue: "Read the policy" } },
              { icon: "message", text: "Response within 1 hour", act: { href: "/contact/", cue: "Contact us" } },
              { icon: "userCheck", text: "Chauffeur details before pickup", act: arriveAct },
            ]
          : glanceTiles({ pickup }),
        factsLabel: "About Washington Dulles (IAD)",
        facts: t.key === "iad"
          ? [
              { icon: "pin", label: "Location", value: "Dulles, Virginia · west of Washington, DC" },
              { icon: "plane", label: "Terminals", value: "Main terminal + midfield concourses A–D" },
              { icon: "route", label: "Closest areas", value: "Reston, Ashburn, Tysons, Sterling & Leesburg" },
              { icon: "radar", label: "Landio coverage", value: "Flight-tracked transfers, 24/7 across the DMV" },
            ]
          : undefined,
      }],

      ["intro", {
        label: "Pickup and drop-off",
        eyebrow: "Pickup & Drop-off",
        // IAD gets a section-level H2 (and H3 column headings) to match the
        // homepage / At-a-Glance hierarchy; DCA/BWI keep the heading-less layout.
        h2: t.key === "iad" ? `Airport Pickup & Drop-off at ${t.code}` : undefined,
        h2Id: t.key === "iad" ? `pd-${t.key}` : undefined,
        colTitleTag: t.key === "iad" ? "h3" : undefined,
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
        // IAD drops the location/terminal sentence (now covered in the At-a-Glance
        // "About IAD" facts) to avoid duplication; DCA/BWI keep the original lede.
        ledeHtml: t.key === "iad"
          ? esc(`Follow a Landio transfer at IAD step by step — choose Arriving or Leaving to see exactly what happens and where you'll meet your chauffeur.`)
          : esc(`${t.name} (${t.code}) is ${t.where}. Here is how a transfer works, arriving or departing.`),
        tabsLabel: `${t.code} flow`,
        // IAD labels the callout "Good to know" (a complementary tip, not a
        // meeting-point restatement); DCA/BWI keep the default "Meeting point".
        tabs: [
          { label: `Arriving at ${t.code}`, title: `Meeting your chauffeur at ${t.code}`, point: t.arriving.point, act: arriveAct, pointCue: "Book this pickup", steps: t.arriving.steps.map(toStep), ...(t.key === "iad" ? { pointTitle: "Before you land", pointIcon: "message" } : {}) },
          { label: `Leaving from ${t.code}`, title: `Getting to ${t.code} for your flight`, point: t.departing.point, act: departAct, pointCue: "Book a ride here", steps: t.departing.steps.map(toStep), ...(t.key === "iad" ? { pointTitle: "Before your flight", pointIcon: "message" } : {}) },
        ],
        footHtml: "We confirm your exact meeting point when you book.",
      }],

      // IAD: the airport-specific Step-by-Step timeline above already covers the
      // flow, so instead of the generic "Three Steps to Your Ride" section
      // (kept on DCA/BWI) IAD shows a homepage-style "Choose Your Vehicle" fleet
      // followed by a "Why Choose Landio" benefits grid.
      ...(t.key === "iad"
        ? [
            ["html", { render: iadFleetSection }],
            ["why", {
              id: "why-iad",
              eyebrow: "Why Landio",
              h2: "Why Choose Landio for Dulles Airport Transfers?",
              lede: "The reasons DC-metro travelers rely on Landio for Dulles — from the first quote to the final drop-off.",
              items: [
                { icon: "radar", title: "Real-time flight tracking", text: "We watch your inbound flight and shift your pickup to your actual landing — early or delayed, we're there." },
                { icon: "userCheck", title: "Professional, vetted chauffeurs", text: "Experienced, background-checked drivers who know Dulles and every route across the DC metro." },
                { icon: "clock", title: "Punctual pickups", text: "Live tracking and built-in margin keep your car ready and waiting — not the other way around." },
                { icon: "tag", title: "One upfront price", text: "A flat quote confirmed before you book — no surge, no meter, no surprises at the curb." },
                { icon: "car", title: "Immaculate luxury fleet", text: "Sedans to charter buses, each late-model and meticulously maintained inside and out." },
                { icon: "pin", title: "Reliable, round-the-clock", text: "24/7 service to and from IAD across Washington, DC, Maryland, and Northern Virginia." },
              ],
            }],
            // Reuses the homepage Google Reviews renderer verbatim — only the
            // heading, id, and intro are IAD-specific. No reviews are invented;
            // the shared component shows the Google badge + "Read More Google
            // Reviews" CTA until genuine reviews are pasted into it.
            ["html", {
              render: (alt) => googleReviews({
                id: "reviews-iad",
                h2: "Trusted for Dulles Airport Transfers",
                lede: "Travelers to and from Washington Dulles (IAD) share their Landio Limo Services experience on Google. Read their reviews — and leave your own.",
                alt,
              }),
            }],
            // Popular Routes — reuses the landing template's native `routes`
            // section (tabbedRoutes/rideTable): a link to each destination's area
            // page plus a Quote CTA that prefills Dulles (IAD) → destination.
            ["routes", {
              id: "routes-iad",
              idBase: "routes-iad",
              eyebrow: "Popular Routes",
              h2: "Popular Routes from Dulles Airport",
              lede: "Our most-requested Dulles (IAD) transfers across the DC metro. Open a destination for details, or tap Quote to start a prefilled booking.",
              tabsLabel: "Dulles route groups",
              pickup,
              groups: [
                { label: "Northern Virginia", caption: "Dulles Airport car service across Northern Virginia", routes: iadRouteRows(["tysons", "reston", "ashburn", "leesburg", "mclean", "sterling", "fairfax", "arlington"]) },
                { label: "Washington, DC & Maryland", caption: "Dulles Airport car service to Washington, DC and Maryland", routes: iadRouteRows(["washington-dc", "bethesda", "potomac", "rockville", "gaithersburg", "germantown"]) },
              ],
              moreHtml: `See all <a href="/areas/">DC-metro areas we serve</a>.`,
            }],
          ]
        : [["steps", { prefillPickup: pickup }]]),

      ["faq", { heading: `${t.code} Airport Car Service FAQ`, eyebrow: "Good to Know" }],

      // Bottom flow. IAD gets a cleaned-up "Plan the Rest of Your Trip" (sibling
      // airports + airport services only — destination/route links now live in
      // the Popular Routes section above, so they're not duplicated here)
      // followed by a dedicated final booking CTA. DCA/BWI keep the original
      // links section unchanged.
      ...(t.key === "iad"
        ? [
            ["links", {
              id: "explore-iad",
              eyebrow: "Keep Exploring",
              h2: "Plan the Rest of Your Trip",
              lede: "The other airports we serve and the services that round out your Dulles transfer.",
              items: [
                { href: airportPath("dca"), icon: "plane", title: "DCA airport car service", text: "Reagan National — the closest airport to downtown DC.", cta: "View airport" },
                { href: airportPath("bwi"), icon: "plane", title: "BWI airport car service", text: "Baltimore/Washington — the Maryland and Baltimore corridor.", cta: "View airport" },
                { href: ATL_HUB_PATH, icon: "route", title: "DC Airport Car Service", text: "The full hub for IAD, DCA, and BWI transfers.", cta: "Open hub" },
                { href: "/private-jet-fbo-transfers/", icon: "plane", title: "Private jet & FBO transfers", text: "Flying private? Signature Dulles and the region's FBOs.", cta: "View FBOs" },
                { href: "/services/meet-and-greet/", icon: "sign", title: "Meet & greet service", text: "In-terminal greeting with a name sign and bag help.", cta: "How it works" },
              ],
            }],
            // Dedicated final booking CTA — reuses the homepage event-cta band
            // (same design + button styles, no new CSS). Primary button prefills
            // Dulles (IAD) as the pickup; the call block uses the verified phone.
            ["html", {
              render: () => eventCta({
                eyebrow: "Dulles Airport Transfers · 24/7",
                headingHtml: `Ready for Your <span class="gold">Dulles Airport</span> Transfer?`,
                lede: "Flight-tracked pickups, professional chauffeurs, and one upfront price. Book your Washington Dulles (IAD) ride in minutes — or call us any hour for immediate help.",
                ctaLabel: "Book Your IAD Ride",
                prefillPickup: pickup,
                callLabel: "Call for immediate assistance",
              }),
            }],
          ]
        : [
            ["links", {
              id: `explore-${t.key}`,
              eyebrow: "Keep Planning",
              h2: "Plan the Rest of Your Trip",
              items: [
                { href: ATL_HUB_PATH, icon: "plane", title: "DC Airport Car Service", text: "The full airport hub: IAD, DCA, BWI, and booking.", cta: "Open hub" },
                ...others.map((o) => ({ href: airportPath(o.key), icon: "plane", title: `${o.code} airport car service`, text: o.summary, cta: "View airport" })),
                { href: "/fleet/", icon: "car", title: "Our fleet", text: "Sedan, SUV, Sprinter Van, Minibus, and Charter Bus.", cta: "View fleet" },
                { href: "/private-jet-fbo-transfers/", icon: "plane", title: "Private jet & FBO transfers", text: "Flying private? Signature and the region's FBOs.", cta: "View FBOs" },
                { href: "/reservations/", icon: "calendar", title: "Reserve your ride", text: "Book your airport pickup online.", cta: "Reserve" },
              ],
            }],
          ]),

      ["contact"],
    ],
  });
}

export function terminalPages() {
  return Object.values(TERMINALS).map(terminalPage);
}

// Keep SITE referenced for future per-airport customization.
void SITE;
