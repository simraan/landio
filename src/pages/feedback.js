/**
 * /feedback/ — review-gating funnel. A quick star rating routes happy riders
 * straight to Google (4–5★) and catches unhappy ones (1–3★) in a private
 * two-step form that emails the team via /api/feedback. Always noindex.
 */

import { SITE } from "../config.js";
import { esc } from "../templates/partials.js";

// One-tap Google "write a review" link for the Landio Google Business listing.
const REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJKdJPEdfxZCsRzXCaPQA8Ucw";

export function feedback() {
  const phone = SITE.phone;

  const row = (n, label) =>
    `<button type="button" class="fb-rate" data-rate="${n}" aria-label="${n} star${n > 1 ? "s" : ""}, ${esc(label)}">
          <span class="fb-stars" aria-hidden="true"><span class="fb-on">${"★".repeat(n)}</span>${"★".repeat(5 - n)}</span>
          <span class="fb-label">${n} Star${n > 1 ? "s" : ""} &middot; ${esc(label)}</span>
        </button>`;

  const callLine = `<p class="fb-call">Prefer to talk? Call <a href="tel:${esc(phone.e164)}">${esc(phone.display)}</a></p>`;

  return {
    path: "/feedback/",
    title: "Share Your Feedback",
    description: "Tell us how your Landio Limo Services ride went — it takes just a few seconds.",
    bodyClass: "page-feedback",
    noindex: true,
    main: `
    <section class="section feedback" aria-labelledby="fb-title">
      <div class="container feedback__inner">
        <header class="feedback__head">
          <span class="eyebrow">Feedback</span>
          <h1 id="fb-title">Your feedback helps us improve</h1>
          <p class="hero__lede">A quick rating takes just a few seconds and helps us keep every ride sharp.</p>
        </header>

        <div class="feedback__card card-surface">
          <div data-fb-step="rate">
            <h2 class="fb-q">How would you rate our service? <span class="fb-req" aria-hidden="true">*</span></h2>
            <div class="fb-ratings" role="group" aria-label="Rate our service">
              ${row(5, "Excellent")}
              ${row(4, "Good")}
              ${row(3, "Okay")}
              ${row(2, "Poor")}
              ${row(1, "Bad")}
            </div>
          </div>

          <form data-fb-step="form" class="fb-form" hidden novalidate>
            <h2 class="fb-q">Tell us what happened</h2>
            <p class="fb-sub">We'd like the chance to make it right — your note goes straight to our team, privately.</p>
            <input type="hidden" name="rating">
            <label class="fb-field">Name
              <input class="bf-input" type="text" name="name" autocomplete="name" required>
            </label>
            <label class="fb-field">Email
              <input class="bf-input" type="email" name="email" autocomplete="email" required>
            </label>
            <label class="fb-field">Your feedback
              <textarea class="bf-input" name="feedback" rows="4" required></textarea>
            </label>
            <button type="submit" class="btn btn-primary fb-submit">Send Feedback</button>
            ${callLine}
          </form>

          <div data-fb-step="done" class="fb-done" hidden>
            <h2>Thank you</h2>
            <p>We've received your feedback and a member of our team will follow up. We appreciate you taking the time to let us know.</p>
            ${callLine}
          </div>
        </div>
      </div>
    </section>

    <script>
    (function () {
      var REVIEW_URL = ${JSON.stringify(REVIEW_URL)};
      var sec = document.querySelector('.feedback');
      if (!sec) return;
      var stepRate = sec.querySelector('[data-fb-step="rate"]');
      var stepForm = sec.querySelector('[data-fb-step="form"]');
      var stepDone = sec.querySelector('[data-fb-step="done"]');
      var ratingInput = stepForm ? stepForm.querySelector('input[name="rating"]') : null;

      Array.prototype.forEach.call(sec.querySelectorAll('.fb-rate'), function (b) {
        b.addEventListener('click', function () {
          var r = parseInt(b.getAttribute('data-rate'), 10) || 0;
          if (r >= 4) { window.location.href = REVIEW_URL; return; } // happy → Google
          if (ratingInput) ratingInput.value = String(r);
          if (stepRate) stepRate.hidden = true;
          if (stepForm) {
            stepForm.hidden = false;
            var nm = stepForm.querySelector('input[name="name"]');
            if (nm) nm.focus();
          }
        });
      });

      if (stepForm) stepForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (typeof stepForm.reportValidity === 'function' && !stepForm.reportValidity()) return;
        var btn = stepForm.querySelector('.fb-submit');
        var fd = new FormData(stepForm);
        var payload = {
          rating: fd.get('rating') || '',
          name: (fd.get('name') || '').trim(),
          email: (fd.get('email') || '').trim(),
          feedback: (fd.get('feedback') || '').trim(),
          page_url: location.href
        };
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        var finish = function () {
          if (stepForm) stepForm.hidden = true;
          if (stepDone) stepDone.hidden = false;
        };
        fetch('/api/feedback', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(finish).catch(finish);
      });
    })();
    </script>`,
  };
}
