/**
 * Service spoke pages (the six services under /services/<slug>/). In Phase 1
 * every service — including Airport Transfers and Private Jet & FBO Transfers —
 * is a normal spoke at /services/<slug>/. Each spoke has a unique H1 and body,
 * the shared fleet grid, its own FAQ, a breadcrumb, and Service +
 * BreadcrumbList + FAQPage JSON-LD. Hub-and-spoke: every page links back to
 * /services/ and cross-links related spokes.
 */

import { SITE, faqJsonLd, serviceJsonLd, breadcrumbJsonLd, DEFAULT_SITE_URL, CAPACITY, paxLabel, AREAS, areaPath, routePath } from "../config.js";
import { esc, btnIcon } from "../templates/partials.js";
import { icon } from "../templates/icons.js";
import { breadcrumb, pageHero, fleetSection, faqSection, faqAccordion, contactSection, contactBar, eventCta, cbox, boxAction, svgIcon } from "./_sections.js";

/** Responsive <picture> for the two-column section images (webp + jpg, lazy).
 *  `widths` lets a source with no 1500 variant (e.g. a fleet photo) be used. */
function splitPicture(base, alt, { width = 1500, height = 1000, widths = [640, 1024, 1500] } = {}) {
  const set = (ext) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  const fallback = widths.includes(1024) ? 1024 : widths[widths.length - 1];
  return `<picture>
            <source type="image/webp" srcset="${set("webp")}" sizes="(min-width: 900px) 48vw, 92vw">
            <img src="${base}-${fallback}.jpg" srcset="${set("jpg")}" sizes="(min-width: 900px) 48vw, 92vw" alt="${esc(alt)}" width="${width}" height="${height}" loading="lazy" decoding="async">
          </picture>`;
}

/** Small check glyph reused by checklists and comparison cards. */
const CHECK = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-11"/></svg>`;

/** Intro section: lede paragraphs + a checklist of what's included. */
function intro(data) {
  return `
    <section class="section" aria-labelledby="svc-intro">
      <div class="container prose-wide">
        <div class="section-head section-head--left">
          <span class="eyebrow">${esc(data.introEyebrow || data.eyebrow)}</span>
          <h2 id="svc-intro">${esc(data.introHeading)}</h2>
        </div>
        ${data.body.map((p) => `<p class="text-secondary">${p}</p>`).join("\n        ")}
        <ul class="about-checks" style="margin-top:1.5rem">
          ${data.points.map((pt) => `<li><span class="about-check">${CHECK}</span>${esc(pt)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>`;
}

// Shared image hero for the standard spokes (brand-consistent); the framed
// image inside each intro split is per-service for variety.
const SPOKE_HERO = "/assets/img/hero/hamptons-hero";
const SPOKE_FEATURES = [
  { icon: "userCheck", label: "Professional chauffeurs" },
  { icon: "plane", label: "Flight-tracked transfers" },
  { icon: "clock", label: "Available 24/7" },
  { icon: "car", label: "6 vehicle classes" },
];
const SPOKE_INTRO_IMG = {
  "airport-transfers": { base: "/assets/img/fleet/executive-suv", alt: "Aura Hamptons chauffeured Luxury SUV for airport transfers" },
  "meet-and-greet": { base: "/assets/img/fleet/executive-sedan", alt: "Aura Hamptons chauffeur and Executive Sedan at arrivals" },
  "corporate-executive": { base: "/assets/img/fleet/executive-suv", alt: "Aura Hamptons Luxury SUV for executive travel" },
  "fbo-private-jet": { base: "/assets/img/hero/hamptons-hero", alt: "Aura Hamptons chauffeured car at a Hamptons estate" },
  "hourly-chauffeur": { base: "/assets/img/fleet/executive-sedan", alt: "Aura Hamptons Executive Sedan for hourly chauffeur service" },
};

/** Premium intro — editorial copy + checklist + CTA beside a framed image
 *  (reuses the shared .gt-split composition). */
function introSplit(data) {
  const img = SPOKE_INTRO_IMG[data.slug] || { base: SPOKE_HERO, alt: `${data.title} — Aura Hamptons` };
  const isHero = img.base === SPOKE_HERO;
  const pic = splitPicture(img.base, img.alt, isHero
    ? { width: 1500, height: 844 }
    : { width: 1024, height: 576, widths: [640, 1024] });
  return `
    <section class="section gt-split-sec" aria-labelledby="svc-intro">
      <div class="container gt-split">
        <div class="gt-split__content">
          <span class="eyebrow">${esc(data.introEyebrow || data.eyebrow)}</span>
          <h2 id="svc-intro">${esc(data.introHeading)}</h2>
          ${data.body.map((p) => `<p class="text-secondary">${p}</p>`).join("\n          ")}
          <ul class="gt-split__checks">
            ${data.points.map((pt) => `<li><span class="gt-split__check" aria-hidden="true">${CHECK}</span>${esc(pt)}</li>`).join("\n            ")}
          </ul>
          <div class="gt-split__cta">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Start Your Quote</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
        <figure class="gt-split__media">
          <span class="gt-split__accent" aria-hidden="true"></span>
          <span class="gt-split__accent gt-split__accent--br" aria-hidden="true"></span>
          ${pic}
        </figure>
      </div>
    </section>`;
}

/** "Related services" cross-link row (hub-and-spoke internal linking).
 *  `icons: true` adds the service medallion to each card (Group Transfers only;
 *  other spokes call related() without it, so their cards are unchanged). */
function related(currentSlug, { icons = false } = {}) {
  const others = SITE.services.filter((s) => s.slug !== currentSlug).slice(0, 3);
  const cards = others
    .map(
      (s) => cbox({
        cls: `related-card card-surface${icons ? " related-card--icon" : ""}`,
        lead: icons ? `<span class="feature-card__icon">${svgIcon(s.icon)}</span>` : "",
        title: s.title,
        act: { href: s.url },
        bodyHtml: `<p>${esc(s.blurb)}</p>`,
      })
    )
    .join("");
  return `
    <section class="section" aria-labelledby="related-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Explore More</span>
          <h2 id="related-title">Related Services</h2>
        </div>
        <ul class="related-grid">${cards}</ul>
        <div style="text-align:center;margin-top:2rem"><a class="btn btn-ghost" href="/services/">${btnIcon("calendar")}All Services</a></div>
      </div>
    </section>`;
}

/** Comparison table: shared row labels down the left, the recommended column
 *  (featured) highlighted, the alternative beside it. Preserves every fact and
 *  the "Recommended" distinction; stacks the label above the two values on mobile. */
/** Small filled star for the "Recommended" tag + the Best-For row icon. */
const STAR = `<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M12 2.4l2.86 5.8 6.4.93-4.63 4.51 1.09 6.37L12 17.9l-5.72 3.01 1.09-6.37L2.74 9.13l6.4-.93z"/></svg>`;
/** Styled brand wordmarks for the comparison (text, not official logo artwork). */
const brandBadge = (n) => `<span class="gt-brand gt-brand--${esc(n)}">${n === "lyft" ? "lyft" : n.charAt(0).toUpperCase() + n.slice(1)}</span>`;

export function comparisonSection(data) {
  if (!data.comparison) return "";
  const c = data.comparison;
  const [feat, alt] = c.cards;
  const labels = c.rowLabels || (feat.rows || []).map(([label]) => ({ label }));
  // "Brand — Descriptor" → brand in regular weight, descriptor bold on its own
  // line (matches the reference). Falls back to a single bold name otherwise.
  const splitName = (t) => {
    const i = t.indexOf(" — ");
    return i === -1
      ? `<span class="gt-compare__name-main">${esc(t)}</span>`
      : `<span class="gt-compare__name-brand">${esc(t.slice(0, i + 3))}</span><span class="gt-compare__name-main">${esc(t.slice(i + 3))}</span>`;
  };
  const featHead = `
          <div class="gt-compare__head gt-compare__col--featured">
            ${feat.tag ? `<span class="gt-compare__tag">${esc(feat.tag)}${STAR}</span>` : ""}
            <span class="gt-compare__ico" aria-hidden="true">${icon(feat.icon || "car", { size: 22 })}</span>
            <h3 class="gt-compare__name">${splitName(feat.title)}</h3>
            <p class="gt-compare__desc">${esc(feat.desc)}</p>
          </div>`;
  const altLead = alt.brands
    ? `<span class="gt-compare__brands" aria-label="Uber and Lyft">${alt.brands.map(brandBadge).join("")}</span>`
    : `<span class="gt-compare__ico gt-compare__ico--alt" aria-hidden="true">${icon(alt.icon || "car", { size: 22 })}</span>`;
  const altHead = `
          <div class="gt-compare__head">
            ${altLead}
            <h3 class="gt-compare__name">${splitName(alt.title)}</h3>
            <p class="gt-compare__desc">${esc(alt.desc)}</p>
          </div>`;
  const last = labels.length - 1;
  const rows = labels.map((lab, i) => `
          <div class="gt-compare__rowlabel">${lab.icon ? `<span class="gt-compare__rowico" aria-hidden="true">${lab.icon === "star" ? STAR : icon(lab.icon, { size: 17 })}</span>` : ""}<span>${esc(lab.label)}</span></div>
          <div class="gt-compare__cell gt-compare__col--featured${i === last ? " gt-compare__cell--last" : ""}"><span class="gt-compare__check" aria-hidden="true">${CHECK}</span><span>${esc(feat.rows[i][1])}</span></div>
          <div class="gt-compare__cell">${esc((alt.rows[i] || [])[1] || "")}</div>`).join("");
  const cta = c.cta ? `
        <div class="gt-compare__cta">
          <h3 class="gt-compare__cta-title">${c.cta.headingHtml}</h3>
          <div class="gt-compare__cta-actions">
            <button type="button" class="btn btn-primary" data-open-quote>${esc(c.cta.bookLabel || "Get a Group Quote")}${icon("arrow", { size: 16, cls: "btn-ico" })}</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
          ${c.cta.note ? `<p class="gt-compare__cta-note">${esc(c.cta.note)}</p>` : ""}
        </div>` : "";
  return `
    <section class="section section--alt gt-compare-sec" aria-labelledby="compare-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">${esc(c.eyebrow)}</span>
          <h2 id="compare-title">${esc(c.heading)}</h2>
          ${c.intro ? `<p class="text-secondary">${esc(c.intro)}</p>` : ""}
        </div>
        <div class="gt-compare" role="table">
          <div class="gt-compare__head gt-compare__head--corner" aria-hidden="true"></div>
          ${featHead}
          ${altHead}
          ${rows}
        </div>
        ${cta}
      </div>
    </section>`;
}

/** Optional: mid-page call-to-action band. */
function midCtaSection(data) {
  if (!data.midCta) return "";
  const m = data.midCta;
  return `
    <section class="section group-cta" aria-labelledby="group-cta-title">
      <div class="container">
        <div class="group-cta__card">
          <h2 id="group-cta-title">${esc(m.heading)}</h2>
          <p>${esc(m.sub)}</p>
          <div class="group-cta__actions">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Book Your Ride</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
      </div>
    </section>`;
}

/** At-a-Glance — premium card: a verified stat strip beside the heading, then a
 *  grid of labelled fact cards. Every number is read from the SSOT (config.js). */
const GLANCE_ICON = {
  "Capacity": "users", "Group vehicles": "van", "Availability": "clock", "Service area": "pin",
  "Weddings & events": "calendar", "Airport transfers": "plane", "Book ahead": "clock",
};
// Whole-card action for each At-a-Glance card — real existing pages where one
// fits, otherwise the quote popup (no arbitrary or broken links).
const GLANCE_ACT = {
  "Capacity": { act: { modal: {} }, cue: "Get a quote" },
  "Group vehicles": { act: { href: "/fleet/" }, cue: "View the fleet" },
  "Weddings & events": { act: { modal: {} }, cue: "Plan your event" },
  "Airport transfers": { act: { href: "/services/airport-transfers/" }, cue: "Airport service" },
  "Service area": { act: { modal: {} }, cue: "Get a quote" },
  "Book ahead": { act: { modal: {} }, cue: "Book ahead" },
};
export function glanceSection(data) {
  if (!data.glance) return "";
  const stats = [
    { num: `${CAPACITY.coach.paxMax}`, unit: "max passengers" },
    { num: `${SITE.fleet.length}`, unit: "vehicle classes" },
    { num: `${SITE.airports.length}`, unit: "airports served" },
    { num: "24/7", unit: "dispatch" },
  ];
  const statHtml = stats.map((s) => `
            <li class="gt-glance__stat"><span class="gt-glance__num">${esc(s.num)}</span><span class="gt-glance__unit">${esc(s.unit)}</span></li>`).join("");
  const cards = data.glance.map((g) => {
    const a = GLANCE_ACT[g.label] || { act: { modal: {} }, cue: "Get a quote" };
    return `
          <li class="cbox gt-glance__card">
            <span class="gt-glance__ico" aria-hidden="true">${icon(GLANCE_ICON[g.label] || "users", { size: 20 })}</span>
            <span class="gt-glance__ctext"><span class="gt-glance__clabel">${boxAction(g.label, a.act, { cue: a.cue })}</span><span class="gt-glance__cdesc">${esc(g.desc || g.value)}</span></span>
          </li>`;
  }).join("");
  return `
    <section class="section gt-glance-sec" aria-labelledby="glance-title">
      <div class="container">
        <div class="gt-glance card-surface">
          <div class="gt-glance__top">
            <div class="section-head section-head--left">
              <span class="eyebrow">At a Glance</span>
              <h2 id="glance-title">${esc(data.glanceHeading || "At a Glance")}</h2>
            </div>
            <ul class="gt-glance__stats">${statHtml}
            </ul>
          </div>
          <ul class="gt-glance__grid">${cards}
          </ul>
          ${data.glanceNote ? `<p class="gt-glance__note">${esc(data.glanceNote)}</p>` : ""}
        </div>
      </div>
    </section>`;
}

/** Planning & Booking — two-column: editorial copy + checklist + CTA on the left,
 *  a gold-framed chauffeur image on the right (mirror of Group Logistics). */
export function planningSection(data) {
  if (!data.planning) return "";
  const p = data.planning;
  return `
    <section class="section section--alt gt-split-sec" aria-labelledby="planning-title">
      <div class="container gt-split">
        <div class="gt-split__content">
          <span class="eyebrow">${esc(p.eyebrow)}</span>
          <h2 id="planning-title">${esc(p.heading)}</h2>
          <p class="text-secondary">${esc(p.body)}</p>
          <ul class="gt-split__checks">
            ${p.points.map((pt) => `<li><span class="gt-split__check" aria-hidden="true">${CHECK}</span>${esc(pt)}</li>`).join("\n            ")}
          </ul>
          <div class="gt-split__cta">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Start Your Quote</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
        <figure class="gt-split__media">
          <span class="gt-split__accent" aria-hidden="true"></span>
          <span class="gt-split__accent gt-split__accent--br" aria-hidden="true"></span>
          ${splitPicture("/assets/img/fleet/executive-suv", "A chauffeured Aura Hamptons luxury SUV", { width: 1024, height: 576, widths: [640, 1024] })}
        </figure>
      </div>
    </section>`;
}

/** Group Logistics — two-column panel: estate image + badge on the left, the
 *  use-cases as a benefits list and a CTA on the right. Image sits on the LEFT so
 *  the composition differs from Planning & Booking (image on the right). */
export function groupDetail(data) {
  if (!data.detailCards) return intro(data);
  const list = data.detailCards.map((c) => `
            <li class="gt-panel__item">
              <span class="gt-panel__ico" aria-hidden="true">${icon(c.icon, { size: 20 })}</span>
              <span class="gt-panel__t">${esc(c.title)}</span>
              <span class="gt-panel__d">${esc(c.desc)}</span>
            </li>`).join("");
  return `
    <section class="section gt-split-sec gt-logistics-sec" aria-labelledby="gdetail-title">
      <div class="container gt-split gt-split--media-left">
        <div class="gt-split__content">
          <span class="eyebrow">${esc(data.introEyebrow || data.eyebrow)}</span>
          <h2 id="gdetail-title">${esc(data.introHeading)}</h2>
          ${data.detailIntro ? `<p class="gt-panel__lede">${esc(data.detailIntro)}</p>` : ""}
          ${list ? `<ul class="gt-panel__list">${list}
          </ul>` : ""}
          <div class="gt-split__cta">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}${esc(data.detailCta || "Get a Group Quote")}</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
        <figure class="gt-split__media">
          <span class="gt-split__accent" aria-hidden="true"></span>
          <span class="gt-split__accent gt-split__accent--br" aria-hidden="true"></span>
          ${splitPicture(data.detailImage || "/assets/img/hero/hamptons-hero", data.detailImageAlt || "Aura Hamptons chauffeured vehicle at a Hamptons estate", { width: 1500, height: 844 })}
        </figure>
      </div>
    </section>`;
}

/* ===== Airport Transfers hub — extra sections (airport-transfers only) ===== */

/** "Our Airport Transfer Services" — airport cards open the quote popup with the
 *  airport prefilled; FBO + Meet & Greet link to their service pages. Whole-card
 *  clickable via the shared cbox pattern (no nested interactive elements). */
function airportServices(data) {
  const cards = data.airportServices.map((s) =>
    cbox({
      cls: "ap-card card-surface",
      lead: `<span class="ap-card__ico" aria-hidden="true">${icon(s.icon, { size: 22 })}</span>`,
      title: s.title, titleCls: "ap-card__title",
      act: s.href ? { href: s.href } : { modal: { pickup: s.pickup } },
      cue: s.href ? "View service" : "Book your transfer",
      bodyHtml: `<p class="ap-card__desc">${esc(s.desc)}</p>`,
    })
  ).join("");
  return `
    <section class="section section--alt" aria-labelledby="ap-svc-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">What We Offer</span>
          <h2 id="ap-svc-title">Airport Transportation Services for Every Journey</h2>
          <p class="text-secondary">Flight-tracked car service to and from every airport we serve, plus private-aviation and in-terminal meet &amp; greet — all in one premium chauffeured fleet.</p>
        </div>
        <ul class="ap-grid">${cards}
        </ul>
      </div>
    </section>`;
}

/** "Why Travelers Choose Aura Hamptons" — informational benefit cards (no
 *  clickable action; they describe the service, they don't link anywhere). */
function airportWhy() {
  const items = [
    ["userCheck", "Professional chauffeurs", "Vetted, courteous chauffeurs who know the Hamptons and every New York-area airport."],
    ["clock", "24/7 availability", "Early departures and late arrivals covered, every day of the year including holidays."],
    ["plane", "Real-time flight monitoring", "We track your inbound flight and adjust the pickup to your actual landing time."],
    ["van", "Luxury vehicle fleet", "Six vehicle classes, from executive sedans to motor coaches, for any party size."],
    ["pin", "Door-to-door convenience", "Direct transfers between the airport and your exact Hamptons address."],
    ["shield", "Private & discreet service", "Immaculate vehicles and professional, confidential chauffeurs on every ride."],
  ];
  const cards = items.map(([ic, t, d]) => `
          <li class="ap-why">
            <span class="ap-card__ico" aria-hidden="true">${icon(ic, { size: 22 })}</span>
            <h3 class="ap-why__title">${esc(t)}</h3>
            <p class="ap-card__desc">${esc(d)}</p>
          </li>`).join("");
  return `
    <section class="section" aria-labelledby="ap-why-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">The Aura Difference</span>
          <h2 id="ap-why-title">Why Travelers Choose Aura Hamptons</h2>
          <p class="text-secondary">A seamless airport-to-Hamptons experience, from the first call to your front door.</p>
        </div>
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

/** "Popular Airport Routes to the Hamptons" — whole-card clickable; each opens
 *  the quote popup with pickup + drop-off prefilled (no dedicated route pages). */
function airportRoutes(data) {
  const cards = data.airportRoutes.map((r) =>
    cbox({
      cls: "ap-route card-surface",
      lead: `<span class="ap-route__path" aria-hidden="true"><span class="ap-route__code">${esc(r.code)}</span><span class="ap-route__arrow">${icon("arrow", { size: 15 })}</span><span class="ap-route__place">${esc(r.to)}</span></span>`,
      title: `${r.from} to ${r.to}`, titleCls: "ap-route__title",
      act: { modal: { pickup: r.pickup, dropoff: r.dropoff } },
      cue: "Book your ride",
      bodyHtml: `<p class="ap-card__desc">${esc(r.desc)}</p>`,
    })
  ).join("");
  return `
    <section class="section section--alt" aria-labelledby="ap-route-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Corridor Favourites</span>
          <h2 id="ap-route-title">Popular Airport Routes to the Hamptons</h2>
          <p class="text-secondary">Our most-requested airport transfers — tap any route to start a quote with your pickup and destination ready to go.</p>
        </div>
        <ul class="ap-grid">${cards}
        </ul>
      </div>
    </section>`;
}

/** "Airport Transfers Across the Hamptons" — service-area grid (informational
 *  pills; area pages aren't built yet, so no links to avoid dead ends). */
function airportAreas(data) {
  const pills = data.airportAreas.map((a) => `
          <li class="ap-area"><span class="ap-area__ico" aria-hidden="true">${icon("pin", { size: 15 })}</span>${esc(a)}</li>`).join("");
  return `
    <section class="section" aria-labelledby="ap-area-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Where We Drive</span>
          <h2 id="ap-area-title">Airport Transfers Across the Hamptons</h2>
          <p class="text-secondary">Door-to-door airport car service to every village and hamlet on the East End of Long Island.</p>
        </div>
        <ul class="ap-areas">${pills}
        </ul>
      </div>
    </section>`;
}

/** Final conversion band for the airport page (premium gold-gradient card). */
function airportCta() {
  return `
    <section class="section group-cta" aria-labelledby="ap-cta-title">
      <div class="container">
        <div class="group-cta__card">
          <h2 id="ap-cta-title">Your Hamptons Journey Starts with the Right Ride</h2>
          <p>Professional chauffeurs, flight-tracked airport pickups, and a luxury fleet for every party size — available 24/7 across the Hamptons and the New York City corridor.</p>
          <div class="group-cta__actions">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Reserve Your Ride</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
      </div>
    </section>`;
}

/* ===== Group Transfers hub — extra sections (group-transfers only) =========
 * These reuse the airport page's ap-* card system (its CSS scope is broadened
 * to .page-group-transfers in styles.css) so the Group Transfers page matches
 * the JFK reference landing page's section depth, while PRESERVING the existing
 * Group Transfers hero, fleet, Two-Ways comparison, At-a-Glance, and FAQ.
 * Area/route cards use the sitewide future+modal pattern: they open the quote
 * popup today and auto-link once the village/route page ships (resolveFuture in
 * build.js). Airport cards link to the two built service pages. No invented
 * stats, counts, ratings, awards, or guarantees — copy is drawn from the SSOT.
 */

/** Trust section — verified client-approved figures presented as a premium
 *  panel (medallion icon + gold number + label, gold dividers), centered within
 *  the card. No fabricated reviews, ratings, or counts — only client-approved
 *  stats. */
function groupTrust() {
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
    <section class="section gt-trust2-sec" aria-labelledby="gt-trust-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Why Groups Trust Aura</span>
          <h2 id="gt-trust-title">A Premium Standard, Every Trip</h2>
          <p class="text-secondary">Professional chauffeurs, meticulously maintained vehicles, and a concierge team available around the clock.</p>
        </div>
        <div class="gt-trust2 card-surface">
          <ul class="gt-trust2__stats">${items}
          </ul>
        </div>
      </div>
    </section>`;
}

/** What We Offer — group service cards; each opens the quote popup. */
const GROUP_OFFERS = [
  ["van", "Group Airport Transfers", "Flight-tracked group transfers to and from JFK, LGA, EWR, ISP, FOK & HTO — your whole party in one vehicle.", "John F. Kennedy International Airport (JFK)"],
  ["calendar", "Weddings & Guest Shuttles", "Continuous shuttles between the hotels, ceremony, and reception, planned around your timeline and guest count.", ""],
  ["briefcase", "Corporate Group Travel", "Move teams, conferences, and private groups together — one arrival time, professional chauffeurs.", ""],
  ["users", "Family & Event Transfers", "Keep the whole family or party together for any Hamptons occasion, with comfortable room for everyone.", ""],
  ["car", "Spacious Group Vehicles", `Six vehicle classes up to ${CAPACITY.coach.paxMax} passengers, sized to your exact headcount and luggage.`, ""],
  ["route", "Coordinated Multi-Stop Pickups", "Planned pickups and multi-venue routing, with coordinated multi-trip scheduling for larger programs.", ""],
];
function groupOffer() {
  const cards = GROUP_OFFERS.map(([ic, t, d, pickup]) =>
    cbox({
      cls: "ap-card card-surface",
      lead: `<span class="ap-card__ico" aria-hidden="true">${icon(ic, { size: 22 })}</span>`,
      title: t, titleCls: "ap-card__title",
      act: { modal: pickup ? { pickup } : {} },
      cue: "Get a group quote",
      bodyHtml: `<p class="ap-card__desc">${esc(d)}</p>`,
    })
  ).join("");
  return `
    <section class="section" aria-labelledby="gt-offer-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">What We Offer</span>
          <h2 id="gt-offer-title">Group Transportation Services for Every Occasion</h2>
          <p class="text-secondary">From wedding guest shuttles to corporate groups and flight-tracked airport transfers, Aura Hamptons keeps your whole party together across the Hamptons and the New York City corridor.</p>
        </div>
        <ul class="ap-grid">${cards}
        </ul>
      </div>
    </section>`;
}

/** Airports We Serve — homepage "Airports We Serve" design (airport-tile cards
 *  with the gold plane glyph + code; each opens the quote popup prefilled). */
function groupAirports() {
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
    <section class="section section--alt airports-section" aria-labelledby="gt-air-title">
      <svg class="airport-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><linearGradient id="aura-plane-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e3bd"/><stop offset="1" stop-color="#c6a664"/></linearGradient></defs></svg>
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Airports We Serve</span>
          <h2 id="gt-air-title">Group Airport Transfers Across New York</h2>
          <p class="text-secondary">Six airports connect the Hamptons to the world — each with real-time flight tracking and curbside or meet &amp; greet pickup for your whole group. Tap any airport to book a transfer.</p>
        </div>
        <ul class="airports-grid">
          ${tiles}
        </ul>
        <div style="text-align:center;margin-top:1.75rem"><a class="btn btn-ghost" href="/services/airport-transfers/">${btnIcon("airplane")}Hamptons Airport Car Service</a></div>
      </div>
    </section>`;
}

/** Areas We Serve — homepage location-chip design (.area-chip), keeping the
 *  existing pickup-prefill + quote popup, and the future auto-link when the
 *  village page ships. */
export function groupAreas(o = {}) {
  const PIN = `<svg class="area-chip__pin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.5-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.5-6.5 10-6.5 10z"/><circle cx="12" cy="11" r="2.3"/></svg>`;
  const chips = AREAS.map((a) =>
    cbox({
      cls: "area-chip", tag: "li", titleTag: "span", lead: PIN, title: a.name,
      act: { modal: { pickup: a.pickup } }, future: a.path, futureCue: "View area service", cue: "Book a ride",
    })
  ).join("\n          ");
  return `
    <section class="section section--alt areas-section" aria-labelledby="gt-area-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Areas We Serve</span>
          <h2 id="gt-area-title">${esc(o.heading || "Group Transportation Across the Hamptons")}</h2>
          <p class="text-secondary">${esc(o.intro || "Door-to-door group service to every village and hamlet on the East End of Long Island — tap your area to start a quote.")}</p>
        </div>
        <ul class="areas-grid">
          ${chips}
        </ul>
      </div>
    </section>`;
}

/** Why Choose — informational benefit cards (group-tailored, not clickable). */
function groupWhy() {
  // Each card is whole-card clickable: flight tracking → the airport page, fleet
  // → the fleet page, the rest open the quote popup. No decorative-only clicks.
  const items = [
    ["userCheck", "Professional chauffeurs", "Vetted, courteous chauffeurs who know the Hamptons and the New York City corridor.", { modal: {} }, "Get a group quote"],
    ["van", "One vehicle for your group", `Everyone travels together on one schedule — from a ${CAPACITY.sprinter.paxMax}-passenger Sprinter Van to a ${CAPACITY.coach.paxMax}-passenger Motor Coach.`, { href: "/fleet/" }, "View the fleet"],
    ["clock", "24/7 availability", "Early departures, late arrivals, and peak event dates covered, every day including holidays.", { modal: {} }, "Get a group quote"],
    ["plane", "Flight-tracked transfers", "Group airport pickups timed to your actual arrival at every airport we serve.", { href: "/services/airport-transfers/" }, "Airport service"],
    ["route", "Coordinated logistics", "Multi-venue days and multi-trip scheduling, planned around your timeline.", { modal: {} }, "Get a group quote"],
    ["shield", "Immaculate, maintained fleet", "Clean, climate-controlled, meticulously maintained group vehicles on every trip.", { modal: {} }, "Get a group quote"],
  ];
  const cards = items.map(([ic, t, d, act, cue]) =>
    cbox({
      cls: "ap-why",
      lead: `<span class="ap-card__ico" aria-hidden="true">${icon(ic, { size: 22 })}</span>`,
      title: t, titleTag: "h3", titleCls: "ap-why__title",
      act, cue,
      bodyHtml: `<p class="ap-card__desc">${esc(d)}</p>`,
    })
  ).join("");
  return `
    <section class="section" aria-labelledby="gt-why-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">The Aura Difference</span>
          <h2 id="gt-why-title">Why Choose Aura Hamptons for Group Travel</h2>
          <p class="text-secondary">Everything your group needs to arrive together, on time, and at ease.</p>
        </div>
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

/** Popular Routes — homepage design (.route-grid chips; tap prefills the quote).
 *  Group-relevant corridor + airport routes; quote-prefill only (no page links),
 *  exactly like the homepage. */
const GROUP_ROUTE_FROM = {
  NYC: "Manhattan, New York, NY",
  Manhattan: "Manhattan, New York, NY",
  Brooklyn: "Brooklyn, New York, NY",
  JFK: "John F. Kennedy International Airport (JFK)",
  LGA: "LaGuardia Airport (LGA)",
  EWR: "Newark Liberty International Airport (EWR)",
  HTO: "East Hampton Airport (HTO)",
  FOK: "Francis S. Gabreski Airport (FOK)",
};
function groupRoutes() {
  const routes = [
    "NYC ⇄ Southampton", "NYC ⇄ East Hampton", "NYC ⇄ Montauk", "NYC ⇄ Sag Harbor",
    "NYC ⇄ Bridgehampton", "JFK ⇄ The Hamptons", "LGA ⇄ East Hampton", "EWR ⇄ Montauk",
  ];
  const chips = routes.map((r) => {
    const [from, to] = r.split(" ⇄ ");
    const f = GROUP_ROUTE_FROM[from] || from;
    return `<button type="button" class="route-chip" data-open-quote data-route-from="${esc(f)}" data-route-to="${esc(`${to}, NY`)}" aria-label="Book ${esc(r)}">${esc(r)}<span class="route-chip__go" aria-hidden="true">&rarr;</span></button>`;
  }).join("");
  return `
    <section class="section section--alt" aria-labelledby="gt-route-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Popular Routes</span>
          <h2 id="gt-route-title">Popular Group Transportation Routes</h2>
          <p class="text-secondary">Our most-requested group trips along the New York City to Hamptons corridor. Tap one to prefill your quote.</p>
        </div>
        <div class="route-grid">${chips}</div>
      </div>
    </section>`;
}

/* ===== Generic premium-spoke sections (data-driven) — the non-group service
 * pages reuse the Group Transfers design system with per-service content. The
 * group helpers above are left untouched so the master page is byte-identical. */

// Shared, brand-level content reused across every premium service page.
export const COMMITMENT_CARDS = [
  { icon: "userCheck", title: "Professional Service", desc: "Courteous, discreet chauffeurs and attentive coordination from the first call to the final drop-off." },
  { icon: "van", title: "Comfort & Reliability", desc: "Clean, climate-controlled vehicles and punctual, flight-tracked pickups you can count on." },
  { icon: "shield", title: "A Dependable Experience", desc: "We plan the details so you travel together, on schedule, and at ease — every trip." },
];
const WHY_SHARED = {
  heading: "Why Choose Aura Hamptons",
  intro: "A seamless, premium chauffeured experience from the first call to your destination.",
  items: [
    { icon: "userCheck", title: "Professional chauffeurs", desc: "Vetted, courteous chauffeurs who know the Hamptons and the New York City corridor." },
    { icon: "clock", title: "24/7 availability", desc: "Early departures and late arrivals covered, every day of the year including holidays." },
    { icon: "plane", title: "Flight-tracked transfers", desc: "We track your inbound flight and time your pickup to your actual arrival.", act: { href: "/services/airport-transfers/" }, cue: "Airport service" },
    { icon: "car", title: "Luxury vehicle fleet", desc: "Six immaculately maintained vehicle classes for any occasion or party size.", act: { href: "/fleet/" }, cue: "View the fleet" },
    { icon: "pin", title: "Door-to-door service", desc: "Direct transfers between your exact pickup and destination across the East End." },
    { icon: "shield", title: "Private & discreet", desc: "Immaculate vehicles and professional, confidential chauffeurs on every ride." },
  ],
};
const AIRPORT_PLANE_SVG = `<svg class="airport-tile__plane" viewBox="0 0 24 24" aria-hidden="true"><path fill="url(#aura-plane-gold)" d="M12 2.2c.72 0 1.3.92 1.3 2.05V8.9l7.4 4.37v1.98l-7.4-2.26v4.42l2 1.45v1.55L12 19.4l-3.3.96v-1.55l2-1.45V12.97l-7.4 2.26v-1.98l7.4-4.37V4.25c0-1.13.58-2.05 1.3-2.05z"/></svg>`;

/** What We Offer — service cards (same markup/classes as the group version). */
export function pOffer(o) {
  const cards = o.cards.map((c) =>
    cbox({
      cls: "ap-card card-surface",
      lead: `<span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>`,
      title: c.title, titleCls: "ap-card__title",
      act: c.href ? { href: c.href } : { modal: c.pickup ? { pickup: c.pickup } : {} },
      cue: c.cue || o.cue || "Get a quote",
      bodyHtml: `<p class="ap-card__desc">${esc(c.desc)}</p>`,
    })
  ).join("");
  return `
    <section class="section" aria-labelledby="gt-offer-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">${esc(o.eyebrow || "What We Offer")}</span>
          <h2 id="gt-offer-title">${esc(o.heading)}</h2>
          ${o.intro ? `<p class="text-secondary">${esc(o.intro)}</p>` : ""}
        </div>
        <ul class="ap-grid">${cards}
        </ul>
      </div>
    </section>`;
}

/** Why Choose — informational benefit cards (brand-level by default). */
export function pWhy(o = WHY_SHARED) {
  const cards = o.items.map((c) =>
    cbox({
      cls: "ap-why",
      lead: `<span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>`,
      title: c.title, titleTag: "h3", titleCls: "ap-why__title",
      act: c.act || { modal: {} }, cue: c.cue || "Get a quote",
      bodyHtml: `<p class="ap-card__desc">${esc(c.desc)}</p>`,
    })
  ).join("");
  return `
    <section class="section" aria-labelledby="gt-why-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">${esc(o.eyebrow || "The Aura Difference")}</span>
          <h2 id="gt-why-title">${esc(o.heading)}</h2>
          ${o.intro ? `<p class="text-secondary">${esc(o.intro)}</p>` : ""}
        </div>
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

/** Airports We Serve — same airport-tile design; generic heading per service. */
export function pAirports(o = {}) {
  const tiles = SITE.airports
    .map((a) => cbox({
      cls: "airport-tile card-surface",
      lead: `<span class="airport-tile__icon">${AIRPORT_PLANE_SVG}</span><span class="airport-tile__code">${esc(a.code)}</span>`,
      titleTag: "p", titleCls: "airport-tile__name", title: a.name,
      act: { modal: { pickup: `${a.name} (${a.code})` } }, cue: `Book a ${a.code} transfer`,
    }))
    .join("\n          ");
  return `
    <section class="section section--alt airports-section" aria-labelledby="gt-air-title">
      <svg class="airport-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><linearGradient id="aura-plane-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e3bd"/><stop offset="1" stop-color="#c6a664"/></linearGradient></defs></svg>
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Airports We Serve</span>
          <h2 id="gt-air-title">${esc(o.heading || "Airports We Serve Across New York")}</h2>
          <p class="text-secondary">${esc(o.intro || "Six airports connect the Hamptons to the world — each with real-time flight tracking and curbside or meet & greet pickup. Tap any airport to book a transfer.")}</p>
        </div>
        <ul class="airports-grid">
          ${tiles}
        </ul>
        <div style="text-align:center;margin-top:1.75rem"><a class="btn btn-ghost" href="/services/airport-transfers/">${btnIcon("airplane")}Hamptons Airport Car Service</a></div>
      </div>
    </section>`;
}

/** Popular Routes / Popular Uses — route-chip grid (quote-prefill). */
export function pRoutes(o) {
  const chips = o.kind === "uses"
    ? o.items.map((u) => `<button type="button" class="route-chip" data-open-quote aria-label="${esc(u)}">${esc(u)}<span class="route-chip__go" aria-hidden="true">&rarr;</span></button>`).join("")
    : o.items.map((r) => {
        const [from, to] = r.split(" ⇄ ");
        const f = GROUP_ROUTE_FROM[from] || from;
        return `<button type="button" class="route-chip" data-open-quote data-route-from="${esc(f)}" data-route-to="${esc(`${to}, NY`)}" aria-label="Book ${esc(r)}">${esc(r)}<span class="route-chip__go" aria-hidden="true">&rarr;</span></button>`;
      }).join("");
  return `
    <section class="section section--alt" aria-labelledby="gt-route-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">${esc(o.eyebrow || "Popular Routes")}</span>
          <h2 id="gt-route-title">${esc(o.heading)}</h2>
          ${o.intro ? `<p class="text-secondary">${esc(o.intro)}</p>` : ""}
        </div>
        <div class="route-grid">${chips}</div>
      </div>
    </section>`;
}

/** Shared premium-spoke render path (used by the five non-group service pages).
 *  Reuses the Group Transfers design system; content comes from the spoke data. */
function renderPremiumSpoke(data, trail) {
  return {
    path: data.url,
    title: data.title,
    titleFull: data.titleFull,
    description: data.description,
    bodyClass: "page-service-spoke page-group-transfers",
    cluster: "services",
    card: { title: data.title, text: data.lede, icon: data.icon || "briefcase" },
    jsonLd: [
      serviceJsonLd(DEFAULT_SITE_URL, { name: data.title, path: data.url, description: data.description }),
      breadcrumbJsonLd(DEFAULT_SITE_URL, trail),
      faqJsonLd(data.faqs),
    ],
    main: [
      breadcrumb(trail),
      pageHero({ eyebrow: data.eyebrow, h1: data.h1, lede: data.lede, image: data.heroImage || SPOKE_HERO, features: data.heroFeatures || SPOKE_FEATURES }),
      groupTrust(),
      fleetSection({ intro: data.fleetIntro, order: data.fleetOrder, variant: "home" }),
      pOffer(data.offer),
      comparisonSection(data),
      eventCta(data.eventCta || { email: true }),
      pAirports(data.airportsSection || {}),
      groupAreas(data.areasSection || { heading: "Door-to-Door Across the Hamptons", intro: "Service to every village and hamlet on the East End of Long Island — tap your area to start a quote." }),
      pWhy(data.why || WHY_SHARED),
      pRoutes(data.routes),
      groupDetail({
        introEyebrow: "Our Commitment",
        introHeading: data.commitmentHeading || "Committed to Your Experience",
        detailIntro: data.commitmentIntro || "Professional service, comfort, and reliability on every Hamptons trip.",
        detailCards: COMMITMENT_CARDS,
        detailCta: "Start Your Quote",
      }),
      glanceSection(data),
      planningSection(data),
      faqAccordion({ faqs: data.faqs, lede: data.faqLede || `Answers to common questions about ${data.title.toLowerCase()} in the Hamptons.` }),
    ].join("\n"),
    preFooterCta: data.preFooterCta,
  };
}

function render(data) {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: data.title, path: data.url },
  ];
  // Premium service spokes (airport transfers, meet & greet, corporate, hourly,
  // FBO, …) — the Group Transfers design system with per-service content.
  if (data.premium) return renderPremiumSpoke(data, trail);
  // Redesigned layout for spokes that supply a hero image + extra sections
  // (currently Group Transfers only). Other spokes fall through to the
  // original composition below, byte-for-byte unchanged.
  if (data.heroImage) {
    return {
      path: data.url,
      title: data.title,
      titleFull: data.titleFull,
      description: data.description,
      bodyClass: "page-service-spoke page-group-transfers",
      cluster: "services",
      card: { title: data.title, text: data.lede, icon: data.icon || "briefcase" },
      jsonLd: [
        serviceJsonLd(DEFAULT_SITE_URL, { name: data.title, path: data.url, description: data.description }),
        breadcrumbJsonLd(DEFAULT_SITE_URL, trail),
        faqJsonLd(data.faqs),
      ],
      // Conversion-focused flow mirroring the JFK reference landing page while
      // preserving the existing Group Transfers hero, fleet, Two-Ways
      // comparison, Group Logistics, At-a-Glance, Planning & Booking, and FAQ.
      // The final CTA is the shared pre-footer band (preFooterCta below) so the
      // page shows a single final CTA, not a duplicate.
      main: [
        breadcrumb(trail),
        pageHero({ eyebrow: data.eyebrow, h1: data.h1, lede: data.lede, image: data.heroImage, features: data.heroFeatures }),
        groupTrust(),
        fleetSection({ intro: data.fleetIntro, order: data.fleetOrder, variant: "home" }),
        groupOffer(),
        comparisonSection(data),
        eventCta({ email: true }),
        groupAirports(),
        groupAreas(),
        groupWhy(),
        groupRoutes(),
        groupDetail(data),
        glanceSection(data),
        planningSection(data),
        faqAccordion({ faqs: data.faqs, lede: "Answers to common questions about group transportation in the Hamptons." }),
      ].join("\n"),
      // Final CTA lives in the shared pre-footer band for this page only.
      // Book Now + Call Now (no Email — that moved to the Event Transport CTA).
      preFooterCta: {
        eyebrow: "Reserve Your Group Ride",
        heading: "Ready to Move Your Group in Comfort?",
        sub: `Tell us your date, headcount, and itinerary, and we'll build the right plan — Sprinter Vans, Mini Buses, and Motor Coaches up to ${CAPACITY.coach.paxMax} passengers, 24/7.`,
      },
    };
  }
  return {
    path: data.url,
    title: data.title,
    description: data.description,
    bodyClass: "page-service-spoke",
    cluster: "services",
    card: { title: data.title, text: data.lede, icon: data.icon || "briefcase" },
    jsonLd: [
      serviceJsonLd(DEFAULT_SITE_URL, { name: data.title, path: data.url, description: data.description }),
      breadcrumbJsonLd(DEFAULT_SITE_URL, trail),
      faqJsonLd(data.faqs),
    ],
    main: [
      breadcrumb(trail),
      pageHero({ eyebrow: data.eyebrow, h1: data.h1, lede: data.lede, withForm: false, image: SPOKE_HERO, features: SPOKE_FEATURES }),
      introSplit(data),
      fleetSection({ variant: "home", intro: "Every Aura Hamptons service is delivered in one of our six vehicle classes — from the Executive Sedan to the Motor Coach." }),
      faqAccordion({ faqs: data.faqs, lede: `Answers to common questions about ${data.title.toLowerCase()} in the Hamptons.` }),
      related(data.slug, { icons: true }),
      eventCta(),
      contactSection(),
    ].join("\n"),
  };
}

/* ===========================================================================
   Service comparison data (section 5 — "where applicable"). Each page's
   comparison is service-specific and factual: a reserved, chauffeured Aura
   option beside the realistic alternative for THAT service. No invented stats,
   ratings, or guarantees — only real, verifiable differences in how the two
   options work. Vehicle-class pages compare the chauffeured vehicle with
   rideshare; wine tours compare with self-driving; the rest compare with the
   on-demand / standard alternative that a traveler would otherwise use.
   =========================================================================== */
const RIDESHARE_BRANDS = ["uber", "lyft"];

const CMP_AIRPORT = {
  eyebrow: "Two Ways to Get There",
  heading: "Private Airport Transfer vs. Rideshare & Taxi",
  intro: "Compare a reserved, flight-tracked transfer with an on-demand ride, and choose what fits your trip.",
  rowLabels: [
    { icon: "radar", label: "Flight tracking" },
    { icon: "tag", label: "Pricing" },
    { icon: "pin", label: "Pickup" },
    { icon: "userCheck", label: "Chauffeur & vehicle" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "plane", title: "Aura Hamptons — Private Airport Transfer",
      desc: "A reserved, door-to-door transfer timed to your flight, with a professional chauffeur.",
      rows: [
        ["Flight tracking", "We track your flight in real time; your pickup adjusts to your actual landing."],
        ["Pricing", "Quoted up front for your route — no surge pricing."],
        ["Pickup", "Curbside or in-terminal meet & greet with a name sign."],
        ["Chauffeur & vehicle", "A professional chauffeur in a clean, maintained luxury vehicle."],
      ] },
    { featured: false, brands: RIDESHARE_BRANDS, title: "Rideshare & Taxi — On-Demand",
      desc: "Rides requested after you land, booked individually through an app or at the stand.",
      rows: [
        ["Flight tracking", "No flight tracking; you request a ride once you are on the ground."],
        ["Pricing", "Fares vary with demand and can surge at peak times."],
        ["Pickup", "Curbside at the rideshare or taxi line."],
        ["Chauffeur & vehicle", "Whichever driver and vehicle are nearest."],
      ] },
  ],
  cta: { headingHtml: `Land, and your chauffeur is already waiting. <span class="gold">Book flight-tracked.</span>`,
    bookLabel: "Get an Airport Quote", note: "JFK • LGA • EWR • ISP • FOK • HTO • Flight-tracked • 24/7" },
};

const CMP_MEET = {
  eyebrow: "Two Ways to Be Met",
  heading: "In-Terminal Meet & Greet vs. Curbside Pickup",
  intro: "Compare being met inside the terminal with a standard curbside pickup.",
  rowLabels: [
    { icon: "pin", label: "Where you're met" },
    { icon: "sign", label: "Name sign" },
    { icon: "luggage", label: "Luggage help" },
    { icon: "radar", label: "If your flight shifts" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "sign", title: "Aura Hamptons — In-Terminal Meet & Greet",
      desc: "Your chauffeur waits inside the arrivals hall and walks you to the vehicle.",
      rows: [
        ["Where you're met", "Inside the arrivals area, past baggage claim."],
        ["Name sign", "A personalized name sign so you're easy to find."],
        ["Luggage help", "Your chauffeur assists with bags to the vehicle."],
        ["If your flight shifts", "We track the flight and adjust the meeting time to your arrival."],
      ] },
    { featured: false, icon: "car", title: "Standard Curbside Pickup",
      desc: "A pickup arranged at the curb once you have made your own way out.",
      rows: [
        ["Where you're met", "At the curb outside the terminal."],
        ["Name sign", "No in-terminal greeting."],
        ["Luggage help", "You bring your bags out to the pickup point."],
        ["If your flight shifts", "You coordinate the new timing yourself."],
      ] },
  ],
  cta: { headingHtml: `Walk out to a familiar face. <span class="gold">Be met inside.</span>`,
    bookLabel: "Book Meet & Greet", note: "Name sign • Luggage assistance • Flight-tracked • 24/7" },
};

const CMP_CORPORATE = {
  eyebrow: "Two Ways to Travel for Business",
  heading: "Dedicated Chauffeur Account vs. On-Demand Rideshare",
  intro: "Compare a reserved chauffeur service with booking individual rides on demand.",
  rowLabels: [
    { icon: "userCheck", label: "Chauffeurs" },
    { icon: "briefcase", label: "Billing & accounts" },
    { icon: "shield", label: "Discretion" },
    { icon: "clock", label: "Reliability" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "briefcase", title: "Aura Hamptons — Dedicated Chauffeur Service",
      desc: "Reserved, professional chauffeur travel for executives, teams, and VIP guests.",
      rows: [
        ["Chauffeurs", "Professional, vetted chauffeurs who know the routes."],
        ["Billing & accounts", "Corporate accounts and consolidated billing on request."],
        ["Discretion", "A quiet, private vehicle for calls and sensitive travel."],
        ["Reliability", "Reserved in advance and planned around your schedule."],
      ] },
    { featured: false, brands: RIDESHARE_BRANDS, title: "On-Demand Rideshare",
      desc: "Rides booked individually through an app, as needed.",
      rows: [
        ["Chauffeurs", "Whichever driver is nearest at the time."],
        ["Billing & accounts", "Per-ride receipts to reconcile individually."],
        ["Discretion", "A shared-economy vehicle and driver."],
        ["Reliability", "Subject to real-time availability and surge pricing."],
      ] },
  ],
  cta: { headingHtml: `Consistent, discreet, and on time. <span class="gold">Travel on account.</span>`,
    bookLabel: "Request Executive Travel", note: "Corporate accounts • Discreet chauffeurs • NYC & the Hamptons • 24/7" },
};

const CMP_FBO = {
  eyebrow: "Two Ways to Meet Your Aircraft",
  heading: "FBO-Coordinated Transfer vs. Standard Car Service",
  intro: "Compare a transfer coordinated with your crew and FBO against a standard pickup.",
  rowLabels: [
    { icon: "plane", label: "Coordination" },
    { icon: "clock", label: "Timing" },
    { icon: "pin", label: "Where you're met" },
    { icon: "shield", label: "Privacy" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "plane", title: "Aura Hamptons — FBO-Coordinated Transfer",
      desc: "A transfer planned with your flight crew and the FBO around your tail number.",
      rows: [
        ["Coordination", "We coordinate directly with your crew and the FBO."],
        ["Timing", "Your chauffeur is in position for your scheduled arrival or departure."],
        ["Where you're met", "Planeside or in the FBO lounge, where the operator permits."],
        ["Privacy", "A discreet, private transfer for you and your party."],
      ] },
    { featured: false, icon: "car", title: "Standard Car Service",
      desc: "A pickup booked to a general time without FBO coordination.",
      rows: [
        ["Coordination", "No direct coordination with the crew or FBO."],
        ["Timing", "Timed to an estimate rather than your actual movement."],
        ["Where you're met", "At a general meeting point, not planeside."],
        ["Privacy", "A standard pickup experience."],
      ] },
  ],
  cta: { headingHtml: `Wheels down to door, handled. <span class="gold">Coordinate your transfer.</span>`,
    bookLabel: "Arrange an FBO Transfer", note: "Crew & FBO coordination • Planeside where permitted • 24/7" },
};

const CMP_HOURLY = {
  eyebrow: "Two Ways to Book",
  heading: "By-the-Hour Chauffeur vs. Point-to-Point Booking",
  intro: "Compare keeping a dedicated chauffeur for the day with booking each trip separately.",
  rowLabels: [
    { icon: "clock", label: "Flexibility" },
    { icon: "route", label: "Multiple stops" },
    { icon: "hourglass", label: "Wait time" },
    { icon: "seat", label: "Your vehicle" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "clock", title: "Aura Hamptons — By-the-Hour Chauffeur",
      desc: "A dedicated chauffeur and vehicle that stay with you for the hours you reserve.",
      rows: [
        ["Flexibility", "Change plans on the fly — the vehicle is yours for the block."],
        ["Multiple stops", "As many stops as your day needs, in one booking."],
        ["Wait time", "Your chauffeur waits between stops; no re-booking."],
        ["Your vehicle", "The same vehicle and chauffeur throughout the day."],
      ] },
    { featured: false, icon: "route", title: "Point-to-Point Booking",
      desc: "A separate ride booked for each leg of the day.",
      rows: [
        ["Flexibility", "Each change means booking another ride."],
        ["Multiple stops", "A new booking for every stop."],
        ["Wait time", "No vehicle waiting between trips."],
        ["Your vehicle", "A different vehicle and driver each time."],
      ] },
  ],
  cta: { headingHtml: `Keep the car, lose the logistics. <span class="gold">Book by the hour.</span>`,
    bookLabel: "Reserve By the Hour", note: "Wine tours • Dining • Events • Multi-stop days • 24/7" },
};

const CMP_WEDDING = {
  eyebrow: "Two Ways to Move Your Guests",
  heading: "Dedicated Wedding Transport vs. Guests On Their Own",
  intro: "Compare coordinated wedding-day transportation with leaving rides to each guest.",
  rowLabels: [
    { icon: "calendar", label: "Coordination" },
    { icon: "clock", label: "Timing" },
    { icon: "users", label: "Guest experience" },
    { icon: "route", label: "Multi-venue" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "calendar", title: "Aura Hamptons — Dedicated Wedding Transport",
      desc: "Vehicles and shuttles coordinated around your wedding-day timeline.",
      rows: [
        ["Coordination", "One plan for the couple, the party, and guest shuttles."],
        ["Timing", "Arrivals and departures built around your schedule."],
        ["Guest experience", "Everyone travels together, comfortably and on time."],
        ["Multi-venue", "Continuous shuttles between hotels, ceremony, and reception."],
      ] },
    { featured: false, icon: "car", title: "Guests Arrange Their Own Rides",
      desc: "Each guest drives or books a ride independently.",
      rows: [
        ["Coordination", "No single plan; everyone sorts their own transport."],
        ["Timing", "Arrivals spread out and harder to predict."],
        ["Guest experience", "Guests split across cars and apps."],
        ["Multi-venue", "Each guest manages their own route between venues."],
      ] },
  ],
  cta: { headingHtml: `Every guest, every timing, handled. <span class="gold">Plan your wedding transport.</span>`,
    bookLabel: "Plan Wedding Transport", note: "Bridal party • Guest shuttles • Multi-venue • 24/7" },
};

const CMP_PROM = {
  eyebrow: "Two Ways to Get to Prom",
  heading: "Chauffeured Prom Transport vs. Driving or Rideshare",
  intro: "Compare a professional chauffeur for the group with teens driving or booking rides.",
  rowLabels: [
    { icon: "shield", label: "Safety" },
    { icon: "users", label: "The whole group" },
    { icon: "route", label: "Planned stops" },
    { icon: "userCheck", label: "Chauffeur" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "users", title: "Aura Hamptons — Chauffeured Prom Transport",
      desc: "A professional chauffeur and a vehicle sized to the group for the whole night.",
      rows: [
        ["Safety", "A vetted, professional chauffeur handles the driving."],
        ["The whole group", "Everyone rides together in one vehicle."],
        ["Planned stops", "Photos, dinner, and the venue, planned in advance."],
        ["Chauffeur", "A chauffeur dedicated to your group for the evening."],
      ] },
    { featured: false, icon: "car", title: "Teens Driving or Rideshare",
      desc: "Students drive themselves or book rides individually.",
      rows: [
        ["Safety", "Driving falls to the students or an on-demand driver."],
        ["The whole group", "The group may be split across several cars."],
        ["Planned stops", "Each stop coordinated on the night."],
        ["Chauffeur", "Whichever driver is available."],
      ] },
  ],
  cta: { headingHtml: `Keep the group together and safe. <span class="gold">Plan prom night.</span>`,
    bookLabel: "Plan Prom Transport", note: "Professional chauffeur • Group vehicles • Planned stops • 24/7" },
};

const CMP_PARTYBUS = {
  eyebrow: "Two Ways to Celebrate",
  heading: "One Group Party Vehicle vs. Multiple Separate Rides",
  intro: "Compare keeping everyone together in one vehicle with splitting into separate rides.",
  rowLabels: [
    { icon: "users", label: "Travel together" },
    { icon: "seat", label: "Onboard experience" },
    { icon: "calendar", label: "Planned route" },
    { icon: "userCheck", label: "Chauffeur" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "van", title: "Aura Hamptons — One Group Vehicle",
      desc: "Your whole party in one vehicle with a professional chauffeur, start to finish.",
      rows: [
        ["Travel together", "Everyone stays together for the entire night."],
        ["Onboard experience", "Room to spread out and enjoy the ride itself."],
        ["Planned route", "Stops and timing planned around your night out."],
        ["Chauffeur", "A dedicated chauffeur for the group."],
      ] },
    { featured: false, brands: RIDESHARE_BRANDS, title: "Multiple Separate Rides",
      desc: "The group splits across several on-demand rides.",
      rows: [
        ["Travel together", "The party is divided across several cars."],
        ["Onboard experience", "A standard ride, car by car."],
        ["Planned route", "Each car routed on its own."],
        ["Chauffeur", "A different driver for each ride."],
      ] },
  ],
  cta: { headingHtml: `Make the ride part of the night. <span class="gold">Keep everyone together.</span>`,
    bookLabel: "Get a Group Quote", note: "Group vehicles • Professional chauffeur • Across the Hamptons • 24/7" },
};

const CMP_EASTQUOGUE = {
  eyebrow: "Two Ways to Get a Ride",
  heading: "Reserved Car Service vs. On-Demand Rideshare",
  intro: "Compare a car service reserved in advance with relying on on-demand rides on the East End.",
  rowLabels: [
    { icon: "calendar", label: "Availability" },
    { icon: "radar", label: "Flight tracking" },
    { icon: "userCheck", label: "Chauffeur" },
    { icon: "tag", label: "Pricing" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "car", title: "Aura Hamptons — Reserved Car Service",
      desc: "A professional chauffeur reserved ahead for East Quogue and the wider East End.",
      rows: [
        ["Availability", "Reserved in advance, so your ride is confirmed."],
        ["Flight tracking", "Airport transfers are flight-tracked to your arrival."],
        ["Chauffeur", "A professional, vetted chauffeur."],
        ["Pricing", "Quoted up front for your route."],
      ] },
    { featured: false, brands: RIDESHARE_BRANDS, title: "On-Demand Rideshare",
      desc: "Rides requested in the moment through an app.",
      rows: [
        ["Availability", "On-demand availability can be limited out on the East End."],
        ["Flight tracking", "No flight tracking for airport trips."],
        ["Chauffeur", "Whichever driver is nearest."],
        ["Pricing", "Fares vary with demand."],
      ] },
  ],
  cta: { headingHtml: `Reserved, reliable, out to East Quogue. <span class="gold">Book ahead.</span>`,
    bookLabel: "Book a Car", note: "Airport transfers • Local rides • NYC trips • 24/7" },
};

const mkWineCmp = (where) => ({
  eyebrow: "Two Ways to Tour",
  heading: "Chauffeured Wine Tour vs. Driving Yourself",
  intro: `Compare a chauffeured tour of ${where} with driving the day yourself.`,
  rowLabels: [
    { icon: "shield", label: "Designated driver" },
    { icon: "users", label: "Everyone relaxes" },
    { icon: "route", label: "Winery routing" },
    { icon: "seat", label: "Comfort" },
  ],
  cards: [
    { tag: "Recommended", featured: true, icon: "car", title: "Aura Hamptons — Chauffeured Wine Tour",
      desc: `A professional chauffeur for a full day across ${where}.`,
      rows: [
        ["Designated driver", "A professional chauffeur drives, so no one in your group has to."],
        ["Everyone relaxes", "The whole group enjoys every tasting together."],
        ["Winery routing", "A day planned around the wineries you want to visit."],
        ["Comfort", "A clean, comfortable vehicle between stops."],
      ] },
    { featured: false, icon: "car", title: "Driving Yourself",
      desc: "One of your group drives between wineries.",
      rows: [
        ["Designated driver", "Someone in the group has to stay the designated driver."],
        ["Everyone relaxes", "The driver can't fully join the tastings."],
        ["Winery routing", "You navigate and park at each stop yourselves."],
        ["Comfort", "Your own vehicle, and the parking that comes with it."],
      ] },
  ],
  cta: { headingHtml: `Everyone tastes, no one drives. <span class="gold">Book a chauffeur.</span>`,
    bookLabel: "Plan a Wine Tour", note: "Designated chauffeur • Multi-winery routing • Your group together • 24/7" },
});
const CMP_WINE_HAMPTONS = mkWineCmp("Hamptons wine country");
const CMP_WINE_NORTHFORK = mkWineCmp("North Fork wine country");

const mkVehicleCmp = ({ name, icon: ic = "car", lead, rows }) => ({
  eyebrow: "Two Ways to Ride",
  heading: `Chauffeured ${name} vs. Rideshare`,
  intro: `Compare a reserved, chauffeured ${name} with an on-demand rideshare.`,
  rowLabels: rows.map((r) => ({ icon: r[0], label: r[1] })),
  cards: [
    { tag: "Recommended", featured: true, icon: ic, title: `Aura Hamptons — ${name}`,
      desc: lead,
      rows: rows.map((r) => [r[1], r[2]]) },
    { featured: false, brands: RIDESHARE_BRANDS, title: "On-Demand Rideshare",
      desc: "A ride requested in the moment through an app.",
      rows: rows.map((r) => [r[1], r[3]]) },
  ],
  cta: { headingHtml: `Reserved, professional, and on time. <span class="gold">Book your ${name}.</span>`,
    bookLabel: "Get a Quote", note: "Professional chauffeur • Reserved in advance • Across the Hamptons • 24/7" },
});
const CMP_SEDAN = mkVehicleCmp({ name: "Executive Sedan", lead: "A quiet, comfortable sedan with a professional chauffeur.", rows: [
  ["seat", "Comfort", "A quiet, well-appointed cabin for the ride.", "A standard car, whatever is nearest."],
  ["userCheck", "Chauffeur", "A professional, vetted chauffeur.", "Whichever driver is available."],
  ["tag", "Pricing", "Quoted up front for your route.", "Fares vary with demand."],
  ["calendar", "Reserved", "Booked in advance for your schedule.", "Requested on demand, subject to availability."],
] });
const CMP_SUV = mkVehicleCmp({ name: "Luxury SUV", lead: "Room for your party and luggage, with a professional chauffeur.", rows: [
  ["users", "Space", "Room for your party to travel together.", "Sized to whatever car arrives."],
  ["luggage", "Luggage", "Space for luggage, golf clubs, and gear.", "Limited to the vehicle that shows up."],
  ["userCheck", "Chauffeur", "A professional, vetted chauffeur.", "Whichever driver is available."],
  ["calendar", "Reserved", "Booked in advance for your schedule.", "Requested on demand, subject to availability."],
] });
const CMP_SPRINTER = mkVehicleCmp({ name: "Sprinter Van", icon: "van", lead: "Keep your group together with a professional chauffeur.", rows: [
  ["users", "Keep the group together", `Up to ${CAPACITY.sprinter.paxMax} passengers in one vehicle.`, "The group splits across several cars."],
  ["seat", "Room to spread out", "Comfortable seating and space for bags.", "A standard car per ride."],
  ["userCheck", "Chauffeur", "A professional, vetted chauffeur.", "A different driver for each ride."],
  ["calendar", "Reserved", "Booked in advance for your schedule.", "Requested on demand, subject to availability."],
] });

const SPOKES = [
  {
    slug: "airport-transfers",
    comparison: CMP_AIRPORT,
    url: "/services/airport-transfers/",
    icon: "plane",
    title: "Airport Transfers",
    h1: "Hamptons Airport Car Service (JFK, LGA, EWR, ISP, FOK & HTO)",
    eyebrow: "Airports We Serve",
    lede: "Arrive relaxed. Aura Hamptons provides punctual, flight-tracked chauffeured transfers between the Hamptons and every New York-area airport — JFK, LaGuardia, Newark, Islip, Gabreski, and East Hampton — door to door, 24/7.",
    description:
      "Hamptons airport car service — flight-tracked transfers to and from JFK, LaGuardia (LGA), Newark (EWR), Islip (ISP), Gabreski (FOK), and East Hampton (HTO), 24/7.",
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "clock", label: "24/7 chauffeured service" },
      { icon: "plane", label: "Real-time flight tracking" },
      { icon: "userCheck", label: "Professional chauffeurs" },
      { icon: "pin", label: "Door-to-door transfers" },
    ],
    introHeading: "Every flight tracked, every pickup on time",
    body: [
      "Aura Hamptons provides chauffeured transfers between the East End of Long Island and every airport our clients fly through — JFK, LaGuardia, Newark, Islip MacArthur, Gabreski, and East Hampton. Whether you're landing at JFK and heading east to Southampton or catching an early departure out of Newark, your chauffeur is in position when you need them.",
      "We track your inbound flight in real time and adjust your pickup to the actual landing time, with no extra charge if your flight is delayed. Meet &amp; greet inside the terminal is available on request, and your chauffeur's details are shared by text before pickup.",
      "The New York City to Hamptons corridor is our specialty: direct, door-to-door transfers from Manhattan, the airports, and the five boroughs to Southampton, East Hampton, Montauk, Sag Harbor, Bridgehampton, and the surrounding villages.",
    ],
    points: [
      "Transfers to and from JFK, LGA, EWR, ISP, FOK, and HTO",
      "Real-time flight tracking — pickup adjusts to your landing",
      "Meet & greet inside the terminal on request",
      "Direct NYC-to-Hamptons corridor service, door to door",
    ],
    offer: {
      heading: "Airport Transportation Services for Every Journey",
      intro: "Flight-tracked car service to and from every airport we serve, plus private-aviation and in-terminal meet & greet — all in one premium chauffeured fleet.",
      cards: [
        { icon: "plane", title: "JFK Airport Transfers", desc: "Flight-tracked car service to and from John F. Kennedy International (JFK), door to door across the Hamptons.", pickup: "John F. Kennedy International Airport (JFK)" },
        { icon: "plane", title: "LaGuardia Airport Transfers", desc: "Punctual chauffeured transfers to and from LaGuardia (LGA), timed to your actual arrival.", pickup: "LaGuardia Airport (LGA)" },
        { icon: "plane", title: "Newark Airport Transfers", desc: "Reliable car service between Newark Liberty (EWR) and every Hamptons village.", pickup: "Newark Liberty International Airport (EWR)" },
        { icon: "plane", title: "Islip MacArthur Airport Transfers", desc: "Convenient Long Island MacArthur (ISP) transfers — the closest major airport to the East End.", pickup: "Long Island MacArthur Airport (ISP)" },
        { icon: "plane", title: "Private Jet & FBO Transfers", desc: "Planeside and FBO transfers at East Hampton (HTO), Gabreski (FOK), and area private terminals.", href: "/services/fbo-private-jet/" },
        { icon: "sign", title: "Meet & Greet Airport Service", desc: "Your chauffeur meets you inside the terminal with a name sign and luggage assistance.", href: "/services/meet-and-greet/" },
      ],
    },
    routes: {
      heading: "Popular Airport Routes to the Hamptons",
      intro: "Our most-requested airport transfers along the New York City to Hamptons corridor. Tap one to prefill your quote.",
      items: ["JFK ⇄ Southampton", "JFK ⇄ East Hampton", "JFK ⇄ Montauk", "JFK ⇄ Sag Harbor", "LGA ⇄ East Hampton", "EWR ⇄ The Hamptons"],
    },
    eventCta: { email: true, eyebrow: "Airport Transfers &middot; 24/7", headingHtml: `Flying to or from<br class="event-cta__br"> <span class="gold">the Hamptons?</span>`, lede: "Flight-tracked, door-to-door airport transfers at every New York-area airport — your pickup adjusts to your actual arrival, 24/7." },
    commitmentHeading: "Committed to an On-Time Arrival",
    commitmentIntro: "Professional service, comfort, and reliability on every airport transfer.",
    areasSection: { heading: "Airport Transfers Across the Hamptons", intro: "Door-to-door airport car service to every village and hamlet on the East End of Long Island — tap your area to start a quote." },
    glanceHeading: "Hamptons Airport Car Service at a Glance",
    glance: [
      { label: "Airport transfers", desc: "Flight-tracked transfers to and from JFK, LGA, EWR, ISP, FOK and HTO, door to door." },
      { label: "Capacity", desc: "From an Executive Sedan up to a 56-passenger Motor Coach, sized to your party and luggage." },
      { label: "Book ahead", desc: "Share your airline and flight number; your pickup adjusts to your actual landing, delayed or early." },
      { label: "Service area", desc: "The Hamptons and the East End of Long Island, plus the New York City corridor." },
      { label: "Weddings & events", desc: "Flight-tracked group airport transfers for arriving wedding and event guests." },
      { label: "Group vehicles", desc: "Sprinter Vans, Mini Buses and Motor Coaches for arriving groups and families." },
    ],
    glanceNote: `Aura Hamptons provides flight-tracked, door-to-door airport car service between the East End of Long Island and every New York-area airport — JFK, LGA, EWR, ISP, FOK and HTO. Meet & greet inside the terminal is available on request, with direct NYC-to-Hamptons corridor service, available ${SITE.hours}.`,
    planning: {
      eyebrow: "Planning & Booking",
      heading: "Planning Your Airport Transfer",
      body: "Booking is simple. Share your airline and flight number so we can track your flight and time your pickup to your actual landing — early or delayed, at no extra charge. Add your return details for a round trip, and request meet & greet inside the terminal if you'd like it.",
      points: [
        "Share your airline and flight number for flight tracking",
        "Pickup adjusts automatically to your actual arrival",
        "Meet & greet inside the terminal on request",
        "Add return details for a round-trip airport transfer",
      ],
    },
    preFooterCta: { eyebrow: "Reserve Your Airport Transfer", heading: "Ready for a Flight-Tracked Hamptons Transfer?", sub: "Share your flight details and we'll time your door-to-door pickup to your actual arrival, 24/7." },
    faqs: [
      { q: "Which airports does Aura Hamptons serve?", a: "We serve JFK, LaGuardia (LGA), Newark (EWR), Islip MacArthur (ISP), Gabreski (FOK), and East Hampton Airport (HTO), with transfers to and from the Hamptons and the wider New York City area." },
      { q: "Do you provide JFK to Hamptons car service?", a: "Yes. JFK to the Hamptons is one of our most-requested routes — direct, door-to-door chauffeured transfers to Southampton, East Hampton, Montauk, Sag Harbor, and the surrounding villages." },
      { q: "Do you track incoming flights?", a: "Yes. We monitor your inbound flight in real time and position your chauffeur for your actual landing time." },
      { q: "What happens if my flight is delayed?", a: "Your pickup adjusts automatically to your real arrival — early or delayed — at no extra charge, because we track the flight." },
      { q: "Is meet & greet service available?", a: "Yes. On request, your chauffeur meets you inside the arrivals area with a personalized name sign and helps with your luggage." },
      { q: "Can I book an SUV or Sprinter for airport transfers?", a: "Yes. Choose from six vehicle classes — Executive Sedan, Luxury SUV, Sprinter Jet, Sprinter Van, Mini Bus, or Motor Coach — sized to your party and luggage." },
      { q: "Do you provide private jet and FBO transfers?", a: "Yes. We coordinate planeside and FBO transfers at East Hampton (HTO), Gabreski (FOK), and area private terminals, in sync with your flight crew." },
      { q: "Can I book a round-trip airport transfer?", a: "Yes. Add your return details when you book, or tell us your itinerary and we'll arrange both legs of your trip." },
      { q: "How can I get an airport transfer quote?", a: `Use the booking form on this page for an instant quote, or call ${SITE.phone.display} and we'll help you directly.` },
      { q: "Are airport transfers available 24/7?", a: "Yes. Aura Hamptons operates 24/7, including holidays, for early departures and late-night arrivals alike." },
    ],
  },
  {
    slug: "meet-and-greet",
    comparison: CMP_MEET,
    url: "/services/meet-and-greet/",
    icon: "sign",
    title: "Meet & Greet Service",
    h1: "Airport Meet & Greet Service for the Hamptons",
    eyebrow: "Arrivals Made Easy",
    lede: "Your chauffeur meets you inside the terminal with a name sign, helps with your luggage, and walks you to your vehicle.",
    description:
      "Airport meet & greet service for Hamptons travelers — your Aura Hamptons chauffeur meets you inside the arrivals area with a name sign and luggage assistance.",
    introHeading: "A calm arrival from the moment you land",
    body: [
      "After a long flight, the last thing you want is to hunt for your ride. With Aura Hamptons' meet &amp; greet service, your professional chauffeur is waiting inside the arrivals area holding a sign with your name.",
      "We track your flight in real time, so your chauffeur is in position whether you land early or late. They assist with luggage and escort you directly to your waiting vehicle — no calls, no confusion, no waiting at the curb — then on to Southampton, East Hampton, Montauk, or wherever your trip takes you.",
      "Meet &amp; greet is available at JFK, LaGuardia, Newark, Islip, Gabreski, and East Hampton — just share your airline and flight number when you book.",
    ],
    points: [
      "Inside-terminal greeting with a personalized name sign",
      "Real-time flight tracking — pickup adjusts to your landing",
      "Luggage assistance to the vehicle",
      "Chauffeur contact shared by text before you arrive",
    ],
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "sign", label: "In-terminal name sign" },
      { icon: "plane", label: "Real-time flight tracking" },
      { icon: "userCheck", label: "Professional chauffeurs" },
      { icon: "clock", label: "Available 24/7" },
    ],
    offer: {
      heading: "Meet & Greet at Every Terminal",
      intro: "A calm, personal arrival — your chauffeur is waiting inside before you reach the curb.",
      cards: [
        { icon: "sign", title: "In-Terminal Name Sign", desc: "Your chauffeur waits in the arrivals area holding a personalized sign with your name." },
        { icon: "plane", title: "Real-Time Flight Tracking", desc: "We monitor your inbound flight and adjust the pickup to your actual landing — early or delayed." },
        { icon: "briefcase", title: "Luggage Assistance", desc: "Your chauffeur helps with your bags and walks you directly to your waiting vehicle." },
        { icon: "phone", title: "Chauffeur Coordination", desc: "We text your chauffeur's name and number before you land, so you connect on arrival." },
        { icon: "users", title: "Domestic & International", desc: "Meet & greet for both domestic and international arrivals at every airport we serve." },
        { icon: "pin", title: "Onward Hamptons Transfer", desc: "Door-to-door to Southampton, East Hampton, Montauk, Sag Harbor and the surrounding villages." },
      ],
    },
    airportsSection: { heading: "Meet & Greet Airports We Serve", intro: "Inside-terminal greeting and luggage assistance at every airport we serve. Tap any airport to book." },
    routes: {
      heading: "Popular Meet & Greet Arrivals",
      intro: "Our most-requested meet & greet arrivals along the New York City to Hamptons corridor. Tap one to prefill your quote.",
      items: ["JFK ⇄ Southampton", "JFK ⇄ East Hampton", "JFK ⇄ Montauk", "LGA ⇄ East Hampton", "EWR ⇄ The Hamptons", "JFK ⇄ Sag Harbor"],
    },
    eventCta: { email: true, eyebrow: "Arrivals Made Easy &middot; 24/7", headingHtml: `Planning a smooth<br class="event-cta__br"> <span class="gold">Hamptons arrival?</span>`, lede: "Share your airline and flight number — your chauffeur meets you inside the terminal with a name sign, 24/7." },
    commitmentHeading: "Committed to a Calm Arrival",
    commitmentIntro: "Professional service, comfort, and reliability from the moment you land.",
    glanceHeading: "Meet & Greet at a Glance",
    glance: [
      { label: "Capacity", desc: "From an executive sedan up to a 56-passenger motor coach, sized to your party and luggage." },
      { label: "Airport transfers", desc: "In-terminal meet & greet at JFK, LGA, EWR, ISP, FOK and HTO, timed to your landing." },
      { label: "Book ahead", desc: "Reserve with your airline and flight number so your chauffeur is in position on arrival." },
      { label: "Service area", desc: "The Hamptons and the East End of Long Island, plus the New York City corridor." },
      { label: "Weddings & events", desc: "Greet arriving wedding and event guests inside the terminal and bring them together." },
      { label: "Group vehicles", desc: "Sprinter Vans, Mini Buses and Motor Coaches for arriving groups and families." },
    ],
    glanceNote: `Aura Hamptons meets you inside the arrivals area with a personalized name sign, assists with luggage, and escorts you to your vehicle — then door to door across the Hamptons. Flight-tracked at JFK, LGA, EWR, ISP, FOK and HTO, available ${SITE.hours}.`,
    planning: {
      eyebrow: "How It Works",
      heading: "How Meet & Greet Works",
      body: "Booking is simple. Share your airline and flight number when you reserve, and we handle the rest — tracking your flight, positioning your chauffeur inside the terminal, and texting you their details before you land.",
      points: [
        "Share your airline and flight number when you book",
        "We track your flight and adjust to your actual landing",
        "Your chauffeur waits inside arrivals with a name sign",
        "Luggage assistance, then door-to-door to your destination",
      ],
    },
    preFooterCta: { eyebrow: "Reserve Your Arrival", heading: "Ready for a Seamless Hamptons Arrival?", sub: "Share your flight details and we'll have your chauffeur waiting inside the terminal, 24/7." },
    faqs: [
      { q: "Where will my chauffeur meet me?", a: "Your chauffeur waits in the arrivals area holding a sign with your name. We'll text you their name and phone number before you land so you can coordinate directly." },
      { q: "Do you track my flight?", a: "Yes. We monitor your inbound flight in real time and adjust the pickup to your actual landing time — early or delayed — at no extra charge." },
      { q: "Is meet & greet available for domestic and international arrivals?", a: "Yes. Meet & greet is available for both domestic and international arrivals at the airports we serve. Just share your airline and flight number when you book." },
      { q: "How do I book meet & greet service?", a: `Use the booking form on this page or call ${SITE.phone.display}. Share your airline and flight number so we can track your arrival and position your chauffeur inside the terminal.` },
      { q: "Which areas do you serve after pickup?", a: "Door-to-door across the Hamptons and the East End — Southampton, East Hampton, Montauk, Sag Harbor, Bridgehampton and the surrounding villages — plus the New York City corridor." },
    ],
  },
  {
    slug: "corporate-executive",
    comparison: CMP_CORPORATE,
    url: "/services/corporate-executive/",
    icon: "briefcase",
    title: "Corporate & Executive Travel",
    h1: "Corporate & Executive Car Service in the Hamptons",
    eyebrow: "Business Travel",
    lede: "Dependable, discreet chauffeured transportation for executives, client visits, and corporate programs across the Hamptons and into New York City.",
    description:
      "Corporate and executive car service in the Hamptons — discreet, punctual chauffeured travel for meetings, client transportation, and corporate programs, with NYC connections.",
    introHeading: "Transportation your schedule can rely on",
    body: [
      "For business travel, timing and presentation matter. Aura Hamptons provides professional chauffeured transportation for executives, visiting clients, and corporate programs throughout the East End — from a single airport pickup to a full day of meetings, and into Manhattan when the day takes you there.",
      "Our chauffeurs know the Hamptons and the NYC corridor, arrive early, and keep every detail discreet. Travel in an Executive Sedan or Luxury SUV, or move a team together in a Sprinter Van, Mini Bus, or Motor Coach.",
    ],
    points: [
      "Punctual pickups built around your meeting schedule",
      "Discreet, professional chauffeurs",
      "Executive Sedan, Luxury SUV, or group vehicles",
      "Billing and coordination for recurring corporate travel",
    ],
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "briefcase", label: "Executive-class vehicles" },
      { icon: "userCheck", label: "Discreet chauffeurs" },
      { icon: "clock", label: "Built around your schedule" },
      { icon: "route", label: "Multi-stop business days" },
    ],
    fleetOrder: ["sedan", "suv", "sprinterjet", "sprinter", "minibus", "coach"],
    offer: {
      heading: "Executive Transportation, Handled",
      intro: "Discreet, punctual chauffeured travel for executives, clients and corporate programs across the Hamptons and into New York City.",
      cards: [
        { icon: "briefcase", title: "Executive Airport Transfers", desc: "Flight-tracked pickups for executives and visiting clients at every airport we serve.", pickup: "John F. Kennedy International Airport (JFK)" },
        { icon: "userCheck", title: "Client Transportation", desc: "A polished first impression — Executive Sedan or Luxury SUV for client pickups and visits." },
        { icon: "route", title: "Multi-Stop Business Days", desc: "A dedicated chauffeur who stays with you between meetings across the Hamptons and NYC." },
        { icon: "calendar", title: "Recurring Corporate Travel", desc: "Coordinated, repeatable scheduling for ongoing executive and team transportation." },
        { icon: "users", title: "Team & Group Transport", desc: "Move a team together in a Sprinter Van, Mini Bus or Motor Coach — one arrival time." },
        { icon: "shield", title: "Discretion & Reliability", desc: "Professional, confidential chauffeurs and immaculate vehicles, every trip." },
      ],
    },
    airportsSection: { heading: "Corporate Airport Transfers Across New York", intro: "Flight-tracked executive transfers at every airport we serve. Tap any airport to book." },
    routes: {
      heading: "Popular Corporate Routes",
      intro: "Our most-requested executive trips along the New York City to Hamptons corridor. Tap one to prefill your quote.",
      items: ["NYC ⇄ Southampton", "NYC ⇄ East Hampton", "JFK ⇄ The Hamptons", "LGA ⇄ Southampton", "EWR ⇄ East Hampton", "Manhattan ⇄ Montauk"],
    },
    eventCta: { email: true, eyebrow: "Business Travel &middot; 24/7", headingHtml: `Need reliable<br class="event-cta__br"> <span class="gold">executive transportation?</span>`, lede: "From a single client pickup to a full day of meetings and corporate accounts — discreet, punctual chauffeurs, 24/7." },
    commitmentHeading: "Committed to Your Schedule",
    commitmentIntro: "Professional service, comfort, and reliability on every business trip.",
    glanceHeading: "Corporate Travel at a Glance",
    glance: [
      { label: "Capacity", desc: "Executive Sedan and Luxury SUV for individuals, up to a 56-passenger motor coach for teams." },
      { label: "Airport transfers", desc: "Flight-tracked executive pickups at JFK, LGA, EWR, ISP, FOK and HTO." },
      { label: "Book ahead", desc: "Set up recurring executive travel and consolidated billing for corporate accounts." },
      { label: "Service area", desc: "The Hamptons and the East End, plus the New York City corridor and Manhattan." },
      { label: "Weddings & events", desc: "Corporate events, conferences and client programs moved on one schedule." },
      { label: "Group vehicles", desc: "Sprinter Vans, Mini Buses and Motor Coaches for teams travelling together." },
    ],
    glanceNote: `Aura Hamptons provides discreet, punctual executive transportation across the Hamptons and the East End of Long Island, with connections into New York City. From a single client pickup to recurring corporate programs and multi-stop meeting days, available ${SITE.hours}.`,
    planning: {
      eyebrow: "Corporate Accounts & Booking",
      heading: "Planning Your Corporate Travel",
      body: "Whether it's one executive pickup or an ongoing program, tell us your itinerary and we'll build the right plan — the right vehicle class, punctual timing around your meetings, and consolidated billing for recurring travel.",
      points: [
        "Share your schedule, stops and preferred vehicle class",
        "Dedicated chauffeur who stays with you between meetings",
        "Recurring travel and consolidated billing for accounts",
        "Discreet, professional service from pickup to drop-off",
      ],
    },
    preFooterCta: { eyebrow: "Reserve Executive Travel", heading: "Ready for Dependable Executive Transportation?", sub: "Tell us your itinerary and we'll build the right plan — discreet, punctual chauffeurs across the Hamptons and NYC, 24/7." },
    faqs: [
      { q: "Can you handle multi-stop business days?", a: "Yes. Our hourly chauffeur service is ideal for multi-stop days of meetings — your dedicated chauffeur stays with you between stops across the Hamptons and into NYC." },
      { q: "Do you offer corporate accounts?", a: "Yes. We can coordinate recurring executive travel and consolidated billing for corporate clients. Contact us to set it up." },
      { q: "Which vehicle is best for client transportation?", a: "The Executive Sedan and Luxury SUV both make a strong impression for client pickups; the Sprinter Van is ideal when you're moving a team together." },
      { q: "Do you provide executive airport transfers?", a: "Yes. We provide flight-tracked executive transfers to and from JFK, LGA, EWR, ISP, FOK and HTO, timed to your actual arrival." },
      { q: "Are you available for early or late business travel?", a: `Yes. Aura Hamptons operates ${SITE.hours}, so early departures and late arrivals around your meeting schedule are covered.` },
    ],
  },
  {
    slug: "group-transfers",
    url: "/services/group-transfers/",
    icon: "van",
    title: "Group Transfers",
    // Page-only SEO <title> override (keeps the "Group Transfers" label for nav,
    // breadcrumbs, schema name, and sibling Related-Services cards).
    titleFull: "Hamptons Group Transportation & Shuttles | Aura Hamptons",
    h1: "Group Transportation in the Hamptons",
    eyebrow: "Travel Together",
    // Redesigned layout opt-in (Group Transfers only).
    heroImage: "/assets/img/fleet/motor-coach",
    heroFeatures: [
      { icon: "users", label: `Up to ${CAPACITY.coach.paxMax} passengers` },
      { icon: "shield", label: "Professional chauffeurs" },
      { icon: "plane", label: "Flight-tracked airport transfers" },
      { icon: "clock", label: "Available 24/7" },
    ],
    fleetOrder: ["sedan", "suv", "sprinterjet", "sprinter", "minibus", "coach"],
    fleetIntro: `From the ${CAPACITY.sprinter.paxMax}-passenger Sprinter Van to the ${CAPACITY.coach.paxMax}-passenger Motor Coach, every Aura Hamptons group vehicle keeps your whole party together.`,
    introEyebrow: "Our Commitment",
    glanceHeading: "Group Transportation at a Glance",
    lede: `Comfortable group transportation for weddings, corporate groups, and private events — Sprinter Vans, Mini Buses, and Motor Coaches up to ${CAPACITY.coach.paxMax} passengers.`,
    description:
      `Group transportation in the Hamptons — Sprinter Vans, Mini Buses & Motor Coaches up to ${CAPACITY.coach.paxMax} passengers for weddings, corporate groups & events. Book 24/7.`,
    comparison: {
      eyebrow: "Two Ways to Travel",
      heading: "Group Transportation vs. On-Demand Rides",
      intro: "Compare a reserved group vehicle with on-demand rides, and choose the option that fits your trip.",
      rowLabels: [
        { icon: "users", label: "Group Travel" },
        { icon: "calendar", label: "Scheduling" },
        { icon: "route", label: "Coordination" },
        { icon: "star", label: "Best For" },
      ],
      cards: [
        {
          tag: "Recommended",
          featured: true,
          icon: "car",
          title: "Aura Hamptons — Dedicated Group Vehicle",
          desc: "One reserved vehicle for your entire group, with a professional chauffeur, planned around your schedule.",
          rows: [
            ["Group Travel", "Everyone travels together in one vehicle."],
            ["Scheduling", "Reserved in advance for your date and itinerary."],
            ["Coordination", "Coordinated multi-trip scheduling for events, weddings, and larger programs."],
            ["Best For", "Weddings, corporate groups, events, and group airport transfers."],
          ],
        },
        {
          featured: false,
          brands: ["uber", "lyft"],
          title: "Uber & Lyft — On-Demand Rides",
          desc: "Convenient rides on demand, booked individually through the app.",
          rows: [
            ["Group Travel", "Multiple rides may be needed for larger groups."],
            ["Scheduling", "Booked per trip, based on real-time availability."],
            ["Coordination", "Managed ride by ride within each app."],
            ["Best For", "Individual rides or smaller groups with flexible, on-demand needs."],
          ],
        },
      ],
      cta: {
        headingHtml: `Keep your group together. <span class="gold">Leave the logistics to us.</span>`,
        bookLabel: "Get My Group Quote",
        note: `Sprinter Vans • Mini Buses • Motor Coaches • Up to ${CAPACITY.coach.paxMax} passengers`,
      },
    },
    midCta: {
      heading: "Planning a Group Trip or Wedding Shuttle?",
      sub: "Tell us your date, headcount, and itinerary, and we'll build a plan.",
    },
    glance: [
      { label: "Capacity", desc: `From an executive sedan up to a ${CAPACITY.coach.paxMax}-passenger motor coach — we size the vehicle to your exact headcount.` },
      { label: "Group vehicles", desc: `Sprinter Vans (${CAPACITY.sprinter.paxMax}), Mini Buses (${CAPACITY.minibus.paxMax}), and Motor Coaches (${CAPACITY.coach.paxMax}) keep your whole party together in one vehicle.` },
      { label: "Weddings & events", desc: "Continuous guest shuttles between the hotels, ceremony, and reception, planned around your timeline." },
      { label: "Airport transfers", desc: "Flight-tracked group transfers to and from JFK, LGA, EWR, ISP, FOK, and HTO for the whole party." },
      { label: "Service area", desc: "The Hamptons and the East End of Long Island, plus the New York City corridor." },
      { label: "Book ahead", desc: "Group vehicles are limited — reserve early, especially for weddings and peak event dates." },
    ],
    glanceNote: `Aura Hamptons provides luxury group transportation across the Hamptons and the East End of Long Island — from a ${CAPACITY.sprinter.paxMax}-passenger Sprinter Van to a ${CAPACITY.coach.paxMax}-passenger Motor Coach. We handle wedding guest shuttles, corporate and private-event transport, and flight-tracked group airport transfers, with coordinated multi-trip scheduling for larger programs. Available ${SITE.hours}, across the Hamptons and the New York City corridor.`,
    planning: {
      eyebrow: "Planning & Booking",
      heading: "Planning Your Group Trip",
      body: "Group vehicles are limited, so the earlier you book, the better your options. To help us build the right plan, confirm your headcount early — it sets the vehicle class — and share your full itinerary and stops. For multi-venue days, we can run coordinated trips around your schedule. Booking ahead is recommended for weddings, corporate programs, and event dates.",
      points: [
        "Confirm your headcount to set the vehicle class",
        "Share your full itinerary and stops",
        "Coordinated trips for multi-venue days",
        "Book ahead for weddings, corporate programs, and events",
      ],
    },
    introHeading: "Committed to Your Group's Experience",
    detailIntro: "Professional service, comfort, and reliability on every Hamptons group trip.",
    // Three commitment feature items (original design/icons/layout via groupDetail).
    detailCards: [
      { icon: "userCheck", title: "Professional Service", desc: "Courteous, discreet chauffeurs and attentive coordination from the first call to the final drop-off." },
      { icon: "van", title: "Comfort & Reliability", desc: "Clean, climate-controlled group vehicles and punctual, flight-tracked pickups your group can count on." },
      { icon: "shield", title: "A Dependable Experience", desc: "We plan the details so your group travels together, on schedule, and at ease — every trip." },
    ],
    points: [
      "One vehicle keeps your whole group together",
      "Professional chauffeurs and a meticulously maintained fleet",
      "Wedding guest shuttles and event logistics",
      "Flight-tracked group airport transfers (JFK, LGA, EWR, ISP, FOK and HTO)",
      "Coordinated multi-trip scheduling for larger programs",
    ],
    faqs: [
      { q: "How many passengers can you move?", a: `Our Sprinter Van seats ${paxLabel(CAPACITY.sprinter)}, the Mini Bus up to ${CAPACITY.minibus.paxMax}, and the Motor Coach up to ${CAPACITY.coach.paxMax} — ideal for weddings, corporate groups, and events across the Hamptons.` },
      { q: "Do you provide wedding guest shuttles?", a: "Yes. Group shuttles between hotels, the ceremony, and the reception are one of our most-requested Hamptons services. Tell us your timeline and guest count and we'll build a plan." },
      { q: "Do you provide group airport transfers?", a: "Yes. We provide group transfers to and from JFK, LGA, EWR, ISP, FOK and HTO, with real-time flight tracking so your pickup matches your actual arrival." },
      { q: "Can you coordinate multiple stops or multi-venue events?", a: "Yes. For multi-venue days we can plan coordinated trips around your schedule — share your itinerary and we'll build a plan." },
      { q: "How far in advance should we book a group vehicle?", a: "As early as you can. Group vehicles are limited, so booking ahead gives you the best options — especially for weddings, corporate programs, and peak event dates. Confirming your headcount early helps, since it sets the vehicle class." },
      { q: "What's included in your group vehicles?", a: "Every group vehicle is climate-controlled, comfortably seated, and meticulously maintained, with luggage space sized to the vehicle class. The Sprinter Van also includes Wi-Fi. Each vehicle card above lists its specific amenities." },
      { q: "Which areas do you serve?", a: "We serve the Hamptons and the East End of Long Island — Southampton, East Hampton, Montauk, Sag Harbor, Bridgehampton, and the surrounding villages — plus the New York City corridor, available 24/7." },
    ],
  },
  {
    slug: "fbo-private-jet",
    comparison: CMP_FBO,
    url: "/services/fbo-private-jet/",
    icon: "plane",
    title: "Private Jet & FBO Transfers",
    h1: "Private Jet & FBO Car Service in the Hamptons",
    eyebrow: "Private Aviation",
    lede: "Seamless transfers to and from Hamptons-area private aviation terminals and FBOs, including East Hampton (HTO) and Gabreski (FOK).",
    description:
      "Private jet and FBO car service in the Hamptons — planeside and terminal transfers at East Hampton (HTO), Gabreski (FOK), and area FBOs, coordinated with your flight crew.",
    introHeading: "Coordinated with your flight crew, planeside",
    body: [
      "Private aviation runs on timing and discretion. Aura Hamptons coordinates directly with your flight crew and FBO so your chauffeur is in position when your aircraft arrives — whether you're flying into East Hampton Airport (HTO), Gabreski (FOK), or connecting from a Westchester or Teterboro departure.",
      "Planeside pickup where the FBO permits, discreet professional chauffeurs, and a vehicle sized to your party and luggage — from an Executive Sedan to a Motor Coach for a full charter group.",
    ],
    points: [
      "Transfers at East Hampton (HTO) and Gabreski (FOK)",
      "Direct coordination with your flight crew and FBO",
      "Planeside pickup where permitted",
      "Vehicles from Executive Sedan to Motor Coach",
    ],
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "plane", label: "HTO & FOK transfers" },
      { icon: "userCheck", label: "Crew & FBO coordination" },
      { icon: "clock", label: "Timed to your schedule" },
      { icon: "shield", label: "Discreet, private service" },
    ],
    offer: {
      heading: "Private Aviation Transfers, Coordinated",
      intro: "Planeside and FBO transfers across the Hamptons' private airfields, coordinated directly with your flight crew.",
      cards: [
        { icon: "plane", title: "East Hampton (HTO) Transfers", desc: "Door-to-FBO and planeside transfers at East Hampton Airport, where permitted.", pickup: "East Hampton Airport (HTO)" },
        { icon: "plane", title: "Gabreski (FOK) Transfers", desc: "Private-aviation transfers at Francis S. Gabreski Airport, timed to your arrival.", pickup: "Francis S. Gabreski Airport (FOK)" },
        { icon: "userCheck", title: "Flight Crew Coordination", desc: "We work directly with your crew and FBO to match your actual arrival or departure time." },
        { icon: "route", title: "Regional Connections", desc: "Connections from Westchester, Teterboro and other regional fields to the East End." },
        { icon: "car", title: "Any Vehicle Class", desc: "From an Executive Sedan to a Motor Coach for a full charter group and luggage." },
        { icon: "shield", title: "Private & Discreet", desc: "Planeside pickup where the FBO permits, with professional, confidential chauffeurs." },
      ],
    },
    airportsSection: { heading: "Airports & FBOs We Serve", intro: "Private-aviation transfers at HTO and FOK, plus every commercial airport we serve. Tap any airport to book." },
    routes: {
      heading: "Popular Private Aviation Routes",
      intro: "Our most-requested private-aviation transfers. Tap one to prefill your quote.",
      items: ["HTO ⇄ East Hampton", "HTO ⇄ Montauk", "FOK ⇄ Southampton", "FOK ⇄ Westhampton Beach", "HTO ⇄ Sag Harbor", "FOK ⇄ Quogue"],
    },
    eventCta: { email: true, eyebrow: "Private Aviation &middot; 24/7", headingHtml: `Flying into a<br class="event-cta__br"> <span class="gold">Hamptons FBO?</span>`, lede: "Share your airfield and schedule — we coordinate with your crew and FBO so your chauffeur is in position, 24/7." },
    commitmentHeading: "Committed to a Seamless Transfer",
    commitmentIntro: "Professional service, comfort, and reliability for every private-aviation arrival and departure.",
    glanceHeading: "Private Jet & FBO at a Glance",
    glance: [
      { label: "Airport transfers", desc: "Planeside and FBO transfers at East Hampton (HTO) and Gabreski (FOK), plus regional connections." },
      { label: "Capacity", desc: "From an Executive Sedan to a 56-passenger Motor Coach for a full charter group and luggage." },
      { label: "Book ahead", desc: "Share your airfield, schedule and crew contact so we can coordinate with your FBO." },
      { label: "Service area", desc: "The Hamptons and the East End of Long Island, plus the New York City corridor." },
      { label: "Weddings & events", desc: "Arriving charter groups brought together from the FBO to the venue on one schedule." },
      { label: "Group vehicles", desc: "Sprinter Vans, Mini Buses and Motor Coaches for larger charter parties." },
    ],
    glanceNote: `Aura Hamptons coordinates directly with your flight crew and FBO at East Hampton (HTO) and Gabreski (FOK), with planeside pickup where permitted and discreet, professional chauffeurs. Vehicles from an Executive Sedan to a Motor Coach, available ${SITE.hours}.`,
    planning: {
      eyebrow: "Coordinating Your Transfer",
      heading: "Coordinating With Your Flight Crew",
      body: "Private aviation runs on timing and discretion. Share your airfield and schedule, and we coordinate directly with your crew and FBO so your chauffeur is in position when your aircraft arrives — or waiting as you depart.",
      points: [
        "Share your airfield, schedule and crew contact",
        "We coordinate directly with your crew and FBO",
        "Planeside pickup where the FBO permits it",
        "Door-to-door across the Hamptons and the East End",
      ],
    },
    preFooterCta: { eyebrow: "Reserve Your FBO Transfer", heading: "Ready for a Seamless Private Transfer?", sub: "Share your airfield and schedule and we'll coordinate with your crew — planeside where permitted, 24/7." },
    faqs: [
      { q: "Which private airfields do you serve?", a: "We serve the Hamptons-area private aviation terminals and FBOs, including East Hampton Airport (HTO) and Francis S. Gabreski Airport (FOK), and coordinate connections from other regional fields." },
      { q: "Can you coordinate with my flight crew?", a: "Yes. We work directly with your crew and FBO to match your actual arrival or departure time, so your chauffeur is ready when you are." },
      { q: "Is planeside pickup available?", a: "Where the FBO permits it, your chauffeur can meet you planeside. Otherwise you'll be met at the FBO lounge. Let us know your airfield when you book." },
      { q: "What size vehicle can you provide for a charter group?", a: "Anything from an Executive Sedan to a Motor Coach. Tell us your party size and luggage and we'll size the vehicle to your group." },
      { q: "Are private aviation transfers available 24/7?", a: `Yes. Aura Hamptons operates ${SITE.hours}, so early and late private-aviation arrivals and departures are covered.` },
    ],
  },
  {
    slug: "hourly-chauffeur",
    comparison: CMP_HOURLY,
    url: "/services/hourly-chauffeur/",
    icon: "calendar",
    title: "Hourly Chauffeur Service",
    h1: "Hourly Chauffeur Service in the Hamptons",
    eyebrow: "By the Hour",
    lede: "A dedicated chauffeur for wine tours, dinners, multiple stops, or a day out — your vehicle waits for you wherever the day takes you.",
    description:
      "Hourly chauffeur service in the Hamptons — a dedicated chauffeur and vehicle for wine tours, dinners, multi-stop days, events, and full-day East End travel.",
    introHeading: "Your chauffeur, for as long as you need",
    body: [
      "Some days don't fit a single pickup and drop-off. With Aura Hamptons' hourly chauffeur service, you keep a dedicated chauffeur and vehicle for the hours you need — perfect for a vineyard tour across the East End, a day of shopping and dining, a special occasion, or a full day of meetings.",
      "Your chauffeur waits between stops and handles the driving, parking, and timing, so you can focus on your day. Choose the Executive Sedan, Luxury SUV, or a larger vehicle depending on your party size.",
    ],
    points: [
      "Dedicated chauffeur and vehicle by the hour",
      "Unlimited stops within your reserved time",
      "Ideal for wine tours, dinners, and events",
      "Executive Sedan, Luxury SUV, or group vehicles",
    ],
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "clock", label: "By the hour" },
      { icon: "route", label: "Unlimited stops" },
      { icon: "userCheck", label: "Dedicated chauffeur" },
      { icon: "car", label: "Your vehicle waits" },
    ],
    offer: {
      heading: "Your Chauffeur, For the Whole Day",
      intro: "A dedicated chauffeur and vehicle for the hours you need — your car waits between stops wherever the day takes you.",
      cards: [
        { icon: "route", title: "Wine Tours & Vineyards", desc: "A dedicated chauffeur for a day across the East End's vineyards — your car waits at each stop." },
        { icon: "calendar", title: "Dining & Nights Out", desc: "Arrive and leave on your schedule for dinners and evenings out, with no parking or waiting." },
        { icon: "pin", title: "Shopping & Day Trips", desc: "A full day of shopping and sightseeing across the Hamptons, at your own pace." },
        { icon: "users", title: "Special Occasions", desc: "Birthdays, anniversaries and celebrations — a dedicated vehicle for the whole party." },
        { icon: "briefcase", title: "Multi-Stop Days", desc: "A dedicated chauffeur who stays with you between stops across the Hamptons and NYC." },
        { icon: "clock", title: "Flexible By-the-Hour Booking", desc: "Reserve the hours you need and keep the same chauffeur and vehicle throughout the day." },
      ],
    },
    routes: {
      kind: "uses",
      eyebrow: "Popular Uses",
      heading: "Popular Ways to Use an Hourly Chauffeur",
      intro: "A few of the ways clients book an hourly chauffeur across the Hamptons. Tap one to start a quote.",
      items: ["Wine Tour", "Dinner & Night Out", "Shopping Day", "Special Occasion", "Multi-Stop Day", "Sightseeing Tour"],
    },
    eventCta: { email: true, eyebrow: "By the Hour &middot; 24/7", headingHtml: `Planning a full day<br class="event-cta__br"> <span class="gold">across the Hamptons?</span>`, lede: "Keep a dedicated chauffeur and vehicle for the hours you need — wine tours, dining, events and multi-stop days, 24/7." },
    commitmentHeading: "Committed to Your Day",
    commitmentIntro: "Professional service, comfort, and reliability for every hour you reserve.",
    glanceHeading: "Hourly Chauffeur at a Glance",
    glance: [
      { label: "Capacity", desc: "Executive Sedan and Luxury SUV for small groups, up to a 56-passenger motor coach for larger parties." },
      { label: "Book ahead", desc: "Reserve the hours you need; hourly charters typically start at a short minimum." },
      { label: "Service area", desc: "Full-day travel across the Hamptons and the East End, plus the New York City corridor." },
      { label: "Weddings & events", desc: "A dedicated vehicle for the day of a celebration, with your chauffeur waiting between stops." },
      { label: "Group vehicles", desc: "Sprinter Vans, Mini Buses and Motor Coaches for larger parties by the hour." },
      { label: "Airport transfers", desc: "Add an airport run to your day — flight-tracked pickups at every airport we serve." },
    ],
    glanceNote: `Aura Hamptons keeps a dedicated chauffeur and vehicle with you for the hours you reserve — ideal for vineyard tours, dining, shopping, special occasions and multi-stop days. Your chauffeur waits between stops and handles the driving, parking and timing, available ${SITE.hours}.`,
    planning: {
      eyebrow: "How It Works",
      heading: "Planning Your Hourly Charter",
      body: "Tell us your plans and how long you'll need, and we'll confirm the right vehicle and a dedicated chauffeur for the day. Within your reserved time you can make as many stops as you like — your car waits between them.",
      points: [
        "Reserve the hours you need (a short minimum applies)",
        "Make unlimited stops within your reserved time",
        "Your chauffeur waits between stops and handles the driving",
        "Choose the Executive Sedan, Luxury SUV or a larger vehicle",
      ],
    },
    preFooterCta: { eyebrow: "Reserve By the Hour", heading: "Ready to Make a Day of It?", sub: "Tell us your plans and how long you'll need — a dedicated chauffeur and vehicle for your whole day, 24/7." },
    faqs: [
      { q: "Is there a minimum number of hours?", a: "Hourly charters typically start at a short minimum. Tell us your plans when you request a quote and we'll confirm the details." },
      { q: "Can we make multiple stops?", a: "Yes. Within your reserved time you can make as many stops as you like — your chauffeur waits between them." },
      { q: "Which vehicle should I choose for an hourly charter?", a: `Pick based on your party size: the Executive Sedan for ${paxLabel(CAPACITY.sedan)}, the Luxury SUV for ${paxLabel(CAPACITY.suv)}, or a Sprinter Van for larger groups.` },
      { q: "What can I use an hourly chauffeur for?", a: "Wine tours, dining and nights out, shopping, sightseeing, special occasions, and multi-stop business days — anywhere across the Hamptons and the East End." },
      { q: "Is hourly service available 24/7?", a: `Yes. Aura Hamptons operates ${SITE.hours}, so you can reserve a chauffeur by the hour any day, including holidays.` },
    ],
  },
  {
    slug: "wedding-transportation",
    comparison: CMP_WEDDING,
    url: "/services/wedding-transportation/",
    icon: "calendar",
    title: "Wedding Transportation",
    titleFull: "Hamptons Wedding Transportation & Limo Service | Aura Hamptons",
    h1: "Wedding Transportation in the Hamptons",
    eyebrow: "Weddings",
    lede: "Elegant, on-time chauffeured transportation for your Hamptons wedding — the couple, the bridal party, and every guest, moved seamlessly from ceremony to reception.",
    description:
      "Hamptons wedding transportation — chauffeured cars and group vehicles for the couple, bridal party, and guests across Southampton, East Hampton, Montauk, and the East End. Available 24/7.",
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "calendar", label: "Planned around your timeline" },
      { icon: "users", label: "Bridal party & guest shuttles" },
      { icon: "userCheck", label: "Professional chauffeurs" },
      { icon: "clock", label: "On-time at every stop" },
    ],
    fleetOrder: ["sedan", "suv", "sprinterjet", "sprinter", "minibus", "coach"],
    fleetIntro: `From an Executive Sedan for the couple to a ${CAPACITY.coach.paxMax}-passenger Motor Coach for guests, every Aura Hamptons vehicle keeps your wedding party moving together and on schedule.`,
    offer: {
      heading: "Wedding Transportation, Handled End to End",
      intro: "From the bridal party's arrival to the last guest shuttle, we coordinate every vehicle and every timing so your day runs seamlessly.",
      cards: [
        { icon: "car", title: "Bridal Party Transport", desc: "Arrive together and on time — the couple and wedding party chauffeured to the ceremony in an Executive Sedan or Luxury SUV." },
        { icon: "route", title: "Ceremony to Reception", desc: "Coordinated transfers between ceremony, photos, and reception, timed to your wedding-day schedule." },
        { icon: "users", title: "Guest Shuttles", desc: "Sprinter Vans, Mini Buses, and Motor Coaches to shuttle guests between hotels and the venue, in continuous loops if needed." },
        { icon: "pin", title: "Hotel & Venue Transfers", desc: "Door-to-door transfers between guest hotels, rentals, and your Hamptons venue across the East End." },
        { icon: "plane", title: "Out-of-Town Guest Pickups", desc: "Flight-tracked airport transfers for arriving family and guests from JFK, LGA, EWR, ISP, FOK, and HTO.", href: "/services/airport-transfers/" },
        { icon: "calendar", title: "Rehearsal & Welcome Events", desc: "Chauffeured transportation for the rehearsal dinner, welcome party, and farewell brunch across your wedding weekend." },
      ],
    },
    eventCta: { email: true, eyebrow: "Weddings &middot; 24/7", headingHtml: `Planning a<br class="event-cta__br"> <span class="gold">Hamptons wedding?</span>`, lede: "From the bridal party to guest shuttles across your wedding weekend, we coordinate every vehicle and every timing — tell us your day and we'll build the plan." },
    areasSection: { heading: "Wedding Transportation Across the Hamptons", intro: "Chauffeured wedding transportation to every village and venue on the East End of Long Island — tap your area to start a quote." },
    routes: {
      kind: "uses",
      heading: "Popular Wedding Services",
      intro: "The wedding-day transfers couples ask for most. Tap one to start your quote.",
      items: ["Bridal party transport", "Ceremony to reception", "Guest hotel shuttle", "Airport guest pickups", "Rehearsal dinner", "Farewell brunch"],
    },
    commitmentHeading: "Committed to Your Big Day",
    commitmentIntro: "Professional service, comfort, and reliability at every stop on your wedding day.",
    glanceHeading: "Wedding Transportation at a Glance",
    glance: [
      { label: "Capacity", desc: `From an Executive Sedan for the couple up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach for guests.` },
      { label: "Guest shuttles", desc: "Continuous hotel-to-venue loops in Sprinter Vans, Mini Buses, and Motor Coaches." },
      { label: "Book ahead", desc: "Reserve early for peak wedding season; share your timeline and we'll coordinate every vehicle." },
      { label: "Service area", desc: "Southampton, East Hampton, Montauk, Sag Harbor, Bridgehampton, and every East End village." },
      { label: "Airport transfers", desc: "Flight-tracked pickups for out-of-town guests at JFK, LGA, EWR, ISP, FOK, and HTO." },
      { label: "The whole weekend", desc: "Rehearsal dinner, welcome party, ceremony, reception, and farewell brunch covered." },
    ],
    glanceNote: `Aura Hamptons provides chauffeured wedding transportation across the Hamptons and the East End of Long Island — the couple, the bridal party, and guest shuttles between hotels and venues. From the rehearsal dinner to the farewell brunch, every vehicle and every timing is coordinated, available ${SITE.hours}.`,
    planning: {
      eyebrow: "Wedding Planning & Booking",
      heading: "Planning Your Wedding Transportation",
      body: "Share your wedding-day timeline — ceremony and reception venues, guest hotels, and how many people you're moving — and we'll build the right plan: the right vehicles, the right timing, and coordinated shuttles so no one is ever waiting.",
      points: [
        "Tell us your venues, timeline, and guest count",
        "Bridal party and couple in Executive Sedan or Luxury SUV",
        "Guest shuttles in Sprinter Vans, Mini Buses, or Motor Coaches",
        "One coordinated plan across your whole wedding weekend",
      ],
    },
    preFooterCta: { eyebrow: "Reserve Wedding Transportation", heading: "Ready to Plan Your Wedding Transportation?", sub: "Tell us your wedding-day timeline and we'll coordinate every vehicle and every timing — the couple, the bridal party, and guest shuttles across the Hamptons, 24/7." },
    faqs: [
      { q: "What wedding vehicles do you offer?", a: `Our fleet runs from the Executive Sedan and Luxury SUV for the couple and wedding party up to the ${CAPACITY.coach.paxMax}-passenger Motor Coach, with Sprinter Vans and Mini Buses for guest shuttles. We match the vehicles to your party size and timeline.` },
      { q: "Can you shuttle our guests between the hotel and venue?", a: "Yes. We run continuous guest shuttles between hotels, rentals, and your venue in Sprinter Vans, Mini Buses, or Motor Coaches, in looping trips if needed so no one is left waiting." },
      { q: "Do you coordinate transportation for the whole wedding weekend?", a: "Yes. From the rehearsal dinner and welcome party to the ceremony, reception, and farewell brunch, we coordinate every vehicle and every timing across your wedding weekend." },
      { q: "Can you pick up out-of-town guests from the airport?", a: "Yes. We provide flight-tracked airport transfers for arriving family and guests from JFK, LGA, EWR, ISP, FOK, and HTO, timed to their actual arrival." },
      { q: "How far in advance should we book wedding transportation?", a: `We recommend reserving as early as possible, especially in peak season. Aura Hamptons operates ${SITE.hours}, and the sooner we have your timeline the more precisely we can coordinate every vehicle.` },
    ],
  },
  {
    slug: "prom-transportation",
    comparison: CMP_PROM,
    url: "/services/prom-transportation/",
    icon: "users",
    title: "Prom Transportation",
    titleFull: "Hamptons Prom Limo & Transportation | Aura Hamptons",
    h1: "Prom Transportation in the Hamptons",
    eyebrow: "Prom Night",
    lede: "Safe, stylish, on-time prom-night transportation across the Hamptons — the whole group together in a Luxury SUV, Sprinter Van, or Mini Bus with a professional chauffeur.",
    description:
      "Hamptons prom transportation — safe, chauffeured group rides for prom night in a Luxury SUV, Sprinter Van, or Mini Bus. Multi-stop, parent-friendly, available 24/7.",
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "users", label: "The whole group together" },
      { icon: "userCheck", label: "Vetted professional chauffeurs" },
      { icon: "clock", label: "On-time, every stop" },
      { icon: "shield", label: "A safe, parent-approved night" },
    ],
    fleetOrder: ["suv", "sprinter", "minibus", "coach", "sedan", "sprinterjet"],
    offer: {
      heading: "Prom Night, Handled Start to Finish",
      intro: "A safe, polished prom experience — the whole group in one vehicle, a professional chauffeur, and every stop planned around your night.",
      cards: [
        { icon: "users", title: "Group in One Vehicle", desc: "Keep the whole group together in a Luxury SUV, Sprinter Van, or Mini Bus — no one left behind." },
        { icon: "route", title: "Multi-Stop Prom Night", desc: "Home to photos to the venue to the after-party — your chauffeur handles every stop on schedule." },
        { icon: "shield", title: "Safe & Professional", desc: "Vetted, professional chauffeurs and immaculate vehicles — peace of mind for students and parents alike." },
        { icon: "sign", title: "Door-to-Door Pickups", desc: "Coordinated pickups from each home and a direct drop at the venue, with the return handled too." },
        { icon: "calendar", title: "Planned Around Your Night", desc: "Share your schedule and we'll build the timing — arrival, departure, and everything between." },
        { icon: "car", title: "Sized to Your Party", desc: `From a Luxury SUV for a small group up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach for the whole class.` },
      ],
    },
    routes: {
      kind: "uses",
      heading: "Popular Prom Services",
      intro: "The prom-night trips students and parents ask for most. Tap one to start your quote.",
      items: ["Home to venue", "Photos to the venue", "Group pickup", "Venue to after-party", "Multi-stop prom night", "Safe ride home"],
    },
    eventCta: { email: true, eyebrow: "Prom Night &middot; 24/7", headingHtml: `Planning<br class="event-cta__br"> <span class="gold">prom night?</span>`, lede: "Keep the whole group together with a safe, professional chauffeur and a vehicle sized to your party — every stop planned around your night." },
    areasSection: { heading: "Prom Transportation Across the Hamptons", intro: "Safe, chauffeured prom-night transportation to every village and venue on the East End — tap your area to start a quote." },
    commitmentHeading: "Committed to a Safe, Memorable Night",
    commitmentIntro: "Professional service, comfort, and reliability from the first pickup to the ride home.",
    glanceHeading: "Prom Transportation at a Glance",
    glance: [
      { label: "Capacity", desc: `From a Luxury SUV for a small group up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach for the whole class.` },
      { label: "Multi-stop", desc: "Home, photos, the venue, and the after-party — every stop on one coordinated schedule." },
      { label: "Book ahead", desc: "Prom season fills quickly; reserve early and share your itinerary and pickup addresses." },
      { label: "Service area", desc: "Southampton, East Hampton, Montauk, Sag Harbor, Bridgehampton, and every East End village." },
      { label: "Safety", desc: "Vetted, professional chauffeurs and immaculate, well-maintained vehicles throughout the night." },
      { label: "Group vehicles", desc: "Luxury SUVs, Sprinter Vans, Mini Buses, and Motor Coaches to fit any prom group." },
    ],
    glanceNote: `Aura Hamptons provides safe, chauffeured prom-night transportation across the Hamptons and the East End of Long Island — the whole group together, every stop planned, available ${SITE.hours}.`,
    planning: {
      eyebrow: "Prom Planning & Booking",
      heading: "Planning Your Prom Transportation",
      body: "Tell us your prom date, the venue, pickup addresses, and how many students are riding, and we'll build the plan — the right vehicle, coordinated pickups, and timing for photos, the dance, and the ride home.",
      points: [
        "Share your date, venue, and pickup addresses",
        "The whole group together in one vehicle",
        "Coordinated multi-stop timing for the full night",
        "Vetted, professional chauffeurs parents can trust",
      ],
    },
    preFooterCta: { eyebrow: "Reserve Prom Night", heading: "Ready to Plan Prom Transportation?", sub: `Keep the group together with a safe, professional chauffeur and a vehicle sized to your party — across the Hamptons, ${SITE.hours}.` },
    faqs: [
      { q: "What vehicles do you offer for prom?", a: `We recommend a Luxury SUV for a small group, or a Sprinter Van, Mini Bus, or ${CAPACITY.coach.paxMax}-passenger Motor Coach for larger groups — matched to your party size. We do not operate stretch limousines.` },
      { q: "Can you make multiple stops on prom night?", a: "Yes. Your chauffeur can handle home pickups, a photo stop, the venue, and the after-party — all on one coordinated schedule." },
      { q: "Is prom transportation safe for students?", a: "Yes. Every trip is handled by a vetted, professional chauffeur in an immaculate, well-maintained vehicle, so students and parents can relax and enjoy the night." },
      { q: "Can parents book and coordinate the pickups?", a: "Absolutely. Parents can book the vehicle, share each pickup address, and set the timing; we coordinate the rest." },
      { q: "Is prom transportation available 24/7?", a: `Yes. Aura Hamptons operates ${SITE.hours}, so late-night returns after the dance or after-party are covered.` },
    ],
  },
  {
    slug: "party-bus",
    comparison: CMP_PARTYBUS,
    url: "/services/party-bus/",
    icon: "users",
    title: "Party Bus",
    titleFull: "Hamptons Party Bus & Group Celebration Transportation | Aura Hamptons",
    h1: "Party Bus & Group Celebration Transportation",
    eyebrow: "Celebrate Together",
    lede: "Celebrate across the Hamptons with the whole group together — birthdays, bachelorette and bachelor parties, and nights out — in a Sprinter Van, Mini Bus, or Motor Coach with a professional chauffeur.",
    description:
      "Hamptons party bus-style group transportation — Sprinter Vans, Mini Buses & Motor Coaches for birthdays, bachelorette parties, and nights out, with a professional chauffeur, 24/7.",
    premium: true,
    heroImage: "/assets/img/fleet/mini-bus",
    heroFeatures: [
      { icon: "users", label: `Groups up to ${CAPACITY.coach.paxMax}` },
      { icon: "userCheck", label: "Professional chauffeurs" },
      { icon: "route", label: "Multi-stop nights out" },
      { icon: "clock", label: "Available 24/7" },
    ],
    fleetOrder: ["sprinter", "minibus", "coach", "suv", "sprinterjet", "sedan"],
    fleetIntro: `Our group vehicles bring the party-bus experience to your Hamptons celebration — from the ${CAPACITY.sprinter.paxMax}-passenger Sprinter Van to the ${CAPACITY.coach.paxMax}-passenger Motor Coach, with a professional chauffeur at the wheel.`,
    offer: {
      heading: "Group Celebrations, One Vehicle",
      intro: "Keep everyone together for the whole celebration — our Sprinter Vans, Mini Buses, and Motor Coaches carry your group in comfort while a professional chauffeur handles the driving.",
      cards: [
        { icon: "calendar", title: "Birthdays & Milestones", desc: "Celebrate a birthday or milestone with the whole group riding together across the Hamptons." },
        { icon: "users", title: "Bachelorette & Bachelor Parties", desc: "A dedicated chauffeur and vehicle for the full day or night — no one worrying about the drive." },
        { icon: "route", title: "Nights Out & Hopping", desc: "Restaurant, bar, and venue hopping with a chauffeur who waits and moves you between stops." },
        { icon: "tag", title: "Group Events", desc: "Concerts, parties, and group outings — arrive together and leave together, on your schedule." },
        { icon: "pin", title: "Winery Day Trips", desc: "Group transportation for a day of East End tastings, with a chauffeur handling every stop." },
        { icon: "car", title: "The Right Group Vehicle", desc: `From a Sprinter Van up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach, sized to your celebration.` },
      ],
    },
    routes: {
      kind: "uses",
      heading: "Popular Celebrations",
      intro: "The group celebrations we move most across the Hamptons. Tap one to start your quote.",
      items: ["Birthday celebrations", "Bachelorette parties", "Bachelor parties", "Nights out & hopping", "Group events", "Winery day trips"],
    },
    eventCta: { email: true, eyebrow: "Group Celebrations &middot; 24/7", headingHtml: `Planning a<br class="event-cta__br"> <span class="gold">group celebration?</span>`, lede: "Birthdays, bachelorette and bachelor parties, and nights out — keep everyone together in one group vehicle with a professional chauffeur." },
    areasSection: { heading: "Group Celebrations Across the Hamptons", intro: "Group celebration transportation to every village, restaurant, and venue on the East End — tap your area to start a quote." },
    commitmentHeading: "Committed to Your Celebration",
    commitmentIntro: "Professional service, comfort, and reliability for every group celebration.",
    glanceHeading: "Group Celebration Transportation at a Glance",
    glance: [
      { label: "Capacity", desc: `Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach — sized to your group.` },
      { label: "Occasions", desc: "Birthdays, bachelorette and bachelor parties, nights out, concerts, and group events." },
      { label: "Multi-stop", desc: "Restaurant, bar, and venue hopping with a chauffeur who waits and moves you between stops." },
      { label: "Service area", desc: "Southampton, East Hampton, Montauk, Sag Harbor, Bridgehampton, and every East End village." },
      { label: "Book ahead", desc: "Weekends and summer fill quickly; reserve early and share your itinerary." },
      { label: "Professional chauffeurs", desc: "A vetted chauffeur handles the driving so your whole group can celebrate." },
    ],
    glanceNote: `Aura Hamptons provides party bus-style group celebration transportation across the Hamptons and the East End of Long Island, in Sprinter Vans, Mini Buses, and Motor Coaches with a professional chauffeur, available ${SITE.hours}. (Aura Hamptons does not operate a stretch limousine or novelty party bus.)`,
    planning: {
      eyebrow: "Celebration Planning & Booking",
      heading: "Planning Your Group Celebration",
      body: "Tell us the occasion, your group size, the date, and the stops you have in mind, and we'll build the plan — the right group vehicle, coordinated timing, and a professional chauffeur for the whole celebration.",
      points: [
        "Share your occasion, group size, and stops",
        "Everyone together in one group vehicle",
        "Coordinated multi-stop timing for the night",
        "A professional chauffeur handles the driving",
      ],
    },
    preFooterCta: { eyebrow: "Reserve a Group Celebration", heading: "Ready to Plan Your Celebration?", sub: `Keep your whole group together in a Sprinter Van, Mini Bus, or Motor Coach with a professional chauffeur, across the Hamptons, ${SITE.hours}.` },
    faqs: [
      { q: "Do you have a party bus?", a: `We bring the party-bus experience using our group fleet — Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach with a professional chauffeur. We do not operate a novelty party bus or a stretch limousine.` },
      { q: "What occasions do you cover?", a: "Birthdays and milestones, bachelorette and bachelor parties, nights out, concerts, winery day trips, and group events across the Hamptons." },
      { q: "Can we make multiple stops?", a: "Yes. Your chauffeur can move the group between restaurants, bars, and venues on one coordinated schedule and wait between stops." },
      { q: "How many people can you carry?", a: `From a ${CAPACITY.sprinter.paxMax}-passenger Sprinter Van up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach — we match the vehicle to your group size.` },
      { q: "Is group celebration transportation available 24/7?", a: `Yes. Aura Hamptons operates ${SITE.hours}, so late nights and early mornings are covered.` },
    ],
  },
  {
    slug: "east-quogue-car-service",
    comparison: CMP_EASTQUOGUE,
    url: "/services/east-quogue-car-service/",
    icon: "pin",
    title: "East Quogue Car Service",
    titleFull: "Car Service in East Quogue, NY | Aura Hamptons",
    h1: "Car Service in East Quogue, NY",
    eyebrow: "East Quogue",
    lede: "Professional chauffeured car service in East Quogue and the surrounding Hamptons — airport transfers, local rides, and New York City trips, door to door, 24/7.",
    description:
      "Car service in East Quogue, NY — chauffeured airport transfers, local Hamptons rides, and New York City trips, door to door. Professional chauffeurs, available 24/7.",
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "plane", label: "Flight-tracked airport transfers" },
      { icon: "pin", label: "Local & door-to-door" },
      { icon: "clock", label: "Available 24/7" },
      { icon: "userCheck", label: "Professional chauffeurs" },
    ],
    fleetOrder: ["sedan", "suv", "sprinterjet", "sprinter", "minibus", "coach"],
    offer: {
      heading: "Car Service for East Quogue & the Western Hamptons",
      intro: "Chauffeured transportation to, from, and around East Quogue — airport transfers, local rides, and trips into New York City, all in one premium fleet.",
      cards: [
        { icon: "plane", title: "Airport Transfers", desc: "Flight-tracked car service between East Quogue and JFK, LGA, EWR, ISP, FOK, and HTO.", pickup: "East Quogue, NY" },
        { icon: "pin", title: "Local Hamptons Rides", desc: "Door-to-door trips around East Quogue, Hampton Bays, Westhampton, and the western Hamptons." },
        { icon: "route", title: "New York City Trips", desc: "Direct transfers between East Quogue and Manhattan or the five boroughs.", pickup: "East Quogue, NY" },
        { icon: "clock", title: "Hourly Chauffeur", desc: "A dedicated chauffeur by the hour for dining, events, and multi-stop days.", href: "/services/hourly-chauffeur/" },
        { icon: "users", title: "Group Transport", desc: "Sprinter Vans, Mini Buses, and Motor Coaches for families, weddings, and events." },
        { icon: "calendar", title: "Special Occasions", desc: "Weddings, celebrations, and nights out across the East End." },
      ],
    },
    airportsSection: { heading: "East Quogue Airport Transfers", intro: "Flight-tracked car service between East Quogue and every airport we serve. Tap any airport to book." },
    routes: {
      heading: "Popular East Quogue Routes",
      intro: "Our most-requested East Quogue trips. Tap one to prefill your quote.",
      items: ["JFK ⇄ East Quogue", "LGA ⇄ East Quogue", "NYC ⇄ East Quogue", "Manhattan ⇄ East Quogue", "East Quogue ⇄ Southampton", "East Quogue ⇄ Montauk"],
    },
    eventCta: { email: true, eyebrow: "East Quogue &middot; 24/7", headingHtml: `Need car service<br class="event-cta__br"> in <span class="gold">East Quogue?</span>`, lede: "Flight-tracked airport transfers, local Hamptons rides, and New York City trips — door to door from East Quogue, 24/7." },
    areasSection: { heading: "Serving East Quogue & the Western Hamptons", intro: "Door-to-door car service across East Quogue, Hampton Bays, Westhampton, Quogue, and the surrounding East End — tap your area to start a quote." },
    commitmentHeading: "Committed to Every East Quogue Trip",
    commitmentIntro: "Professional service, comfort, and reliability on every ride to, from, and around East Quogue.",
    glanceHeading: "East Quogue Car Service at a Glance",
    glance: [
      { label: "Airport transfers", desc: "Flight-tracked service between East Quogue and JFK, LGA, EWR, ISP, FOK, and HTO." },
      { label: "Capacity", desc: `From an Executive Sedan up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach, sized to your party and luggage.` },
      { label: "Local & NYC", desc: "Door-to-door local Hamptons rides plus direct trips into Manhattan and the boroughs." },
      { label: "Service area", desc: "East Quogue, Hampton Bays, Westhampton, Quogue, Southampton, and the western Hamptons." },
      { label: "Book ahead", desc: "Share your pickup, destination, and timing; your airport pickup adjusts to your flight." },
      { label: "Available", desc: `Local and long-distance chauffeured service, ${SITE.hours}.` },
    ],
    glanceNote: `Aura Hamptons provides professional chauffeured car service in East Quogue and across the western Hamptons — flight-tracked airport transfers, local door-to-door rides, and New York City trips, available ${SITE.hours}.`,
    planning: {
      eyebrow: "Planning & Booking",
      heading: "Planning Your East Quogue Car Service",
      body: "Tell us your pickup and destination — an airport, a local address, or New York City — and we'll match the right vehicle and time your pickup around your schedule or flight.",
      points: [
        "Share your pickup, destination, and timing",
        "Flight-tracked airport pickups, door to door",
        "Local Hamptons rides and NYC trips",
        "The right vehicle for your party and luggage",
      ],
    },
    preFooterCta: { eyebrow: "Reserve East Quogue Car Service", heading: "Ready to Book Car Service in East Quogue?", sub: `Flight-tracked airport transfers, local rides, and New York City trips — door to door from East Quogue, ${SITE.hours}.` },
    faqs: [
      { q: "Do you provide airport transfers from East Quogue?", a: "Yes. We provide flight-tracked car service between East Quogue and JFK, LGA, EWR, ISP, FOK, and HTO, timed to your actual arrival." },
      { q: "Can you take me from East Quogue into New York City?", a: "Yes. We run direct, door-to-door transfers between East Quogue and Manhattan or the five boroughs." },
      { q: "What areas around East Quogue do you cover?", a: "East Quogue, Hampton Bays, Westhampton, Quogue, Southampton, and the surrounding western Hamptons, plus the rest of the East End." },
      { q: "Which vehicles are available?", a: `Everything from an Executive Sedan or Luxury SUV to a Sprinter Van, Mini Bus, or ${CAPACITY.coach.paxMax}-passenger Motor Coach, matched to your party and luggage.` },
      { q: "Is East Quogue car service available 24/7?", a: `Yes. Aura Hamptons operates ${SITE.hours}, including holidays, for local and long-distance trips.` },
    ],
  },
  {
    slug: "hamptons-wine-tours",
    comparison: CMP_WINE_HAMPTONS,
    url: "/services/hamptons-wine-tours/",
    icon: "pin",
    title: "Hamptons Wine Tours",
    titleFull: "Hamptons Wine Tours & Vineyard Transportation | Aura Hamptons",
    h1: "Hamptons Wine Tours & Vineyard Transportation",
    eyebrow: "Wine Country",
    lede: "Chauffeured wine-tour transportation across the East End — visit the South Fork's vineyards and tasting rooms with a professional chauffeur, so no one in your group has to drive.",
    description: "Hamptons wine tour transportation — chauffeured vineyard-hopping across the East End in a Luxury SUV, Sprinter Van, or Mini Bus. Group-friendly, custom itineraries, 24/7.",
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "users", label: "Group-friendly vehicles" },
      { icon: "userCheck", label: "A designated professional chauffeur" },
      { icon: "route", label: "Custom multi-winery itineraries" },
      { icon: "clock", label: "By the hour or full day" },
    ],
    fleetOrder: ["suv", "sprinter", "minibus", "coach", "sedan", "sprinterjet"],
    offer: {
      heading: "Wine Tours, Handled Door to Door",
      intro: "Plan your own route or let us build one — your chauffeur drives, waits, and moves the group between tasting rooms while you enjoy the day.",
      cards: [
        { icon: "pin", title: "Vineyard Hopping", desc: "Visit several East End vineyards and tasting rooms in a day, with a chauffeur who handles every stop." },
        { icon: "users", title: "Group Wine Tours", desc: "Keep the whole group together in a Luxury SUV, Sprinter Van, or Mini Bus." },
        { icon: "userCheck", title: "Designated Chauffeur", desc: "No one has to drive — relax and enjoy the tastings while we handle the road." },
        { icon: "route", title: "Custom Itinerary", desc: "Tell us the wineries you want to visit and we'll build the timing and route." },
        { icon: "calendar", title: "Lunch & Sunset Tours", desc: "Add a lunch stop or finish with a sunset tasting — your day, your pace." },
        { icon: "clock", title: "By the Hour or Full Day", desc: "Book an afternoon or a full day; your chauffeur stays with you throughout." },
      ],
    },
    routes: { kind: "uses", heading: "Popular Wine Tour Services", intro: "The wine-country days our clients ask for most. Tap one to start your quote.", items: ["Vineyard hopping", "Group wine tour", "Custom itinerary", "Lunch & wine", "Sunset tasting tour", "Bachelorette wine day"] },
    eventCta: { email: true, eyebrow: "Wine Country &middot; 24/7", headingHtml: `Planning a<br class="event-cta__br"> <span class="gold">wine tour?</span>`, lede: "Chauffeured vineyard-hopping across the East End — your group together, a designated chauffeur, and a day built around the wineries you want to visit." },
    areasSection: { heading: "Wine Tours Across the East End", intro: "Chauffeured wine-country transportation across the Hamptons and the East End — tap your area to start a quote." },
    commitmentHeading: "Committed to a Relaxed Day",
    commitmentIntro: "Professional service, comfort, and reliability from the first tasting to the ride home.",
    glanceHeading: "Hamptons Wine Tours at a Glance",
    glance: [
      { label: "Vehicles", desc: `Luxury SUVs, Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach for larger groups.` },
      { label: "Designated chauffeur", desc: "A professional chauffeur drives and waits, so no one in your group has to." },
      { label: "Custom routes", desc: "Pick your wineries and we'll build the itinerary and timing." },
      { label: "Service area", desc: "The Hamptons and the East End, with North Fork wine country also available." },
      { label: "By the hour", desc: "Book an afternoon or a full day; your chauffeur stays with you throughout." },
      { label: "Occasions", desc: "Birthdays, bachelorette parties, and group celebrations in wine country." },
    ],
    glanceNote: `Aura Hamptons provides chauffeured wine-tour transportation across the East End — vineyard-hopping with a designated professional chauffeur, custom itineraries, and group vehicles, available ${SITE.hours}.`,
    planning: { eyebrow: "Wine Tour Planning & Booking", heading: "Planning Your Wine Tour", body: "Tell us your group size, the date, and the wineries you'd like to visit, and we'll build the route and timing — pickups, tasting stops, lunch, and the ride home.", points: ["Share your group size, date, and wineries", "Everyone together in one vehicle", "A designated chauffeur for the whole day", "Custom timing for tastings, lunch, and sunset"] },
    preFooterCta: { eyebrow: "Reserve a Wine Tour", heading: "Ready to Plan Your Wine Tour?", sub: `Chauffeured vineyard-hopping across the East End with a designated chauffeur and a vehicle sized to your group, ${SITE.hours}.` },
    faqs: [
      { q: "Do you plan the winery itinerary?", a: "We can. Tell us the wineries you'd like to visit and we'll build the route and timing, or we can suggest a route across the East End's vineyards." },
      { q: "What vehicles are best for a wine tour?", a: `A Luxury SUV for a small group, or a Sprinter Van, Mini Bus, or ${CAPACITY.coach.paxMax}-passenger Motor Coach for larger parties — everyone stays together.` },
      { q: "Does the chauffeur stay with us all day?", a: "Yes. Your chauffeur stays with your group, waits at each stop, and moves you between wineries on your schedule." },
      { q: "Can you do North Fork wineries too?", a: "Yes. We also offer North Fork wine tours across Long Island's main wine region." },
      { q: "Is wine-tour transportation available year-round?", a: `Yes. Aura Hamptons operates ${SITE.hours}, so wine tours can be booked any season.` },
    ],
  },
  {
    slug: "north-fork-wine-tours",
    comparison: CMP_WINE_NORTHFORK,
    url: "/services/north-fork-wine-tours/",
    icon: "pin",
    title: "North Fork Wine Tours",
    titleFull: "North Fork Wine Tours & Vineyard Transportation | Aura Hamptons",
    h1: "North Fork Wine Tours & Vineyard Transportation",
    eyebrow: "North Fork Wine Country",
    lede: "Chauffeured wine-tour transportation across the North Fork — Long Island's main wine region — with a professional chauffeur, so your whole group can relax and taste.",
    description: "North Fork wine tour transportation — chauffeured vineyard-hopping across Long Island's wine country in a Luxury SUV, Sprinter Van, or Mini Bus. Custom itineraries, 24/7.",
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "users", label: "Group-friendly vehicles" },
      { icon: "userCheck", label: "A designated professional chauffeur" },
      { icon: "route", label: "Custom multi-winery itineraries" },
      { icon: "clock", label: "By the hour or full day" },
    ],
    fleetOrder: ["suv", "sprinter", "minibus", "coach", "sedan", "sprinterjet"],
    offer: {
      heading: "North Fork Wine Country, Door to Door",
      intro: "The North Fork is Long Island's main wine region — we handle the driving between tasting rooms so your whole group can enjoy the day.",
      cards: [
        { icon: "pin", title: "Vineyard Hopping", desc: "Visit several North Fork wineries and tasting rooms in a day, with a chauffeur handling every stop." },
        { icon: "users", title: "Group Wine Tours", desc: "Keep the whole group together in a Luxury SUV, Sprinter Van, or Mini Bus." },
        { icon: "userCheck", title: "Designated Chauffeur", desc: "No one has to drive — relax and enjoy North Fork wine country." },
        { icon: "route", title: "Custom Itinerary", desc: "Pick your wineries around Cutchogue, Peconic, and Aquebogue and we'll build the route." },
        { icon: "calendar", title: "Lunch & Sunset Tours", desc: "Add a farm-to-table lunch or a sunset tasting to your North Fork day." },
        { icon: "clock", title: "By the Hour or Full Day", desc: "Book an afternoon or a full day; your chauffeur stays with you throughout." },
      ],
    },
    routes: { kind: "uses", heading: "Popular North Fork Wine Tours", intro: "The North Fork wine days our clients ask for most. Tap one to start your quote.", items: ["Vineyard hopping", "Group wine tour", "Custom itinerary", "Lunch & wine", "Sunset tasting tour", "Bachelorette wine day"] },
    eventCta: { email: true, eyebrow: "North Fork Wine Country &middot; 24/7", headingHtml: `Planning a<br class="event-cta__br"> <span class="gold">North Fork wine tour?</span>`, lede: "Chauffeured vineyard-hopping across Long Island's wine country — your group together, a designated chauffeur, and a day built around the wineries you choose." },
    areasSection: { heading: "Wine Tours Across the North Fork & East End", intro: "Chauffeured wine-country transportation across the North Fork and the East End — tap your area to start a quote." },
    commitmentHeading: "Committed to a Relaxed Day",
    commitmentIntro: "Professional service, comfort, and reliability from the first tasting to the ride home.",
    glanceHeading: "North Fork Wine Tours at a Glance",
    glance: [
      { label: "Vehicles", desc: `Luxury SUVs, Sprinter Vans, Mini Buses, and a ${CAPACITY.coach.paxMax}-passenger Motor Coach for larger groups.` },
      { label: "Designated chauffeur", desc: "A professional chauffeur drives and waits, so no one in your group has to." },
      { label: "Wine region", desc: "The North Fork — Long Island's main wine country around Cutchogue, Peconic, and Aquebogue." },
      { label: "Custom routes", desc: "Pick your wineries and we'll build the itinerary and timing." },
      { label: "By the hour", desc: "Book an afternoon or a full day; your chauffeur stays with you throughout." },
      { label: "Occasions", desc: "Birthdays, bachelorette parties, and group celebrations in wine country." },
    ],
    glanceNote: `Aura Hamptons provides chauffeured wine-tour transportation across the North Fork — Long Island's main wine region — with a designated professional chauffeur and group vehicles, available ${SITE.hours}.`,
    planning: { eyebrow: "Wine Tour Planning & Booking", heading: "Planning Your North Fork Wine Tour", body: "Tell us your group size, the date, and the wineries you'd like to visit, and we'll build the route and timing across the North Fork.", points: ["Share your group size, date, and wineries", "Everyone together in one vehicle", "A designated chauffeur for the whole day", "Custom timing for tastings, lunch, and sunset"] },
    preFooterCta: { eyebrow: "Reserve a Wine Tour", heading: "Ready to Plan Your North Fork Wine Tour?", sub: `Chauffeured vineyard-hopping across Long Island's wine country with a designated chauffeur and a vehicle sized to your group, ${SITE.hours}.` },
    faqs: [
      { q: "Which wine region is this?", a: "The North Fork of Long Island — the area's main wine region, with dozens of vineyards and tasting rooms around Cutchogue, Peconic, Mattituck, and Aquebogue." },
      { q: "Do you plan the winery itinerary?", a: "We can. Tell us the wineries you'd like to visit and we'll build the route and timing, or suggest a North Fork route." },
      { q: "What vehicles are best for a wine tour?", a: `A Luxury SUV for a small group, or a Sprinter Van, Mini Bus, or ${CAPACITY.coach.paxMax}-passenger Motor Coach for larger parties.` },
      { q: "Does the chauffeur stay with us all day?", a: "Yes. Your chauffeur stays with your group, waits at each stop, and moves you between wineries on your schedule." },
      { q: "Is North Fork wine-tour transportation available year-round?", a: `Yes. Aura Hamptons operates ${SITE.hours}, so wine tours can be booked any season.` },
    ],
  },
  {
    slug: "sedan-service",
    comparison: CMP_SEDAN,
    url: "/services/sedan-service/",
    icon: "car",
    title: "Sedan Service",
    titleFull: "Executive Sedan Service in the Hamptons | Aura Hamptons",
    h1: "Sedan Car Service in the Hamptons",
    eyebrow: "Executive Sedan",
    lede: `Our Executive Sedan is the first choice for airport transfers, executive travel, and couples — a quiet, comfortable ride for ${paxLabel(CAPACITY.sedan)} with a professional chauffeur.`,
    description: `Executive Sedan service in the Hamptons — a comfortable, discreet ride for ${paxLabel(CAPACITY.sedan)} for airport transfers, executive travel, and couples. Professional chauffeurs, 24/7.`,
    premium: true,
    heroImage: "/assets/img/fleet/executive-sedan",
    heroFeatures: [
      { icon: "userCheck", label: "Discreet professional chauffeurs" },
      { icon: "plane", label: "Flight-tracked airport transfers" },
      { icon: "shield", label: "Quiet, comfortable ride" },
      { icon: "clock", label: "Available 24/7" },
    ],
    fleetOrder: ["sedan", "suv", "sprinter", "sprinterjet", "minibus", "coach"],
    offer: {
      heading: "When to Choose the Executive Sedan",
      intro: `Comfortable for ${paxLabel(CAPACITY.sedan)}, the Executive Sedan is ideal for individual and couple travel across the Hamptons and into New York City.`,
      cards: [
        { icon: "plane", title: "Airport Transfers", desc: "Flight-tracked sedan service to and from JFK, LGA, EWR, ISP, FOK, and HTO." },
        { icon: "userCheck", title: "Executive Travel", desc: "A polished, discreet ride for business travel and client pickups." },
        { icon: "pin", title: "Local & Point-to-Point", desc: "Door-to-door sedan rides across the Hamptons and the East End." },
        { icon: "route", title: "New York City Trips", desc: "Direct sedan transfers between the Hamptons and Manhattan or the boroughs." },
        { icon: "calendar", title: "Dinner & Evenings Out", desc: "A comfortable ride for couples, dinners, and special occasions." },
        { icon: "car", title: "See the Vehicle", desc: "View capacity, luggage, and amenities on the Executive Sedan fleet page.", href: "/fleet/executive-sedan/" },
      ],
    },
    routes: { kind: "uses", heading: "Popular Sedan Services", intro: "The trips our Executive Sedan is booked for most. Tap one to start your quote.", items: ["Airport transfer", "Executive travel", "NYC trip", "Dinner & evening out", "Local point-to-point", "Hourly chauffeur"] },
    eventCta: { email: true, eyebrow: "Executive Sedan &middot; 24/7", headingHtml: `Need an<br class="event-cta__br"> <span class="gold">Executive Sedan?</span>`, lede: `A quiet, comfortable ride for ${paxLabel(CAPACITY.sedan)} with a professional chauffeur — airport transfers, executive travel, and NYC trips, 24/7.` },
    areasSection: { heading: "Executive Sedan Service Across the Hamptons", intro: "Door-to-door Executive Sedan service to every village and hamlet on the East End — tap your area to start a quote." },
    commitmentHeading: "Committed to a Comfortable Ride",
    commitmentIntro: "Professional service, comfort, and reliability on every sedan trip.",
    glanceHeading: "Executive Sedan Service at a Glance",
    glance: [
      { label: "Capacity", desc: `Comfortable for ${paxLabel(CAPACITY.sedan)}, ideal for individual and couple travel.` },
      { label: "Best for", desc: "Airport transfers, executive travel, couples, and NYC trips." },
      { label: "Airport transfers", desc: "Flight-tracked sedan pickups at JFK, LGA, EWR, ISP, FOK, and HTO." },
      { label: "Service area", desc: "The Hamptons and the East End, plus the New York City corridor." },
      { label: "Larger party?", desc: "Step up to a Luxury SUV or a group vehicle for more passengers or luggage." },
      { label: "Available", desc: `Chauffeured sedan service, ${SITE.hours}.` },
    ],
    glanceNote: `The Aura Hamptons Executive Sedan seats ${paxLabel(CAPACITY.sedan)} and is our most-requested vehicle for airport transfers, executive travel, and couples across the Hamptons and into New York City, available ${SITE.hours}.`,
    planning: { eyebrow: "Planning & Booking", heading: "Booking the Executive Sedan", body: "Share your pickup, destination, and timing, and we'll confirm the Executive Sedan and a professional chauffeur — or recommend a larger vehicle if your party or luggage calls for it.", points: ["Share your pickup, destination, and timing", "Flight-tracked airport pickups", "Discreet, professional chauffeurs", "Upgrade to an SUV or group vehicle anytime"] },
    preFooterCta: { eyebrow: "Reserve an Executive Sedan", heading: "Ready to Book the Executive Sedan?", sub: `A quiet, comfortable ride for ${paxLabel(CAPACITY.sedan)} with a professional chauffeur, across the Hamptons and NYC, ${SITE.hours}.` },
    faqs: [
      { q: "How many passengers does the Executive Sedan seat?", a: `The Executive Sedan is comfortable for ${paxLabel(CAPACITY.sedan)} with luggage. For larger parties, we recommend the Luxury SUV or a group vehicle.` },
      { q: "Is the sedan good for airport transfers?", a: "Yes. It's our most popular choice for individual and couple airport transfers, with flight tracking at every airport we serve." },
      { q: "Can I use the sedan for business travel?", a: "Absolutely. The Executive Sedan offers a discreet, polished ride for executive travel and client pickups." },
      { q: "Where can I see the vehicle details?", a: "Full capacity, luggage, and amenities are on the Executive Sedan fleet page." },
      { q: "Is sedan service available 24/7?", a: `Yes. Aura Hamptons operates ${SITE.hours}, including holidays.` },
    ],
  },
  {
    slug: "suv-service",
    comparison: CMP_SUV,
    url: "/services/suv-service/",
    icon: "car",
    title: "SUV Service",
    titleFull: "Luxury SUV Service in the Hamptons | Aura Hamptons",
    h1: "SUV Car Service in the Hamptons",
    eyebrow: "Luxury SUV",
    lede: `Our Luxury SUV offers extra room for passengers and luggage — ideal for ${paxLabel(CAPACITY.suv)}, families, and airport transfers, with a professional chauffeur.`,
    description: `Luxury SUV service in the Hamptons — spacious chauffeured transportation for ${paxLabel(CAPACITY.suv)} and luggage, ideal for airport transfers and family travel. Available 24/7.`,
    premium: true,
    heroImage: "/assets/img/fleet/executive-suv",
    heroFeatures: [
      { icon: "users", label: `Room for ${paxLabel(CAPACITY.suv)}` },
      { icon: "luggage", label: "Extra luggage space" },
      { icon: "plane", label: "Flight-tracked airport transfers" },
      { icon: "clock", label: "Available 24/7" },
    ],
    fleetOrder: ["suv", "sedan", "sprinter", "sprinterjet", "minibus", "coach"],
    offer: {
      heading: "When to Choose the Luxury SUV",
      intro: `With room for ${paxLabel(CAPACITY.suv)} and extra luggage, the Luxury SUV is ideal for families, small groups, and luggage-heavy airport runs.`,
      cards: [
        { icon: "plane", title: "Airport Transfers", desc: "Flight-tracked SUV service to and from JFK, LGA, EWR, ISP, FOK, and HTO, with room for luggage." },
        { icon: "users", title: "Family Travel", desc: "Comfortable space for families and small groups across the Hamptons." },
        { icon: "pin", title: "Local & Point-to-Point", desc: "Door-to-door SUV rides across the Hamptons and the East End." },
        { icon: "route", title: "New York City Trips", desc: "Direct SUV transfers between the Hamptons and Manhattan or the boroughs." },
        { icon: "shield", title: "VIP & Discreet", desc: "A polished, private ride for executives and VIP travel." },
        { icon: "car", title: "See the Vehicle", desc: "View capacity, luggage, and amenities on the Luxury SUV fleet page.", href: "/fleet/luxury-suv/" },
      ],
    },
    routes: { kind: "uses", heading: "Popular SUV Services", intro: "The trips our Luxury SUV is booked for most. Tap one to start your quote.", items: ["Airport transfer", "Family travel", "NYC trip", "VIP & executive", "Local point-to-point", "Luggage-heavy run"] },
    eventCta: { email: true, eyebrow: "Luxury SUV &middot; 24/7", headingHtml: `Need a<br class="event-cta__br"> <span class="gold">Luxury SUV?</span>`, lede: `Room for ${paxLabel(CAPACITY.suv)} and extra luggage with a professional chauffeur — airport transfers, family travel, and NYC trips, 24/7.` },
    areasSection: { heading: "Luxury SUV Service Across the Hamptons", intro: "Door-to-door Luxury SUV service to every village and hamlet on the East End — tap your area to start a quote." },
    commitmentHeading: "Committed to a Spacious, Comfortable Ride",
    commitmentIntro: "Professional service, comfort, and reliability on every SUV trip.",
    glanceHeading: "Luxury SUV Service at a Glance",
    glance: [
      { label: "Capacity", desc: `Room for ${paxLabel(CAPACITY.suv)} plus extra luggage.` },
      { label: "Best for", desc: "Families, small groups, luggage-heavy airport runs, and VIP travel." },
      { label: "Airport transfers", desc: "Flight-tracked SUV pickups at JFK, LGA, EWR, ISP, FOK, and HTO." },
      { label: "Service area", desc: "The Hamptons and the East End, plus the New York City corridor." },
      { label: "Bigger group?", desc: "Step up to a Sprinter Van, Mini Bus, or Motor Coach." },
      { label: "Available", desc: `Chauffeured SUV service, ${SITE.hours}.` },
    ],
    glanceNote: `The Aura Hamptons Luxury SUV seats ${paxLabel(CAPACITY.suv)} with extra luggage room and is ideal for families and luggage-heavy airport transfers across the Hamptons and into New York City, available ${SITE.hours}.`,
    planning: { eyebrow: "Planning & Booking", heading: "Booking the Luxury SUV", body: "Share your pickup, destination, party size, and luggage, and we'll confirm the Luxury SUV and a professional chauffeur — or recommend a group vehicle for larger parties.", points: ["Share your pickup, destination, and party size", "Flight-tracked airport pickups with luggage room", "Comfortable for families and small groups", "Upgrade to a group vehicle anytime"] },
    preFooterCta: { eyebrow: "Reserve a Luxury SUV", heading: "Ready to Book the Luxury SUV?", sub: `Room for ${paxLabel(CAPACITY.suv)} and luggage with a professional chauffeur, across the Hamptons and NYC, ${SITE.hours}.` },
    faqs: [
      { q: "How many passengers does the Luxury SUV seat?", a: `The Luxury SUV comfortably seats ${paxLabel(CAPACITY.suv)} with extra room for luggage. For larger parties, we recommend a Sprinter Van or Mini Bus.` },
      { q: "Is the SUV good for airport transfers with luggage?", a: "Yes. The Luxury SUV is a top choice for luggage-heavy airport runs and family travel." },
      { q: "Can I use the SUV for family travel?", a: "Absolutely. It offers comfortable space for families and small groups across the Hamptons." },
      { q: "Where can I see the vehicle details?", a: "Full capacity, luggage, and amenities are on the Luxury SUV fleet page." },
      { q: "Is SUV service available 24/7?", a: `Yes. Aura Hamptons operates ${SITE.hours}, including holidays.` },
    ],
  },
  {
    slug: "sprinter-van-service",
    comparison: CMP_SPRINTER,
    url: "/services/sprinter-van-service/",
    icon: "van",
    title: "Sprinter Van Service",
    titleFull: "Sprinter Van Service in the Hamptons | Aura Hamptons",
    h1: "Sprinter Van Car Service in the Hamptons",
    eyebrow: "Sprinter Van",
    lede: `Our Sprinter Van keeps groups together in comfort — seating up to ${CAPACITY.sprinter.paxMax} passengers for airport transfers, events, and group travel across the Hamptons.`,
    description: `Sprinter Van service in the Hamptons — chauffeured group transportation for up to ${CAPACITY.sprinter.paxMax} passengers for airport transfers, events, and group travel. Available 24/7.`,
    premium: true,
    heroImage: "/assets/img/fleet/sprinter-van",
    heroFeatures: [
      { icon: "users", label: `Up to ${CAPACITY.sprinter.paxMax} passengers` },
      { icon: "luggage", label: "Space for group luggage" },
      { icon: "plane", label: "Flight-tracked airport transfers" },
      { icon: "clock", label: "Available 24/7" },
    ],
    fleetOrder: ["sprinter", "minibus", "coach", "suv", "sprinterjet", "sedan"],
    offer: {
      heading: "When to Choose the Sprinter Van",
      intro: `Seating up to ${CAPACITY.sprinter.paxMax} passengers with room for luggage, the Sprinter Van keeps a group together in one comfortable vehicle.`,
      cards: [
        { icon: "plane", title: "Group Airport Transfers", desc: `Flight-tracked service for up to ${CAPACITY.sprinter.paxMax} passengers to and from every airport we serve.` },
        { icon: "users", title: "Group Travel", desc: "Keep families, friends, and colleagues together in one vehicle across the Hamptons." },
        { icon: "calendar", title: "Weddings & Events", desc: "Guest shuttles and event transportation that keep everyone on schedule." },
        { icon: "route", title: "Nights Out & Celebrations", desc: "Group celebrations, winery days, and nights out with a professional chauffeur." },
        { icon: "pin", title: "Local & NYC Trips", desc: "Door-to-door group rides across the Hamptons and into New York City." },
        { icon: "van", title: "See the Vehicle", desc: "View capacity, luggage, and amenities on the Sprinter Van fleet page.", href: "/fleet/sprinter-van/" },
      ],
    },
    routes: { kind: "uses", heading: "Popular Sprinter Van Services", intro: "The trips our Sprinter Van is booked for most. Tap one to start your quote.", items: ["Group airport transfer", "Wedding guest shuttle", "Group travel", "Winery day", "Night out", "NYC group trip"] },
    eventCta: { email: true, eyebrow: "Sprinter Van &middot; 24/7", headingHtml: `Need a<br class="event-cta__br"> <span class="gold">Sprinter Van?</span>`, lede: `Keep your group together — up to ${CAPACITY.sprinter.paxMax} passengers with a professional chauffeur for airport transfers, events, and group travel, 24/7.` },
    areasSection: { heading: "Sprinter Van Service Across the Hamptons", intro: "Door-to-door Sprinter Van service to every village and hamlet on the East End — tap your area to start a quote." },
    commitmentHeading: "Committed to Keeping Your Group Together",
    commitmentIntro: "Professional service, comfort, and reliability on every group trip.",
    glanceHeading: "Sprinter Van Service at a Glance",
    glance: [
      { label: "Capacity", desc: `Up to ${CAPACITY.sprinter.paxMax} passengers with room for group luggage.` },
      { label: "Best for", desc: "Group airport transfers, weddings, events, and group travel." },
      { label: "Airport transfers", desc: "Flight-tracked group pickups at JFK, LGA, EWR, ISP, FOK, and HTO." },
      { label: "Service area", desc: "The Hamptons and the East End, plus the New York City corridor." },
      { label: "Bigger group?", desc: `Step up to a Mini Bus or a ${CAPACITY.coach.paxMax}-passenger Motor Coach.` },
      { label: "Available", desc: `Chauffeured Sprinter Van service, ${SITE.hours}.` },
    ],
    glanceNote: `The Aura Hamptons Sprinter Van seats up to ${CAPACITY.sprinter.paxMax} passengers and keeps groups together for airport transfers, weddings, events, and group travel across the Hamptons, available ${SITE.hours}.`,
    planning: { eyebrow: "Planning & Booking", heading: "Booking the Sprinter Van", body: "Share your group size, pickup, destination, and timing, and we'll confirm the Sprinter Van and a professional chauffeur — or recommend a Mini Bus or Motor Coach for larger groups.", points: ["Share your group size and itinerary", "Flight-tracked group airport pickups", "Keep everyone together in one vehicle", "Upgrade to a Mini Bus or Motor Coach anytime"] },
    preFooterCta: { eyebrow: "Reserve a Sprinter Van", heading: "Ready to Book the Sprinter Van?", sub: `Keep your group together — up to ${CAPACITY.sprinter.paxMax} passengers with a professional chauffeur, across the Hamptons and NYC, ${SITE.hours}.` },
    faqs: [
      { q: "How many passengers does the Sprinter Van seat?", a: `The Sprinter Van seats up to ${CAPACITY.sprinter.paxMax} passengers with room for group luggage. For larger groups, we offer a Mini Bus and a ${CAPACITY.coach.paxMax}-passenger Motor Coach.` },
      { q: "Is the Sprinter Van good for weddings?", a: "Yes. It's a popular choice for wedding guest shuttles and event transportation that keeps everyone on schedule." },
      { q: "Can the Sprinter Van do group airport transfers?", a: "Yes. We provide flight-tracked group airport transfers at every airport we serve." },
      { q: "Where can I see the vehicle details?", a: "Full capacity, luggage, and amenities are on the Sprinter Van fleet page." },
      { q: "Is Sprinter Van service available 24/7?", a: `Yes. Aura Hamptons operates ${SITE.hours}, including holidays.` },
    ],
  },
];

/* ---- Town car-service pages (data-driven, same premium design) -------- */
const FLEET_IMG = "/assets/img/fleet/";
const TOWN_DATA = [
  { slug: "southampton",   name: "Southampton",   region: "hamptons",   nearby: ["Water Mill", "Bridgehampton", "Hampton Bays"], img: `${FLEET_IMG}executive-sedan` },
  { slug: "east-hampton",  name: "East Hampton",  region: "hamptons",   nearby: ["Amagansett", "Wainscott", "Montauk"],          img: `${FLEET_IMG}executive-suv` },
  { slug: "montauk",       name: "Montauk",       region: "hamptons",   nearby: ["Amagansett", "East Hampton"],                  img: `${FLEET_IMG}executive-sedan` },
  { slug: "sag-harbor",    name: "Sag Harbor",    region: "hamptons",   nearby: ["North Haven", "Bridgehampton", "East Hampton"],img: `${FLEET_IMG}executive-suv` },
  { slug: "bridgehampton", name: "Bridgehampton", region: "hamptons",   nearby: ["Water Mill", "Sagaponack", "Sag Harbor"],      img: `${FLEET_IMG}executive-sedan` },
  { slug: "hampton-bays",  name: "Hampton Bays",  region: "hamptons",   nearby: ["Westhampton", "East Quogue", "Southampton"],   img: `${FLEET_IMG}executive-suv` },
  { slug: "westhampton",   name: "Westhampton",   region: "hamptons",   nearby: ["Westhampton Beach", "Quogue", "Hampton Bays"], img: `${FLEET_IMG}executive-sedan` },
  { slug: "water-mill",    name: "Water Mill",    region: "hamptons",   nearby: ["Southampton", "Bridgehampton", "Sag Harbor"],  img: `${FLEET_IMG}executive-suv` },
  { slug: "wainscott",     name: "Wainscott",     region: "hamptons",   nearby: ["East Hampton", "Sagaponack", "Bridgehampton"], img: `${FLEET_IMG}executive-sedan` },
  { slug: "amagansett",    name: "Amagansett",    region: "hamptons",   nearby: ["East Hampton", "Montauk", "Wainscott"],        img: `${FLEET_IMG}executive-suv` },
  { slug: "north-fork",    name: "North Fork",    region: "north-fork", nearby: ["Greenport", "Mattituck", "Southold"],          img: `${FLEET_IMG}executive-sedan` },
  { slug: "greenport",     name: "Greenport",     region: "north-fork", nearby: ["Southold", "East Marion", "Mattituck"],        img: `${FLEET_IMG}executive-suv` },
  { slug: "mattituck",     name: "Mattituck",     region: "north-fork", nearby: ["Cutchogue", "Jamesport", "Southold"],          img: `${FLEET_IMG}executive-sedan` },
];

function townSpoke(t) {
  const name = t.name;
  const isNF = t.region === "north-fork";
  const area = isNF ? "the North Fork" : "the Hamptons";
  const n = t.nearby;
  return {
    slug: `${t.slug}-car-service`,
    url: `/services/${t.slug}-car-service/`,
    icon: "pin",
    title: `${name} Car Service`,
    titleFull: `Car Service in ${name}, NY | Aura Hamptons`,
    h1: `Car Service in ${name}, NY`,
    eyebrow: name,
    lede: `Professional chauffeured car service in ${name} — airport transfers, local rides, and New York City trips, door to door, ${SITE.hours}.`,
    description: `Car service in ${name}, NY — chauffeured airport transfers, local ${isNF ? "North Fork" : "Hamptons"} rides, and New York City trips, door to door. Professional chauffeurs, available ${SITE.hours}.`,
    premium: true,
    heroImage: "/assets/img/hero/hamptons-hero",
    heroFeatures: [
      { icon: "plane", label: "Flight-tracked airport transfers" },
      { icon: "pin", label: "Local & door-to-door" },
      { icon: "clock", label: "Available 24/7" },
      { icon: "userCheck", label: "Professional chauffeurs" },
    ],
    fleetOrder: ["sedan", "suv", "sprinterjet", "sprinter", "minibus", "coach"],
    offer: {
      heading: `Car Service for ${name} & Nearby`,
      intro: `Chauffeured transportation to, from, and around ${name} — airport transfers, local rides, and trips into New York City, all in one premium fleet.`,
      cards: [
        { icon: "plane", title: "Airport Transfers", desc: `Flight-tracked car service between ${name} and JFK, LGA, EWR, ISP, FOK, and HTO.`, pickup: `${name}, NY` },
        { icon: "pin", title: "Local Rides", desc: `Door-to-door trips around ${name}, ${n[0]}, ${n[1]}, and the surrounding ${area}.` },
        { icon: "route", title: "New York City Trips", desc: `Direct transfers between ${name} and Manhattan or the five boroughs.`, pickup: `${name}, NY` },
        { icon: "clock", title: "Hourly Chauffeur", desc: "A dedicated chauffeur by the hour for dining, events, and multi-stop days.", href: "/services/hourly-chauffeur/" },
        { icon: "users", title: "Group Transport", desc: "Sprinter Vans, Mini Buses, and Motor Coaches for families, weddings, and events." },
        { icon: "calendar", title: "Special Occasions", desc: `Weddings, celebrations, and nights out across ${area}.` },
      ],
    },
    comparison: {
      eyebrow: "Two Ways to Get a Ride",
      heading: "Reserved Car Service vs. On-Demand Rideshare",
      intro: `Compare a professional car service reserved in advance for ${name} with relying on on-demand rides across ${area}.`,
      rowLabels: [
        { icon: "calendar", label: "Availability" },
        { icon: "radar", label: "Flight tracking" },
        { icon: "userCheck", label: "Chauffeur" },
        { icon: "tag", label: "Pricing" },
      ],
      cards: [
        { tag: "Recommended", featured: true, icon: "car", title: `Aura Hamptons — Reserved ${name} Car`,
          desc: `A professional chauffeur reserved ahead for ${name} and the surrounding ${area}.`,
          rows: [
            ["Availability", "Reserved in advance, so your ride is confirmed."],
            ["Flight tracking", "Airport transfers are flight-tracked to your arrival."],
            ["Chauffeur", "A professional, vetted chauffeur who knows the area."],
            ["Pricing", "Quoted up front for your route."],
          ] },
        { featured: false, brands: ["uber", "lyft"], title: "On-Demand Rideshare",
          desc: "Rides requested in the moment through an app.",
          rows: [
            ["Availability", `On-demand availability can be limited across ${area}.`],
            ["Flight tracking", "No flight tracking for airport trips."],
            ["Chauffeur", "Whichever driver is nearest."],
            ["Pricing", "Fares vary with demand."],
          ] },
      ],
      cta: { headingHtml: `Reserved, reliable, and local to ${esc(name)}. <span class="gold">Book ahead.</span>`,
        bookLabel: "Book a Car", note: `${name} • Airport transfers • Local rides • NYC trips • 24/7` },
    },
    airportsSection: { heading: `${name} Airport Transfers`, intro: `Flight-tracked car service between ${name} and every airport we serve. Tap any airport to book.` },
    routes: {
      heading: `Popular ${name} Routes`,
      intro: `Our most-requested ${name} trips. Tap one to prefill your quote.`,
      items: [`JFK ⇄ ${name}`, `LGA ⇄ ${name}`, `NYC ⇄ ${name}`, `Manhattan ⇄ ${name}`, `${name} ⇄ ${n[0]}`, `${name} ⇄ ${n[1]}`],
    },
    areasSection: { heading: `Serving ${name} & the Surrounding ${isNF ? "North Fork" : "East End"}`, intro: `Door-to-door car service across ${name}, ${n.join(", ")}, and the surrounding ${area} — tap your area to start a quote.` },
    commitmentHeading: `Committed to Every ${name} Trip`,
    commitmentIntro: `Professional service, comfort, and reliability on every ride to, from, and around ${name}.`,
    glanceHeading: `${name} Car Service at a Glance`,
    glance: [
      { label: "Airport transfers", desc: `Flight-tracked service between ${name} and JFK, LGA, EWR, ISP, FOK, and HTO.` },
      { label: "Capacity", desc: `From an Executive Sedan up to a ${CAPACITY.coach.paxMax}-passenger Motor Coach, sized to your party and luggage.` },
      { label: "Local & NYC", desc: `Door-to-door local rides around ${name} plus direct trips into Manhattan and the boroughs.` },
      { label: "Service area", desc: `${name}, ${n.join(", ")}, and the surrounding ${area}.` },
      { label: "Book ahead", desc: "Share your pickup, destination, and timing; your airport pickup adjusts to your flight." },
      { label: "Available", desc: `Local and long-distance chauffeured service, ${SITE.hours}.` },
    ],
    glanceNote: `Aura Hamptons provides professional chauffeured car service in ${name} and across ${area} — flight-tracked airport transfers, local door-to-door rides, and New York City trips, available ${SITE.hours}.`,
    planning: {
      eyebrow: "Planning & Booking",
      heading: `Planning Your ${name} Car Service`,
      body: `Tell us your pickup and destination — an airport, a local address, or New York City — and we'll match the right vehicle and time your pickup around your schedule or flight.`,
      points: [
        "Share your pickup, destination, and timing",
        "Flight-tracked airport pickups, door to door",
        `Local ${area} rides and NYC trips`,
        "The right vehicle for your party and luggage",
      ],
    },
    preFooterCta: { eyebrow: `Reserve ${name} Car Service`, heading: `Ready to Book Car Service in ${name}?`, sub: `Flight-tracked airport transfers, local rides, and New York City trips — door to door from ${name}, ${SITE.hours}.` },
    faqs: [
      { q: `Do you provide airport transfers from ${name}?`, a: `Yes. We provide flight-tracked car service between ${name} and JFK, LGA, EWR, ISP, FOK, and HTO, timed to your actual arrival.` },
      { q: `Can you take me from ${name} into New York City?`, a: `Yes. We run direct, door-to-door transfers between ${name} and Manhattan or the five boroughs.` },
      { q: `What areas around ${name} do you cover?`, a: `${name}, ${n.join(", ")}, and the surrounding ${area}, plus the rest of the East End.` },
      { q: "Which vehicles are available?", a: `Everything from an Executive Sedan or Luxury SUV to a Sprinter Van, Mini Bus, or ${CAPACITY.coach.paxMax}-passenger Motor Coach, matched to your party and luggage.` },
      { q: `Is ${name} car service available 24/7?`, a: `Yes. Aura Hamptons operates ${SITE.hours}, including holidays, for local and long-distance trips.` },
    ],
  };
}

/* Town cards for the /services/ landing (imported by services.js). */
export const TOWN_CARDS = TOWN_DATA.map((t) => ({
  slug: `${t.slug}-car-service`,
  url: `/services/${t.slug}-car-service/`,
  title: `${t.name} Car Service`,
  blurb: `Airport transfers, local rides and NYC trips in ${t.name}.`,
  img: t.img,
  alt: `Aura Hamptons car service in ${t.name}`,
}));

export function serviceSpokes() {
  return [...SPOKES, ...TOWN_DATA.map(townSpoke)].map(render);
}
