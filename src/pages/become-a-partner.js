/**
 * Become an Landio Partner (/become-a-partner/). A standalone B2B page: premium
 * image hero, the three already-approved partner benefits, a neutral three-step
 * "How It Works", a dedicated partner enquiry form (its own field set —
 * company, contact, partner type, message — posted through the shared
 * [data-quote-form] pipeline with form_location="partner"), and the shared
 * contact bar + CTA.
 *
 * Every informational card opens that same enquiry form in a popup
 * (data-open-partner → [data-partner-modal]); the form also lives inline near
 * the foot of the page. No per-card "become a partner" cue — the whole card is
 * simply clickable.
 *
 * Copy is verified/neutral only — no invented commissions, rates, tiers,
 * eligibility, exclusivity or contractual terms (see CLAUDE.md hard rules).
 */

import { breadcrumb, pageHero, contactBar, eventCta } from "./_sections.js";
import { icon } from "../templates/icons.js";
import { SITE, DEFAULT_SITE_URL, absoluteUrl, breadcrumbJsonLd } from "../config.js";
import { esc } from "../templates/partials.js";

const coachName = SITE.fleet.find((v) => v.key === "coach").name.toLowerCase();

// Partner categories for the enquiry form's "Partner type" select. Neutral,
// descriptive labels only — they mirror the audience cards on this page.
const PARTNER_TYPES = [
  "Travel advisor",
  "Hotel / Concierge",
  "Event planner",
  "Wedding planner",
  "Hospitality",
  "Corporate travel",
  "Other",
];

/**
 * The dedicated partner enquiry form. Rendered both inline and inside the
 * popup modal, so it takes an id prefix to keep element ids unique between the
 * two instances. Fields are wrapped in a single `.quote-step` so the shared
 * submit handler validates the required fields (including the select) before
 * posting to /api/lead.
 */
function partnerForm(idPrefix) {
  const fid = `${esc(idPrefix)}-form`;
  const options = PARTNER_TYPES.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join("");
  return `
          <form class="quote-form pp-form" id="${fid}" data-quote-form data-form-location="partner" novalidate>
            <div class="quote-hp" aria-hidden="true">
              <label>Company website<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label>
            </div>
            <div class="quote-step" data-step="1">
              <div class="quote-grid">
                <label class="quote-field quote-field--full"><span>Business / Company name</span>
                  <input class="bf-input" type="text" name="company" placeholder="Business / Company name" autocomplete="organization" required></label>
                <label class="quote-field"><span>Your name</span>
                  <input class="bf-input" type="text" name="name" placeholder="Your name" autocomplete="name" required></label>
                <label class="quote-field"><span>Partner type</span>
                  <select class="bf-input bf-select" name="partner_type" required>
                    <option value="" disabled selected>Select partner type</option>
                    ${options}
                  </select></label>
                <label class="quote-field"><span>Phone number</span>
                  <input class="bf-input" type="tel" name="phone" placeholder="Phone number" autocomplete="tel" required></label>
                <label class="quote-field"><span>Email</span>
                  <input class="bf-input" type="email" name="email" placeholder="Email" autocomplete="email" required></label>
                <label class="quote-field quote-field--full"><span>Message</span>
                  <textarea class="bf-input" name="message" placeholder="Tell us about your business and the trips you book" rows="5" required></textarea></label>
              </div>
            </div>
            <div class="quote-actions">
              <button type="submit" class="btn btn-primary" data-quote-submit>Send Enquiry</button>
            </div>
            <p class="quote-status" role="status" aria-live="polite" hidden></p>
            <input type="hidden" name="page_url"><input type="hidden" name="referrer">
            <input type="hidden" name="submitted_at">
            <input type="hidden" name="form_location" value="partner">
          </form>`;
}

// A whole-card button that opens the partner enquiry popup. Replaces the old
// `#partner-enquiry` anchor + "Become a partner" cue: the card is simply
// clickable and the click opens the form in a modal.
const partnerAction = (label) =>
  `<button type="button" class="cbox__action" data-open-partner aria-label="${esc(label)} — enquire about partnering">${esc(label)}</button>`;

/** The three approved, neutral partner benefits. */
function benefitsSection() {
  const benefits = [
    ["users", "Dedicated support", "One team that knows your account, available 24/7."],
    ["calendar", "Seamless booking", "Send us the trip; we quote it and look after your client start to finish."],
    ["van", "Trusted fleet", `Professional chauffeurs and a meticulously maintained fleet, from sedans to ${coachName}es.`],
  ];
  const cards = benefits
    .map(
      ([ic, t, d]) => `
          <li class="pp-benefit card-surface cbox">
            <span class="pp-benefit__ico" aria-hidden="true">${icon(ic, { size: 24 })}</span>
            <h3 class="pp-benefit__title cbox__title">${partnerAction(t)}</h3>
            <p class="pp-benefit__desc">${esc(d)}</p>
          </li>`
    )
    .join("");
  return `
    <section class="section section--alt" aria-labelledby="benefits-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Why Partner With Us</span>
          <h2 id="benefits-title">A seamless extension of your service</h2>
          <p class="text-secondary">Give your clients and guests luxury chauffeured transportation across Washington, DC, Maryland, and Northern Virginia, backed by professional chauffeurs and 24/7 booking support.</p>
        </div>
        <ul class="pp-benefits">${cards}
        </ul>
      </div>
    </section>`;
}

/** Who can partner — audience cards (verified/neutral service descriptions). */
function audiencesSection() {
  const audiences = [
    ["route", "Travel advisors", "Add dependable DC-metro ground transportation to your clients' itineraries."],
    ["pin", "Hotel concierges", "Chauffeured car service your guests can arrange through you."],
    ["calendar", "Event planners", "Coordinated group and guest transportation for your events."],
    ["users", "Wedding planners", "Guest shuttles and wedding-party transportation across the DC metro."],
    ["shield", "Hospitality teams", "Professional chauffeured transfers for your guests, available 24/7."],
    ["briefcase", "Corporate travel", "Executive travel and flight-tracked airport transfers for your teams."],
  ];
  const cards = audiences
    .map(
      ([ic, t, d]) => `
          <li class="pp-audience card-surface cbox">
            <span class="pp-audience__ico" aria-hidden="true">${icon(ic, { size: 20 })}</span>
            <div class="pp-audience__text">
              <h3 class="pp-audience__title cbox__title">${partnerAction(t)}</h3>
              <p class="pp-audience__desc">${esc(d)}</p>
            </div>
          </li>`
    )
    .join("");
  return `
    <section class="section" aria-labelledby="audiences-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Who We Partner With</span>
          <h2 id="audiences-title">Built for the people who move the DC metro</h2>
          <p class="text-secondary">From travel advisors and hotels to planners and corporate teams — one trusted transportation partner across Washington, DC, Maryland, and Northern Virginia.</p>
        </div>
        <ul class="pp-audiences">${cards}
        </ul>
      </div>
    </section>`;
}

/** Why Landio Limo Services — a verified trust strip (facts sourced from config). */
function whyAuraSection() {
  const points = [
    ["shield", "Professional chauffeurs", "Vetted, courteous chauffeurs who know the DC metro and every area airport."],
    ["van", `${SITE.fleet.length} vehicle classes`, "From executive sedans to motor coaches — the right vehicle for any group."],
    ["plane", "Flight-tracked airport transfers", "To and from IAD, DCA and BWI, timed to your arrival."],
    ["clock", "Available 24/7", "Dedicated booking support, every day including holidays."],
  ];
  const cards = points
    .map(
      ([ic, t, d]) => `
          <li class="pp-why__item cbox">
            <span class="pp-why__ico" aria-hidden="true">${icon(ic, { size: 20 })}</span>
            <span class="pp-why__t cbox__title">${partnerAction(t)}</span>
            <span class="pp-why__d">${esc(d)}</span>
          </li>`
    )
    .join("");
  return `
    <section class="section section--alt" aria-labelledby="why-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Why Landio Limo Services</span>
          <h2 id="why-title">A partner your clients can count on</h2>
        </div>
        <ul class="pp-why">${cards}
        </ul>
      </div>
    </section>`;
}

/** Neutral three-step "How It Works" (no terms, rates or promises). */
function howItWorks() {
  const steps = [
    ["01", "Tell us about your business", "Share who you are and the trips you book — travel advisor, hotel, planner, or corporate team."],
    ["02", "We set you up", "Our team gets to know your account so your bookings are quick and consistent."],
    ["03", "Book with confidence", "Send us the trip; we quote it and look after your client start to finish, 24/7."],
  ];
  return `
    <section class="section" aria-labelledby="how-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">How It Works</span>
          <h2 id="how-title">Partnering is simple</h2>
        </div>
        <ol class="steps-timeline">
          ${steps.map(([n, t, d]) => `
          <li class="steps-node cbox">
            <span class="steps-node__num">${n}</span>
            <p class="steps-node__title cbox__title">${partnerAction(t)}</p>
            <p class="steps-node__desc">${esc(d)}</p>
          </li>`).join("")}
        </ol>
      </div>
    </section>`;
}

/** Inline partner enquiry form — the always-visible "Get Started" section. */
function enquiryForm() {
  return `
    <section class="section section--alt" aria-labelledby="enquiry-title" id="partner-enquiry">
      <div class="container pp-enquiry">
        <div class="quote-card" data-quote-card>
          <div class="section-head section-head--left">
            <span class="eyebrow">Get Started</span>
            <h2 id="enquiry-title">Partner With Landio Limo Services</h2>
            <p class="text-secondary">Tell us about your business and we'll be in touch. Prefer to talk? Call <a href="tel:${esc(SITE.phone.e164)}">${esc(SITE.phone.display)}</a>.</p>
          </div>
          ${partnerForm("partner")}
        </div>
      </div>
    </section>`;
}

/** Popup version of the partner enquiry form (opened by any clickable card). */
function partnerModal() {
  return `
    <div class="quote-modal partner-modal" data-partner-modal hidden aria-hidden="true">
      <div class="quote-modal__backdrop" data-partner-close></div>
      <div class="quote-modal__dialog pp-modal" role="dialog" aria-modal="true" aria-labelledby="pp-modal-title">
        <button type="button" class="quote-modal__close" data-partner-close aria-label="Close">&times;</button>
        <div class="pp-modal__body">
          <div class="section-head section-head--left">
            <span class="eyebrow">Get Started</span>
            <h2 id="pp-modal-title">Partner With Landio Limo Services</h2>
            <p class="text-secondary">Tell us about your business and we'll be in touch. Prefer to talk? Call <a href="tel:${esc(SITE.phone.e164)}">${esc(SITE.phone.display)}</a>.</p>
          </div>
          ${partnerForm("partner-modal")}
        </div>
      </div>
    </div>`;
}

export function becomePartner() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Become a Partner", path: "/become-a-partner/" },
  ];
  const main = [
    breadcrumb(trail),
    pageHero({
      eyebrow: "Partner Program",
      h1: "Become an Landio Partner",
      lede: "Partner with Landio Limo Services and give your clients and guests seamless luxury transportation across Washington, DC, Maryland, and Northern Virginia — professional chauffeurs, a meticulously maintained fleet, and 24/7 booking support.",
      withForm: false,
      image: "/assets/img/hero/dc-hero",
      features: [
        { icon: "users", label: "Dedicated support" },
        { icon: "calendar", label: "24/7 booking support" },
        { icon: "shield", label: "Professional chauffeurs" },
        { icon: "pin", label: "DC, Maryland & Virginia" },
      ],
    }),
    benefitsSection(),
    audiencesSection(),
    whyAuraSection(),
    howItWorks(),
    enquiryForm(),
    eventCta(),
    contactBar(),
    partnerModal(),
  ].join("\n");

  const origin = DEFAULT_SITE_URL.replace(/\/+$/, "");
  const description =
    "Partner with Landio Limo Services — luxury chauffeured transportation across Washington, DC, Maryland, and Northern Virginia for travel advisors, hotels, planners and corporate teams.";

  return {
    path: "/become-a-partner/",
    title: "Become a Partner",
    titleFull: "Become an Landio Partner | Landio Limo Services",
    description,
    bodyClass: "page-partner",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Become an Landio Partner",
        url: absoluteUrl(DEFAULT_SITE_URL, "/become-a-partner/"),
        description,
        about: { "@id": `${origin}/#business` },
      },
      breadcrumbJsonLd(DEFAULT_SITE_URL, trail),
    ],
    main,
  };
}
