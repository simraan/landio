/**
 * ATL hub — /atlanta-airport-car-service/ (Page 1, docs/SEO-PLAN.md §5).
 * First user of the shared landing template (templates/landing.js).
 *
 * This file holds CONTENT only; landingPage() owns structure, schema assembly,
 * and backgrounds. Every business fact (hours, capacities, amenities, pricing,
 * cancellation, response time, phone, permit, chauffeur details) is read from
 * src/config.js. Third-party facts (terminal pickup points, ATL's permit rule,
 * 2025 passenger count) are logged with sources in docs/FACTS.md.
 */

import {
  SITE,
  PHONE,
  ATL_HUB_PATH,
  PRIMARY_AIRPORT_PICKUP,
  ATL_TERMINALS,
  PRICING,
  CANCELLATION,
  CAPACITY,
  paxLabel,
  DEFAULT_SITE_URL,
} from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { ROUTE_LIST } from "./routes.js";
import { AREAS } from "../config.js";

// Metro "ATL → area" rows now point at the /areas/ pages (the legacy metro
// route pages were migrated to Areas in wave 1). Long-distance stays on ROUTE_LIST.
const AREA_ROWS = AREAS.map((a) => ({ kind: "metro", area: a.pickup, label: `ATL to ${a.name}`, path: a.path }));

const ATL = SITE.airports[0];
const SRC_ATL_GT = "https://www.atl.com/ground-transportation/";
const SRC_PAX = "https://www.travelagentcentral.com/transportation/atlanta-retains-worlds-busiest-airport-crown";
const ext = (href, text) => `<a href="${esc(href)}" rel="noopener" target="_blank">${esc(text)}</a>`;
const tel = () => `<a href="tel:${esc(PHONE.e164)}">${esc(PHONE.display)}</a>`;
const fleet = (key) => SITE.fleet.find((v) => v.key === key);
const SEDAN = fleet("sedan");
const SUV = fleet("suv");
const SPRINTER = fleet("sprinter");
const vehicleSpec = (v) => `${v.name}: ${v.pax}${v.bags ? `, ${v.bags} bags` : ""}`;

/* FAQ — the SAME list renders the visible FAQ and the FAQPage schema.
 * Answers ≤ 60 words, each starting with the answer. */
const FAQS = [
  {
    q: "How do I book a car service to ATL?",
    a: `Book online with the quote form on this page or call ${PHONE.display}. Enter your pickup address, flight details, and passenger count. ${SITE.responsePromise} ATL requires limousine service to be arranged in advance, so book before you travel.`,
  },
  ...(SITE.atlPermitConfirmed
    ? [{
        q: "Are you permitted to pick up at Atlanta airport?",
        a: "Yes. A-Town Limo holds the ATL Ground Transportation permit. ATL allows only permitted limousine companies to pick up passengers at the airport, so your chauffeur can meet you inside the terminal or at the designated curb.",
      }]
    : []),
  {
    q: "Where does my chauffeur meet me at ATL?",
    a: "It depends on your terminal. At the Domestic Terminal, your chauffeur meets you inside near the atrium or curbside on the South lower level. At the International Terminal, it's inside at the Arrivals level or on the Arrival outer curb. We confirm your meeting point when you book.",
  },
  {
    q: "What happens if my flight is delayed?",
    a: "Your pickup moves with your flight. We track your arrival and adjust the pickup to your actual landing time, and there is no charge for flight delays. Share your airline and flight number when you book.",
  },
  {
    q: "How long will my chauffeur wait at the airport?",
    a: "A complimentary grace period is included with every airport pickup. If you need longer, tell your chauffeur or our dispatch team; additional waiting time may be charged under our Terms of Service.",
  },
  { q: "What is your cancellation policy?", a: CANCELLATION.full },
  {
    q: "Which vehicle fits my group and luggage?",
    a: `${vehicleSpec(SEDAN)}. ${vehicleSpec(SUV)}. ${vehicleSpec(SPRINTER)}. Choose by group size first, then by luggage.`,
  },
  {
    q: "Do you run airport transfers 24/7?",
    a: `Yes. A-Town Limo runs ATL airport transfers ${SITE.hours}, from early-morning departures to late-night arrivals.`,
  },
  {
    q: "How is the price of an airport ride set?",
    a: `Every trip is quoted before you book. ${PRICING.surge}. The price depends on ${PRICING.factors.slice(0, -1).join(", ")}, and ${PRICING.factors.at(-1)}.`,
  },
];

/* Pickup timeline (identical steps 1/3/4 per terminal; step 2 = ATL's wording). */
const step = (icon, title, text) => ({ icon, title, text });
const terminalTab = (label, point, term) => ({
  label: `${label} Terminal`,
  title: `${label} Terminal pickup`,
  point,
  // Every step + the meeting-point box opens the quote with this terminal as the
  // pickup; once the terminal page exists, build.js turns them into links to it.
  act: { modal: { pickup: term.pickup }, cue: "Book this pickup" },
  pointCue: "Book this pickup",
  future: term.page,
  futureCue: `${label} Terminal guide`,
  steps: [
    step("radar", "We track your flight", "Your pickup moves with your actual landing time."),
    step("sign", "Meet your chauffeur", "Your chauffeur waits with a name sign."),
    step("luggage", "Luggage help", "Your chauffeur helps with your bags."),
    step("car", "Escort to the car", "They walk you to your vehicle."),
  ],
  linksHtml: `Read how <a href="/services/meet-and-greet/">meet &amp; greet at ATL</a> works.`,
});

export function airport() {
  const origin = DEFAULT_SITE_URL.replace(/\/+$/, "");
  const url = `${origin}${ATL_HUB_PATH}`;
  const description = `Chauffeured car service to and from Atlanta airport (ATL). Flight tracking, meet & greet, sedans, SUVs and Sprinter vans 24/7. Call ${PHONE.local}.`;

  return landingPage({
    path: ATL_HUB_PATH,
    title: "Atlanta Airport Car Service (ATL)",
    titleFull: "Atlanta Airport Car Service (ATL) | A-Town Limo",
    description,
    summary:
      "Hub for car service to and from Hartsfield-Jackson (ATL): terminal pickup points, vehicles and capacities, popular routes, booking, and FAQ.",
    bodyClass: "page-airport page-atl-hub",
    cluster: "airport",
    hub: true,
    card: { title: "Atlanta Airport Car Service (ATL)", text: "Rides to and from Hartsfield-Jackson with flight tracking and meet & greet.", icon: "plane" },
    defaultPickup: PRIMARY_AIRPORT_PICKUP,
    trail: [
      { name: "Home", path: "/" },
      { name: "Atlanta Airport Car Service", path: ATL_HUB_PATH },
    ],
    faqs: FAQS,
    graph: [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Atlanta Airport Car Service (ATL)",
        serviceType: "Airport transfer",
        url,
        description,
        provider: { "@id": `${origin}/#business` },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Metro Atlanta",
          containedInPlace: { "@type": "State", name: "Georgia" },
        },
      },
      { "@type": "Airport", "@id": `${url}#airport`, name: ATL.name, iataCode: ATL.code },
    ],
    sections: [
      ["hero", {
        eyebrow: "ATL Airport Transfers · 24/7",
        h1: `Atlanta Airport Car Service (${ATL.code})`,
        answerHtml: `A-Town Limo provides chauffeured car service to and from ${esc(ATL.name)} (${esc(ATL.code)}), ${esc(SITE.hours)} — book online or call ${tel()}.`,
        chips: [
          { icon: "radar", text: "Real-time flight tracking" },
          { icon: "sign", text: "Meet & greet inside the terminal" },
          SITE.atlPermitConfirmed
            ? { icon: "shield", text: "ATL-permitted" }
            : { icon: "car", text: "Sedans, SUVs & Sprinter vans" },
        ],
        image: {
          base: "/assets/img/hero/hamptons-hero",
          widths: [640, 1024, 1500],
          width: 1500,
          height: 844,
          alt: "Aura Hamptons chauffeured car at a Hamptons estate",
        },
        prefillPickup: PRIMARY_AIRPORT_PICKUP,
        formId: "atl-quote",
        formHeading: "Get Your ATL Quote",
        formLocation: ATL_HUB_PATH,
      }],

      ["trust", {
        id: "glance-title",
        eyebrow: "At a Glance",
        h2: "Atlanta Airport Car Service at a Glance",
        tiles: [
          { icon: "clock", text: SITE.hours, act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
          { icon: "tag", text: PRICING.surge, act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
          { icon: "refresh", text: CANCELLATION.short, act: { href: "/terms-of-service/#cancellation", cue: "Read the policy" } },
          { icon: "message", text: SITE.responseShort, act: { href: "/contact/", cue: "Contact us" } },
          SITE.chauffeurDetailsBeforePickup
            ? { icon: "userCheck", text: SITE.chauffeurDetailsLine, act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } }
            : { icon: "wifi", text: "Complimentary Wi-Fi", act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
        ],
      }],

      ["intro", {
        label: "About the service",
        eyebrow: "About the Service",
        sourcesHtml: `Sources: ${ext(SRC_ATL_GT, "ATL Ground Transportation")} (limousine service must be arranged in advance).`,
        cols: [
          {
            id: "to-atl-title",
            icon: "plane",
            h2: "Car Service to ATL",
            act: { modal: { pickup: "", dropoff: PRIMARY_AIRPORT_PICKUP } },
            cue: "Book a ride to ATL",
            html: `<p>Need a ride to Atlanta airport? Your chauffeur picks you up at home, the office, or your hotel anywhere in metro Atlanta and drops you at your terminal's departures curb. ATL requires limousine service to be arranged in advance, so book before travel day.</p>`,
          },
          {
            id: "from-atl-title",
            icon: "radar",
            h2: "Rides From Atlanta Airport",
            act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } },
            cue: "Book a pickup from ATL",
            html: `<p>For a ride from ATL, share your flight number and we track it. The pickup moves with your landing time, there is no charge for flight delays, and a complimentary grace period gives you time to collect your bags.</p>`,
          },
        ],
      }],

      ["fleet", {
        id: "vehicle-title",
        eyebrow: "Our Fleet",
        h2: "Choose Your Vehicle",
        lede: "Pick your group size and bags to see the vehicle that fits.",
        bands: [
          { label: "1–3", max: 3 },
          { label: "4", max: 4 },
          { label: "5–6", max: 6 },
          { label: "7–14", max: 14 },
        ],
        prefillPickup: PRIMARY_AIRPORT_PICKUP,
        moreHtml: `Want more detail? <a href="/fleet/">Compare the full fleet</a>.`,
      }],

      ["timeline", {
        id: "terminals-title",
        idBase: "terminal",
        eyebrow: "Where You're Met",
        h2: "ATL Pickup: Domestic & International Terminals",
        ledeHtml: `ATL handled 106.3 million passengers in 2025, the world's busiest airport (${ext(SRC_PAX, "Travel Agent Central")}).${SITE.atlPermitConfirmed ? " Only permitted companies may pick up there, and A-Town Limo holds the ATL Ground Transportation permit." : ""}`,
        tabsLabel: "ATL terminals",
        tabs: [
          terminalTab("Domestic", "Inside the terminal near the atrium, or curbside on the South lower level", ATL_TERMINALS.domestic),
          terminalTab("International", "Inside the terminal at the Arrivals level, or outside on the Arrival outer curb", ATL_TERMINALS.international),
        ],
        footHtml: `Source: ${ext(SRC_ATL_GT, "ATL Ground Transportation")}. We confirm your meeting point when you book.`,
      }],

      ["steps", { prefillPickup: PRIMARY_AIRPORT_PICKUP }],

      ["routes", {
        id: "rides-title",
        idBase: "routes",
        eyebrow: "Popular Routes",
        h2: "Popular Rides To and From ATL",
        lede: "Open a route for details, or tap Quote to start a prefilled booking.",
        tabsLabel: "Route groups",
        pickup: PRIMARY_AIRPORT_PICKUP,
        groups: [
          { label: "Metro Atlanta", caption: "Car service between ATL and metro Atlanta areas", routes: AREA_ROWS },
          { label: "Long-Distance", caption: "Long-distance rides from Atlanta", routes: ROUTE_LIST.filter((r) => r.kind === "longhaul") },
        ],
        moreHtml: `See all <a href="/areas/">Atlanta areas we serve</a> and <a href="/routes/">long-distance routes</a>.`,
      }],

      ["why", {
        id: "why-title",
        eyebrow: "Why Travelers Choose A-Town",
        h2: "An ATL Transfer That Runs on Your Schedule",
        items: [
          { icon: "radar", title: "Real-time flight tracking", text: "Your pickup moves with your actual landing time.", act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
          { icon: "sign", title: "Meet & greet inside the terminal", text: "Your chauffeur waits with a name sign and helps with your luggage.", act: { href: "/services/meet-and-greet/", cue: "How meet & greet works" } },
          { icon: "tag", title: PRICING.surge, text: "Every trip is quoted before you book, day or night.", act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
          { icon: "clock", title: "24/7, holidays included", text: `Dispatch runs around the clock. ${SITE.responsePromise}`, act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
          { icon: "wifi", title: "Complimentary Wi-Fi", text: "Stay connected on the way, plus a complimentary grace period after you land.", act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
          { icon: "route", title: "Your trip, your way", text: "Request a specific chauffeur, subject to availability. Unplanned stops are allowed and may affect your fare.", act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
        ],
      }],

      ["links", {
        id: "services-title",
        eyebrow: "More Services",
        h2: "Services for Every ATL Trip",
        items: [
          { href: "/services/meet-and-greet/", icon: "sign", title: "Meet & greet at ATL", text: "Inside-terminal greeting with a name sign and luggage help." },
          { href: "/services/corporate-executive/", icon: "briefcase", title: "Corporate car service to ATL", text: "Discreet, punctual rides for executives and client visits." },
          { href: "/services/group-transfers/", icon: "van", title: "Group rides from ATL", text: `The ${SPRINTER.name} seats ${paxLabel(CAPACITY.sprinter)} with luggage.` },
          { href: "/private-jet-fbo-transfers/", icon: "plane", title: "Private jet & FBO transfers", text: "Transfers to Atlanta-area FBOs, including PDK (DeKalb-Peachtree) and FTY." },
          { href: "/services/hourly-chauffeur/", icon: "hourglass", title: "Hourly chauffeur", text: "Keep a car and chauffeur for meetings or multiple stops." },
        ],
      }],

      ["kbyb", { pickup: PRIMARY_AIRPORT_PICKUP }],

      ["faq", { heading: "Atlanta Airport Car Service FAQ", eyebrow: "Good to Know" }],

      ["links", {
        id: "explore-title",
        eyebrow: "Explore More",
        h2: "Plan the Rest of Your Trip",
        items: [
          { href: "/fleet/", icon: "car", title: "Our fleet", text: "All three vehicles in detail.", cta: "View fleet" },
          { href: "/routes/", icon: "route", title: "All Atlanta car service routes", text: "Metro and long-distance routes.", cta: "See routes" },
          { href: "/reservations/", icon: "calendar", title: "Reserve your ride online", text: "The full booking page.", cta: "Reserve" },
          { href: "/services/", icon: "grid", title: "All chauffeured services", text: "Every service we run.", cta: "View services" },
          { href: "/contact/", icon: "message", title: "Contact our dispatch team", text: "Questions before you book?", cta: "Contact us" },
          // Future pages (docs/LINK-TODO.md) — shown automatically once built.
          { href: "/atlanta-airport-car-service/domestic-terminal/", requires: "/atlanta-airport-car-service/domestic-terminal/", icon: "plane", title: "ATL Domestic Terminal pickup", text: "Where to meet your chauffeur at the Domestic Terminal." },
          { href: "/atlanta-airport-car-service/international-terminal/", requires: "/atlanta-airport-car-service/international-terminal/", icon: "plane", title: "ATL International Terminal car service", text: "Pickup after customs at the International Terminal." },
          { href: "/atl-airport-guide/", requires: "/atl-airport-guide/", icon: "pin", title: "ATL airport guide", text: "Terminals, timing, and getting around ATL." },
          { href: "/atl-airport-guide/is-atl-easy-to-navigate/", requires: "/atl-airport-guide/is-atl-easy-to-navigate/", icon: "pin", title: "Is ATL easy to navigate?", text: "Two terminals, seven concourses, one Plane Train." },
          { href: "/atl-airport-guide/terminal-map-plane-train/", requires: "/atl-airport-guide/terminal-map-plane-train/", icon: "route", title: "ATL terminal map & Plane Train", text: "How the terminals and concourses connect." },
          { href: "/areas/", requires: "/areas/", icon: "pin", title: "Atlanta areas we serve", text: "Car service across metro Atlanta." },
          { href: "/private-jet-fbo-transfers/pdk-dekalb-peachtree/", requires: "/private-jet-fbo-transfers/pdk-dekalb-peachtree/", icon: "plane", title: "PDK private jet car service", text: "Transfers at DeKalb-Peachtree Airport." },
        ],
      }],

      ["contact"],
    ],
  });
}
