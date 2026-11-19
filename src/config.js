/**
 * Aura Hamptons — Single source of truth (SSOT).
 *
 * NAP + brand facts live here ONCE and are reused across header, footer,
 * contact bar, JSON-LD, and every page. Do not hardcode any of these values
 * anywhere else in the codebase.
 *
 * Business: premium chauffeured ground transportation serving the Hamptons —
 * the East End of Long Island, NY — plus the New York City ↔ Hamptons corridor.
 * Fleet runs from Executive Sedan up to Motor Coach. Airports served: JFK, LGA,
 * EWR, ISP, FOK, HTO. Yacht charter is a live, separate brand line.
 *
 * ── CONFIRM BEFORE LAUNCH (do not invent — A2P/legal sensitive) ──────────────
 *  • SITE.legalName — the registered entity on the client's Terms of Service.
 *    Placeholder below is the operating brand name; confirm the LLC/Inc on file.
 *  • SITE.smsNumber — the registered A2P 10DLC sending number. Placeholder is
 *    the main line; confirm the actual 10DLC number before the SMS opt-in ships.
 */

/**
 * Canonical origin. Derived from SITE_URL at build time (see build.js), never
 * hardcoded into pages. The value below is only the default used when SITE_URL
 * is unset locally.
 */
export const DEFAULT_SITE_URL = "https://aurahamptonslimo.com";

/**
 * Fleet capacities (from the live Aura Hamptons site) — the ONE place to change
 * passenger/bag counts. Every page, FAQ, dropdown, and schema reads these.
 * `paxMin` is only set when a range should be shown; `bags: null` hides the
 * luggage count (group vehicles quote luggage on request).
 */
export const CAPACITY = {
  sedan: { paxMin: null, paxMax: 3, bags: 3 },
  suv: { paxMin: null, paxMax: 6, bags: 6 },
  sprinterjet: { paxMin: null, paxMax: 9, bags: null },
  sprinter: { paxMin: null, paxMax: 14, bags: 14 },
  minibus: { paxMin: null, paxMax: 40, bags: null },
  coach: { paxMin: null, paxMax: 56, bags: null },
};

/**
 * Main phone — the ONE value to swap for a call-tracking number later. Every
 * tel: link, footer, schema, FAQ, and legal page reads this.
 * display = human form, e164 = tel: links + schema.
 */
export const PHONE = {
  display: "+1 (934) 732-4556",
  local: "(934) 732-4556", // national format, for tight copy like meta descriptions
  e164: "+19347324556",
};

/** The airport-hub URL — one value for every inbound link, nav, and redirect. */
export const ATL_HUB_PATH = "/hamptons-airport-car-service/";

/** Pickup string used to prefill the quote form for airport bookings. */
export const PRIMARY_AIRPORT_PICKUP = "John F. Kennedy International Airport (JFK)";

/**
 * Primary airport pickups (prefill for the two headline airport boxes) + their
 * future pages. The full six-airport cluster is built in the SEO wave.
 */
export const ATL_TERMINALS = {
  domestic: {
    pickup: "John F. Kennedy International Airport (JFK)",
    page: "/hamptons-airport-car-service/jfk/",
  },
  international: {
    pickup: "LaGuardia Airport (LGA)",
    page: "/hamptons-airport-car-service/lga/",
  },
};

/**
 * Airport meeting points. Generic, client-confirmable wording — no terminal
 * side is named until the client confirms it (see docs/OPEN-QUESTIONS.md).
 */
export const DOMESTIC_MEETING_POINT = "on the arrivals level, curbside or with a meet & greet inside the terminal";
export const INTERNATIONAL_MEETING_POINT = "inside the arrivals hall at the meet & greet point, or curbside on the arrivals level";

/* ==========================================================================
 * PAGE MAPS — the link graph. Every internal link between clusters (nav, hubs,
 * "nearby" cards, related pages, /services/ directory, redirects) is GENERATED
 * from these maps. Page copy and sourced facts live in src/content/*.js keyed
 * by the same slugs. (Cluster pages are built in the programmatic-SEO wave; the
 * core site reads identity/fleet/services/nav/footer only.)
 * ======================================================================== */
export const HUBS = {
  airport: { path: ATL_HUB_PATH, name: "Hamptons Airport Car Service" },
  guides: { path: "/hamptons-travel-guide/", name: "Hamptons Travel Guide" },
  areas: { path: "/areas/", name: "Areas We Serve" },
  venues: { path: "/venues/", name: "Venues" },
  events: { path: "/events/", name: "Events" },
  fbo: { path: "/private-jet-fbo-transfers/", name: "Private Jet & FBO Transfers" },
  routes: { path: "/routes/", name: "NYC ↔ Hamptons Routes" },
  services: { path: "/services/", name: "All Services & Destinations" },
  fleet: { path: "/fleet/", name: "Our Fleet" },
};

export const areaPath = (slug) => `/areas/${slug}-car-service/`;
export const routePath = (slug) => `/routes/${slug}/`;

/**
 * Hamptons villages & hamlets (SEO wave). neighbors = 3 nearby areas;
 * venues/routes/fbo = link targets. Seeded now; pages built in the wave.
 */
export const AREAS = [
  { slug: "southampton", name: "Southampton", pickup: "Southampton, NY", base: true, neighbors: ["water-mill", "bridgehampton", "hampton-bays"], venues: ["shinnecock-hills", "national-golf-links"], fbo: "fok", routes: ["nyc-to-southampton"] },
  { slug: "east-hampton", name: "East Hampton", pickup: "East Hampton, NY", neighbors: ["amagansett", "wainscott", "sag-harbor"], venues: ["maidstone-club"], fbo: "hto", routes: ["nyc-to-east-hampton"] },
  { slug: "montauk", name: "Montauk", pickup: "Montauk, NY", neighbors: ["amagansett", "east-hampton", "sag-harbor"], venues: ["montauk-yacht-club"], fbo: "hto", routes: ["nyc-to-montauk"] },
  { slug: "sag-harbor", name: "Sag Harbor", pickup: "Sag Harbor, NY", neighbors: ["bridgehampton", "east-hampton", "shelter-island"], venues: ["wolffer-estate"], fbo: "hto", routes: ["nyc-to-sag-harbor"] },
  { slug: "bridgehampton", name: "Bridgehampton", pickup: "Bridgehampton, NY", neighbors: ["water-mill", "sag-harbor", "wainscott"], venues: ["bridgehampton-polo"], fbo: "hto", routes: ["nyc-to-bridgehampton"] },
  { slug: "water-mill", name: "Water Mill", pickup: "Water Mill, NY", neighbors: ["southampton", "bridgehampton", "sagaponack"], venues: ["wolffer-estate"], fbo: "fok", routes: ["nyc-to-southampton"] },
  { slug: "amagansett", name: "Amagansett", pickup: "Amagansett, NY", neighbors: ["east-hampton", "montauk", "wainscott"], venues: ["maidstone-club"], fbo: "hto", routes: ["nyc-to-east-hampton"] },
  { slug: "westhampton-beach", name: "Westhampton Beach", pickup: "Westhampton Beach, NY", neighbors: ["quogue", "hampton-bays", "southampton"], venues: [], fbo: "fok", routes: ["nyc-to-southampton"] },
  { slug: "wainscott", name: "Wainscott", pickup: "Wainscott, NY", neighbors: ["east-hampton", "bridgehampton", "sagaponack"], venues: [], fbo: "hto", routes: ["nyc-to-east-hampton"] },
  { slug: "sagaponack", name: "Sagaponack", pickup: "Sagaponack, NY", neighbors: ["bridgehampton", "water-mill", "wainscott"], venues: [], fbo: "hto", routes: ["nyc-to-bridgehampton"] },
  { slug: "quogue", name: "Quogue", pickup: "Quogue, NY", neighbors: ["westhampton-beach", "hampton-bays", "southampton"], venues: [], fbo: "fok", routes: ["nyc-to-southampton"] },
  { slug: "shelter-island", name: "Shelter Island", pickup: "Shelter Island, NY", neighbors: ["sag-harbor", "greenport", "east-hampton"], venues: [], fbo: "hto", routes: ["nyc-to-sag-harbor"] },
  { slug: "hampton-bays", name: "Hampton Bays", pickup: "Hampton Bays, NY", neighbors: ["southampton", "westhampton-beach", "quogue"], venues: [], fbo: "fok", routes: ["nyc-to-southampton"] },
].map((a) => ({ ...a, path: areaPath(a.slug) }));

/** Venues (SEO wave). area = the area page it sits in / next to. */
export const VENUES = [
  { slug: "shinnecock-hills", name: "Shinnecock Hills Golf Club", area: "southampton", events: [], top: 1 },
  { slug: "national-golf-links", name: "National Golf Links of America", area: "southampton", events: [], top: 2 },
  { slug: "maidstone-club", name: "The Maidstone Club", area: "east-hampton", events: [], top: 3 },
  { slug: "wolffer-estate", name: "Wölffer Estate Vineyard", area: "sagaponack", events: [], top: 4 },
  { slug: "bridgehampton-polo", name: "Bridgehampton Polo Club", area: "bridgehampton", events: [], top: 5 },
  { slug: "montauk-yacht-club", name: "Montauk Yacht Club", area: "montauk", events: [], top: 6 },
].map((v) => ({ ...v, path: `/services/${v.slug}-car-service/` }));

/** Events (SEO wave). One evergreen URL per recurring event — no year in slugs. */
// `venue` holds a config VENUES slug ONLY when the event is genuinely held at
// that venue page. The Hampton Classic is at its own Show Grounds (NOT the
// Bridgehampton Polo Club — the official FAQ states there is no polo), and HIFF
// is a multi-venue festival across the East End (NOT the Maidstone Club), so
// both are `venue: null` and their factual venues live in src/pages/events.js.
export const EVENTS = [
  { slug: "hampton-classic", name: "Hampton Classic Horse Show", path: "/events/hampton-classic-transportation/", venue: null },
  { slug: "hamptons-film-festival", name: "Hamptons International Film Festival", path: "/events/hamptons-film-festival-transportation/", venue: null },
];

/** Private-jet airfields (SEO wave). areas = 3 nearby area pages. */
export const FBOS = [
  { slug: "hto", code: "HTO", name: "East Hampton Airport", path: "/private-jet-fbo-transfers/hto-east-hampton/", areas: ["east-hampton", "amagansett", "sag-harbor"] },
  { slug: "fok", code: "FOK", name: "Francis S. Gabreski Airport", path: "/private-jet-fbo-transfers/fok-gabreski/", areas: ["southampton", "westhampton-beach", "hampton-bays"] },
];

/** Hamptons travel guides (SEO wave). */
export const GUIDES = [
  { slug: "getting-to-the-hamptons", title: "Getting to the Hamptons from NYC", path: "/hamptons-travel-guide/getting-to-the-hamptons/", terminal: "domestic" },
  { slug: "hamptons-season-guide", title: "The Hamptons Season — When to Visit", path: "/hamptons-travel-guide/hamptons-season-guide/", terminal: "international" },
];

/** NYC ↔ Hamptons corridor + inter-Hamptons routes (the core booking engine). */
export const ROUTES = [
  { slug: "nyc-to-southampton", city: "Southampton", state: "NY", oldSlug: "nyc-to-southampton", label: "NYC to Southampton" },
  { slug: "nyc-to-east-hampton", city: "East Hampton", state: "NY", oldSlug: "nyc-to-east-hampton", label: "NYC to East Hampton" },
  { slug: "nyc-to-montauk", city: "Montauk", state: "NY", oldSlug: "nyc-to-montauk", label: "NYC to Montauk" },
  { slug: "nyc-to-sag-harbor", city: "Sag Harbor", state: "NY", oldSlug: "nyc-to-sag-harbor", label: "NYC to Sag Harbor" },
  { slug: "nyc-to-bridgehampton", city: "Bridgehampton", state: "NY", oldSlug: "nyc-to-bridgehampton", label: "NYC to Bridgehampton" },
  { slug: "jfk-to-the-hamptons", city: "the Hamptons", state: "NY", oldSlug: "jfk-to-the-hamptons", label: "JFK to the Hamptons" },
].map((r) => ({ ...r, path: routePath(r.slug), label: r.label || `${r.city}` }));

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
  company: "Aura Hamptons", // brand display name (not category-locked)
  companyShort: "Aura Hamptons",
  // CONFIRM: registered entity on the live Terms of Service. Placeholder = brand.
  legalName: "Aura Car & Limo Service",

  description:
    "Premium chauffeured car & limo service across the Hamptons and the East " +
    "End of Long Island — JFK, LGA, EWR, ISP, FOK & HTO airport transfers, the " +
    "NYC-to-Hamptons corridor, executive and corporate travel, group transport, " +
    "private jet/FBO transfers, and hourly chauffeur service. Available 24/7.",

  // --- NAP ----------------------------------------------------------------
  address: {
    street: "53 Hill St",
    city: "Southampton",
    region: "NY",
    regionName: "New York",
    postalCode: "11968",
    country: "US",
    countryName: "USA",
  },

  // Main phone — see PHONE above (the one value to swap for call tracking).
  phone: PHONE,

  // CONFIRM: registered A2P 10DLC SMS number. Placeholder = main line. Must be
  // the real 10DLC sending number before the SMS opt-in ships.
  smsNumber: "(934) 732-4556",

  // CONFIRM: effective dates once the Terms/Privacy pages are finalized.
  termsEffectiveDate: "January 1, 2026",
  privacyEffectiveDate: "January 1, 2026",
  // CONFIRM: the live About page credits founder "Max" (est. 2000).
  director: "Max",

  email: "info@aurahamptonslimo.com",

  // --- Operations ---------------------------------------------------------
  hours: "24/7, including holidays",
  responsePromise: "We respond within 1 hour.",
  responseShort: "Response within 1 hour",

  chauffeurDetailsBeforePickup: true,
  chauffeurDetailsLine: "You'll receive your chauffeur's details before pickup",

  serviceArea: ["The Hamptons", "East End of Long Island", "New York City"],
  serviceAreaCodes: ["NY"],

  // IATA codes + names. The six airports Aura Hamptons serves.
  airports: [
    { code: "JFK", name: "John F. Kennedy International Airport" },
    { code: "LGA", name: "LaGuardia Airport" },
    { code: "EWR", name: "Newark Liberty International Airport" },
    { code: "ISP", name: "Long Island MacArthur Airport" },
    { code: "FOK", name: "Francis S. Gabreski Airport" },
    { code: "HTO", name: "East Hampton Airport" },
  ],

  // --- Voice --------------------------------------------------------------
  taglines: [
    "The Hamptons' Premier Luxury Transportation.",
    "Luxury, Comfort & Elegance In Every Ride.",
  ],

  // --- Fleet (verbatim seat/bag counts from the live Aura Hamptons site) ---
  // Single source for the vehicle dropdown AND the fleet pages.
  // Capacities come from CAPACITY above — edit them there, not here.
  // NOTE: the Sprinter Jet uses its own interior photo (sprinter-jet-*);
  // each vehicle class points at its own image base below.
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
      desc: `Spacious black SUV transportation for airport transfers, family travel, and VIP service throughout the Hamptons — seats ${paxLabel(CAPACITY.suv)} with room for luggage.`,
    },
    {
      key: "sprinterjet",
      name: "Sprinter Jet",
      slug: "sprinter-jet",
      seats: CAPACITY.sprinterjet.paxMax,
      pax: paxLabel(CAPACITY.sprinterjet),
      bags: CAPACITY.sprinterjet.bags,
      image: "/assets/img/fleet/sprinter-jet-1024.jpg",
      imageBase: "/assets/img/fleet/sprinter-jet",
      amenities: ["Wi-Fi", "Executive seating", "Climate control"],
      desc: `Luxury Sprinter for executive groups, airport pickups, and private events — ${paxLabel(CAPACITY.sprinterjet)} in premium comfort.`,
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
      desc: `Luxury Sprinter van for groups, airport pickups, events, and private transfers — ${paxLabel(CAPACITY.sprinter)} with generous luggage capacity and executive comfort.`,
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
      desc: `Comfortable group transportation for corporate outings, wedding guests, and private events throughout the Hamptons and Long Island — ${paxLabel(CAPACITY.minibus)}.`,
    },
    {
      key: "coach",
      name: "Motor Coach",
      slug: "motor-coach",
      seats: CAPACITY.coach.paxMax,
      pax: paxLabel(CAPACITY.coach),
      bags: CAPACITY.coach.bags,
      image: "/assets/img/fleet/motor-coach-1024.jpg",
      imageBase: "/assets/img/fleet/motor-coach",
      amenities: ["Climate control", "Reclining seats", "Overhead storage"],
      desc: `Premium motor coach for larger parties needing reliable, comfortable, professionally managed travel — ${paxLabel(CAPACITY.coach)}.`,
    },
  ],

  // --- Services (pillar = /services/) -------------------------------------
  // Single source for the homepage service grid, the /services hub, the nav
  // dropdown, and the Service JSON-LD. `url` is the canonical path.
  services: [
    {
      title: "Airport Transfers",
      slug: "airport-transfers",
      // Phase 1: a normal /services/ spoke. Phase 2 introduces the dedicated
      // airport hub (ATL_HUB_PATH) with a 301 from here.
      url: "/services/airport-transfers/",
      icon: "airplane",
      blurb:
        "Reliable transfers to and from JFK, LaGuardia, Newark, Islip, Gabreski, and East Hampton Airport. We track your flight in real time so your pickup stays punctual, even if your flight is delayed.",
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
      title: "Corporate & Executive Travel",
      slug: "corporate-executive",
      url: "/services/corporate-executive/",
      icon: "briefcase",
      blurb:
        "Discreet, professional chauffeur transportation for executives, business travelers, and VIP guests across the Hamptons and into New York City.",
    },
    {
      title: "Group Transfers",
      slug: "group-transfers",
      url: "/services/group-transfers/",
      icon: "van",
      blurb:
        `Luxury group transportation for families, wedding guests, corporate travelers, and private events — Sprinter vans, mini buses, and motor coaches up to ${CAPACITY.coach.paxMax} passengers.`,
    },
    {
      title: "Private Jet & FBO Transfers",
      slug: "fbo-private-jet",
      // Phase 1: a normal /services/ spoke. Phase 2 introduces the FBO hub
      // (HUBS.fbo.path) with per-airfield pages and a 301 from here.
      url: "/services/fbo-private-jet/",
      icon: "airplane",
      blurb:
        "Premium transfers to and from Hamptons-area private aviation terminals and FBOs, including East Hampton (HTO) and Gabreski (FOK). Seamless coordination with your flight crew.",
    },
    {
      title: "Hourly Chauffeur Service",
      slug: "hourly-chauffeur",
      url: "/services/hourly-chauffeur/",
      icon: "calendar",
      blurb:
        "Flexible transportation for dinners, meetings, shopping, wine tours, events, and full-day Hamptons travel. Your dedicated chauffeur waits wherever the day takes you.",
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

  // --- Why Aura (value props) ---------------------------------------------
  valueProps: [
    {
      title: "Real-time flight tracking",
      body:
        "We monitor inbound flights into JFK, LaGuardia, Newark, Islip, Gabreski, and East Hampton and adjust your pickup to the actual landing time — early or delayed, your chauffeur is there.",
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
      title: "Full Hamptons & NYC coverage",
      body:
        "One standard of service across the Hamptons, the East End, and the New York City corridor — door to door, every time.",
    },
  ],

  // --- Seed FAQs (for FAQPage schema + on-page markup) --------------------
  faqs: [
    {
      q: "Do you track flights for airport pickups?",
      a: "Yes. We track all flights into JFK, LaGuardia, Newark, Islip, Gabreski, and East Hampton in real time. If your flight is delayed or arrives early, we automatically adjust your pickup time at no extra charge. Your chauffeur will be there when you land.",
    },
    {
      q: "How much is a car service from JFK to the Hamptons?",
      a: `Rates vary based on vehicle type and your exact destination. Use our booking form or call us at ${PHONE.display} for an instant quote.`,
    },
    {
      q: "Do you provide service from JFK and LaGuardia to the Hamptons?",
      a: "Yes. We specialize in the New York City–to–Hamptons corridor, with direct transfers from JFK, LaGuardia, Newark, and Manhattan to Southampton, East Hampton, Montauk, Sag Harbor, Bridgehampton, and the surrounding villages.",
    },
    {
      q: "What if my flight is delayed?",
      a: "No problem. We monitor all arrivals and automatically adjust pickup times for delays, with no additional charge for the delay itself. Your chauffeur will be waiting when you arrive.",
    },
    {
      q: "Can I book a Sprinter van or mini bus for group transportation?",
      a: "Absolutely. Our fleet includes Sprinter vans, mini buses, and motor coaches for weddings, corporate groups, and private events throughout the Hamptons and Long Island. Choose your vehicle in the booking form or call us for a group quote.",
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
    { label: "Aura Yacht", href: "/yacht/" },
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
    { label: "Hamptons Airport Car Service", href: ATL_HUB_PATH },
    { label: "NYC ↔ Hamptons Routes", href: "/routes/" },
    { label: "Private Jet & FBO Transfers", href: "/private-jet-fbo-transfers/" },
    { label: "Areas We Serve", href: "/areas/" },
    { label: "Venues", href: "/venues/" },
    { label: "Events", href: "/events/" },
    { label: "Our Fleet", href: "/fleet/" },
    { label: "All Services & Destinations", href: "/services/" },
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
  sameAs: ["https://www.instagram.com/ridewithaura_"],
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
  // areaServed = the Hamptons / East End plus the airports we serve.
  const areaServed = [
    { "@type": "Place", name: "The Hamptons", containedInPlace: { "@type": "AdministrativeArea", name: "New York" } },
    { "@type": "City", name: "New York City", containedInPlace: { "@type": "AdministrativeArea", name: "New York" } },
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
 * to the business as provider and to the Hamptons as the service area.
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
    areaServed: { "@type": "Place", name: "The Hamptons", containedInPlace: { "@type": "AdministrativeArea", name: "New York" } },
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
