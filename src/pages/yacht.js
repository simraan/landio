/**
 * Yacht page (/yacht/) — Aura Hamptons Yacht Charter (a live, separate line).
 *
 * The original /aura-yacht/ page is unreachable from this environment (domain
 * network-blocked, not indexed), so per-yacht SPECS — pricing, exact guest
 * capacity, crew, minimum duration — and the original gallery PHOTOGRAPHY are
 * NOT invented. They are shown as "on request" / flagged for sourcing. The
 * seven real yacht names (and the length implied by each model name) are kept.
 *
 * Structure follows the original: a Request-a-Charter form near the top, the
 * featured yacht catalogue (each yacht pre-selects the form), curated
 * experiences, destinations, why-choose, door-to-deck transport, FAQs and CTA.
 * Charter enquiries use the existing /api/lead integration (single-step
 * data-quote-form, same handler as the Contact form).
 */

import { breadcrumb, contactSection, cbox, faqAccordion } from "./_sections.js";
import { SITE, DEFAULT_SITE_URL, breadcrumbJsonLd, faqJsonLd } from "../config.js";
import { icon } from "../templates/icons.js";
import { esc } from "../templates/partials.js";

/* ============================================================================
 * NEEDS CLIENT CONFIRMATION — do NOT ship until the owner supplies real data.
 * Until then everything unconfirmed stays "on request"; phone/email come from
 * SITE only (+1 (934) 732-4556 / info@aurahamptonslimo.com). Still needed:
 *   - Per-yacht specs: capacity, crew, minimum charter duration, from-price
 *     (the catalogue cards render these rows automatically once set on YACHTS).
 *   - Real yacht photography for the gallery grid (target: assets/img/yacht/).
 *   - Captain / crew licensing claims (e.g. USCG) — none asserted until verified.
 *   - Charter policies: deposit, cancellation, payment, weather, alcohol,
 *     onboard amenities, instant availability — none asserted until confirmed.
 *   - Gratuity policy (see reservations.js "After You Book").
 * ========================================================================== */

/* Seven real yacht listings. `length` is the model designation in the name.
 * Each entry MAY also carry optional, owner-confirmed fields that light up a
 * spec row in the catalogue card when present — leave them UNSET until verified
 * so nothing unapproved ships:
 *   capacity    (e.g. 12)          -> "Guests — Up to 12"
 *   crew        (e.g. 3)           -> "Crew — 3"
 *   minDuration (e.g. "4 hours")   -> "Min. charter — 4 hours"
 *   fromPrice   (e.g. "$X,XXX")    -> "From — $X,XXX"
 * capacity, pricing, crew, amenities and photos are otherwise sourced on request. */
/* `img` is a REPRESENTATIVE charter-yacht photo (real, from the client's library),
 * not a verified photo of that exact hull — the card copy and the section note keep
 * it honest ("photography … confirmed per vessel on request"). Swap for true
 * per-vessel photography when the client supplies it. NEEDS CLIENT CONFIRMATION. */
const YACHTS = [
  { name: "Veloce 50", length: 50, img: "/assets/img/yacht/speed" },
  { name: "Regale 58", length: 58, img: "/assets/img/yacht/cruising" },
  { name: "Eleganza 65", length: 65, img: "/assets/img/yacht/golden-hour" },
  { name: "Sovrano 72", length: 72, img: "/assets/img/yacht/evening-lights" },
  { name: "Grandioso 84", length: 84, img: "/assets/img/yacht/dusk-anchor" },
  { name: "Maestoso 90", length: 90, img: "/assets/img/yacht/blue-hour" },
  { name: "Imperiale 116", length: 116, img: "/assets/img/yacht/flagship" },
];

/* Curated experiences (occasion options mirror these). */
const EXPERIENCES = [
  { icon: "pin", t: "Luxury Day Charter", d: "A full day on the water across the bays and harbors of the East End." },
  { icon: "calendar", t: "Sunset Cruise", d: "Golden-hour charters along the Hamptons shoreline, timed to the sunset." },
  { icon: "users", t: "Birthday Yacht Party", d: "Celebrate a birthday on board with your group and a professional crew." },
  { icon: "briefcase", t: "Corporate Events", d: "Client entertaining and team outings with concierge-level planning." },
  { icon: "shield", t: "Marriage Proposal", d: "A private, perfectly timed setting for the moment that matters most." },
  { icon: "tag", t: "Wedding Charter", d: "Ceremonies, receptions, and wedding-party cruises on the water." },
  { icon: "clock", t: "Weekend Escape", d: "A multi-day charter to unwind along the coast and the islands." },
  { icon: "message", t: "Bachelor & Bachelorette", d: "A standout celebration for the bride- or groom-to-be and friends." },
  { icon: "users", t: "Family Cruise", d: "A relaxed day afloat for the whole family, at your own pace." },
];

const YACHT_FAQS = [
  { q: "How do I book a yacht charter?", a: "Send a charter enquiry with your preferred yacht, date, and group size using the Request a Charter form on this page, or call us. Our concierge team confirms availability and shares pricing for your charter." },
  { q: "What does a charter cost?", a: "Charter pricing depends on the yacht, the date, the duration, and your plans, and is confirmed on request. Share your details and we'll provide a tailored quote." },
  { q: "How many guests can each yacht hold?", a: "Guest capacity varies by vessel across our fleet, from our smallest day-charter yacht to our 116-foot flagship. Tell us your group size and we'll match you to the right yacht." },
  { q: "What charter durations are available?", a: "We arrange day charters, sunset cruises, and multi-day charters. Let us know your plans and we'll build the right itinerary." },
  { q: "Where do the charters sail?", a: "Across the East End — Sag Harbor, Montauk, Shelter Island, Peconic Bay, Greenport, and the Hamptons coastline, with longer itineraries on request." },
  { q: "Can your concierge team plan the itinerary and catering?", a: "Yes. One concierge team plans the yacht, your route across the East End, catering, and your door-to-deck transfers — tell us your occasion and we'll tailor the day." },
  { q: "Can you arrange transportation to the marina?", a: `Yes. Aura Hamptons provides door-to-deck chauffeured transportation — from your door, hotel, or the airport to the dock, and back — available ${SITE.hours}.` },
  // NEEDS CLIENT CONFIRMATION — add these policy FAQs only once the owner confirms
  // each (do not assert until then): deposit & payment terms, cancellation &
  // weather policy, onboard amenities, alcohol/catering policy, and captain/crew
  // licensing. Keep everything "on request" until verified.
];

/* ---- Sections --------------------------------------------------------- */
function heroSection() {
  // Hero uses client-supplied coastal/yacht photography (batch 1): a luxury motor
  // yacht on the open water at golden hour. Image hero pattern (hero__bg picture +
  // hero__overlay scrim for text legibility), matching the venues/services masters.
  const HERO = "/assets/img/yacht/yacht-hero";
  return `
    <section class="hero hero--page hero--image page-yacht__hero" aria-labelledby="yacht-hero-title">
      <picture class="hero__bg" aria-hidden="true">
        <source type="image/webp" srcset="${HERO}-640.webp 640w, ${HERO}-1024.webp 1024w, ${HERO}-1500.webp 1500w" sizes="100vw">
        <img src="${HERO}-1500.jpg" srcset="${HERO}-640.jpg 640w, ${HERO}-1024.jpg 1024w, ${HERO}-1500.jpg 1500w" sizes="100vw" alt="" width="1500" height="844" fetchpriority="high" decoding="async">
      </picture>
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="container hero__grid">
        <div>
          <p class="hero__eyebrow">Aura Yacht · Hamptons Charter</p>
          <h1 id="yacht-hero-title">Luxury Yacht Charter <em>in the Hamptons</em></h1>
          <p class="hero__area" style="max-width:54ch">A curated fleet of luxury charter yachts for the East End — sunset cruises, celebrations, weddings, and day charters across Sag Harbor, Montauk, Shelter Island, and the Hamptons coastline, with door-to-deck chauffeured service.</p>
          <ul class="hero__feats">
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("check", { size: 14 })}</span>Private charters</li>
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("check", { size: 14 })}</span>A curated fleet</li>
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("check", { size: 14 })}</span>Custom experiences</li>
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("check", { size: 14 })}</span>Door-to-deck service</li>
          </ul>
          <div class="hero__actions" style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
            <a class="btn btn-primary" href="#charter-enquiry">${icon("calendar", { size: 16 })} Check Availability</a>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${icon("phone", { size: 16 })} Call Now</a>
          </div>
          <div class="hero__divider" aria-hidden="true"></div>
          <ul class="hero__trust">
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("users", { size: 15 })}</span>7 luxury charter yachts</li>
            <li><span class="hero__trust-ico" aria-hidden="true">${icon("pin", { size: 15 })}</span>East End &amp; the Hamptons</li>
          </ul>
        </div>
        ${charterForm()}
      </div>
    </section>`;
}

/* Trust-badge band (mirrors the reference's badge row). Labels are factual only —
 * no "5-star", "licensed crew" or rating/pricing claims (NEEDS CLIENT CONFIRMATION
 * before any such claim ships). */
function trustBadges() {
  const badges = [
    { icon: "users", t: "A Curated Fleet" },
    { icon: "shield", t: "Private Charters" },
    { icon: "message", t: "Premium Concierge" },
    { icon: "car", t: "Door-to-Deck Service" },
    { icon: "calendar", t: "Available 7 Days" },
    { icon: "pin", t: "East End & NYC" },
  ];
  const items = badges.map((b) => `
          <li><span class="yacht-badges__ico" aria-hidden="true">${icon(b.icon, { size: 22 })}</span><span class="yacht-badges__t">${esc(b.t)}</span></li>`).join("");
  return `
    <section class="yacht-badges-section" aria-label="Aura Yacht at a glance">
      <div class="container">
        <ul class="yacht-badges">${items}
        </ul>
      </div>
    </section>`;
}

/* The charter enquiry form card — rendered INSIDE the hero's right column (the
 * reference embeds the booking form in the hero). Keeps the same field names,
 * data-quote-form / data-form-location="yacht", /api/lead handler, and the
 * yacht + occasion selects that the prefill links target. */
function charterForm() {
  const yachtOptions = ["I'm not sure yet", ...YACHTS.map((y) => y.name)]
    .map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("");
  const durationOptions = ["Not sure yet", "Half day", "Full day", "Sunset cruise", "Multi-day"]
    .map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("");
  const occasionOptions = ["Not specified", ...EXPERIENCES.map((e) => e.t), "Other"]
    .map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("");
  return `
        <div class="quote-card page-yacht__herocard" id="charter-enquiry" data-quote-card>
          <div class="section-head section-head--left">
            <span class="eyebrow">Charter Enquiry</span>
            <h2 id="yacht-form-title">Request Yacht Charter</h2>
            <p class="text-secondary" style="font-size:.95rem">Tell us your plans — our concierge confirms availability and pricing. No payment is taken online.</p>
          </div>
          <form class="quote-form" id="yacht-enquiry" data-quote-form data-form-location="yacht" novalidate>
            <div class="quote-hp" aria-hidden="true">
              <label>Company website<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label>
            </div>
            <div class="quote-grid">
              <label class="quote-field"><span>Yacht of interest</span>
                <select class="bf-input" name="yacht">${yachtOptions}</select></label>
              <label class="quote-field"><span>Occasion</span>
                <select class="bf-input" name="occasion">${occasionOptions}</select></label>
              <label class="quote-field"><span>Charter date</span>
                <input class="bf-input" type="date" name="charter_date"></label>
              <label class="quote-field"><span>Preferred start time</span>
                <input class="bf-input" type="time" name="start_time"></label>
              <label class="quote-field"><span>Charter duration</span>
                <select class="bf-input" name="duration">${durationOptions}</select></label>
              <label class="quote-field"><span>Departure marina / location</span>
                <input class="bf-input" type="text" name="marina" placeholder="e.g. Sag Harbor, Montauk"></label>
              <label class="quote-field"><span>Number of guests</span>
                <input class="bf-input" type="number" name="guests" min="1" max="120" placeholder="Guests"></label>
              <label class="quote-field"><span>Name</span>
                <input class="bf-input" type="text" name="name" placeholder="Name" autocomplete="name" required></label>
              <label class="quote-field"><span>Phone Number</span>
                <input class="bf-input" type="tel" name="phone" placeholder="Phone Number" autocomplete="tel" required></label>
              <label class="quote-field"><span>Email</span>
                <input class="bf-input" type="email" name="email" placeholder="Email" autocomplete="email" required></label>
              <label class="quote-field quote-field--full"><span>Special requests</span>
                <textarea class="bf-input" name="notes" placeholder="Occasion details, catering, destinations, or any requests" rows="3"></textarea></label>
            </div>
            <div class="quote-actions">
              <button type="submit" class="btn btn-primary" data-quote-submit>Send Charter Enquiry</button>
            </div>
            <p class="quote-status" role="status" aria-live="polite" hidden></p>
            <p class="text-secondary" style="font-size:.82rem;margin:.6rem 0 0;text-align:center">Secure &amp; encrypted · No payment taken online · Reply by phone or email</p>
            <input type="hidden" name="page_url"><input type="hidden" name="referrer">
            <input type="hidden" name="submitted_at">
            <input type="hidden" name="form_location" value="yacht">
          </form>
        </div>`;
}

/* How a charter comes together — process steps (no invented policy; payment
 * wording mirrors the site-wide "no payment on the website" truth). */
function processSteps() {
  const steps = [
    { n: "01", icon: "message", t: "Send Your Enquiry", d: "Tell us your preferred yacht, date, group size, and occasion with the Request a Charter form — or call our team." },
    { n: "02", icon: "route", t: "We Tailor Your Charter", d: "Your concierge team confirms availability and shapes the vessel, itinerary, and catering around your plans." },
    { n: "03", icon: "check", t: "Confirm the Details", d: "We share your tailored charter details for confirmation. No payment is taken on this website." },
    { n: "04", icon: "car", t: "Set Sail, Door to Deck", d: "We collect your party door-to-deck, bring you to the marina, and your charter begins." },
  ];
  const cards = steps.map((s) => `
          <li class="yacht-step card-surface">
            <span class="yacht-step__num" aria-hidden="true">${esc(s.n)}</span>
            <span class="yacht-step__ico" aria-hidden="true">${icon(s.icon, { size: 20 })}</span>
            <h3 class="yacht-step__title">${esc(s.t)}</h3>
            <p class="ap-card__desc">${esc(s.d)}</p>
          </li>`).join("");
  return `
    <section class="section" aria-labelledby="yacht-steps-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">How Chartering Works</span>
          <h2 id="yacht-steps-title">How Your Charter Comes Together</h2>
          <p class="text-secondary">From first enquiry to casting off, one concierge team handles every step — the yacht, the route, and your door-to-deck transfers.</p>
        </div>
        <ol class="yacht-steps">${cards}
        </ol>
      </div>
    </section>`;
}

/* Catalogue spec rows render ONLY for owner-confirmed fields that are set on a
 * yacht; with none set (current state) the card keeps the "on request" line, so
 * nothing unverified ships. Inline-styled so the rows look right the moment the
 * owner adds data, with no stylesheet change. */
function yachtSpecRows(y) {
  const rows = [
    y.capacity ? ["users", "Guests", `Up to ${y.capacity}`] : null,
    y.crew ? ["userCheck", "Crew", String(y.crew)] : null,
    y.minDuration ? ["clock", "Min. charter", y.minDuration] : null,
    y.fromPrice ? ["tag", "From", y.fromPrice] : null,
  ].filter(Boolean);
  if (!rows.length) return `<p class="yacht-card__desc">Guest capacity &amp; charter pricing on request.</p>`;
  const items = rows.map(([ic, label, val]) =>
    `<li style="display:flex;align-items:center;gap:.5rem;font-size:.9rem"><span aria-hidden="true" style="display:inline-flex;color:var(--gold)">${icon(ic, { size: 15 })}</span><span style="color:var(--text-2)">${esc(label)}</span><span style="margin-left:auto;color:var(--text-1);font-weight:600">${esc(val)}</span></li>`
  ).join("");
  return `<ul class="yacht-card__specs" style="list-style:none;margin:.45rem 0 0;padding:0;display:grid;gap:.4rem">${items}</ul>`;
}

function catalogue() {
  const cards = YACHTS.map((y) => `
          <li class="yacht-card card-surface cbox yacht-card--photo">
            <div class="yacht-card__media">
              <picture>
                <source type="image/webp" srcset="${y.img}-640.webp 640w, ${y.img}-1024.webp 1024w" sizes="(min-width:860px) 32vw, (min-width:560px) 46vw, 92vw">
                <img src="${y.img}-1024.jpg" srcset="${y.img}-640.jpg 640w, ${y.img}-1024.jpg 1024w" sizes="(min-width:860px) 32vw, (min-width:560px) 46vw, 92vw" alt="A luxury charter yacht representative of the ${esc(y.name)}" width="1024" height="768" loading="lazy" decoding="async">
              </picture>
              <span class="yacht-card__len" aria-hidden="true">${y.length} ft</span>
            </div>
            <div class="yacht-card__body">
              <h3 class="yacht-card__title"><a class="cbox__action" href="#charter-enquiry" data-prefill-yacht="${esc(y.name)}" aria-label="Request a charter on the ${esc(y.name)}" data-card-label="${esc(y.name)}">${esc(y.name)}</a></h3>
              <p class="yacht-card__meta">${y.length}-foot charter yacht</p>
              ${yachtSpecRows(y)}
              <span class="cbox__cue" aria-hidden="true">Request this yacht &rarr;</span>
            </div>
          </li>`).join("");
  return `
    <section class="section" id="catalogue" aria-labelledby="yacht-cat-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Our Premium Fleet</span>
          <h2 id="yacht-cat-title">Featured Charter Yachts</h2>
          <p class="text-secondary">Seven luxury charter yachts, from intimate day-charter vessels to our 116-foot flagship. Choose a yacht to pre-select it in the enquiry form — our concierge confirms capacity, crew, amenities, and pricing for your date.</p>
        </div>
        <ul class="yacht-grid">${cards}
        </ul>
        <p class="text-secondary" style="text-align:center;margin-top:1.5rem;font-size:.92rem">Guest capacity, crew, onboard amenities, minimum charter duration, photography, and pricing are confirmed per vessel on request.</p>
      </div>
    </section>`;
}

function experiences() {
  const cards = EXPERIENCES.map((c) => `
          <li class="ap-why card-surface yacht-exp">
            <span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>
            <h3 class="ap-why__title">${esc(c.t)}</h3>
            <p class="ap-card__desc">${esc(c.d)}</p>
            <a class="cbox__cue" href="#charter-enquiry" data-prefill-occasion="${esc(c.t)}">Enquire &rarr;</a>
          </li>`).join("");
  return `
    <section class="section section--alt" aria-labelledby="yacht-exp-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Experience</span>
          <h2 id="yacht-exp-title">Curated Yacht Experiences</h2>
          <p class="text-secondary">However you want to spend your time on the water, our concierge team tailors the yacht and itinerary to your occasion.</p>
        </div>
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

/* Onboard & concierge services. Covers the "amenities / catering / concierge"
 * content area WITHOUT inventing specifics — every item is framed as arranged /
 * confirmed on request (NEEDS CLIENT CONFIRMATION for exact menus, amenities,
 * alcohol and crew-licensing details). */
function conciergeServices() {
  const DUO_A = "/assets/img/yacht/sundeck";
  const DUO_B = "/assets/img/yacht/catering";
  const items = [
    { icon: "tag", t: "Catering & Provisioning", d: "From refreshments to full catering, arranged to your plans. Menus and provisioning are confirmed on request." },
    { icon: "route", t: "Itinerary Planning", d: "A custom route across the East End's harbors, bays, and coastline, planned with your concierge team." },
    { icon: "calendar", t: "Celebrations & Styling", d: "Birthdays, proposals, weddings, and parties set up for your occasion. Details confirmed on request." },
    { icon: "message", t: "Concierge Coordination", d: "One point of contact coordinates the yacht, crew, catering, and your door-to-deck transfers." },
  ];
  const cards = items.map((c) => `
          <li class="ap-why card-surface yacht-exp">
            <span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>
            <h3 class="ap-why__title">${esc(c.t)}</h3>
            <p class="ap-card__desc">${esc(c.d)}</p>
          </li>`).join("");
  return `
    <section class="section section--alt" aria-labelledby="yacht-services-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Onboard &amp; Concierge</span>
          <h2 id="yacht-services-title">Services Tailored to Your Charter</h2>
          <p class="text-secondary">Everything around your day on the water, handled by one team. Specific menus, amenities, and arrangements are confirmed on request.</p>
        </div>
        <div class="yacht-duo">
          <figure class="yacht-duo__item">
            <picture>
              <source type="image/webp" srcset="${DUO_A}-640.webp 640w, ${DUO_A}-1024.webp 1024w" sizes="(min-width:640px) 50vw, 92vw">
              <img src="${DUO_A}-1024.jpg" srcset="${DUO_A}-640.jpg 640w, ${DUO_A}-1024.jpg 1024w" sizes="(min-width:640px) 50vw, 92vw" alt="Sun loungers on a yacht deck facing the sunset over open water" width="1024" height="768" loading="lazy" decoding="async">
            </picture>
            <figcaption class="yacht-duo__cap">Onboard Comfort</figcaption>
          </figure>
          <figure class="yacht-duo__item">
            <picture>
              <source type="image/webp" srcset="${DUO_B}-640.webp 640w, ${DUO_B}-1024.webp 1024w" sizes="(min-width:640px) 50vw, 92vw">
              <img src="${DUO_B}-1024.jpg" srcset="${DUO_B}-640.jpg 640w, ${DUO_B}-1024.jpg 1024w" sizes="(min-width:640px) 50vw, 92vw" alt="A plated gourmet dish being garnished on a yacht dining table with a sea view" width="1024" height="768" loading="lazy" decoding="async">
            </picture>
            <figcaption class="yacht-duo__cap">Chef &amp; Catering</figcaption>
          </figure>
        </div>
        <ul class="ap-grid ap-grid--why svc-why-4">${cards}
        </ul>
      </div>
    </section>`;
}

function destinations() {
  const areas = [
    { name: "Sag Harbor", d: "Whaling-village harbor & Shelter Island crossings", img: "/assets/img/yacht/marina" },
    { name: "Montauk", d: "The East End point, Lake Montauk & open water", img: "/assets/img/yacht/harbor" },
    { name: "Shelter Island", d: "Protected anchorages between the forks", img: "/assets/img/yacht/coastline" },
    { name: "Greenport", d: "North Fork harbor town & waterfront dining", img: "/assets/img/yacht/dest-banner" },
    { name: "Three Mile Harbor", d: "East Hampton's boating harbor & sunset runs", img: "/assets/img/yacht/golden-hour" },
    { name: "Peconic Bay", d: "Calm bay cruising across the North & South Forks", img: "/assets/img/yacht/cruising" },
  ];
  const tiles = areas.map((a) => `
          <li class="yacht-area">
            <picture>
              <source type="image/webp" srcset="${a.img}-640.webp 640w, ${a.img}-1024.webp 1024w" sizes="(min-width:860px) 32vw, (min-width:560px) 46vw, 92vw">
              <img src="${a.img}-1024.jpg" srcset="${a.img}-640.jpg 640w, ${a.img}-1024.jpg 1024w" sizes="(min-width:860px) 32vw, (min-width:560px) 46vw, 92vw" alt="${esc(a.name)} on the East End" width="1024" height="768" loading="lazy" decoding="async">
            </picture>
            <div class="yacht-area__body">
              <span class="yacht-area__name"><span class="yacht-area__ico" aria-hidden="true">${icon("pin", { size: 15 })}</span>${esc(a.name)}</span>
              <span class="yacht-area__note">${esc(a.d)}</span>
            </div>
          </li>`).join("");
  return `
    <section class="section section--alt" aria-labelledby="yacht-dest-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Where We Sail</span>
          <h2 id="yacht-dest-title">Charter Service Areas</h2>
          <p class="text-secondary">Charter itineraries across the East End's harbors, bays, and coastline, with longer routes on request.</p>
        </div>
        <ul class="yacht-areas">${tiles}
        </ul>
      </div>
    </section>`;
}

function whyChoose() {
  // Reference parity (8 cards). "Experienced Captains" (not "Licensed") and the
  // pricing card avoid unverified licensing / fee claims — NEEDS CLIENT CONFIRMATION.
  const items = [
    { icon: "userCheck", t: "Professional Crew", d: "Experienced, courteous crew who look after every detail of your charter." },
    { icon: "users", t: "A Curated Fleet", d: "Seven luxury charter yachts, from intimate day boats to a 116-foot flagship." },
    { icon: "route", t: "Custom Itineraries", d: "A route built around your plans across the East End's harbors, bays, and coastline." },
    { icon: "message", t: "Premium Concierge", d: "One team to plan the yacht, the itinerary, catering, and the transfers." },
    { icon: "shield", t: "Private Charters", d: "Your own yacht and crew for the day — private, discreet, and entirely yours." },
    { icon: "tag", t: "Clear, Up-Front Pricing", d: "A tailored quote confirmed up front for your date and plans. No payment is taken online." },
    { icon: "userCheck", t: "Experienced Captains", d: "A professional captain and crew run every charter on the water." },
    { icon: "car", t: "Door-to-Deck Service", d: "Chauffeured Aura Hamptons transfers from your door to the dock, 24/7." },
  ];
  const cards = items.map((c) => `
          <li class="ap-why card-surface yacht-exp">
            <span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>
            <h3 class="ap-why__title">${esc(c.t)}</h3>
            <p class="ap-card__desc">${esc(c.d)}</p>
          </li>`).join("");
  return `
    <section class="section" aria-labelledby="yacht-why-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Why Aura Yacht</span>
          <h2 id="yacht-why-title">Why Choose Us</h2>
          <p class="text-secondary">The same premium standard as our chauffeured service — now on the water.</p>
        </div>
        <ul class="ap-grid ap-grid--why svc-why-4">${cards}
        </ul>
      </div>
    </section>`;
}

function doorToDeck() {
  const D2D = "/assets/img/yacht/door-to-deck";
  return `
    <section class="section" aria-labelledby="yacht-d2d-title">
      <div class="container">
        <div class="gt-split">
          <div class="gt-split__content">
            <span class="eyebrow">Door-to-Deck Service</span>
            <h2 id="yacht-d2d-title">Luxury Transportation + Yacht Experience</h2>
            <p class="text-secondary">Aura Hamptons pairs every charter with our chauffeured car service — we collect your party from home, your hotel, or the airport and bring you to the marina, then return you afterward.</p>
            <ul class="gt-split__checks">
              <li><span class="gt-split__check" aria-hidden="true">${icon("check", { size: 13 })}</span>Airport pickup with flight tracking</li>
              <li><span class="gt-split__check" aria-hidden="true">${icon("check", { size: 13 })}</span>Executive Sedan &amp; Luxury SUV transfers</li>
              <li><span class="gt-split__check" aria-hidden="true">${icon("check", { size: 13 })}</span>Sprinter Van &amp; group vehicles for larger parties</li>
              <li><span class="gt-split__check" aria-hidden="true">${icon("check", { size: 13 })}</span>One concierge team for the car and the yacht</li>
            </ul>
            <div class="gt-split__cta">
              <a class="btn btn-primary" href="#charter-enquiry">${icon("calendar", { size: 16 })} Arrange My Experience</a>
              <a class="btn btn-ghost" href="/reservations/">${icon("car", { size: 16 })} Book Ground Transfers</a>
            </div>
          </div>
          <div class="gt-split__media page-yacht__d2d page-yacht__d2d--photo">
            <picture>
              <source type="image/webp" srcset="${D2D}-640.webp 640w, ${D2D}-1024.webp 1024w" sizes="(min-width:860px) 46vw, 92vw">
              <img src="${D2D}-1024.jpg" srcset="${D2D}-640.jpg 640w, ${D2D}-1024.jpg 1024w" sizes="(min-width:860px) 46vw, 92vw" alt="A chauffeured Aura Hamptons Sprinter van waiting dockside beside a charter yacht at golden hour" width="1024" height="576" loading="lazy" decoding="async">
            </picture>
            <span class="gt-split__accent"></span>
            <span class="gt-split__accent gt-split__accent--br"></span>
          </div>
        </div>
      </div>
    </section>`;
}

/* Gallery. A 3x3 montage of client-supplied photography (batches 1 & 2) — fleet,
 * marinas, coastline, onboard moments, and door-to-deck service. A tile with an
 * `img` renders a <picture> + caption; a tile without one falls back to a
 * labelled placeholder (dashed frame + "Photography on upload"). NEVER stock,
 * vehicle, or fabricated images. */
function gallery() {
  const slots = [
    { t: "The Fleet at Anchor", img: "/assets/img/yacht/marina", alt: "Charter yachts and sailboats moored at a Hamptons marina at golden hour" },
    { t: "Onboard & Deck", img: "/assets/img/yacht/onboard-deck", alt: "A yacht's cream-leather salon with a marble table and chilled champagne, water views through the windows" },
    { t: "Sunset Charter", img: "/assets/img/yacht/harbor", alt: "A calm East End harbor lined with yachts and waterfront homes at dusk" },
    { t: "Cruising the East End", img: "/assets/img/yacht/cruising", alt: "A luxury motor yacht cruising calm East End water in the evening light" },
    { t: "Celebrations Aboard", img: "/assets/img/yacht/celebrations", alt: "A family together on the bow of a yacht at sunset" },
    { t: "East End Coastline", img: "/assets/img/yacht/coastline", alt: "Aerial view of a lighthouse on the rocky East End coastline at sunset" },
    { t: "Golden-Hour Charter", img: "/assets/img/yacht/golden-hour", alt: "A flybridge motor yacht on the water as the sun sets over the Hamptons shoreline" },
    { t: "The Flagship", img: "/assets/img/yacht/flagship", alt: "A large luxury yacht anchored off the Hamptons under a dramatic sunset sky" },
    { t: "Door-to-Deck Arrival", img: "/assets/img/yacht/arrival", alt: "A chauffeured Aura Hamptons van waiting dockside beside a charter yacht at golden hour" },
    { t: "Evening at Anchor", img: "/assets/img/yacht/dusk-anchor", alt: "A dark-hulled luxury yacht at anchor on calm water as the sun sets over the Hamptons" },
    { t: "Blue Hour", img: "/assets/img/yacht/blue-hour", alt: "A luxury yacht lit from within, anchored on still water at blue hour" },
    { t: "Cruising at Speed", img: "/assets/img/yacht/speed", alt: "A flybridge motor yacht cruising at speed past the Hamptons shoreline at sunset" },
    { t: "A Sunset Proposal", img: "/assets/img/yacht/proposal", alt: "A proposal set-up on a yacht bow at sunset — a ring box, a rose, and two glasses of champagne" },
    { t: "Champagne at Sunset", img: "/assets/img/yacht/toast", alt: "Two glasses of champagne toasted at sunset on a yacht deck" },
    { t: "Evening Lights", img: "/assets/img/yacht/evening-lights", alt: "A motor yacht lit from within, anchored on calm water at dusk" },
    { t: "Harbor at Dusk", img: "/assets/img/yacht/harbor-dusk", alt: "Yachts and sailboats silhouetted in a Hamptons harbor under a vivid sunset" },
  ];
  const tiles = slots.map((s) => s.img
    ? `
          <li class="yacht-gallery__tile yacht-gallery__tile--photo">
            <picture>
              <source type="image/webp" srcset="${s.img}-640.webp 640w, ${s.img}-1024.webp 1024w" sizes="(min-width:860px) 32vw, (min-width:520px) 46vw, 92vw">
              <img src="${s.img}-1024.jpg" srcset="${s.img}-640.jpg 640w, ${s.img}-1024.jpg 1024w" sizes="(min-width:860px) 32vw, (min-width:520px) 46vw, 92vw" alt="${esc(s.alt)}" width="1024" height="768" loading="lazy" decoding="async">
            </picture>
            <span class="yacht-gallery__cap">${esc(s.t)}</span>
          </li>`
    : `
          <li class="yacht-gallery__tile" aria-hidden="true">
            <span class="yacht-gallery__ph">${icon("grid", { size: 26 })}</span>
            <span class="yacht-gallery__label">${esc(s.t)}</span>
            <span class="yacht-gallery__note">Photography on upload</span>
          </li>`).join("");
  return `
    <section class="section section--alt" aria-labelledby="yacht-gallery-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Gallery</span>
          <h2 id="yacht-gallery-title">The Aura Experience</h2>
          <p class="text-secondary">A look across the East End — the fleet, our marinas, the coastline we sail, onboard moments, and door-to-deck service. Current, vessel-specific photography is shared with your charter quote.</p>
        </div>
        <ul class="yacht-gallery">${tiles}
        </ul>
        <div style="text-align:center;margin-top:1.75rem">
          <a class="btn btn-primary" href="#charter-enquiry">${icon("calendar", { size: 16 })} Request Yacht Photos &amp; Availability</a>
        </div>
      </div>
    </section>`;
}

function finalCta() {
  return `
    <section class="section cta-band page-yacht__cta" aria-labelledby="yacht-cta-title">
      <div class="container">
        <div class="cta-band__card">
          <div class="cta-band__copy">
            <span class="eyebrow">Your Charter Awaits</span>
            <h2 id="yacht-cta-title">Ready to Experience the Hamptons Like Never Before?</h2>
            <p>Tell us your date, group, and occasion — our concierge team will match the yacht and handle every detail, from the dock to door-to-deck transfers.</p>
          </div>
          <div class="cta-band__actions">
            <a class="btn btn-primary" href="#charter-enquiry">${icon("calendar", { size: 16 })} Check Availability</a>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${icon("phone", { size: 16 })} Call Now</a>
          </div>
        </div>
      </div>
    </section>`;
}

export function yacht() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Aura Yacht", path: "/yacht/" },
  ];
  const origin = DEFAULT_SITE_URL.replace(/\/+$/, "");
  const description =
    "Aura Hamptons Yacht Charter — a curated fleet of seven luxury charter yachts for the East End. Sunset cruises, celebrations, weddings, and day charters with door-to-deck chauffeured service. Enquire 24/7.";
  // Section order mirrors the old /aura-yacht/ reference exactly:
  // Hero(+form) → Trust → Featured Fleet → Experiences → Why Choose →
  // Service Areas → Transportation → Gallery → FAQ → Final CTA.
  const main = [
    breadcrumb(trail),
    heroSection(),
    trustBadges(),
    catalogue(),
    experiences(),
    whyChoose(),
    destinations(),
    doorToDeck(),
    gallery(),
    faqAccordion({ faqs: YACHT_FAQS, lede: "Answers to common questions about chartering with Aura Hamptons." }),
    finalCta(),
    contactSection(),
  ].join("\n");

  return {
    path: "/yacht/",
    title: "Yacht Charter",
    titleFull: "Hamptons Yacht Charter | Aura Hamptons",
    description,
    bodyClass: "page-yacht page-group-transfers",
    jsonLd: [
      { ...breadcrumbJsonLd(DEFAULT_SITE_URL, trail), "@id": `${origin}/yacht/#breadcrumb` },
      { ...faqJsonLd(YACHT_FAQS), "@id": `${origin}/yacht/#faq` },
    ],
    main,
  };
}
