/**
 * Event transportation pages — hub + per-event pages (recurring DC-metro
 * events). Self-contained: content + renderer here, on the plain landing
 * template. Event slugs are evergreen (no year); dates in copy are refreshed
 * yearly from the organizer.
 *
 *   /events/            (hub)
 *   /events/<slug>/     (one per config EVENTS entry)
 */

import { SITE, DEFAULT_SITE_URL, EVENTS, bySlug } from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { HERO_IMG, glanceTiles, serviceNode, collectionNode, areaCard } from "./_kit.js";

const HUB_PATH = "/events/";

const E = {
  "national-cherry-blossom-festival": {
    when: "late March to mid-April each spring",
    where: "around the Tidal Basin and the National Mall in Washington, DC",
    blurb: "a four-week celebration of the 1912 gift of cherry trees from Tokyo, with the parade, the Blossom Kite Festival, and Petalpalooza",
    note: "The 2027 festival (March 20–April 11) marks the 100th anniversary, drawing some of the year's heaviest visitor traffic to the District.",
    nearby: ["washington-dc", "arlington", "alexandria"],
  },
  "marine-corps-marathon": {
    when: "late October each fall",
    where: "running through Arlington and Washington, DC, finishing at the Marine Corps War Memorial",
    blurb: "one of the largest marathons in the world, drawing tens of thousands of runners and spectators",
    note: "Road closures across Arlington and the District make a chauffeur the simplest way to reach the start, the finish, or your hotel on race morning.",
    nearby: ["arlington", "washington-dc", "alexandria"],
  },
  "july-4th-national-mall": {
    when: "July 4th each year",
    where: "on and around the National Mall in Washington, DC",
    blurb: "the capital's Independence Day celebration, with the national fireworks, concerts, and the parade",
    note: "Street closures and security perimeters blanket downtown DC for the holiday; a chauffeur navigates the closures and drops you as close as access allows.",
    nearby: ["washington-dc", "arlington", "alexandria"],
  },
  "capital-pride": {
    when: "early-to-mid June each year",
    where: "across Washington, DC, centered on the parade route and festival",
    blurb: "the region's Pride parade, street festival, and concert, drawing crowds from across the DMV",
    note: "With road closures along the parade route, we coordinate drop-off and a scheduled return around the day's schedule.",
    nearby: ["washington-dc", "silver-spring", "arlington"],
  },
  "dc-jazz-festival": {
    when: "late summer into early fall",
    where: "at venues across Washington, DC, including The Wharf",
    blurb: "a citywide jazz festival with concerts and performances across the District",
    note: "With shows spread across multiple venues, an hourly chauffeur or point-to-point transfers keep your evening moving.",
    nearby: ["washington-dc", "arlington", "alexandria"],
  },
};

/* -------------------------------- Hub ---------------------------------- */
export function eventsPage() {
  const items = EVENTS.map((e) => ({ name: `${e.name} Transportation`, path: e.path }));
  return landingPage({
    path: HUB_PATH,
    title: "DC Event Transportation",
    titleFull: "DC Metro Event Transportation | Landio Limo Services",
    description: "Chauffeured transportation for the DC metro's biggest events — the Cherry Blossom Festival, Marine Corps Marathon, July 4th, Capital Pride, and more. Door-to-door drop-off and a scheduled return, 24/7.",
    summary: "Chauffeured car service for the DC metro's major events — festivals, races, and celebrations — with door-to-door drop-off, a scheduled return, and airport transfers for visiting guests.",
    bodyClass: "page-events-hub",
    cluster: "events",
    hub: true,
    card: { title: "DC event transportation", text: "Drop-off and scheduled returns for the region's biggest events.", icon: "calendar" },
    trail: [{ name: "Home", path: "/" }, { name: "Events", path: HUB_PATH }],
    graph: [collectionNode({ path: HUB_PATH, name: "DC Event Transportation", description: "Chauffeured transportation for DC-metro events.", items })],
    sections: [
      ["hero", {
        eyebrow: "Events · 24/7",
        h1: "DC Metro Event Transportation",
        answerHtml: esc(`Landio runs chauffeured transportation for the DC metro's biggest events — festivals, races, and celebrations — dropping you close to the action and returning on a schedule you set, ${SITE.hours}, with no surge pricing.`),
        chips: [{ icon: "calendar", text: "Festivals · races · galas" }, { icon: "car", text: "Door-to-door" }, { icon: "tag", text: "No surge pricing" }],
        image: HERO_IMG,
        form: false,
      }],
      ["links", {
        id: "events-list",
        eyebrow: "Events",
        h2: "Events We Cover",
        lede: "Pick an event for timing, drop-off, and booking.",
        items: EVENTS.map((e) => ({ href: e.path, icon: "calendar", title: `${e.name} transportation`, text: `${E[e.slug].blurb.charAt(0).toUpperCase() + E[e.slug].blurb.slice(1)}.`, cta: "View event" })),
      }],
      ["contact"],
    ],
  });
}

/* ----------------------------- Event pages ----------------------------- */
function eventPage(e) {
  const c = E[e.slug];
  const nearby = (c.nearby || []).map((s) => areaCard(s));

  return landingPage({
    path: e.path,
    title: `${e.name} Transportation`,
    titleFull: `${e.name} Transportation | Landio Limo Services`,
    description: `Chauffeured transportation for ${e.name} — door-to-door drop-off, a scheduled return, and airport transfers for visiting guests. 24/7, no surge pricing.`,
    summary: `Chauffeured car service for ${e.name}, ${c.where} — ${c.blurb}.`,
    bodyClass: `page-event page-event-${e.slug}`,
    cluster: "events",
    card: { title: `${e.name} transportation`, text: `Drop-off and pickup for ${e.name}.`, icon: "calendar" },
    defaultPickup: "",
    trail: [{ name: "Home", path: "/" }, { name: "Events", path: HUB_PATH }, { name: `${e.name} Transportation`, path: e.path }],
    faqs: [
      { q: `Do you provide transportation for ${e.name}?`, a: `Yes. Landio runs chauffeured transportation for ${e.name}, ${c.when}, with door-to-door drop-off and a scheduled return, ${SITE.hours}, and no surge pricing.` },
      { q: `Where will my chauffeur drop me off for ${e.name}?`, a: `As close to the event as access and road closures allow. Your chauffeur returns to a set pickup spot when you're ready — no parking, no long walk back.` },
      { q: `Can you handle a group for ${e.name}?`, a: `Yes. The Sprinter van keeps a group together, with mini buses and charter buses for larger parties. Tell us your headcount when you book.` },
      { q: "Is there event-day surge pricing?", a: "No. Every trip is quoted up front with no surge pricing, even on the busiest event days." },
      { q: "Can you add an airport transfer for visiting guests?", a: "Yes. We meet guests at Dulles (IAD), Reagan National (DCA), or BWI, track their flight, and handle the airport run and the event trip on one booking." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
    graph: [serviceNode({ path: e.path, name: `${e.name} Transportation`, serviceType: "Event transportation", description: `Chauffeured transportation for ${e.name}.` })],
    sections: [
      ["hero", {
        eyebrow: "Event Transportation · 24/7",
        h1: `${e.name} Transportation`,
        answerHtml: esc(`Landio provides chauffeured transportation for ${e.name}, held ${c.when}, ${c.where}. Door-to-door drop-off and a scheduled return, ${SITE.hours}.`),
        chips: [{ icon: "calendar", text: "Door-to-door" }, { icon: "radar", text: "Airport + event" }, { icon: "tag", text: "No surge pricing" }],
        image: HERO_IMG,
        formId: `${e.slug}-quote`,
        formHeading: `Get Your ${e.name} Quote`,
        formLocation: e.path,
      }],
      ["trust", { id: `glance-${e.slug}`, eyebrow: "At a Glance", h2: `${e.name} Transportation at a Glance`, tiles: glanceTiles({}) }],
      ["intro", {
        label: "How it works",
        eyebrow: "How It Works",
        cols: [
          { id: `skip-${e.slug}`, icon: "car", h2: "Skip the Event-Day Hassle", act: { modal: {} }, cue: "Book a drop-off", html: `<p>${esc(c.note)} Your chauffeur drops you close to the action and is back at a set spot when you're ready.</p>` },
          { id: `fly-${e.slug}`, icon: "radar", h2: "Flying In for the Event?", act: { modal: {} }, cue: "Book airport + event", html: `<p>Visiting from out of town? We meet you at Dulles (IAD), Reagan National (DCA), or BWI, track your flight, and handle both the airport run and the ride to ${esc(e.name)} on one booking.</p>` },
        ],
      }],
      ["why", {
        id: `why-${e.slug}`,
        eyebrow: "Why Landio",
        h2: `${e.name}, Handled`,
        items: [
          { icon: "van", title: "Group-sized vehicles", text: "Sedans and SUVs, plus Sprinter vans, mini buses, and charter buses for groups.", act: { modal: {} } },
          { icon: "tag", title: "No event-day surge", text: "Every trip is quoted up front, even on the busiest days.", act: { modal: {} } },
          { icon: "clock", title: "A return on your schedule", text: "Set your pickup time and spot; your chauffeur is there when you're ready.", act: { modal: {} } },
          { icon: "shield", title: "Professional chauffeurs", text: "Punctual, discreet, and an immaculate vehicle every time.", act: { modal: {} } },
        ],
      }],
      ["faq", { heading: `${e.name} Transportation FAQ`, eyebrow: "Good to Know" }],
      ["links", { id: `nearby-${e.slug}`, eyebrow: "Nearby", h2: `Areas We Serve`, lede: "DC-metro areas we drive to and from for this event.", items: nearby }],
      ["links", {
        id: `plan-${e.slug}`,
        eyebrow: "Plan Your Ride",
        h2: "Plan Your Ride",
        items: [
          { href: HUB_PATH, icon: "calendar", title: "All DC events", text: "Every event we cover across the DC metro.", cta: "View events" },
          { href: "/services/group-transfers/", icon: "van", title: "Group transfers", text: "Keep your whole party together.", cta: "View service" },
          { href: "/dc-airport-car-service/", icon: "plane", title: "DC airport car service", text: "Airport transfers for visiting guests.", cta: "Open hub" },
          { href: "/reservations/", icon: "calendar", title: "Reserve your ride", text: "Book your event transportation online.", cta: "Reserve" },
        ],
      }],
      ["contact"],
    ],
  });
}

export function eventPages() {
  return EVENTS.map(eventPage);
}

void DEFAULT_SITE_URL;
void bySlug;
