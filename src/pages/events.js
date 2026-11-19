/**
 * Events — a master listing (/events/) plus one premium detail page per event
 * under /events/<slug>-transportation/. Built on the approved Group Transfers
 * premium design (page-group-transfers).
 *
 * Aura Hamptons is an independent chauffeured car service. These pages describe
 * OUR transportation for guests attending each event — never official-shuttle,
 * partnership, preferred-provider, or ticketing claims. Dates and venues are
 * verified public facts; nothing is invented. Factual venue details live here
 * (not as config VENUES slugs), because neither event is held at one of our
 * venue pages.
 */

import { SITE, DEFAULT_SITE_URL, breadcrumbJsonLd, faqJsonLd, CAPACITY, EVENTS, bySlug } from "../config.js";
import { esc, btnIcon } from "../templates/partials.js";
import { icon } from "../templates/icons.js";
import { breadcrumb, pageHero, fleetSection, faqAccordion, contactSection, cbox } from "./_sections.js";
import { glanceSection, planningSection, groupDetail, groupAreas, pAirports, pRoutes, COMMITMENT_CARDS } from "./service-spokes.js";

const ORIGIN = DEFAULT_SITE_URL.replace(/\/+$/, "");
const HERO = "/assets/img/hero/hamptons-hero";
const CHECK = icon("check", { size: 13 });

/* Per-event factual content. Dates/venues verified from official sources. */
const EVENT_META = {
  "hampton-classic": {
    status: "confirmed",
    dateLabel: "August 29 – September 5, 2027",
    locationLabel: "Hampton Classic Show Grounds, Bridgehampton",
    venueName: "Hampton Classic Show Grounds",
    address: "240 Snake Hollow Road, Bridgehampton, NY 11932",
    town: "Bridgehampton",
    cardImg: "/assets/img/fleet/motor-coach",
    blurb: "One of the nation's largest hunter/jumper horse shows, held each summer at its Bridgehampton show grounds.",
    about: [
      "The Hampton Classic Horse Show is one of the largest hunter/jumper competitions in the United States, held each summer at the Hampton Classic Show Grounds in Bridgehampton. It is a horse show — the event's official FAQ notes there is no polo at the Hampton Classic.",
      "The 2027 show runs August 29 – September 5, 2027. Aura Hamptons provides chauffeured transportation for guests attending the Hampton Classic — group shuttles, flight-tracked airport transfers for visitors, and local rides across the Hamptons.",
    ],
    faqs: [
      { q: "When is the Hampton Classic in 2027?", a: "The 2027 Hampton Classic Horse Show runs August 29 – September 5, 2027." },
      { q: "Where is the Hampton Classic held?", a: "At the Hampton Classic Show Grounds, 240 Snake Hollow Road, Bridgehampton, NY. It is a horse show held at its own show grounds — not at the Bridgehampton Polo Club, and there is no polo at the event." },
      { q: "Do you provide group transportation to the Hampton Classic?", a: `Yes. We offer Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach for groups attending. Aura Hamptons is an independent chauffeured car service, not an official event shuttle.` },
      { q: "Can you pick up guests from the airport for the Hampton Classic?", a: "Yes. We provide flight-tracked airport transfers from JFK, LGA, EWR, ISP, FOK, and HTO, plus local rides across the Hamptons." },
      { q: "Is transportation available throughout the show week?", a: `Yes. Aura Hamptons operates ${SITE.hours} across the full Hampton Classic week.` },
    ],
    // --- Premium sections (factual; Bridgehampton is the show-grounds town) ---
    glanceHeading: "Hampton Classic Transportation at a Glance",
    glance: [
      { label: "Airport transfers", desc: "Flight-tracked service from JFK, LGA, EWR, ISP, FOK, and HTO." },
      { label: "Capacity", desc: `From an Executive Sedan up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach for groups.` },
      { label: "Service area", desc: "Bridgehampton and across the Hamptons." },
      { label: "Book ahead", desc: "Reserve early for show week — group vehicles book up fast." },
      { label: "Availability", desc: `Chauffeured service ${SITE.hours} across the full show week.` },
    ],
    glanceNote: "The 2027 Hampton Classic runs August 29 – September 5, 2027 at the Hampton Classic Show Grounds, 240 Snake Hollow Road, Bridgehampton. Aura Hamptons provides independent chauffeured transportation for guests attending — not an official event shuttle.",
    fleetIntro: "Move your group to the Bridgehampton show grounds together — Sprinter Vans, Mini Buses, and a 56-passenger Motor Coach, plus Executive Sedans and Luxury SUVs for smaller parties.",
    planning: {
      eyebrow: "Event-Day Logistics",
      heading: "Planning Your Hampton Classic Transportation",
      body: "Tell us your dates, group size, and pickup points across show week, and we'll plan the right vehicles and timing to the Bridgehampton show grounds.",
      points: [
        "Share your show dates and daily pickup times",
        "Group shuttles between hotels, rentals, and the show grounds",
        "Flight-tracked airport pickups for visiting guests",
        "Coverage across the full August 29 – September 5 run",
      ],
    },
    airportsSection: { heading: "Airports We Serve for the Hampton Classic", intro: "Flight-tracked car service from every New York-area airport to Bridgehampton and the show grounds. Tap any airport to book." },
    routes: {
      heading: "Popular Routes to Bridgehampton",
      intro: "Our most-requested transfers to the Hampton Classic show grounds. Tap one to prefill your quote.",
      items: ["JFK ⇄ Bridgehampton", "LGA ⇄ Bridgehampton", "EWR ⇄ Bridgehampton", "NYC ⇄ Bridgehampton", "Manhattan ⇄ Bridgehampton", "Bridgehampton ⇄ Montauk"],
    },
    areasSection: { heading: "Serving Bridgehampton & the East End", intro: "Door-to-door chauffeured car service across Bridgehampton and every Hamptons village — tap your area to start a quote." },
    commitmentHeading: "Why Choose Aura for the Hampton Classic",
    commitmentIntro: "Professional chauffeurs, meticulously maintained vehicles, and coordinated group logistics across the full show week.",
    event: {
      name: "Hampton Classic Horse Show",
      startDate: "2027-08-29",
      endDate: "2027-09-05",
      place: { name: "Hampton Classic Show Grounds", street: "240 Snake Hollow Road", city: "Bridgehampton", region: "NY", postal: "11932" },
    },
  },
  "hamptons-film-festival": {
    status: "tba",
    dateLabel: "2027 Dates To Be Announced",
    locationLabel: "Multiple East End venues",
    venueName: "Multiple East End venues",
    address: "Across East Hampton and the East End",
    town: "the East End",
    cardImg: "/assets/img/fleet/executive-suv",
    blurb: "A premier fall film festival screening across multiple East End venues. 2027 dates to be announced.",
    about: [
      "The Hamptons International Film Festival is a premier fall film festival that takes place across multiple venues on the East End. The 2027 (HIFF35) dates have not yet been announced.",
      "In its 2026 edition, the festival's official venue guide listed theaters including Guild Hall, the Regal UA East Hampton Cinema, the Sag Harbor Cinema, and the Southampton Playhouse. These were 2026-edition venues and are not confirmed for 2027.",
      "Aura Hamptons provides chauffeured transportation for festival-goers — group transportation between screenings and venues, airport transfers for visitors, and hourly chauffeur service across the East End.",
    ],
    faqs: [
      { q: "When is the Hamptons International Film Festival in 2027?", a: "The 2027 (HIFF35) dates have not yet been announced. We'll update this page once the festival confirms its 2027 dates." },
      { q: "Where does the festival take place?", a: "It is a multi-venue festival across the East End. In 2026 the official venue guide listed theaters including Guild Hall, the Regal UA East Hampton Cinema, the Sag Harbor Cinema, and the Southampton Playhouse — these were 2026-edition venues and are not confirmed for 2027." },
      { q: "Do you provide transportation during the festival?", a: `Yes. Aura Hamptons provides chauffeured transportation between festival venues, plus airport transfers and hourly service. We are an independent car service, not an official festival shuttle.` },
      { q: "Can you move a group between multiple screening venues?", a: `Yes. With Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach, we can move your group between East End venues on one schedule.` },
      { q: "Is transportation available 24/7?", a: `Yes. Aura Hamptons operates ${SITE.hours}.` },
    ],
    // --- Premium sections (TBA-safe: no fabricated dates/schedule; East
    //     Hampton is the festival's main East End hub for routes/areas) ---
    glanceHeading: "Hamptons Film Festival Transportation at a Glance",
    glance: [
      { label: "Airport transfers", desc: "Flight-tracked service from JFK, LGA, EWR, ISP, FOK, and HTO." },
      { label: "Capacity", desc: `From an Executive Sedan up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach for groups.` },
      { label: "Service area", desc: "East Hampton and across the East End." },
      { label: "Book ahead", desc: "Reserve ahead; we'll confirm timing once the 2027 dates are announced." },
      { label: "Availability", desc: `Chauffeured service ${SITE.hours}.` },
    ],
    glanceNote: "The 2027 (HIFF35) dates have not yet been announced; we'll update this page once the festival confirms them. Aura Hamptons provides independent chauffeured transportation for festival-goers — not an official festival shuttle.",
    fleetIntro: "Move your group between East End venues together — Sprinter Vans, Mini Buses, and a 56-passenger Motor Coach, plus Executive Sedans and Luxury SUVs for smaller parties.",
    planning: {
      eyebrow: "Event-Day Logistics",
      heading: "Planning Your Film Festival Transportation",
      body: "The festival runs across multiple East End venues. Tell us your venues, screenings, and group size, and we'll move you between them on one schedule — exact timing confirmed once the 2027 dates are announced.",
      points: [
        "Group transportation between multiple screening venues",
        "Flight-tracked airport pickups for visiting guests",
        "Hourly chauffeur service for multi-venue evenings",
        "Timing confirmed once the festival announces 2027 dates",
      ],
    },
    airportsSection: { heading: "Airports We Serve for the Film Festival", intro: "Flight-tracked car service from every New York-area airport to East Hampton and the East End. Tap any airport to book." },
    routes: {
      heading: "Popular Routes to East Hampton",
      intro: "Our most-requested transfers to the East End for the festival. Tap one to prefill your quote.",
      items: ["JFK ⇄ East Hampton", "LGA ⇄ East Hampton", "NYC ⇄ East Hampton", "Manhattan ⇄ East Hampton", "East Hampton ⇄ Sag Harbor", "East Hampton ⇄ Southampton"],
    },
    areasSection: { heading: "Serving East Hampton & the East End", intro: "Door-to-door chauffeured car service across the East End's villages — tap your area to start a quote." },
    commitmentHeading: "Why Choose Aura for the Film Festival",
    commitmentIntro: "Professional chauffeurs, meticulously maintained vehicles, and coordinated multi-venue logistics across the East End.",
    // No `event` schema: dates are TBA, so we do not emit incomplete Event JSON-LD.
  },
};

const eventUrl = (slug) => bySlug(EVENTS, slug).path;

/* Cards for the /services/ landing (imported by services.js). */
export const EVENT_CARDS = EVENTS.map((e) => ({
  slug: e.slug,
  url: e.path,
  title: `${e.name} Transportation`,
  blurb: EVENT_META[e.slug].blurb,
  img: EVENT_META[e.slug].cardImg,
  alt: `Aura Hamptons transportation for the ${e.name}`,
}));

/* ---- Shared ----------------------------------------------------------- */
function trustStrip() {
  const stats = [
    { icon: "users", num: "100+", label: "Happy Clients" },
    { icon: "clock", num: "24/7", label: "Concierge" },
    { icon: "shield", num: "15+", label: "Years of Excellence" },
  ];
  const items = stats.map((s) => `
            <li class="gt-trust2__stat"><span class="gt-trust2__ico" aria-hidden="true">${icon(s.icon, { size: 19 })}</span><span class="gt-trust2__num">${esc(s.num)}</span><span class="gt-trust2__label">${esc(s.label)}</span></li>`).join("");
  return `
    <section class="section gt-trust2-sec" aria-labelledby="ev-trust-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Why Clients Choose Aura</span><h2 id="ev-trust-title">A Premium Standard, Every Trip</h2><p class="text-secondary">Professional chauffeurs, meticulously maintained vehicles, and a concierge team available around the clock.</p></div>
        <div class="gt-trust2 card-surface">
          <ul class="gt-trust2__stats">${items}
          </ul>
        </div>
      </div>
    </section>`;
}

/* ---- Master page (/events/) ------------------------------------------- */
function eventCard(e) {
  const m = EVENT_META[e.slug];
  const badge = m.status === "confirmed"
    ? `<span class="event-card__badge event-card__badge--confirmed">${esc(m.dateLabel)}</span>`
    : `<span class="event-card__badge event-card__badge--tba">${esc(m.dateLabel)}</span>`;
  return `
          <li class="event-card card-surface cbox">
            <div class="event-card__media" style="display:block">
              <picture style="display:block;width:100%;height:100%">
                <source type="image/webp" srcset="${m.cardImg}-640.webp 640w, ${m.cardImg}-1024.webp 1024w" sizes="(min-width:900px) 46vw, 92vw">
                <img src="${m.cardImg}-1024.jpg" srcset="${m.cardImg}-640.jpg 640w, ${m.cardImg}-1024.jpg 1024w" sizes="(min-width:900px) 46vw, 92vw" alt="Aura Hamptons transportation for the ${esc(e.name)}" width="1024" height="576" loading="lazy" decoding="async" style="display:block;width:100%;height:100%;object-fit:cover">
              </picture>
            </div>
            <div class="event-card__body">
              ${badge}
              <h3 class="event-card__title"><a class="cbox__action" href="${e.path}" aria-label="View details — ${esc(e.name)} transportation" data-card-label="${esc(e.name)}">${esc(e.name)}</a></h3>
              <p class="event-card__loc"><span class="event-card__loc-ico" aria-hidden="true">${icon("pin", { size: 13 })}</span>${esc(m.locationLabel)}</p>
              <p class="event-card__desc">${esc(m.blurb)}</p>
              <span class="cbox__cue" aria-hidden="true">View details &rarr;</span>
            </div>
          </li>`;
}

/** Short "what we provide for event guests" intro (between hero and the grid). */
function providesSection() {
  const cards = [
    { icon: "users", title: "Group Transportation", desc: "Sprinter Vans, Mini Buses, and Motor Coaches to move your group to and between venues." },
    { icon: "plane", title: "Airport Transfers", desc: "Flight-tracked transfers for visiting guests from JFK, LGA, EWR, ISP, FOK, and HTO." },
    { icon: "clock", title: "Hourly & Local", desc: "A dedicated chauffeur by the hour, plus door-to-door rides across the East End." },
  ].map((c) => cbox({
    cls: "ap-why",
    lead: `<span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>`,
    title: c.title, titleTag: "h3", titleCls: "ap-why__title",
    act: { modal: {} }, cue: "Get a quote",
    bodyHtml: `<p class="ap-card__desc">${esc(c.desc)}</p>`,
  })).join("");
  return `
    <section class="section section--alt" aria-labelledby="ev-provide-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">For Event Guests</span><h2 id="ev-provide-title">What We Provide for Event Guests</h2><p class="text-secondary">Chauffeured transportation for guests attending the East End's signature events — Aura Hamptons is an independent car service, not an official event shuttle.</p></div>
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

export function eventsPage() {
  const trail = [{ name: "Home", path: "/" }, { name: "Events", path: "/events/" }];
  const description = "Hamptons event transportation — chauffeured group shuttles, airport transfers, and local rides for guests attending the Hampton Classic, the Hamptons International Film Festival, and more. Available 24/7.";
  const main = [
    breadcrumb(trail),
    `
    <section class="hero hero--page hero--image page-events__hero" aria-labelledby="ev-hero-title">
      <picture class="hero__bg" aria-hidden="true">
        <source type="image/webp" srcset="${HERO}-640.webp 640w, ${HERO}-1024.webp 1024w, ${HERO}-1500.webp 1500w" sizes="100vw">
        <img src="${HERO}-1500.jpg" srcset="${HERO}-640.jpg 640w, ${HERO}-1024.jpg 1024w, ${HERO}-1500.jpg 1500w" sizes="100vw" alt="" width="1500" height="844" fetchpriority="high" decoding="async">
      </picture>
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="container"><div>
        <p class="hero__eyebrow">Event Transportation</p>
        <h1 id="ev-hero-title">Hamptons Event Transportation</h1>
        <p class="hero__area" style="max-width:62ch">Chauffeured transportation for guests attending the Hamptons' marquee events — group shuttles, flight-tracked airport transfers for visitors, and local rides across the East End.</p>
        <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
          <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Get a Quote</button>
          <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
        </div>
      </div></div>
    </section>`,
    trustStrip(),
    providesSection(),
    `
    <section class="section" aria-labelledby="ev-list-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Events We Serve</span><h2 id="ev-list-title">Upcoming Hamptons Events</h2><p class="text-secondary">Chauffeured transportation for guests attending the East End's signature events. Aura Hamptons is an independent car service, not an official event shuttle.</p></div>
        <ul class="event-grid">${EVENTS.map(eventCard).join("")}
        </ul>
      </div>
    </section>`,
    contactSection(),
  ].join("\n");

  return {
    path: "/events/",
    title: "Events",
    titleFull: "Hamptons Event Transportation | Aura Hamptons",
    description,
    bodyClass: "page-events page-group-transfers",
    jsonLd: [
      {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}/events/#listing`,
        name: "Hamptons Event Transportation",
        url: `${ORIGIN}/events/`,
        description,
        mainEntity: { "@type": "ItemList", numberOfItems: EVENTS.length, itemListElement: EVENTS.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: `${e.name} Transportation`, url: `${ORIGIN}${e.path}` })) },
      },
      { ...breadcrumbJsonLd(DEFAULT_SITE_URL, trail), "@id": `${ORIGIN}/events/#breadcrumb` },
    ],
    main,
  };
}

/* ---- Individual event pages ------------------------------------------- */
function offerSection(name) {
  const cards = [
    { icon: "users", title: "Group Transportation", desc: `Sprinter Vans, Mini Buses, and Motor Coaches to move your group to the ${name}.`, href: "/services/group-transfers/" },
    { icon: "plane", title: "Airport Transfers", desc: "Flight-tracked transfers for visiting guests from JFK, LGA, EWR, ISP, FOK, and HTO.", href: "/services/airport-transfers/" },
    { icon: "clock", title: "Hourly Chauffeur", desc: "A dedicated chauffeur by the hour for multi-stop days and evenings out.", href: "/services/hourly-chauffeur/" },
    { icon: "pin", title: "Local Car Service", desc: "Door-to-door rides across the Hamptons and the East End.", modal: true },
    { icon: "route", title: "NYC Trips", desc: "Direct transfers between the Hamptons and Manhattan or the boroughs.", modal: true },
    { icon: "calendar", title: "Multi-Day Coverage", desc: `Transportation across the full run of the ${name}.`, modal: true },
  ];
  const html = cards.map((c) => cbox({
    cls: "ap-why",
    lead: `<span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>`,
    title: c.title, titleTag: "h3", titleCls: "ap-why__title",
    act: c.href ? { href: c.href } : { modal: {} }, cue: c.href ? "Learn more" : "Get a quote",
    bodyHtml: `<p class="ap-card__desc">${esc(c.desc)}</p>`,
  })).join("");
  return `
    <section class="section section--alt" aria-labelledby="ev-offer-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Transportation</span><h2 id="ev-offer-title">Getting to the ${esc(name)}</h2><p class="text-secondary">Transportation options for guests attending — groups, airports, and local rides.</p></div>
        <ul class="ap-grid ap-grid--why">${html}
        </ul>
      </div>
    </section>`;
}

function exploreSection(currentSlug) {
  const others = EVENTS.filter((e) => e.slug !== currentSlug).map((e) => ({
    href: e.path, icon: "calendar", title: `${e.name} Transportation`, desc: EVENT_META[e.slug].blurb,
  }));
  const items = [
    ...others,
    { href: "/events/", icon: "grid", title: "All Hamptons Events", desc: "Event transportation across the East End's signature events." },
    { href: "/services/group-transfers/", icon: "users", title: "Group Transfers", desc: "Shuttles and group vehicles for events and large parties." },
  ];
  const cards = items.map((c) => cbox({
    cls: "ap-why",
    lead: `<span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>`,
    title: c.title, titleTag: "h3", titleCls: "ap-why__title",
    act: { href: c.href }, cue: "Open",
    bodyHtml: `<p class="ap-card__desc">${esc(c.desc)}</p>`,
  })).join("");
  return `
    <section class="section" aria-labelledby="ev-explore-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Plan the Trip</span><h2 id="ev-explore-title">Explore Other Events</h2></div>
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

function renderEvent(slug) {
  const e = bySlug(EVENTS, slug);
  const m = EVENT_META[slug];
  const name = e.name;
  const url = e.path;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events/" },
    { name: `${name} Transportation`, path: url },
  ];
  const description = `${name} transportation — chauffeured group shuttles, airport transfers, and local rides for guests attending the ${name} (${m.locationLabel}). ${m.status === "confirmed" ? m.dateLabel + "." : "2027 dates to be announced."} Available ${SITE.hours}.`;
  const checks = [
    "Group shuttles and vehicles for your party",
    "Flight-tracked airport transfers for visiting guests",
    "Local, door-to-door Hamptons car service",
    "Professional chauffeurs, available 24/7",
  ].map((t) => `<li><span class="gt-split__check" aria-hidden="true">${CHECK}</span>${esc(t)}</li>`).join("\n            ");
  const dateBadge = m.status === "confirmed"
    ? `<p class="event-detail__date"><span class="event-detail__date-ico" aria-hidden="true">${icon("calendar", { size: 16 })}</span><strong>${esc(m.dateLabel)}</strong></p>`
    : `<p class="event-detail__date event-detail__date--tba"><span class="event-detail__date-ico" aria-hidden="true">${icon("calendar", { size: 16 })}</span><strong>${esc(m.dateLabel)}</strong></p>`;

  const main = [
    breadcrumb(trail),
    pageHero({
      eyebrow: "Hamptons Events",
      h1: `${name} Transportation`,
      lede: `Chauffeured transportation for guests attending the ${name} — group shuttles, airport transfers, and local rides. ${m.status === "confirmed" ? m.dateLabel + ", at the " + m.venueName + "." : "2027 dates to be announced."}`,
      image: HERO,
      features: [
        { icon: "calendar", label: m.status === "confirmed" ? m.dateLabel : "2027 dates TBA" },
        { icon: "pin", label: m.locationLabel },
        { icon: "users", label: "Group & shuttle transport" },
        { icon: "clock", label: "Available 24/7" },
      ],
    }),
    trustStrip(),
    `
    <section class="section gt-split-sec" aria-labelledby="ev-about-title">
      <div class="container gt-split">
        <div class="gt-split__content">
          <span class="eyebrow">About the Event</span>
          <h2 id="ev-about-title">The ${esc(name)}</h2>
          ${dateBadge}
          <p class="event-detail__venue"><span class="event-detail__date-ico" aria-hidden="true">${icon("pin", { size: 16 })}</span>${esc(m.venueName)}${m.status === "confirmed" ? ` — ${esc(m.address)}` : ""}</p>
          ${m.about.map((pp) => `<p class="text-secondary">${esc(pp)}</p>`).join("\n          ")}
          <ul class="gt-split__checks">
            ${checks}
          </ul>
          <div class="gt-split__cta">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Get a Quote</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
        <figure class="gt-split__media page-event__media" aria-hidden="true">
          <span class="gt-split__accent"></span><span class="gt-split__accent gt-split__accent--br"></span>
          <span class="page-event__media-ico">${icon("calendar", { size: 46 })}</span>
        </figure>
      </div>
    </section>`,
    glanceSection({ glanceHeading: m.glanceHeading, glance: m.glance, glanceNote: m.glanceNote }),
    offerSection(name),
    fleetSection({ variant: "home", intro: m.fleetIntro }),
    planningSection({ planning: m.planning }),
    pAirports(m.airportsSection),
    pRoutes({ ...m.routes, eyebrow: "Popular Routes" }),
    groupAreas(m.areasSection),
    groupDetail({ introEyebrow: "Why Choose Aura", introHeading: m.commitmentHeading, detailIntro: m.commitmentIntro, detailCards: COMMITMENT_CARDS, detailCta: "Get a Quote" }),
    faqAccordion({ faqs: m.faqs, lede: `Answers to common questions about transportation for the ${name}.` }),
    exploreSection(slug),
  ].join("\n");

  // Event JSON-LD only when the date AND location are verified (confirmed
  // events). TBA events omit it rather than emit incomplete structured data.
  const eventLd = m.event
    ? [{
        "@type": "Event",
        "@id": `${ORIGIN}${url}#event`,
        name: m.event.name,
        startDate: m.event.startDate,
        endDate: m.event.endDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: m.event.place.name,
          address: { "@type": "PostalAddress", streetAddress: m.event.place.street, addressLocality: m.event.place.city, addressRegion: m.event.place.region, postalCode: m.event.place.postal, addressCountry: "US" },
        },
      }]
    : [];

  return {
    path: url,
    title: `${name} Transportation`,
    titleFull: `${name} Transportation | Aura Hamptons`,
    description,
    bodyClass: "page-event page-group-transfers",
    jsonLd: [
      {
        "@type": "Service",
        "@id": `${ORIGIN}${url}#service`,
        name: `${name} Transportation`,
        serviceType: "Event transportation",
        description,
        provider: { "@id": `${ORIGIN}/#business` },
        areaServed: { "@type": "Place", name: `${m.locationLabel}` },
      },
      ...eventLd,
      { ...breadcrumbJsonLd(DEFAULT_SITE_URL, trail), "@id": `${ORIGIN}${url}#breadcrumb` },
      { ...faqJsonLd(m.faqs), "@id": `${ORIGIN}${url}#faq` },
    ],
    preFooterCta: { eyebrow: "Reserve Event Transportation", heading: `Ready to Book ${name} Transportation?`, sub: `Group shuttles, airport transfers, and local rides for guests attending the ${name}, ${SITE.hours}.` },
    main,
  };
}

export function eventPages() {
  return EVENTS.map((e) => renderEvent(e.slug));
}

void eventUrl;
