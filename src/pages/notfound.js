/**
 * 404 page. Cloudflare Pages serves /404.html for unmatched routes, so this is
 * emitted as dist/404.html (not a directory index). Always noindex.
 */

import { SITE } from "../config.js";
import { esc } from "../templates/partials.js";

export function notFound() {
  return {
    path: "/404.html",
    title: "Page Not Found",
    description: "The page you're looking for isn't here.",
    bodyClass: "page-404",
    noindex: true,
    main: `
    <section class="section thankyou" aria-labelledby="nf-title">
      <div class="container thankyou__inner card-surface">
        <span class="eyebrow">404</span>
        <h1 id="nf-title">We can't find that page</h1>
        <p class="hero__lede">
          The page may have moved. Let's get you back on the road — explore our services
          or request an instant quote and we'll respond within the hour.
        </p>
        <div class="final-cta__actions" style="justify-content:center">
          <button type="button" class="btn btn-primary" data-open-quote>Get Instant Quote</button>
          <a class="btn btn-ghost" href="/">Back to home</a>
        </div>
        <div class="thankyou__meta text-secondary">
          <p>
            <a href="/services/">Services</a> &nbsp;·&nbsp;
            <a href="/fleet/">Fleet</a> &nbsp;·&nbsp;
            <a href="/services/airport-transfers/">Airport Transfers</a> &nbsp;·&nbsp;
            <a href="/reservations/">Reservations</a> &nbsp;·&nbsp;
            <a href="tel:${esc(SITE.phone.e164)}">${esc(SITE.phone.display)}</a>
          </p>
        </div>
      </div>
    </section>`,
  };
}
