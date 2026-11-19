# WAVE 1 BRIEF — autonomous build (resume anchor)

A future reset only needs: **"Read docs/WAVE1-BRIEF.md and continue."**

## STEP 0 — RECOVER STATE (first, keep it short)
1. Read: CLAUDE.md, docs/SEO-PLAN.md, docs/FACTS.md, docs/LINK-TODO.md, docs/DECISIONS.md,
   docs/OPEN-QUESTIONS.md, LAUNCH.md.
2. `git status` + `git log --oneline -15`. Last pushed = Wave 1 FOUNDATION
   (nav, data maps, redirects, build checks, /services/ directory, route re-slugs).
3. Uncommitted work = in-progress pages. Finish and make them build; don't discard.
   If clean: start the next page in BUILD ORDER.
4. Research notes live in docs/ + FACTS.md. If lost, re-research per page when reached.
5. (done — this file).
6. 5-line status in DECISIONS.md, then build.

No replies come back. Don't pause for approval. Log decisions in docs/DECISIONS.md,
client questions in docs/OPEN-QUESTIONS.md. Site stays NOINDEX.

## GLOBAL RULES (every page)
- `landingPage()` + shared sections (src/pages/_sections.js, src/pages/_kit.js). Clickable-box
  rule: box is a link if the page exists, else a modal with context prefill; `requires:`/`future:`
  for planned pages. Same hover/focus states. <=120 words of running text per section; tabs/accordions
  for depth.
- SEO: title <=60, meta <=155, one H1, query-variant H2s, canonical, OG/Twitter, breadcrumb,
  one JSON-LD @graph (types per SEO-PLAN.md §7), FAQ 5-7 with FAQPage parity, sitemap + llms.txt.
- AI SEO: answer-first sentence under the H1, At a Glance strip, short factual sentences.
- Facts: only from config, client-confirmed facts, or sources you opened (official sites first).
  Log fact + URL in FACTS.md. Unsourced = left out. No miles/drive times unless sourced.
- Client-confirmed: ATL-permitted; chauffeur details sent before pickup; Wi-Fi; no surge pricing;
  free cancellation 24h+ (100% charge within 24h); response within 1 hour; no charge for flight
  delays; grace period (no minutes); 24/7. Fleet exact: Sedan 4/3, SUV 6/5, Sprinter 14/14.
  No stretch, party bus, prom, "guarantee", model names, NY airports, or AVTCS mentions.
- Domestic meeting point = config DOMESTIC_MEETING_POINT ("inside near the atrium or at the
  lower-level curb"). North/South still unconfirmed.
- Say rideshare/taxi/shuttle, never brand names. <=30% text overlap between pages of the same type.

## EFFICIENCY
- One renderer per page type; pages driven by config data (AREAS, VENUES, EVENTS, FBOS, GUIDES,
  ROUTES). No hand-written page per city.
- After EACH page or batch: build -> dead-link/image check -> leak check -> schema parse ->
  commit "Wave 1: <page>" -> push.
- Full click/box tests and Lighthouse only at the end.

## BUILD ORDER (skip anything already committed)
1. [DONE] ATL Domestic Terminal — /atlanta-airport-car-service/domestic-terminal/
2. [DONE] ATL International Terminal — /atlanta-airport-car-service/international-terminal/
3. Events hub /events/ + SEC Championship /events/sec-championship-transportation/ (Dec 5, 2026)
4. Venues hub /venues/ + Mercedes-Benz Stadium /venues/mercedes-benz-stadium-car-service/
5. ATL guide hub /atl-airport-guide/ + is-atl-easy-to-navigate + terminal-map-plane-train
6. Areas hub /areas/ + Duluth + Buckhead, Midtown, Downtown Atlanta, Sandy Springs, Dunwoody,
   Alpharetta, Marietta, Roswell, Decatur at /areas/<city>-car-service/
7. Venues: State Farm Arena, Truist Park & The Battery, Georgia World Congress Center,
   Gas South Arena, Fox Theatre
8. Events: Peach Bowl (verify date), IPPE (Jan 26-28, 2027, GWCC), Falcons game day
9. FBO hub /private-jet-fbo-transfers/ + PDK + FTY
10. Routes hub refresh + 6 long-distance routes on the template (if the foundation didn't already)
11. /services/ master directory: confirm it auto-lists every built page, grouped by cluster

Then: ATL hub + Home link to the new pages (boxes switch from modal to link automatically);
resolve LINK-TODO entries.

## FINAL QA (once)
Click + box test at 1280 and 375 (summary per page type), Lighthouse mobile on one page per type,
schema/FAQ parity, overlap %, orphan/duplicate-title check, leak check, noindex on every page.
Write docs/BUILD-REPORT.md: pages built (URL, title, words), not built + why, facts left out,
decisions, open questions, test results. Tick SEO-PLAN.md §9. Commit "Wave 1 complete", push.

## IF BUDGET RUNS LOW
Stop starting new pages. Commit and push everything that builds. Update BUILD-REPORT.md with
exactly what's left, in order.

## HOW PAGES ARE WIRED (reference)
- Content: `src/content/<type>.js` keyed by slug. Renderer: `src/pages/<type>.js` exporting a
  factory that returns an array of landingPage objects. Register the factory in `src/build.js`
  TEMPLATES + import, and add an entry to `src/headlines.json`.
- Section opts shapes live in `src/pages/_sections.js`; shared helpers (HERO_IMG, glanceTiles,
  sources, serviceNode, collectionNode, card builders) in `src/pages/_kit.js`.
- build.js auto: dead-link/image check, duplicate title/H1, orphan check, future/requires
  resolution, sitemap, llms.txt, redirects. A page auto-lists on /services/ via `cluster` + `card`.
