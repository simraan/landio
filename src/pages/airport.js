/**
 * DC Airport Car Service hub — /dc-airport-car-service/.
 *
 * Overview of chauffeured transfers across all three DC-area airports (IAD,
 * DCA, BWI), each linking to its own airport page. Content only; landingPage()
 * owns structure and schema. Business facts come from config.js.
 */

import {
  SITE,
  PHONE,
  ATL_HUB_PATH,
  PRIMARY_AIRPORT_PICKUP,
  PRICING,
  CANCELLATION,
  CAPACITY,
  paxLabel,
  DEFAULT_SITE_URL,
  AREAS,
} from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { TERMINALS } from "../content/terminals.js";

const AIRPORT_PATH = (key) => `/dc-airport-car-service/${key}/`;
const AREA_ROWS = AREAS.slice(0, 12).map((a) => ({ kind: "metro", area: a.pickup, label: `Airport to ${a.name}`, path: a.path }));

const tel = () => `<a href="tel:${esc(PHONE.e164)}">${esc(PHONE.display)}</a>`;
const fleet = (key) => SITE.fleet.find((v) => v.key === key);
const SEDAN = fleet("sedan");
const SUV = fleet("suv");
const SPRINTER = fleet("sprinter");
const vehicleSpec = (v) => `${v.name}: ${v.pax}${v.bags ? `, ${v.bags} bags` : ""}`;

const FAQS = [
  {
    q: "Which DC-area airports do you serve?",
    a: `Landio serves all three DC-area airports — Washington Dulles (IAD), Ronald Reagan Washington National (DCA), and Baltimore/Washington (BWI) — with transfers to and from Washington, DC, Maryland, and Northern Virginia.`,
  },
  {
    q: "How do I book a DC airport car service?",
    a: `Book online with the quote form on this page or call ${PHONE.display}. Enter your pickup address, flight details, and passenger count. ${SITE.responsePromise}`,
  },
  {
    q: "Where does my chauffeur meet me at the airport?",
    a: "At baggage claim with a personalized name sign, or at the arrivals curb — whichever you prefer. Meet & greet inside the terminal is available on request. We confirm your meeting point when you book.",
  },
  {
    q: "What happens if my flight is delayed?",
    a: "Your pickup moves with your flight. We track your arrival and adjust the pickup to your actual landing time, with no charge for flight delays. Share your airline and flight number when you book.",
  },
  {
    q: "How long will my chauffeur wait at the airport?",
    a: "A complimentary grace period is included with every airport pickup. If you need longer, tell your chauffeur or our dispatch team; additional waiting time may be charged under our Terms of Service.",
  },
  { q: "What is your cancellation policy?", a: CANCELLATION.full },
  {
    q: "Which vehicle fits my group and luggage?",
    a: `${vehicleSpec(SEDAN)}. ${vehicleSpec(SUV)}. ${vehicleSpec(SPRINTER)}. We also run mini buses and charter buses for larger groups. Choose by group size first, then luggage.`,
  },
  {
    q: "Do you run airport transfers 24/7?",
    a: `Yes. Landio runs IAD, DCA, and BWI airport transfers ${SITE.hours}, from early-morning departures to late-night arrivals.`,
  },
  {
    q: "How is the price of an airport ride set?",
    a: `Every trip is quoted before you book. ${PRICING.surge}. The price depends on ${PRICING.factors.slice(0, -1).join(", ")}, and ${PRICING.factors.at(-1)}.`,
  },
];

export function airport() {
  const origin = DEFAULT_SITE_URL.replace(/\/+$/, "");
  const url = `${origin}${ATL_HUB_PATH}`;
  const description = `Chauffeured car service to and from the DC-area airports — Dulles (IAD), Reagan National (DCA), and BWI. Flight tracking, meet & greet, 24/7. Call ${PHONE.local}.`;

  return landingPage({
    path: ATL_HUB_PATH,
    title: "DC Airport Car Service (IAD, DCA & BWI)",
    titleFull: "DC Airport Car Service (IAD, DCA & BWI) | Landio Limo Services",
    description,
    summary:
      "Hub for car service to and from the DC-area airports — IAD, DCA, and BWI — with per-airport pickup pages, vehicles, popular routes, and booking.",
    bodyClass: "page-airport page-dc-hub",
    cluster: "airport",
    hub: true,
    card: { title: "DC Airport Car Service", text: "Rides to and from IAD, DCA & BWI with flight tracking and meet & greet.", icon: "plane" },
    defaultPickup: PRIMARY_AIRPORT_PICKUP,
    trail: [
      { name: "Home", path: "/" },
      { name: "DC Airport Car Service", path: ATL_HUB_PATH },
    ],
    faqs: FAQS,
    graph: [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "DC Airport Car Service",
        serviceType: "Airport transfer",
        url,
        description,
        provider: { "@id": `${origin}/#business` },
        areaServed: { "@type": "AdministrativeArea", name: "Washington, DC metropolitan area" },
      },
      ...SITE.airports.map((a) => ({ "@type": "Airport", name: a.name, iataCode: a.code })),
    ],
    sections: [
      ["hero", {
        eyebrow: "DC Airport Transfers · 24/7",
        h1: "DC Airport Car Service",
        answerHtml: `Landio Limo Services provides chauffeured car service to and from all three DC-area airports — Dulles (IAD), Reagan National (DCA), and BWI — ${esc(SITE.hours)}. Book online or call ${tel()}.`,
        chips: [
          { icon: "radar", text: "Real-time flight tracking" },
          { icon: "sign", text: "Meet & greet available" },
          { icon: "tag", text: "No surge pricing" },
        ],
        image: {
          base: "/assets/img/hero/hamptons-hero",
          widths: [640, 1024, 1500],
          width: 1500,
          height: 844,
          alt: "Landio chauffeured car for DC-area airport transfers",
        },
        prefillPickup: PRIMARY_AIRPORT_PICKUP,
        formId: "dc-airport-quote",
        formHeading: "Get Your Airport Quote",
        formLocation: ATL_HUB_PATH,
      }],

      ["trust", {
        id: "glance-title",
        eyebrow: "At a Glance",
        h2: "DC Airport Car Service at a Glance",
        tiles: [
          { icon: "clock", text: SITE.hours, act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
          { icon: "tag", text: PRICING.surge, act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
          { icon: "refresh", text: CANCELLATION.short, act: { href: "/terms-of-service/#cancellation", cue: "Read the policy" } },
          { icon: "message", text: SITE.responseShort, act: { href: "/contact/", cue: "Contact us" } },
          { icon: "userCheck", text: SITE.chauffeurDetailsLine, act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } } },
        ],
      }],

      ["links", {
        id: "airports-title",
        eyebrow: "Three Airports",
        h2: "Car Service at Every DC-Area Airport",
        lede: "Pick your airport for pickup points, how arrivals and departures work, and booking.",
        items: Object.values(TERMINALS).map((t) => ({
          href: AIRPORT_PATH(t.key),
          icon: "plane",
          title: `${t.code} airport car service`,
          text: `${t.name} — flight-tracked transfers, meet & greet, 24/7.`,
          cta: "View airport",
        })),
      }],

      ["intro", {
        label: "About the service",
        eyebrow: "About the Service",
        cols: [
          {
            id: "to-airport-title",
            icon: "plane",
            h2: "Car Service to the Airport",
            act: { modal: { pickup: "", dropoff: PRIMARY_AIRPORT_PICKUP } },
            cue: "Book a ride to the airport",
            html: `<p>Need a ride to Dulles, Reagan National, or BWI? Your chauffeur picks you up at home, the office, or your hotel anywhere in the DC metro and drops you at your terminal's departures level, timed so you are never rushed.</p>`,
          },
          {
            id: "from-airport-title",
            icon: "radar",
            h2: "Rides From the Airport",
            act: { modal: { pickup: PRIMARY_AIRPORT_PICKUP } },
            cue: "Book an airport pickup",
            html: `<p>For a ride from the airport, share your flight number and we track it. The pickup moves with your landing time, there is no charge for flight delays, and a complimentary grace period gives you time to collect your bags.</p>`,
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

      ["steps", { prefillPickup: PRIMARY_AIRPORT_PICKUP }],

      ["routes", {
        id: "rides-title",
        idBase: "routes",
        eyebrow: "Popular Routes",
        h2: "Popular Airport Rides Across the DC Metro",
        lede: "Open an area for details, or tap Quote to start a prefilled booking.",
        tabsLabel: "Route groups",
        pickup: PRIMARY_AIRPORT_PICKUP,
        groups: [
          { label: "DC Metro", caption: "Airport transfers across the DC metro", routes: AREA_ROWS },
        ],
        moreHtml: `See all <a href="/areas/">DC-metro areas we serve</a>.`,
      }],

      ["why", {
        id: "why-title",
        eyebrow: "Why Travelers Choose Landio",
        h2: "An Airport Transfer That Runs on Your Schedule",
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
        h2: "Services for Every Airport Trip",
        items: [
          { href: "/services/meet-and-greet/", icon: "sign", title: "Meet & greet", text: "Inside-terminal greeting with a name sign and luggage help." },
          { href: "/services/corporate-executive/", icon: "briefcase", title: "Corporate airport transfers", text: "Discreet, punctual rides for executives and client visits." },
          { href: "/services/group-transfers/", icon: "van", title: "Group airport transfers", text: `The ${SPRINTER.name} seats ${paxLabel(CAPACITY.sprinter)} with luggage.` },
          { href: "/private-jet-fbo-transfers/", icon: "plane", title: "Private jet & FBO transfers", text: "Signature at IAD, DCA, BWI, plus the region's executive airports." },
          { href: "/services/hourly-chauffeur/", icon: "calendar", title: "Hourly chauffeur", text: "Keep a car and chauffeur for meetings or multiple stops." },
        ],
      }],

      ["kbyb", { pickup: PRIMARY_AIRPORT_PICKUP }],

      ["faq", { heading: "DC Airport Car Service FAQ", eyebrow: "Good to Know" }],

      ["links", {
        id: "explore-title",
        eyebrow: "Explore More",
        h2: "Plan the Rest of Your Trip",
        items: [
          { href: AIRPORT_PATH("iad"), icon: "plane", title: "IAD (Dulles) car service", text: "Pickup points and booking at Dulles.", cta: "Open IAD" },
          { href: AIRPORT_PATH("dca"), icon: "plane", title: "DCA (Reagan National) car service", text: "Pickup points and booking at Reagan National.", cta: "Open DCA" },
          { href: AIRPORT_PATH("bwi"), icon: "plane", title: "BWI car service", text: "Pickup points and booking at BWI.", cta: "Open BWI" },
          { href: "/fleet/", icon: "car", title: "Our fleet", text: "Every vehicle class in detail.", cta: "View fleet" },
          { href: "/areas/", icon: "pin", title: "DC-metro areas we serve", text: "Car service across DC, Maryland, and Virginia.", cta: "View areas" },
          { href: "/reservations/", icon: "calendar", title: "Reserve your ride online", text: "The full booking page.", cta: "Reserve" },
        ],
      }],

      ["contact"],
    ],
  });
}
