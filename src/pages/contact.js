/**
 * Contact page (/contact/). Premium image hero (trust row + gold divider), the
 * shared homepage contact bar, and a "Send Us A Message" form beside a map of
 * the Hamptons service area. The message form POSTs to /api/lead via the shared
 * [data-quote-form] handler (fields/validation/spam-guard/consent unchanged).
 */

import { breadcrumb, pageHero, contactSection } from "./_sections.js";
import { SITE, DEFAULT_SITE_URL, absoluteUrl, breadcrumbJsonLd } from "../config.js";
import { esc } from "../templates/partials.js";

/** "Send Us A Message" — 2 columns: form (left) + office map (right). */
function messageForm() {
  const a = SITE.address;
  // Verified Google Business Profile embed for Aura Hamptons — the marker is
  // pinned on the registered office at 12410 Milestone Center Dr, Germantown, MD 20876.
  const mapSrc = "https://www.google.com/maps?q=12410%20Milestone%20Center%20Dr%20Suite%20600,%20Germantown,%20MD%2020876&output=embed";
  return `
    <section class="section" aria-labelledby="message-title">
      <div class="container">
        <div class="contact-split">
          <div class="quote-card" data-quote-card>
            <div class="section-head section-head--left">
              <span class="eyebrow">Reach Out</span>
              <h2 id="message-title">Send Us A Message</h2>
            </div>
            <form class="quote-form" id="contact-message" data-quote-form data-form-location="contact" novalidate>
              <div class="quote-hp" aria-hidden="true">
                <label>Company website<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label>
              </div>
              <div class="quote-grid">
                <label class="quote-field quote-field--full"><span>Name</span>
                  <input class="bf-input" type="text" name="name" placeholder="Name" autocomplete="name" required></label>
                <label class="quote-field"><span>Phone Number</span>
                  <input class="bf-input" type="tel" name="phone" placeholder="Phone Number" autocomplete="tel" required></label>
                <label class="quote-field"><span>Email</span>
                  <input class="bf-input" type="email" name="email" placeholder="Email" autocomplete="email" required></label>
                <label class="quote-field quote-field--full"><span>Message</span>
                  <textarea class="bf-input" name="message" placeholder="Message" rows="5" required></textarea></label>
              </div>
              <div class="quote-actions">
                <button type="submit" class="btn btn-primary" data-quote-submit>Send Message</button>
              </div>
              <p class="quote-status" role="status" aria-live="polite" hidden></p>
              <input type="hidden" name="page_url"><input type="hidden" name="referrer">
              <input type="hidden" name="submitted_at">
              <input type="hidden" name="form_location" value="contact">
            </form>
          </div>
          <div class="contact-map">
            <iframe
              src="${esc(mapSrc)}"
              title="${esc(SITE.company)} office — ${esc(`${a.street}, ${a.city}, ${a.region}`)}"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </section>`;
}

export function contact() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact/" },
  ];
  const main = [
    breadcrumb(trail),
    pageHero({
      eyebrow: "Get In Touch",
      h1: "Contact Landio Limo Services",
      lede: "Questions or ready to book? Reach us 24/7 by phone, email, or the form below.",
      withForm: false,
      image: "/assets/img/hero/dc-hero",
      features: [
        { icon: "clock", label: "Available 24/7" },
        { icon: "message", label: "We respond within 1 hour" },
        { icon: "shield", label: "Professional chauffeurs" },
        { icon: "plane", label: "Flight-tracked airport transfers" },
      ],
    }),
    contactSection({ alt: false }),
    messageForm(),
  ].join("\n");

  const origin = DEFAULT_SITE_URL.replace(/\/+$/, "");
  const description =
    `Contact Landio Limo Services for DC-metro luxury car service and airport transfers. Call ${SITE.phone.display} or email ${SITE.email} — available 24/7.`;

  return {
    path: "/contact/",
    title: "Contact Us",
    description,
    bodyClass: "page-contact",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Landio Limo Services",
        url: absoluteUrl(DEFAULT_SITE_URL, "/contact/"),
        description,
        mainEntity: { "@id": `${origin}/#business` },
      },
      breadcrumbJsonLd(DEFAULT_SITE_URL, trail),
    ],
    main,
  };
}
