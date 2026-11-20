/**
 * Venue car-service pages — hub + per-venue pages (DC-metro arenas, stadiums,
 * convention centers, performing-arts halls, and resorts). Self-contained:
 * content + renderer here, built on the plain landing template.
 *
 *   /services/<slug>-car-service/   (one per config VENUES entry)
 *   hub is part of the /services/ directory via the footer/nav; the per-venue
 *   pages are linked from the hub section below and each other.
 */

import { SITE, DEFAULT_SITE_URL, VENUES, bySlug } from "../config.js";
import { esc } from "../templates/partials.js";
import { landingPage } from "../templates/landing.js";
import { HERO_IMG, glanceTiles, serviceNode, collectionNode, areaCard } from "./_kit.js";

const HUB_PATH = "/venues/";

const V = {
  "capital-one-arena": { place: "Capital One Arena", where: "in DC's Penn Quarter downtown", blurb: "home to the Washington Wizards (NBA) and Washington Capitals (NHL), plus concerts and events", nearby: ["washington-dc", "arlington", "bethesda"] },
  "nationals-park": { place: "Nationals Park", where: "in the Navy Yard along the Anacostia River", blurb: "home to the Washington Nationals (MLB) and a major concert venue", nearby: ["washington-dc", "arlington", "alexandria"] },
  "audi-field": { place: "Audi Field", where: "in Buzzard Point in Southwest DC", blurb: "home to D.C. United (MLS) and the Washington Spirit (NWSL)", nearby: ["washington-dc", "arlington", "alexandria"] },
  "northwest-stadium": { place: "Northwest Stadium", where: "in Landover, Maryland, east of Washington, DC", blurb: "home of the Washington Commanders (NFL)", nearby: ["washington-dc", "silver-spring", "national-harbor"] },
  "walter-washington-convention-center": { place: "the Walter E. Washington Convention Center", where: "in Mount Vernon Square in downtown DC", blurb: "the city's largest convention and expo venue", nearby: ["washington-dc", "bethesda", "arlington"] },
  "gaylord-national": { place: "the Gaylord National Resort & Convention Center", where: "at National Harbor on the Potomac", blurb: "a major hotel, conference, and events destination", nearby: ["national-harbor", "alexandria", "washington-dc"] },
  "the-kennedy-center": { place: "the Kennedy Center", where: "on the Potomac in Foggy Bottom", blurb: "the nation's premier performing-arts venue", nearby: ["washington-dc", "arlington", "mclean"] },
  "wolf-trap": { place: "Wolf Trap", where: "in Vienna, Virginia", blurb: "a national park for the performing arts, home to the Filene Center amphitheater", nearby: ["tysons", "reston", "mclean"] },
  "mgm-national-harbor": { place: "MGM National Harbor", where: "on the Potomac in Prince George's County, Maryland", blurb: "a casino, hotel, and entertainment resort", nearby: ["national-harbor", "alexandria", "washington-dc"] },
};

const CATEGORIES = ["Arenas & Stadiums", "Convention & Expo", "Performing Arts", "Entertainment & Resorts"];

/* -------------------------------- Hub ---------------------------------- */
export function venuesPage() {
  const items = VENUES.map((v) => ({ name: `${v.name} Car Service`, path: v.path }));
  const groups = CATEGORIES
    .map((cat) => ({ cat, list: VENUES.filter((v) => v.category === cat) }))
    .filter((g) => g.list.length);

  return landingPage({
    path: HUB_PATH,
    title: "DC Venues We Serve",
    titleFull: "DC Metro Venues Car Service | Landio Limo Services",
    description: "Chauffeured car service to the DC metro's arenas, stadiums, convention centers, theaters, and resorts — Capital One Arena, Nationals Park, the Kennedy Center, MGM National Harbor, and more. 24/7, no surge pricing.",
    summary: "Chauffeured car service to the DC metro's major venues — arenas, stadiums, convention centers, performing-arts halls, and resorts — with door-to-door drop-off and a scheduled return.",
    bodyClass: "page-venues-hub",
    cluster: "venues",
    hub: true,
    card: { title: "DC venues we serve", text: "Drop-off and pickup at the region's arenas, theaters, and convention halls.", icon: "pin" },
    trail: [{ name: "Home", path: "/" }, { name: "Venues", path: HUB_PATH }],
    graph: [collectionNode({ path: HUB_PATH, name: "DC Venues We Serve", description: "Chauffeured car service to DC-metro venues.", items })],
    sections: [
      ["hero", {
        eyebrow: "Venues · 24/7",
        h1: "DC Metro Venues We Serve",
        answerHtml: esc(`Landio provides chauffeured car service to the DC metro's arenas, stadiums, convention centers, theaters, and resorts — door-to-door drop-off and a scheduled return, ${SITE.hours}, with no surge pricing.`),
        chips: [{ icon: "pin", text: "Arenas · theaters · expos" }, { icon: "car", text: "Door-to-door" }, { icon: "tag", text: "No surge pricing" }],
        image: HERO_IMG,
        form: false,
      }],
      ...groups.map((g) => ["links", {
        id: `venues-${g.cat.replace(/\W+/g, "-").toLowerCase()}`,
        eyebrow: g.cat,
        h2: g.cat,
        lede: "Pick a venue for drop-off points and booking.",
        items: g.list.map((v) => ({ href: v.path, icon: "pin", title: `${v.name} car service`, text: `${(V[v.slug].blurb || "").replace(/^home/, "Home")}.`, cta: "View venue" })),
      }]),
      ["contact"],
    ],
  });
}

/* ----------------------------- Venue pages ----------------------------- */
function venuePage(v) {
  const c = V[v.slug];
  const place = v.name;
  const nearby = (c.nearby || []).map((s) => areaCard(s));

  return landingPage({
    path: v.path,
    title: `${v.name} Car Service`,
    titleFull: `${v.name} Car Service | Landio Limo Services`,
    description: `Chauffeured car service to ${place} — door-to-door drop-off, a scheduled return, and airport transfers for visiting guests. 24/7, no surge pricing.`,
    summary: `Chauffeured car service to ${place}, ${c.where} — ${c.blurb}.`,
    bodyClass: `page-venue page-venue-${v.slug}`,
    cluster: "venues",
    card: { title: `${v.name} car service`, text: `Drop-off and pickup at ${place}.`, icon: "pin" },
    defaultPickup: "",
    trail: [{ name: "Home", path: "/" }, { name: "Venues", path: HUB_PATH }, { name: `${v.name} Car Service`, path: v.path }],
    faqs: [
      { q: `Do you provide car service to ${place}?`, a: `Yes. Landio drops you close to the entrance at ${place} and returns at a time and spot you set, ${SITE.hours}, with no surge pricing.` },
      { q: `Where will my chauffeur drop me off at ${place}?`, a: `As close to the entrance as the venue allows on event days. Your chauffeur then returns to a set pickup spot when you're ready — no parking, no walk back to a lot.` },
      { q: `Can you handle a group to ${place}?`, a: `Yes. The Sprinter van keeps a group together, and minibuses and charter buses cover larger parties. Tell us your headcount when you book.` },
      { q: "Is there event-day surge pricing?", a: "No. Every trip is quoted up front with no surge pricing, even on the busiest event nights." },
      { q: "Can you add an airport transfer for visiting guests?", a: "Yes. We meet guests at Dulles (IAD), Reagan National (DCA), or BWI, track their flight, and handle the airport run and the venue trip on one booking." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
    graph: [serviceNode({ path: v.path, name: `${v.name} Car Service`, serviceType: "Event transportation", description: `Chauffeured car service to ${place}.` })],
    sections: [
      ["hero", {
        eyebrow: `${v.category} · 24/7`,
        h1: `${v.name} Car Service`,
        answerHtml: esc(`Landio provides chauffeured car service to ${place}, ${c.where} — ${c.blurb}. Door-to-door drop-off and a scheduled return, ${SITE.hours}.`),
        chips: [{ icon: "pin", text: v.name.length > 22 ? v.category : v.name }, { icon: "car", text: "Door-to-door" }, { icon: "tag", text: "No surge pricing" }],
        image: HERO_IMG,
        formId: `${v.slug}-quote`,
        formHeading: `Get Your ${v.name} Quote`,
        formLocation: v.path,
      }],
      ["trust", { id: `glance-${v.slug}`, eyebrow: "At a Glance", h2: `${v.name} Car Service at a Glance`, tiles: glanceTiles({ dropoff: place }) }],
      ["intro", {
        label: "Drop-off and pickup",
        eyebrow: "Drop-off & Pickup",
        cols: [
          { id: `to-${v.slug}`, icon: "car", h2: `Skip the Parking`, act: { modal: { dropoff: place } }, cue: "Book a drop-off", html: `<p>On an event day, driving yourself means traffic, a scramble for parking, and a long walk back afterward. Your chauffeur drops you close to the entrance at ${esc(place)} and is back at a set spot when you're ready.</p>` },
          { id: `from-${v.slug}`, icon: "radar", h2: `Flying In for the Event?`, act: { modal: {} }, cue: "Book airport + venue", html: `<p>Visiting from out of town? We meet you at Dulles (IAD), Reagan National (DCA), or BWI, track your flight, and handle both the airport run and the ride to ${esc(place)} on one booking.</p>` },
        ],
      }],
      ["why", {
        id: `why-${v.slug}`,
        eyebrow: "Why Landio",
        h2: `A ${v.name} Trip, Done Right`,
        items: [
          { icon: "van", title: "Group-sized vehicles", text: "Sedans and SUVs, plus Sprinter vans, minibuses, and charter buses for groups.", act: { modal: { dropoff: place } } },
          { icon: "tag", title: "No event-day surge", text: "Every trip is quoted up front, even on the busiest nights.", act: { modal: { dropoff: place } } },
          { icon: "clock", title: "A return on your schedule", text: "Set your pickup time and spot; your chauffeur is there when the event lets out.", act: { modal: { dropoff: place } } },
          { icon: "shield", title: "Professional chauffeurs", text: "Punctual, discreet, and an immaculate vehicle every time.", act: { modal: { dropoff: place } } },
        ],
      }],
      ["faq", { heading: `${v.name} Car Service FAQ`, eyebrow: "Good to Know" }],
      ["links", { id: `nearby-${v.slug}`, eyebrow: "Nearby", h2: `Areas Near ${v.name}`, lede: "DC-metro areas we drive to and from this venue.", items: nearby }],
      ["links", {
        id: `plan-${v.slug}`,
        eyebrow: "Plan Your Ride",
        h2: "Plan Your Ride",
        items: [
          { href: HUB_PATH, icon: "pin", title: "All DC venues", text: "Every arena, theater, and convention hall we serve.", cta: "View venues" },
          { href: "/services/group-transfers/", icon: "van", title: "Group transfers", text: "Keep your whole party together.", cta: "View service" },
          { href: "/dc-airport-car-service/", icon: "plane", title: "DC airport car service", text: "Airport transfers for visiting guests.", cta: "Open hub" },
          { href: "/reservations/", icon: "calendar", title: "Reserve your ride", text: "Book your event transportation online.", cta: "Reserve" },
        ],
      }],
      ["contact"],
    ],
  });
}

export function venuePages() {
  return VENUES.map(venuePage);
}

void DEFAULT_SITE_URL;
void bySlug;
