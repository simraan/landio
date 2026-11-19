# LAUNCH — A-Town Limo (atownlimo.com)

## Steps

Do these **in order**. `NOINDEX`, `GTM_ID`, and `SITE_URL` are **build-time**
environment variables: set them in Cloudflare Pages → Settings → Environment
variables (Production), then **redeploy** for them to take effect.

1. **Wire the lead handler.**
   `functions/api/lead.js` is a stub: every real submission returns 503 and the
   form shows "Online booking is temporarily unavailable — call …" with a
   tap-to-call button. Connect email/CRM delivery, then return
   `200 { ok: true, accepted: true }` only after delivery succeeds — that
   response is what triggers the `/thankyou/` redirect and the
   `form_submit_success` conversion. Remove the `WIRE BEFORE LAUNCH` TODO.

2. **Paste the registered A2P opt-in text into the SMS checkbox.**
   Replace the checkbox wording in `smsConsent()` (`src/templates/partials.js`)
   with the exact opt-in language from the registered 10DLC campaign. Keep it
   optional and unchecked. Terms §7 (`src/pages/legal.js`) must stay verbatim.

3. **Paste the live Privacy Policy for a diff.**
   The live `/privacy-policy/` returned HTTP 429 during the build, so ours could
   not be compared. Diff it against `PRIVACY` in `src/pages/legal.js`; keep the
   SMS / mobile-data non-sharing sections (§3–§4).

4. **Set `GTM_ID` and verify in GTM preview.**
   `GTM_ID=GTM-XXXXXXX`. Unset = no GTM code at all. In GTM Preview, confirm:
   - `click_to_call` fires on every `tel:` link (has `page_path`);
   - `form_submit_success` fires only on a real accepted submission (has
     `vehicle`, `service`, `form_location`);
   - nothing fires on `/thankyou/` page load (no conversion there).

5. **Copy ALL DNS records before moving nameservers.**
   Export every record from the current DNS host — especially **MX, SPF (TXT),
   DKIM (TXT/CNAME), DMARC (TXT)** and any verification records — and confirm
   they exist in Cloudflare *before* switching nameservers, or email for
   `info@atownlimo.com` will break.

6. **Set `NOINDEX=false`.**
   The build is noindex by default (meta robots `noindex, nofollow` and
   `robots.txt` disallow-all). `NOINDEX=false` switches every page to
   `index, follow` and `robots.txt` to allow + sitemap. Redeploy.

7. **Add the custom domain `atownlimo.com`.**
   Pages → Custom domains → add the apex (and `www`; `_redirects` already sends
   `www` → apex with a 301). Turn on "Always Use HTTPS".

8. **301 the old URLs.**
   - Old WordPress URLs on `atownlimo.com`: crawl the live site / its
     `wp-sitemap.xml` and add any slug that doesn't exist in the new build to
     `src/redirects.js`. Already handled: `/about/` → `/about-us/`,
     `/contact-us/` → `/contact/`; `/about-us/`, `/contact/`,
     `/privacy-policy/`, `/terms-of-service/` keep their live slugs.
   - `atownlimo.net` → `atownlimo.com`: add a Redirect Rule (or Bulk Redirect)
     on the `.net` zone, path-preserving 301 to the matching `.com` URL.

9. **Update Google Ads final URLs** to the new pages (and keep the
   `gclid` / `utm_*` parameters — the forms capture them in hidden fields).

10. **Submit the sitemap in Search Console**:
    `https://atownlimo.com/sitemap.xml`.
