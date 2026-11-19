# A-Town Limo

Custom-coded site for **A-Town Limo** — Atlanta luxury chauffeured car service
(`atownlimo.com`). Zero-dependency static HTML/CSS + vanilla ES modules, one Node
build script, and Cloudflare Pages Functions. Hosted on **Cloudflare Pages**
(static, GitHub auto-deploy).

## Requirements

- **Node 22+** (no runtime dependencies to install)
- **Wrangler** (via `npx`) for local preview and deploys

## Commands

```bash
npm run build     # render static HTML → dist/ (content-hashes CSS/JS)
npm run dev       # build, then serve dist/ with Cloudflare Pages Functions
npm run deploy    # build, then wrangler pages deploy dist (project: atown-limo)
```

Build-time env vars: `NOINDEX` (noindex **by default**; set `NOINDEX=false` at
launch), `GTM_ID` (GTM container; unset = no GTM code), `SITE_URL` (defaults to
`https://atownlimo.com`).

## Project layout

```
src/
  config.js              Single source of truth — NAP, brand, services, fleet, FAQs, JSON-LD
  styles.css             Design system (dark/gold tokens on :root)
  build.js               Node 22 build: render HTML, hash assets, copy fonts, robots/sitemap/llms
  llms.js                llms.txt generator (AI/LLM search)
  redirects.js           _redirects (www→apex) + _headers (security/cache)
  headlines.json         Page manifest — one entry per template
  templates/layout.js    Base HTML document (head, OG/Twitter, JSON-LD)
  templates/partials.js  Header/nav, footer, the quote form + booking popup
  pages/                 home, about, services (+ 5 spokes), fleet (+ 3 vehicles),
                         airport (ATL), routes (hub + route pages), contact,
                         reservations, legal, thankyou, 404
  client/main.js         Nav + quote modal + stepper (content-hashed)
fonts/                   Self-hosted Inter (latin woff2)
functions/api/           Cloudflare Pages Functions (web-standard APIs only)
  health.js              GET /api/health
  lead.js                POST /api/lead — quote capture (STUB: 503 until wired)
dist/                    Build output (gitignored)
```

## Scope & conventions

- **Fleet is complete at three vehicles:** Executive Sedan, Executive SUV,
  Sprinter Van. No mini-bus, motor coach, stretch, party bus, car rental, or
  rideshare — in copy or imagery.
- **Airport is ATL only** (Hartsfield-Jackson Atlanta International).
- **Service area:** Atlanta metro + surrounding Georgia, 24/7 incl. holidays.
- **Single values to edit in `src/config.js`:** `PHONE` (swap for a call-tracking
  number), `CAPACITY` (passenger/bag counts), `SITE.smsNumber` (A2P SMS number —
  keep it verbatim; it is NOT the main phone).
- **Legal:** Terms are ported from the client's live Terms (effective
  February 14, 2026); §7 SMS/A2P text is verbatim in `src/pages/legal.js`.
- **Booking is not wired yet.** `POST /api/lead` returns 503 for real
  submissions and the form shows a "call us" message with a tap-to-call button
  (no `/thankyou/` redirect). See `functions/api/lead.js` and `LAUNCH.md` step 1.
- **Tracking:** `dataLayer` events `click_to_call` (every `tel:` link) and
  `form_submit_success` (only on an accepted 2xx). No conversion on `/thankyou/`.

## Launch

Follow [`LAUNCH.md`](./LAUNCH.md) — the ordered go-live checklist (wire the lead
handler, A2P opt-in text, privacy diff, GTM, DNS, `NOINDEX=false`, custom
domain, 301s, Google Ads, Search Console).

Still to replace: the placeholder A-Town wordmark and icons in
`assets/img/brand/` (`atown-logo.svg`, `favicon.svg`, `apple-touch-icon.png`,
`atown-og.png`).
