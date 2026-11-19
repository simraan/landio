# DECISIONS — wave 1 (autonomous run, Oct 17 2026)

Decisions taken without client input, each following SEO-PLAN.md. Newest last.

| # | Decision | Why |
|---|---|---|
| 1 | Link maps (AREAS, VENUES, EVENTS, FBOS, GUIDES, ROUTES, HUBS) live in `config.js`; page copy + sourced facts live in `src/content/*.js` keyed by the same slugs. | Keeps config.js the link SSOT without burying it in prose. |
| 2 | Nav = 7 items, each dropdown generated from the maps; links to unbuilt pages are skipped at render time (`isBuilt`). Home + About moved out of the top bar (logo = Home; About in the footer). | Brief: 7-item nav, About → footer. Nothing ever links to a missing page. |
| 3 | Footer = "Explore" (hubs) + "Company" (Home, About, Reservations, Contact, legal). | SEO-PLAN §6: footer = hubs + core pages only. |
| 4 | Redirects are generated from the maps and emitted only when the new page is built and the old page is gone. | Renames land page by page without ever 301-ing to a 404. |
| 5 | `/services/` is rendered last with every other page passed in; pages opt in with `cluster` (+ `hub`, `card`). | Brief: directory must list future pages with no manual edits. |
| 6 | Build fails on duplicate `<title>`/H1 and on orphan pages (indexable pages nothing links to). | SEO-PLAN §6 mechanics. |
| 7 | One hero photo (`chauffeured-ride`) reused on every landing page. | Only photo in the repo; real local photos are an open question. |
| 8 | Terminal pages = one renderer (`src/pages/terminals.js`) over `src/content/terminals.js`, two pages. Sections: hero, trust, intro (pickup/drop-off), tabbed timeline (arriving/leaving), options table, steps, FAQ, related links, contact. | Brief: one renderer per type, data-driven; no hand-written page. |
| 9 | The ATL hub's terminal timeline boxes + "Explore More" cards switch from modal to link automatically now that the terminal pages exist (data-future / data-requires); 4 LINK-TODO entries removed. | SEO-PLAN §6: never 301/link to a missing page; auto-switch on build. |
| 10 | Events = hub (`eventsHub`) + per-event pages (`eventPages`) from `src/content/events.js`. An event is "built" iff it has an `EVENT_PAGES` entry; the hub's ItemList + cards read the same set, so schema and pages never drift. `BUILT` isn't populated at factory time, so this content-keyed gate replaces an isBuilt check. | Brief: data-driven, hub lists only built pages, no manual edits. |
| 11 | SEC Championship page names the 2026 date (Sat Dec 5 2026, 4pm ET, ABC, Mercedes-Benz Stadium) with an `Event` JSON-LD node (startDate `2026-12-05T16:00-05:00`). URL evergreen; date is a yearly maintenance refresh (FACTS.md + OPEN-QUESTIONS.md). | Sourced to NCAA.com; event rich-result value outweighs the yearly refresh cost. |
| 12 | `/routes/` is now **long-distance only** (6 routes). The 9 legacy `/routes/atlanta-airport-to-<city>/` metro pages were removed and migrated to `/areas/<city>-car-service/`, with 301s auto-emitted by redirects.js (area built + old route gone). The ATL hub "Popular Rides" Metro tab + Home chips now point at `/areas/`. | SEO-PLAN hub-and-spoke: metro = Areas cluster, `/routes/` = long-distance (matches HUBS.routes.name). |
| 13 | The 10 area spokes **omit the generic "why" and "steps" sections** (kept on the areas hub and on single-instance spokes). | With 10 near-identical-structure pages, cutting the biggest shared blocks holds same-type overlap down; the hero + clickable boxes still drive booking. |

## Overlap note (area pages)
Crude full-`<main>` sentence overlap between two area pages is ~41–47%, but that is dominated by **shared site furniture** present on every landing page of every type (quote form, At-a-Glance facts, policy FAQ, contact block, booking CTAs), not by thin editorial bodies. Each area page's unique content — hero answer with neighborhood context, two intro columns (named highway + landmarks + local angle), 3 area-specific FAQ, and area-specific nearby cross-links — is genuinely distinct. Flagged for the final-QA overlap pass (SEO-PLAN §9); if a stricter body-only measure is wanted, exclude header/footer/form/contact before computing.

## Status — WAVE 1 COMPLETE (Oct 17 2026)
- **Done:** All of BUILD ORDER §1–§11. **56 pages**, all clusters live and cross-linked. Two in-wave migrations (9 metro routes → areas; fbo spoke → FBO hub) with 301s. §10 routes refresh folded into the areas ship; §11 `/services/` directory auto-lists all 8 clusters (confirmed).
- **FINAL QA:** passed — 0 dead links, 0 dup titles/H1, 0 orphans (build-enforced); leak-clean ("guarantee" only in Terms §8); noindex 56/56; schema valid + FAQ↔FAQPage parity on all; meta ≤155 & title ≤60 on all; visual mobile 375 + desktop checks pass; quote modal + context prefill verified in-browser. Area-page overlap is furniture-driven (documented). Lighthouse-per-type deferred to a pre-launch preview. Full report in **docs/BUILD-REPORT.md**; SEO-PLAN §9 ticked there.
- **Remaining (future waves / client):** Lighthouse-per-type on a preview; real local photography; `how-early-to-arrive` guide + Brookhaven/Smyrna/Johns Creek areas + Masters event (docs/LINK-TODO.md); wire `POST /api/lead` before launch (LAUNCH.md); flip `NOINDEX=false` + set `GTM_ID` at launch.
- **Resume with:** "Read docs/WAVE1-BRIEF.md and docs/BUILD-REPORT.md and continue."
- **Reusable pattern:** hub + spokes from one content module, built iff it has a `*_PAGES` entry (DECISIONS #10). `requires:` on cross-cluster links; no isBuilt at factory time. For large templated spoke sets, omit generic why/steps (DECISIONS #13).
- **Open questions:** Domestic curb side (N/S), real photos, which FBOs served, + SEC date yearly refresh (docs/OPEN-QUESTIONS.md).
- **Resume with:** "Read docs/WAVE1-BRIEF.md and continue."
