# LINK-TODO — links to add when the target page exists

Rule (SEO-PLAN §6): link only to pages that exist; no placeholder links. Each
entry below is a link we *want* but held back. When the target page ships, add
the link, then delete the entry.

Format: `[from page] → [future URL] · [anchor] · [where on the page]`

**Automatic:** the ATL hub's "Explore More" section defines cards for future
pages with `requires:`, and many clickable boxes carry `data-future="/url/"`.
`build.js` turns each into a link the moment the target page is built — no code
change needed. Only the hand-added in-body links below remain.

## Still open

- [Home · Areas We Serve chips] → `/areas/brookhaven-car-service/`, `/areas/smyrna-car-service/`, `/areas/johns-creek-car-service/` · "View area" · today: quote modal, pickup = that city (these 3 areas are not in config AREAS yet)
- [ATL hub] → `/atl-airport-guide/how-early-to-arrive/` · "how early to get to ATL" · Car Service to ATL section, 2nd paragraph (guide not built)

## Resolved (kept for the record)

- Oct 17 2026 — Domestic/International terminal pages shipped: ATL hub timeline boxes + Explore cards auto-switched to links.
- Oct 17 2026 — ATL guide hub + 2 guides shipped: ATL hub Explore cards now link both articles.
- Oct 17 2026 — Areas hub + 10 area pages shipped: Home "Areas We Serve" chips (9 metro) + the landing Service Area card auto-switched to `/areas/*`; the ATL hub "Popular Rides" Metro table now links the 10 area pages, and its footer line links `/areas/`; legacy `/routes/atlanta-airport-to-*/` metro pages migrated with 301s (redirects.js).
- Oct 17 2026 — FBO hub + PDK + FTY shipped: the legacy `/services/fbo-private-jet/` spoke was migrated to `/private-jet-fbo-transfers/` (301); the ATL hub "More Services" card + nav + homepage grid now link the hub, and the ATL hub Explore card links PDK; areas' FBO cards (PDK/FTY) auto-lit.
