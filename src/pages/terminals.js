/**
 * DC-area airport pages — renderer. One page per airport the client serves
 * (IAD, DCA, BWI), built from src/content/terminals.js. Structure comes from the
 * shared landing template; business facts from config.js.
 *
 *   /dc-airport-car-service/iad/
 *   /dc-airport-car-service/dca/
 *   /dc-airport-car-service/bwi/
 */

import { SITE, ATL_HUB_PATH } from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { TERMINALS } from "../content/terminals.js";
import { HERO_IMG, glanceTiles, serviceNode, abs } from "./_kit.js";

const airportPath = (key) => `/dc-airport-car-service/${key}/`;
const toStep = ([icon, title, text]) => ({ icon, title, text });

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
        tiles: glanceTiles({ pickup }),
      }],

      ["intro", {
        label: "Pickup and drop-off",
        eyebrow: "Pickup & Drop-off",
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
        ledeHtml: esc(`${t.name} (${t.code}) is ${t.where}. Here is how a transfer works, arriving or departing.`),
        tabsLabel: `${t.code} flow`,
        tabs: [
          { label: `Arriving at ${t.code}`, title: `Meeting your chauffeur at ${t.code}`, point: t.arriving.point, act: arriveAct, pointCue: "Book this pickup", steps: t.arriving.steps.map(toStep) },
          { label: `Leaving from ${t.code}`, title: `Getting to ${t.code} for your flight`, point: t.departing.point, act: departAct, pointCue: "Book a ride here", steps: t.departing.steps.map(toStep) },
        ],
        footHtml: "We confirm your exact meeting point when you book.",
      }],

      ["steps", { prefillPickup: pickup }],

      ["faq", { heading: `${t.code} Airport Car Service FAQ`, eyebrow: "Good to Know" }],

      ["links", {
        id: `explore-${t.key}`,
        eyebrow: "Keep Planning",
        h2: "Plan the Rest of Your Trip",
        items: [
          { href: ATL_HUB_PATH, icon: "plane", title: "DC Airport Car Service", text: "The full airport hub: IAD, DCA, BWI, and booking.", cta: "Open hub" },
          ...others.map((o) => ({ href: airportPath(o.key), icon: "plane", title: `${o.code} airport car service`, text: o.summary, cta: "View airport" })),
          { href: "/fleet/", icon: "car", title: "Our fleet", text: "Sedan, SUV, Sprinter Van, Mini Bus, and Charter Bus.", cta: "View fleet" },
          { href: "/private-jet-fbo-transfers/", icon: "plane", title: "Private jet & FBO transfers", text: "Flying private? Signature and the region's FBOs.", cta: "View FBOs" },
          { href: "/reservations/", icon: "calendar", title: "Reserve your ride", text: "Book your airport pickup online.", cta: "Reserve" },
        ],
      }],

      ["contact"],
    ],
  });
}

export function terminalPages() {
  return Object.values(TERMINALS).map(terminalPage);
}

// Keep SITE referenced for future per-airport customization.
void SITE;
