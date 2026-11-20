/**
 * Reservations page (/reservations/) — "Book Your Ride". Premium hero with the
 * shared multi-step booking form (the existing /api/lead integration), a
 * how-it-works section, the fleet picker, booking FAQs, and contact.
 */

import { breadcrumb, pageHero, threeStepsSection, fleetSection, faqAccordion, contactSection } from "./_sections.js";
import { SITE, DEFAULT_SITE_URL, breadcrumbJsonLd, faqJsonLd } from "../config.js";
import { icon } from "../templates/icons.js";
import { esc } from "../templates/partials.js";

/** How a reservation is confirmed after the trip request is sent — mirrors the
 *  original booking workflow (email confirmation + trip cost, payment
 *  instructions). No payment is taken on the website; exact payment/gratuity
 *  terms are confirmed with the client. */
function afterBooking() {
  const items = [
    { icon: "message", t: "Email Confirmation & Trip Cost", d: "We respond by email to confirm your reservation and the total trip cost — typically within the hour." },
    { icon: "shield", t: "Payment Instructions", d: "Payment instructions are provided with your confirmation. No payment is collected on this website." },
    // NEEDS CLIENT CONFIRMATION — gratuity: this line is intentionally neutral and
    // does NOT assert an (unconfirmed) "gratuity is/ isn't included" policy. Make it
    // explicit once the owner confirms the gratuity policy.
    { icon: "userCheck", t: "Gratuity", d: "Any applicable gratuity will be noted with your confirmation." },
  ];
  const cards = items.map((c) => `
          <li class="ap-why card-surface">
            <span class="ap-card__ico" aria-hidden="true">${icon(c.icon, { size: 22 })}</span>
            <h3 class="ap-why__title">${esc(c.t)}</h3>
            <p class="ap-card__desc">${esc(c.d)}</p>
          </li>`).join("");
  return `
    <section class="section section--alt" aria-labelledby="res-after-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">After You Book</span>
          <h2 id="res-after-title">What Happens Next</h2>
          <p class="text-secondary">Choose your service and vehicle, create your trip, and we'll take it from there.</p>
        </div>
        <!-- NEEDS CLIENT CONFIRMATION — the "Gratuity" card copy is intentionally
             neutral; it does not assert an (unconfirmed) included/not-included
             policy. Make it explicit once the owner confirms the gratuity policy. -->
        <ul class="ap-grid ap-grid--why">${cards}
        </ul>
      </div>
    </section>`;
}

const RES_FAQS = [
  { q: "How do I book a ride?", a: "Fill in the booking form with your pickup, drop-off, date, time, vehicle, and contact details, and we'll confirm your reservation. You can also call or email us anytime." },
  { q: "How far in advance should I book?", a: "We recommend booking as early as possible, especially in peak season. For airport transfers, share your flight details and we'll track your flight." },
  { q: "Can I request a specific vehicle?", a: "Yes. Choose your vehicle class in the booking form — Executive Sedan, Executive SUV, Sprinter Van, Minibus, or Charter Bus — and we'll confirm availability." },
  { q: "Do you track flights for airport pickups?", a: "Yes. Share your airline and flight number and your pickup adjusts to your actual arrival, with no charge for delays." },
  { q: "Can I change or cancel my reservation?", a: `Yes. Contact us at ${SITE.phone.display} or ${SITE.email} and we'll adjust your booking. Please review our Cancellation Policy for timing.` },
  { q: "How will I receive confirmation?", a: `We respond to every reservation request — typically within the hour — by phone or email to confirm the details. Landio Limo Services operates ${SITE.hours}.` },
];

export function reservations() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Reservations", path: "/reservations/" },
  ];
  const main = [
    breadcrumb(trail),
    pageHero({
      eyebrow: "Reservation",
      h1: "Book Your Ride",
      lede: "Reserve your Landio Limo Services chauffeured ride in minutes — airport transfers, executive travel, corporate, diplomatic, and group transport across Washington, DC, Maryland, and Northern Virginia.",
      withForm: true,
      image: "/assets/img/hero/dc-hero",
      features: [
        { icon: "clock", label: "Available 24/7" },
        { icon: "plane", label: "Flight-tracked airport transfers" },
        { icon: "userCheck", label: "Professional chauffeurs" },
        { icon: "shield", label: "Instant quote, no obligation" },
      ],
    }),
    threeStepsSection({ alt: false }),
    afterBooking(),
    fleetSection({ variant: "home", heading: "Choose Your Vehicle", eyebrow: "Our Fleet" }),
    faqAccordion({ faqs: RES_FAQS, lede: "Answers to common questions about booking your Landio Limo Services ride." }),
    contactSection(),
  ].join("\n");

  const origin = DEFAULT_SITE_URL.replace(/\/+$/, "");

  return {
    path: "/reservations/",
    title: "Reservations",
    titleFull: "Reservations & Booking | Landio Limo Services",
    description:
      "Book your Landio Limo Services ride — airport transfers, executive travel, corporate, diplomatic, and group transport across the DC metro. Instant quote, 24/7.",
    bodyClass: "page-reservations page-group-transfers",
    jsonLd: [
      { ...breadcrumbJsonLd(DEFAULT_SITE_URL, trail), "@id": `${origin}/reservations/#breadcrumb` },
      { ...faqJsonLd(RES_FAQS), "@id": `${origin}/reservations/#faq` },
    ],
    main,
  };
}
