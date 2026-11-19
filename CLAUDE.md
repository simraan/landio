# CLAUDE.md — Landio Limo Services

> **Read `CONTEXT.md` first.** It is the project brief, current status, roadmap,
> env vars, and how designers/developers request changes. THIS file holds the
> locked technical architecture and the hard content rules.

Guidance for anyone (human or AI) picking up this codebase. Landio Limo Services
is a luxury chauffeured car & limo service for the Washington, DC metro — DC,
Maryland, and Northern Virginia — plus the DC ↔ Northeast corridor. The site is
a zero-dependency static build on Cloudflare Pages. It is a rebrand of the Aura
Hamptons / A-Town Limo codebase — same locked architecture, Landio (DC metro)
data. Phase 1 (core) is live; the programmatic-SEO scale wave (areas, airports,
FBOs, routes, venues, events, guides) is pending.

## Architecture (locked)

- **No framework, no bundler, no runtime dependencies.** Plain HTML / CSS /
  vanilla ES modules. Node 22 build script (`src/build.js`).
- **Server:** Cloudflare **Pages Functions** under `functions/api/*`, web-standard
  APIs only → `nodejs_compat` is NOT required.
- **Styling:** one `src/styles.css`, dark/gold design tokens on `:root`. No Tailwind.
- **Fonts:** Inter self-hosted from `/fonts` (`font-display: swap`, latin preloaded).
- **Single source of truth:** `src/config.js` holds NAP, brand voice, fleet,
  services, FAQs, and the JSON-LD builders. Do not re-type these anywhere else.
  The canonical origin is derived from `SITE_URL` at build time, never hardcoded.

## Build flow

`src/headlines.json` is the page manifest — one entry per template. `build.js`
maps each to a renderer, expands array-returning templates (service spokes,
vehicles, routes), content-hashes CSS/JS, copies fonts + images, and emits
`robots.txt`, `sitemap.xml`, `llms.txt`, `_redirects`, and `_headers`.
**Build fails** on any dead internal link, duplicate `<title>`/`<h1>`, or orphan
page (an indexable page nothing links to).

## Build phases

- **Phase 1 — Core (first deploy):** Home, About (`/about-us/`), Contact,
  Reservations, Fleet hub + 5 vehicle pages, Services hub + spokes, Thank You
  (noindex), 404 (noindex), Privacy, Terms. Ship this, attach the domain, then
  build the scale layer.
- **Phase 2 — Programmatic SEO scale:** the six-airport cluster (JFK/LGA/EWR/
  ISP/FOK/HTO), the NYC↔Hamptons route corridor, village/area pages, venue
  pages, event pages, FBO pages, guides, and the yacht/marina line. These reuse
  the `landingPage()` template and the page maps in `config.js`.

## Hard rules (localization guardrails)

- **Airports = IAD, DCA, BWI.** Washington Dulles (IAD), Reagan National (DCA),
  and Baltimore/Washington (BWI). Never reference NY/Atlanta airports (JFK, LGA,
  EWR, ISP, FOK, HTO, ATL). Plus FBOs: Signature (IAD/DCA/BWI), Manassas,
  Leesburg Executive, Montgomery County Airpark, Frederick.
- **Service area = Washington, DC, Maryland, and Northern Virginia.** 24/7 incl.
  holidays. MD: Bethesda, Potomac, Rockville, Silver Spring, Germantown,
  Gaithersburg, Chevy Chase, National Harbor, Baltimore, Annapolis. VA:
  Arlington, Alexandria, McLean, Tysons, Fairfax, Reston, Ashburn, Sterling,
  Leesburg. Base: Germantown, MD.
- **Fleet = five classes:** Executive Sedan, Luxury SUV, Sprinter Van (14 pax),
  Mini Bus, Charter Bus. (Sprinter Jet dropped; Motor Coach renamed Charter
  Bus.) Capacities live only in `CAPACITY` in `config.js` and are placeholders —
  CONFIRM real seat/bag counts with the client.
- **No yacht line.** Core lines: airport transfers, corporate/executive, private
  aviation (FBO), diplomatic transportation, group transport, meet & greet,
  hourly chauffeur.
- **NAP:** brand "Landio Limo Services" (legal: Landio Limo Services LLC),
  12410 Milestone Center Dr, Ste 600, Germantown, MD 20876, USA ·
  `+1 (240) 595-7025` (the `PHONE` const — one value) · `info@landiolimo.com`.
  Note: website domain is landiolimoservices.com; contact email is on
  landiolimo.com.
- **Copy:** no "guarantee" claims (use "punctual" / "flight-tracked"), no stat
  counters without real numbers, no vehicle model names.

## CONFIRM before launch (do not invent — A2P / legal sensitive)

- `SITE.legalName` — the registered entity on the client's Terms of Service.
- `SITE.smsNumber` — the registered A2P 10DLC sending number.
- `SITE.termsEffectiveDate` / `privacyEffectiveDate` / `director` — from the
  final legal pages.
- Real **Mini Bus** and **Motor Coach** photos (currently reuse the Sprinter
  image as a placeholder — see the `PLACEHOLDER` notes in `config.js` fleet).
- **Social share image** — `OG_IMAGE` still points at `atown-og.png` (an A-Town
  Limo leftover). Replace sitewide with an Aura Hamptons-branded OG image before
  launch; it feeds `og:image` / `twitter:image` on every page.

## Booking / lead handling

The quote/booking UI (hero form + popup) is fully built. `POST /api/lead` is
being wired for **Aura Hamptons** to **Resend** (email) + **GoHighLevel** (CRM),
reading these Cloudflare env vars: `RESEND_API_KEY`, `QUOTE_NOTIFY_FROM`,
`QUOTE_NOTIFY_TO`, `GHL_PIT`. Google Places autocomplete uses
`PUBLIC_GOOGLE_MAPS_API_KEY`. Only `200 { accepted: true }` (delivered) fires
`form_submit_success` and redirects to `/thankyou/`. `click_to_call` fires on
every `tel:` link. GTM loads only when `GTM_ID` is set. The build is noindex
unless `NOINDEX=false`.

## Interaction rule (sitewide)

Every card-like box is clickable — build it with `cbox()` in
`src/pages/_sections.js`, never by hand. Page exists → box is a link; no page →
box opens the quote modal with that box's context; future page → modal today,
link once the page exists (`build.js` switches it). Hover = focus-visible look
(gold border, lift, glow); no motion under `prefers-reduced-motion`.

## Landing-page template

Every landing page (airport hub, area, venue, event, route, FBO) is built with
`landingPage(cfg)` in `src/templates/landing.js`. The page file holds CONTENT
only; the template owns structure, schema, and the hero-image preload. Turn
sections on/off via `cfg.sections`. **Every page must have a genuinely unique
body** — thin duplicate content is the #1 risk at scale.
