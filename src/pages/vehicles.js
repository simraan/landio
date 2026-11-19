/**
 * Vehicle detail pages — one per fleet vehicle (five classes):
 * /fleet/executive-sedan/, /fleet/luxury-suv/, /fleet/sprinter-van/,
 * /fleet/mini-bus/, /fleet/motor-coach/. Each page: breadcrumb, hero with
 * inline quote, a vehicle spotlight (image + specs + amenities), "best for"
 * cross-links, and an FAQ. Product + Breadcrumb + FAQPage JSON-LD. Each page
 * has a unique H1, title, and body.
 */

import { SITE, faqJsonLd, breadcrumbJsonLd, DEFAULT_SITE_URL, CAPACITY, paxLabel } from "../config.js";
import { esc, btnIcon, quoteForm, fleetPicture } from "../templates/partials.js";
import { breadcrumb, faqSection, contactSection, cbox } from "./_sections.js";

const ic = (p) =>
  `<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const seat = ic('<path d="M6 19v-3h9a2 2 0 0 0 2-2V5M6 16a2 2 0 0 1-2-2V7"/>');
const bag = ic('<rect x="6" y="8" width="12" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>');
const check = `<span class="about-check"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-11"/></svg></span>`;

function hero(data) {
  return `
    <section class="hero hero--page">
      <div class="container hero__grid">
        <div>
          <p class="hero__eyebrow">${esc(data.eyebrow)}</p>
          <h1>${esc(data.h1)}</h1>
          <p class="hero__area" style="max-width:60ch">${esc(data.lede)}</p>
          <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Book This Vehicle</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("call")}Call Now ${esc(SITE.phone.display)}</a>
          </div>
        </div>
        ${quoteForm("vehicle-quote", { heading: "Reserve Your Vehicle", location: data.url })}
      </div>
    </section>`;
}

function spotlight(v, data) {
  const amenities = [
    "Complimentary Wi-Fi",
    "Climate control",
    "Bottled water",
    "Phone charging",
    "Privacy & discretion",
    "Professional chauffeur",
    "Flight tracking (airport trips)",
  ];
  return `
    <section class="section section--alt" aria-labelledby="veh-spot">
      <div class="container vehicle-spotlight">
        ${cbox({ tag: "figure", cls: "vehicle-spotlight__media card-surface", lead: `${fleetPicture(v, { alt: `${v.name} — Landio Limo Services`, sizes: "(min-width: 860px) 55vw, 100vw", width: 820, height: 520 })}`, titleTag: "figcaption", titleCls: "vehicle-spotlight__cap",
          title: `Book the ${v.name}`, act: { modal: { vehicle: v.name } }, cue: "Get a quote" })}
        <div class="vehicle-spotlight__body">
          <span class="eyebrow">Vehicle Details</span>
          <h2 id="veh-spot">${esc(v.name)}</h2>
          <p class="text-secondary">${esc(data.body)}</p>
          <p class="text-secondary">Flying in or out? See our <a href="/services/airport-transfers/">${esc(data.hubAnchor)}</a> page for the airports we serve and flight tracking.</p>
          <ul class="fleet-stats fleet-stats--lg">
            <li>${seat}<strong>${v.seats}</strong>&nbsp;seats</li>
            ${v.bags ? `<li>${bag}<strong>${v.bags}</strong>&nbsp;luggage</li>` : ""}
          </ul>
          <ul class="about-checks" style="margin-top:1.25rem">
            ${amenities.map((a) => `<li>${check}${esc(a)}</li>`).join("\n            ")}
          </ul>
          <div style="margin-top:1.5rem"><button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Book the ${esc(v.name)}</button></div>
        </div>
      </div>
    </section>`;
}

function bestFor(data) {
  return `
    <section class="section" aria-labelledby="veh-best">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Best For</span>
          <h2 id="veh-best">When to choose the ${esc(data.short)}</h2>
        </div>
        <ul class="feature-grid">
          ${data.bestFor
            .map(
              (b) => cbox({ cls: "feature-card card-surface", title: b.t, act: { modal: { vehicle: data.short } }, cue: `Book the ${data.short}`, bodyHtml: `<p>${esc(b.d)}</p>` })
            )
            .join("\n          ")}
        </ul>
      </div>
    </section>`;
}

function render(data) {
  const v = SITE.fleet.find((f) => f.slug === data.slug);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Fleet", path: "/fleet/" },
    { name: v.name, path: data.url },
  ];
  return {
    path: data.url,
    title: data.title,
    description: data.description,
    bodyClass: "page-vehicle",
    cluster: "fleet",
    card: { title: v.name, text: `${v.pax}${v.bags ? `, ${v.bags} bags` : ""}.`, icon: v.key === "sedan" || v.key === "suv" ? "car" : "van" },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: v.name,
        image: `${DEFAULT_SITE_URL}${v.image}`,
        description: data.description,
        brand: { "@type": "Brand", name: SITE.company },
        category: "Chauffeured vehicle",
      },
      breadcrumbJsonLd(DEFAULT_SITE_URL, trail),
      faqJsonLd(data.faqs),
    ],
    main: [
      breadcrumb(trail),
      hero(data),
      spotlight(v, data),
      bestFor(data),
      faqSection(data.faqs),
      contactSection(),
    ].join("\n"),
  };
}

const VEHICLES = [
  {
    slug: "executive-sedan",
    hubAnchor: "DC airport car service",
    url: "/fleet/executive-sedan/",
    title: "Executive Sedan",
    short: "Executive Sedan",
    eyebrow: "Executive Class",
    h1: "Executive Sedan Service in the DC Metro",
    lede: `Premium comfort and privacy for ${paxLabel(CAPACITY.sedan)} — the go-to vehicle for airport transfers and executive travel.`,
    description:
      `Landio Executive Sedan — seats ${paxLabel(CAPACITY.sedan)} (${CAPACITY.sedan.bags} bags), ideal for DC-area airport transfers and executive travel. Chauffeured, punctual, and discreet.`,
    body: `Our Executive Sedan is the ideal choice for solo travelers, couples, and executives. It seats ${paxLabel(CAPACITY.sedan)} with room for luggage and delivers a quiet, comfortable ride for airport transfers, business meetings, and point-to-point trips across Washington, DC, Maryland, and Northern Virginia.`,
    bestFor: [
      { t: "Airport transfers", d: "One or two travelers heading to or from Dulles (IAD), Reagan National (DCA), or BWI with standard luggage." },
      { t: "Executive travel", d: "A polished, discreet ride for business meetings and client visits." },
      { t: "Point-to-point", d: "Comfortable trips across the DC metro, day or night." },
    ],
    faqs: [
      { q: "How many passengers fit in the Executive Sedan?", a: `The Executive Sedan seats ${paxLabel(CAPACITY.sedan)} comfortably with room for up to ${CAPACITY.sedan.bags} bags.` },
      { q: "Is the Executive Sedan good for airport runs?", a: `Yes — it's a strong choice for airport transfers for ${paxLabel(CAPACITY.sedan)} with standard luggage.` },
      { q: "Can I book the sedan by the hour?", a: "Yes. The Executive Sedan is available for hourly chauffeur service as well as point-to-point and airport trips." },
    ],
  },
  {
    slug: "luxury-suv",
    hubAnchor: "DC airport car service",
    url: "/fleet/luxury-suv/",
    title: "Luxury SUV",
    short: "Luxury SUV",
    eyebrow: "Space & Style",
    h1: "Luxury SUV Service in the DC Metro",
    lede: `A spacious luxury SUV for ${paxLabel(CAPACITY.suv)} with room for luggage — perfect for executives, families, and airport runs.`,
    description:
      `Landio Luxury SUV — seats ${paxLabel(CAPACITY.suv)} with ${CAPACITY.suv.bags} bags, ideal for DC-area executives, corporate groups, and airport transfers with extra luggage.`,
    body: `Our Luxury SUV combines space with style, seating ${paxLabel(CAPACITY.suv)} with generous luggage room. It's the right call for executives, small corporate groups, and travelers with extra bags heading to or from Dulles, Reagan National, and BWI, as well as a comfortable choice for a night out across the DC metro.`,
    bestFor: [
      { t: "Executive airport travel", d: `Up to ${CAPACITY.suv.paxMax} passengers with luggage to or from the airports we serve.` },
      { t: "Small groups", d: "Corporate teams and groups that want to ride together." },
      { t: "Extra luggage", d: "More room for bags, gear, and equipment." },
    ],
    faqs: [
      { q: "How many passengers fit in the Luxury SUV?", a: `The Luxury SUV seats ${paxLabel(CAPACITY.suv)} with room for up to ${CAPACITY.suv.bags} bags.` },
      { q: "Is the SUV better than the sedan for airport trips?", a: `Choose the SUV when you have ${paxLabel(CAPACITY.suv)} or extra luggage; the sedan is ideal for ${paxLabel(CAPACITY.sedan)} with standard bags.` },
      { q: "Can I use the SUV for corporate travel?", a: "Yes. The Luxury SUV is a popular choice for small corporate groups and executive travel across the DC metro." },
    ],
  },
  {
    slug: "sprinter-van",
    hubAnchor: "DC airport car service",
    url: "/fleet/sprinter-van/",
    title: "Sprinter Van",
    short: "Sprinter Van",
    eyebrow: "Group Transport",
    h1: "Sprinter Van Service in the DC Metro",
    lede: `Spacious group transportation for ${paxLabel(CAPACITY.sprinter)} with luggage space — built for corporate groups, events, and airport transfers.`,
    description:
      `Landio Sprinter Van — seats ${paxLabel(CAPACITY.sprinter)} with luggage space, ideal for DC-area corporate groups, conferences, events, and group airport transfers.`,
    body: `Our Sprinter Van keeps your whole group together, seating ${paxLabel(CAPACITY.sprinter)} with ample luggage space. It's the workhorse for corporate groups, conference shuttles, delegations, and group transfers to and from the airports — comfortable, professional, and punctual.`,
    bestFor: [
      { t: "Group airport transfers", d: "Move your whole party to or from the airport in one vehicle." },
      { t: "Corporate groups", d: "Conference shuttles, roadshows, and executive programs." },
      { t: "Delegations & events", d: "Keep a group together for meetings, events, and evenings out." },
    ],
    faqs: [
      { q: "How many passengers fit in the Sprinter Van?", a: `The Sprinter Van comfortably seats ${paxLabel(CAPACITY.sprinter)} with room for luggage.` },
      { q: "Is the Sprinter Van available for airport transfers?", a: "Yes. It's ideal for group transfers to and from Dulles (IAD), Reagan National (DCA), and BWI, with real-time flight tracking." },
      { q: `Can you move a group larger than ${CAPACITY.sprinter.paxMax}?`, a: "Yes — our Mini Bus and Charter Bus carry larger parties, or we can coordinate multiple Sprinter Van trips around your schedule." },
    ],
  },
  {
    slug: "mini-bus",
    hubAnchor: "DC airport car service",
    url: "/fleet/mini-bus/",
    title: "Mini Bus",
    short: "Mini Bus",
    eyebrow: "Larger Groups",
    h1: "Mini Bus Service in the DC Metro",
    lede: `Comfortable group transportation for ${paxLabel(CAPACITY.minibus)} — ideal for corporate outings, conference shuttles, and private events.`,
    description:
      `Landio Mini Bus — ${paxLabel(CAPACITY.minibus)}, ideal for DC-area conference shuttles, corporate outings, and private events across the metro.`,
    body: `Our Mini Bus carries ${paxLabel(CAPACITY.minibus)} in comfort, with climate control, comfortable seating, and luggage bays. It's built for conference shuttles, corporate outings, and private events throughout the DC metro — moving a larger party together without splitting into multiple vehicles.`,
    bestFor: [
      { t: "Conference shuttles", d: "Move attendees between hotels, venues, and the convention center on schedule." },
      { t: "Corporate outings", d: "Team events, offsites, and company gatherings." },
      { t: "Private events", d: "Keep a larger group together for celebrations across the metro." },
    ],
    faqs: [
      { q: "How many passengers fit in the Mini Bus?", a: `The Mini Bus carries ${paxLabel(CAPACITY.minibus)} with climate control and luggage bays.` },
      { q: "Is the Mini Bus good for conferences?", a: "Yes. It's one of our most-requested vehicles for conference and hotel shuttles across the DC metro." },
      { q: "Can the Mini Bus handle airport group transfers?", a: "Yes. We provide group airport transfers in the Mini Bus with real-time flight tracking for the airports we serve." },
    ],
  },
  {
    slug: "charter-bus",
    hubAnchor: "DC airport car service",
    url: "/fleet/charter-bus/",
    title: "Charter Bus",
    short: "Charter Bus",
    eyebrow: "Full-Size Groups",
    h1: "Charter Bus Service in the DC Metro",
    lede: `Premium full-size charter bus travel for ${paxLabel(CAPACITY.coach)} — reliable, comfortable, professionally managed group transport.`,
    description:
      `Landio Charter Bus — ${paxLabel(CAPACITY.coach)}, for large DC-area corporate programs, conferences, and group travel with reclining seats and overhead storage.`,
    body: `Our Charter Bus carries ${paxLabel(CAPACITY.coach)} with reclining seats, climate control, and overhead storage — the right choice when the party is large. It's built for corporate programs, conferences, and group travel that needs reliable, comfortable, professionally managed transport across the DC metro and the Northeast corridor.`,
    bestFor: [
      { t: "Conferences & programs", d: "Move a full attendee list together between venues." },
      { t: "Corporate programs", d: "Company offsites, conference transport, and multi-day programs." },
      { t: "Group travel", d: "Long-distance group trips with comfort and overhead storage." },
    ],
    faqs: [
      { q: "How many passengers fit in the Charter Bus?", a: `The Charter Bus carries ${paxLabel(CAPACITY.coach)} with reclining seats and overhead storage.` },
      { q: "Is the Charter Bus available for DC-area events?", a: "Yes. It's ideal for large corporate programs, conferences, and group travel across the DC metro and the wider region." },
      { q: "Can you coordinate multiple buses for a large program?", a: "Yes. Share your group size and timeline and we'll build a plan, including multiple vehicles where needed." },
    ],
  },
];

export function vehiclePages() {
  return VEHICLES.map(render);
}
