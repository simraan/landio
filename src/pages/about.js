/**
 * About page — Aura Hamptons. Premium redesign consistent with the home /
 * partner pages' metallic gold-gradient language:
 *   hero (image) → real-number stat strip → Our Story split →
 *   Mission & Vision → Why Choose Aura (clickable grid) →
 *   Service Area band → event CTA + contact bar.
 *
 * Copy is verified/neutral only — no "guarantee" claims, no invented stats,
 * no vehicle model names (see CLAUDE.md hard rules). The "25+ years" figure
 * tracks the established founding (est. 2000, credited to the founder in
 * SITE.director); the fleet/airport counts are sourced facts.
 */

import { esc, btnIcon } from "../templates/partials.js";
import { SITE } from "../config.js";
import { breadcrumb, contactBar, eventCta, cbox } from "./_sections.js";
import { icon } from "../templates/icons.js";

const ic = (p) =>
  `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const missionIcon = ic('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>');
const visionIcon = ic('<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>');
const check = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-11"/></svg>`;

const VILLAGES = [
  "Washington, DC", "Bethesda", "Rockville", "Silver Spring", "Germantown",
  "Gaithersburg", "Chevy Chase", "National Harbor", "Annapolis", "Baltimore",
  "Arlington", "Alexandria", "McLean", "Tysons", "Fairfax", "Reston",
  "Ashburn", "Sterling", "Leesburg",
];
const AIRPORTS = ["IAD", "DCA", "BWI"];

/** Image hero with a premium metallic frame + gold corner accent. */
function hero() {
  return `
    <section class="hero hero--page hero--about" aria-labelledby="about-us-title">
      <div class="container about-hero__grid">
        <div class="about-hero__copy">
          <p class="hero__eyebrow">About Landio Limo Services</p>
          <h1 id="about-us-title">The DC Metro's Standard for <span class="gold">Chauffeured Luxury</span></h1>
          <p class="about-hero__lede">Landio Limo Services delivers premium chauffeured transportation across Washington, DC, Maryland, and Northern Virginia — comfort, elegance, and reliability on every ride, from airport transfers to corporate, diplomatic, private-aviation, and group travel.</p>
          <div class="about-hero__actions">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Reserve Your Ride</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
        <figure class="about-hero__media">
          <picture>
            <source type="image/webp" srcset="/assets/img/hero/hamptons-hero-640.webp 640w, /assets/img/hero/hamptons-hero-1024.webp 1024w" sizes="(min-width:960px) 46vw, 100vw">
            <img src="/assets/img/hero/hamptons-hero-1024.jpg" srcset="/assets/img/hero/hamptons-hero-640.jpg 640w, /assets/img/hero/hamptons-hero-1024.jpg 1024w" sizes="(min-width:960px) 46vw, 100vw" alt="Landio Limo Services chauffeured car service across the DC metro" width="1024" height="768" fetchpriority="high" decoding="async">
          </picture>
          <span class="about-hero__accent" aria-hidden="true"></span>
        </figure>
      </div>
    </section>`;
}

/** Real-number trust strip (facts: tenure, fleet, airports, availability). */
function statsStrip() {
  const stats = [
    ["DC · MD · VA", "Service area"],
    [String(SITE.fleet.length), "Luxury vehicle classes"],
    [String(AIRPORTS.length), "Airports covered"],
    ["24/7", "Availability, incl. holidays"],
  ];
  return `
    <section class="section about-stats-section" aria-label="Landio Limo Services at a glance">
      <div class="container">
        <ul class="about-stats">
          ${stats.map(([n, l]) => `
          <li class="about-stat">
            <span class="about-stat__num">${esc(n)}</span>
            <span class="about-stat__label">${esc(l)}</span>
          </li>`).join("")}
        </ul>
      </div>
    </section>`;
}

/** Our Story — narrative split with a framed image + a verified checklist. */
function ourStory() {
  const highlights = [
    "IAD, DCA &amp; BWI flight-tracked airport transfers",
    "Corporate meetings &amp; executive travel",
    "Diplomatic, private-aviation &amp; group transport",
    "A five-class fleet, from executive sedans to charter buses",
  ];
  return `
    <section class="section about-story" aria-labelledby="story-title">
      <div class="container about-split about-split--media-left">
        <figure class="about-split__media about-collage">
          <picture class="about-collage__pic">
            <source type="image/webp" srcset="/assets/img/fleet/executive-suv-640.webp 640w, /assets/img/fleet/executive-suv-1024.webp 1024w" sizes="(min-width:900px) 46vw, 100vw">
            <img class="about-collage__main" src="/assets/img/fleet/executive-suv-1024.jpg" srcset="/assets/img/fleet/executive-suv-640.jpg 640w, /assets/img/fleet/executive-suv-1024.jpg 1024w" sizes="(min-width:900px) 46vw, 100vw" alt="Landio Executive SUV in the DC metro" loading="lazy" decoding="async" width="1024" height="576">
          </picture>
          <span class="about-collage__accent" aria-hidden="true"></span>
        </figure>
        <div class="about-split__content">
          <span class="eyebrow">Our Story</span>
          <h2 id="story-title">Effortless journeys, <span class="gold">done right</span></h2>
          <p class="text-secondary">Landio Limo Services is built to be the DC metro's trusted name in chauffeured transportation. For us, a ride is more than a transfer — it's a personalized experience from the first call to the final destination, tailored to every occasion across Washington, DC, Maryland, and Northern Virginia.</p>
          <ul class="about-checks">
            ${highlights.map((h) => `<li><span class="about-check">${check}</span>${h}</li>`).join("\n            ")}
          </ul>
          <div class="about-story__cta">
            <button type="button" class="btn btn-primary" data-open-quote>${btnIcon("calendar")}Reserve Your Ride</button>
            <a class="btn btn-ghost" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
          </div>
        </div>
      </div>
    </section>`;
}

/** Mission & Vision — two premium cards, clickable to the quote popup. */
function missionVision() {
  const cards = [
    [missionIcon, "Our Mission", "To provide unparalleled luxury transportation across the DC metro, ensuring every journey is seamless, safe, and memorable."],
    [visionIcon, "Our Vision", "To be the DC metro's most trusted chauffeured car service, known for excellence, reliability, and genuine hospitality."],
  ];
  return `
    <section class="section section--alt" aria-labelledby="mv-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">What Drives Us</span>
          <h2 id="mv-title">Our Mission &amp; Vision</h2>
        </div>
        <ul class="mv-grid">
          ${cards
            .map(([iconSvg, h, p]) =>
              cbox({
                cls: "mv-card card-surface",
                lead: `<span class="mv-card__icon" aria-hidden="true">${iconSvg}</span>`,
                title: h, act: { modal: {} },
                bodyHtml: `<p>${p}</p>`,
              })
            )
            .join("\n          ")}
        </ul>
      </div>
    </section>`;
}

/** Why Choose Aura — clickable premium reasons grid (open the quote popup). */
function whyChoose() {
  const reasons = [
    ["userCheck", "Professional chauffeurs", "Vetted, courteous chauffeurs who know the DC metro and every area airport."],
    ["plane", "Flight-tracked transfers", "We monitor your flight and time pickups to your real arrival — to and from IAD, DCA, and BWI."],
    ["van", `${SITE.fleet.length} vehicle classes`, "From executive sedans to charter buses — the right vehicle for any group or occasion."],
    ["pin", "Local DC-metro expertise", "Door-to-door knowledge of DC, Maryland, and Northern Virginia."],
    ["clock", "Available 24/7", "Dedicated booking support every day of the year, including holidays."],
    ["shield", "Discreet &amp; reliable", "Immaculate vehicles, punctual service, and privacy on every ride."],
  ];
  const cards = reasons
    .map(([name, t, d]) =>
      cbox({
        cls: "why-card card-surface",
        lead: `<span class="why-card__ico" aria-hidden="true">${icon(name, { size: 22 })}</span>`,
        title: t, titleCls: "why-card__title", act: { modal: {} },
        bodyHtml: `<p class="why-card__desc">${d}</p>`,
      })
    )
    .join("\n          ");
  return `
    <section class="section" aria-labelledby="why-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Why Landio</span>
          <h2 id="why-title">The difference is in every detail</h2>
          <p class="text-secondary">One trusted chauffeured partner across Washington, DC, Maryland, and Northern Virginia — built on professionalism, precision, and genuine hospitality.</p>
        </div>
        <ul class="why-grid">${cards}
        </ul>
      </div>
    </section>`;
}

/** Service-area band — villages + airports we cover. */
function serviceArea() {
  const chip = (t) => `<li class="area-pill">${esc(t)}</li>`;
  return `
    <section class="section section--alt about-area" aria-labelledby="area-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Where We Drive</span>
          <h2 id="area-title">Serving DC, Maryland &amp; Virginia</h2>
          <p class="text-secondary">Chauffeured car service across the DC metro, with flight-tracked transfers to and from the region's three airports — IAD, DCA, and BWI.</p>
        </div>
        <div class="about-area__group">
          <p class="about-area__label"><span class="about-area__ico" aria-hidden="true">${icon("pin", { size: 16 })}</span>DC, Maryland &amp; Virginia</p>
          <ul class="area-pills">${VILLAGES.map(chip).join("")}</ul>
        </div>
        <div class="about-area__group">
          <p class="about-area__label"><span class="about-area__ico" aria-hidden="true">${icon("plane", { size: 16 })}</span>Airports we cover</p>
          <ul class="area-pills">${AIRPORTS.map(chip).join("")}</ul>
        </div>
      </div>
    </section>`;
}

export function about() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us/" },
  ];
  return {
    path: "/about-us/",
    title: "About",
    description:
      "About Landio Limo Services — the DC metro's chauffeured luxury car service. Professional chauffeurs, a five-class fleet, and 24/7 flight-tracked airport transfers across Washington, DC, Maryland, and Northern Virginia.",
    bodyClass: "page-about",
    main: [
      breadcrumb(trail),
      hero(),
      statsStrip(),
      ourStory(),
      missionVision(),
      whyChoose(),
      serviceArea(),
      eventCta(),
      contactBar(),
    ].join("\n"),
  };
}
