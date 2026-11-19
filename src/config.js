/**
 * Landio Limo Services — Single source of truth (SSOT).
 *
 * NAP + brand facts live here ONCE and are reused across header, footer,
 * contact bar, JSON-LD, and every page. Do not hardcode any of these values
 * anywhere else in the codebase.
 *
 * Business: luxury chauffeured ground transportation serving the Washington, DC
 * metro — DC, Maryland, and Northern Virginia — plus the DC ↔ Northeast corridor.
 * Fleet runs from Executive Sedan up to Charter Bus. Airports served: IAD, DCA,
 * BWI. Core lines: airport transfers, corporate/executive, private aviation
 * (FBO), diplomatic transportation, and group transport.
 *
 * It is a rebrand of the Aura Hamptons / A-Town Limo codebase — same locked
 * architecture, Landio (DC metro) data.
 *
 * ── CONFIRM BEFORE LAUNCH (do not invent — A2P/legal sensitive) ──────────────
 *  • SITE.legalName — registered entity on the Terms of Service.
 *  • SITE.smsNumber — the registered A2P 10DLC sending number.
 *  • Fleet capacities in CAPACITY — confirm the client's real seat/bag counts.
 *  • SITE.director / effective dates — from the final legal pages.
 */

/**
 * Canonical origin. Derived from SITE_URL at build time (see build.js), never
 * hardcoded into pages. The value below is only the default used when SITE_URL
 * is unset locally.
 */
export const DEFAULT_SITE_URL = "https://www.landiolimoservices.com";

/**
 * Fleet capacities — the ONE place to change passenger/bag counts. Every page,
 * FAQ, dropdown, and schema reads these. `paxMin` is only set when a range
 * should be shown; `bags: null` hides the luggage count (group vehicles quote
 * luggage on request). CONFIRM real counts with the client before launch.
 */
export const CAPACITY = {
  sedan: { paxMin: null, paxMax: 3, bags: 3 },
  suv: { paxMin: null, paxMax: 6, bags: 6 },
  sprinter: { paxMin: null, paxMax: 14, bags: 14 },
  minibus: { paxMin: null, paxMax: 24, bags: null },
  coach: { paxMin: null, paxMax: 56, bags: null },
};

/**
 * Main phone — the ONE value to swap for a call-tracking number later. Every
 * tel: link, footer, schema, FAQ, and legal page reads this.
 * display = human form, e164 = tel: links + schema.
 */
export const PHONE = {
  display: "+1 (240) 595-7025",
  local: "(240) 595-7025", // national format, for tight copy like meta descriptions
  e164: "+12405957025",
};

/** The airport-hub URL — one value for every inbound link, nav, and redirect. */
export const ATL_HUB_PATH = "/dc-airport-car-service/";

/** Pickup string used to prefill the quote form for airport bookings. */
export const PRIMARY_AIRPORT_PICKUP = "Washington Dulles International Airport (IAD)";

/**
 * Primary airport pickups (prefill for the two headline airport boxes) + their
 * future pages. The full three-airport cluster is built in the SEO wave.
 */
export const ATL_TERMINALS = {
  domestic: {
    pickup: "Washington Dulles International Airport (IAD)",
    page: "/dc-airport-car-service/iad/",
  },
  international: {
    pickup: "Ronald Reagan Washington National Airport (DCA)",
    page: "/dc-airport-car-service/dca/",
  },
};

/**
 * Airport meeting points. Generic, client-confirmable wording — no terminal
 * side is named until the client confirms it.
 */
export const DOMESTIC_MEETING_POINT = "on the arrivals level, curbside or with a meet & greet inside the terminal";
export const INTERNATIONAL_MEETING_POINT = "inside the arrivals hall at the meet & greet point, or curbside on the arrivals level";

/* ==========================================================================
 * PAGE MAPS — the link graph. Every internal link between clusters (nav, hubs,
 * "nearby" cards, related pages, /services/ directory, redirects) is GENERATED
 * from these maps. Page copy and sourced facts live in src/content/*.js keyed
 * by the same slugs. The programmatic-SEO cluster arrays (AREAS, FBOS, ROUTES,
 * VENUES, EVENTS, GUIDES) are populated in the SEO scale wave; the core site
 * reads identity/fleet/services/nav/footer only.
 * ======================================================================== */
export const HUBS = {
  airport: { path: ATL_HUB_PATH, name: "DC Airport Car Service" },
  guides: { path: "/dc-airport-guide/", name: "DC Airport Guide" },
  areas: { path: "/areas/", name: "Areas We Serve" },
  venues: { path: "/venues/", name: "Venues" },
  events: { path: "/events/", name: "Events" },
  fbo: { path: "/private-jet-fbo-transfers/", name: "Private Jet & FBO Transfers" },
  routes: { path: "/routes/", name: "Airport & City Routes" },
  services: { path: "/services/", name: "All Services & Destinations" },
  fleet: { path: "/fleet/", name: "Our Fleet" },
};

export const areaPath = (slug) => `/areas/${slug}-car-service/`;
export const routePath = (slug) => `/routes/${slug}/`;

/**
 * DC-metro service areas (SEO wave). Populated with DC / Maryland / Northern
 * Virginia cities in the scale wave; empty here so the core build ships with no
 * unbuilt cluster links. neighbors = 3 nearby areas; fbo/routes = link targets.
 */
const STATE_NAME = { dc: "District of Columbia", md: "Maryland", va: "Virginia" };
export const AREAS = [
  { slug: "washington-dc", name: "Washington, DC", pickup: "Washington, DC", region: "dc", airport: "DCA", neighbors: ["arlington", "bethesda", "silver-spring"] },
  { slug: "bethesda", name: "Bethesda", pickup: "Bethesda, MD", region: "md", airport: "DCA", neighbors: ["chevy-chase", "potomac", "washington-dc"] },
  { slug: "potomac", name: "Potomac", pickup: "Potomac, MD", region: "md", airport: "IAD", neighbors: ["bethesda", "rockville", "mclean"] },
  { slug: "rockville", name: "Rockville", pickup: "Rockville, MD", region: "md", airport: "IAD", neighbors: ["potomac", "gaithersburg", "bethesda"] },
  { slug: "silver-spring", name: "Silver Spring", pickup: "Silver Spring, MD", region: "md", airport: "DCA", neighbors: ["washington-dc", "chevy-chase", "bethesda"] },
  { slug: "germantown", name: "Germantown", pickup: "Germantown, MD", region: "md", base: true, airport: "IAD", neighbors: ["gaithersburg", "rockville", "potomac"] },
  { slug: "gaithersburg", name: "Gaithersburg", pickup: "Gaithersburg, MD", region: "md", airport: "IAD", neighbors: ["germantown", "rockville", "potomac"] },
  { slug: "chevy-chase", name: "Chevy Chase", pickup: "Chevy Chase, MD", region: "md", airport: "DCA", neighbors: ["bethesda", "silver-spring", "washington-dc"] },
  { slug: "national-harbor", name: "National Harbor", pickup: "National Harbor, MD", region: "md", airport: "DCA", neighbors: ["alexandria", "washington-dc", "arlington"] },
  { slug: "baltimore", name: "Baltimore", pickup: "Baltimore, MD", region: "md", airport: "BWI", neighbors: ["annapolis", "washington-dc", "silver-spring"] },
  { slug: "annapolis", name: "Annapolis", pickup: "Annapolis, MD", region: "md", airport: "BWI", neighbors: ["baltimore", "washington-dc", "national-harbor"] },
  { slug: "arlington", name: "Arlington", pickup: "Arlington, VA", region: "va", airport: "DCA", neighbors: ["washington-dc", "alexandria", "mclean"] },
  { slug: "alexandria", name: "Alexandria", pickup: "Alexandria, VA", region: "va", airport: "DCA", neighbors: ["arlington", "washington-dc", "national-harbor"] },
  { slug: "mclean", name: "McLean", pickup: "McLean, VA", region: "va", airport: "IAD", neighbors: ["tysons", "arlington", "bethesda"] },
  { slug: "tysons", name: "Tysons", pickup: "Tysons, VA", region: "va", airport: "IAD", neighbors: ["mclean", "reston", "fairfax"] },
  { slug: "fairfax", name: "Fairfax", pickup: "Fairfax, VA", region: "va", airport: "IAD", neighbors: ["tysons", "reston", "arlington"] },
  { slug: "reston", name: "Reston", pickup: "Reston, VA", region: "va", airport: "IAD", neighbors: ["tysons", "ashburn", "fairfax"] },
  { slug: "ashburn", name: "Ashburn", pickup: "Ashburn, VA", region: "va", airport: "IAD", neighbors: ["sterling", "reston", "leesburg"] },
  { slug: "sterling", name: "Sterling", pickup: "Sterling, VA", region: "va", airport: "IAD", neighbors: ["ashburn", "reston", "leesburg"] },
  { slug: "leesburg", name: "Leesburg", pickup: "Leesburg, VA", region: "va", airport: "IAD", neighbors: ["ashburn", "sterling", "reston"] },
].map((a) => ({ ...a, path: areaPath(a.slug), stateName: STATE_NAME[a.region], venues: [], routes: [], fbo: null }));

/** Venues (SEO wave). Populated with DMV venues in the scale wave. */
export const VENUES = [
  { slug: "capital-one-arena", name: "Capital One Arena", category: "Arenas & Stadiums" },
  { slug: "nationals-park", name: "Nationals Park", category: "Arenas & Stadiums" },
  { slug: "audi-field", name: "Audi Field", category: "Arenas & Stadiums" },
  { slug: "northwest-stadium", name: "Northwest Stadium", category: "Arenas & Stadiums" },
  { slug: "walter-washington-convention-center", name: "Walter E. Washington Convention Center", category: "Convention & Expo" },
  { slug: "gaylord-national", name: "Gaylord National Resort", category: "Convention & Expo" },
  { slug: "the-kennedy-center", name: "The Kennedy Center", category: "Performing Arts" },
  { slug: "wolf-trap", name: "Wolf Trap", category: "Performing Arts" },
  { slug: "mgm-national-harbor", name: "MGM National Harbor", category: "Entertainment & Resorts" },
].map((v) => ({ ...v, path: `/services/${v.slug}-car-service/` }));

/** Events (SEO wave). One evergreen URL per recurring event — no year in slugs. */
export const EVENTS = [
  { slug: "national-cherry-blossom-festival", name: "National Cherry Blossom Festival" },
  { slug: "marine-corps-marathon", name: "Marine Corps Marathon" },
  { slug: "july-4th-national-mall", name: "Independence Day on the National Mall" },
  { slug: "capital-pride", name: "Capital Pride" },
  { slug: "dc-jazz-festival", name: "DC Jazz Festival" },
].map((e) => ({ ...e, path: `/events/${e.slug}/` }));

/** Private-jet airfields / FBOs (SEO wave). areas = nearby area pages. */
export const FBOS = [
  { slug: "signature-iad", code: "Signature IAD", name: "Signature Aviation at Dulles (IAD)", areas: ["reston", "ashburn", "tysons"] },
  { slug: "signature-dca", code: "Signature DCA", name: "Signature Aviation at Reagan National (DCA)", areas: ["arlington", "washington-dc", "alexandria"] },
  { slug: "signature-bwi", code: "Signature BWI", name: "Signature Aviation at BWI", areas: ["baltimore", "annapolis", "silver-spring"] },
  { slug: "manassas", code: "HEF", name: "Manassas Regional Airport (HEF)", areas: ["fairfax", "tysons", "reston"] },
  { slug: "leesburg-executive", code: "JYO", name: "Leesburg Executive Airport (JYO)", areas: ["leesburg", "ashburn", "sterling"] },
  { slug: "montgomery-airpark", code: "GAI", name: "Montgomery County Airpark (GAI)", areas: ["gaithersburg", "germantown", "rockville"] },
  { slug: "frederick", code: "FDK", name: "Frederick Municipal Airport (FDK)", areas: ["germantown", "gaithersburg", "rockville"] },
].map((f) => ({ ...f, path: `/private-jet-fbo-transfers/${f.slug}/` }));

/** DC airport + travel guides (SEO wave). */
export const GUIDES = [
  { slug: "getting-to-from-dc-airports", name: "Getting To & From the DC Airports", title: "Getting To & From the DC Airports" },
  { slug: "private-aviation-fbo-guide", name: "DC Private Aviation & FBO Guide", title: "DC Private Aviation & FBO Guide" },
  { slug: "corporate-travel-dc", name: "Corporate Travel in the DC Metro", title: "Corporate Travel in the DC Metro" },
].map((g) => ({ ...g, path: `/dc-airport-guide/${g.slug}/` }));

/** Airport + city routes (SEO wave, the core booking engine). */
export const ROUTES = [].map((r) => ({ ...r, path: routePath(r.slug), label: r.label || `${r.city}` }));

/** Lookup by slug (throws on a typo so a broken link map fails the build). */
export function bySlug(list, slug) {
  const hit = list.find((x) => x.slug === slug);
  if (!hit) throw new Error(`config: unknown slug "${slug}"`);
  return hit;
}

/**
 * Built-page registry. build.js fills it before rendering HTML so shared
 * chrome (nav, footer) can skip links to pages that don't exist yet.
 */
export const BUILT = new Set();
export const isBuilt = (path) => BUILT.has(path);

/**
 * What every airport ride includes (client-confirmable). Rendered as-is in the
 * airport hub "At a Glance" block — edit here, never in page copy.
 */
export const INCLUDED = [
  "Flight tracking",
  "Meet & greet",
  "No charge for flight delays",
  "Complimentary grace period",
  "Complimentary Wi-Fi",
];

/** Pricing facts. Factors mirror the Terms. */
export const PRICING = {
  surge: "No surge pricing",
  factors: ["distance", "vehicle type", "service duration", "tolls", "additional stops"],
};

/** "up to 6 passengers" / "3–4 passengers" from a CAPACITY entry. */
export function paxLabel(c) {
  return c.paxMin ? `${c.paxMin}–${c.paxMax} passengers` : `up to ${c.paxMax} passengers`;
}

/** Cancellation policy (client-confirmable) — shared by the trust line + FAQ. */
export const CANCELLATION = {
  short: "Free cancellation up to 24 hours before pickup",
  full: "Cancellation is free up to 24 hours before your scheduled pickup. Cancellations made within 24 hours of pickup are charged 100% of the fare.",
};

export const SITE = {
  // --- Identity -----------------------------------------------------------
  company: "Landio Limo Services", // brand display name
  companyShort: "Landio",
  // CONFIRM: registered entity on the live Terms of Service.
  legalName: "Landio Limo Services LLC",

  description:
    "Luxury chauffeured car & limo service across the Washington, DC metro — " +
    "DC, Maryland, and Northern Virginia. IAD, DCA & BWI airport transfers, " +
    "corporate and executive travel, private jet/FBO transfers, diplomatic " +
    "transportation, and group transport in Sprinter vans, mini buses, and " +
    "charter buses. Available 24/7.",

  // --- NAP ----------------------------------------------------------------
  address: {
    street: "12410 Milestone Center Dr, Ste 600",
    city: "Germantown",
    region: "MD",
    regionName: "Maryland",
    postalCode: "20876",
    country: "US",
    countryName: "USA",
  },

  // Main phone — see PHONE above (the one value to swap for call tracking).
  phone: PHONE,

  // CONFIRM: registered A2P 10DLC SMS number. Using the main line for now.
  smsNumber: "(240) 595-7025",

  // CONFIRM: effective dates once the Terms/Privacy pages are finalized.
  termsEffectiveDate: "November 1, 2026",
  privacyEffectiveDate: "November 1, 2026",
  // CONFIRM: the About page founder/director credit.
  director: null,

  email: "info@landiolimo.com",

  // --- Operations ---------------------------------------------------------
  hours: "24/7, including holidays",
  responsePromise: "We respond within 1 hour.",
  responseShort: "Response within 1 hour",

  chauffeurDetailsBeforePickup: true,
  chauffeurDetailsLine: "You'll receive your chauffeur's details before pickup",

  serviceArea: ["Washington, DC", "Maryland", "Northern Virginia"],
  serviceAreaCodes: ["DC", "MD", "VA"],

  // IATA codes + names. The three airports Landio serves.
  airports: [
    { code: "IAD", name: "Washington Dulles International Airport" },
    { code: "DCA", name: "Ronald Reagan Washington National Airport" },
    { code: "BWI", name: "Baltimore/Washington International Thurgood Marshall Airport" },
  ],

  // --- Voice --------------------------------------------------------------
  taglines: [
    "The DC Metro's Premier Luxury Transportation.",
    "Luxury, Comfort & Discretion In Every Ride.",
  ],

  // --- Fleet (CONFIRM seat/bag counts with the client) --------------------
  // Single source for the vehicle dropdown AND the fleet pages.
  // Capacities come from CAPACITY above — edit them there, not here.
  fleet: [
    {
      key: "sedan",
      name: "Executive Sedan",
      slug: "executive-sedan",
      seats: CAPACITY.sedan.paxMax,
      pax: paxLabel(CAPACITY.sedan),
      bags: CAPACITY.sedan.bags,
      image: "/assets/img/fleet/executive-sedan-1024.jpg",
      imageBase: "/assets/img/fleet/executive-sedan",
      amenities: ["Wi-Fi", "Leather seats", "Climate control", "USB charging"],
      desc: `Elegant sedan service for business travelers, couples, and airport transfers — premium comfort and a quiet ride for ${paxLabel(CAPACITY.sedan)}.`,
    },
    {
      key: "suv",
      name: "Luxury SUV",
      slug: "luxury-suv",
      seats: CAPACITY.suv.paxMax,
      pax: paxLabel(CAPACITY.suv),
      bags: CAPACITY.suv.bags,
      image: "/assets/img/fleet/executive-suv-1024.jpg",
      imageBase: "/assets/img/fleet/executive-suv",
      amenities: ["Wi-Fi", "Leather seats", "Climate control", "USB charging"],
      desc: `Spacious black SUV transportation for airport transfers, executive travel, and VIP service across the DC metro — seats ${paxLabel(CAPACITY.suv)} with room for luggage.`,
    },
    {
      key: "sprinter",
      name: "Sprinter Van",
      slug: "sprinter-van",
      seats: CAPACITY.sprinter.paxMax,
      pax: paxLabel(CAPACITY.sprinter),
      bags: CAPACITY.sprinter.bags,
      image: "/assets/img/fleet/sprinter-van-1024.jpg",
      imageBase: "/assets/img/fleet/sprinter-van",
      amenities: ["Wi-Fi", "Executive seating", "Climate control"],
      desc: `Luxury Sprinter van for groups, airport pickups, corporate roadshows, and private transfers — ${paxLabel(CAPACITY.sprinter)} with generous luggage capacity and executive comfort.`,
    },
    {
      key: "minibus",
      name: "Mini Bus",
      slug: "mini-bus",
      seats: CAPACITY.minibus.paxMax,
      pax: paxLabel(CAPACITY.minibus),
      bags: CAPACITY.minibus.bags,
      image: "/assets/img/fleet/mini-bus-1024.jpg",
      imageBase: "/assets/img/fleet/mini-bus",
      amenities: ["Climate control", "Comfortable seating", "Luggage bays"],
      desc: `Comfortable group transportation for corporate outings, conference shuttles, and private events across the DC metro and beyond — ${paxLabel(CAPACITY.minibus)}.`,
    },
    {
      key: "coach",
      name: "Charter Bus",
      slug: "charter-bus",
      seats: CAPACITY.coach.paxMax,
      pax: paxLabel(CAPACITY.coach),
      bags: CAPACITY.coach.bags,
      image: "/assets/img/fleet/motor-coach-1024.jpg",
      imageBase: "/assets/img/fleet/motor-coach",
      amenities: ["Climate control", "Reclining seats", "Overhead storage"],
      desc: `Premium charter bus for larger parties needing reliable, comfortable, professionally managed travel — ${paxLabel(CAPACITY.coach)}.`,
    },
  ],

  // --- Services (pillar = /services/) -------------------------------------
  // Single source for the homepage service grid, the /services hub, the nav
  // dropdown, and the Service JSON-LD. `url` is the canonical path.
  services: [
    {
      title: "Airport Transfers",
      slug: "airport-transfers",
      url: "/services/airport-transfers/",
      icon: "airplane",
      blurb:
        "Reliable transfers to and from Dulles (IAD), Reagan National (DCA), and Baltimore/Washington (BWI). We track your flight in real time so your pickup stays punctual, even if your flight is delayed.",
    },
    {
      title: "Corporate & Executive Travel",
      slug: "corporate-executive",
      url: "/services/corporate-executive/",
      icon: "briefcase",
      blurb:
        "Discreet, professional chauffeur transportation for executives, business travelers, and VIP guests across the DC metro and the Northeast corridor.",
    },
    {
      title: "Private Jet & FBO Transfers",
      slug: "fbo-private-jet",
      url: "/services/fbo-private-jet/",
      icon: "airplane",
      blurb:
        "Premium transfers to and from the region's private-aviation terminals and FBOs — Signature at IAD, DCA, and BWI, plus Manassas, Leesburg Executive, Montgomery County Airpark, and Frederick. Seamless coordination with your flight crew.",
    },
    {
      title: "Diplomatic Transportation",
      slug: "diplomatic-transportation",
      url: "/services/diplomatic-transportation/",
      icon: "shield",
      blurb:
        "Discreet, protocol-aware chauffeur service for embassies, missions, delegations, and visiting dignitaries across Washington, DC — professional, punctual, and confidential.",
    },
    {
      title: "Group Transfers",
      slug: "group-transfers",
      url: "/services/group-transfers/",
      icon: "van",
      blurb:
        `Luxury group transportation for corporate groups, conference shuttles, wedding guests, and private events — Sprinter vans, mini buses, and charter buses up to ${CAPACITY.coach.paxMax} passengers.`,
    },
    {
      title: "Meet & Greet Service",
      slug: "meet-and-greet",
      url: "/services/meet-and-greet/",
      icon: "handshake",
      blurb:
        "Your chauffeur meets you inside the arrivals area with a personalized name sign, assists with luggage, and escorts you to your vehicle.",
    },
    {
      title: "Hourly Chauffeur Service",
      slug: "hourly-chauffeur",
      url: "/services/hourly-chauffeur/",
      icon: "calendar",
      blurb:
        "Flexible transportation for meetings, roadshows, dinners, events, and full-day DC travel. Your dedicated chauffeur waits wherever the day takes you.",
    },
  ],

  // --- Know Before You Book (homepage card) -----------------------------
  knowBeforeYouBook: [
    { q: "Does the vehicle offer complimentary Wi-Fi?", a: "Yes — complimentary Wi-Fi is available in our sedans and SUVs." },
    { q: "Can I request a specific chauffeur?", a: "Yes — add the request to your booking, subject to availability." },
    { q: "Are unplanned stops allowed?", a: "Yes — just tell your chauffeur. Added stops may affect your fare." },
    { q: "Is there a grace period for delays?", a: "Yes — a complimentary grace period is included." },
  ],

  cancellation: CANCELLATION,

  // --- Why Landio (value props) -------------------------------------------
  valueProps: [
    {
      title: "Real-time flight tracking",
      body:
        "We monitor inbound flights into Dulles (IAD), Reagan National (DCA), and BWI and adjust your pickup to the actual landing time — early or delayed, your chauffeur is there.",
    },
    {
      title: "Meet & greet service",
      body:
        "Inside-terminal greeting with a name sign and luggage assistance, so arrivals are calm from the moment you land.",
    },
    {
      title: "Transparent instant quotes",
      body:
        "Every trip is quoted individually — no surge pricing and no games. You approve the quotation before anything is booked.",
    },
    {
      title: "24/7 dispatch",
      body:
        "A live dispatch team around the clock, every day of the year, holidays included. We respond within one hour.",
    },
    {
      title: "Full DC, Maryland & Virginia coverage",
      body:
        "One standard of service across Washington, DC, Maryland, and Northern Virginia — door to door, every time.",
    },
  ],

  // --- Seed FAQs (for FAQPage schema + on-page markup) --------------------
  faqs: [
    {
      q: "Do you track flights for airport pickups?",
      a: "Yes. We track all flights into Dulles (IAD), Reagan National (DCA), and Baltimore/Washington (BWI) in real time. If your flight is delayed or arrives early, we automatically adjust your pickup time at no extra charge. Your chauffeur will be there when you land.",
    },
    {
      q: "How much is a car service from Dulles to Washington, DC?",
      a: `Rates vary based on vehicle type and your exact destination. Use our booking form or call us at ${PHONE.display} for an instant quote.`,
    },
    {
      q: "Do you provide service to and from IAD, DCA, and BWI?",
      a: "Yes. We specialize in airport transfers across all three DC-area airports — Dulles, Reagan National, and BWI — to and from Washington, DC, Maryland, and Northern Virginia.",
    },
    {
      q: "What if my flight is delayed?",
      a: "No problem. We monitor all arrivals and automatically adjust pickup times for delays, with no additional charge for the delay itself. Your chauffeur will be waiting when you arrive.",
    },
    {
      q: "Can I book a Sprinter van, mini bus, or charter bus for group transportation?",
      a: "Absolutely. Our fleet includes Sprinter vans, mini buses, and charter buses for corporate groups, conferences, weddings, and private events across the DC metro. Choose your vehicle in the booking form or call us for a group quote.",
    },
    {
      q: "What is your cancellation policy?",
      a: CANCELLATION.full,
    },
  ],

  // --- Navigation (single source for header + footer) --------------------
  // Links to pages that aren't built yet are skipped at render time (isBuilt),
  // so nothing dangles. Cluster items (Areas, Venues, Events, Routes) activate
  // automatically once those pages ship in the SEO wave.
  nav: [
    { label: "Services", href: "/services/", children: "services" },
    { label: "Fleet", href: "/fleet/" },
    { label: "Airports", href: "/dc-airport-car-service/" },
    { label: "Areas", href: "/areas/", children: "areas" },
    { label: "Venues", href: "/venues/", children: "venues" },
    { label: "Events", href: "/events/", children: "events" },
    { label: "Routes", href: "/routes/" },
    { label: "About", href: "/about-us/" },
    { label: "Reservations", href: "/reservations/" },
    { label: "Contact", href: "/contact/" },
  ],

  // Footer = hubs + core pages only.
  footerQuickLinks: [
    { label: "Airport Transfers", href: "/services/airport-transfers/" },
    { label: "Corporate & Executive Travel", href: "/services/corporate-executive/" },
    { label: "Private Jet & FBO Transfers", href: "/private-jet-fbo-transfers/" },
    { label: "Diplomatic Transportation", href: "/services/diplomatic-transportation/" },
    { label: "Group Transfers", href: "/services/group-transfers/" },
    { label: "Our Fleet", href: "/fleet/" },
    { label: "All Services", href: "/services/" },
  ],
  footerCompany: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us/" },
    { label: "Reservations", href: "/reservations/" },
    { label: "Become a Partner", href: "/become-a-partner/" },
    { label: "Contact", href: "/contact/" },
  ],
  footerSupport: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Disclaimer", href: "/disclaimer/" },
    { label: "Terms of Service", href: "/terms-of-service/" },
    { label: "SMS Policy", href: "/sms-policy/" },
    { label: "Cancellation Policy", href: "/cancellation-policy/" },
  ],

  // --- Social / sameAs (fill in as profiles are confirmed) ---------------
  sameAs: [],
};

/**
 * Build a full absolute URL for a site-relative path using the canonical
 * origin resolved at build time.
 */
export function absoluteUrl(siteUrl, path = "/") {
  const origin = (siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

/** PostalAddress object, omitting street/postal when they are not published. */
function postalAddress() {
  const a = SITE.address;
  const postal = {
    "@type": "PostalAddress",
    addressLocality: a.city,
    addressRegion: a.region,
    addressCountry: a.country,
  };
  if (a.street) postal.streetAddress = a.street;
  if (a.postalCode) postal.postalCode = a.postalCode;
  return postal;
}

/**
 * JSON-LD graph (LimousineService + LocalBusiness). Reused on every page from
 * the SSOT. NAP/airports/areaServed/openingHours all flow from SITE.
 */
export function businessJsonLd(siteUrl) {
  const origin = (siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
  // areaServed = the DC metro (DC / MD / VA) plus the airports we serve.
  const areaServed = [
    { "@type": "City", name: "Washington, DC" },
    { "@type": "AdministrativeArea", name: "Maryland" },
    { "@type": "AdministrativeArea", name: "Northern Virginia" },
    ...SITE.airports.map((a) => ({
      "@type": "Airport",
      name: a.name,
      iataCode: a.code,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LimousineService", "LocalBusiness"],
        "@id": `${origin}/#business`,
        name: SITE.company,
        url: `${origin}/`,
        email: SITE.email,
        telephone: SITE.phone.e164,
        address: postalAddress(),
        areaServed,
        serviceType: SITE.services.map((s) => s.title),
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        slogan: SITE.taglines[0],
        description: SITE.description,
        ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
      },
    ],
  };
}

/**
 * Service JSON-LD for a single service/spoke or route page. Ties the service
 * to the business as provider and to the DC metro as the service area.
 */
export function serviceJsonLd(siteUrl, { name, path, description }) {
  const origin = (siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    url: `${origin}${path}`,
    provider: { "@type": "LimousineService", "@id": `${origin}/#business`, name: SITE.company },
    areaServed: { "@type": "City", name: "Washington, DC" },
    ...(description ? { description } : {}),
  };
}

/**
 * FAQPage JSON-LD built from the SAME faqs used in the markup. Pass the list of
 * { q, a } you render on the page so schema and content never diverge.
 */
export function faqJsonLd(faqs = SITE.faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * BreadcrumbList JSON-LD (used on spokes). `trail` is an ordered list of
 * { name, path }; the last item is the current page.
 */
export function breadcrumbJsonLd(siteUrl, trail = []) {
  if (!trail.length) return null;
  const origin = (siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${origin}${t.path}`,
    })),
  };
}

/**
 * CollectionPage + ItemList JSON-LD (used on hubs). `items` is an ordered list
 * of { name, path }.
 */
export function collectionJsonLd(siteUrl, { name, path, items = [] }) {
  const origin = (siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${origin}${path}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: `${origin}${it.path}`,
      })),
    },
  };
}
