/**
 * ATL terminal pages — renderer (Page 2 + 3, docs/SEO-PLAN.md §5).
 *
 * This file holds NO content: structure comes from the shared landing template
 * (templates/landing.js) and the shared kit (_kit.js); every word and sourced
 * fact comes from src/content/terminals.js (keyed by terminal) and src/config.js.
 * Two pages are produced from one renderer — no hand-written page per terminal.
 *
 *   /atlanta-airport-car-service/domestic-terminal/
 *   /atlanta-airport-car-service/international-terminal/
 */

import { SITE, ATL_HUB_PATH, ATL_TERMINALS } from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { TERMINALS } from "../content/terminals.js";
import { HERO_IMG, glanceTiles, sources, serviceNode, abs } from "./_kit.js";

const ATL = SITE.airports[0];

/** [icon, title, text] → { icon, title, text } for the tabbed timeline. */
const toStep = ([icon, title, text]) => ({ icon, title, text });

function terminalPage(t) {
  const term = ATL_TERMINALS[t.key];
  const path = term.page;
  const pickup = term.pickup; // prefill: a ride FROM this terminal
  const otherKey = t.key === "domestic" ? "international" : "domestic";
  const other = TERMINALS[otherKey];
  const otherTerm = ATL_TERMINALS[otherKey];

  // Arriving = ride from the terminal (prefill pickup); departing = ride to the
  // terminal (prefill drop-off). Every box in a tab shares the tab's trip.
  const arriveAct = { modal: { pickup }, cue: "Book this pickup" };
  const departAct = { modal: { dropoff: pickup }, cue: "Book a ride here" };

  return landingPage({
    path,
    title: t.title,
    titleFull: t.titleFull,
    description: t.description,
    summary: t.summary,
    bodyClass: `page-terminal page-terminal-${t.key}`,
    cluster: "airport",
    card: { title: t.name, text: t.summary, icon: "plane" },
    defaultPickup: pickup,
    trail: [
      { name: "Home", path: "/" },
      { name: "Atlanta Airport Car Service", path: ATL_HUB_PATH },
      { name: t.name, path },
    ],
    faqs: t.faqs,
    graph: [
      serviceNode({
        path,
        name: t.h1,
        serviceType: "Airport transfer",
        description: t.description,
      }),
      { "@type": "Airport", "@id": `${abs(path)}#airport`, name: ATL.name, iataCode: ATL.code },
    ],
    sections: [
      ["hero", {
        eyebrow: `ATL ${t.label} Terminal · 24/7`,
        h1: t.h1,
        answerHtml: esc(t.answer),
        chips: t.chips,
        image: HERO_IMG,
        prefillPickup: pickup,
        formId: `${t.key}-quote`,
        formHeading: `Get Your ${t.label} Terminal Quote`,
        formLocation: path,
      }],

      ["trust", {
        id: `glance-${t.key}`,
        eyebrow: "At a Glance",
        h2: `${t.name} Car Service at a Glance`,
        tiles: glanceTiles({ pickup }),
      }],

      ["intro", {
        label: "Pickup and drop-off",
        eyebrow: "Pickup & Drop-off",
        sourcesHtml: sources("atlGT"),
        cols: [
          {
            id: `pickup-${t.key}`,
            icon: "radar",
            h2: `Pickup at the ${t.label} Terminal`,
            act: arriveAct,
            cue: "Book a pickup",
            html: t.pickupText,
          },
          {
            id: `dropoff-${t.key}`,
            icon: "plane",
            h2: `Drop-off for ${t.label} Departures`,
            act: departAct,
            cue: "Book a drop-off",
            html: t.dropoffText,
          },
        ],
      }],

      ["timeline", {
        id: `flow-${t.key}`,
        idBase: `flow-${t.key}`,
        eyebrow: "Step by Step",
        h2: `Your ${t.label} Terminal Ride, Step by Step`,
        ledeHtml: esc(t.timelineLede),
        tabsLabel: `${t.label} Terminal flow`,
        tabs: [
          {
            label: "Arriving at ATL",
            title: `Meeting your chauffeur after a ${t.label.toLowerCase()} arrival`,
            point: t.arriving.point,
            act: arriveAct,
            pointCue: "Book this pickup",
            steps: t.arriving.steps.map(toStep),
          },
          {
            label: "Leaving from ATL",
            title: `Getting to the ${t.label} Terminal for your flight`,
            point: t.departing.point,
            act: departAct,
            pointCue: "Book a ride here",
            steps: t.departing.steps.map(toStep),
          },
        ],
        footHtml: `${sources("atlGT")} We confirm your exact meeting point when you book.`,
      }],

      ["table", {
        id: `options-${t.key}`,
        eyebrow: "Every Way Out",
        h2: `Leaving the ${t.label} Terminal: Your Options`,
        lede: t.options.lede,
        caption: `Ground transportation options at the ATL ${t.label} Terminal`,
        head: ["Option", "Where to go", "How it works"],
        rows: t.options.rows.map((r) => r.map(esc)),
        sourcesHtml: sources(...t.options.sources),
      }],

      ["steps", { prefillPickup: pickup }],

      ["faq", { heading: `${t.name} Car Service FAQ`, eyebrow: "Good to Know" }],

      ["links", {
        id: `explore-${t.key}`,
        eyebrow: "Keep Planning",
        h2: "Plan the Rest of Your ATL Trip",
        items: [
          { href: ATL_HUB_PATH, icon: "plane", title: "Atlanta Airport Car Service", text: "The full ATL car service hub: routes, fleet, and booking.", cta: "Open hub" },
          { href: otherTerm.page, icon: "plane", title: other.name, text: other.summary, cta: "View terminal" },
          { href: "/fleet/", icon: "car", title: "Our fleet", text: "Executive Sedan, Executive SUV, and Sprinter Van.", cta: "View fleet" },
          { href: "/routes/", icon: "route", title: "Popular routes from ATL", text: "Metro Atlanta and long-distance trips.", cta: "See routes" },
          { href: "/reservations/", icon: "calendar", title: "Reserve your ride", text: "Book your terminal pickup online.", cta: "Reserve" },
          // Future page (docs/LINK-TODO.md) — shown automatically once built.
          { href: "/atl-airport-guide/", requires: "/atl-airport-guide/", icon: "pin", title: "ATL airport guide", text: "Terminals, timing, and getting around Hartsfield-Jackson.", cta: "Read the guide" },
        ],
      }],

      ["contact"],
    ],
  });
}

export function terminalPages() {
  return [TERMINALS.domestic, TERMINALS.international].map(terminalPage);
}
