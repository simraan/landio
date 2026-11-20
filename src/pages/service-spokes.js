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
const SPOKE_HERO = "/assets/img/hero/dc-hero";
const SPOKE_FEATURES = [
  { icon: "userCheck", label: "Professional chauffeurs" },
  { icon: "plane", label: "Flight-tracked transfers" },
  { icon: "clock", label: "Available 24/7" },
  { icon: "car", label: "5 vehicle classes" },
];
const SPOKE_INTRO_IMG = {
  "airport-transfers": { base: "/assets/img/fleet/executive-suv", alt: "Landio chauffeured Executive SUV for DC-area airport transfers" },
  "meet-and-greet": { base: "/assets/img/fleet/executive-sedan", alt: "Landio chauffeur and Executive Sedan at arrivals" },
  "corporate-executive": { base: "/assets/img/fleet/executive-suv", alt: "Landio Executive SUV for executive travel" },
  "fbo-private-jet": { base: "/assets/img/fleet/sprinter-van", alt: "Landio Sprinter Van for private aviation transfers" },
  "diplomatic-transportation": { base: "/assets/img/fleet/executive-sedan", alt: "Landio Executive Sedan for diplomatic transportation" },
  "hourly-chauffeur": { base: "/assets/img/fleet/executive-sedan", alt: "Landio Executive Sedan for hourly chauffeur service" },
};

/** Premium intro — editorial copy + checklist + CTA beside a framed image
 *  (reuses the shared .gt-split composition). */
function introSplit(data) {
  const img = SPOKE_INTRO_IMG[data.slug] || { base: SPOKE_HERO, alt: `${data.title} — Landio Limo Services` };
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
          ${splitPicture("/assets/img/fleet/executive-suv", "A chauffeured Landio Limo Services Executive SUV", { width: 1024, height: 576, widths: [640, 1024] })}
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
          ${splitPicture(data.detailImage || "/assets/img/hero/dc-hero", data.detailImageAlt || "Landio Limo Services chauffeured vehicle in the Washington, DC metro", { width: 1500, height: 844 })}
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
      <svg class="airport-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><linearGradient id="aura-plane-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbd145"/><stop offset="1" stop-color="#dc9f29"/></linearGradient></defs></svg>
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
      <svg class="airport-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><linearGradient id="aura-plane-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbd145"/><stop offset="1" stop-color="#dc9f29"/></linearGradient></defs></svg>
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
        sub: `Tell us your date, headcount, and itinerary, and we'll build the right plan — Sprinter Vans, Minibuses, and Motor Coaches up to ${CAPACITY.coach.paxMax} passengers, 24/7.`,
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
      fleetSection({ variant: "home", intro: "Every Landio service is delivered in one of our five vehicle classes — from the Executive Sedan to the Charter Bus." }),
      faqAccordion({ faqs: data.faqs, lede: `Answers to common questions about ${data.title.toLowerCase()} in the DC metro.` }),
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
const CMP_SUV = mkVehicleCmp({ name: "Executive SUV", lead: "Room for your party and luggage, with a professional chauffeur.", rows: [
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
    url: "/services/airport-transfers/",
    icon: "plane",
    title: "Airport Transfers",
    h1: "DC Airport Car Service (IAD, DCA & BWI)",
    eyebrow: "Airports We Serve",
    introEyebrow: "Airport Transfers",
    introHeading: "Every flight tracked, every pickup on time",
    lede: "Arrive relaxed. Landio provides punctual, flight-tracked chauffeured transfers between the DC metro and all three area airports — Dulles (IAD), Reagan National (DCA), and Baltimore/Washington (BWI) — door to door, 24/7.",
    description:
      "DC airport car service — flight-tracked transfers to and from Dulles (IAD), Reagan National (DCA), and BWI, across Washington, DC, Maryland, and Northern Virginia, 24/7.",
    body: [
      "Landio provides chauffeured transfers between Washington, DC, Maryland, Northern Virginia, and every airport our clients fly through — Dulles (IAD), Reagan National (DCA), and Baltimore/Washington (BWI). Whether you're landing at Dulles and heading into the District or catching an early departure out of Reagan National, your chauffeur is in position when you need them.",
      "We track your inbound flight in real time and adjust your pickup to the actual landing time, with no extra charge if your flight is delayed. Meet &amp; greet inside the terminal is available on request, and your chauffeur's details are shared by text before pickup.",
      "From Bethesda and Tysons to Arlington, National Harbor, and downtown DC, we run direct, door-to-door airport transfers in sedans, SUVs, and group vehicles — sized to your party and luggage.",
    ],
    points: [
      "Transfers to and from Dulles (IAD), Reagan National (DCA), and BWI",
      "Real-time flight tracking — pickup adjusts to your landing",
      "Meet & greet inside the terminal on request",
      "Door-to-door service across DC, Maryland, and Northern Virginia",
    ],
    faqs: [
      { q: "Which airports does Landio serve?", a: "We serve Washington Dulles (IAD), Ronald Reagan Washington National (DCA), and Baltimore/Washington (BWI), with transfers to and from Washington, DC, Maryland, and Northern Virginia." },
      { q: "Do you provide Dulles to Washington, DC car service?", a: "Yes. Dulles (IAD) to the District is one of our most-requested routes — direct, door-to-door chauffeured transfers to downtown DC and across Maryland and Northern Virginia." },
      { q: "Do you track incoming flights?", a: "Yes. We monitor your inbound flight in real time and position your chauffeur for your actual landing time." },
      { q: "What happens if my flight is delayed?", a: "Your pickup adjusts automatically to your real arrival — early or delayed — at no extra charge, because we track the flight." },
      { q: "Is meet & greet service available?", a: "Yes. On request, your chauffeur meets you inside the arrivals area with a personalized name sign and helps with your luggage." },
      { q: "Can I book an SUV or Sprinter for airport transfers?", a: `Yes. Choose from five vehicle classes — Executive Sedan, Executive SUV, Sprinter Van, Minibus, or Charter Bus — sized to your party and luggage.` },
      { q: "Can I book a round-trip airport transfer?", a: "Yes. Add your return details when you book, or tell us your itinerary and we'll arrange both legs of your trip." },
      { q: "How can I get an airport transfer quote?", a: `Use the booking form on this page for an instant quote, or call ${SITE.phone.display} and we'll help you directly.` },
      { q: "Are airport transfers available 24/7?", a: "Yes. Landio operates 24/7, including holidays, for early departures and late-night arrivals alike." },
    ],
  },
  {
    slug: "corporate-executive",
    url: "/services/corporate-executive/",
    icon: "briefcase",
    title: "Corporate & Executive Travel",
    h1: "Corporate & Executive Car Service in the DC Metro",
    eyebrow: "For Business",
    introEyebrow: "Corporate & Executive",
    introHeading: "Discreet, reliable travel for executives and teams",
    lede: "Landio provides discreet, professional chauffeured transportation for executives, business travelers, and VIP guests across Washington, DC, Maryland, and Northern Virginia — and up the Northeast corridor.",
    description:
      "Corporate and executive car service across the DC metro — discreet chauffeured travel for executives, clients, roadshows, and corporate programs, 24/7.",
    body: [
      "For executives and corporate travelers, the ride has to be reliable, discreet, and on time, every time. Landio provides professional chauffeur service for board meetings, client visits, investor roadshows, and daily executive travel across the DC metro.",
      "Your chauffeur arrives early, tracks traffic, and gets you where you need to be with time to spare. Travel in an Executive Sedan or Executive SUV, or move a team together in a Sprinter Van, with Wi-Fi and a quiet, professional environment to work on the way.",
      "We coordinate multi-stop days, airport connections, and corporate accounts with centralized billing — one standard of service whether you're moving a single executive or an entire visiting team.",
    ],
    points: [
      "Professional, vetted chauffeurs and immaculate vehicles",
      "Executive sedans, SUVs, and Sprinter vans for teams",
      "Multi-stop days, roadshows, and airport connections",
      "Corporate accounts with centralized billing on request",
    ],
    faqs: [
      { q: "Do you offer corporate accounts?", a: "Yes. We set up corporate accounts with centralized billing and priority dispatch for companies that book regularly. Contact us to set one up." },
      { q: "Can you handle an executive roadshow or multi-stop day?", a: "Yes. We coordinate full-day executive travel with multiple stops, waiting time, and airport connections, planned around your schedule." },
      { q: "Which vehicles are best for corporate travel?", a: "The Executive Sedan and Executive SUV suit most executive travel; the Sprinter Van moves a team together in comfort." },
      { q: "Is the service discreet?", a: "Yes. Discretion and professionalism are central to our corporate service — vetted chauffeurs, a quiet environment, and confidentiality throughout." },
      { q: "Do you travel outside the DC metro?", a: "Yes. We handle long-distance corporate trips up the Northeast corridor, including DC to Baltimore, Philadelphia, and New York." },
      { q: "Is corporate service available 24/7?", a: "Yes. Landio operates 24/7, including holidays, for early meetings and late finishes alike." },
      { q: "How do I get a corporate quote?", a: `Use the booking form on this page, or call ${SITE.phone.display} to discuss a corporate account.` },
    ],
  },
  {
    slug: "fbo-private-jet",
    url: "/services/fbo-private-jet/",
    icon: "plane",
    title: "Private Jet & FBO Transfers",
    h1: "Private Jet & FBO Car Service in the DC Metro",
    eyebrow: "Private Aviation",
    introEyebrow: "Private Jet & FBO",
    introHeading: "Curbside at the FBO, coordinated with your crew",
    lede: "Landio provides discreet, crew-coordinated chauffeured transfers to and from the region's private-aviation terminals and FBOs — Signature at Dulles, Reagan National, and BWI, plus Manassas, Leesburg Executive, Montgomery County Airpark, and Frederick.",
    description:
      "Private jet and FBO car service across the DC metro — crew-coordinated transfers at Signature (IAD, DCA, BWI), Manassas, Leesburg Executive, Montgomery County Airpark, and Frederick, 24/7.",
    body: [
      "Private aviation runs on precise timing. Your chauffeur meets you at the FBO on the field — not a crowded terminal — and we coordinate with your flight crew so the car is in position when your aircraft arrives or before you depart.",
      "We serve the private-aviation facilities across the region: Signature Aviation at Dulles (IAD), Reagan National (DCA), and BWI, along with Manassas Regional, Leesburg Executive, Montgomery County Airpark, and Frederick Municipal.",
      "For VIP passengers, privacy and presentation matter. Travel in an Executive Sedan or SUV, or move a group in the Sprinter Van, with professional chauffeurs who handle the luggage and the logistics quietly.",
    ],
    points: [
      "Signature FBO transfers at IAD, DCA, and BWI",
      "Manassas, Leesburg Executive, Montgomery County Airpark, and Frederick",
      "Coordinated with your flight crew to your tail number's timing",
      "Discreet, professional service in immaculate vehicles",
    ],
    faqs: [
      { q: "Which private airports and FBOs do you serve?", a: "We serve Signature Aviation at Dulles (IAD), Reagan National (DCA), and BWI, plus Manassas Regional, Leesburg Executive, Montgomery County Airpark, and Frederick Municipal." },
      { q: "Can you coordinate with my flight crew or FBO?", a: "Yes. We coordinate with your flight crew or the FBO so your chauffeur is in position when your aircraft arrives, or ahead of a departure. Share your FBO and timing when you book." },
      { q: "Do you provide service for short-notice private flights?", a: "We operate 24/7 and do our best to accommodate short-notice private-aviation transfers. Call us and we'll confirm availability." },
      { q: "Which vehicle is best for a private-jet transfer?", a: "The Executive Sedan and SUV suit most VIP transfers; the Sprinter Van carries a larger party and luggage. Choose by group size and bags." },
      { q: "Is pricing fixed for FBO transfers?", a: "Every trip is quoted before you book, with no surge pricing. The quote depends on distance, vehicle, duration, tolls, and stops." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },
  {
    slug: "diplomatic-transportation",
    url: "/services/diplomatic-transportation/",
    icon: "shield",
    title: "Diplomatic Transportation",
    h1: "Diplomatic Transportation in Washington, DC",
    eyebrow: "Protocol & Discretion",
    introEyebrow: "Diplomatic Service",
    introHeading: "Protocol-aware chauffeur service for the diplomatic community",
    lede: "Landio provides discreet, protocol-aware chauffeured transportation for embassies, missions, delegations, and visiting dignitaries across Washington, DC — professional, punctual, and confidential.",
    description:
      "Diplomatic transportation in Washington, DC — discreet, protocol-aware chauffeur service for embassies, missions, delegations, and visiting dignitaries, 24/7.",
    body: [
      "Washington, DC is home to the world's diplomatic community, and moving dignitaries, delegations, and embassy staff calls for a higher standard of discretion, punctuality, and professionalism. Landio provides chauffeured transportation built for exactly that.",
      "Our chauffeurs are vetted, experienced, and protocol-aware, handling embassy transfers, airport arrivals for visiting officials, and multi-vehicle movements for delegations. Travel in an Executive Sedan or Executive SUV, or coordinate a group in Sprinter vans and larger vehicles.",
      "We coordinate closely with embassy and mission staff on timing, routing, and confidentiality, and we handle airport meet &amp; greet for arriving officials at Dulles, Reagan National, and BWI. Every detail is managed quietly and professionally.",
    ],
    points: [
      "Discreet, confidential service for embassies and missions",
      "Vetted, protocol-aware professional chauffeurs",
      "Airport arrivals and meet & greet for visiting officials",
      "Single vehicles or coordinated delegation movements",
    ],
    faqs: [
      { q: "Do you provide transportation for embassies and missions?", a: "Yes. We provide discreet, protocol-aware chauffeured transportation for embassies, missions, delegations, and visiting dignitaries across Washington, DC." },
      { q: "Are your chauffeurs experienced with diplomatic protocol?", a: "Yes. Our chauffeurs are vetted, experienced, and protocol-aware, and we coordinate closely with embassy and mission staff on timing, routing, and confidentiality." },
      { q: "Can you handle airport arrivals for visiting officials?", a: "Yes. We provide flight-tracked airport transfers and meet & greet for arriving officials at Dulles (IAD), Reagan National (DCA), and BWI." },
      { q: "Can you coordinate multiple vehicles for a delegation?", a: "Yes. We arrange single vehicles or coordinated multi-vehicle movements for delegations, sized to the group and the schedule." },
      { q: "Is the service confidential?", a: "Yes. Discretion and confidentiality are central to our diplomatic service, handled quietly and professionally throughout." },
      { q: "Is diplomatic transportation available 24/7?", a: "Yes. Landio operates 24/7, including holidays, around your schedule." },
    ],
  },
  {
    slug: "group-transfers",
    url: "/services/group-transfers/",
    icon: "van",
    title: "Group Transfers",
    h1: "Group Transportation in the DC Metro",
    eyebrow: "For Groups",
    introEyebrow: "Group Transfers",
    introHeading: "Keep your whole group together",
    lede: `Landio provides luxury group transportation for corporate groups, conference shuttles, wedding guests, and private events — Sprinter vans, minibuses, and charter buses up to ${CAPACITY.coach.paxMax} passengers across the DC metro.`,
    description:
      "Group transportation across the DC metro — Sprinter vans, minibuses, and charter buses for corporate groups, conferences, weddings, and events, 24/7.",
    body: [
      "When you're moving a group, splitting across cars means lost time and lost people. Landio keeps everyone together in Sprinter vans, minibuses, and charter buses, with professional chauffeurs and a plan built around your schedule.",
      `Our group fleet runs from the 14-passenger Sprinter Van up to a ${CAPACITY.coach.paxMax}-passenger Charter Bus, matched to your headcount and luggage. We handle conference and hotel shuttles, corporate offsites, wedding guest transport, and group airport transfers across DC, Maryland, and Northern Virginia.`,
      "Tell us your date, headcount, and itinerary, and we'll build the right plan — single vehicles or a coordinated fleet, with upfront quotes and no surge pricing.",
    ],
    points: [
      `Sprinter vans, minibuses, and charter buses up to ${CAPACITY.coach.paxMax} passengers`,
      "Conference shuttles, corporate offsites, and events",
      "Group airport transfers with real-time flight tracking",
      "Upfront quotes, no surge pricing, 24/7 dispatch",
    ],
    faqs: [
      { q: "How large a group can you move?", a: `Our group fleet runs from the 14-passenger Sprinter Van up to a ${CAPACITY.coach.paxMax}-passenger Charter Bus, and we coordinate multiple vehicles for larger parties.` },
      { q: "Do you provide conference and hotel shuttles?", a: "Yes. We run conference shuttles, hotel transfers, and corporate offsite transport across the DC metro, on a schedule you set." },
      { q: "Can you handle group airport transfers?", a: "Yes. We provide group airport transfers to and from Dulles (IAD), Reagan National (DCA), and BWI, with real-time flight tracking." },
      { q: "Is pricing higher for large groups or events?", a: "No. Every trip is quoted up front with no surge pricing — the quote depends on distance, vehicle, duration, tolls, and stops." },
      { q: "Can you coordinate multiple vehicles?", a: "Yes. Share your group size and timeline and we'll build a plan, including multiple vehicles where needed." },
      { q: "Is group transportation available 24/7?", a: "Yes. Landio operates 24/7, including holidays, for early starts and late finishes alike." },
    ],
  },
  {
    slug: "meet-and-greet",
    url: "/services/meet-and-greet/",
    icon: "handshake",
    title: "Meet & Greet Service",
    h1: "Airport Meet & Greet Service in the DC Metro",
    eyebrow: "At the Terminal",
    introEyebrow: "Meet & Greet",
    introHeading: "Met inside the terminal, walked to your car",
    lede: "With Landio's meet & greet service, your chauffeur greets you inside the arrivals area with a personalized name sign, assists with your luggage, and escorts you to your vehicle at Dulles, Reagan National, and BWI.",
    description:
      "Airport meet & greet service at Dulles (IAD), Reagan National (DCA), and BWI — your chauffeur greets you inside arrivals with a name sign and luggage assistance, 24/7.",
    body: [
      "After a long flight, the last thing you want is to search for your ride. With meet & greet, your chauffeur is waiting inside the arrivals area with a personalized name sign, ready to help with your bags and walk you straight to the car.",
      "We track your flight in real time, so your chauffeur is in position for your actual landing — early or delayed. Meet & greet is available at Dulles (IAD), Reagan National (DCA), and BWI, and pairs with any airport transfer.",
      "It's the calmest way to arrive, especially for visiting executives, officials, families, and first-time visitors to the DC area.",
    ],
    points: [
      "Greeted inside arrivals with a personalized name sign",
      "Luggage assistance and an escort to your vehicle",
      "Real-time flight tracking for your actual landing",
      "Available at Dulles (IAD), Reagan National (DCA), and BWI",
    ],
    faqs: [
      { q: "What is airport meet & greet service?", a: "Your chauffeur meets you inside the arrivals area with a personalized name sign, helps with your luggage, and walks you to your vehicle — instead of meeting you curbside." },
      { q: "Which airports offer meet & greet?", a: "Meet & greet is available at Dulles (IAD), Reagan National (DCA), and BWI, and pairs with any airport transfer." },
      { q: "Do you track my flight for meet & greet?", a: "Yes. We track your inbound flight in real time so your chauffeur is in position for your actual landing, early or delayed." },
      { q: "Is meet & greet good for visiting officials or families?", a: "Yes. It's ideal for visiting executives, officials, families, and first-time visitors who want a calm, guided arrival." },
      { q: "How do I add meet & greet to my booking?", a: `Request it when you book, or call ${SITE.phone.display} and we'll add it to your reservation.` },
      { q: "Is meet & greet available 24/7?", a: "Yes. Landio operates 24/7, including holidays, for early and late arrivals alike." },
    ],
  },
  {
    slug: "hourly-chauffeur",
    url: "/services/hourly-chauffeur/",
    icon: "calendar",
    title: "Hourly Chauffeur Service",
    h1: "Hourly Chauffeur Service in the DC Metro",
    eyebrow: "By the Hour",
    introEyebrow: "Hourly Chauffeur",
    introHeading: "A dedicated chauffeur for the whole day",
    lede: "Landio's hourly chauffeur service gives you a dedicated chauffeur and vehicle by the hour — for meetings, roadshows, dinners, events, and full-day travel across Washington, DC, Maryland, and Northern Virginia.",
    description:
      "Hourly chauffeur service across the DC metro — a dedicated chauffeur and vehicle by the hour for meetings, roadshows, events, and multi-stop days, 24/7.",
    body: [
      "Some days have too many stops for a point-to-point booking. With hourly chauffeur service, your chauffeur and vehicle stay with you for the day, waiting between stops so you never wait for a ride.",
      "It's ideal for executive roadshows, back-to-back meetings, client visits, dinners, and events across the DC metro. Choose an Executive Sedan or Executive SUV for individual travel, or a Sprinter Van to keep a team together.",
      "Tell us your start time, approximate hours, and itinerary, and we'll build the day around it — with upfront pricing and no surge.",
    ],
    points: [
      "A dedicated chauffeur and vehicle by the hour",
      "Ideal for roadshows, meetings, dinners, and events",
      "Executive sedans, SUVs, or Sprinter vans for teams",
      "Upfront hourly pricing with no surge",
    ],
    faqs: [
      { q: "How does hourly chauffeur service work?", a: "Your chauffeur and vehicle stay with you for a set number of hours, waiting between stops, so you have a dedicated ride for the whole day." },
      { q: "What is hourly service good for?", a: "It's ideal for executive roadshows, back-to-back meetings, client visits, dinners, and events across the DC metro." },
      { q: "Is there a minimum number of hours?", a: `Minimums vary by vehicle and day. Share your plan and we'll confirm the details — call ${SITE.phone.display} or use the booking form.` },
      { q: "Which vehicles are available by the hour?", a: "Choose an Executive Sedan or Executive SUV for individual travel, or a Sprinter Van to keep a team together." },
      { q: "Is pricing fixed for hourly service?", a: "Yes. Hourly service is quoted up front with no surge pricing, based on vehicle, hours, and any special requirements." },
      { q: "Is hourly chauffeur service available 24/7?", a: "Yes. Landio operates 24/7, including holidays, around your schedule." },
    ],
  },
];

export function serviceSpokes() {
  return SPOKES.map(render);
}
