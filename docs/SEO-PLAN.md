# A-Town Limo — SEO Page Hub & Launch Plan

**Site:** atownlimo.com (Cloudflare Pages, repo `simraan/atown`, preview `atown.pages.dev`)
**As of:** Oct 17, 2026
**Use:** Reference file for building pages one at a time. Drop into the repo at `docs/SEO-PLAN.md`.

---

## 1. Summary

Build atownlimo.com as **7 hubs with one page per search intent**: 86 new or reworked pages in three waves (33 / 34 / 19). Golden Class Limo's 16 months of Search Console data show venue, event and airport-guide pages earn the most per page, while hundreds of thin service, fleet and route variants earned almost nothing.

- **Biggest bet:** the ATL airport cluster. ATL is the world's busiest airport, and page 1 for "atlanta airport car service" is mostly spam.
- **Fastest wins:** venue and event pages. GCL's ranked around positions 9–13 with no link building.
- **Structural fix now:** the 9 metro route pages become area pages, and every cluster gets its own folder. The site is still noindex, so renaming costs nothing.
- **Deadline:** SEC Championship is Dec 5, 2026. Its page must be live and indexed by mid-November, so the site launch (email wired, noindex off) has to happen first — target ~Nov 9.

---

## 2. What Golden Class Limo's data shows

Source: GCL Search Console export, last 16 months to Oct 16, 2026 — 5,462 clicks, 722,197 impressions, 585 pages with data. Pages grouped by URL pattern.

| Page type | Pages | Clicks | Impressions | Clicks/page | Avg position | Read |
|---|---|---|---|---|---|---|
| Airport info / guide | 1 | 814 | 40,060 | 814 | 4.9 | "is JFK easy to navigate" = GCL's best non-brand asset |
| Venue | 21 | 291 | 24,577 | 13.9 | 13.3 | Best return per page built |
| City-to-city route | 55 | 474 | 32,303 | 8.6 | 15.2 | NYC→Boston alone = 252 clicks |
| Event | 57 | 299 | 31,718 | 5.2 | 9.4 | Easiest to rank; traffic dies after the date |
| Area / borough | 42 | 414 | 123,745 | 9.9 | 29.0 | Big demand, weak rankings |
| Airport route | 78 | 467 | 151,423 | 6.0 | 35.7 | Biggest demand, worst CTR (0.31%) |
| Fleet / vehicle | 82 | 517 | 71,737 | 6.3 | 21.0 | Too many near-identical pages |
| Service | 132 | 337 | 178,489 | 2.6 | 31.6 | Sprawl: pages compete with each other |
| Homepage | 2 | 1,544 | 122,236 | 772 | 36.4 | Mostly brand searches |

**Copy for Atlanta**
- Build venue pages early — best return per page, rank ~#13 without links.
- Build airport guide content — one honest guide outranked every GCL commercial page.
- Run events as evergreen URLs — GCL split authority across `fifa-world-cup-2025` and `fifa-world-cup-2026`.

**Don't copy**
- No vehicle × route duplicates (`jfk-to-manhattan`, `-suv`, `-sprinter` split one intent; "jfk to manhattan" = 1,847 impr, position 57).
- No service sprawl ("corporate transportation" = 6,737 impr at position 12.5, zero clicks).
- No 82 fleet pages. Three vehicles = three pages.

**Rule:** one URL per search intent, built deeper.

---

## 3. Atlanta demand map

Keyword volumes not yet pulled (Google Autocomplete blocked from the research workspace; no Keyword Planner access). **Pull Keyword Planner volumes from the ATL Ads account before wave 2.**

### Demand signals

| Signal | Evidence | Meaning for the site |
|---|---|---|
| Airport volume | ATL handled 106.3M passengers in 2025, #1 in the world ([source](https://www.travelagentcentral.com/transportation/atlanta-retains-worlds-busiest-airport-crown)) | Airport + guide cluster is the biggest |
| How Atlanta searches | A-Town Ads converters: "ride to atlanta airport" (18 conv), "airport car service atlanta" (10), "ride from atl" (8), "car service to atl" (6), [atl airport transportation] (5) | Use "ride to/from ATL" and "car service to ATL" phrasing in H1/H2s |
| Weak airport SERP | "atlanta airport car service" page 1 = spam blogs, Blacklane, an Odoo blog | A deep ATL page can rank |
| Weak venue SERP | "limo service mercedes-benz stadium atlanta" = atlanta.com directory + one operator blog | Venue pages are open; get listed in atlanta.com limo directory |
| Weak route SERP | "car service from atlanta to savannah" = Enterprise road-trip guide, tourism page, spam | Long-distance pages are open |
| Pickup rules | Domestic: driver meets inside near atrium or curbside lower level. International: Arrivals level or outer curb. Only Ground Transportation-authorized limo companies may pick up ([ATL](https://www.atl.com/ground-transportation/)) | Terminal pages answer this exactly. **Confirm A-Town's ATL authorization before claiming it.** |

### Private aviation (FBO)

| Airport | Code | FBOs | Note |
|---|---|---|---|
| DeKalb-Peachtree | PDK | Signature, Atlantic Aviation, Epps Aviation ([source](https://www.paramountbusinessjets.com/private-jet-charter/airports/dekalb-peachtree-airport-kpdk)) | Busiest Atlanta jet airport; by Brookhaven/Chamblee |
| Fulton County – Brown Field | FTY | Signature Flight Support, 24/7 ([source](https://acejet.com/airports/kfty/fbos/)) | West of Downtown |
| Cobb County – McCollum Field | RYY | Not yet checked | Kennesaw / Marietta |
| Gwinnett County – Briscoe Field | LZU | Not yet checked | Lawrenceville, near A-Town's Duluth base |

### Venues ([Ticketmaster Atlanta guide](https://blog.ticketmaster.com/venue-explorer-atlanta/))

| Venue | Area | Capacity |
|---|---|---|
| Mercedes-Benz Stadium | Downtown | 70,000+ |
| State Farm Arena | Downtown | 21,000+ concerts |
| Cellairis Amphitheatre at Lakewood | Lakewood Heights | Up to 19,000 |
| Ameris Bank Amphitheatre | Alpharetta | 12,000 |
| State Bank Amphitheatre at Chastain Park | Buckhead | 6,900 |
| Fox Theatre | Midtown | 4,665 |
| Coca-Cola Roxy | The Battery / Cumberland | 3,600 |
| Cobb Energy Performing Arts Centre | Cumberland | 2,750 |
| Tabernacle | Downtown | 2,600 |
| Buckhead Theatre | Buckhead | Up to 1,800 |
| Truist Park, GWCC, Gas South Arena (Duluth), East Lake Golf Club, Atlanta Motor Speedway | Various | Not in source |

### Events with confirmed dates

| Event | Venue | Date | Source |
|---|---|---|---|
| SEC Championship | Mercedes-Benz Stadium | Dec 5, 2026 | [NCAA](https://www.ncaa.com/news/football/article/2026-06-01/2026-sec-championship-game-date-time-tv-channel-history) |
| Celebration Bowl | Mercedes-Benz Stadium | Dec 2026 | [Atlanta Magazine](https://www.atlantamagazine.com/news-culture-articles/5-championship-events-keeping-atlanta-in-the-sports-spotlight-after-the-world-cup/) |
| Peach Bowl | Mercedes-Benz Stadium | Jan 2027 | Atlanta Magazine |
| IPPE | Georgia World Congress Center | Jan 26–28, 2027 | [IPPE](https://www.ippexpo.org/faq/) |
| The Masters | Augusta National | Apr 8–11, 2027 | [Golf Compendium](https://www.golfcompendium.com/2023/04/2027-masters-tournament.html) |
| TOUR Championship | East Lake Golf Club | Every August | Atlanta Magazine |
| Super Bowl LXII | Mercedes-Benz Stadium | Feb 13, 2028 | [FOX 5 Atlanta](https://www.fox5atlanta.com/news/date-set-super-bowl-lxii-atlanta) |
| NCAA Men's Final Four | Atlanta | Apr 2031 | Atlanta Magazine |

Recurring evergreen demand: Falcons, Hawks, Braves, Atlanta United home games and venue concert calendars.

---

## 4. Site architecture

```
Home (atownlimo.com)
├── Airport (ATL) ............ /atlanta-airport-car-service/   → 2 terminal pages + guide hub with 6 guides
├── Private aviation (FBO) ... /private-jet-fbo-transfers/     → 4 airfield pages (PDK, FTY, RYY, LZU)
├── Areas .................... /areas/                         → 24 city pages
├── Long-distance routes ..... /routes/                        → 16 route pages
├── Venues ................... /venues/                        → 18 venue pages
├── Events ................... /events/                        → 11 event pages (no year in URL)
└── Services & fleet ......... /services/ · /fleet/ · /rates/  → existing spokes + 4 new pages

Cross-links: venue ↔ its events ↔ its area ↔ ATL hub. Guides and events feed the ATL hub, areas and fleet.
```

**URL rules**
- One folder per cluster (`/areas/`, `/venues/`, `/events/`, `/routes/`, `/atl-airport-guide/`) so Search Console reports clusters separately.
- Slugs carry the main query: `/venues/mercedes-benz-stadium-car-service/`.
- No years in slugs. No vehicle names in route/venue slugs.
- Lowercase, hyphens, trailing slash, max 3 folders deep.
- Keep `/about-us/` and `/contact/` exactly as-is (live WordPress parity).

---

## 5. Page inventory

**Change to what's built:** the 9 metro "ATL ↔ Buckhead"-style route pages become **area pages** (a city page and an "ATL to that city" page chase the same searcher; GCL ran both and ranked with neither).

### Airport (ATL)
| Page | URL | Main query | Wave |
|---|---|---|---|
| ATL hub (rename from `/airport/`) | `/atlanta-airport-car-service/` | atlanta airport car service, car service to ATL, ride to atlanta airport | 1 |
| Domestic Terminal pickups | `/atlanta-airport-car-service/domestic-terminal/` | ATL domestic terminal car service pickup | 1 |
| International Terminal pickups | `/atlanta-airport-car-service/international-terminal/` | ATL international terminal car service | 1 |
| ATL guide hub | `/atl-airport-guide/` | ATL airport guide | 1 |
| Is ATL easy to navigate? | `/atl-airport-guide/is-atl-easy-to-navigate/` | is ATL airport easy to navigate | 1 |
| Terminal map & Plane Train | `/atl-airport-guide/terminal-map-plane-train/` | ATL terminal map, ATL plane train | 1 |
| Domestic vs International terminal | `/atl-airport-guide/domestic-vs-international-terminal/` | which terminal ATL | 2 |
| How early to arrive at ATL | `/atl-airport-guide/how-early-to-arrive/` | how early to get to ATL airport | 2 |
| ATL to Downtown: every option | `/atl-airport-guide/atl-to-downtown-options/` | how to get from ATL to downtown | 2 |
| ATL layover guide | `/atl-airport-guide/layover-guide/` | ATL layover | 3 |

### Private aviation (FBO)
| Page | URL | Main query | Wave |
|---|---|---|---|
| FBO hub (rename existing spoke) | `/private-jet-fbo-transfers/` | private jet car service atlanta | 1 |
| PDK – DeKalb-Peachtree | `/private-jet-fbo-transfers/pdk-dekalb-peachtree/` | PDK car service | 1 |
| FTY – Fulton County Brown Field | `/private-jet-fbo-transfers/fty-fulton-county/` | Fulton County airport car service | 1 |
| RYY – Cobb County McCollum | `/private-jet-fbo-transfers/ryy-mccollum-field/` | McCollum Field car service | 2 |
| LZU – Gwinnett Briscoe | `/private-jet-fbo-transfers/lzu-gwinnett-briscoe/` | Gwinnett airport car service | 2 |

### Areas — `/areas/<city>-car-service/` (targets "[city] car service" + "[city] to Atlanta airport")
| Pages | Wave |
|---|---|
| Areas hub `/areas/` | 1 |
| Buckhead, Midtown, Downtown Atlanta, Sandy Springs, Dunwoody, Alpharetta, Marietta, Roswell, Decatur (converted) | 1 |
| Duluth (A-Town's base) | 1 |
| Johns Creek, Peachtree Corners, Brookhaven, Cumberland/Vinings, Smyrna, Kennesaw, Lawrenceville, Suwanee, Cumming | 2 |
| Buford, Peachtree City, Fayetteville, Newnan, McDonough | 3 |

### Long-distance routes — `/routes/atlanta-to-<city>-car-service/`
| Pages | Wave |
|---|---|
| Routes hub `/routes/` (exists) + Savannah, Athens, Augusta, Macon, Chattanooga, Greenville SC (exist) | 1 |
| Birmingham AL, Charlotte NC, Nashville TN, Asheville NC, Columbus GA | 2 |
| Helen, Blue Ridge, Lake Lanier, Callaway Gardens, St. Simons Island (only where volume exists) | 3 |

### Venues — `/venues/<venue>-car-service/`
| Pages | Wave |
|---|---|
| Venues hub `/venues/` + Mercedes-Benz Stadium, State Farm Arena, Truist Park & The Battery, Georgia World Congress Center, Gas South Arena, Fox Theatre | 1 |
| Ameris Bank Amphitheatre, Lakewood Amphitheatre, Chastain Park Amphitheatre, Cobb Energy Centre, Coca-Cola Roxy, Tabernacle, East Lake Golf Club, Atlanta Motor Speedway | 2 |
| Buckhead Theatre, Bobby Dodd Stadium, Sanford Stadium (Athens), AmericasMart | 3 |

### Events (one URL per recurring event, no year in slug)
| Page | URL | Event date | Wave |
|---|---|---|---|
| Events hub | `/events/` | — | 1 |
| SEC Championship | `/events/sec-championship-transportation/` | Dec 5, 2026 | 1 |
| Peach Bowl | `/events/peach-bowl-transportation/` | Jan 2027 | 1 |
| IPPE at GWCC | `/events/ippe-atlanta-transportation/` | Jan 26–28, 2027 | 1 |
| Falcons game day | `/events/falcons-game-day-transportation/` | Season | 1 |
| Celebration Bowl | `/events/celebration-bowl-transportation/` | Dec 2026 | 2 |
| Hawks game day | `/events/hawks-game-transportation/` | Season | 2 |
| The Masters (Atlanta → Augusta) | `/events/masters-transportation-from-atlanta/` | Apr 8–11, 2027 | 2 |
| Braves game day | `/events/braves-game-transportation/` | Season | 3 |
| Atlanta United match day | `/events/atlanta-united-transportation/` | Season | 3 |
| TOUR Championship | `/events/tour-championship-transportation/` | August | 3 |
| Super Bowl LXII | `/events/super-bowl-atlanta-transportation/` | Feb 13, 2028 | 3 (publish ~Feb 2027) |

### Services, fleet, money pages
| Page | URL | Main query | Wave |
|---|---|---|---|
| Existing services hub + spokes | keep | per spoke | 1 |
| Sprinter Van (exists) | keep | sprinter van rental atlanta with driver | 1 |
| Corporate / executive (exists) | keep | corporate transportation atlanta | 1 |
| Rates | `/rates/` | car service atlanta prices | 2 (needs client price grid) |
| Wedding car service | `/services/wedding-car-service/` | wedding car service atlanta | 2 |
| Car service cost guide | `/guides/atlanta-car-service-cost/` | how much is a car service in atlanta | 2 |
| Car service vs rideshare at ATL | `/guides/car-service-vs-rideshare-atl/` | uber vs car service atlanta airport | 2 |

---

## 6. Internal linking rules

| From | Must link to | Anchor example |
|---|---|---|
| Home | All 7 hubs, top 6 venues, top 6 areas, ATL hub above the fold | "Atlanta airport car service" |
| Any hub | Every spoke in its cluster, as cards | Spoke's main query |
| ATL hub | Both terminal pages, Meet & Greet, guide hub, top 10 areas, 3 fleet pages | "ATL Domestic Terminal pickup" |
| Terminal page | ATL hub, Meet & Greet, 2 related guides, reservation | "meet & greet at ATL" |
| ATL guide | ATL hub + matching terminal page in first 150 words; 1–2 sibling guides | "book a car service to ATL" |
| Area page | ATL hub, 3 nearest areas, nearby venues, nearest FBO, 1–2 long-distance routes | "Sandy Springs car service" |
| Venue page | Its area, ATL hub, events held there, Sprinter page | "Mercedes-Benz Stadium car service" |
| Event page | Its venue, ATL hub, Sprinter + SUV pages, events hub | "car service to Mercedes-Benz Stadium" |
| Route page | Routes hub, ATL hub, the tied event (Augusta → Masters, Athens → Sanford Stadium) | "Atlanta to Augusta car service" |
| FBO page | FBO hub, nearest 3 areas, Executive SUV page | "PDK private jet car service" |
| Fleet page | ATL hub, routes hub, events hub | "book the Sprinter for your group" |

**Mechanics**
- Breadcrumbs everywhere (Home › Hub › Page) + `BreadcrumbList` schema.
- 3–8 contextual links in body copy per page.
- Anchor = destination's main query or close variant; rotate 2–3 variants; never "click here".
- Footer = 7 hubs + core pages only.
- Menu: Services, Airport, Areas, Venues & Events, Fleet, Routes.
- Build fails on orphan pages or duplicate H1/title (`build.js` check).
- Link maps live in `config.js` (neighbors, venues, nearest FBO) — links are generated, not hand-typed.

---

## 7. Page templates

Standard chrome on every page: hero + quote form, Know Before You Book, Three Steps, fleet strip, FAQ, CTA band.

| Type | H1 pattern | Unique sections | Schema | Min words |
|---|---|---|---|---|
| ATL hub / terminal | Atlanta Airport Car Service (ATL) | Where your chauffeur meets you (per terminal), flight tracking, wait policy, drive times to top 10 areas | LimousineService, Service, FAQPage, BreadcrumbList | 1,200 |
| ATL guide | The question as asked | Answer in first 2 sentences, numbered steps, terminal table/diagram, one soft CTA | Article, FAQPage, BreadcrumbList | 1,000 |
| FBO | Private Jet Car Service at [Airport] ([Code]) | FBOs on field, tail-side vs lobby pickup, drive times to Buckhead/Midtown/Downtown | Service, FAQPage | 700 |
| Area | [City] Car Service & ATL Airport Transfers | Drive time + miles to ATL, neighborhoods/landmarks, nearest venues + FBO, local pickup notes | Service (areaServed), FAQPage | 800 |
| Route | Atlanta to [City] Car Service | Miles, drive time, stops, vehicle by group size, one-way vs round trip | Service, FAQPage | 900 |
| Venue | [Venue] Car Service & Limo | Drop-off/pickup zones, post-event plan, parking context, events held, nearest area | Service, FAQPage, Place | 800 |
| Event | [Event] Transportation in Atlanta | Dates (yearly), venue, airport→hotel→venue plan, group Sprinter, book-by date | Service, Event, FAQPage | 800 |

**Content rules**
- Answer first: first 2 sentences answer the main query (what AI search and snippets lift).
- Facts only from sources or the client; unverified = left out. Log facts + URLs in `docs/FACTS.md`.
- No near-duplicates: area pages share ≤ ~30% body text.
- Fleet exact: Executive Sedan (4 pax/3 bags), Executive SUV (6/5), Sprinter Van (14/14). No stretch, party bus, prom, "guarantee", model names.
- At least one real local photo on venue/area pages where possible.

---

## 8. Launch waves

| Milestone | Dates (build dates are proposals) |
|---|---|
| Build wave 1 (33 pages) | Oct 19 – Nov 6, 2026 |
| **Site launch, noindex off** | **~Nov 9, 2026** |
| Build wave 2 (34 pages) | Nov 16, 2026 – Jan 15, 2027 |
| SEC Championship | Dec 5, 2026 |
| Build wave 3 (19 pages) | Jan 18 – Mar 12, 2027 |
| IPPE at GWCC | Jan 26–28, 2027 |
| Super Bowl LXII page live | ~Feb 13, 2027 |
| The Masters | Apr 8–11, 2027 |

- Wave 1 is gated by launch: email handler, GTM, DNS steps in `LAUNCH.md` come first.
- Wave 2 carries the Masters page (indexed by February) and Celebration Bowl.
- Wave 3 carries Super Bowl LXII (a year out) and spring/summer sports seasons.
- After wave 3: refresh event dates every January; add pages only where Search Console shows impressions without a matching page.

---

## 9. Page build tracker (one page at a time)

Build in this order. Each page = one Claude Code prompt → review on `atown.pages.dev` → tick.

**Step 0 — foundation (once)**
- [ ] 0.1 URL restructure + 301s (`/airport/` → ATL hub, FBO spoke → hub, 9 routes → areas, routes → `/routes/atlanta-to-<city>-car-service/`)
- [ ] 0.2 `config.js` data maps (AREAS, VENUES, EVENTS, FBOS, GUIDES) + link generator
- [ ] 0.3 Templates (7 types) + orphan/duplicate-title build checks
- [ ] 0.4 Navigation + footer

**Wave 1 pages**
- [x] 1. ATL hub — `/atlanta-airport-car-service/`
- [ ] 2. Domestic Terminal — `/atlanta-airport-car-service/domestic-terminal/`
- [ ] 3. International Terminal — `/atlanta-airport-car-service/international-terminal/`
- [ ] 4. SEC Championship — `/events/sec-championship-transportation/` *(deadline-driven)*
- [ ] 5. Mercedes-Benz Stadium — `/venues/mercedes-benz-stadium-car-service/`
- [ ] 6. Events hub — `/events/`
- [ ] 7. Venues hub — `/venues/`
- [ ] 8. ATL guide hub — `/atl-airport-guide/`
- [ ] 9. Is ATL easy to navigate? — `/atl-airport-guide/is-atl-easy-to-navigate/`
- [ ] 10. Terminal map & Plane Train — `/atl-airport-guide/terminal-map-plane-train/`
- [ ] 11. Areas hub — `/areas/`
- [ ] 12. Duluth — `/areas/duluth-car-service/`
- [ ] 13. Buckhead — `/areas/buckhead-car-service/`
- [ ] 14. Midtown — `/areas/midtown-car-service/`
- [ ] 15. Downtown Atlanta — `/areas/downtown-atlanta-car-service/`
- [ ] 16. Sandy Springs — `/areas/sandy-springs-car-service/`
- [ ] 17. Dunwoody — `/areas/dunwoody-car-service/`
- [ ] 18. Alpharetta — `/areas/alpharetta-car-service/`
- [ ] 19. Marietta — `/areas/marietta-car-service/`
- [ ] 20. Roswell — `/areas/roswell-car-service/`
- [ ] 21. Decatur — `/areas/decatur-car-service/`
- [ ] 22. State Farm Arena — `/venues/state-farm-arena-car-service/`
- [ ] 23. Truist Park & The Battery — `/venues/truist-park-car-service/`
- [ ] 24. Georgia World Congress Center — `/venues/georgia-world-congress-center-car-service/`
- [ ] 25. Gas South Arena — `/venues/gas-south-arena-car-service/`
- [ ] 26. Fox Theatre — `/venues/fox-theatre-car-service/`
- [ ] 27. Peach Bowl — `/events/peach-bowl-transportation/`
- [ ] 28. IPPE — `/events/ippe-atlanta-transportation/`
- [ ] 29. Falcons game day — `/events/falcons-game-day-transportation/`
- [ ] 30. FBO hub — `/private-jet-fbo-transfers/`
- [ ] 31. PDK — `/private-jet-fbo-transfers/pdk-dekalb-peachtree/`
- [ ] 32. FTY — `/private-jet-fbo-transfers/fty-fulton-county/`
- [ ] 33. Routes hub refresh — `/routes/` (6 existing routes re-slugged)

---

## 10. Measurement & open items

**Search Console, monthly, per folder** (Pages → filter "URL contains")

| Folder | Success at 90 days after launch |
|---|---|
| `/atlanta-airport-car-service/` | Hub in top 20 for "atlanta airport car service" |
| `/atl-airport-guide/` | ≥ 1 guide in top 10 for its question |
| `/areas/` | Clicks from 5+ area pages |
| `/venues/` | Every wave-1 venue page getting clicks |
| `/events/` | SEC Championship + Peach Bowl indexed before their dates |
| `/routes/` | Savannah and Augusta in top 20 |

Conversions by landing page: GTM events `form_submit_success` + `click_to_call` once `GTM_ID` is set.

**Open questions**
- [ ] Is A-Town authorized by ATL Ground Transportation for pre-arranged pickups?
- [ ] Which private-jet airports (PDK, FTY, RYY, LZU) and FBOs does A-Town serve?
- [ ] Rate grid for `/rates/`.
- [ ] Real photos at venues / airport curb.
- [ ] Keyword Planner volumes for every inventory row (ATL Ads account).

**Off-site alongside wave 1**
- Google Business Profile: categories "Limousine service" + "Airport shuttle service"; service areas = wave 1 areas; a post per event page.
- Get listed in the atlanta.com limo directory (ranks page 1 for venue queries).

---

## Sources
- [ATL Ground Transportation](https://www.atl.com/ground-transportation/)
- [Travel Agent Central — ATL 106.3M passengers](https://www.travelagentcentral.com/transportation/atlanta-retains-worlds-busiest-airport-crown)
- [NCAA — 2026 SEC Championship](https://www.ncaa.com/news/football/article/2026-06-01/2026-sec-championship-game-date-time-tv-channel-history)
- [Atlanta Magazine — championship events after the World Cup](https://www.atlantamagazine.com/news-culture-articles/5-championship-events-keeping-atlanta-in-the-sports-spotlight-after-the-world-cup/)
- [FOX 5 Atlanta — Super Bowl LXII date](https://www.fox5atlanta.com/news/date-set-super-bowl-lxii-atlanta)
- [IPPE 2027](https://www.ippexpo.org/faq/)
- [Golf Compendium — 2027 Masters](https://www.golfcompendium.com/2023/04/2027-masters-tournament.html)
- [Ticketmaster — Atlanta venues](https://blog.ticketmaster.com/venue-explorer-atlanta/)
- [Paramount Business Jets — PDK FBOs](https://www.paramountbusinessjets.com/private-jet-charter/airports/dekalb-peachtree-airport-kpdk)
- [ACE Jet — FTY FBOs](https://acejet.com/airports/kfty/fbos/)
- Golden Class Limo Search Console export (16 months to Oct 16, 2026)
