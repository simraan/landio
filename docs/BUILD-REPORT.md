# WAVE 1 — BUILD REPORT (Oct 17 2026)

Autonomous wave-1 build of atownlimo.com. Site stays **NOINDEX** until launch
(`NOINDEX=false`). Zero-dependency static build on Cloudflare Pages.

## Summary

- **56 pages built**, 54 indexable (sitemap) + 2 noindex (`/thankyou/`, `/404.html`).
- ~70,400 total words, **avg ~1,257 words/page** (incl. shared chrome ~500–600 w;
  editorial body is unique per page). No thin pages.
- Every page: one H1, unique `<title>`, canonical, OG/Twitter, breadcrumb (spokes),
  one JSON-LD `@graph` (`LimousineService`+`LocalBusiness` sitewide; `Service`/
  `CollectionPage`/`Event`/`FAQPage`/`BreadcrumbList` per type), FAQ↔FAQPage parity.
- All content clusters live and cross-linked hub-and-spoke: ATL hub, Terminals,
  ATL Guides, Areas, Venues, Events, Private Jet/FBO, Long-Distance Routes,
  Services directory, Fleet, core + legal.

## Pages built (by cluster)

- **Core:** Home, About (noindex-safe), Contact, Reservations, Thank You (noindex),
  404 (noindex), Privacy, Terms.
- **ATL hub:** `/atlanta-airport-car-service/` + Domestic & International Terminal.
- **ATL guides:** `/atl-airport-guide/` + is-atl-easy-to-navigate + terminal-map-plane-train.
- **Areas (11):** `/areas/` + Duluth, Buckhead, Midtown, Downtown Atlanta,
  Sandy Springs, Dunwoody, Alpharetta, Marietta, Roswell, Decatur.
- **Venues (7):** `/venues/` + Mercedes-Benz Stadium, State Farm Arena, Truist Park
  & The Battery, Georgia World Congress Center, Gas South Arena, Fox Theatre.
- **Events (5):** `/events/` + SEC Championship, Peach Bowl, IPPE, Falcons game day.
- **Private jet/FBO (3):** `/private-jet-fbo-transfers/` + PDK + FTY.
- **Services (5):** `/services/` directory + Meet & Greet, Corporate & Executive,
  Group Transfers, Hourly Chauffeur.
- **Long-distance routes (7):** `/routes/` + Athens, Savannah, Macon, Augusta,
  Chattanooga, Greenville SC.
- **Fleet (4):** `/fleet/` + Executive Sedan, Executive SUV, Sprinter Van.

Full per-page title + word count: run `node src/build.js` then the inventory script
in the session log, or see the commit history.

## Migrations this wave (301s via redirects.js)

- 9 legacy `/routes/atlanta-airport-to-<city>/` metro pages → `/areas/<city>-car-service/`.
- `/services/fbo-private-jet/` → `/private-jet-fbo-transfers/`.
- (Foundation) `/airport/` → `/atlanta-airport-car-service/`; long-distance route re-slugs.
All emitted only when the new page is built and the old page is gone (no 301→404).

## Not built this wave (why)

- **`/atl-airport-guide/how-early-to-arrive/`** — planned guide; not needed for wave-1
  internal linking. Logged in docs/LINK-TODO.md. ATL hub links the guide hub + the
  two built guides instead.
- **Area pages for Brookhaven, Smyrna, Johns Creek** — not in `config.AREAS`; the Home
  chips still open a prefilled quote for these (docs/LINK-TODO.md).
- **Masters transportation (`/events/masters-transportation-from-atlanta/`)** — referenced
  as a `future` on the Augusta route; a future wave.
- No additional venues/events beyond the set above.

## Facts left out (unsourced / conflicting — docs/FACTS.md)

- **No miles or drive times** anywhere (removed from the old route pages; re-add only
  with a source).
- **ATL navigation specifics** — exact Plane Train frequency, a walkway alternative, and
  which single concourse is international-only (E vs F): sources conflicted and atl.com
  blocks automated fetch, so only uncontested facts are used (2 terminals; 7 concourses
  T,A–F; Plane Train since 1980; gate-letter numbering).
- **No published street address for Mercedes-Benz Stadium** (none on the venue site).
- **FBO scope** — transfers to/from the FBOs on the field, crew-coordinated; **no**
  ramp-access or named-FBO-partnership claims (unconfirmed — OPEN-QUESTIONS).
- **Domestic Terminal curb side (N/S)** — unconfirmed; the safe `DOMESTIC_MEETING_POINT`
  default is used.

## Dated pages needing a yearly refresh (maintenance)

- SEC Championship (Dec 5, 2026), Peach Bowl (Jan 1, 2027), IPPE (Jan 26–28, 2027) —
  each names a date in copy + an `Event` JSON-LD `startDate`. URLs are evergreen; refresh
  the date each year from the sources in docs/FACTS.md. Falcons game day is evergreen (no
  date, no Event node).

## Test results (FINAL QA)

| Check | Result |
|---|---|
| Build (dead internal links) | **Pass** — 0 dead `href`/`src`/`srcset` |
| Duplicate `<title>` / `<h1>` | **Pass** — all unique (build-enforced) |
| Orphan pages (indexable, no inbound) | **Pass** — none (build-enforced) |
| Leak check (JFK/LGA/EWR, party bus, stretch, mini-bus, motor coach, prom, "cancel anytime") | **Clean** |
| "guarantee" | Only the verbatim Terms §8 disclaimer (allowed) |
| NOINDEX coverage | **56/56** pages carry `noindex, nofollow` (pre-launch) |
| Schema valid + FAQ↔FAQPage parity | **Pass** — all pages parse; FAQ counts match |
| Meta description ≤155, title ≤60 | **Pass** — all pages |
| Sitemap | 54 indexable URLs; robots disallow-all (pre-launch) |
| Visual — mobile 375 (Home, Area) | **Pass** — no horizontal scroll, readable, on-brand |
| Visual — desktop (Venue: nav, At-a-Glance, sourced options table) | **Pass** |
| Functional — quote modal | **Pass** — opens; **context prefill works** (venue → pickup) |
| Overlap, area pages (same type) | ~41–47% on crude full-`<main>` measure, **furniture-driven** (quote form, At-a-Glance, policy FAQ, contact, CTAs shared sitewide); editorial bodies (hero answer, 2 intro cols with highway/landmarks, area FAQ, nearby links) are unique. Why/steps dropped from area spokes to reduce it. See docs/DECISIONS.md overlap note. |

Lighthouse mobile per-type was not run headlessly in this pass; the design is a
zero-JS-dependency static build with preloaded hero (LCP), self-hosted fonts
(`font-display: swap`), content-hashed assets with immutable caching, and no
layout shift observed in the visual checks.

## Decisions & open questions

- Decisions: **docs/DECISIONS.md** (#1–13 + overlap note).
- Open questions for the client: **docs/OPEN-QUESTIONS.md** (Domestic curb side,
  real photos, which FBOs A-Town actually serves, dated-event refresh).
- Remaining LINK-TODO: **docs/LINK-TODO.md** (how-early-to-arrive guide; 3 Home chips).

## Launch

Lead handler `POST /api/lead` is still the **503 stub** (`WIRE BEFORE LAUNCH`).
Go-live checklist: **LAUNCH.md**. Flip `NOINDEX=false` (robots + sitemap + index)
and set `GTM_ID` at launch.

## SEO-PLAN §9 checklist

- [x] Architecture built hub-and-spoke (clusters + `/services/` directory).
- [x] One H1, query-variant H2s, canonical, OG/Twitter, breadcrumb per page.
- [x] JSON-LD `@graph` per type; FAQ↔FAQPage parity.
- [x] Sitemap + llms.txt + robots + `_redirects` + `_headers` emitted.
- [x] No dead links, no duplicate titles/H1, no orphans (build-enforced).
- [x] Facts sourced or left out; sources logged (docs/FACTS.md).
- [x] Leak guardrails clean; NOINDEX on every page pre-launch.
- [ ] Lighthouse mobile per-type (deferred — run against a preview before launch).
- [ ] Real local photography (open question).
