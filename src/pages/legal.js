/**
 * Legal pages — Terms of Service and Privacy Policy.
 *
 * Generic-but-complete NY car-service Terms and Privacy for Aura Hamptons. All
 * entity-sensitive values (legalName, smsNumber, effective dates, director) are
 * read from SITE AS-IS — these are deliberate CONFIRM placeholders (see
 * config.js) and must be verified with the client before launch:
 *   - SITE.legalName — the registered entity on the final Terms.
 *   - SITE.smsNumber — the registered A2P 10DLC sending number.
 *   - SITE.termsEffectiveDate / privacyEffectiveDate — the final effective dates.
 * The SMS / A2P 10DLC language reads from those SITE fields (no hardcoded
 * entity or number). The SMS opt-in on the forms is optional and unchecked.
 */

import { SITE, DEFAULT_SITE_URL } from "../config.js";
import { esc, btnIcon } from "../templates/partials.js";
import { breadcrumb, contactSection } from "./_sections.js";
import { icon } from "../templates/icons.js";

const h2 = (t, id) => `<h2${id ? ` id="${id}"` : ""}>${esc(t)}</h2>`;
const h3 = (t) => `<h3>${esc(t)}</h3>`;
const p = (t) => `<p>${esc(t)}</p>`;
const raw = (html) => html;
const ul = (items) =>
  `<ul>${items.map((li) => `<li>${esc(li)}</li>`).join("")}</ul>`;

const SITE_URL = DEFAULT_SITE_URL.replace(/\/+$/, "");
const A = SITE.address;
const siteLink = `<a href="${SITE_URL}">${SITE_URL}</a>`;
const addressBlock = `<p>${esc(SITE.legalName)}<br>${esc(A.street)}<br>${esc(A.city)}, ${esc(A.region)} ${esc(A.postalCode)}, ${esc(A.countryName)}</p>`;

/* --------------------------------------------------------------------- *
 * Terms §7 — SMS / A2P 10DLC. Reads the registered entity + 10DLC number
 * from SITE (CONFIRM placeholders). Do not hardcode an entity or number here.
 * --------------------------------------------------------------------- */
const SMS_SECTION_7 = [
  h2("7. SMS Communications & A2P 10DLC Compliance"),
  p(`By providing your phone number and explicitly opting in through our website booking forms or contact forms, you consent to receive SMS communications from ${SITE.legalName} at ${SITE.smsNumber} regarding:`),
  ul([
    "Reservation confirmations",
    "Driver dispatch notifications",
    "Appointment reminders",
    "Service updates",
    "Customer support communications",
  ]),
  p("Message frequency varies based on your booking activity. Message and data rates may apply."),
  p("Consent to receive SMS messages is not a condition of purchase."),
  raw("<p>You may opt out at any time by replying STOP.<br>For assistance, reply HELP.</p>"),
  p("We do not sell, rent, or share your mobile information with third parties for marketing purposes. Mobile information may only be shared with service providers necessary to deliver SMS communications."),
  p("Carriers are not liable for delayed or undelivered messages."),
];

/* ------------------------------ Disclaimer ----------------------------- *
 * Standard informational/liability disclaimer, consistent with the Terms
 * (limitation of liability) and the actual service model. No refund or
 * cancellation figures are stated here (those live in the Cancellation Policy). */
const DISCLAIMER = [
  raw(`<p><strong>Effective Date: ${esc(SITE.termsEffectiveDate)}</strong></p>`),
  raw(`<p>This Disclaimer governs your use of ${siteLink} (the “Website”), operated by ${esc(SITE.legalName)} (“Company,” “we,” “our,” or “us”). By accessing or using this Website, you accept this Disclaimer in full.</p>`),

  h2("1. Website Information & Accuracy"),
  p("The information on this Website is provided for general informational purposes only. While we make every effort to keep it accurate and current, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the Website or its content. Any reliance you place on such information is strictly at your own risk."),

  h2("2. Service Availability & Limitations"),
  p("Our transportation services are subject to availability and confirmation and may be affected by factors beyond our control, including traffic, weather, road conditions, and third-party providers. Descriptions of vehicles and services are a general guide; specific vehicles, features, capacities, and timing are confirmed at the time of booking and may vary."),

  h2("3. Pricing & Quotation Information"),
  p("Any prices, quotes, or estimates shown or provided through this Website are indicative and subject to confirmation. Final pricing is confirmed at the time of booking and may vary based on your itinerary, vehicle selection, timing, wait time, tolls, gratuity, and other applicable charges. We do not process payments through this Website."),

  h2("4. External Links & Third-Party Services"),
  p("This Website may contain links to third-party websites or reference third-party services (such as mapping, analytics, and booking or communication providers). We do not control and are not responsible for the content, policies, or practices of any third party. The inclusion of a link or reference does not imply endorsement."),

  h2("5. No Professional Advice"),
  p("Nothing on this Website constitutes legal, financial, or other professional advice. For advice specific to your circumstances, please consult an appropriate professional."),

  h2("6. Limitation of Liability"),
  raw(`<p>To the fullest extent permitted by law, ${esc(SITE.legalName)} shall not be liable for any loss or damage — whether direct, indirect, incidental, consequential, or otherwise — arising out of or in connection with your use of this Website or reliance on its content. Nothing in this Disclaimer excludes or limits any liability that cannot be excluded or limited under applicable law. Please also review our <a href="/terms-of-service/">Terms of Service</a>.</p>`),

  h2("7. Changes to This Disclaimer"),
  p("We may update this Disclaimer from time to time. Any changes become effective when posted on this page."),

  h2("8. Contact Us"),
  raw(`<p>Questions about this Disclaimer? Contact ${esc(SITE.legalName)}:</p>`),
  raw(addressBlock),
  raw(`<p>Phone: ${esc(SITE.phone.display)}<br>Email: <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a><br>Website: ${siteLink}</p>`),
];

/* ------------------------------ SMS Policy ----------------------------- *
 * Mirrors the A2P 10DLC language in Terms §7 / Privacy §3, stated as a
 * standalone policy. Consent is described as given when a customer provides
 * their number and asks to be contacted (there is no standalone opt-in
 * checkbox on the forms), to stay consistent with the actual workflow. */
const SMS_POLICY = [
  raw(`<p><strong>Effective Date: ${esc(SITE.termsEffectiveDate)}</strong></p>`),
  raw(`<p>This SMS Policy explains how ${esc(SITE.legalName)} (“we,” “our,” or “us”) uses text messaging (SMS) in connection with our transportation services, consistent with A2P 10DLC requirements and carrier guidelines. SMS messages are sent from ${esc(SITE.smsNumber)}.</p>`),

  h2("1. Consent & Opt-In"),
  p("We send SMS messages only to customers who have provided their mobile number and agreed to be contacted by text — for example, when booking a ride, requesting a quote, or contacting us and asking to be reached by SMS. Consent to receive SMS messages is not a condition of purchase."),

  h2("2. Types of Messages You May Receive"),
  ul([
    "Reservation confirmations",
    "Driver dispatch notifications",
    "Appointment reminders",
    "Service updates",
    "Customer support communications",
  ]),

  h2("3. Message Frequency"),
  p("Message frequency varies based on your booking activity. You will generally receive messages only in connection with a reservation or request you have made."),

  h2("4. Message & Data Rates"),
  p("Message and data rates may apply, depending on your mobile carrier and plan. We do not charge for SMS messages, but your carrier's standard rates will apply."),

  h2("5. Opt-Out — Reply STOP"),
  raw("<p>You may opt out of SMS messages at any time by replying <strong>STOP</strong> to any message you receive from us. After you reply STOP, we will stop sending SMS messages, except for a single confirmation that you have been unsubscribed.</p>"),

  h2("6. Help — Reply HELP"),
  raw(`<p>For help, reply <strong>HELP</strong> to any message, or contact us directly at ${esc(SITE.phone.display)} or <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>.</p>`),

  h2("7. Privacy & Handling of SMS Information"),
  raw(`<p>We do not sell, rent, or share your mobile information with third parties for marketing purposes. Mobile information may only be shared with service providers necessary to deliver SMS communications (such as our messaging platform). For more detail, see our <a href="/privacy-policy/">Privacy Policy</a>.</p>`),
  p("Carriers are not liable for delayed or undelivered messages."),

  h2("8. Customer Support"),
  raw(`<p>Questions about our SMS program? Contact ${esc(SITE.legalName)}:</p>`),
  raw(addressBlock),
  raw(`<p>Phone: ${esc(SITE.phone.display)}<br>Email: <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a><br>Website: ${siteLink}</p>`),
];

/* ------------------------------- Terms --------------------------------- */
const TERMS = [
  raw(`<p><strong>Effective Date: ${esc(SITE.termsEffectiveDate)}</strong></p>`),
  raw(`<p>Welcome to ${siteLink} (the “Website”), operated by ${esc(SITE.legalName)} (“Company,” “we,” “our,” or “us”). These Terms of Service (“Terms”) govern your access to and use of our website and limousine transportation services.</p>`),
  p("By accessing this Website or booking our services, you agree to be bound by these Terms."),

  h2("1. Company Information"),
  raw(`<p>${esc(SITE.legalName)}<br>${esc(A.street)}<br>${esc(A.city)}, ${esc(A.region)} ${esc(A.postalCode)}, ${esc(A.countryName)}<br>Phone: ${esc(SITE.phone.display)}<br>Website: ${siteLink}</p>`),
  p("We provide professional chauffeured transportation services including Executive Sedans, Luxury SUVs, Sprinter Vans, Mini Buses, and Charter Buses."),

  h2("2. Eligibility"),
  p("By using our website and services, you confirm that:"),
  ul([
    "You are at least 18 years old",
    "You have the legal authority to enter into binding agreements",
    "The information you provide is accurate and complete",
  ]),

  h2("3. Description of Service"),
  p(`${SITE.legalName} provides:`),
  ul([
    "Airport transportation",
    "Hourly chauffeur services",
    "Event transportation",
    "Corporate transportation",
    "Private transfers",
  ]),
  p("All services are subject to vehicle availability and confirmed reservation."),

  h2("4. Booking & Payment Terms"),
  ul([
    "All bookings must be confirmed prior to service.",
    "Pricing is based on distance, vehicle type, service duration, tolls, and additional stops.",
    "Full or partial payment may be required at the time of booking.",
    "Additional charges may apply for waiting time, route changes, damages, or additional services requested during the trip.",
  ]),
  p("Failure to provide accurate booking information may result in service delays or additional fees."),

  h2("5. Cancellation & No-Show Policy", "cancellation"),
  ul([
    "Cancellations must be made at least 24 hours before the scheduled pickup time.",
    // CLIENT-APPROVED EDIT to the live Terms (live text: "may incur charges").
    "Cancellations made less than 24 hours prior will be charged 100% of the fare.",
    "No-shows may result in full service charge.",
  ]),
  p("Refunds, if applicable, will be processed to the original payment method."),

  h2("6. Passenger Conduct"),
  p("Passengers agree to:"),
  ul([
    "Follow all safety instructions",
    "Not engage in illegal activity",
    "Not smoke inside vehicles",
    "Avoid damage to the vehicle",
  ]),
  p("The Company reserves the right to refuse service if a passenger poses a safety risk, engages in illegal activity, or damages property."),
  p("Passengers are financially responsible for damages caused during service."),

  ...SMS_SECTION_7,

  h2("8. Limitation of Liability"),
  p(`${SITE.legalName} is not liable for:`),
  ul([
    "Delays caused by traffic, weather, accidents, or road conditions",
    "Missed flights or appointments due to circumstances beyond our control",
    "Items left inside vehicles",
  ]),
  p("We strive to provide timely and reliable service but cannot guarantee arrival times due to external factors."),
  p("Our maximum liability shall not exceed the amount paid for the specific service in question."),

  h2("9. Intellectual Property"),
  p(`All content on this Website, including text, logos, branding, images, and design elements, is the property of ${SITE.legalName} and may not be copied, reproduced, or distributed without written permission.`),

  h2("10. Website Use Restrictions"),
  p("You agree not to:"),
  ul([
    "Use the Website for unlawful purposes",
    "Attempt to hack or disrupt Website functionality",
    "Submit false or misleading information",
    "Interfere with other users’ access",
  ]),
  p("Violation of these terms may result in termination of access."),

  h2("11. Privacy"),
  p("Your use of our Website and services is also governed by our Privacy Policy available at:"),
  raw('<p><a href="/privacy-policy/">Privacy Policy</a></p>'),

  h2("12. Governing Law"),
  p("These Terms are governed by the laws of the State of Maryland, United States, without regard to conflict of law principles."),
  p("Any disputes shall be resolved in courts located in Maryland."),

  h2("13. Changes to These Terms"),
  p("We may update these Terms of Service at any time. Changes will be posted on this page with a revised effective date."),
  p("Continued use of the Website or services after updates constitutes acceptance of the revised Terms."),
];

/* ------------------------------ Privacy -------------------------------- */
const emailLine = `<p><strong>Email:</strong> <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>`;
const phoneLine = `<p><strong>Phone:</strong> ${esc(SITE.phone.display)}</p>`;

const PRIVACY = [
  raw(`<p><strong>Effective Date: ${esc(SITE.privacyEffectiveDate)}</strong></p>`),
  raw(`<p>${esc(SITE.legalName)} (“Company,” “we,” “our,” or “us”) operates ${siteLink} (the “Website”) and provides chauffeured transportation services across the Washington, DC metropolitan area, including Washington, DC, Maryland, and Northern Virginia.</p>`),
  p("This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Website, use our services, or communicate with us via phone, SMS, email, or online forms."),
  p("By using our Website or services, you agree to the terms of this Privacy Policy."),

  h2("1. Information We Collect"),
  h3("A. Personal Information"),
  p("We may collect the following personal information when you interact with us:"),
  ul([
    "Name",
    "Email address",
    "Phone number",
    "Pickup and drop-off locations",
    "Flight information",
    "Billing and payment details",
    "Any information submitted through booking forms, contact forms, or customer support",
  ]),
  h3("B. Automatically Collected Information"),
  p("When you visit our Website, we may automatically collect:"),
  ul([
    "IP address",
    "Browser type and version",
    "Device information",
    "Pages visited",
    "Time spent on pages",
    "Cookies and tracking technologies",
  ]),
  h3("C. SMS & Call Information"),
  p("When you communicate with us via SMS or calls, we may collect:"),
  ul([
    "Your phone number",
    "Your SMS opt-in consent record",
    "Message content",
    "Delivery and read receipts",
    "Call logs (time, date, duration)",
  ]),

  h2("2. How We Use Your Information"),
  p("We use collected information to:"),
  ul([
    "Provide limousine transportation services",
    "Confirm bookings and send service updates",
    "Respond to inquiries and customer support requests",
    "Process payments and send invoices",
    "Improve website performance",
    "Send SMS notifications and reminders to customers who have opted in",
    "Comply with legal and regulatory requirements",
  ]),

  h2("3. SMS Communications, Consent & Opt-Out"),
  p(`If you explicitly opt in through our website booking forms or contact forms, we will send SMS communications from ${SITE.legalName} at ${SITE.smsNumber} regarding:`),
  ul([
    "Reservation confirmations",
    "Driver dispatch notifications",
    "Appointment reminders",
    "Service updates",
    "Customer support communications",
  ]),
  p("Message frequency varies based on your booking activity. Message and data rates may apply."),
  p("Consent to receive SMS messages is not a condition of purchase. The SMS opt-in checkbox on our forms is optional and unchecked by default."),
  raw("<p>You may opt out at any time by replying STOP.<br>For assistance, reply HELP.</p>"),

  h2("4. Mobile Information Is Not Shared"),
  p("We do not sell, rent, or share your mobile information with third parties for marketing purposes. Mobile information may only be shared with service providers necessary to deliver SMS communications."),
  // Carrier-standard opt-in sentence — added by us (not from the client's live
  // text); kept at the client's request. Flagged in the build report.
  p("Text messaging originator opt-in data and consent will not be shared with any third parties, except service providers necessary to deliver SMS communications."),

  h2("5. How We Share Other Information"),
  p("Apart from mobile information (see Section 4), we may share your information with:"),
  ul([
    "Chauffeurs and service partners to fulfill transportation services",
    "Payment processors for billing",
    "Communication providers that deliver our messages",
    "Website hosting and analytics platforms",
    "Legal authorities when required by law",
  ]),
  p("We do not sell or rent your personal data."),

  h2("6. Data Security"),
  p("We use industry-standard security measures to protect your information, including:"),
  ul([
    "SSL encryption",
    "Secure servers",
    "Restricted access to personal data",
    "Regular monitoring of systems",
  ]),
  p("However, no online transmission is 100% secure. You use the Website at your own risk."),

  h2("7. Cookies & Tracking Technologies"),
  p("We use cookies to:"),
  ul(["Improve user experience", "Remember your preferences", "Analyze website performance"]),
  p("You may disable cookies through your browser settings, but some features may not function properly."),

  h2("8. Third-Party Links"),
  p("Our Website may include links to third-party websites. We are not responsible for the privacy practices of these sites. We encourage you to read their Privacy Policies."),

  h2("9. Data Retention"),
  p("We retain your data for as long as necessary to:"),
  ul(["Provide services", "Comply with legal obligations", "Resolve disputes", "Maintain business records"]),

  h2("10. Children’s Privacy"),
  p("Our services are not intended for individuals under the age of 18. We do not knowingly collect information from minors. If we learn that a minor’s data has been collected, we will delete it promptly."),

  h2("11. Your Rights"),
  p("Depending on your location, you may have rights to:"),
  ul([
    "Access your data",
    "Correct inaccuracies",
    "Request deletion",
    "Opt out of marketing communications",
    "Withdraw SMS or email consent",
  ]),
  p("To exercise these rights, contact us at:"),
  raw(emailLine),
  raw(phoneLine),

  h2("12. Changes to This Privacy Policy"),
  p("We may update this Privacy Policy from time to time. Changes take effect immediately upon posting on this page."),

  h2("13. Contact Us"),
  p("If you have questions about this Privacy Policy or how your data is handled, you may contact us at:"),
  raw(addressBlock),
  raw(emailLine),
  raw(phoneLine),
];

function legalPage({ path, title, h1, blocks, trail, description }) {
  const main = [
    breadcrumb(trail),
    `
    <section class="section">
      <div class="container prose">
        <h1>${esc(h1)}</h1>
        ${blocks.join("\n        ")}
      </div>
    </section>`,
  ].join("\n");
  return { path, title, description, bodyClass: "page-legal", main };
}

/* ------------------------- Cancellation Policy ------------------------- *
 * A standalone, premium presentation of the tiered cancellation windows.
 * Content is verbatim from the client; no fees/penalties invented, and the
 * Terms page + CANCELLATION const are left untouched. */
function cancellationPolicyPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Cancellation Policy", path: "/cancellation-policy/" },
  ];
  const tiers = [
    { icon: "car", title: "SUVs & Sedans", window: "12 hours", desc: "Free cancellation up to 12 hours before the scheduled pickup time." },
    { icon: "van", title: "Sprinters & Larger Vehicles", window: "24 hours", desc: "Free cancellation up to 24 hours before the scheduled pickup time." },
  ];
  const cards = tiers.map((t) => `
          <li class="cp-card card-surface">
            <span class="cp-card__ico" aria-hidden="true">${icon(t.icon, { size: 26 })}</span>
            <div class="cp-card__text">
              <h2 class="cp-card__title">${esc(t.title)}</h2>
              <p class="cp-card__desc">${esc(t.desc)}</p>
            </div>
            <span class="cp-card__badge">Free up to<strong>${esc(t.window)}</strong>before pickup</span>
          </li>`).join("");
  const main = [
    breadcrumb(trail),
    `
    <section class="section cp-head" aria-labelledby="cp-title">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Reservations</span>
          <h1 id="cp-title">Cancellation Policy</h1>
          <p class="text-secondary">We understand that plans can change. At Landio Limo Services, we aim to make the reservation and cancellation process as straightforward as possible. Please review our cancellation terms below.</p>
        </div>
      </div>
    </section>
    <section class="section section--alt" aria-label="Cancellation windows by vehicle class">
      <div class="container">
        <ul class="cp-grid">${cards}
        </ul>
      </div>
    </section>
    <section class="section" aria-labelledby="cp-contact-title">
      <div class="container">
        <div class="cp-contact card-surface">
          <span class="cp-contact__ico" aria-hidden="true">${icon("message", { size: 26 })}</span>
          <h2 id="cp-contact-title">Need to Cancel Your Reservation?</h2>
          <p>For cancellation assistance, please contact our team using the existing contact details available on the website.</p>
          <div class="cp-contact__actions">
            <a class="btn btn-primary" href="tel:${esc(SITE.phone.e164)}">${btnIcon("phone")}Call ${esc(SITE.phone.display)}</a>
            <a class="btn btn-ghost" href="mailto:${esc(SITE.email)}">${btnIcon("mail")}Email ${esc(SITE.email)}</a>
          </div>
        </div>
      </div>
    </section>`,
    contactSection(),
  ].join("\n");
  return {
    path: "/cancellation-policy/",
    title: "Cancellation Policy",
    description: `Cancellation Policy for ${SITE.company} — free cancellation up to 12 hours before pickup for SUVs and sedans, and up to 24 hours for Sprinters and larger vehicles.`,
    bodyClass: "page-cancellation",
    main,
  };
}

export function legalPages() {
  return [
    cancellationPolicyPage(),
    legalPage({
      path: "/privacy-policy/",
      title: "Privacy Policy",
      h1: "Privacy Policy",
      description: `Privacy Policy for ${SITE.legalName} (${SITE_URL}), including SMS consent and mobile-information practices.`,
      blocks: PRIVACY,
      trail: [
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy/" },
      ],
    }),
    legalPage({
      path: "/terms-of-service/",
      title: "Terms of Service",
      h1: "Terms of Service",
      description: `Terms of Service for ${SITE.legalName} (${SITE_URL}), effective ${SITE.termsEffectiveDate}.`,
      blocks: TERMS,
      trail: [
        { name: "Home", path: "/" },
        { name: "Terms of Service", path: "/terms-of-service/" },
      ],
    }),
    legalPage({
      path: "/disclaimer/",
      title: "Disclaimer",
      h1: "Disclaimer",
      description: `Disclaimer for ${SITE.legalName} (${SITE_URL}) — website accuracy, service and pricing limitations, and liability.`,
      blocks: DISCLAIMER,
      trail: [
        { name: "Home", path: "/" },
        { name: "Disclaimer", path: "/disclaimer/" },
      ],
    }),
    legalPage({
      path: "/sms-policy/",
      title: "SMS Policy",
      h1: "SMS Policy",
      description: `SMS Policy for ${SITE.legalName} — A2P 10DLC messaging: consent, message types, frequency, rates, and STOP/HELP opt-out.`,
      blocks: SMS_POLICY,
      trail: [
        { name: "Home", path: "/" },
        { name: "SMS Policy", path: "/sms-policy/" },
      ],
    }),
  ];
}
