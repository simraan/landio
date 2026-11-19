/**
 * Shared layout partials — header with dropdown nav, dark footer, and the
 * reusable multi-step quote form used in the hero, page heroes, the booking
 * popup, and Reservations. All NAP/nav/brand data comes from the SSOT
 * (config.js). The quote form POSTs to /api/lead (handler stubbed for now).
 */

import { SITE, ATL_HUB_PATH, ATL_TERMINALS, HUBS, GUIDES, AREAS, VENUES, EVENTS, isBuilt } from "../config.js";
import { icon } from "./icons.js";

export const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Aura Hamptons wordmark (gold SUV lockup on near-black; blends on the dark
// header/footer). Client-supplied PNG, 600×240 (2.5:1).
const LOGO = "/assets/img/brand/aura-hamptons-logo.png";
const LOGO_FOOTER = "/assets/img/brand/aura-hamptons-logo.png";

/** Small icon for inside a button (uses the provided SVG set). */
// Button icons come from the shared inline line set (templates/icons.js): one
// consistent style sitewide, no image requests. `eager` is kept for call sites
// but no longer matters (inline SVG never lazy-loads).
const BTN_ICON = { calendar: "calendar", call: "phone", phone: "phone", envelope: "mail", airplane: "plane", handshake: "sign", map: "pin" };
export const btnIcon = (name, _opts = {}) =>
  icon(BTN_ICON[name] || name, { size: 18, cls: "btn-ico lp-ico lp-ico--btn" });

/** Simple inline phone glyph (inherits button text color). */
export const phoneSvg = `<svg class="btn-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5c0 8 7 15 15 15l-2-4-4 1c-2-1-4-3-5-5l1-4z"/></svg>`;

/**
 * Optional SMS opt-in (A2P 10DLC). Wording mirrors Terms §7. UNCHECKED by
 * default and never required — the form submits with or without it.
 */
export function smsConsent(id) {
  return `
        <div class="qf-consent">
          <input type="checkbox" id="${esc(id)}-sms" name="sms_consent" value="yes">
          <label for="${esc(id)}-sms"><strong>Optional:</strong> I agree to receive SMS communications from ${esc(SITE.legalName)} at ${esc(SITE.smsNumber)} regarding reservation confirmations, driver dispatch notifications, appointment reminders, service updates, and customer support communications. Message frequency varies based on your booking activity. Message and data rates may apply. Consent to receive SMS messages is not a condition of purchase. Reply STOP to opt out; reply HELP for assistance.</label>
        </div>
        <p class="qf-consent__links">See our <a href="/terms-of-service/">Terms</a> and <a href="/privacy-policy/">Privacy Policy</a>.</p>`;
}

/**
 * Responsive fleet photo: WebP srcset (640/1024) with a JPEG fallback, lazy.
 * Use everywhere a vehicle image appears so no page ships the multi-MB originals.
 */
export function fleetPicture(v, { alt, sizes = "(min-width: 900px) 33vw, 85vw", width = 640, height = 360, cls = "" } = {}) {
  const b = v.imageBase;
  return `<picture><source type="image/webp" srcset="${b}-640.webp 640w, ${b}-1024.webp 1024w" sizes="${sizes}"><img src="${b}-1024.jpg" srcset="${b}-640.jpg 640w, ${b}-1024.jpg 1024w" sizes="${sizes}" alt="${esc(alt)}" loading="lazy" decoding="async" width="${width}" height="${height}"${cls ? ` class="${cls}"` : ""}></picture>`;
}

export function brand(href = "/") {
  return `<a class="brand" href="${esc(href)}" aria-label="${esc(SITE.company)} — home">
    <img class="brand__logo" src="${LOGO}" alt="${esc(SITE.company)}" width="155" height="62" style="width:155px;height:62px;max-width:none">
  </a>`;
}

/**
 * Dropdown children per nav group, generated from the page maps (config.js).
 * Links to pages that aren't built yet are skipped (isBuilt), so the menu
 * grows on its own as pages ship. `{ group }` entries are visual labels.
 */
function navChildren(key) {
  const link = (label, href) => ({ label, href });
  switch (key) {
    case "airport":
      return [
        link("Atlanta Airport Car Service", ATL_HUB_PATH),
        link("Domestic Terminal pickup", ATL_TERMINALS.domestic.page),
        link("International Terminal pickup", ATL_TERMINALS.international.page),
        link("ATL Airport Guide", HUBS.guides.path),
        ...GUIDES.map((g) => link(g.title, g.path)),
      ];
    case "services":
      return [
        ...SITE.services.filter((s) => s.url !== ATL_HUB_PATH && s.slug !== "fbo-private-jet").map((s) => link(s.title, s.url)),
        isBuilt(HUBS.fbo.path) ? link("Private Jet & FBO Transfers", HUBS.fbo.path) : link("Private Jet & FBO Transfers", "/services/fbo-private-jet/"),
        link("All services & destinations", HUBS.services.path),
      ];
    case "areas":
      return [link("All areas we serve", HUBS.areas.path), ...AREAS.map((a) => link(a.name, a.path))];
    case "venues":
      return [link("All venues", HUBS.venues.path), ...VENUES.map((v) => link(v.name, v.path))];
    case "events":
      return [link("All events", HUBS.events.path), ...EVENTS.map((e) => link(e.name, e.path))];
    default:
      return [];
  }
}

/** Is this top-level nav item the current page (incl. its dropdown children)? */
function isActiveNav(item, currentPath) {
  if (item.href === currentPath) return true;
  return navChildren(item.children).some((c) => c.href === currentPath);
}

function navItems(currentPath = "/") {
  return SITE.nav
    .filter((item) => isBuilt(item.href))
    .map((item, n) => {
      const active = isActiveNav(item, currentPath);
      const kids = navChildren(item.children).filter((c) => c.group || isBuilt(c.href));
      // Drop group labels with nothing under them.
      const items = kids.filter((c, i) => !c.group || (kids[i + 1] && !kids[i + 1].group));
      if (items.some((c) => !c.group && c.href !== item.href)) {
        const id = `nav-sub-${n}`;
        const cols = items.length > 8 ? " dropdown--cols" : "";
        const sub = items
          .map((c) => (c.group ? `<li class="dropdown__group" aria-hidden="true">${esc(c.group)}</li>` : `<li><a href="${esc(c.href)}"${c.href === currentPath ? ' aria-current="page"' : ""}>${esc(c.label)}</a></li>`))
          .join("");
        return `<li class="has-dropdown${active ? " is-active" : ""}">
          <a class="site-nav__toplabel" href="${esc(item.href)}"${item.href === currentPath ? ' aria-current="page"' : ""}>${esc(item.label)}</a><button type="button" class="nav-sub" aria-expanded="false" aria-controls="${id}"><span class="sr-only">${esc(item.label)} menu</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
          <ul class="dropdown${cols}" id="${id}">${sub}</ul>
        </li>`;
      }
      return `<li><a${active ? ' class="is-active"' : ""} href="${esc(item.href)}"${item.href === currentPath ? ' aria-current="page"' : ""}>${esc(item.label)}</a></li>`;
    })
    .join("\n          ");
}

/** Thin announcement bar above the header (gold, dark accents). */
export function topbar() {
  return `
  <div class="topbar">
    <div class="container topbar__inner">
      <span class="topbar__left"><span class="topbar__dot" aria-hidden="true"></span>24/7 Chauffeured Service &middot; Washington, DC, Maryland &amp; Virginia</span>
      <span class="topbar__right">
        <a href="tel:${esc(SITE.phone.e164)}">${phoneSvg}${esc(SITE.phone.display)}</a>
        <a href="mailto:${esc(SITE.email)}"><svg class="btn-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>${esc(SITE.email)}</a>
      </span>
    </div>
  </div>`;
}

export function header(currentPath = "/") {
  return `
  ${topbar()}
  <header class="site-header site-header--dark">
    <div class="container site-header__inner">
      ${brand()}
      <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
        <span class="nav-toggle__bar" aria-hidden="true"></span>
        <span class="nav-toggle__bar" aria-hidden="true"></span>
        <span class="nav-toggle__bar" aria-hidden="true"></span>
      </button>
      <nav id="primary-nav" class="site-nav" aria-label="Primary">
        <ul class="site-nav__list">
          ${navItems(currentPath)}
        </ul>
      </nav>
      <a class="btn btn-primary site-header__phone" href="tel:${esc(SITE.phone.e164)}">${btnIcon("call", { eager: true })}Call Now <span class="site-header__phone-num">${esc(SITE.phone.display)}</span></a>
    </div>
  </header>`;
}

/* ------------------------------------------------------------------ *
 * Reusable multi-step quote form (hero / page heroes / popup / reservations).
 * `id` must be unique per instance on a page. POSTs to /api/lead.
 * ------------------------------------------------------------------ */
export function quoteForm(id, { heading = "Instant Quote", location = "hero", prefill = {} } = {}) {
  const pre = (name) => (prefill[name] ? ` value="${esc(prefill[name])}"` : "");
  // Pickup/drop-off autocomplete: the airports we serve + Hamptons / NYC
  // corridor places. Native <datalist>, zero dependencies.
  const PLACES = [
    "Washington Dulles International Airport (IAD)",
    "Ronald Reagan Washington National Airport (DCA)",
    "Baltimore/Washington International Airport (BWI)",
    "Washington, DC",
    "Bethesda, MD",
    "Rockville, MD",
    "Silver Spring, MD",
    "Germantown, MD",
    "Gaithersburg, MD",
    "Potomac, MD",
    "Chevy Chase, MD",
    "National Harbor, MD",
    "Annapolis, MD",
    "Baltimore, MD",
    "Arlington, VA",
    "Alexandria, VA",
    "McLean, VA",
    "Tysons, VA",
    "Fairfax, VA",
    "Reston, VA",
    "Ashburn, VA",
    "Sterling, VA",
    "Leesburg, VA",
  ];
  const placesOptions = PLACES.map((p) => `<option value="${esc(p)}"></option>`).join("");
  const swapBtn = `<button type="button" class="qf-swap" data-qf-swap aria-label="Swap pickup and drop-off"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4v16M7 4 4 7M7 4l3 3M17 20V4M17 20l-3-3M17 20l3-3"/></svg></button>`;

  // Unified custom field (cf-*): one trigger + popover component for the date
  // calendar, 15-minute time list, hours list, and phone country code. A hidden
  // input holds the value (submitted + validated); client JS (cfPickers) builds
  // the calendar/time popovers; option lists are server-rendered below.
  const cfIco = {
    date: `<svg class="cf-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>`,
    time: `<svg class="cf-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></svg>`,
    caret: `<svg class="cf-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`,
  };
  const cfField = (type, name, label, { required = false, list = "" } = {}) => `
          <div class="cf-field" data-cf="${type}" data-cf-name="${esc(name)}"${required ? " data-cf-required" : ""}>
            <button type="button" class="bf-input cf-trigger" data-cf-trigger aria-haspopup="listbox" aria-expanded="false">
              <span class="cf-value cf-placeholder" data-cf-display>${esc(label)}</span>${cfIco[type] || cfIco.caret}
            </button>
            <input type="hidden" name="${esc(name)}" data-cf-input>
            <div class="cf-pop" data-cf-pop hidden>${list}</div>
          </div>`;
  const hoursList = `<ul class="cf-list" role="listbox">${["2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"].map((h) => `<li role="option"><button type="button" class="cf-opt" data-value="${h} hours">${h} hours</button></li>`).join("")}</ul>`;
  const ccList = `<ul class="cf-list" role="listbox">${[["+1", "US +1"], ["+91", "IN +91"], ["+1", "CA +1"], ["+44", "GB +44"], ["+61", "AU +61"], ["+971", "AE +971"], ["+49", "DE +49"], ["+33", "FR +33"], ["+52", "MX +52"], ["+55", "BR +55"]].map(([v, l]) => `<li role="option"><button type="button" class="cf-opt" data-value="${v}" data-label="${l}">${l}</button></li>`).join("")}</ul>`;

  // Step 2 — vehicle selection cards. SSOT: SITE.fleet (5 vehicle classes).
  const vIco = `<svg class="qf-vcard__ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
  const vcards = SITE.fleet
    .map((v) => `
          <button type="button" class="qf-vcard" data-qf-vehicle data-vehicle="${esc(v.name)}" data-seats="${v.seats}" role="radio" aria-checked="false">
            <span class="qf-vcard__name">${vIco}${esc(v.name)}</span>
            <span class="qf-vcard__seats">Seats up to ${v.seats}</span>
          </button>`)
    .join("");

  return `
  <div class="quote-card quote-card--v2" data-quote-card>
    <div class="quote-card__head">
      <h2 class="quote-card__title">${esc(heading)}</h2>
    </div>
    <form class="quote-form quote-form--v2" id="${esc(id)}" data-quote-form data-form-location="${esc(location)}" novalidate>
      <datalist id="${esc(id)}-places">${placesOptions}</datalist>
      <div class="quote-hp" aria-hidden="true">
        <label>Company website<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label>
      </div>

      <fieldset class="quote-step" data-step="1">
        <div class="qf-tabs" role="tablist" aria-label="Trip type">
          <button type="button" class="qf-tab is-active" data-qf-tab="oneway" role="tab" aria-selected="true">One Way</button>
          <button type="button" class="qf-tab" data-qf-tab="hourly" role="tab" aria-selected="false">Hourly</button>
        </div>
        <input type="hidden" name="trip_type" value="One Way" data-qf-triptype>

        <div class="qf-locs">
          <input class="bf-input" type="text" name="pickup" placeholder="Pickup location" autocomplete="off" list="${esc(id)}-places" data-places${pre("pickup")}>
          <input class="bf-input" type="text" name="dropoff" placeholder="Drop-off location" autocomplete="off" list="${esc(id)}-places" data-places data-qf-dropoff${pre("dropoff")}>
          ${swapBtn}
        </div>

        <div class="qf-row2">
          ${cfField("date", "date", "Pickup date", { required: true })}
          ${cfField("time", "time", "Pickup time", { required: true })}
        </div>

        <div class="qf-hours" data-qf-hours hidden>
          ${cfField("hours", "hours", "How many hours?", { list: hoursList })}
        </div>

        <label class="qf-check" data-qf-returntoggle>
          <input type="checkbox" data-qf-return> <span>Add a return trip</span>
        </label>

        <div class="qf-return" data-qf-returnfields hidden>
          <p class="qf-return__eyebrow">Return</p>
          <p class="qf-return__note">Prefilled to reverse your outbound, edit if it differs.</p>
          <div class="qf-locs">
            <input class="bf-input" type="text" name="return_pickup" placeholder="Return pickup" autocomplete="off" list="${esc(id)}-places" data-places>
            <input class="bf-input" type="text" name="return_dropoff" placeholder="Return drop-off" autocomplete="off" list="${esc(id)}-places" data-places>
            ${swapBtn}
          </div>
          <div class="qf-row2">
            ${cfField("date", "return_date", "Return date")}
            ${cfField("time", "return_time", "Return time")}
          </div>
        </div>

        <div class="quote-actions quote-actions--start">
          <button type="button" class="btn btn-primary btn-block" data-quote-next>Continue <span aria-hidden="true">&rarr;</span></button>
        </div>
        <p class="qf-trust">Secure &amp; encrypted &bull; No surge pricing &bull; Quote confirmed before you book</p>
      </fieldset>

      <fieldset class="quote-step" data-step="2" hidden>
        <p class="qf-vhead">Choose your vehicle</p>
        <div class="qf-vgrid" role="radiogroup" aria-label="Preferred vehicle">${vcards}
        </div>
        <input type="hidden" name="vehicle">
        <input type="hidden" name="passengers">
        <div class="quote-actions">
          <button type="button" class="btn btn-ghost" data-quote-back="1">Back</button>
        </div>
      </fieldset>

      <fieldset class="quote-step" data-step="3" hidden>
        <div class="qf-progress qf-progress--final">
          <div class="qf-progress__row">
            <span class="qf-progress__step">One last step</span>
            <span class="qf-progress__hint">Almost there</span>
          </div>
          <div class="qf-progress__track"><span class="qf-progress__fill" style="width:90%"></span></div>
        </div>
        <div class="quote-grid quote-grid--stack">
          <label class="quote-field quote-field--full"><span>Full Name</span>
            <input class="bf-input" type="text" name="name" autocomplete="name" placeholder="Full name" required></label>
          <label class="quote-field quote-field--full"><span>Phone Number</span>
            <div class="cf-phone">
              <div class="cf-field cf-field--cc" data-cf="cc" data-cf-name="country_code">
                <button type="button" class="bf-input cf-trigger cf-cc-trigger" data-cf-trigger aria-haspopup="listbox" aria-expanded="false" aria-label="Country code"><span class="cf-value" data-cf-display>US +1</span>${cfIco.caret}</button>
                <input type="hidden" name="country_code" data-cf-input value="+1">
                <div class="cf-pop" data-cf-pop hidden>${ccList}</div>
              </div>
              <input class="bf-input" type="tel" name="phone" autocomplete="tel" placeholder="(631) 555-0142" required>
            </div>
          </label>
          <label class="quote-field quote-field--full"><span>Email</span>
            <input class="bf-input" type="email" name="email" autocomplete="email" placeholder="you@email.com" required></label>
          <label class="quote-field quote-field--full"><span>Notes <span class="cf-optional">(optional)</span></span>
            <textarea class="bf-input" name="notes" rows="3" placeholder="Airline, flight number, special requests…"></textarea></label>
        </div>
        <div class="quote-actions quote-actions--end">
          <button type="button" class="btn btn-ghost" data-quote-back="2">Back</button>
          <button type="submit" class="btn btn-primary" data-quote-submit>${btnIcon("envelope")}Submit</button>
        </div>
      </fieldset>

      <p class="quote-status" role="status" aria-live="polite" hidden></p>

      <input type="hidden" name="gclid"><input type="hidden" name="utm_source">
      <input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign">
      <input type="hidden" name="utm_term"><input type="hidden" name="utm_content">
      <input type="hidden" name="page_url"><input type="hidden" name="referrer">
      <input type="hidden" name="submitted_at"><input type="hidden" name="device_type">
      <input type="hidden" name="form_location" value="${esc(location)}">
    </form>
  </div>`;
}

/** Modal popup wrapping a quote form — opened by Book Now buttons. */
export function quoteModal() {
  return `
  <div class="quote-modal" data-quote-modal hidden aria-hidden="true">
    <div class="quote-modal__backdrop" data-quote-close></div>
    <div class="quote-modal__dialog" role="dialog" aria-modal="true" aria-label="Get your instant quote">
      <button type="button" class="quote-modal__close" data-quote-close aria-label="Close">&times;</button>
      ${quoteForm("modal-quote", { heading: "Get Your Instant Quote", location: "modal" })}
    </div>
  </div>`;
}

/**
 * Full-width conversion band shown just above the footer. Default content is
 * sitewide; a page may override the eyebrow / heading / lede and add an Email
 * action by returning a `preFooterCta` object (layout.js passes it here). With
 * no override the output is byte-identical to the sitewide band.
 */
export function preFooterCta(opts) {
  const o = opts || {};
  const eyebrow = o.eyebrow || "Reserve Your Ride";
  const heading = o.heading ? esc(o.heading) : "Ready to Experience <em>Effortless Luxury Travel?</em>";
  const lede = o.sub ? esc(o.sub) : "From airport transfers to corporate, diplomatic, and group travel, Landio delivers timeless service and seamless journeys across Washington, DC, Maryland, and Northern Virginia. Available 24/7 with professional chauffeurs.";
  const emailBtn = o.email ? `
          <a class="btn btn-ghost" href="mailto:${esc(SITE.email)}">${btnIcon("envelope")}Email Us</a>` : "";
  return `
  <section class="cta-band" aria-labelledby="cta-band-title">
    <div class="container">
      <div class="cta-band__card">
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h2 id="cta-band-title">${heading}</h2>
        <p class="cta-band__lede">${lede}</p>
        <div class="cta-band__actions">
          <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Book Your Ride</button>
          <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${esc(SITE.phone.display)}</a>${emailBtn}
        </div>
      </div>
    </div>
  </section>`;
}

/** Full-width sticky bottom CTA bar: hidden until scroll, then slides up. */
export function floatingCta() {
  return `
  <div class="floating-cta" aria-label="Quick actions" aria-hidden="true">
    <div class="container floating-cta__inner">
      <a class="btn btn-ghost floating-cta__call" href="tel:${esc(SITE.phone.e164)}">${btnIcon("call")}Call Now <span class="floating-cta__num">${esc(SITE.phone.display)}</span></a>
      <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Book Ride Now</button>
    </div>
  </div>`;
}

/** Back-to-top button (shown after the user scrolls down). */
export function scrollTop() {
  return `
  <button type="button" class="scroll-top" aria-label="Back to top" data-scroll-top>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V6M6 12l6-6 6 6"/></svg>
  </button>`;
}

export function footer(year) {
  const a = SITE.address;
  const list = (links) => links
    .filter((l) => isBuilt(l.href))
    .map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)
    .join("\n            ");
  const quick = list(SITE.footerQuickLinks);
  const support = list([...SITE.footerCompany, ...SITE.footerSupport]);
  const legalLinks = SITE.footerSupport
    .filter((l) => isBuilt(l.href))
    .map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`)
    .join('<span class="site-footer__sep">·</span>');

  const cIcon = (name) => `<span class="site-footer__cico">${icon(name, { size: 16 })}</span>`;
  const addressLine = `${a.street}, ${a.city}, ${a.region} ${a.postalCode}, ${a.countryName}`;

  // Instagram profile pulled from the single source of truth (SITE.sameAs).
  const ig = (SITE.sameAs || []).find((u) => /instagram\.com/i.test(u));
  const igSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>`;
  const navSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>`;
  const social = ig
    ? `<div class="site-footer__social">
          <a class="site-footer__social-chip" href="${esc(ig)}" target="_blank" rel="noopener" aria-label="Instagram">${igSvg}</a>
        </div>`
    : "";

  // Google Maps business listing (genuine embed — light roadmap view) + real
  // "Open in Maps" (listing CID) and "Directions" (destination coords) links.
  const MAP_EMBED = "https://www.google.com/maps?q=12410%20Milestone%20Center%20Dr%20Suite%20600,%20Germantown,%20MD%2020876&output=embed";
  const MAP_OPEN = "https://www.google.com/maps?cid=115514870756707717";
  const MAP_DIR = "https://www.google.com/maps/dir/?api=1&amp;destination=40.8839052713681,-72.39735542396555";

  return `
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <img class="site-footer__logo" src="${LOGO_FOOTER}" alt="${esc(SITE.company)}" width="185" height="74" loading="lazy" style="width:185px;height:74px;max-width:none">
          <p class="site-footer__about">Landio delivers chauffeured luxury travel across Washington, DC, Maryland, and Northern Virginia — IAD, DCA &amp; BWI airport transfers, corporate and executive travel, private aviation, diplomatic transportation, and group logistics, backed by professional chauffeurs and a meticulously maintained fleet, available 24/7.</p>
          ${social}
        </div>
        <div>
          <h2 class="site-footer__heading">Explore</h2>
          <ul class="site-footer__nav">
            ${quick}
          </ul>
        </div>
        <div>
          <h2 class="site-footer__heading">Company</h2>
          <ul class="site-footer__nav">
            ${support}
          </ul>
        </div>
        <div class="site-footer__contactcol">
          <h2 class="site-footer__heading">Contact Us</h2>
          <ul class="site-footer__contact">
            <li>${cIcon("pin")}<span>${esc(addressLine)}</span></li>
            <li>${cIcon("phone")}<a href="tel:${esc(SITE.phone.e164)}">${esc(SITE.phone.display)}</a></li>
            <li>${cIcon("mail")}<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>
          </ul>
          <div class="site-footer__map">
            <iframe src="${MAP_EMBED}" title="Landio Limo Services on Google Maps — 12410 Milestone Center Dr, Germantown, MD" width="340" height="180" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <p class="site-footer__maplabel"><span class="site-footer__maplabel-pin" aria-hidden="true">${icon("pin", { size: 14 })}</span>Landio Limo Services &middot; 12410 Milestone Center Dr, Ste 600, Germantown, MD 20876</p>
          <div class="site-footer__maplinks">
            <a href="${MAP_OPEN}" target="_blank" rel="noopener">${icon("pin", { size: 15 })}Open in Maps</a>
            <a href="${MAP_DIR}" target="_blank" rel="noopener">${navSvg}Directions</a>
          </div>
        </div>
      </div>

      <div class="site-footer__legal">
        <span>&copy;${year} ${esc(SITE.company)}<span class="site-footer__sep">·</span>Serving Washington, DC, Maryland &amp; Virginia</span>
        ${legalLinks ? `<span class="site-footer__legal-links">${legalLinks}</span>` : ""}
      </div>
    </div>
  </footer>`;
}
