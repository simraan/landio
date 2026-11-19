# OPEN QUESTIONS — for the client

Collected during the wave-1 build. Pages use the safe default noted here until
answered.

1. **Domestic Terminal curb side.** ATL's page says "South lower level" in one place and "North or South lower level" in another. Which side do A-Town chauffeurs use? Default: "inside near the atrium or at the lower-level curb" (`DOMESTIC_MEETING_POINT` in config.js).
2. **Real photos.** Every landing page reuses one stock hero image. Photos of the fleet at ATL, venues, and FBOs would help (SEO-PLAN §7).
3. **Private airfields served.** Which airfields/FBOs does A-Town actually serve (PDK, FTY, RYY, LZU)? Default: PDK + FTY pages describe ATL-style transfers to the FBOs on the field without claiming ramp access.

## Maintenance (not client questions)

- **SEC Championship date is year-specific.** `/events/sec-championship-transportation/` names the 2026 game (Sat Dec 5 2026) in copy and in an `Event` JSON-LD `startDate`. The URL is evergreen — refresh the date each year from NCAA.com after the schedule is published. Source logged in docs/FACTS.md ("Events").
