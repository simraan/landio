/**
 * DC airport & travel guides — hub + guide pages. Self-contained editorial
 * content on the plain landing template.
 *
 *   /dc-airport-guide/            (hub)
 *   /dc-airport-guide/<slug>/     (one per config GUIDES entry)
 */

import { HUBS, GUIDES, SITE, PHONE } from "../config.js";
import { landingPage } from "../templates/landing.js";
import { HERO_IMG, collectionNode } from "./_kit.js";

const HUB_PATH = HUBS.guides.path; // /dc-airport-guide/

const p = (t) => `<p class="text-secondary">${t}</p>`;
const prose = (parts) => () => `
    <section class="section">
      <div class="container prose-wide">
        ${parts.join("\n        ")}
      </div>
    </section>`;

const G = {
  "getting-to-from-dc-airports": {
    summary: "Which DC-area airport to use — Dulles (IAD), Reagan National (DCA), or BWI — and how a chauffeured transfer works to and from each.",
    description: `A guide to the three DC-area airports — Dulles (IAD), Reagan National (DCA), and BWI — and how chauffeured airport transfers work across the DC metro. Call ${PHONE.local}.`,
    h1: "Getting To & From the DC Airports",
    eyebrow: "Airport Guide",
    body: [
      p("The Washington, DC metro is served by three major airports, and which one you use shapes your whole trip. <strong>Ronald Reagan Washington National (DCA)</strong> sits on the Potomac just minutes from downtown DC, Arlington, and Alexandria — the most convenient for travel into the District, and mostly domestic service. <strong>Washington Dulles International (IAD)</strong>, in the western Virginia suburbs, handles most international flights and a wide domestic network, and is closest to the Dulles corridor — Reston, Ashburn, and Tysons. <strong>Baltimore/Washington (BWI)</strong>, in Maryland between the two cities, often offers value fares and is most convenient for Baltimore, Annapolis, and the northern Maryland suburbs."),
      p("Whichever you fly, a chauffeured transfer removes the two hardest parts of airport travel: parking and timing. For arrivals, Landio tracks your flight in real time, so your pickup moves with your actual landing — early or delayed — with no charge for the delay. Your chauffeur meets you at baggage claim with a name sign or at the arrivals curb, helps with your luggage, and drives you door to door."),
      p("For departures, your chauffeur picks you up at home, the office, or your hotel and drops you at the departures level with margin to spare. Meet &amp; greet inside the terminal is available on request, and every trip is quoted up front with no surge pricing."),
    ],
    related: ["iad", "dca", "bwi"],
  },
  "private-aviation-fbo-guide": {
    summary: "The DC area's private-aviation terminals and FBOs — Signature at IAD, DCA & BWI, plus Manassas, Leesburg, Montgomery County Airpark, and Frederick — and how crew-coordinated transfers work.",
    description: `A guide to the DC area's private-jet terminals and FBOs and how crew-coordinated chauffeured transfers work. Call ${PHONE.local}.`,
    h1: "DC Private Aviation & FBO Guide",
    eyebrow: "Private Aviation",
    body: [
      p("Flying private in the DC area means choosing the field that best fits your destination. <strong>Signature Aviation</strong> operates private-aviation terminals at all three commercial airports — Dulles (IAD), Reagan National (DCA), and BWI — handy when your trip pairs a private leg with the city or a connecting flight. For general and business aviation, the region's executive airports include <strong>Manassas Regional (HEF)</strong> and <strong>Leesburg Executive (JYO)</strong> in Northern Virginia, and <strong>Montgomery County Airpark (GAI)</strong> and <strong>Frederick Municipal (FDK)</strong> in Maryland."),
      p("Private aviation runs on precise timing, so a chauffeured transfer is coordinated with your flight crew. Your chauffeur meets you at the FBO on the field — not a crowded public terminal — with the car in position when your aircraft arrives, or ahead of your departure. Share your FBO and timing when you book and we handle the coordination."),
      p("For VIP passengers, discretion and presentation matter: professional chauffeurs, an immaculate vehicle, and quiet handling of the luggage and logistics. Travel in an Executive Sedan or SUV, or move a group in a Sprinter van."),
    ],
    related: [],
  },
  "corporate-travel-dc": {
    summary: "How corporate and executive travel works in the DC metro — accounts, roadshows, diplomatic service, and group transport across DC, Maryland, and Virginia.",
    description: `A guide to corporate and executive chauffeured travel across the DC metro — accounts, roadshows, and group transport. Call ${PHONE.local}.`,
    h1: "Corporate Travel in the DC Metro",
    eyebrow: "Corporate",
    body: [
      p("Washington, DC runs on meetings — with the federal government, the diplomatic corps, trade associations, and a dense corporate base across Northern Virginia and Maryland. For executives and visiting teams, chauffeured travel has to be reliable, discreet, and punctual, every time."),
      p("Landio provides professional chauffeur service for board meetings, client visits, investor roadshows, and daily executive travel across the DC metro. We coordinate multi-stop days, airport connections, and corporate accounts with centralized billing, and we handle protocol-aware diplomatic transportation for embassies and missions. Travel in an Executive Sedan or Executive SUV, or move a team together in a Sprinter van, with Wi-Fi and a quiet environment to work on the way."),
      p(`For regular travel, a corporate account adds centralized billing and priority dispatch. To set one up, use the booking form or call ${PHONE.display}.`),
    ],
    related: [],
  },
};

const airportLink = (code) => ({ href: `/dc-airport-car-service/${code}/`, icon: "plane", title: `${code.toUpperCase()} airport car service`, text: `Pickup points and booking at ${code.toUpperCase()}.`, cta: "View airport" });

/* -------------------------------- Hub ---------------------------------- */
export function guidesHub() {
  const items = GUIDES.map((g) => ({ name: g.name, path: g.path }));
  return landingPage({
    path: HUB_PATH,
    title: "DC Airport & Travel Guides",
    titleFull: "DC Airport & Travel Guides | Landio Limo Services",
    description: "Guides to the DC-area airports, private aviation, and corporate travel across Washington, DC, Maryland, and Northern Virginia.",
    summary: "Practical guides to the DC-area airports, private aviation and FBOs, and corporate travel across the DC metro.",
    bodyClass: "page-guides-hub",
    cluster: "guides",
    hub: true,
    card: { title: "DC airport & travel guides", text: "The DC airports, private aviation, and corporate travel.", icon: "pin" },
    trail: [{ name: "Home", path: "/" }, { name: "DC Airport Guide", path: HUB_PATH }],
    graph: [collectionNode({ path: HUB_PATH, name: "DC Airport & Travel Guides", description: "Guides to DC-area travel.", items })],
    sections: [
      ["hero", {
        eyebrow: "Guides",
        h1: "DC Airport & Travel Guides",
        answerHtml: "Practical guides to the DC-area airports, private aviation, and corporate travel across Washington, DC, Maryland, and Northern Virginia.",
        chips: [{ icon: "pin", text: "IAD · DCA · BWI" }, { icon: "plane", text: "Private aviation" }, { icon: "briefcase", text: "Corporate" }],
        image: HERO_IMG,
        form: false,
      }],
      ["links", {
        id: "guides-list",
        eyebrow: "Guides",
        h2: "Read Our Guides",
        lede: "Everything you need to plan a trip across the DC metro.",
        items: GUIDES.map((g) => ({ href: g.path, icon: "pin", title: g.name, text: G[g.slug].summary, cta: "Read the guide" })),
      }],
      ["contact"],
    ],
  });
}

/* ----------------------------- Guide pages ----------------------------- */
function guidePage(g) {
  const c = G[g.slug];
  const others = GUIDES.filter((x) => x.slug !== g.slug).map((x) => ({ href: x.path, icon: "pin", title: x.name, text: G[x.slug].summary, cta: "Read the guide" }));
  const related = [...(c.related || []).map(airportLink), ...others,
    { href: "/dc-airport-car-service/", icon: "plane", title: "DC airport car service", text: "The full airport hub.", cta: "Open hub" },
    { href: "/reservations/", icon: "calendar", title: "Reserve your ride", text: "Book online.", cta: "Reserve" },
  ];

  return landingPage({
    path: g.path,
    title: g.title,
    titleFull: `${g.title} | Landio Limo Services`,
    description: c.description,
    summary: c.summary,
    bodyClass: `page-guide page-guide-${g.slug}`,
    cluster: "guides",
    card: { title: g.name, text: c.summary, icon: "pin" },
    trail: [{ name: "Home", path: "/" }, { name: "DC Airport Guide", path: HUB_PATH }, { name: g.name, path: g.path }],
    sections: [
      ["hero", {
        eyebrow: `${c.eyebrow} · Guide`,
        h1: c.h1,
        answerHtml: c.summary,
        chips: [{ icon: "clock", text: SITE.hours }, { icon: "tag", text: "No surge pricing" }],
        image: HERO_IMG,
        form: false,
      }],
      ["html", { render: prose(c.body) }],
      ["links", { id: `related-${g.slug}`, eyebrow: "Keep Reading", h2: "Related", items: related }],
      ["contact"],
    ],
  });
}

export function guidePages() {
  return GUIDES.map(guidePage);
}
