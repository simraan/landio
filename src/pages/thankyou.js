/**
 * Thank You page — where the quote flow lands on a successful submit. Minimal
 * and self-contained; always noindex. The client reads the trip summary it
 * stashed in sessionStorage and renders it here (progressive enhancement).
 */

import { SITE } from "../config.js";
import { esc } from "../templates/partials.js";

export function thankyou() {
  return {
    path: "/thankyou/",
    title: "Thank You",
    description: "Your quote request has been received.",
    bodyClass: "page-thankyou",
    noindex: true,
    main: `
    <section class="section thankyou" aria-labelledby="ty-title">
      <div class="container thankyou__inner card-surface">
        <span class="eyebrow">Request received</span>
        <h1 id="ty-title">Thank you — your quote is on its way</h1>
        <p class="hero__lede">
          We've received your request and a member of our team is preparing your
          quotation now. You'll hear back from us shortly — ${esc(
            SITE.responsePromise.toLowerCase()
          )}
        </p>

        <div class="thankyou__summary" data-trip-summary hidden>
          <h2>Your trip</h2>
          <dl data-trip-summary-list></dl>
        </div>

        <div class="thankyou__meta text-secondary">
          <p>Need to reach us sooner?</p>
          <p>
            <a href="tel:${esc(SITE.phone.e164)}">${esc(SITE.phone.display)}</a>
            &nbsp;·&nbsp;
            <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
          </p>
        </div>

        <div class="thankyou__actions">
          <a class="btn btn-ghost" href="/">Back to home</a>
        </div>
      </div>
    </section>`,
  };
}
