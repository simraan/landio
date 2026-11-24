/**
 * Shared interior-page sections (Our Premium Services, Premium Fleet, Contact,
 * FAQ, breadcrumb, page hero). Reused across Services, Fleet, Airport, vehicle,
 * route, and service-spoke pages so the chrome stays consistent.
 */

import { SITE } from "../config.js";
import { esc, quoteForm, btnIcon, fleetPicture } from "../templates/partials.js";
import { icon } from "../templates/icons.js";

/** Provided original icon SVGs (served from /assets/img/icons). */
export const svgIcon = (name) =>
  `<img class="svg-ico" src="/assets/img/icons/${name}.svg" alt="" aria-hidden="true" width="26" height="26" loading="lazy" decoding="async">`;
const mailIcon = `<svg class="ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`;

/** The 6 "Our Premium Services" — localized to the Hamptons, drawn from the SSOT. */
export const PREMIUM_SERVICES = SITE.services.map((s) => ({
  title: s.title,
  icon: s.icon,
  url: s.url,
  desc: s.blurb,
}));

const svcIcon = `<svg class="ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13l2-5h14l2 5"/><path d="M3 13h18v4H3z"/><circle cx="7" cy="18" r="1.4"/><circle cx="17" cy="18" r="1.4"/></svg>`;


/* ------------------------------------------------------------------------
 * CLICKABLE BOXES — sitewide interaction rule.
 * Every card-like box has exactly ONE interactive element, placed inside the
 * box's title; its ::after stretches over the whole box (.cbox__action::after
 * in styles.css). So the entire box is the click/tap target, headings stay
 * real headings (a <button> may not contain an <h3>), and nothing is nested.
 *
 * act    = { href, cue?, external? }                    → link box ("Learn more →")
 *        | { modal: { pickup?, dropoff?, vehicle? }, cue? } → quote box ("Get a quote →")
 *          (modal with no pickup uses the page's default pickup, if any)
 * future = "/path/" → keeps `act` now; build.js turns the box into a link to
 *          that path once the page exists (data-future + data-future-cue).
 * ---------------------------------------------------------------------- */
const LINK_CUE = "Learn more";
const MODAL_CUE = "Get a quote";
const optAttr = (k, v) => (v === undefined || v === null ? "" : ` ${k}="${esc(v)}"`);
export const cueFor = (act, cue) => cue || act.cue || (act.href ? LINK_CUE : MODAL_CUE);

/** The box's single interactive element. Accessible name = "Title, action". */
export function boxAction(label, act, { cue } = {}) {
  const c = cueFor(act, cue);
  const aria = `${label}, ${c}`;
  if (act.href) {
    const ext = act.external ? ' rel="noopener" target="_blank"' : "";
    return `<a class="cbox__action" href="${esc(act.href)}"${ext} aria-label="${esc(aria)}" data-card-label="${esc(label)}">${esc(label)}</a>`;
  }
  const m = act.modal || {};
  return `<button type="button" class="cbox__action" data-open-quote aria-haspopup="dialog" aria-label="${esc(aria)}" data-card-label="${esc(label)}"${optAttr("data-prefill-pickup", m.pickup)}${optAttr("data-prefill-dropoff", m.dropoff)}${optAttr("data-prefill-vehicle", m.vehicle)}>${esc(label)}</button>`;
}

/** A whole clickable box. `bodyHtml` must not contain links (the box is one target). */
export function cbox({ tag = "li", cls = "", title, titleTag = "h3", titleCls = "", titleId = "", act, future, futureCue = LINK_CUE, cue, lead = "", bodyHtml = "" }) {
  const fut = future ? ` data-future="${esc(future)}" data-future-cue="${esc(futureCue)}"` : "";
  const c = cueFor(act, cue);
  const tAttrs = ` class="cbox__title${titleCls ? " " + titleCls : ""}"${titleId ? ` id="${esc(titleId)}"` : ""}`;
  return `<${tag} class="cbox ${cls}"${fut}>${lead}<${titleTag}${tAttrs}>${boxAction(title, act, { cue: c })}</${titleTag}>${bodyHtml}<span class="cbox__cue" aria-hidden="true">${esc(c)} →</span></${tag}>`;
}

export function breadcrumb(trail = []) {
  if (!trail.length) return "";
  const items = trail
    .map((t, i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${esc(t.name)}</li>`
        : `<li><a href="${esc(t.path)}">${esc(t.name)}</a></li>`
    )
    .join("");
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><div class="container"><ol>${items}</ol></div></nav>`;
}

/** Interior page hero (dark) with optional eyebrow + inline quote form. */
export function pageHero({ eyebrow, h1, lede, ledeHtml, withForm = true, image = null, features = null }) {
  const trust = features ? `
          <ul class="hero__trust">
            ${features.map((f) => `<li><span class="hero__trust-ico" aria-hidden="true">${icon(f.icon, { size: 15 })}</span>${esc(f.label)}</li>`).join("\n            ")}
          </ul>` : "";
  // A refined gold divider below the CTAs (only on heroes that carry a trust row,
  // i.e. Group Transfers — other spokes pass no `features`, so they're unchanged).
  const divider = features ? `
          <div class="hero__divider" aria-hidden="true"></div>` : "";
  const bg = image ? `
      <picture class="hero__bg" aria-hidden="true">
        <source type="image/webp" srcset="${image}-640.webp 640w, ${image}-1024.webp 1024w" sizes="100vw">
        <img src="${image}-1024.jpg" srcset="${image}-640.jpg 640w, ${image}-1024.jpg 1024w" sizes="100vw" alt="" width="1024" height="576" fetchpriority="high" decoding="async">
      </picture>
      <div class="hero__overlay" aria-hidden="true"></div>` : "";
  return `
    <section class="hero hero--page${image ? " hero--image" : ""}">${bg}
      <div class="container ${withForm ? "hero__grid" : ""}">
        <div>
          ${eyebrow ? `<p class="hero__eyebrow">${esc(eyebrow)}</p>` : ""}
          <h1>${esc(h1)}</h1>
          ${ledeHtml || lede ? `<p class="hero__area" style="max-width:60ch">${ledeHtml || esc(lede)}</p>` : ""}
          <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Reserve Your Ride</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>${divider}${trust}
        </div>
        ${withForm ? quoteForm("page-quote", { heading: "Get Your Instant Quote", location: "page-hero" }) : ""}
      </div>
    </section>`;
}

export function premiumServicesSection({ heading = "Our Premium Services", eyebrow = "What We Offer", linked = true } = {}) {
  const cards = PREMIUM_SERVICES.map((s) => cbox({
    cls: "feature-card card-surface",
    lead: `<span class="feature-card__icon">${s.icon ? svgIcon(s.icon) : svcIcon}</span>`,
    title: s.title,
    act: linked && s.url ? { href: s.url } : { modal: {} },
    bodyHtml: `<p>${esc(s.desc)}</p>`,
  })).join("");
  return `
    <section class="section" aria-labelledby="svc6-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">${esc(eyebrow)}</span>
          <h2 id="svc6-title">${esc(heading)}</h2>
        </div>
        <ul class="feature-grid">${cards}</ul>
      </div>
    </section>`;
}

/**
 * Homepage-style fleet cards — the five vehicle classes rendered with the exact
 * card design used on the homepage: no "Executive Class" badge, no comfort bar,
 * per-vehicle amenities (from SITE.fleet[].amenities), and a "Luggage on request"
 * fallback where a vehicle has no fixed luggage count. Shared so the homepage and
 * the Group Transfers page render byte-identical cards from one source. Pass an
 * already-ordered vehicle list.
 */
const fleetIco = (p) =>
  `<svg class="ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const FLEET_SEAT = fleetIco('<path d="M6 19v-3h9a2 2 0 0 0 2-2V5M6 16a2 2 0 0 1-2-2V7"/>');
const FLEET_BAG = fleetIco('<rect x="6" y="8" width="12" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>');
// Amenity → icon. Keys are the exact SITE.fleet[].amenities strings (SSOT in
// config.js); any unmapped amenity falls back to a check, so nothing is invented.
const FLEET_AMENITY_ICON = {
  "Wi-Fi": fleetIco('<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>'),
  "Leather seats": FLEET_SEAT,
  "Executive seating": FLEET_SEAT,
  "Comfortable seating": FLEET_SEAT,
  "Reclining seats": FLEET_SEAT,
  "Climate control": fleetIco('<path d="M12 3v18M3.8 7.5l16.4 9M20.2 7.5l-16.4 9"/>'),
  "USB charging": fleetIco('<path d="M12 20V6M9 9l3-3 3 3M8 13h8"/>'),
  "Luggage bays": FLEET_BAG,
  "Overhead storage": fleetIco('<path d="M12 3l8 4-8 4-8-4 8-4z"/><path d="M4 7v8l8 4 8-4V7"/>'),
  // Stretch Limo amenities — feature-specific line icons (same 20px, 1.6 stroke
  // style as the rest) so they match every other fleet category, not a check.
  "LED lounge lighting": fleetIco('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 2a7 7 0 0 0-4 12.6c.6.5 1 1.3 1 2.4h6c0-1.1.4-1.9 1-2.4A7 7 0 0 0 12 2Z"/>'),
  "Premium sound system": fleetIco('<path d="M4 9v6h3l5 4V5L7 9H4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 6a8 8 0 0 1 0 12"/>'),
  "Privacy glass": fleetIco('<path d="M3 3l18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.6 5.3A9 9 0 0 1 12 5c5 0 9 5 9 7a11.4 11.4 0 0 1-2 2.6"/><path d="M6.1 6.2C4 7.6 3 10 3 12c0 2 4 7 9 7 .8 0 1.6-.1 2.3-.3"/>'),
  "Refreshment console": fleetIco('<path d="M5 4h14l-7 8z"/><path d="M12 12v6"/><path d="M8.5 20h7"/>'),
};
const FLEET_CHECK = fleetIco('<path d="M5 12l5 5 9-11"/>');
const fleetAmenityIcon = (name) => FLEET_AMENITY_ICON[name] || FLEET_CHECK;

export function fleetCards(vehicles) {
  return vehicles
    .map(
      (v) => `
        <li class="fleet-card card-surface">
          <div class="fleet-card__media">
            ${fleetPicture(v, { alt: `${v.name} — Landio Limo Services` })}
          </div>
          <div class="fleet-card__body">
            <h3 class="fleet-card__name">${esc(v.name)}</h3>
            ${v.desc ? `<p class="fleet-card__desc">${esc(v.desc)}</p>` : ""}
            ${v.amenities && v.amenities.length ? `<ul class="amenities">
              ${v.amenities.map((a) => `<li>${fleetAmenityIcon(a)}${esc(a)}</li>`).join("\n              ")}
            </ul>` : ""}
            <ul class="fleet-stats">
              <li>${FLEET_SEAT}<strong>${v.seats}</strong>&nbsp;seats</li>
              ${v.bags ? `<li>${FLEET_BAG}<strong>${v.bags}</strong>&nbsp;luggage</li>` : `<li>${FLEET_BAG}Luggage on request</li>`}
            </ul>
            <button type="button" class="btn btn-primary btn-block fleet-card__cta" data-open-quote aria-haspopup="dialog" data-prefill-vehicle="${esc(v.name)}" data-card-label="${esc(v.name)}" aria-label="${esc(v.name)}, Book Now">Book Now</button>
          </div>
        </li>`
    )
    .join("");
}

/** Premium Fleet grid (the five Aura Hamptons vehicle classes, from the SSOT).
 *  variant "home" uses the shared homepage-style cards (fleetCards); the default
 *  renders the original service-spoke cards (badge + fixed amenities + comfort bar). */
export function fleetSection({ heading = "Luxury Vehicles for Every Occasion", eyebrow = "Our Premium Fleet", intro = "", order = null, variant = null } = {}) {
  // Optional per-page ordering by vehicle key; defaults to config order.
  const fleetList = order
    ? order.map((k) => SITE.fleet.find((v) => v.key === k)).filter(Boolean)
    : SITE.fleet;
  const amen = [
    ["wifi", "Complimentary Wi-Fi"],
    ["bulb", "Bottled water"],
    ["shield", "Privacy & discretion"],
    ["usb", "USB charging"],
  ];
  const amenIcon = {
    wifi: '<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.3-1 2.5H9c0-1.2-.3-1.9-1-2.5A6 6 0 0 1 12 3z"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/>',
    usb: '<path d="M12 20V6M9 9l3-3 3 3M8 13h8"/>',
  };
  const ic = (p) =>
    `<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const seat = ic('<path d="M6 19v-3h9a2 2 0 0 0 2-2V5M6 16a2 2 0 0 1-2-2V7"/>');
  const bag = ic('<rect x="6" y="8" width="12" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>');

  const cards = variant === "home"
    ? fleetCards(fleetList)
    : fleetList
    .map(
      (v) => `
        <li class="fleet-card card-surface">
          <div class="fleet-card__media">${fleetPicture(v, { alt: `${v.name} — Landio Limo Services` })}<span class="fleet-card__badge">Executive Class</span></div>
          <div class="fleet-card__body">
            <h3 class="fleet-card__name">${esc(v.name)}</h3>
            ${v.desc ? `<p class="fleet-card__desc">${esc(v.desc)}</p>` : ""}
            <ul class="amenities">${amen.map(([k, t]) => `<li>${ic(amenIcon[k])}${t}</li>`).join("")}</ul>
            <div class="comfort"><div class="comfort__label">Comfort</div><div class="comfort__bar"><span style="width:100%"></span></div></div>
            <ul class="fleet-stats"><li>${seat}<strong>${v.seats}</strong>&nbsp;seats</li>${v.bags ? `<li>${bag}<strong>${v.bags}</strong>&nbsp;luggage</li>` : ""}</ul>
            <button type="button" class="btn btn-primary btn-block fleet-card__cta" data-open-quote aria-haspopup="dialog" data-prefill-vehicle="${esc(v.name)}" data-card-label="${esc(v.name)}" aria-label="${esc(v.name)}, Book Now">Book Now</button>
          </div>
        </li>`
    )
    .join("");
  return `
    <section class="section section--alt" aria-labelledby="fleet-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">${esc(eyebrow)}</span>
          <h2 id="fleet-title">${esc(heading)}</h2>
          ${intro ? `<p class="text-secondary">${esc(intro)}</p>` : ""}
        </div>
        <ul class="fleet-grid">${cards}</ul>
      </div>
    </section>`;
}

/**
 * Homepage-style FAQ accordion — premium cards with the gold circular chevron
 * indicator (.faq-ind) that rotates on open, gold hover/open borders, left accent
 * bar, section ambience, and the CSS-only reveal animation. The visual treatment
 * is CSS-scoped per page (.page-home / .page-group-transfers in styles.css), so
 * this renderer is shared to keep that markup identical across both. Native
 * <details> semantics and keyboard access are preserved.
 */
export function faqAccordion({ faqs, eyebrow = "Common Questions", heading = "Frequently Asked Questions", lede = "", id = "faq-title" } = {}) {
  if (!faqs || !faqs.length) return "";
  const CHEV = `<span class="faq-ind" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>`;
  const items = faqs
    .map(
      (f) => `
          <details class="faq-item"><summary>${esc(f.q)}${CHEV}</summary><div class="faq-item__a"><p>${esc(f.a)}</p></div></details>`
    )
    .join("");
  return `
    <section class="section section--alt faq-section" aria-labelledby="${esc(id)}">
      <div class="container faq">
        <div class="section-head">
          <span class="eyebrow">${esc(eyebrow)}</span>
          <h2 id="${esc(id)}">${esc(heading)}</h2>
          ${lede ? `<p class="text-secondary">${esc(lede)}</p>` : ""}
        </div>
        <div class="faq__list">${items}</div>
      </div>
    </section>`;
}

export function faqSection(faqs, { heading = "Frequently Asked Questions", eyebrow = "Help Center", lede = "", alt = false } = {}) {
  if (!faqs || !faqs.length) return "";
  const items = faqs
    .map(
      (f) =>
        `<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-item__a"><p>${esc(f.a)}</p></div></details>`
    )
    .join("");
  return `
    <section class="section${alt ? " section--alt" : ""}" aria-labelledby="faqs-title">
      <div class="container faq">
        <div class="section-head">
          <span class="eyebrow">${esc(eyebrow)}</span>
          <h2 id="faqs-title">${esc(heading)}</h2>
          ${lede ? `<p class="text-secondary">${esc(lede)}</p>` : ""}
        </div>
        <div class="faq__list">${items}</div>
      </div>
    </section>`;
}

/* Inline icons for the shared contact bar / event CTA — identical SVGs to the
 * homepage set so these renderers emit byte-identical markup on every page. */
const cbIco = (p) =>
  `<svg class="ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const CB_ICON = {
  phone: cbIco('<path d="M4 5c0 8 7 15 15 15l-2-4-4 1c-2-1-4-3-5-5l1-4z"/>'),
  mail: cbIco('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  pin: cbIco('<path d="M12 21s-6.5-5.5-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.5-6.5 10-6.5 10z"/><circle cx="12" cy="11" r="2.3"/>'),
  clock: cbIco('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
};

/**
 * Homepage Contact Bar — inline full-width band (#1A1916). Shared so the homepage
 * and the Group Transfers page render the exact same section. Styling is CSS-scoped
 * to .page-home / .page-group-transfers. Same four items, wording, and actions.
 */
export function contactBar() {
  const items = [
    { icon: CB_ICON.phone, title: "Call Us", l1: SITE.phone.display, l2: "Available 24/7 for bookings", href: `tel:${SITE.phone.e164}` },
    { icon: CB_ICON.mail, title: "Email Us", l1: SITE.email, l2: SITE.responsePromise, href: `mailto:${SITE.email}` },
    { icon: CB_ICON.pin, title: "Service Area", l1: "Washington DC, Maryland & Northern Virginia", l2: "Airports: IAD, DCA & BWI", modal: true },
    { icon: CB_ICON.clock, title: "Operating Hours", l1: "24 Hours / 7 Days a Week", l2: "Including holidays", modal: true },
  ];
  const cell = (it) => {
    const inner = `<span class="contactbar__ico" aria-hidden="true">${it.icon}</span><span class="contactbar__text"><span class="contactbar__title">${esc(it.title)}</span><span class="contactbar__body"><span class="contactbar__l1">${esc(it.l1)}</span><span class="contactbar__l2">${esc(it.l2)}</span></span></span>`;
    return it.href
      ? `<a class="contactbar__item" href="${esc(it.href)}">${inner}</a>`
      : `<button type="button" class="contactbar__item" data-open-quote aria-haspopup="dialog" aria-label="${esc(`${it.title}, get a quote`)}">${inner}</button>`;
  };
  return `
    <section class="section section--alt contactbar-section" aria-labelledby="contact-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Get In Touch</span>
          <h2 id="contact-title">Contact Us</h2>
          <p class="text-secondary">Have questions? Reach out to us anytime. We're here to assist you 24/7.</p>
        </div>
      </div>
      <div class="contactbar">
        ${items.map(cell).join("\n        ")}
      </div>
    </section>`;
}

/**
 * Homepage Event Transport CTA — conversion band for weddings, celebrations, and
 * group transportation. Shared so the homepage and the Group Transfers page render
 * the same section. Styling is CSS-scoped to .page-home / .page-group-transfers.
 */
export function eventCta(opts = {}) {
  // Default actions: the prominent "Call us, any hour" block + quote button
  // (byte-identical sitewide). `email: true` renders two COMPACT inline contact
  // cards (Call + Email) side by side above the unchanged quote button — used
  // only by the Group Transfers page.
  // Optional overrides (defaults keep every existing caller byte-identical):
  // a custom primary-button label, an IAD/area pickup to prefill, and a custom
  // call-block label.
  const ctaLabel = opts.ctaLabel || "Get a Free Quote";
  const prefillAttr = opts.prefillPickup ? ` data-prefill-pickup="${esc(opts.prefillPickup)}"` : "";
  const callLabel = opts.callLabel || "Call us, any hour";
  const actions = opts.email ? `
          <div class="event-cta__actions">
            <div class="event-cta__contacts">
              <a class="event-cta__call event-cta__call--sm" href="tel:${esc(SITE.phone.e164)}">
                <span class="event-cta__call-ico" aria-hidden="true">${CB_ICON.phone}</span>
                <span class="event-cta__call-text"><span class="event-cta__call-label">Call us</span><span class="event-cta__call-num">${esc(SITE.phone.display)}</span></span>
              </a>
              <a class="event-cta__call event-cta__call--sm event-cta__call--email" href="mailto:${esc(SITE.email)}">
                <span class="event-cta__call-ico" aria-hidden="true">${CB_ICON.mail}</span>
                <span class="event-cta__call-text"><span class="event-cta__call-label">Email us</span><span class="event-cta__call-num">${esc(SITE.email)}</span></span>
              </a>
            </div>
            <button type="button" class="btn btn-primary btn-block" data-open-quote${prefillAttr}>${btnIcon("calendar")}${esc(ctaLabel)}</button>
          </div>` : `
          <div class="event-cta__actions">
            <a class="event-cta__call" href="tel:${esc(SITE.phone.e164)}">
              <span class="event-cta__call-ico" aria-hidden="true">${CB_ICON.phone}</span>
              <span class="event-cta__call-text"><span class="event-cta__call-label">${esc(callLabel)}</span><span class="event-cta__call-num">${esc(SITE.phone.display)}</span></span>
            </a>
            <button type="button" class="btn btn-primary btn-block" data-open-quote${prefillAttr}>${btnIcon("calendar")}${esc(ctaLabel)}</button>
          </div>`;
  // Copy defaults to the sitewide "Event Transport" band; a premium service page
  // can pass its own eyebrow / heading / lede (raw HTML allowed).
  const eyebrow = opts.eyebrow || "Event Transport &middot; 24/7";
  const headingHtml = opts.headingHtml || `Planning transportation for your<br class="event-cta__br"> <span class="gold">corporate event or group trip?</span>`;
  const lede = opts.lede || "From corporate programs to private events, every trip is quoted on your exact route — professional chauffeurs across Washington, DC, Maryland, and Northern Virginia, 24/7.";
  return `
    <section class="section event-cta" aria-labelledby="event-cta-title">
      <div class="container">
        <div class="event-cta__inner">
          <div class="event-cta__copy">
            <p class="eyebrow">${eyebrow}</p>
            <h2 id="event-cta-title">${headingHtml}</h2>
            <p class="event-cta__lede">${lede}</p>
          </div>${actions}
        </div>
      </div>
    </section>`;
}

/** Contact section (uses the provided original icons). Hamptons service area. */
export function contactSection({ alt = true, variant = "default", hideSocial = false } = {}) {
  const a = SITE.address;
  const addr = `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;
  // `hideSocial` drops the "Follow us on Instagram" chip (airport pages only);
  // default false, so every other page keeps it.
  const ig = hideSocial ? null : (SITE.sameAs || []).find((u) => /instagram\.com/i.test(u));
  const igSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>`;
  const tel = { href: `tel:${SITE.phone.e164}`, cue: "Call now" };
  const mail = { href: `mailto:${SITE.email}`, cue: "Email us" };
  // "landing" = landing-template variant (inline icons; Call · Email · Service Area · Hours).
  // All contact cards (both variants) use the same inline, gold (currentColor)
  // icons so colours stay consistent site-wide. The default variant previously
  // used /assets .svg <img> files stroked in a stale gold (#c6a664), which read
  // as a different colour from the landing cards' brand-gold icons.
  const ico = (n) => `<span class="contact-card__icon"><span class="lp-contact__ico">${icon(n)}</span></span>`;
  const cards = variant === "landing" ? [
    { lead: ico("phone"), title: "Call Us", act: tel, body: [SITE.phone.display, "Available 24/7 for bookings"] },
    { lead: ico("mail"), title: "Email Us", act: mail, body: [SITE.email, SITE.responsePromise] },
    { lead: ico("pin"), title: "Service Area", act: { modal: {} },
      body: ["Washington DC, Maryland & Northern Virginia", "Airports: IAD, DCA & BWI"] },
    { lead: ico("clock"), title: "Operating Hours", act: { modal: {} }, body: ["24 Hours / 7 Days a Week", "Including holidays"] },
  ] : [
    { lead: ico("phone"), title: "Call Us", act: tel, body: [SITE.phone.display, "Available 24/7 for bookings"] },
    { lead: ico("mail"), title: "Email Us", act: mail, body: [SITE.email, SITE.responsePromise] },
    { lead: ico("pin"), title: "Our Office", act: { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`, external: true, cue: "Get directions" },
      body: [addr, "Serving Washington DC, Maryland & Virginia"] },
    { lead: ico("clock"), title: "Operating Hours", act: { modal: {} }, body: ["24 Hours / 7 Days a Week", "Including holidays"] },
  ];
  return `
    <section class="section ${alt ? "section--alt" : ""}" aria-labelledby="contact-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Get In Touch</span>
          <h2 id="contact-title">Contact Us</h2>
          <p class="text-secondary">Have questions? Reach out to us anytime. We're here to assist you 24/7.</p>
        </div>
        <ul class="contact-grid">
          ${cards.map((c) => cbox({ cls: "contact-card card-surface", lead: c.lead, title: c.title, act: c.act, future: c.future, futureCue: c.futureCue,
            bodyHtml: `<p>${esc(c.body[0])}<br>${esc(c.body[1])}</p>` })).join("\n          ")}
        </ul>
        ${ig ? `<div class="contact-social">
          <a class="contact-social__chip" href="${esc(ig)}" target="_blank" rel="noopener">
            <span class="contact-social__ico">${igSvg}</span>Follow us on Instagram
          </a>
        </div>` : ""}
      </div>
    </section>`;
}

/**
 * "Know Before You Book" premium card (gold border + glow + glowing bullets).
 * Answers come from SITE.knowBeforeYouBook. `level` sets the heading tag so the
 * card can sit under a page H2 (level 3) or be a section heading itself (2).
 */
export function knowBeforeYouBookCard({ level = 3, id = "", pickup } = {}) {
  return cbox({
    tag: "div", cls: "includes-note card-surface", title: "Know Before You Book",
    titleTag: `h${level}`, titleCls: "includes-note__title", titleId: id,
    act: { modal: pickup ? { pickup } : {} },
    bodyHtml: `
            <p class="includes-note__lede">Good questions to ask before any booking:</p>
            <ul>
              ${SITE.knowBeforeYouBook.map((k) => `<li><strong>${esc(k.q)}</strong><span>${esc(k.a)}</span></li>`).join("\n              ")}
            </ul>`,
  });
}

/**
 * "Three Steps" section — gold number circles with glow + continuous ripple
 * (disabled under prefers-reduced-motion in styles.css). `prefillPickup`
 * prefills the quote popup's pickup field from the CTA button.
 */
export function threeStepsSection({ alt = true, prefillPickup = "" } = {}) {
  const steps = [
    ["01", "Tell us your trip", "Enter your pickup, drop-off, travel date, and the other trip details."],
    ["02", "Confirm your reservation", "Send your booking request through our secure online booking flow."],
    ["03", "Ride in comfort", "Your chauffeur arrives punctually in an immaculate luxury vehicle."],
  ];
  const modal = { modal: prefillPickup ? { pickup: prefillPickup } : {} };
  const pre = prefillPickup ? ` data-prefill-pickup="${esc(prefillPickup)}"` : "";
  return `
    <section class="section${alt ? " section--alt" : ""}" aria-labelledby="steps-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Reserve in Advance</span>
          <h2 id="steps-title">Three Steps to Your Ride</h2>
          <p class="text-secondary">A simple booking experience, from your trip details to your destination.</p>
        </div>
        <ol class="steps-timeline">
          ${steps.map(([n, t, d]) => cbox({ cls: "steps-node", lead: `<span class="steps-node__num">${n}</span>`, title: t, titleCls: "steps-node__title", act: modal, bodyHtml: `<p class="steps-node__desc">${esc(d)}</p>` })).join("\n          ")}
        </ol>
        <div style="text-align:center;margin-top:2.5rem"><button type="button" class="btn btn-primary" data-open-quote aria-haspopup="dialog"${pre}>${btnIcon("calendar")}Start Your Quote</button></div>
      </div>
    </section>`;
}

/* ========================================================================
 * Landing-page template sections (used by templates/landing.js).
 * Every function takes (opts, { alt }) and returns one <section>. `alt`
 * alternates the background (#0A0A0A / #101010); landing.js sets it.
 * ======================================================================== */

const secClass = (alt, extra = "") => `section${alt ? " section--alt" : ""}${extra ? " " + extra : ""}`;
const head = ({ eyebrow, h2, id, lede, ledeHtml }) => `
        <div class="section-head">
          ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ""}
          ${h2 ? `<h2 id="${esc(id)}">${esc(h2)}</h2>` : ""}
          ${ledeHtml || lede ? `<p class="text-secondary">${ledeHtml || esc(lede)}</p>` : ""}
        </div>`;

/** 1 · Split hero: photo background (srcset, preloaded) + dark overlay; copy,
 *  chips and CTAs left; the quote card right (stacks under the copy on mobile). */
export function heroSplit(o) {
  const { base, widths, width, height, alt } = o.image;
  const set = (ext) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  const pre = (o.prefillPickup ? ` data-prefill-pickup="${esc(o.prefillPickup)}"` : "") + (o.prefillDropoff ? ` data-prefill-dropoff="${esc(o.prefillDropoff)}"` : "");
  return `
    <section class="lp-hero" aria-labelledby="lp-h1">
      <picture class="lp-hero__bg">
        <source type="image/webp" srcset="${set("webp")}" sizes="100vw">
        <img src="${base}-${widths[1]}.jpg" srcset="${set("jpg")}" sizes="100vw" alt="${esc(alt)}" width="${width}" height="${height}" fetchpriority="high" decoding="async">
      </picture>
      <div class="lp-hero__overlay" aria-hidden="true"></div>
      <div class="container lp-hero__grid${o.form === false ? " lp-hero__grid--solo" : ""}">
        <div class="lp-hero__copy">
          <p class="lp-eyebrow">${esc(o.eyebrow)}</p>
          <h1 id="lp-h1">${o.h1Html || esc(o.h1)}</h1>
          <p class="lp-hero__answer">${o.answerHtml}</p>
          ${o.chips && o.chips.length ? `<ul class="lp-chips">
            ${o.chips.map((c) => `<li>${icon(c.icon)}<span>${esc(c.text)}</span></li>`).join("\n            ")}
          </ul>` : ""}
          <div class="lp-hero__actions">
            <button type="button" class="btn btn-primary" data-open-quote${pre}>${icon("calendar", { size: 18, cls: "lp-ico lp-ico--btn" })}Get Your Instant Quote</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${icon("phone", { size: 18, cls: "lp-ico lp-ico--btn" })}Call Now ${esc(SITE.phone.display)}</a>
          </div>
        </div>
        ${o.form === false ? "" : quoteForm(o.formId, { heading: o.formHeading, location: o.formLocation, prefill: { pickup: o.prefillPickup, dropoff: o.prefillDropoff } })}
      </div>
    </section>`;
}

/** 2 · Trust strip: visible eyebrow + compact H2, then one row of icon tiles. */
export function trustStrip(o, { alt } = {}) {
  // Optional airport-overview strip (label + value facts). Opt-in: only pages
  // that pass `o.facts` render it, so other trust strips are unchanged.
  const overview = o.facts && o.facts.length ? `
        <ul class="lp-overview" aria-label="${esc(o.factsLabel || "Overview")}">
          ${o.facts.map((f) => `<li class="lp-overview__item"><span class="lp-overview__ico" aria-hidden="true">${icon(f.icon, { size: 20 })}</span><span class="lp-overview__text"><span class="lp-overview__label">${esc(f.label)}</span><span class="lp-overview__value">${esc(f.value)}</span></span></li>`).join("\n          ")}
        </ul>` : "";
  return `
    <section class="${secClass(alt, "lp-trust")}" aria-labelledby="${esc(o.id)}">
      <div class="container">
        <div class="lp-trust__head">
          <span class="eyebrow">${esc(o.eyebrow)}</span>
          <h2 id="${esc(o.id)}" class="lp-h2-compact">${esc(o.h2)}</h2>
        </div>${overview}
        <ul class="lp-trust__tiles">
          ${o.tiles.map((t) => cbox({ cls: "lp-trust__tile", lead: icon(t.icon), title: t.text, titleTag: "p", act: t.act, cue: t.cue, future: t.future })).join("\n          ")}
        </ul>
      </div>
    </section>`;
}

/** 3 · Intro: two short answer-first columns, each with its own query H2. */
export function introSplit(o, { alt } = {}) {
  // Optional section-level H2 (opt-in). When present the section is labelled by
  // it and the column headings drop to H3 for correct heading hierarchy.
  const colTag = o.colTitleTag || "h2";
  const head = (o.eyebrow || o.h2)
    ? `<div class="section-head">${o.eyebrow ? `<span class="eyebrow">${esc(o.eyebrow)}</span>` : ""}${o.h2 ? `<h2${o.h2Id ? ` id="${esc(o.h2Id)}"` : ""}>${esc(o.h2)}</h2>` : ""}</div>`
    : "";
  const label = o.h2 && o.h2Id ? ` aria-labelledby="${esc(o.h2Id)}"` : ` aria-label="${esc(o.label)}"`;
  return `
    <section class="${secClass(alt, "lp-intro")}"${label}>
      <div class="container">
        ${head}
        <div class="lp-intro__cols">
          ${o.cols.map((c) => cbox({ tag: "div", cls: "lp-intro__col", lead: icon(c.icon), title: c.h2, titleTag: colTag, titleId: c.id, act: c.act, cue: c.cue, bodyHtml: c.html })).join("\n          ")}
        </div>
        ${o.sourcesHtml ? `<p class="source-note">${o.sourcesHtml}</p>` : ""}
      </div>
    </section>`;
}

const AMENITY_ICON = { "Wi-Fi": "wifi", "Leather seats": "seat", "Climate control": "thermo", "USB charging": "plug" };

/** 4 · Fleet with the traveler/bag picker. Cards carry data-pax / data-bags
 *  from CAPACITY; client JS highlights the best fit and dims the rest. */
export function fleetPicker(o, { alt } = {}) {
  const pre = o.prefillPickup ? ` data-prefill-pickup="${esc(o.prefillPickup)}"` : "";
  const bands = o.bands
    .map((b, i) => `<label class="lp-seg__opt"><input type="radio" name="lp-travelers" value="${b.max}"${i === -1 ? " checked" : ""}><span>${esc(b.label)}</span></label>`)
    .join("");
  const cards = SITE.fleet
    .map(
      (v) => `
          <li class="lp-vcard card-surface" data-fleet-card data-pax="${v.seats}" data-bags="${v.bags ?? 0}" data-name="${esc(v.name)}">
            <div class="lp-vcard__media">
              ${fleetPicture(v, { alt: `Landio ${v.name} for DC-area airport transfers` })}
              <span class="lp-vcard__fit" aria-hidden="true">${icon("check", { size: 14 })}Best fit</span>
            </div>
            <div class="lp-vcard__body">
              <h3>${esc(v.name)}</h3>
              <ul class="lp-vcard__specs">
                <li>${icon("users", { size: 20 })}<strong>${v.seats}</strong> passengers</li>
                ${v.bags ? `<li>${icon("luggage", { size: 20 })}<strong>${v.bags}</strong> bags</li>` : ""}
              </ul>
              <ul class="lp-vcard__chips">
                ${(v.amenities || []).map((a) => `<li>${icon(AMENITY_ICON[a] || "check", { size: 16 })}${esc(a)}</li>`).join("")}
              </ul>
              <div class="lp-vcard__actions">
                <button type="button" class="btn btn-primary" data-open-quote${pre} data-prefill-vehicle="${esc(v.name)}">Book This Vehicle</button>
                <a class="btn btn-ghost" href="/fleet/${esc(v.slug)}/">View Details<span class="sr-only">: ${esc(v.name)}</span></a>
              </div>
            </div>
          </li>`
    )
    .join("");
  return `
    <section class="${secClass(alt, "lp-fleet")}" aria-labelledby="${esc(o.id)}">
      <div class="container">
        ${head({ eyebrow: o.eyebrow, h2: o.h2, id: o.id, lede: o.lede })}
        <div class="lp-picker" data-fleet-picker>
          <fieldset class="lp-picker__group">
            <legend>How many travelers?</legend>
            <div class="lp-seg">${bands}</div>
          </fieldset>
          <div class="lp-picker__bags" role="group" aria-labelledby="lp-bags-label">
            <span id="lp-bags-label" class="lp-picker__label">Bags</span>
            <button type="button" class="lp-step" data-bags-dec aria-label="Fewer bags">${icon("minus", { size: 18 })}</button>
            <output class="lp-step__value" data-bags-value aria-live="polite">1</output>
            <button type="button" class="lp-step" data-bags-inc aria-label="More bags">${icon("plus", { size: 18 })}</button>
          </div>
          <p class="lp-picker__result" data-fit-result aria-live="polite">Pick your group size to see the best fit.</p>
        </div>
        <ul class="lp-fleet__row" data-fleet-row>${cards}</ul>
        ${o.moreHtml ? `<p class="lp-more">${o.moreHtml}</p>` : ""}
      </div>
    </section>`;
}

/** Shared ARIA tabs markup. Panels are server-rendered (crawlable); without JS
 *  every panel shows and the tab list is hidden (see .js rules in CSS). */
function tabs(idBase, label, items) {
  const tabsHtml = items
    .map((t, i) => `<button type="button" role="tab" class="lp-tab${i === 0 ? " is-active" : ""}" id="${idBase}-tab-${i}" aria-controls="${idBase}-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(t.label)}</button>`)
    .join("");
  const panels = items
    .map((t, i) => `<div role="tabpanel" class="lp-tabpanel${i === 0 ? " is-active" : ""}" id="${idBase}-panel-${i}" aria-labelledby="${idBase}-tab-${i}" tabindex="0">${t.html}</div>`)
    .join("\n");
  return `
        <div class="lp-tabs" data-tabs>
          <div class="lp-tabs__list" role="tablist" aria-label="${esc(label)}">${tabsHtml}</div>
          ${panels}
        </div>`;
}

/** 5 · Tabbed visual timeline (e.g. Domestic / International terminal pickup). */
export function tabbedTimeline(o, { alt } = {}) {
  const items = o.tabs.map((t) => ({
    label: t.label,
    html: `
            <h3 class="lp-tabpanel__title">${esc(t.title)}</h3>
            <ol class="lp-timeline">
              ${t.steps.map((st, i) => cbox({
                cls: "lp-timeline__step", titleTag: "p", titleCls: "lp-timeline__t", title: st.title,
                lead: `<span class="lp-timeline__dot">${icon(st.icon)}<span class="lp-timeline__n">${i + 1}</span></span>`,
                act: t.act, cue: t.cue, future: t.future, futureCue: t.futureCue,
                bodyHtml: `<span class="lp-timeline__d">${esc(st.text)}</span>`,
              })).join("\n              ")}
            </ol>
            ${cbox({ tag: "div", cls: "lp-tabpanel__point", lead: icon(t.pointIcon || "pin", { size: 18 }), titleTag: "p", titleCls: "lp-point__t",
                     title: t.pointTitle || "Meeting point", act: t.act, cue: t.pointCue || t.cue, future: t.future, futureCue: t.futureCue,
                     bodyHtml: `<span class="lp-point__d">${esc(t.point)}</span>` })}
            ${t.linksHtml ? `<p class="lp-tabpanel__links">${t.linksHtml}</p>` : ""}`,
  }));
  return `
    <section class="${secClass(alt, "lp-terminals")}" aria-labelledby="${esc(o.id)}">
      <div class="container">
        ${head({ eyebrow: o.eyebrow, h2: o.h2, id: o.id, ledeHtml: o.ledeHtml })}
        ${tabs(o.idBase, o.tabsLabel, items)}
        ${o.footHtml ? `<p class="source-note">${o.footHtml}</p>` : ""}
      </div>
    </section>`;
}

/** Route table rows: a link to the route page + a separate Quote button that
 *  prefills pickup and drop-off (no nested interactive elements). */
export function rideTable(list, caption, pickup) {
  const rows = list
    .map(
      (r) => `<tr>
              <th scope="row"><a class="ride-link" href="${esc(r.path)}">${esc(r.label)}</a></th>
              <td><button type="button" class="btn btn-ghost ride-quote" data-open-quote data-route-from="${esc(pickup)}" data-route-to="${esc(r.area)}" aria-label="Get a quote: ${esc(r.label)}">Quote</button></td>
            </tr>`
    )
    .join("\n            ");
  return `
          <div class="table-wrap">
            <table class="data-table ride-table">
              <caption class="sr-only">${esc(caption)}</caption>
              <thead><tr><th scope="col">Ride</th><th scope="col">Book</th></tr></thead>
              <tbody>
            ${rows}
              </tbody>
            </table>
          </div>`;
}

/** 7 · Popular routes in tabs (one tab per group). */
export function tabbedRoutes(o, { alt } = {}) {
  const items = o.groups.map((g) => ({ label: g.label, html: rideTable(g.routes, g.caption, o.pickup) }));
  return `
    <section class="${secClass(alt, "lp-routes")}" aria-labelledby="${esc(o.id)}">
      <div class="container lp-narrow">
        ${head({ eyebrow: o.eyebrow, h2: o.h2, id: o.id, lede: o.lede })}
        ${tabs(o.idBase, o.tabsLabel, items)}
        ${o.moreHtml ? `<p class="lp-more">${o.moreHtml}</p>` : ""}
      </div>
    </section>`;
}

/** 8 · Static icon grid (title + ≤20 words). Deliberately not interactive. */
export function iconGrid(o, { alt } = {}) {
  return `
    <section class="${secClass(alt, "lp-why")}" aria-labelledby="${esc(o.id)}">
      <div class="container">
        ${head({ eyebrow: o.eyebrow, h2: o.h2, id: o.id, lede: o.lede })}
        <ul class="lp-icongrid">
          ${o.items.map((it) => cbox({ cls: "lp-icongrid__item card-surface", lead: `<span class="lp-icon-badge">${icon(it.icon)}</span>`, title: it.title,
            act: it.act || { modal: {} }, cue: it.cue, future: it.future, bodyHtml: `<p>${esc(it.text)}</p>` })).join("\n          ")}
        </ul>
      </div>
    </section>`;
}

/** 9 / 12 · Whole-card links. Items with `requires` render only once that page
 *  exists (build.js resolves data-requires and drops the rest). */
export function linkCards(o, { alt } = {}) {
  // `requires` = informational future page: the card stays hidden until the page
  // exists (build.js). Use `future` instead when a quote modal is a fair stand-in.
  const card = (it) => {
    const html = cbox({ cls: "lp-linkcard card-surface", lead: `<span class="lp-icon-badge">${icon(it.icon)}</span>`, title: it.title,
      act: it.act || { href: it.href, cue: it.cta }, future: it.future, bodyHtml: `<p class="lp-linkcard__text">${esc(it.text)}</p>` });
    return it.requires ? html.replace(/^<li /, `<li data-requires="${esc(it.requires)}" `) : html;
  };
  return `
    <section class="${secClass(alt, "lp-links")}" aria-labelledby="${esc(o.id)}">
      <div class="container">
        ${head({ eyebrow: o.eyebrow, h2: o.h2, id: o.id, lede: o.lede })}
        <ul class="lp-linkcards">${o.items.map(card).join("")}</ul>
      </div>
    </section>`;
}

/** 10 · Know Before You Book as its own section. */
export function kbybSection(o = {}, { alt } = {}) {
  return `
    <section class="${secClass(alt)}" aria-labelledby="kbyb-title">
      <div class="container kbyb-solo">
        ${knowBeforeYouBookCard({ level: 2, id: "kbyb-title", pickup: o.pickup })}
      </div>
    </section>`;
}

/** Key facts as a definition list (event date, venue, address…). Not boxes —
 *  plain reference data, so nothing here is clickable except inline links. */
export function factsSection(o, { alt } = {}) {
  return `
    <section class="${secClass(alt, "lp-factsec")}" aria-labelledby="${esc(o.id)}">
      <div class="container lp-narrow">
        ${head({ eyebrow: o.eyebrow, h2: o.h2, id: o.id, lede: o.lede, ledeHtml: o.ledeHtml })}
        <dl class="lp-facts">
          ${o.items.map((it) => `<div class="lp-facts__row"><dt>${esc(it.label)}</dt><dd>${it.html || esc(it.value)}</dd></div>`).join("\n          ")}
        </dl>
        ${o.sourcesHtml ? `<p class="source-note">${o.sourcesHtml}</p>` : ""}
      </div>
    </section>`;
}

/** Short running text in tabs (≤ 120 words per panel). One tab → no tab UI. */
export function tabbedText(o, { alt } = {}) {
  const panel = (t) => `${t.title ? `<h3 class="lp-tabpanel__title">${esc(t.title)}</h3>` : ""}<div class="lp-prose">${t.html}</div>`;
  const body = o.tabs.length === 1 ? panel(o.tabs[0]) : tabs(o.idBase, o.tabsLabel, o.tabs.map((t) => ({ label: t.label, html: panel(t) })));
  return `
    <section class="${secClass(alt, "lp-text")}" aria-labelledby="${esc(o.id)}">
      <div class="container lp-narrow">
        ${head({ eyebrow: o.eyebrow, h2: o.h2, id: o.id, lede: o.lede, ledeHtml: o.ledeHtml })}
        ${body}
        ${o.sourcesHtml ? `<p class="source-note">${o.sourcesHtml}</p>` : ""}
      </div>
    </section>`;
}

/** Comparison table; stacks into labelled rows under 600px. Cells may hold HTML. */
export function tableSection(o, { alt } = {}) {
  const rows = o.rows
    .map((r) => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map((c, i) => `<td data-label="${esc(o.head[i + 1])}">${c}</td>`).join("")}</tr>`)
    .join("\n              ");
  return `
    <section class="${secClass(alt, "lp-tablesec")}" aria-labelledby="${esc(o.id)}">
      <div class="container lp-narrow">
        ${head({ eyebrow: o.eyebrow, h2: o.h2, id: o.id, lede: o.lede, ledeHtml: o.ledeHtml })}
        <div class="table-wrap">
          <table class="data-table data-table--stack">
            <caption class="sr-only">${esc(o.caption)}</caption>
            <thead><tr>${o.head.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
        ${o.sourcesHtml ? `<p class="source-note">${o.sourcesHtml}</p>` : ""}
      </div>
    </section>`;
}

/**
 * Google Reviews — shared renderer (homepage + airport pages). Google reviews
 * can't be fetched from the API without billing, so this shows a premium Google
 * badge + "Read More Google Reviews" CTA. Review cards render ONLY when genuine
 * reviews are pasted into REVIEWS below — never invent names, text, or ratings.
 * Defaults reproduce the homepage section exactly; pass opts to retheme (e.g.
 * an airport page's heading).
 */
export function googleReviews({
  id = "rv-title",
  eyebrow = "Client Reviews",
  h2 = "What Our Clients Say",
  lede = "Clients across Washington, DC, Maryland, and Northern Virginia share their Landio Limo Services experience on Google. Read their reviews — and leave your own.",
  ctaLabel = "Read More Google Reviews",
  alt = true,
} = {}) {
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
    <section class="section${alt ? " section--alt" : ""} rv-section" aria-labelledby="${esc(id)}">
      <div class="container">
        <div class="rv-head">
          <span class="eyebrow">${esc(eyebrow)}</span>
          <h2 id="${esc(id)}">${esc(h2)}</h2>
          <p class="text-secondary">${esc(lede)}</p>
          <span class="rv-badge">${googleG}<span>Reviews on Google</span></span>
        </div>
        ${REVIEWS.length ? `<ul class="rv-grid">${REVIEWS.map(card).join("")}\n        </ul>` : ""}
        <div class="rv-cta">
          <a class="btn btn-primary" href="${REVIEWS_URL}" target="_blank" rel="noopener">${esc(ctaLabel)}</a>
        </div>
      </div>
    </section>`;
}

/**
 * Reusable auto-scrolling photo strip — the exact homepage Instagram marquee
 * mechanism (.ig-slider / .ig-track--marquee: seamless CSS loop, pauses on
 * hover/focus, static under prefers-reduced-motion), but without any Instagram
 * branding or links. Pass a list of { webp, jpg, alt } images. Slides render
 * twice so the -50% loop is seamless. Used for the airport-page fleet showcase.
 */
export function photoMarquee(images) {
  const slide = (g, dup) => `
            <li class="ig-slide"${dup ? ' aria-hidden="true"' : ""}>
              <div class="ig-slide__link">
                <picture>
                  <source type="image/webp" srcset="${g.webp}">
                  <img class="ig-slide__img" src="${g.jpg}" alt="${dup ? "" : esc(g.alt)}" loading="lazy" decoding="async" width="500" height="625">
                </picture>
              </div>
            </li>`;
  const slides = images.map((g) => slide(g, false)).join("") + images.map((g) => slide(g, true)).join("");
  return `
          <div class="ig-slider">
            <ul class="ig-track ig-track--marquee">${slides}
            </ul>
          </div>`;
}

/**
 * Airport "At a Glance" panel — a premium dark panel with a heading + key-stat
 * row, a 3×2 grid of information cards, and an airport-specific summary with a
 * gold left border. Every stat and every card is a real link (on-page anchor or
 * existing page) — no dead links. Used by the three airport pages.
 *
 *   stats: [{ num, label, href }]
 *   cards: [{ icon, title, desc, href }]
 */
export function airportGlance({ id, title, stats, cards, summary, alt = false }) {
  const stat = (s) => `
              <li><a class="lp-glance__stat" href="${esc(s.href)}">
                <span class="lp-glance__num">${esc(s.num)}</span>
                <span class="lp-glance__stat-label">${esc(s.label)}</span>
              </a></li>`;
  const card = (c) => `
            <li><a class="lp-glance__card" href="${esc(c.href)}">
              <span class="lp-glance__badge" aria-hidden="true">${icon(c.icon)}</span>
              <span class="lp-glance__card-body">
                <span class="lp-glance__card-title">${esc(c.title)}</span>
                <span class="lp-glance__card-desc">${esc(c.desc)}</span>
              </span>
              <span class="lp-glance__arrow" aria-hidden="true">${icon("arrow", { size: 16 })}</span>
            </a></li>`;
  return `
    <section class="${alt ? "section section--alt" : "section"} lp-glance" aria-labelledby="${esc(id)}">
      <div class="container">
        <div class="lp-glance__panel">
          <div class="lp-glance__top">
            <div class="lp-glance__intro">
              <span class="eyebrow">At a Glance</span>
              <h2 id="${esc(id)}" class="lp-glance__title">${esc(title)}</h2>
            </div>
            <ul class="lp-glance__stats">${stats.map(stat).join("")}
            </ul>
          </div>
          <ul class="lp-glance__cards">${cards.map(card).join("")}
          </ul>
          <p class="lp-glance__summary">${esc(summary)}</p>
        </div>
      </div>
    </section>`;
}
