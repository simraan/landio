/**
 * Homepage — Aura Hamptons. Dark/gold design inherited from the shared system;
 * all content localized to the Hamptons / East End of Long Island and the NYC
 * corridor. Fleet is the five Aura Hamptons vehicle classes; routes are the
 * NYC ↔ Hamptons corridor and inter-village trips. One H1, FAQPage JSON-LD,
 * mobile-first. Phase-1 core page: links target built pages only; cluster
 * destinations open the quote modal until their pages ship.
 */

import { SITE, AREAS, faqJsonLd } from "../config.js";
import { esc, quoteForm, btnIcon, fleetPicture } from "../templates/partials.js";
import { svgIcon, knowBeforeYouBookCard, threeStepsSection, cbox, contactSection, fleetCards, faqAccordion, contactBar, eventCta } from "./_sections.js";

const icon = (p) =>
  `<svg class="ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const I = {
  support: icon('<path d="M4 13a8 8 0 0 1 16 0"/><rect x="2.5" y="13" width="4" height="6" rx="1.2"/><rect x="17.5" y="13" width="4" height="6" rx="1.2"/>'),
  chauffeur: icon('<circle cx="12" cy="8" r="3"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>'),
  plane: icon('<path d="M10.5 13.5 3 12l-.5-2 8 1 4-7 2 .5-2.5 7 6 1.5v2l-6-1-2 6-1.5-.5z"/>'),
  wifi: icon('<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>'),
  bulb: icon('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.3-1 2.5H9c0-1.2-.3-1.9-1-2.5A6 6 0 0 1 12 3z"/>'),
  shield: icon('<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/>'),
  usb: icon('<path d="M12 20V6M9 9l3-3 3 3M8 13h8"/>'),
  seat: icon('<path d="M6 19v-3h9a2 2 0 0 0 2-2V5M6 16a2 2 0 0 1-2-2V7"/>'),
  bag: icon('<rect x="6" y="8" width="12" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
  phone: icon('<path d="M4 5c0 8 7 15 15 15l-2-4-4 1c-2-1-4-3-5-5l1-4z"/>'),
  mail: icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  pin: icon('<path d="M12 21s-6.5-5.5-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.5-6.5 10-6.5 10z"/><circle cx="12" cy="11" r="2.3"/>'),
  clock: icon('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  climate: icon('<path d="M12 3v18M3.8 7.5l16.4 9M20.2 7.5l-16.4 9"/>'),
  box: icon('<path d="M12 3l8 4-8 4-8-4 8-4z"/><path d="M4 7v8l8 4 8-4V7"/>'),
  check: icon('<path d="M5 12l5 5 9-11"/>'),
  car: icon('<path d="M5 11l1.6-4.2A2 2 0 0 1 8.4 5.5h7.2a2 2 0 0 1 1.9 1.3L19 11M4 11h16v4H4z"/><circle cx="8" cy="15" r="1.4"/><circle cx="16" cy="15" r="1.4"/>'),
};

function hero() {
  const HERO_IMG = "/assets/img/hero/dc-limo-hero";
  return `
    <section class="hero hero--home">
      <picture class="hero__bg" aria-hidden="true">
        <source type="image/webp" srcset="${HERO_IMG}-640.webp 640w, ${HERO_IMG}-1024.webp 1024w, ${HERO_IMG}-1500.webp 1500w" sizes="100vw">
        <img src="${HERO_IMG}-1500.jpg" srcset="${HERO_IMG}-640.jpg 640w, ${HERO_IMG}-1024.jpg 1024w, ${HERO_IMG}-1500.jpg 1500w" sizes="100vw" alt="" width="1500" height="844" fetchpriority="high" decoding="async">
      </picture>
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="container hero__grid">
        <div>
          <p class="hero__eyebrow">The DC Metro's Premier Luxury Transportation</p>
          <h1>Experience Luxury Car &amp; Limo Service <span class="gold">in the DC Metro</span></h1>
          <p class="hero__sub">Landio Limo Services provides professional chauffeur service, <a href="/services/airport-transfers/">airport transportation</a>, black car service, and executive travel throughout Washington, DC, Maryland, and Northern Virginia.</p>
          <div class="hero__actions">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Book Now</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("call")}Call Now ${esc(SITE.phone.display)}</a>
          </div>
          <div class="hero__divider" aria-hidden="true"></div>
          <ul class="hero__features">
            <li><span class="hf-ico">${I.car}</span>Late-Model Luxury Black Fleet</li>
            <li><span class="hf-ico">${I.plane}</span>Airport &amp; Long-Distance Specialists</li>
            <li><span class="hf-ico">${I.support}</span>24/7 Dedicated Dispatch</li>
          </ul>
        </div>
        ${quoteForm("hero-quote", { heading: "Get Your Instant Quote", location: "hero" })}
      </div>
    </section>`;
}

function fleet() {
  const cards = fleetCards(SITE.fleet);
  return `
    <section class="section section--alt" aria-labelledby="fleet-title" data-cta-trigger>
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Our Premium Fleet</span>
          <h2 id="fleet-title">Luxury Vehicles for Every Occasion</h2>
          <p class="text-secondary">From the Executive Sedan and Executive SUV to Sprinter Vans, Minibuses, and Charter Buses — the right vehicle for airport transfers, corporate travel, diplomatic service, and group trips across the DC metro.</p>
        </div>
        <ul class="fleet-grid">${cards}</ul>
      </div>
    </section>`;
}

function services() {
  const cards = SITE.services
    .map((s) => cbox({ cls: "feature-card card-surface", lead: `<span class="feature-card__icon">${svgIcon(s.icon)}</span>`, title: s.title,
      act: { href: s.url }, bodyHtml: `<p>${esc(s.blurb)}</p>` }))
    .join("");
  return `
    <section class="section" aria-labelledby="move-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">What We Offer</span>
          <h2 id="move-title">Transportation Services</h2>
          <p class="text-secondary">From airport transfers to corporate, diplomatic, and group transportation — one standard of chauffeured service across Washington, DC, Maryland, and Northern Virginia.</p>
        </div>
        <ul class="feature-grid">${cards}</ul>
      </div>
    </section>`;
}

function marquee() {
  const items = [
    "Luxury Black Fleet", "Punctual Pickups", "Professional Chauffeurs",
    "Real-Time Flight Tracking", "Meet & Greet", "24/7 Reservations",
  ];
  const strip = items.map((t) => `<span class="marquee__item">${esc(t)}</span><span class="marquee__dot" aria-hidden="true">&#x2726;</span>`).join("");
  // Two identical groups make the scroll seamless (translateX 0 → -50%). Under
  // prefers-reduced-motion the CSS hides the duplicate and wraps the first group
  // so all six messages stay visible and centered.
  return `
    <div class="marquee" aria-label="Service highlights">
      <div class="marquee__track">
        <div class="marquee__group">${strip}</div>
        <div class="marquee__group" aria-hidden="true">${strip}</div>
      </div>
    </div>`;
}

function routes() {
  // Popular DC-metro airport + corridor trips — tap a chip to prefill the quote popup.
  const ROUTES = [
    "IAD ⇄ Washington, DC", "DCA ⇄ Washington, DC", "BWI ⇄ Washington, DC",
    "IAD ⇄ Bethesda", "IAD ⇄ Tysons", "DCA ⇄ Arlington",
    "Washington, DC ⇄ Baltimore", "Washington, DC ⇄ New York City",
    "Washington, DC ⇄ Philadelphia", "IAD ⇄ Leesburg",
  ];
  const PLACE = {
    IAD: "Washington Dulles International Airport (IAD)",
    DCA: "Ronald Reagan Washington National Airport (DCA)",
    BWI: "Baltimore/Washington International Airport (BWI)",
    "Washington, DC": "Washington, DC",
    Bethesda: "Bethesda, MD",
    Tysons: "Tysons, VA",
    Arlington: "Arlington, VA",
    Baltimore: "Baltimore, MD",
    Leesburg: "Leesburg, VA",
    "New York City": "New York City",
    Philadelphia: "Philadelphia, PA",
  };
  const chips = ROUTES.map((r) => {
    const [from, to] = r.split(" ⇄ ");
    const f = PLACE[from] || from;
    const t = PLACE[to] || to;
    return `<button type="button" class="route-chip" data-open-quote data-route-from="${esc(f)}" data-route-to="${esc(t)}" aria-label="Book ${esc(r)}">${esc(r)}<span class="route-chip__go" aria-hidden="true">&rarr;</span></button>`;
  }).join("");
  return `
    <section class="section" aria-labelledby="routes-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Popular Routes</span>
          <h2 id="routes-title">Popular Airport &amp; City Routes</h2>
          <p class="text-secondary">Our most-requested trips across the DC metro and up the Northeast corridor. Tap one to prefill your quote.</p>
        </div>
        <div class="route-grid">${chips}</div>
      </div>
    </section>`;
}

function whatIncludes() {
  // Raw icon paths so each card can render both an oversized medallion icon and
  // a large faint "ghost" glyph for cinematic depth. Content unchanged.
  const ghost = (p) =>
    `<svg class="include-card__ghost-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  // [ghost path (decorative background glyph), icon name (static gold asset), title, desc, action]
  const feats = [
    ['<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', "clock", "Punctual Pickups", "We plan around your schedule and your flight.", { modal: {} }],
    ['<path d="M10.5 13.5 3 12l-.5-2 8 1 4-7 2 .5-2.5 7 6 1.5v2l-6-1-2 6-1.5-.5z"/>', "plane", "Flight Tracking", "Live arrival monitoring at every airport we serve, for early or delayed flights.", { modal: {} }],
    ['<circle cx="12" cy="8" r="3"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>', "chauffeur", "Meet & Greet", "Chauffeur inside the terminal with a name sign.", { href: "/services/meet-and-greet/" }],
    ['<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/>', "shield", "Professional Chauffeurs", "Vetted, courteous, and know the DC metro and every area airport.", { modal: {} }],
  ];
  const featCards = feats
    .map(([p, name, t, d, act]) =>
      cbox({
        cls: "include-card card-surface",
        lead: `<span class="include-card__ghost" aria-hidden="true">${ghost(p)}</span><span class="include-card__icon">${I[name]}</span>`,
        title: t,
        act,
        bodyHtml: `<p>${esc(d)}</p>`,
      })
    )
    .join("\n            ");

  // Homepage-only "Know Before You Book" editorial panel. Rendered inline (not
  // via the shared knowBeforeYouBookCard) so the landing-page component stays
  // untouched. Still a single whole-card cbox → quote modal; data from the SSOT.
  // The numbered 01–04 layout and "Good to Know" kicker are presentation only;
  // every question and answer is preserved verbatim from SITE.knowBeforeYouBook.
  const kbyb = cbox({
    tag: "div",
    cls: "includes-note card-surface kbyb-wow",
    lead: `<span class="kbyb-wow__kicker" aria-hidden="true">Good to Know</span>`,
    title: "Know Before You Book",
    titleTag: "h3",
    titleCls: "includes-note__title",
    act: { modal: {} },
    bodyHtml: `
            <p class="includes-note__lede">Good questions to ask before any booking:</p>
            <div class="kbyb-wow__rule" aria-hidden="true"></div>
            <ol class="kbyb-wow__qa">
              ${SITE.knowBeforeYouBook
                .map(
                  (k, i) =>
                    `<li class="kbyb-wow__item"><span class="kbyb-wow__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><div><strong class="kbyb-wow__q">${esc(k.q)}</strong><span class="kbyb-wow__a">${esc(k.a)}</span></div></li>`
                )
                .join("\n              ")}
            </ol>`,
  });

  return `
    <section class="section includes-section" aria-labelledby="includes-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">The Landio Standard</span>
          <h2 id="includes-title">What Every Ride Includes</h2>
          <p class="text-secondary">The details that make every ride feel effortless.</p>
        </div>
        <div class="includes-split">
          <ul class="includes-grid">
            ${featCards}
          </ul>
${kbyb}
        </div>
      </div>
    </section>`;
}

function airportServed() {
  // Filled gold airplane icon; all six planes share one gradient def (below).
  const PLANE = `<svg class="airport-tile__plane" viewBox="0 0 24 24" aria-hidden="true"><path fill="url(#aura-plane-gold)" d="M12 2.2c.72 0 1.3.92 1.3 2.05V8.9l7.4 4.37v1.98l-7.4-2.26v4.42l2 1.45v1.55L12 19.4l-3.3.96v-1.55l2-1.45V12.97l-7.4 2.26v-1.98l7.4-4.37V4.25c0-1.13.58-2.05 1.3-2.05z"/></svg>`;
  const tiles = SITE.airports
    .map((a) => cbox({
      cls: "airport-tile card-surface",
      lead: `<span class="airport-tile__icon">${PLANE}</span><span class="airport-tile__code">${esc(a.code)}</span>`,
      titleTag: "p", titleCls: "airport-tile__name", title: a.name,
      act: { modal: { pickup: `${a.name} (${a.code})` } }, cue: `Book a ${a.code} transfer`,
    }))
    .join("\n          ");
  return `
    <section class="section section--alt airports-section" aria-labelledby="airport-home-title">
      <svg class="airport-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><linearGradient id="aura-plane-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbd145"/><stop offset="1" stop-color="#dc9f29"/></linearGradient></defs></svg>
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Where We Fly In &amp; Out</span>
          <h2 id="airport-home-title">Airports We Serve</h2>
          <p class="text-secondary">Three airports connect the DC metro to the world — Dulles (IAD), Reagan National (DCA), and BWI — each with real-time flight tracking and curbside or meet &amp; greet pickup. Tap any airport to book a transfer.</p>
        </div>
        <ul class="airports-grid">
          ${tiles}
        </ul>
        <div style="text-align:center;margin-top:1.75rem"><a class="btn btn-ghost" href="/dc-airport-car-service/">${btnIcon("airplane")}DC Airport Car Service</a></div>
      </div>
    </section>`;
}

function areasServed() {
  // Areas are the single source of truth in config.js (AREAS) — no duplicate
  // list here. Dropoff prefill uses each area's pickup value (e.g. "Bethesda, MD").
  const PIN = `<svg class="area-chip__pin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.5-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.5-6.5 10-6.5 10z"/><circle cx="12" cy="11" r="2.3"/></svg>`;
  return `
    <section class="section areas-section" aria-labelledby="areas-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Service Area</span>
          <h2 id="areas-title">Areas We Serve Across the DC Metro</h2>
        </div>
        <ul class="areas-grid">
          ${AREAS.map((a) => cbox({ cls: "area-chip", tag: "li", titleTag: "span", lead: PIN, title: a.name, act: { modal: { dropoff: a.pickup } }, cue: "Book a ride" })).join("\n          ")}
        </ul>
        <p class="text-secondary" style="text-align:center;max-width:70ch;margin:1.75rem auto 0">From airport runs to pickups across Maryland and Northern Virginia and direct transfers up the Northeast corridor, your chauffeur delivers the same premium, punctual service.</p>
        <div style="text-align:center;margin-top:1.5rem">
          <a class="btn btn-ghost" href="https://www.google.com/maps/search/?api=1&amp;query=Washington+DC+metropolitan+area" target="_blank" rel="noopener"><svg class="btn-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.5-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.5-6.5 10-6.5 10z"/><circle cx="12" cy="11" r="2.3"/></svg>View Service Area Map</a>
        </div>
      </div>
    </section>`;
}

function faq() {
  return faqAccordion({ faqs: SITE.faqs, lede: "Find answers to common questions about our luxury transportation services." });
}

function excellence() {
  const points = ["Professional Chauffeurs", "Premium Vehicles", "Punctual, Flight-Tracked Pickups", "Seamless Booking Experience"];
  const check = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-11"/></svg>`;
  return `
    <section class="section excellence" aria-labelledby="exc-title">
      <div class="container excellence__grid">
        <figure class="excellence__media">
          <span class="excellence__accent" aria-hidden="true"></span>
          <span class="excellence__accent excellence__accent--br" aria-hidden="true"></span>
          ${fleetPicture(SITE.fleet.find((v) => v.key === "sedan"), { alt: "Landio Executive Sedan — luxury black chauffeured car", sizes: "(min-width: 900px) 48vw, 92vw", width: 1024, height: 576 })}
        </figure>
        <div class="excellence__content">
          <p class="eyebrow">Step Into Excellence</p>
          <h2 id="exc-title">Chauffeured Service Tailored <br>To Your Every Need</h2>
          <p class="text-secondary">At Landio Limo Services, we go beyond transportation—we create unforgettable travel experiences. From immaculate interiors to attentive hospitality, every ride is designed to leave a lasting impression. Whether it's an airport transfer, a corporate program, or a diplomatic engagement, we deliver more than just a destination.</p>
          <ul class="excellence__list">
            ${points.map((p) => `<li><span class="excellence__check">${check}</span>${esc(p)}</li>`).join("\n            ")}
          </ul>
          <div class="excellence__actions">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Book Now</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("call")}Call Now ${esc(SITE.phone.display)}</a>
          </div>
        </div>
      </div>
    </section>`;
}

/**
 * Homepage Partner Program invitation — B2B audience (travel advisors, hotel
 * concierges, event planners, hospitality). Two-column: framed image + panel.
 * CTA links to the existing /contact/ page. Benefits are verified/neutral — no
 * invented rates, pricing, or guarantees.
 */
function partner() {
  const IMG = "/assets/img/hero/dc-hero";
  const sparkle = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></svg>`;
  const benefits = [
    [I.support, "Dedicated support", "One team that knows your account, available 24/7."],
    [I.check, "Seamless booking", "Send us the trip; we quote it and look after your client start to finish."],
    [I.chauffeur, "Trusted fleet", `Professional chauffeurs and a meticulously maintained fleet, from sedans to ${SITE.fleet.find((v) => v.key === "coach").name.toLowerCase()}es.`],
  ];
  const builtFor = ["Travel advisors", "Hotel concierges", "Event planners", "Wedding planners", "Hospitality", "Corporate travel"];
  const chips = ["Chauffeur", "Groups", "Events"];
  return `
    <section class="section section--alt partner" aria-labelledby="partner-title">
      <div class="container">
        <div class="partner__panel">
          <div class="partner__media">
            <picture>
              <source type="image/webp" srcset="${IMG}-640.webp 640w, ${IMG}-1024.webp 1024w, ${IMG}-1500.webp 1500w" sizes="(min-width: 900px) 46vw, 92vw">
              <img src="${IMG}-1024.jpg" srcset="${IMG}-640.jpg 640w, ${IMG}-1024.jpg 1024w, ${IMG}-1500.jpg 1500w" sizes="(min-width: 900px) 46vw, 92vw" alt="Landio chauffeured sedan in the DC metro" width="1500" height="844" loading="lazy" decoding="async">
            </picture>
            <span class="partner__badge">${sparkle} Landio Partner Network</span>
            <div class="partner__chips">${chips.map((c) => `<span>${esc(c)}</span>`).join("")}</div>
          </div>
          <div class="partner__content">
            <p class="eyebrow">Partner Program</p>
            <h2 id="partner-title">Become a <span class="gold">Landio Partner</span></h2>
            <p class="partner__lede">Partner with Landio Limo Services and give your clients and guests seamless luxury transportation across Washington, DC, Maryland, and Northern Virginia — professional chauffeurs, a meticulously maintained fleet, and 24/7 booking support.</p>
            <ul class="partner__benefits">
              ${benefits.map(([ic, t, d]) => `<li><span class="partner__benefit-ico" aria-hidden="true">${ic}</span><span class="partner__benefit-t">${esc(t)}</span><span class="partner__benefit-d">${esc(d)}</span></li>`).join("\n              ")}
            </ul>
            <p class="partner__built">Built For</p>
            <ul class="partner__taglist">${builtFor.map((bf) => `<li>${esc(bf)}</li>`).join("")}</ul>
            <div class="partner__cta">
              <a class="btn btn-primary" href="/become-a-partner/">${btnIcon("handshake")}Become a Partner</a>
              <p class="partner__talk">Prefer to talk? <a href="tel:${esc(SITE.phone.e164)}">${esc(SITE.phone.display)}</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

/**
 * Trust & Instagram section — owner introduction (with the owner's photo) and
 * customer-experience trust points, then a continuous, smooth auto-scrolling
 * marquee of real @landiolimoservices photos under a centered @handle + heading.
 * Placed immediately after the fleet section. Pure-CSS marquee: slides render
 * twice for a seamless loop, pauses on hover/focus, static under
 * prefers-reduced-motion.
 *
 * To change the feed, edit GALLERY. Each entry is a real photo:
 *   { img: "/assets/img/instagram/<base>", alt: "…", href: "<post URL>" }
 * (`img` is the base path; .webp/.jpg are added. Set `href` to the exact post
 *  URL when available so a tap opens that post.)
 */
function instagramGallery() {
  const IG_URL = "https://www.instagram.com/landiolimoservices/";
  const igGlyph =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" stroke="none"/></svg>';

  const GALLERY = [
    { img: "/assets/img/instagram/ig-1", alt: "Landio Limo Services luxury van", href: IG_URL },
    { img: "/assets/img/instagram/ig-2", alt: "Landio Limo Services at an industry event", href: IG_URL },
    { img: "/assets/img/instagram/ig-3", alt: "Landio Limo Services luxury SUV", href: IG_URL },
    { img: "/assets/img/instagram/ig-4", alt: "Landio Limo Services luxury sedan and SUV", href: IG_URL },
    { img: "/assets/img/instagram/ig-5", alt: "Landio Limo Services at the Chauffeur Driven / NLA show", href: IG_URL },
    { img: "/assets/img/instagram/ig-6", alt: "Landio Limo Services luxury van interior with LED lighting", href: IG_URL },
    { img: "/assets/img/instagram/ig-7", alt: "Landio Limo Services luxury van interiors", href: IG_URL },
    { img: "/assets/img/instagram/ig-8", alt: "Landio Limo Services luxury SUV", href: IG_URL },
  ];

  const slide = (g, dup) => `
            <li class="ig-slide"${dup ? ' aria-hidden="true"' : ""}>
              <div class="ig-slide__link">
                <picture>
                  <source type="image/webp" srcset="${g.img}.webp">
                  <img class="ig-slide__img" src="${g.img}.jpg" alt="${dup ? "" : esc(g.alt)}" loading="lazy" decoding="async" width="500" height="625">
                </picture>
                <span class="ig-slide__tag" aria-hidden="true">${igGlyph}</span>
              </div>
            </li>`;

  // Rendered twice so the -50% marquee loop is seamless.
  const slides = GALLERY.map((g) => slide(g, false)).join("") + GALLERY.map((g) => slide(g, true)).join("");

  const trust = [
    [I.plane, "Flight-tracked transfers to IAD, DCA &amp; BWI"],
    [I.shield, "Vetted, professional chauffeurs"],
    [I.car, "Immaculately maintained luxury fleet"],
    [I.clock, "24/7 year-round dispatch"],
  ];

  return `
    <section class="section ig-section" aria-labelledby="ig-title">
      <div class="container">
        <div class="ig-intro">
          <div class="ig-intro__media">
            <picture class="ig-owner">
              <source type="image/webp" srcset="/assets/img/instagram/owner.webp">
              <img src="/assets/img/instagram/owner.jpg" alt="The owner of Landio Limo Services" width="560" height="700" loading="lazy" decoding="async">
            </picture>
          </div>
          <div class="ig-intro__content">
            <span class="eyebrow">A Personal Standard</span>
            <h2 id="ig-title">Luxury Travel, <span class="gold">Treated Personally</span></h2>
            <p class="ig-lede">At Landio Limo Services, luxury is personal. We built this company on one standard — treat every passenger like the most important client of the day. From a quiet Executive Sedan to the airport to a Stretch Limo for a night to remember, every detail is handled by a professional chauffeur who knows the DC metro inside and out.</p>
            <p>Across Washington, DC, Maryland, and Northern Virginia, clients return because the experience stays consistent: a meticulously maintained fleet, flight-tracked airport pickups, and a dispatch team on call around the clock. It is chauffeured travel that feels effortless — punctual, discreet, and genuinely premium.</p>
            <p class="ig-sign">— The Landio Limo Services Team</p>
            <ul class="ig-trust">
              ${trust.map(([ic, t]) => `<li><span class="ig-trust__ico" aria-hidden="true">${ic}</span><span>${t}</span></li>`).join("\n              ")}
            </ul>
          </div>
        </div>

        <div class="ig-gallery">
          <div class="ig-gallery__head ig-gallery__head--center">
            <span class="eyebrow ig-handle"><a href="${IG_URL}" target="_blank" rel="noopener">${igGlyph} @landiolimoservices</a></span>
            <h2 class="ig-gallery__title">Follow the Journey</h2>
            <p class="text-secondary">Moments from the road across the DC metro — the fleet, airport runs, weddings, and nights out.</p>
          </div>
          <div class="ig-slider">
            <ul class="ig-track ig-track--marquee">${slides}
            </ul>
          </div>
        </div>
      </div>
    </section>`;
}

/**
 * Google Reviews — "What Our Clients Say". Google reviews cannot be fetched from
 * the build environment (and must never be invented), so this renders a clean,
 * premium section with a Google badge and a "Read More Google Reviews" button
 * linking to the business's Google page.
 *
 * To show real reviews, paste genuine ones into REVIEWS (copy name/rating/text
 * verbatim from Google) — the cards render automatically. NEVER invent reviews,
 * names, or ratings.
 */
function googleReviews() {
  const REVIEWS_URL = "https://share.google/v9oRmrQYknBB8f2TQ";
  const googleG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8L20 3.2A12 12 0 0 0 12 0 12 12 0 0 0 1.3 6.6l4 3.1C6.2 6.9 8.9 4.8 12 4.8z"/></svg>';
  const star = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 21l1.4-6.8L2.2 9.6l6.9-.7z"/></svg>';

  // Paste GENUINE Google reviews here, e.g.
  //   { name: "Jane D.", rating: 5, text: "…", date: "2 weeks ago" }
  // Leave empty until you have real reviews — do not invent any.
  const REVIEWS = [];

  const stars = (n) =>
    Array.from({ length: 5 }, (_, i) => `<span class="${i < n ? "" : "rv-star--off"}">${star}</span>`).join("");

  const card = (r) => `
          <li class="rv-card">
            <div class="rv-card__head">
              <span class="rv-avatar" aria-hidden="true">${esc((r.name || "?").trim().charAt(0).toUpperCase())}</span>
              <div class="rv-card__id">
                <p class="rv-name">${esc(r.name)}</p>
                <div class="rv-stars" aria-label="${esc(String(r.rating))} out of 5 stars">${stars(r.rating)}</div>
              </div>
              <span class="rv-g" aria-hidden="true">${googleG}</span>
            </div>
            <p class="rv-text">${esc(r.text)}</p>
            ${r.date ? `<p class="rv-date">${esc(r.date)}</p>` : ""}
          </li>`;

  return `
    <section class="section section--alt rv-section" aria-labelledby="rv-title">
      <div class="container">
        <div class="rv-head">
          <span class="eyebrow">Client Reviews</span>
          <h2 id="rv-title">What Our Clients Say</h2>
          <p class="text-secondary">Clients across Washington, DC, Maryland, and Northern Virginia share their Landio Limo Services experience on Google. Read their reviews — and leave your own.</p>
          <span class="rv-badge">${googleG}<span>Reviews on Google</span></span>
        </div>
        ${REVIEWS.length ? `<ul class="rv-grid">${REVIEWS.map(card).join("")}\n        </ul>` : ""}
        <div class="rv-cta">
          <a class="btn btn-primary" href="${REVIEWS_URL}" target="_blank" rel="noopener">Read More Google Reviews</a>
        </div>
      </div>
    </section>`;
}

export function home() {
  return {
    path: "/",
    titleFull: "Landio Limo Services – Luxury Car & Limo Service | DC, Maryland & Virginia",
    description:
      "Landio Limo Services — luxury chauffeured car & limo service across Washington, DC, Maryland, and Northern Virginia. IAD, DCA & BWI airport transfers, corporate, diplomatic, private aviation, and group transport, 24/7.",
    bodyClass: "page-home",
    jsonLd: [faqJsonLd(SITE.faqs)],
    main: [
      hero(), marquee(), fleet(), instagramGallery(), routes(), services(), threeStepsSection(),
      whatIncludes(), airportServed(), areasServed(), eventCta(),
      excellence(), googleReviews(), faq(), partner(), contactBar(),
    ].join("\n"),
  };
}
