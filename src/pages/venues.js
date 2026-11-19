/**
 * Venues — a master listing (/venues/) plus one premium detail page per venue
 * under /services/<slug>-car-service/. Rebuilt for Aura Hamptons on the
 * approved Group Transfers premium design (page-group-transfers).
 *
 * Content is strictly factual (what the venue is, where it is, and that we
 * provide chauffeured car service to/from it). No partnerships, preferred-
 * provider claims, endorsements, or unverified arrangements. Venue names and
 * locations are verified public facts.
 *
 * The six venues come from config.VENUES (SSOT); per-venue copy + category live
 * in VENUE_META here. VENUE_CARDS is consumed by the /services/ landing.
 */

import { SITE, DEFAULT_SITE_URL, breadcrumbJsonLd, faqJsonLd, CAPACITY, VENUES, bySlug } from "../config.js";
import { esc, btnIcon } from "../templates/partials.js";
import { icon } from "../templates/icons.js";
import { breadcrumb, pageHero, fleetSection, faqAccordion, contactSection, cbox } from "./_sections.js";
import { glanceSection, planningSection, groupDetail, groupAreas, pAirports, pRoutes, COMMITMENT_CARDS } from "./service-spokes.js";

const ORIGIN = DEFAULT_SITE_URL.replace(/\/+$/, "");
const HERO = "/assets/img/hero/hamptons-hero";
const CHECK = icon("check", { size: 13 });
const venueUrl = (slug) => `/services/${slug}-car-service/`;

/* Per-venue factual content + master-page category. Location verified. */
const GOLF_CONSIDERATIONS = (name) => ({
  intro: `A few things we handle for trips to ${name}:`,
  points: [
    { icon: "pin", title: "Entrance pickup & drop-off", desc: `We coordinate pickup and drop-off at the ${name} entrance on your schedule.` },
    { icon: "users", title: "Member, guest & tournament travel", desc: "Transportation for visiting members and their guests, plus group travel for tournaments and events." },
    { icon: "luggage", title: "Room for golf bags", desc: "Luxury SUVs and larger vehicles with space for clubs and luggage." },
  ],
});

const VENUE_META = {
  "shinnecock-hills": {
    category: "Golf Clubs", location: "Southampton, NY", town: "Southampton",
    blurb: "Historic championship golf club and U.S. Open host in Southampton.",
    about: [
      "Shinnecock Hills Golf Club, in Southampton, is one of the oldest golf clubs in the United States and a storied U.S. Open venue.",
      "Aura Hamptons provides chauffeured car service to and from Shinnecock Hills — flight-tracked airport transfers for visiting members and guests, local rides within Southampton, and group transportation for tournaments and events.",
    ],
    glanceNote: "Shinnecock Hills Golf Club is in Southampton, on the East End. Aura Hamptons provides independent chauffeured car service to and from the club — not affiliated with or endorsed by the club.",
    considerations: GOLF_CONSIDERATIONS("Shinnecock Hills"),
    faqs: [
      { q: "Do you provide car service to Shinnecock Hills Golf Club?", a: "Yes. Aura Hamptons provides chauffeured car service to and from Shinnecock Hills in Southampton — airport transfers, local rides, and group transportation. We are an independent car service, not affiliated with the club." },
      { q: "Can you handle group transportation for a tournament?", a: `Yes. We offer Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach for group travel and event shuttles.` },
      { q: "Do your vehicles have room for golf bags?", a: "Yes. Our Luxury SUVs and larger vehicles have room for clubs and luggage — tell us your group and gear when you book." },
      { q: "Do you offer airport transfers to Shinnecock Hills?", a: "Yes. We provide flight-tracked transfers between the club and JFK, LGA, EWR, ISP, FOK, and HTO." },
      { q: "Where is Shinnecock Hills?", a: "In Southampton, on the East End of Long Island." },
    ],
  },
  "national-golf-links": {
    category: "Golf Clubs", location: "Southampton, NY", town: "Southampton",
    blurb: "Celebrated private golf club overlooking Great Peconic Bay in Southampton.",
    about: [
      "The National Golf Links of America, in Southampton, is a celebrated private club overlooking Great Peconic Bay and consistently ranked among the country's finest courses.",
      "We provide chauffeured transportation to and from National Golf Links — airport transfers, local Southampton rides, and coordinated group travel for visiting players and guests.",
    ],
    glanceNote: "The National Golf Links of America is in Southampton, overlooking Great Peconic Bay. Aura Hamptons provides independent chauffeured car service to and from the club — not affiliated with or endorsed by the club.",
    considerations: GOLF_CONSIDERATIONS("National Golf Links"),
    faqs: [
      { q: "Do you provide car service to the National Golf Links of America?", a: "Yes. Aura Hamptons provides chauffeured car service to and from National Golf Links in Southampton — airport transfers, local rides, and group transportation. We are an independent car service, not affiliated with the club." },
      { q: "Can you coordinate group travel for visiting players?", a: `Yes. We offer Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach for coordinated group travel.` },
      { q: "Do your vehicles have room for golf bags?", a: "Yes. Our Luxury SUVs and larger vehicles have room for clubs and luggage." },
      { q: "Do you offer airport transfers to National Golf Links?", a: "Yes. We provide flight-tracked transfers between the club and JFK, LGA, EWR, ISP, FOK, and HTO." },
      { q: "Where is National Golf Links?", a: "In Southampton, overlooking Great Peconic Bay on the East End." },
    ],
  },
  "maidstone-club": {
    category: "Golf Clubs", location: "East Hampton, NY", town: "East Hampton",
    blurb: "Historic private club in East Hampton with links golf, tennis, and an oceanfront setting.",
    about: [
      "The Maidstone Club, in East Hampton, is a historic private club known for its links golf, tennis, and oceanfront setting.",
      "Aura Hamptons provides door-to-door car service to and from The Maidstone Club — airport transfers, local East Hampton rides, and group transportation for events.",
    ],
    glanceNote: "The Maidstone Club is in East Hampton, with links golf and an oceanfront setting. Aura Hamptons provides independent chauffeured car service to and from the club — not affiliated with or endorsed by the club.",
    considerations: GOLF_CONSIDERATIONS("The Maidstone Club"),
    faqs: [
      { q: "Do you provide car service to The Maidstone Club?", a: "Yes. Aura Hamptons provides door-to-door car service to and from The Maidstone Club in East Hampton — airport transfers, local rides, and group transportation. We are an independent car service, not affiliated with the club." },
      { q: "Can you handle group transportation for an event?", a: `Yes. We offer Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach for group travel and event shuttles.` },
      { q: "Do your vehicles have room for golf bags?", a: "Yes. Our Luxury SUVs and larger vehicles have room for clubs and luggage." },
      { q: "Do you offer airport transfers to The Maidstone Club?", a: "Yes. We provide flight-tracked transfers between the club and JFK, LGA, EWR, ISP, FOK, and HTO." },
      { q: "Where is The Maidstone Club?", a: "In East Hampton, on the East End of Long Island." },
    ],
  },
  "wolffer-estate": {
    category: "Vineyards", location: "Sagaponack, NY", town: "Sagaponack",
    blurb: "Renowned vineyard and winery in Sagaponack, celebrated for its rosé and tasting room.",
    about: [
      "Wölffer Estate Vineyard, in Sagaponack, is a renowned winery celebrated for its rosé, its tasting room, and its stables.",
      "We provide chauffeured transportation to and from Wölffer Estate — wine-tour transportation with a designated chauffeur, local rides, airport transfers, and group travel for celebrations.",
    ],
    glanceNote: "Wölffer Estate Vineyard is in Sagaponack. Aura Hamptons provides a designated chauffeur for your visit — wine-tour transportation, multi-stop days, and celebrations.",
    considerations: {
      intro: "A few things we handle for trips to Wölffer Estate:",
      points: [
        { icon: "shield", title: "Designated chauffeur", desc: "A professional chauffeur for your visit, so no one in your group has to drive." },
        { icon: "route", title: "Multi-stop wine days", desc: "Add other East End wineries and stops to build a full tasting day." },
        { icon: "calendar", title: "Celebrations & groups", desc: "Transportation for birthdays, bachelorette parties, and group outings." },
      ],
    },
    faqs: [
      { q: "Do you provide transportation to Wölffer Estate?", a: "Yes. Aura Hamptons provides chauffeured transportation to and from Wölffer Estate in Sagaponack — with a designated chauffeur for wine-country days, plus airport transfers and local rides." },
      { q: "Do you provide a designated chauffeur for wine tours?", a: "Yes. A professional chauffeur handles the driving so everyone in your group can enjoy the tastings." },
      { q: "Can you plan a multi-winery day?", a: "Yes. We can build a day across Wölffer Estate and other East End wineries — tell us the stops you'd like." },
      { q: "Can you handle a celebration or group outing?", a: `Yes. From Executive Sedans and Luxury SUVs to a ${CAPACITY.coach.paxMax}-passenger Motor Coach, we size the vehicle to your party.` },
      { q: "Where is Wölffer Estate?", a: "In Sagaponack, on the East End of Long Island." },
    ],
  },
  "bridgehampton-polo": {
    category: "Polo & Equestrian", location: "Bridgehampton, NY", town: "Bridgehampton",
    blurb: "Home of summer polo matches in Bridgehampton.",
    about: [
      "Bridgehampton Polo Club is the home of summer polo in Bridgehampton, drawing crowds to its match days.",
      "Aura Hamptons provides chauffeured car service to and from Bridgehampton Polo — airport transfers, local rides, and group and shuttle transportation for match-day guests.",
    ],
    glanceNote: "Bridgehampton Polo Club hosts summer polo in Bridgehampton. Aura Hamptons provides match-day group shuttles and local transportation — not affiliated with or endorsed by the club.",
    considerations: {
      intro: "A few things we handle for trips to Bridgehampton Polo:",
      points: [
        { icon: "users", title: "Match-day group shuttles", desc: "Group vehicles and shuttles for match-day guests during the summer polo season." },
        { icon: "pin", title: "Entrance pickup & drop-off", desc: "We coordinate pickup and drop-off at the entrance on your schedule." },
        { icon: "car", title: "Every vehicle class", desc: `From Executive Sedans to a ${CAPACITY.coach.paxMax}-passenger Motor Coach, sized to your party.` },
      ],
    },
    faqs: [
      { q: "Do you provide car service to Bridgehampton Polo?", a: "Yes. Aura Hamptons provides chauffeured car service to and from Bridgehampton Polo — match-day shuttles, airport transfers, and local rides. We are an independent car service, not affiliated with the club." },
      { q: "Do you run match-day group shuttles?", a: `Yes. We offer Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach for match-day group transportation during the summer polo season.` },
      { q: "Do you offer airport transfers to Bridgehampton?", a: "Yes. We provide flight-tracked transfers between Bridgehampton and JFK, LGA, EWR, ISP, FOK, and HTO." },
      { q: "Can you pick up a group and keep everyone together?", a: "Yes. One group vehicle keeps your party together to and from the match." },
      { q: "Where is Bridgehampton Polo?", a: "In Bridgehampton, on the East End of Long Island." },
    ],
  },
  "montauk-yacht-club": {
    category: "Yacht Clubs & Resorts", location: "Montauk, NY", town: "Montauk",
    blurb: "Waterfront yacht club and resort on Montauk's Star Island.",
    about: [
      "Montauk Yacht Club is a waterfront yacht club and resort on Montauk's Star Island, with a marina and harbor views.",
      "We provide chauffeured transportation to and from Montauk Yacht Club — long-distance airport transfers to the East End, local Montauk rides, and group transportation for events.",
    ],
    glanceNote: "Montauk Yacht Club is on Star Island in Montauk, the easternmost point on Long Island. Aura Hamptons handles the full long-distance run from New York City and the airports.",
    considerations: {
      intro: "A few things we handle for trips to Montauk Yacht Club:",
      points: [
        { icon: "route", title: "Long-distance transfers", desc: "Montauk is the easternmost point on Long Island; we handle the full run from New York City and the airports." },
        { icon: "pin", title: "Marina & resort pickup", desc: "We coordinate pickup and drop-off at the club on your schedule." },
        { icon: "users", title: "Group & event transport", desc: "Group vehicles for weddings, events, and gatherings at the club." },
      ],
    },
    faqs: [
      { q: "Do you provide car service to Montauk Yacht Club?", a: "Yes. Aura Hamptons provides chauffeured transportation to and from Montauk Yacht Club — long-distance airport transfers, local Montauk rides, and group transportation for events." },
      { q: "How do you handle the distance to Montauk?", a: "Montauk is the easternmost point on Long Island, so we plan the full long-distance run from New York City and the airports, timed around traffic." },
      { q: "Do you offer airport transfers to Montauk Yacht Club?", a: "Yes. We provide flight-tracked transfers between Montauk and JFK, LGA, EWR, ISP, FOK, and HTO." },
      { q: "Can you handle group transportation for an event at the club?", a: `Yes. We offer Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach for weddings, events, and gatherings.` },
      { q: "Where is Montauk Yacht Club?", a: "On Star Island in Montauk, on the far eastern end of Long Island." },
    ],
  },
};

const CATEGORY_ORDER = ["Golf Clubs", "Vineyards", "Polo & Equestrian", "Yacht Clubs & Resorts"];
const CATEGORY_LEDE = {
  "Golf Clubs": "Chauffeured car service to the East End's championship and private golf clubs.",
  "Vineyards": "Designated-chauffeur transportation to the Hamptons' vineyards and tasting rooms.",
  "Polo & Equestrian": "Match-day car service and group shuttles to the Hamptons' polo grounds.",
  "Yacht Clubs & Resorts": "Transfers to the East End's waterfront yacht clubs and resorts.",
};

const venueName = (slug) => bySlug(VENUES, slug)?.name || slug;

/* Lightweight list for the /services/ landing (imported by services.js). */
const VENUE_CARD_IMG = {
  "shinnecock-hills": "executive-suv", "national-golf-links": "executive-sedan", "maidstone-club": "executive-suv",
  "wolffer-estate": "executive-sedan", "bridgehampton-polo": "motor-coach", "montauk-yacht-club": "executive-suv",
};
export const VENUE_CARDS = VENUES.map((v) => ({
  slug: `${v.slug}-car-service`,
  url: venueUrl(v.slug),
  title: `${v.name} Car Service`,
  blurb: VENUE_META[v.slug]?.blurb || "",
  img: `/assets/img/fleet/${VENUE_CARD_IMG[v.slug] || "executive-suv"}`,
  alt: `Aura Hamptons car service to ${v.name}`,
}));

/* ---- Shared bits ------------------------------------------------------ */
function trustStrip() {
  const stats = [
    { icon: "users", num: "100+", label: "Happy Clients" },
    { icon: "clock", num: "24/7", label: "Concierge" },
    { icon: "shield", num: "15+", label: "Years of Excellence" },
  ];
  const items = stats.map((s) => `
            <li class="gt-trust2__stat"><span class="gt-trust2__ico" aria-hidden="true">${icon(s.icon, { size: 19 })}</span><span class="gt-trust2__num">${esc(s.num)}</span><span class="gt-trust2__label">${esc(s.label)}</span></li>`).join("");
  return `
    <section class="section gt-trust2-sec" aria-labelledby="vn-trust-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Why Clients Choose Aura</span><h2 id="vn-trust-title">A Premium Standard, Every Trip</h2><p class="text-secondary">Professional chauffeurs, meticulously maintained vehicles, and a concierge team available around the clock.</p></div>
        <div class="gt-trust2 card-surface">
          <ul class="gt-trust2__stats">${items}
          </ul>
        </div>
      </div>
    </section>`;
}

/* ---- Master page (/venues/) ------------------------------------------- */
function venueCard(v) {
  const m = VENUE_META[v.slug];
  const img = `/assets/img/fleet/${VENUE_CARD_IMG[v.slug] || "executive-suv"}`;
  return `
          <li class="venue-card card-surface cbox">
            <div class="venue-card__media" style="display:block">
              <span class="venue-card__cat" style="text-shadow:0 1px 4px rgba(0,0,0,0.7)">${esc(m.category)}</span>
              <picture style="display:block;width:100%;height:100%">
                <source type="image/webp" srcset="${img}-640.webp 640w, ${img}-1024.webp 1024w" sizes="(min-width:900px) 32vw, (min-width:560px) 46vw, 92vw">
                <img src="${img}-1024.jpg" srcset="${img}-640.jpg 640w, ${img}-1024.jpg 1024w" sizes="(min-width:900px) 32vw, (min-width:560px) 46vw, 92vw" alt="Aura Hamptons car service to ${esc(v.name)}" width="1024" height="576" loading="lazy" decoding="async" style="display:block;width:100%;height:100%;object-fit:cover">
              </picture>
            </div>
            <div class="venue-card__body">
              <h3 class="venue-card__title"><a class="cbox__action" href="${venueUrl(v.slug)}" aria-label="View details — ${esc(v.name)} car service" data-card-label="${esc(v.name)}">${esc(v.name)}</a></h3>
              <p class="venue-card__loc"><span class="venue-card__loc-ico" aria-hidden="true">${icon("pin", { size: 13 })}</span>${esc(m.location)}</p>
              <p class="venue-card__desc">${esc(m.blurb)}</p>
              <span class="cbox__cue" aria-hidden="true">View details &rarr;</span>
            </div>
          </li>`;
}

export function venuesPage() {
  const trail = [{ name: "Home", path: "/" }, { name: "Venues", path: "/venues/" }];
  const cats = CATEGORY_ORDER
    .map((cat) => ({ cat, list: VENUES.filter((v) => VENUE_META[v.slug]?.category === cat) }))
    .filter((g) => g.list.length);
  const sections = cats.map((g, i) => `
    <section class="section${i % 2 ? " section--alt" : ""}" aria-labelledby="vn-cat-${i}">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Venue Transportation</span><h2 id="vn-cat-${i}">${esc(g.cat)}</h2><p class="text-secondary">${esc(CATEGORY_LEDE[g.cat] || "")}</p></div>
        <ul class="venue-grid">${g.list.map(venueCard).join("")}
        </ul>
      </div>
    </section>`).join("\n");

  const description = "Hamptons venue transportation — chauffeured car service to the East End's premier golf clubs, vineyards, polo grounds, and yacht clubs. Airport transfers, local rides, and group shuttles, 24/7.";
  const main = [
    breadcrumb(trail),
    `
    <section class="hero hero--page hero--image page-venues__hero" aria-labelledby="vn-hero-title">
      <picture class="hero__bg" aria-hidden="true">
        <source type="image/webp" srcset="${HERO}-640.webp 640w, ${HERO}-1024.webp 1024w, ${HERO}-1500.webp 1500w" sizes="100vw">
        <img src="${HERO}-1500.jpg" srcset="${HERO}-640.jpg 640w, ${HERO}-1024.jpg 1024w, ${HERO}-1500.jpg 1500w" sizes="100vw" alt="" width="1500" height="844" fetchpriority="high" decoding="async">
      </picture>
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="container"><div>
        <p class="hero__eyebrow">Venue Transportation</p>
        <h1 id="vn-hero-title">Car Service to the Hamptons' Premier Venues</h1>
        <p class="hero__area" style="max-width:62ch">Aura Hamptons provides chauffeured transportation to and from the East End's best-known golf clubs, vineyards, polo grounds, and yacht clubs — airport transfers, local rides, and group shuttles for events.</p>
        <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
          <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Get a Quote</button>
          <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
        </div>
      </div></div>
    </section>`,
    trustStrip(),
    providesSection(),
    sections,
    contactSection(),
  ].join("\n");

  return {
    path: "/venues/",
    title: "Venues",
    titleFull: "Hamptons Venue Transportation | Aura Hamptons",
    description,
    bodyClass: "page-venues page-group-transfers",
    jsonLd: [
      {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}/venues/#listing`,
        name: "Hamptons Venue Transportation",
        url: `${ORIGIN}/venues/`,
        description,
        mainEntity: { "@type": "ItemList", numberOfItems: VENUES.length, itemListElement: VENUES.map((v, i) => ({ "@type": "ListItem", position: i + 1, name: `${v.name} Car Service`, url: `${ORIGIN}${venueUrl(v.slug)}` })) },
      },
      { ...breadcrumbJsonLd(DEFAULT_SITE_URL, trail), "@id": `${ORIGIN}/venues/#breadcrumb` },
    ],
    main,
  };
}

/* ---- Individual venue detail pages (/services/<slug>-car-service/) ----- */
function offerSection(name, town) {
  const cards = [
    { icon: "plane", title: "Airport Transfers", desc: `Flight-tracked car service between ${name} and JFK, LGA, EWR, ISP, FOK, and HTO.`, href: "/services/airport-transfers/" },
    { icon: "pin", title: "Local Car Service", desc: `Door-to-door rides around ${town} and the surrounding Hamptons.`, modal: true },
    { icon: "users", title: "Group & Event Transport", desc: `Sprinter Vans, Mini Buses, and Motor Coaches for groups and event shuttles to ${name}.`, href: "/services/group-transfers/" },
    { icon: "calendar", title: "Weddings & Celebrations", desc: `Wedding-party and celebration transportation to and from ${name}.`, href: "/services/wedding-transportation/" },
    { icon: "clock", title: "Hourly Chauffeur", desc: "A dedicated chauffeur by the hour for multi-stop days and events.", href: "/services/hourly-chauffeur/" },
    { icon: "route", title: "New York City Trips", desc: `Direct transfers between ${name} and Manhattan or the five boroughs.`, modal: true },
  ];
  const html = cards.map((c) => cbox({
    cls: "ap-why",
    lead: `<span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>`,
    title: c.title, titleTag: "h3", titleCls: "ap-why__title",
    act: c.href ? { href: c.href } : { modal: {} }, cue: c.href ? "Learn more" : "Get a quote",
    bodyHtml: `<p class="ap-card__desc">${esc(c.desc)}</p>`,
  })).join("");
  return `
    <section class="section section--alt" aria-labelledby="vn-offer-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Transportation</span><h2 id="vn-offer-title">Getting to ${esc(name)}</h2><p class="text-secondary">Chauffeured transportation to, from, and around ${esc(name)} — airports, local rides, and group travel.</p></div>
        <ul class="ap-grid ap-grid--why">${html}
        </ul>
      </div>
    </section>`;
}

function exploreSection(slug, category) {
  const others = VENUES.filter((v) => v.slug !== slug);
  const sameCat = others.filter((v) => VENUE_META[v.slug]?.category === category);
  const rest = others.filter((v) => VENUE_META[v.slug]?.category !== category);
  const picks = [...sameCat, ...rest].slice(0, 3);
  const items = [
    ...picks.map((v) => ({ href: venueUrl(v.slug), icon: "pin", title: `${v.name} Car Service`, desc: VENUE_META[v.slug]?.blurb || "" })),
    { href: "/venues/", icon: "grid", title: "All Hamptons Venues", desc: "Golf clubs, vineyards, polo grounds, and yacht clubs we drive." },
  ];
  const cards = items.map((c) => cbox({
    cls: "ap-why",
    lead: `<span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>`,
    title: c.title, titleTag: "h3", titleCls: "ap-why__title",
    act: { href: c.href }, cue: "Open",
    bodyHtml: `<p class="ap-card__desc">${esc(c.desc)}</p>`,
  })).join("");
  return `
    <section class="section" aria-labelledby="vn-explore-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Plan Your Visit</span><h2 id="vn-explore-title">Explore Other Venues</h2></div>
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

/** Short "venue transportation" intro for the master (between hero and grid). */
function providesSection() {
  const cards = [
    { icon: "plane", title: "Airport Transfers", desc: "Flight-tracked transfers for visiting members and guests from JFK, LGA, EWR, ISP, FOK, and HTO." },
    { icon: "users", title: "Group & Event Transport", desc: "Sprinter Vans, Mini Buses, and Motor Coaches for tournaments, matches, and celebrations." },
    { icon: "shield", title: "Designated Chauffeur", desc: "A professional chauffeur for wine-country days and nights out — no one in your group has to drive." },
  ].map((c) => cbox({
    cls: "ap-why",
    lead: `<span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>`,
    title: c.title, titleTag: "h3", titleCls: "ap-why__title",
    act: { modal: {} }, cue: "Get a quote",
    bodyHtml: `<p class="ap-card__desc">${esc(c.desc)}</p>`,
  })).join("");
  return `
    <section class="section" aria-labelledby="vn-provide-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Venue Transportation</span><h2 id="vn-provide-title">What We Provide at Every Venue</h2><p class="text-secondary">Chauffeured car service to and from the East End's premier venues — Aura Hamptons is an independent car service, not affiliated with the venues listed here.</p></div>
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

function venueFaqs(name, town) {
  return [
    { q: `Do you provide car service to ${name}?`, a: `Yes. Aura Hamptons provides chauffeured car service to and from ${name} in ${town} — airport transfers, local rides, and group transportation.` },
    { q: `Where is ${name}?`, a: `${name} is in ${town}, on the East End of Long Island.` },
    { q: `Can you handle group transportation for an event at ${name}?`, a: `Yes. We offer Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach for group transportation and event shuttles to ${name}.` },
    { q: `Do you offer airport transfers to ${name}?`, a: `Yes. We provide flight-tracked transfers between ${name} and JFK, LGA, EWR, ISP, FOK, and HTO.` },
    { q: `Is car service to ${name} available 24/7?`, a: `Yes. Aura Hamptons operates ${SITE.hours}, including holidays.` },
  ];
}

/* ---- Venue premium section helpers (reuse the master builders with
   venue-specific, factual, town/category-derived content) --------------- */
const vehLine = `From an Executive Sedan up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach`;

function venueGlance(name, town) {
  return {
    glanceHeading: `${name} Car Service at a Glance`,
    glance: [
      { label: "Airport transfers", desc: "Flight-tracked service from JFK, LGA, EWR, ISP, FOK, and HTO." },
      { label: "Capacity", desc: `${vehLine} for groups.` },
      { label: "Service area", desc: `${town} and across the Hamptons.` },
      { label: "Book ahead", desc: "Reserve ahead for event days — group vehicles book up fast." },
      { label: "Availability", desc: `Chauffeured service ${SITE.hours}.` },
    ],
  };
}

function venuePlanning(name, town) {
  return { planning: {
    eyebrow: "Planning & Booking",
    heading: `Planning Your Trip to ${name}`,
    body: `Tell us your pickup, destination, and timing, and we'll match the right vehicle and plan your trip to ${name} in ${town}.`,
    points: [
      "Share your pickup, destination, and timing",
      "Flight-tracked airport pickups for visiting guests",
      `Local, door-to-door rides around ${town}`,
      "The right vehicle for your party and luggage",
    ],
  } };
}

function venueRoutes(town) {
  return {
    eyebrow: "Popular Routes",
    heading: `Popular Routes to ${town}`,
    intro: `Our most-requested transfers to ${town}. Tap one to prefill your quote.`,
    items: [`JFK ⇄ ${town}`, `LGA ⇄ ${town}`, `EWR ⇄ ${town}`, `NYC ⇄ ${town}`, `Manhattan ⇄ ${town}`, `Brooklyn ⇄ ${town}`],
  };
}

const venueAirports = (name, town) => ({ heading: `Airports We Serve for ${name}`, intro: `Flight-tracked car service from every New York-area airport to ${town} and ${name}. Tap any airport to book.` });
const venueAreas = (town) => ({ heading: `Serving ${town} & the East End`, intro: `Door-to-door chauffeured car service across ${town} and every Hamptons village — tap your area to start a quote.` });

const FLEET_INTRO = {
  "Golf Clubs": (name) => `Move your group to ${name} together — Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach, plus Executive Sedans and Luxury SUVs with room for golf bags.`,
  "Vineyards": (name) => `A designated chauffeur for your day at ${name} — Executive Sedans and Luxury SUVs for couples and small groups, up to Sprinter Vans and a Motor Coach for larger parties.`,
  "Polo & Equestrian": (name) => `Keep your group together for ${name} — Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach, plus Executive Sedans and Luxury SUVs for smaller parties.`,
  "Yacht Clubs & Resorts": (name) => `Travel to ${name} in comfort — Executive Sedans and Luxury SUVs for the long run east, up to Sprinter Vans and a Motor Coach for groups and events.`,
};
const venueFleetIntro = (name, category) => (FLEET_INTRO[category] || FLEET_INTRO["Golf Clubs"])(name);

function considerationsSection(name, c) {
  if (!c) return "";
  const cards = c.points.map((p) => cbox({
    cls: "ap-why",
    lead: `<span class="ap-card__ico" aria-hidden="true">${icon(p.icon, { size: 22 })}</span>`,
    title: p.title, titleTag: "h3", titleCls: "ap-why__title",
    act: { modal: {} }, cue: "Get a quote",
    bodyHtml: `<p class="ap-card__desc">${esc(p.desc)}</p>`,
  })).join("");
  return `
    <section class="section" aria-labelledby="vn-consider-title">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Good to Know</span><h2 id="vn-consider-title">Transportation to ${esc(name)}</h2><p class="text-secondary">${esc(c.intro)}</p></div>
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

function renderVenue(slug) {
  const v = bySlug(VENUES, slug);
  const m = VENUE_META[slug];
  const name = v.name;
  const url = venueUrl(slug);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Venues", path: "/venues/" },
    { name: `${name} Car Service`, path: url },
  ];
  const faqs = m.faqs || venueFaqs(name, m.town);
  const description = `Car service to ${name} in ${m.town} — chauffeured airport transfers, local Hamptons rides, and group transportation to and from ${name}. Available ${SITE.hours}.`;
  const aboutChecks = [
    `Flight-tracked airport transfers to and from ${name}`,
    `Local, door-to-door car service in ${m.town}`,
    "Group vehicles and event shuttles",
    "Professional chauffeurs, available 24/7",
  ].map((t) => `<li><span class="gt-split__check" aria-hidden="true">${CHECK}</span>${esc(t)}</li>`).join("\n            ");

  const main = [
    breadcrumb(trail),
    pageHero({
      eyebrow: m.category,
      h1: `Car Service to ${name}`,
      lede: `${m.blurb} Aura Hamptons provides chauffeured transportation to and from ${name} in ${m.location} — airport transfers, local rides, and group travel, ${SITE.hours}.`,
      image: HERO,
      features: [
        { icon: "pin", label: m.location },
        { icon: "plane", label: "Flight-tracked airport transfers" },
        { icon: "users", label: "Group & event transport" },
        { icon: "clock", label: "Available 24/7" },
      ],
    }),
    trustStrip(),
    `
    <section class="section gt-split-sec" aria-labelledby="vn-about-title">
      <div class="container gt-split">
        <div class="gt-split__content">
          <span class="eyebrow">About the Venue</span>
          <h2 id="vn-about-title">${esc(name)}, ${esc(m.town)}</h2>
          ${m.about.map((pp) => `<p class="text-secondary">${esc(pp)}</p>`).join("\n          ")}
          <ul class="gt-split__checks">
            ${aboutChecks}
          </ul>
          <div class="gt-split__cta">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Get a Quote</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
        <figure class="gt-split__media page-venue__media" aria-hidden="true">
          <span class="gt-split__accent"></span><span class="gt-split__accent gt-split__accent--br"></span>
          <span class="page-venue__media-ico">${icon("pin", { size: 46 })}</span>
        </figure>
      </div>
    </section>`,
    glanceSection({ ...venueGlance(name, m.town), glanceNote: m.glanceNote }),
    offerSection(name, m.town),
    fleetSection({ variant: "home", intro: venueFleetIntro(name, m.category) }),
    planningSection(venuePlanning(name, m.town)),
    pAirports(venueAirports(name, m.town)),
    pRoutes(venueRoutes(m.town)),
    groupAreas(venueAreas(m.town)),
    considerationsSection(name, m.considerations),
    groupDetail({
      introEyebrow: "Why Choose Aura",
      introHeading: `Why Choose Aura for ${name}`,
      detailIntro: `Professional chauffeurs, meticulously maintained vehicles, and reliable, door-to-door service to and from ${name}.`,
      detailCards: COMMITMENT_CARDS,
      detailCta: "Get a Quote",
    }),
    faqAccordion({ faqs, lede: `Answers to common questions about car service to ${name}.` }),
    exploreSection(slug, m.category),
  ].join("\n");

  return {
    path: url,
    title: `${name} Car Service`,
    titleFull: `${name} Car Service (${m.town}, NY) | Aura Hamptons`,
    description,
    bodyClass: `page-venue page-group-transfers`,
    jsonLd: [
      {
        "@type": "Service",
        "@id": `${ORIGIN}${url}#service`,
        name: `${name} Car Service`,
        serviceType: "Venue transportation",
        description,
        provider: { "@id": `${ORIGIN}/#business` },
        areaServed: { "@type": "Place", name: `${name}, ${m.town}, NY` },
      },
      { ...breadcrumbJsonLd(DEFAULT_SITE_URL, trail), "@id": `${ORIGIN}${url}#breadcrumb` },
      { ...faqJsonLd(faqs), "@id": `${ORIGIN}${url}#faq` },
    ],
    preFooterCta: { eyebrow: "Reserve Venue Transportation", heading: `Ready to Book Car Service to ${name}?`, sub: `Airport transfers, local rides, and group transportation to and from ${name}, ${SITE.hours}.` },
    main,
  };
}

export function venuePages() {
  return VENUES.map((v) => renderVenue(v.slug));
}

void venueName;
