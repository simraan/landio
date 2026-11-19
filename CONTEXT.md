# CONTEXT.md — Aura Hamptons Website

**Read this first.** This is the project brief, current status, and roadmap for
the Aura Hamptons website. Anyone — designer, developer, or AI — picking up this
folder should read this file before making changes. The companion file
`CLAUDE.md` holds the locked technical architecture and the hard content rules;
this file holds the "what, where we are, and what's next."

---

## 1. What this is

Aura Hamptons is a premium chauffeured **car & limo service** for the Hamptons /
East End of Long Island, NY, plus the **New York City ↔ Hamptons corridor**. It
is part of the "Aura" brand family (sister site: Aura Palm, West Palm Beach).
There is also a **yacht charter** line (Aura Hamptons Yacht Charter) — a separate
service, built later.

This repo is a **rebuild** of the existing WordPress site (aurahamptonslimo.com),
moving it to a fast, static, SEO-first build on Cloudflare. The goal is a site
that (a) looks premium, (b) generates as many leads/inquiries as possible, and
(c) ranks on Google **and** gets cited by AI search (ChatGPT, Perplexity,
Gemini, Google AI Overviews, Bing).

It is a rebrand of the proven **A-Town Limo** codebase — same locked
architecture, Hamptons data.

---

## 2. Where it lives (the facts)

| Thing | Value |
|---|---|
| GitHub repo | `github.com/simraan/auhamptons` (branch `main`) |
| Live preview | `https://auhamptons.pages.dev` |
| Cloudflare Pages project | `aura-hamptons` (connected to the repo via Git) |
| Build command | `npm run build` |
| Build output dir | `dist` |
| Node version | 22 (pinned in `.node-version`) |
| Production domain | `aurahamptonslimo.com` — **not yet attached** (see §7) |
| Indexing | **noindex is ON** until launch (set env `NOINDEX=false` to allow indexing) |

**Workflow (cloud-native — no desktop needed):** edit in a chat on this folder →
commit → push to `main` → Cloudflare auto-deploys to the preview URL. You can
work from any device. A push takes ~1–2 min to go live.

---

## 3. The stack (do not change without reason)

- **Zero dependencies, no framework, no bundler.** Plain HTML/CSS/vanilla ES
  modules, built by a Node 22 script (`src/build.js`).
- **Hosting:** Cloudflare **Pages**, with **Pages Functions** for the backend
  (`functions/api/*`), web-standard APIs only.
- **Styling:** one file, `src/styles.css`, dark/gold design tokens on `:root`.
  No Tailwind.
- **Fonts:** Inter, self-hosted from `/fonts`.
- **Single source of truth:** `src/config.js` — NAP, brand voice, fleet,
  services, FAQs, areas/routes/venues/events data, and the JSON-LD (schema)
  builders. **Change business facts here, once; every page reads from it.**

**How a change flows:** most brand/fleet/service/NAP edits = `src/config.js`.
Page copy = the matching file in `src/pages/`. Shared header/footer/form =
`src/templates/partials.js`. Section building blocks = `src/pages/_sections.js`.
The build **fails** on any dead internal link, duplicate `<title>`/`<h1>`, or
orphan page — this is a feature (it prevents broken SEO), so fix the reported
link rather than working around it.

---

## 4. Current status — DONE (Phase 1)

The six core pages are built, branded, and live on the preview URL. **21 pages:**

- Home, About (`/about-us/`), Services hub (`/services/`) + 6 service spokes,
  Fleet hub (`/fleet/`) + 5 vehicle pages, Contact, Reservations, Privacy,
  Terms, Thank You (noindex), 404 (noindex).
- **Fleet = 5 classes:** Executive Sedan, Luxury SUV, Sprinter Van, Mini Bus,
  Motor Coach — with real photos (sourced from the Aura Palm library).
- **Booking form** (hero + popup): pickup → drop-off → date/time → vehicle →
  name/email/phone, with One-Way/Hourly and a return-trip toggle. All 5 vehicles
  in the picker.
- **Logo:** final Aura Hamptons gold lockup (AURA / THE HAMPTONS) in header +
  footer.
- **Lead handler** (`functions/api/lead.js`) is wired to **Resend** (email) +
  **GoHighLevel** (CRM). It needs the env vars below to actually deliver.

---

## 5. Roadmap — what's NEXT (in order)

The priority is **make it better before making it bigger.** Do not jump to new
pages until design and content are strong.

1. **Design pass (first).** Elevate the visual design beyond the inherited
   A-Town look — hero, typography scale, spacing, section rhythm, fleet cards,
   imagery treatment, mobile polish. Keep the dark/gold identity. Goal: a
   high-end "wow" that matches a luxury Hamptons brand.
2. **Content depth (second).** Expand and sharpen copy on the existing pages —
   richer service descriptions, trust/credibility content, FAQs, and the facts
   that make pages rank on AI search. More substance per page *before* adding
   more pages.
3. **Programmatic SEO scale — "Phase 2" (third).** The ~300-page layer. Data is
   already seeded in `src/config.js`; the cluster templates exist in `src/pages/`
   (currently removed from the build — they still carry A-Town content and must
   be rebranded before re-enabling). Clusters:
   - **Routes corridor** (highest booking intent): NYC / Manhattan / Brooklyn /
     Queens → Southampton, East Hampton, Montauk, Sag Harbor, Bridgehampton,
     etc., plus airport→village and inter-Hampton lanes.
   - **Airport cluster:** a hub per airport — JFK, LGA, EWR, ISP, FOK, HTO.
   - **Area/village pages:** Southampton, East Hampton, Montauk, Sag Harbor, and
     the other 13 villages.
   - **Venue pages:** Shinnecock, National Golf Links, Maidstone Club, Wölffer
     Estate, polo, yacht clubs (wedding/event intent).
   - **Event pages:** Hampton Classic, Hamptons Film Festival, etc. (evergreen,
     no year in the URL).
   - **Private jet / FBO:** HTO and Gabreski (FOK).
   - **Hamptons travel guides** (top-of-funnel + AI-citation content).
   - **Yacht line:** Aura Hamptons Yacht Charter pages.
4. **App layer (later).** Port from Aura Palm once its source is available:
   - Leads **dashboard** (source + lead tracking)
   - **Credit-card authorization** page (Stripe)
   - **"Become an Aura Partner"** page
   - Resend **email templates** styled to match Palm
5. **Form upgrade:** Google Places autocomplete on the pickup/drop-off fields
   (uses `PUBLIC_GOOGLE_MAPS_API_KEY`).

---

## 6. Environment variables / secrets (Cloudflare → Settings → Variables)

Add these in the Cloudflare Pages dashboard. The code already reads these exact
names — just paste the values and redeploy. **Never commit secret values to the
repo.**

| Name | Type | Purpose |
|---|---|---|
| `RESEND_API_KEY` | secret | Resend API key — quote-request emails |
| `QUOTE_NOTIFY_FROM` | plain | From address (verified Resend domain) |
| `QUOTE_NOTIFY_TO` | plain | Inbox that receives new leads |
| `GHL_PIT` | secret | GoHighLevel Private Integration Token |
| `GHL_LOCATION_ID` | plain | GoHighLevel sub-account location ID |
| `PUBLIC_GOOGLE_MAPS_API_KEY` | plain | Google Places autocomplete (form) |
| `DASHBOARD_PASSWORD` | secret | Leads dashboard login (app layer) |
| `SESSION_SECRET` | secret | Dashboard session signing (app layer) |
| `STRIPE_PUBLISHABLE_KEY` | secret | Credit-card auth page (app layer) |
| `STRIPE_SECRET_KEY` | secret | Credit-card auth page (app layer) |
| `NOINDEX` | plain | Set to `false` at launch to allow indexing |
| `SITE_URL` | plain | Canonical origin, e.g. `https://aurahamptonslimo.com` |
| `GTM_ID` | plain | Optional Google Tag Manager container |

**Until the lead-handler vars are set, the form displays but does not deliver
leads.** Also create the Hamptons **GoHighLevel sub-account** and generate its
Private Integration Token + Location ID (keys stay with the business owner).

---

## 7. Confirm-before-launch (do NOT invent — legal / compliance sensitive)

These are placeholders in `src/config.js`, used as-is until confirmed. Get the
real values from the client before launch:

- `SITE.legalName` — the registered entity on the Terms of Service.
- `SITE.smsNumber` — the registered **A2P 10DLC** sending number (for the SMS
  opt-in). Currently the main line as a placeholder.
- `SITE.termsEffectiveDate` / `privacyEffectiveDate` / `director` — from the
  final legal pages / client.

**To attach the domain:** in Cloudflare Pages → the `aura-hamptons` project →
Custom domains → add `aurahamptonslimo.com`, then set `SITE_URL` to the https
origin and `NOINDEX=false`. (The domain's DNS is on Cloudflare already since the
account manages it.)

---

## 8. Hard rules (localization guardrails — see CLAUDE.md for the full list)

- **Airports = JFK, LGA, EWR, ISP, FOK, HTO only.** Never ATL / Atlanta /
  Georgia (leftovers from the source codebase).
- **Service area = the Hamptons / East End + the NYC corridor.** 24/7 incl.
  holidays. Villages: Southampton, East Hampton, Montauk, Sag Harbor,
  Bridgehampton, Water Mill, Amagansett, Westhampton Beach, Wainscott,
  Sagaponack, Quogue, Shelter Island, Hampton Bays.
- **Fleet = the 5 classes** above; capacities live only in `CAPACITY` in
  `config.js`.
- **Brand as "Aura Hamptons"** (not "Aura Hamptons Limo") so it isn't
  category-locked (the yacht line shares the brand).
- **NAP:** 53 Hill St, Southampton, NY 11968 · +1 (934) 732-4556 ·
  info@aurahamptonslimo.com.
- **Copy:** no "guarantee" claims (use "punctual" / "flight-tracked"); no fake
  stat counters; no vehicle model names; benefit-led, plain copy a limo owner
  understands instantly.
- **Every page needs a genuinely unique body** — thin/duplicate content is the
  #1 risk at scale.

---

## 9. How to request changes here (designer & developer)

You drive changes by describing them in a chat opened on this folder. Claude
edits the files, runs the build, and pushes — it goes live on the preview URL in
~1–2 min. Tips for good results:

- **Name the page and the change.** e.g. "On the Fleet page, make the vehicle
  cards two-up on desktop and increase the photo height," or "Rewrite the About
  page intro to emphasize 25 years serving the Hamptons."
- **For design, describe the feel + specifics.** Reference sections, spacing,
  type size, color (keep dark/gold). Share a screenshot or a reference URL if
  you have one.
- **For content, give the facts.** Real numbers, real differentiators — unsourced
  claims get left out by design.
- **Business facts (phone, address, fleet, services) → ask to change
  `src/config.js`**, not individual pages.
- **Respect the guardrails in §8 and CLAUDE.md.** If a request conflicts with a
  rule (e.g. adds a non-Hamptons airport), Claude will flag it.
- **The build must stay green.** If a change breaks a link or duplicates a
  heading, the build will say so — fix the cause, don't bypass it.

Ask for a **preview check** anytime — Claude can open the live URL and screenshot
the result to confirm a change looks right.

---

## 10. File map (quick orientation)

```
src/config.js            ← single source of truth (brand, NAP, fleet, services, data, schema)
src/build.js             ← the build script (page manifest → HTML; fails on dead links)
src/headlines.json       ← page manifest (which templates build)
src/styles.css           ← all styling (dark/gold tokens on :root)
src/templates/
  layout.js              ← <head>, meta, schema wiring
  partials.js            ← header, footer, nav, the booking form, logo
src/pages/
  home.js, about.js, services.js, fleet.js, vehicles.js, contact.js,
  reservations.js, legal.js, thankyou.js, notfound.js   ← page content
  service-spokes.js      ← the 6 service spoke pages
  _sections.js           ← reusable section builders (cards, trust bar, etc.)
  (airport.js, routes.js, areas.js, venues.js, events.js, guides.js, fbos.js,
   terminals.js + content/*.js) ← Phase-2 clusters, NOT in the build yet
     (still carry A-Town content — rebrand before re-enabling)
functions/api/lead.js    ← lead handler (Resend email + GoHighLevel upsert)
assets/img/fleet/        ← vehicle photos (WebP + JPEG, 640/1024)
assets/img/brand/        ← logo
CLAUDE.md                ← locked technical architecture + hard content rules
CONTEXT.md               ← this file
```

---

_Last updated: 2026-11-08. Keep this file current when status or roadmap
changes._
