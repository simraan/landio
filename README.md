# Landio Limo Services LLC

Custom website for Landio Limo Services — luxury SUV, Sprinter van, airport, corporate, private aviation, and diplomatic ground transportation across the Washington, DC metro (DC / Maryland / Virginia).

## Stack
- Static site, deployed on **Cloudflare Pages** (Git-connected to this repo; auto-deploys on push to `main`)
- Structure replicated from the Aura Hamptons build
- 3-step booking form (location/date/time → vehicle → contact) with **Resend** email notifications via a Cloudflare Pages Function
- **Google Maps API** for pickup/drop-off autocomplete

## Domain
- Production: `www.landiolimoservices.com` (CNAME at Squarespace → `<project>.pages.dev`)
- Apex `landiolimoservices.com` → 301 redirect to `www`

## Environment variables (set in Cloudflare Pages → Settings → Environment variables, NOT in this repo)
- `RESEND_API_KEY`
- `GOOGLE_MAPS_API_KEY`

> Do not commit API keys or secrets to this repository.

_Current state: placeholder. Full content to be migrated from the Aura Hamptons repo._
