/**
 * Fleet hub (/fleet/). Premium redesign consistent with the home / about /
 * partner pages' metallic gold-gradient language:
 *   image hero → one unified fleet showcase grid (all six classes, each with
 *   View details + Book Now) → "every ride includes" standards strip →
 *   event CTA + contact section.
 *
 * All six classes come straight from the SSOT (SITE.fleet); capacities/bags
 * live in CAPACITY (config). CollectionPage + ItemList ties the hub to the
 * six vehicle spokes. Copy stays neutral — no vehicle model names.
 */

import { SITE, collectionJsonLd, DEFAULT_SITE_URL, CAPACITY, paxLabel } from "../config.js";
import { esc } from "../templates/partials.js";
import { pageHero, contactSection, eventCta } from "./_sections.js";
import { icon } from "../templates/icons.js";

const seatIco = `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 19v-3h9a2 2 0 0 0 2-2V5M6 16a2 2 0 0 1-2-2V7"/></svg>`;
const bagIco = `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="8" width="12" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`;

/** A compact passenger badge, e.g. "Up to 6". */
const paxBadge = (c) => (c.paxMin ? `${c.paxMin}–${c.paxMax}` : `Up to ${c.paxMax}`);

/** The unified premium fleet grid — one card per class, two clear actions. */
function fleetShowcase() {
  const cards = SITE.fleet
    .map((v) => {
      const cap = CAPACITY[v.key];
      const amen = (v.amenities || []).slice(0, 4)
        .map((a) => `<li class="flh-amen">${esc(a)}</li>`)
        .join("");
      return `
        <li class="flh-card card-surface">
          <a class="flh-card__media" href="/fleet/${esc(v.slug)}/" tabindex="-1" aria-hidden="true">
            <picture>
              <source type="image/webp" srcset="${v.imageBase}-640.webp 640w, ${v.imageBase}-1024.webp 1024w" sizes="(min-width:900px) 33vw, 90vw">
              <img src="${v.imageBase}-1024.jpg" srcset="${v.imageBase}-640.jpg 640w, ${v.imageBase}-1024.jpg 1024w" sizes="(min-width:900px) 33vw, 90vw" alt="${esc(v.name)} — Landio Limo Services" loading="lazy" decoding="async" width="1024" height="576">
            </picture>
            <span class="flh-card__badge"><span class="flh-card__badge-ico" aria-hidden="true">${icon("users", { size: 13 })}</span>${esc(paxBadge(cap))}</span>
          </a>
          <div class="flh-card__body">
            <h3 class="flh-card__name"><a href="/fleet/${esc(v.slug)}/">${esc(v.name)}</a></h3>
            <ul class="flh-card__specs">
              <li>${seatIco}<strong>${esc(String(v.seats))}</strong>&nbsp;seats</li>
              <li>${bagIco}${v.bags ? `<strong>${esc(String(v.bags))}</strong>&nbsp;bags` : "Luggage on request"}</li>
            </ul>
            <p class="flh-card__desc">${esc(v.desc)}</p>
            ${amen ? `<ul class="flh-card__amen">${amen}</ul>` : ""}
            <div class="flh-card__actions">
              <a class="btn btn-ghost flh-card__view" href="/fleet/${esc(v.slug)}/">View details</a>
              <button type="button" class="btn btn-primary flh-card__book" data-open-quote aria-haspopup="dialog" data-prefill-vehicle="${esc(v.name)}" data-card-label="${esc(v.name)}" aria-label="Book the ${esc(v.name)}">Book Now</button>
            </div>
          </div>
        </li>`;
    })
    .join("");
  return `
    <section class="section" aria-labelledby="choose-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Choose Your Ride</span>
          <h2 id="choose-title">Six Vehicle Classes, One Exceptional Standard</h2>
          <p class="text-secondary">From the Executive Sedan to the Charter Bus — every class is hand-picked, immaculately maintained, and chauffeur-driven across Washington, DC, Maryland, and Northern Virginia.</p>
        </div>
        <ul class="flh-grid">${cards}
        </ul>
      </div>
    </section>`;
}

/** "Every Aura ride includes" — shared standards strip (premium icon tiles). */
function standardsStrip() {
  const items = [
    ["userCheck", "Professional chauffeurs", "Vetted, courteous, and discreet."],
    ["plane", "Flight-tracked transfers", "Pickups timed to your real arrival."],
    ["wifi", "Complimentary Wi-Fi", "Stay connected on every ride."],
    ["thermo", "Climate control", "Your comfort, your temperature."],
    ["plug", "USB charging", "Arrive with a full battery."],
    ["shield", "Privacy & discretion", "A calm, confidential journey."],
  ];
  const cards = items
    .map(
      ([name, t, d]) => `
          <li class="flh-std cbox">
            <span class="flh-std__ico" aria-hidden="true">${icon(name, { size: 20 })}</span>
            <div class="flh-std__text">
              <h3 class="flh-std__title cbox__title"><button type="button" class="cbox__action" data-open-quote aria-label="${esc(t)} — get an instant quote">${esc(t)}</button></h3>
              <p class="flh-std__desc">${esc(d)}</p>
            </div>
          </li>`
    )
    .join("");
  return `
    <section class="section section--alt" aria-labelledby="std-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">The Landio Standard</span>
          <h2 id="std-title">Every ride, impeccably appointed</h2>
          <p class="text-secondary">Whichever class you choose, the details are the same — comfort, connectivity, and care from the first call to the final destination.</p>
        </div>
        <ul class="flh-stds">${cards}
        </ul>
      </div>
    </section>`;
}

export function fleetPage() {
  const items = SITE.fleet.map((v) => ({ name: v.name, path: `/fleet/${v.slug}/` }));
  return {
    path: "/fleet/",
    title: "Fleet",
    description:
      `The Landio fleet — Executive Sedan (${paxLabel(CAPACITY.sedan)}), Executive SUV (${paxLabel(CAPACITY.suv)}), Sprinter Van (${paxLabel(CAPACITY.sprinter)}), Minibus (${paxLabel(CAPACITY.minibus)}), and Charter Bus (${paxLabel(CAPACITY.coach)}). Chauffeured luxury across the DC metro.`,
    bodyClass: "page-fleet",
    cluster: "fleet",
    hub: true,
    card: { title: "Our fleet", text: "Compare all six vehicle classes by passengers and bags.", icon: "car" },
    jsonLd: [collectionJsonLd(DEFAULT_SITE_URL, { name: "Fleet", path: "/fleet/", items })],
    main: [
      pageHero({
        eyebrow: "Our Premium Fleet",
        h1: "Our Fleet",
        withForm: false,
        image: "/assets/img/hero/dc-hero",
        ledeHtml: `Five immaculate vehicle classes — the right choice for <a href="/services/airport-transfers/">airport transfers</a>, executive travel, diplomatic service, and group trips across Washington, DC, Maryland, and Northern Virginia.`,
        features: [
          { icon: "car", label: "5 vehicle classes" },
          { icon: "users", label: "Up to 56 passengers" },
          { icon: "plane", label: "Flight-tracked transfers" },
          { icon: "clock", label: "Available 24/7" },
        ],
      }),
      fleetShowcase(),
      standardsStrip(),
      eventCta(),
      contactSection(),
    ].join("\n"),
  };
}
