/**
 * Route spoke pages — individual airport→destination transfer pages under
 * /services/<slug>/ (migrated from the old site's Services grid). Each page is
 * a genuinely unique body: its own origin airport + destination copy, drive
 * context, highlights, related routes, and FAQ. Premium design is inherited
 * from the Group Transfers master via the `page-group-transfers` body class.
 *
 * Data-driven: add a route to ROUTES and it builds a page + a landing card
 * automatically (services.js imports ROUTE_CARDS). Keep every destination's
 * copy distinct — thin duplicate content is the #1 risk at scale.
 */

import { SITE, faqJsonLd, serviceJsonLd, breadcrumbJsonLd, DEFAULT_SITE_URL, CAPACITY } from "../config.js";
import { esc, btnIcon } from "../templates/partials.js";
import { icon } from "../templates/icons.js";
import { breadcrumb, pageHero, fleetSection, faqAccordion, eventCta, cbox } from "./_sections.js";
import { comparisonSection, pOffer, pWhy, glanceSection, planningSection, groupDetail, COMMITMENT_CARDS } from "./service-spokes.js";

const SPOKE_HERO = "/assets/img/hero/hamptons-hero";
const CHECK = icon("check", { size: 13 });
const splitPic = (alt) => `
          <picture>
            <source type="image/webp" srcset="${SPOKE_HERO}-640.webp 640w, ${SPOKE_HERO}-1024.webp 1024w" sizes="(min-width:900px) 46vw, 92vw">
            <img src="${SPOKE_HERO}-1024.jpg" srcset="${SPOKE_HERO}-640.jpg 640w, ${SPOKE_HERO}-1024.jpg 1024w" sizes="(min-width:900px) 46vw, 92vw" alt="${esc(alt)}" width="1024" height="576" loading="lazy" decoding="async">
          </picture>`;

/* ---- Origin airports (unique context per gateway) --------------------- */
const ORIGIN = {
  jfk: { code: "JFK", name: "John F. Kennedy International Airport (JFK)", short: "JFK",
    note: "JFK is New York's largest gateway, so we track your inbound flight — international arrivals and customs included — and time your pickup to the moment you actually land." },
  lga: { code: "LGA", name: "LaGuardia Airport (LGA)", short: "LaGuardia",
    note: "LaGuardia is New York's close-in domestic hub; we monitor your flight and meet you on arrival for the run east to the Hamptons." },
  fok: { code: "FOK", name: "Francis S. Gabreski Airport (FOK)", short: "FOK",
    note: "Gabreski (FOK), in Westhampton Beach, is the Hamptons' own airport for private and general aviation — we coordinate your pickup and the short run to your East End address." },
  isp: { code: "ISP", name: "Long Island MacArthur Airport (ISP)", short: "ISP",
    note: "Islip MacArthur (ISP) is the closest major airport to the East End, so we track your inbound flight and make the straightforward drive out to the Hamptons." },
  hto: { code: "HTO", name: "East Hampton Airport (HTO)", short: "HTO",
    note: "East Hampton Airport (HTO) is the Hamptons' private-aviation gateway — we coordinate planeside and FBO pickups and the short transfer to your door." },
  ewr: { code: "EWR", name: "Newark Liberty International Airport (EWR)", short: "EWR",
    note: "Newark Liberty (EWR), in New Jersey, is a major New York-area gateway; we track your inbound flight — international arrivals and customs included — and handle the full run east to the Hamptons, through the city and out the Island." },
  // Cities / boroughs (route origins for the NYC-area corridor)
  nyc: { code: "NYC", name: "New York City", short: "NYC",
    note: "From Manhattan and the five boroughs, we run direct, door-to-door transfers out to the Hamptons along the Long Island Expressway and Sunrise Highway, planned around getaway traffic." },
  manhattan: { code: "Manhattan", name: "Manhattan", short: "Manhattan",
    note: "We pick up anywhere in Manhattan — hotels, offices, or your residence — for a direct, door-to-door transfer to the East End, no changing cars." },
  brooklyn: { code: "Brooklyn", name: "Brooklyn", short: "Brooklyn",
    note: "We handle door-to-door pickups across Brooklyn for a direct, chauffeured transfer to the Hamptons." },
  queens: { code: "Queens", name: "Queens", short: "Queens",
    note: "We pick up anywhere in Queens — including near JFK and LaGuardia — for a direct run out to the East End." },
  "staten-island": { code: "Staten Island", name: "Staten Island", short: "Staten Island",
    note: "We provide door-to-door car service from Staten Island to the Hamptons, handling the full route so you can relax." },
  "new-jersey": { code: "New Jersey", name: "New Jersey", short: "New Jersey",
    note: "We pick up across northern New Jersey for a direct, chauffeured transfer to the Hamptons, including Newark-area departures." },
  // Hamptons villages as route origins (local and reverse-corridor trips)
  southampton: { code: "Southampton", name: "Southampton", short: "Southampton",
    note: "Southampton Village is one of the Hamptons' most prominent communities; we handle door-to-door pickups from the village, the estate section, and anywhere in the area." },
  "east-hampton": { code: "East Hampton", name: "East Hampton", short: "East Hampton",
    note: "East Hampton is a flagship Hamptons village; we pick up from the village, the Main Beach area, and the surrounding hamlets." },
  "sag-harbor": { code: "Sag Harbor", name: "Sag Harbor", short: "Sag Harbor",
    note: "Sag Harbor is a historic bayside village; we handle door-to-door pickups from the harbor, Main Street, and North Haven." },
  bridgehampton: { code: "Bridgehampton", name: "Bridgehampton", short: "Bridgehampton",
    note: "Bridgehampton sits at the heart of horse country; we pick up from the village and the surrounding farmland and estates." },
  "hampton-bays": { code: "Hampton Bays", name: "Hampton Bays", short: "Hampton Bays",
    note: "Hampton Bays is the gateway to the East End; we handle door-to-door pickups across the community and the canal area." },
  montauk: { code: "Montauk", name: "Montauk", short: "Montauk",
    note: "Montauk — \"The End\" — is the easternmost hamlet on Long Island; we handle the full run from the harbor, oceanfront, and lighthouse west toward the city." },
  "water-mill": { code: "Water Mill", name: "Water Mill", short: "Water Mill",
    note: "Water Mill sits between Southampton and Bridgehampton; we pick up from the hamlet, the estate area, and anywhere nearby." },
  hamptons: { code: "Hamptons", name: "the Hamptons", short: "the Hamptons",
    note: "From anywhere across the Hamptons — Southampton to Montauk — we run direct, door-to-door transfers west to New York City, planned around getaway-day traffic." },
};

/* ---- Destinations (distinct copy per place) --------------------------- */
const DEST = {
  "hamptons": {
    name: "the Hamptons",
    intro: "The Hamptons — the string of villages and hamlets along the South Fork's East End — is one of the Northeast's premier destinations, known for its ocean beaches, estates, farm stands, and summer social calendar.",
    highlights: ["Southampton & East Hampton villages", "Montauk's beaches and lighthouse", "Sag Harbor's historic waterfront", "Wineries and farm stands along the way"],
    drive: "The trip runs out along the Long Island Expressway and Sunrise Highway, so we plan your pickup around getaway-day traffic and keep you moving to your exact address.",
  },
  "southampton": {
    name: "Southampton",
    intro: "Southampton Village pairs a walkable Main Street and Jobs Lane with the estate section and some of the East End's best-known ocean beaches.",
    highlights: ["Main Street & Jobs Lane shopping", "Cooper's Beach", "The estate section", "Village events and dining"],
    drive: "Southampton is among the first Hamptons villages you reach, so it's typically one of the shorter East End transfers from the New York airports.",
  },
  "east-hampton": {
    name: "East Hampton",
    intro: "East Hampton is known for its village green, Main Beach, and a mix of historic homes, galleries, and high-end shopping along Newtown Lane.",
    highlights: ["Main Beach & Georgica", "Newtown Lane shopping", "Galleries and the village green", "Nearby Amagansett & Wainscott"],
    drive: "East Hampton sits further east than Southampton, making it a longer run that we time precisely to your flight.",
  },
  "montauk": {
    name: "Montauk",
    intro: "Montauk — \"The End\" — is the easternmost hamlet on Long Island, famous for its lighthouse, surf beaches, fishing fleet, and laid-back oceanfront resorts.",
    highlights: ["Montauk Point Lighthouse", "Ditch Plains & surf beaches", "The harbor and fishing fleet", "Oceanfront resorts and dining"],
    drive: "Montauk is the longest East End transfer — the drive continues past East Hampton to the tip of the South Fork, so a comfortable vehicle and a professional chauffeur matter most on this route.",
  },
  "sag-harbor": {
    name: "Sag Harbor",
    intro: "Sag Harbor is a historic former whaling village on the bay side, with a deep-water harbor, a Main Street of shops and restaurants, and a year-round community feel.",
    highlights: ["The harbor and marina", "Main Street dining & shops", "The Sag Harbor Cinema", "Calm bay beaches"],
    drive: "Sag Harbor sits on the bay side between the forks, so we take the most direct approach to have you there for your arrival time.",
  },
  "bridgehampton": {
    name: "Bridgehampton",
    intro: "Bridgehampton is the heart of Hamptons horse country — home to the Hampton Classic, rolling farmland, and a compact Main Street of boutiques and restaurants.",
    highlights: ["The Hampton Classic Horse Show", "Area wineries", "Ocean Road beaches", "Main Street boutiques"],
    drive: "Bridgehampton sits between Southampton and East Hampton along Montauk Highway — a straightforward East End transfer.",
  },
  "hampton-bays": {
    name: "Hampton Bays",
    intro: "Hampton Bays is the gateway to the East End — a waterfront community on the Shinnecock Canal with marinas, beaches, and a relaxed, local feel.",
    highlights: ["Shinnecock Canal & marinas", "Ponquogue Beach", "Waterfront dining", "Gateway to the South Fork"],
    drive: "Hampton Bays is among the closest Hamptons communities to the airports, just past the Shinnecock Canal.",
  },
  "water-mill": {
    name: "Water Mill",
    intro: "Water Mill, named for its landmark windmill, is a quiet hamlet between Southampton and Bridgehampton with farmland, estates, and easy beach access.",
    highlights: ["The historic windmill", "Farm stands & nurseries", "Mecox Bay & ocean beaches", "Estate-area privacy"],
    drive: "Water Mill sits just east of Southampton Village along Montauk Highway — an easy East End transfer.",
  },
  "nyc": {
    name: "New York City",
    intro: "New York City — Manhattan and the five boroughs — anchors the other end of the Hamptons corridor, whether you're heading in for business, a connecting flight, or a night out.",
    highlights: ["Manhattan hotels & offices", "Connections to JFK, LGA & EWR", "Theater, dining & events", "Door-to-door, no transfers"],
    drive: "The run between the East End and the city follows Sunrise Highway and the Long Island Expressway, so we plan around traffic and your schedule.",
  },
  "queens": {
    name: "Queens",
    intro: "Queens — from Long Island City to the airports — is a frequent Hamptons connection, whether for a flight out of JFK or LaGuardia or a visit into the borough.",
    highlights: ["JFK & LaGuardia connections", "Long Island City & Flushing", "Door-to-door, no transfers", "Sports & events venues"],
    drive: "The run between the Hamptons and Queens follows Sunrise Highway and the Long Island Expressway; we plan around traffic and your schedule.",
  },
  "north-fork": {
    name: "the North Fork",
    intro: "The North Fork — Long Island's quieter wine country across Peconic Bay — is known for its vineyards, farm stands, and waterfront villages like Greenport and Mattituck.",
    highlights: ["Vineyards & tasting rooms", "Greenport village & harbor", "Farm stands and orchards", "Peconic Bay beaches"],
    drive: "The North Fork lies across the bay from the Hamptons; we take the most direct route and handle the full transfer door to door.",
  },
};

/* ---- The routes (card title + blurb are verbatim from the old grid) --- */
const FLEET = "/assets/img/fleet/";
const ROUTES = [
  { origin: "jfk", dest: "hamptons",      title: "JFK to Hamptons Car Service", blurb: "Direct, comfortable transfers from JFK to the Hamptons.",        img: `${FLEET}executive-sedan` },
  { origin: "lga", dest: "hamptons",      title: "LGA to Hamptons Car Service", blurb: "Reliable rides from LaGuardia to the Hamptons.",                img: `${FLEET}executive-suv` },
  { origin: "jfk", dest: "southampton",   title: "JFK to Southampton",          blurb: "Smooth airport transfer to Southampton.",                     img: `${FLEET}sprinter-van` },
  { origin: "jfk", dest: "east-hampton",  title: "JFK to East Hampton",         blurb: "Luxury ride from JFK to East Hampton.",                       img: `${FLEET}mini-bus` },
  { origin: "jfk", dest: "montauk",       title: "JFK to Montauk",              blurb: "Long-distance comfort travel to Montauk.",                    img: `${FLEET}motor-coach` },
  { origin: "jfk", dest: "sag-harbor",    title: "JFK to Sag Harbor",           blurb: "Private transfer to Sag Harbor.",                             img: `${FLEET}executive-suv` },
  { origin: "jfk", dest: "bridgehampton", title: "JFK to Bridgehampton",        blurb: "Premium ride to Bridgehampton.",                              img: `${FLEET}executive-sedan` },
  { origin: "jfk", dest: "hampton-bays",  title: "JFK to Hampton Bays",         blurb: "Easy and efficient transfer to Hampton Bays.",                img: `${FLEET}sprinter-van` },
  { origin: "jfk", dest: "water-mill",    title: "JFK to Water Mill",           blurb: "Comfortable ride to Water Mill.",                             img: `${FLEET}executive-suv` },
  { origin: "lga", dest: "southampton",   title: "LGA to Southampton",          blurb: "Direct transfer from LGA to Southampton.",                    img: `${FLEET}executive-sedan` },
  { origin: "lga", dest: "east-hampton",  title: "LGA to East Hampton",         blurb: "Safe and smooth ride to East Hampton.",                       img: `${FLEET}executive-suv` },
  { origin: "lga", dest: "montauk",       title: "LGA to Montauk",              blurb: "Reliable long-distance trip to Montauk.",                     img: `${FLEET}motor-coach` },
  // --- Batch 2: LGA villages, FOK & ISP routes, NYC, and airport hubs ---
  { origin: "lga", dest: "sag-harbor",    title: "LGA to Sag Harbor",           blurb: "Private ride to Sag Harbor.",                                 img: `${FLEET}motor-coach` },
  { origin: "lga", dest: "bridgehampton", title: "LGA to Bridgehampton",        blurb: "Comfortable transfer to Bridgehampton.",                      img: `${FLEET}executive-suv` },
  { origin: "lga", dest: "hampton-bays",  title: "LGA to Hampton Bays",         blurb: "Stress-free ride to Hampton Bays.",                           img: `${FLEET}sprinter-van` },
  { origin: "lga", dest: "water-mill",    title: "LGA to Water Mill",           blurb: "Convenient transfer to Water Mill.",                          img: `${FLEET}executive-sedan` },
  { origin: "jfk", dest: "hamptons", kind: "hub", slug: "jfk-airport-car-service", title: "JFK Airport Car Service Hamptons", blurb: "Flight-tracked service from JFK to the Hamptons.", img: `${FLEET}executive-suv` },
  { origin: "lga", dest: "hamptons", kind: "hub", slug: "lga-airport-car-service", title: "LGA Airport Car Service Hamptons", blurb: "Flight-tracked service from LaGuardia to the Hamptons.", img: `${FLEET}executive-sedan` },
  { origin: "fok", dest: "hamptons", kind: "hub", slug: "fok-airport-car-service", title: "FOK Airport Car Service Hamptons", blurb: "Local airport transportation across the Hamptons.", img: `${FLEET}executive-suv` },
  { origin: "fok", dest: "southampton",   title: "FOK to Southampton",          blurb: "Quick transfer to Southampton.",                              img: `${FLEET}sprinter-van` },
  { origin: "fok", dest: "east-hampton",  title: "FOK to East Hampton",         blurb: "Short, comfortable ride to East Hampton.",                    img: `${FLEET}mini-bus` },
  { origin: "fok", dest: "montauk",       title: "FOK to Montauk",              blurb: "Easy travel from FOK to Montauk.",                            img: `${FLEET}motor-coach` },
  { origin: "fok", dest: "nyc",           title: "FOK to NYC",                  blurb: "Direct transfer from FOK to New York City.",                  img: `${FLEET}executive-suv` },
  { origin: "isp", dest: "hamptons", kind: "hub", slug: "isp-airport-car-service", title: "ISP Airport Car Service Hamptons", blurb: "Reliable service from Islip Airport to the Hamptons.", img: `${FLEET}motor-coach` },
  { origin: "isp", dest: "southampton",   title: "ISP to Southampton",          blurb: "Smooth ride to Southampton.",                                 img: `${FLEET}executive-sedan` },
  { origin: "isp", dest: "east-hampton",  title: "ISP to East Hampton",         blurb: "Comfortable transfer to East Hampton.",                       img: `${FLEET}executive-suv` },
  { origin: "isp", dest: "montauk",       title: "ISP to Montauk",              blurb: "Long-distance ride to Montauk.",                              img: `${FLEET}motor-coach` },
  { origin: "isp", dest: "nyc",           title: "ISP to NYC",                  blurb: "Direct transfer from ISP to New York City.",                  img: `${FLEET}motor-coach` },
  { origin: "hto", dest: "hamptons", kind: "hub", slug: "east-hampton-airport-car-service", title: "East Hampton Airport Car Service", blurb: "Dedicated service from East Hampton Airport.", img: `${FLEET}executive-suv` },
  // --- Batch 3: North Fork, HTO routes, city routes, local Hamptons routes ---
  { origin: "jfk", dest: "north-fork",   title: "JFK to North Fork",       img: `${FLEET}motor-coach` },
  { origin: "hto", dest: "southampton",  title: "HTO to Southampton",      img: `${FLEET}executive-suv` },
  { origin: "hto", dest: "montauk",      title: "HTO to Montauk",          img: `${FLEET}motor-coach` },
  { origin: "hto", dest: "nyc",          title: "HTO to NYC",              img: `${FLEET}executive-sedan` },
  { origin: "hto", dest: "sag-harbor",   title: "HTO to Sag Harbor",       img: `${FLEET}executive-suv` },
  { origin: "nyc", dest: "hamptons",     title: "NYC to Hamptons",         img: `${FLEET}executive-suv` },
  { origin: "manhattan", dest: "hamptons",     title: "Manhattan to Hamptons",     img: `${FLEET}executive-sedan` },
  { origin: "manhattan", dest: "montauk",      title: "Manhattan to Montauk",      img: `${FLEET}motor-coach` },
  { origin: "manhattan", dest: "east-hampton", title: "Manhattan to East Hampton", img: `${FLEET}executive-suv` },
  { origin: "manhattan", dest: "southampton",  title: "Manhattan to Southampton",  img: `${FLEET}executive-sedan` },
  { origin: "manhattan", dest: "sag-harbor",   title: "Manhattan to Sag Harbor",   img: `${FLEET}sprinter-van` },
  { origin: "brooklyn", dest: "hamptons",     title: "Brooklyn to Hamptons",      img: `${FLEET}executive-suv` },
  { origin: "brooklyn", dest: "montauk",      title: "Brooklyn to Montauk",       img: `${FLEET}motor-coach` },
  { origin: "brooklyn", dest: "east-hampton", title: "Brooklyn to East Hampton",  img: `${FLEET}executive-sedan` },
  { origin: "brooklyn", dest: "southampton",  title: "Brooklyn to Southampton",   img: `${FLEET}executive-suv` },
  { origin: "queens", dest: "hamptons",       title: "Queens to Hamptons",        img: `${FLEET}executive-sedan` },
  { origin: "queens", dest: "montauk",        title: "Queens to Montauk",         img: `${FLEET}motor-coach` },
  { origin: "southampton", dest: "queens",    title: "Southampton to Queens",     img: `${FLEET}executive-suv` },
  { origin: "staten-island", dest: "hamptons", title: "Staten Island to Hamptons", img: `${FLEET}executive-sedan` },
  { origin: "staten-island", dest: "montauk",  title: "Staten Island to Montauk",  img: `${FLEET}motor-coach` },
  { origin: "new-jersey", dest: "hamptons",   title: "New Jersey to Hamptons",    img: `${FLEET}executive-suv` },
  { origin: "southampton", dest: "montauk",      title: "Southampton to Montauk",       img: `${FLEET}executive-sedan` },
  { origin: "east-hampton", dest: "southampton", title: "East Hampton to Southampton",  img: `${FLEET}executive-suv` },
  { origin: "east-hampton", dest: "montauk",     title: "East Hampton to Montauk",      img: `${FLEET}executive-sedan` },
  { origin: "sag-harbor", dest: "montauk",       title: "Sag Harbor to Montauk",        img: `${FLEET}executive-suv` },
  { origin: "sag-harbor", dest: "southampton",   title: "Sag Harbor to Southampton",    img: `${FLEET}executive-sedan` },
  { origin: "sag-harbor", dest: "east-hampton",  title: "Sag Harbor to East Hampton",   img: `${FLEET}executive-suv` },
  { origin: "bridgehampton", dest: "montauk",    title: "Bridgehampton to Montauk",     img: `${FLEET}executive-sedan` },
  { origin: "bridgehampton", dest: "sag-harbor", title: "Bridgehampton to Sag Harbor",  img: `${FLEET}executive-suv` },
  { origin: "hampton-bays", dest: "montauk",     title: "Hampton Bays to Montauk",      img: `${FLEET}executive-sedan` },
  { origin: "hampton-bays", dest: "southampton", title: "Hampton Bays to Southampton",  img: `${FLEET}executive-suv` },
  { origin: "hampton-bays", dest: "east-hampton", title: "Hampton Bays to East Hampton", img: `${FLEET}executive-sedan` },
  // --- Category C: EWR (Newark) airport coverage ---
  { origin: "ewr", dest: "hamptons", kind: "hub", slug: "ewr-airport-car-service", title: "EWR Airport Car Service Hamptons", blurb: "Reliable service from Newark Liberty Airport to the Hamptons.", img: `${FLEET}executive-suv` },
  { origin: "ewr", dest: "hamptons",      title: "EWR to Hamptons",       img: `${FLEET}executive-sedan` },
  { origin: "ewr", dest: "southampton",   title: "EWR to Southampton",    img: `${FLEET}executive-suv` },
  { origin: "ewr", dest: "east-hampton",  title: "EWR to East Hampton",   img: `${FLEET}motor-coach` },
  { origin: "ewr", dest: "montauk",       title: "EWR to Montauk",        img: `${FLEET}motor-coach` },
  { origin: "ewr", dest: "sag-harbor",    title: "EWR to Sag Harbor",     img: `${FLEET}executive-suv` },
  { origin: "ewr", dest: "bridgehampton", title: "EWR to Bridgehampton",  img: `${FLEET}executive-sedan` },
  { origin: "ewr", dest: "hampton-bays",  title: "EWR to Hampton Bays",   img: `${FLEET}sprinter-van` },
  { origin: "ewr", dest: "water-mill",    title: "EWR to Water Mill",     img: `${FLEET}executive-suv` },
  // --- Category C Step 2: Hamptons → NYC (reverse corridor) ---
  { origin: "hamptons",      dest: "nyc", title: "Hamptons to NYC",      img: `${FLEET}executive-suv` },
  { origin: "montauk",       dest: "nyc", title: "Montauk to NYC",       img: `${FLEET}motor-coach` },
  { origin: "southampton",   dest: "nyc", title: "Southampton to NYC",   img: `${FLEET}executive-sedan` },
  { origin: "east-hampton",  dest: "nyc", title: "East Hampton to NYC",  img: `${FLEET}executive-suv` },
  { origin: "sag-harbor",    dest: "nyc", title: "Sag Harbor to NYC",    img: `${FLEET}executive-sedan` },
  { origin: "bridgehampton", dest: "nyc", title: "Bridgehampton to NYC", img: `${FLEET}executive-suv` },
  { origin: "hampton-bays",  dest: "nyc", title: "Hampton Bays to NYC",  img: `${FLEET}executive-sedan` },
  { origin: "water-mill",    dest: "nyc", title: "Water Mill to NYC",    img: `${FLEET}executive-suv` },
].map((r) => {
  const slug = r.slug || `${r.origin}-to-${r.dest}`;
  const blurb = r.blurb || `Direct chauffeured car service from ${ORIGIN[r.origin].short} to ${DEST[r.dest].name}.`;
  return { ...r, slug, blurb, url: `/services/${slug}/` };
});

/* Which landing category each origin belongs to. */
const ORIGIN_GROUP = {
  jfk: "airport", lga: "airport", fok: "airport", isp: "airport", hto: "airport", ewr: "airport",
  nyc: "city", manhattan: "city", brooklyn: "city", queens: "city", "staten-island": "city", "new-jersey": "city",
  southampton: "local", "east-hampton": "local", "sag-harbor": "local", bridgehampton: "local", "hampton-bays": "local",
  montauk: "local", "water-mill": "local", hamptons: "local",
};

/* Lightweight list for the /services/ landing (imported by services.js). */
export const ROUTE_CARDS = ROUTES.map((r) => ({
  slug: r.slug, url: r.url, title: r.title, blurb: r.blurb, img: r.img,
  alt: `${ORIGIN[r.origin].short} to ${DEST[r.dest].name} — Aura Hamptons car service`,
  group: ORIGIN_GROUP[r.origin] || "airport",
}));

/* ---- Shared premium bits (self-contained; CSS via page-group-transfers) */
function trustStrip() {
  const stats = [
    { icon: "users", num: "100+", label: "Happy Clients" },
    { icon: "clock", num: "24/7", label: "Concierge" },
    { icon: "shield", num: "15+", label: "Years of Excellence" },
  ];
  const items = stats.map((s) => `
            <li class="gt-trust2__stat">
              <span class="gt-trust2__ico" aria-hidden="true">${icon(s.icon, { size: 19 })}</span>
              <span class="gt-trust2__num">${esc(s.num)}</span>
              <span class="gt-trust2__label">${esc(s.label)}</span>
            </li>`).join("");
  return `
    <section class="section gt-trust2-sec" aria-labelledby="rt-trust-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Why Clients Choose Aura</span>
          <h2 id="rt-trust-title">A Premium Standard, Every Transfer</h2>
          <p class="text-secondary">Professional chauffeurs, meticulously maintained vehicles, and a concierge team available around the clock.</p>
        </div>
        <div class="gt-trust2 card-surface">
          <ul class="gt-trust2__stats">${items}
          </ul>
        </div>
      </div>
    </section>`;
}

function overviewSection(o, d, title) {
  const list = d.highlights.map((h) => `<li><span class="gt-split__check" aria-hidden="true">${CHECK}</span>${esc(h)}</li>`).join("\n            ");
  return `
    <section class="section gt-split-sec" aria-labelledby="rt-ov-title">
      <div class="container gt-split">
        <div class="gt-split__content">
          <span class="eyebrow">Your Route</span>
          <h2 id="rt-ov-title">${esc(o.short)} to ${esc(d.name)}, Door to Door</h2>
          <p class="text-secondary">${esc(o.note)}</p>
          <p class="text-secondary">${esc(d.intro)}</p>
          <p class="text-secondary">${esc(d.drive)}</p>
          <ul class="gt-split__checks">
            ${list}
          </ul>
          <div class="gt-split__cta">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Start Your Quote</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
        <figure class="gt-split__media">
          <span class="gt-split__accent" aria-hidden="true"></span>
          <span class="gt-split__accent gt-split__accent--br" aria-hidden="true"></span>
          ${splitPic(`The Hamptons — Aura Hamptons ${o.short} to ${d.name} car service`)}
        </figure>
      </div>
    </section>`;
}

const HUB_VILLAGES = ["Southampton", "East Hampton", "Montauk", "Sag Harbor", "Bridgehampton", "Water Mill", "Amagansett", "Westhampton Beach", "Wainscott", "Sagaponack", "Quogue", "Shelter Island", "Hampton Bays"];

function hubAreasSection(o) {
  const chips = HUB_VILLAGES.map((v) => `<button type="button" class="route-chip" data-open-quote data-prefill-dropoff="${esc(v + ", NY")}" aria-label="Start a quote for car service to ${esc(v)}">${esc(v)}<span class="route-chip__go" aria-hidden="true">&rarr;</span></button>`).join("\n          ");
  return `
    <section class="section" aria-labelledby="rt-areas-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Areas We Serve</span>
          <h2 id="rt-areas-title">${esc(o.short)} to Every Hamptons Village</h2>
          <p class="text-secondary">Door-to-door car service from ${esc(o.name)} to every village and hamlet on the East End — tap your destination to start a quote.</p>
        </div>
        <div class="route-grid">
          ${chips}
        </div>
      </div>
    </section>`;
}

function relatedSection(current) {
  // Prefer siblings sharing the origin OR the destination; keep it to 6, all built.
  const others = ROUTES.filter((r) => r.slug !== current.slug);
  const sameOrigin = others.filter((r) => r.origin === current.origin);
  const sameDest = others.filter((r) => r.dest === current.dest && r.origin !== current.origin);
  const picks = [...sameOrigin, ...sameDest].filter((v, i, a) => a.indexOf(v) === i).slice(0, 6);
  if (!picks.length) return "";
  const chips = picks.map((r) => `<a class="route-chip" href="${esc(r.url)}">${esc(r.title)}<span class="route-chip__go" aria-hidden="true">&rarr;</span></a>`).join("\n          ");
  return `
    <section class="section section--alt" aria-labelledby="rt-rel-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">More Routes</span>
          <h2 id="rt-rel-title">Related Routes</h2>
          <p class="text-secondary">Other popular Aura Hamptons routes along the New York City-to-Hamptons corridor.</p>
        </div>
        <div class="route-grid">
          ${chips}
        </div>
      </div>
    </section>`;
}

function routeFaqs(o, d, grp) {
  const q1 = { q: `How long is the ${o.short} to ${d.name} transfer?`, a: `It runs along the Long Island Expressway and Sunrise Highway, so the exact time depends on traffic and your pickup time. ${d.drive} We plan around getaway-day conditions to keep you moving.` };
  const air2 = { q: `Do you track my flight into ${o.short}?`, a: `Yes. ${o.note}` };
  const air3 = { q: `Is meet & greet available at ${o.short}?`, a: `Yes. On request, your chauffeur can meet you inside the terminal with a name sign and help with your luggage, then walk you to the vehicle.` };
  const loc2 = { q: `Where do you pick up in ${o.short}?`, a: `${o.note}` };
  const loc3 = { q: `Can you handle luggage and multiple stops on the ${o.short} to ${d.name} trip?`, a: `Yes. We size the vehicle to your party and luggage, and we can plan stops along the way — just tell us when you book.` };
  const q4 = { q: `Which vehicles are available for ${o.short} to ${d.name}?`, a: `Everything from an Executive Sedan or Executive SUV to a Sprinter Van, Minibus, or ${CAPACITY.coach.paxMax}-passenger Motor Coach — matched to your party size and luggage.` };
  const q5 = { q: `Is the ${o.short} to ${d.name} car service available 24/7?`, a: `Yes. Aura Hamptons operates ${SITE.hours}, so early departures and late arrivals to and from ${d.name} are covered.` };
  return grp === "airport" ? [q1, air2, air3, q4, q5] : [q1, loc2, loc3, q4, q5];
}

/* ===========================================================================
   Master-aligned sections for route pages. Routes follow the Group Transfers
   master section order, reusing the master's exact section builders
   (comparisonSection / pOffer / pWhy / glanceSection / planningSection /
   groupDetail) with route-specific, origin-group-aware content (airport / city
   / local). Shared brand sections (trust, fleet, CTA) match the rest of the
   site; the unique per-route body stays in the hero, overview, areas, related
   routes, FAQs and CTAs. Content is adapted per route — never pasted verbatim.
   =========================================================================== */
const RIDESHARE = ["uber", "lyft"];
const vehLine = `From an Executive Sedan up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach`;

// Hero eyebrow / feature chips, by origin group.
const HERO_META = {
  airport: { eyebrow: "Airport Transfers", features: [
    { icon: "plane", label: "Flight-tracked" }, { icon: "pin", label: "Door-to-door" },
    { icon: "clock", label: "Available 24/7" }, { icon: "userCheck", label: "Professional chauffeurs" } ] },
  city: { eyebrow: "NYC &rarr; Hamptons", features: [
    { icon: "pin", label: "Door-to-door" }, { icon: "route", label: "No sharing" },
    { icon: "clock", label: "Available 24/7" }, { icon: "userCheck", label: "Professional chauffeurs" } ] },
  local: { eyebrow: "Hamptons Car Service", features: [
    { icon: "pin", label: "Door-to-door" }, { icon: "calendar", label: "Reserved ahead" },
    { icon: "clock", label: "Available 24/7" }, { icon: "userCheck", label: "Professional chauffeurs" } ] },
};

// "What's Included" / offer cards, by origin group (reuses the master pOffer).
const OFFER = {
  airport: { intro: "A seamless, flight-tracked chauffeured experience from the terminal to your door.", cards: [
    { icon: "plane", title: "Flight-tracked pickups", desc: "We monitor your inbound flight and adjust pickup to your actual landing — no charge for delays." },
    { icon: "sign", title: "Meet & greet on request", desc: "Your chauffeur can meet you inside the terminal with a name sign and luggage assistance." },
    { icon: "pin", title: "Door-to-door service", desc: "A direct transfer between the terminal and your exact address — no stops, no sharing." },
    { icon: "car", title: "Every vehicle class", desc: `${vehLine}, sized to your party and luggage.` },
    { icon: "userCheck", title: "Professional chauffeurs", desc: "Vetted chauffeurs who know the New York City-to-Hamptons corridor." },
    { icon: "clock", title: "Available 24/7", desc: `Early departures and late arrivals covered, ${SITE.hours}.` } ] },
  city: { intro: "A direct, chauffeured ride along the New York City-to-Hamptons corridor.", cards: [
    { icon: "pin", title: "Door-to-door service", desc: "A direct transfer between your pickup and your exact destination — no stops, no sharing." },
    { icon: "route", title: "Corridor expertise", desc: "Chauffeurs who know the Long Island Expressway and Sunrise Highway and plan around getaway-day traffic." },
    { icon: "car", title: "Every vehicle class", desc: `${vehLine}, sized to your party and luggage.` },
    { icon: "briefcase", title: "Room for luggage", desc: "Space for bags, golf clubs, and gear for the weekend." },
    { icon: "userCheck", title: "Professional chauffeurs", desc: "Vetted, courteous chauffeurs for the full run east or west." },
    { icon: "clock", title: "Available 24/7", desc: `Travel on your schedule, ${SITE.hours}.` } ] },
  local: { intro: "A reserved, chauffeured ride across the East End and the NYC corridor.", cards: [
    { icon: "pin", title: "Door-to-door service", desc: "A direct ride between your pickup and your exact destination — no stops, no sharing." },
    { icon: "calendar", title: "Reserved in advance", desc: "Your car is booked ahead for your date and time, confirmed before you travel." },
    { icon: "car", title: "Every vehicle class", desc: `${vehLine}, sized to your party and luggage.` },
    { icon: "userCheck", title: "Professional chauffeurs", desc: "Vetted, courteous chauffeurs who know the East End." },
    { icon: "route", title: "Corridor expertise", desc: "Planned around getaway-day traffic on the way east or west." },
    { icon: "clock", title: "Available 24/7", desc: `Early mornings and late nights covered, ${SITE.hours}.` } ] },
};
function offerSection(o, d, grp) {
  const g = OFFER[grp] || OFFER.local;
  const heading = grp === "local" ? `Every ${o.short} to ${d.name} Ride, Done Right` : `Every ${o.short} to ${d.name} Transfer, Done Right`;
  return pOffer({ eyebrow: "What's Included", heading, intro: g.intro, cards: g.cards, cue: "Get a quote" });
}

function routeCompare(o, d, grp) {
  if (grp === "airport") return { comparison: {
    eyebrow: "Two Ways to Get There", heading: "Flight-Tracked Transfer vs. Rideshare & Taxi",
    intro: `Compare a reserved, flight-tracked ${o.short}-to-${d.name} transfer with an on-demand ride.`,
    rowLabels: [ { icon: "radar", label: "Flight tracking" }, { icon: "tag", label: "Pricing" }, { icon: "pin", label: "Pickup" }, { icon: "userCheck", label: "Chauffeur & vehicle" } ],
    cards: [
      { tag: "Recommended", featured: true, icon: "plane", title: `Aura Hamptons — ${o.short} Transfer`, desc: `A reserved transfer from ${o.name} to ${d.name}, timed to your flight.`, rows: [
        ["Flight tracking", `We track your ${o.short} arrival and adjust pickup to your actual landing.`],
        ["Pricing", "Quoted up front for your route — no surge pricing."],
        ["Pickup", "Curbside or in-terminal meet & greet with a name sign."],
        ["Chauffeur & vehicle", "A professional chauffeur in a clean, maintained luxury vehicle."] ] },
      { featured: false, brands: RIDESHARE, title: "Rideshare & Taxi — On-Demand", desc: "A ride requested after you land.", rows: [
        ["Flight tracking", "No flight tracking; you request a ride once on the ground."],
        ["Pricing", "Fares vary with demand and can surge."],
        ["Pickup", "Curbside at the rideshare or taxi line."],
        ["Chauffeur & vehicle", "Whichever driver and vehicle are nearest."] ] } ],
    cta: { headingHtml: `Land, and your chauffeur is waiting. <span class="gold">Book ${esc(o.short)} to ${esc(d.name)}.</span>`, bookLabel: "Get a Quote", note: `${o.short} • Flight-tracked • Door-to-door • 24/7` } } };
  if (grp === "city") return { comparison: {
    eyebrow: "Two Ways to Travel", heading: "Direct Chauffeured Transfer vs. Rideshare",
    intro: `Compare one direct ${o.short}-to-${d.name} car with booking rides on demand.`,
    rowLabels: [ { icon: "pin", label: "The ride" }, { icon: "tag", label: "Pricing" }, { icon: "seat", label: "Comfort" }, { icon: "calendar", label: "Reserved" } ],
    cards: [
      { tag: "Recommended", featured: true, icon: "car", title: `Aura Hamptons — Direct ${o.short} Car`, desc: `One chauffeured car from ${o.name} straight to ${d.name}.`, rows: [
        ["The ride", "One direct car, door to door — no stops, no sharing."],
        ["Pricing", "Quoted up front for your route — no surge pricing."],
        ["Comfort", "A clean, comfortable cabin for the full run east."],
        ["Reserved", "Booked in advance for your date and time."] ] },
      { featured: false, brands: RIDESHARE, title: "Rideshare — On-Demand", desc: "Rides booked individually through an app.", rows: [
        ["The ride", "Availability and routing vary ride to ride."],
        ["Pricing", "Fares vary with demand and can surge."],
        ["Comfort", "Whichever vehicle is nearest."],
        ["Reserved", "Requested in the moment, subject to availability."] ] } ],
    cta: { headingHtml: `One car, all the way east. <span class="gold">Book ${esc(o.short)} to ${esc(d.name)}.</span>`, bookLabel: "Get a Quote", note: `${o.short} → ${d.name} • Door-to-door • 24/7` } } };
  return { comparison: {
    eyebrow: "Two Ways to Get a Ride", heading: "Reserved Car Service vs. On-Demand Rideshare",
    intro: `Compare a car reserved in advance for ${o.short} to ${d.name} with an on-demand ride.`,
    rowLabels: [ { icon: "calendar", label: "Availability" }, { icon: "userCheck", label: "Chauffeur" }, { icon: "tag", label: "Pricing" }, { icon: "pin", label: "The ride" } ],
    cards: [
      { tag: "Recommended", featured: true, icon: "car", title: `Aura Hamptons — Reserved ${o.short} Car`, desc: `A professional chauffeur reserved for your ${o.short}-to-${d.name} trip.`, rows: [
        ["Availability", "Reserved in advance, so your ride is confirmed."],
        ["Chauffeur", "A professional, vetted chauffeur who knows the East End."],
        ["Pricing", "Quoted up front for your route."],
        ["The ride", "Direct, door to door — no stops, no sharing."] ] },
      { featured: false, brands: RIDESHARE, title: "On-Demand Rideshare", desc: "A ride requested in the moment through an app.", rows: [
        ["Availability", "On-demand availability can be limited on the East End."],
        ["Chauffeur", "Whichever driver is nearest."],
        ["Pricing", "Fares vary with demand."],
        ["The ride", "Routing and vehicle vary ride to ride."] ] } ],
    cta: { headingHtml: `Reserved and reliable. <span class="gold">Book ${esc(o.short)} to ${esc(d.name)}.</span>`, bookLabel: "Get a Quote", note: `${o.short} → ${d.name} • Reserved • 24/7` } } };
}

function routeWhy(o, d, grp) {
  const heading = `Why Choose Aura Hamptons for ${o.short} to ${d.name}`;
  const common = [
    { icon: "userCheck", title: "Professional chauffeurs", desc: "Vetted, courteous chauffeurs who know the Hamptons and the NYC corridor." },
    { icon: "car", title: "Luxury vehicle fleet", desc: "Six immaculately maintained vehicle classes for any party size.", act: { href: "/fleet/" }, cue: "View the fleet" },
    { icon: "clock", title: "24/7 availability", desc: `Early departures and late arrivals covered, ${SITE.hours}.` },
    { icon: "pin", title: "Door-to-door service", desc: `Direct transfers between ${o.name} and ${d.name} — no stops, no sharing.` },
  ];
  if (grp === "airport") return { eyebrow: "The Aura Difference", heading, intro: `Flight-tracked, door-to-door airport transfers between ${o.name} and ${d.name}.`, items: [
    { icon: "plane", title: "Flight-tracked transfers", desc: `We track your ${o.short} arrival and time your pickup to your actual landing.` },
    { icon: "sign", title: "Meet & greet on request", desc: "Your chauffeur can meet you inside the terminal with a name sign." },
    ...common ] };
  return { eyebrow: "The Aura Difference", heading, intro: `A direct, reserved, chauffeured transfer between ${o.name} and ${d.name}.`, items: [
    { icon: "route", title: "Corridor expertise", desc: "Chauffeurs who know the LIE and Sunrise Highway and plan around getaway-day traffic." },
    { icon: "calendar", title: "Reserved in advance", desc: "Your car is confirmed ahead of time for your date and itinerary." },
    ...common ] };
}

function routeGlance(o, d, grp) {
  const cards = grp === "airport" ? [
    { label: "Airport transfers", desc: `Flight-tracked service between ${o.name} and ${d.name}.` },
    { label: "Capacity", desc: `${vehLine}.` },
    { label: "Availability", desc: `Early departures and late arrivals, ${SITE.hours}.` },
    { label: "Book ahead", desc: "Share your flight number and we time the pickup to your landing." },
  ] : [
    { label: "Service area", desc: `Door-to-door between ${o.name} and ${d.name}.` },
    { label: "Capacity", desc: `${vehLine}.` },
    { label: "Availability", desc: `Travel on your schedule, ${SITE.hours}.` },
    { label: "Book ahead", desc: "Reserve in advance and your car is confirmed for your date and time." },
  ];
  return { glanceHeading: `${o.short} to ${d.name} at a Glance`, glance: cards };
}

function routePlanning(o, d, grp) {
  const points = grp === "airport" ? [
    "Share your airline and flight number so we can track your arrival.",
    "Tell us your pickup terminal and your exact drop-off address.",
    "Add your party size and luggage so we send the right vehicle.",
    "Request in-terminal meet & greet if you'd like to be met at arrivals.",
  ] : [
    "Tell us your exact pickup and drop-off addresses.",
    "Pick your date and time — reserve ahead for getaway days.",
    "Add your party size and luggage so we send the right vehicle.",
    "Let us know any stops you'd like along the way.",
  ];
  return { planning: { eyebrow: "Planning & Booking", heading: `Planning Your ${o.short} to ${d.name} Trip`,
    body: `A few details help us plan your ${o.short}-to-${d.name} trip and have the right vehicle and chauffeur ready.`, points } };
}

function renderRoute(data) {
  const o = ORIGIN[data.origin];
  const d = DEST[data.dest];
  const grp = ORIGIN_GROUP[data.origin] || "airport";
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: data.title, path: data.url },
  ];
  const faqs = routeFaqs(o, d, grp);
  const hero = HERO_META[grp] || HERO_META.airport;
  const verb = grp === "airport" ? "Flight-tracked, door-to-door" : "Direct, door-to-door";
  const description = `${data.title} — ${verb.toLowerCase()} chauffeured transfers between ${o.name} and ${d.name}. Professional chauffeurs, every vehicle class, available ${SITE.hours}.`;
  const lede = `${data.blurb} ${verb} chauffeured car service between ${o.name} and ${d.name} — professional chauffeurs, no sharing, ${SITE.hours}.`;
  const ctaEyebrow = grp === "airport" ? "Airport Transfers &middot; 24/7" : grp === "city" ? "NYC &rarr; Hamptons &middot; 24/7" : "Hamptons Car Service &middot; 24/7";
  const ctaLede = grp === "airport"
    ? `Flight-tracked, door-to-door transfers between ${esc(o.name)} and ${esc(d.name)} — your pickup adjusts to your actual arrival.`
    : `Direct, door-to-door chauffeured car service between ${esc(o.name)} and ${esc(d.name)} — reserved for your date and time.`;
  return {
    path: data.url,
    title: data.title,
    titleFull: `${data.title} | Aura Hamptons`,
    description,
    bodyClass: "page-service-spoke page-group-transfers",
    cluster: "services",
    card: { title: data.title, text: data.blurb, icon: "route" },
    jsonLd: [
      serviceJsonLd(DEFAULT_SITE_URL, { name: data.title, path: data.url, description }),
      breadcrumbJsonLd(DEFAULT_SITE_URL, trail),
      faqJsonLd(faqs),
    ],
    main: [
      breadcrumb(trail),
      pageHero({ eyebrow: hero.eyebrow, h1: data.title, lede, image: SPOKE_HERO, features: hero.features }),
      trustStrip(),
      overviewSection(o, d, data.title),
      fleetSection({ variant: "home", intro: `Choose the right vehicle for your ${o.short}-to-${d.name} trip — ${vehLine.toLowerCase()}.` }),
      offerSection(o, d, grp),
      comparisonSection(routeCompare(o, d, grp)),
      eventCta({ email: true, eyebrow: ctaEyebrow, headingHtml: `Heading to<br class="event-cta__br"> <span class="gold">${esc(d.name)}?</span>`, lede: ctaLede }),
      hubAreasSection(o),
      pWhy(routeWhy(o, d, grp)),
      relatedSection(data),
      groupDetail({
        introEyebrow: "Our Commitment",
        introHeading: `Committed to Your ${o.short} to ${d.name} Trip`,
        detailIntro: `Professional chauffeurs, meticulously maintained vehicles, and punctual pickups between ${o.name} and ${d.name}.`,
        detailCards: COMMITMENT_CARDS,
        detailCta: "Start Your Quote",
      }),
      glanceSection(routeGlance(o, d, grp)),
      planningSection(routePlanning(o, d, grp)),
      faqAccordion({ faqs, lede: `Answers to common questions about ${data.title.toLowerCase()}.` }),
    ].join("\n"),
    preFooterCta: { eyebrow: "Reserve Your Transfer", heading: `Ready to Book ${data.title}?`, sub: `${verb} chauffeured service between ${o.name} and ${d.name}, ${SITE.hours}.` },
  };
}

export function routeSpokes() {
  return ROUTES.map(renderRoute);
}
