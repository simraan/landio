/**
 * Private jet / FBO transfer pages — content. The hub (HUB) plus one block per
 * config FBOS slug. A field is "built" when it has an FBO_PAGES entry here.
 *
 * Scope (docs/OPEN-QUESTIONS.md): we describe chauffeured transfers to and from
 * the FBOs on the field, coordinated with the flight crew — NOT ramp access or a
 * named FBO partnership. Airport facts are sourced in docs/FACTS.md ("Private
 * aviation (FBOs)"); business facts come from config.js.
 */

import { SITE, PHONE } from "../config.js";

export const HUB = {
  h1: "Private Jet & FBO Car Service in Atlanta",
  title: "Private Jet & FBO Transfers (Atlanta)",
  titleFull: "Private Jet & FBO Car Service in Atlanta | A-Town Limo",
  description: `Chauffeured car service to Atlanta's private-jet airports and FBOs — PDK and Fulton County (FTY). Crew-coordinated, discreet, 24/7. Call ${PHONE.local}.`,
  summary: "Chauffeured transfers to and from Atlanta's private-aviation airports and FBOs — DeKalb-Peachtree (PDK) and Fulton County (FTY) — coordinated with your flight crew.",
  answer: `A-Town Limo provides discreet chauffeured transfers to and from Atlanta's private-aviation airports and their FBOs — including DeKalb-Peachtree (PDK) and Fulton County (FTY) — coordinated with your flight crew, ${SITE.hours}.`,
  chips: [
    { icon: "plane", text: "PDK & FTY" },
    { icon: "radar", text: "Crew-coordinated" },
    { icon: "shield", text: "Discreet, 24/7" },
  ],
  introCols: [
    {
      icon: "plane",
      h2: "Curbside at the FBO",
      html: `<p>Private aviation runs on precise timing. Your chauffeur meets you at the FBO on the field — not a crowded terminal — and we coordinate with your flight crew so the car is in position when your aircraft arrives or before you depart.</p>`,
    },
    {
      icon: "shield",
      h2: "Discreet, Professional Service",
      html: `<p>For VIP passengers, privacy and presentation matter. Travel in an Executive Sedan or SUV, or move a group in the Sprinter van, with professional chauffeurs who handle the luggage and the logistics quietly.</p>`,
    },
  ],
  why: [
    { icon: "radar", title: "Coordinated with your crew", text: "We work to your tail number's timing so the car is ready when you are." },
    { icon: "shield", title: "Discreet VIP service", text: "Professional chauffeurs, privacy, and a clean, immaculate vehicle." },
    { icon: "plane", title: "ATL private terminals too", text: "We also serve the private-aviation facilities at Hartsfield-Jackson (ATL)." },
    { icon: "clock", title: "24/7 for short-notice flights", text: "Dispatch runs around the clock for last-minute private departures and arrivals." },
  ],
  faqs: [
    { q: "Which Atlanta private-jet airports do you serve?", a: `A-Town Limo provides chauffeured transfers to and from Atlanta's private-aviation airports and their FBOs, including DeKalb-Peachtree (PDK) and Fulton County (FTY), plus the private facilities at Hartsfield-Jackson (ATL). ${SITE.responsePromise}` },
    { q: "Can you coordinate with my flight crew or FBO?", a: "Yes. We coordinate with your flight crew or the FBO so your chauffeur is in position when your aircraft arrives, or ahead of a departure. Share your FBO and timing when you book." },
    { q: "Do you provide service for short-notice private flights?", a: "We operate 24/7 and do our best to accommodate short-notice private-aviation transfers. Call us and we'll confirm availability." },
    { q: "Which vehicle is best for a private-jet transfer?", a: "The Executive Sedan and SUV suit most VIP transfers; the Sprinter van carries a larger party and luggage. Choose by group size and bags." },
    { q: "Is pricing fixed for FBO transfers?", a: "Every trip is quoted before you book, with no surge pricing. The quote depends on distance, vehicle, duration, tolls, and stops." },
    { q: "What is your cancellation policy?", a: SITE.cancellation.full },
  ],
};

export const FBO_PAGES = {
  pdk: {
    slug: "pdk",
    h1: "PDK Private Jet Car Service (DeKalb-Peachtree)",
    title: "PDK Private Jet Car Service (DeKalb-Peachtree)",
    titleFull: "PDK Private Jet Car Service | A-Town Limo",
    description: `Chauffeured car service to DeKalb-Peachtree Airport (PDK) and its FBOs — crew-coordinated, discreet transfers across metro Atlanta. Call ${PHONE.local}.`,
    summary: "Chauffeured transfers to and from DeKalb-Peachtree Airport (PDK) and its FBOs — Georgia's second-busiest airport — coordinated with your flight crew.",
    answer: `A-Town Limo provides discreet chauffeured car service to and from DeKalb-Peachtree Airport (PDK) and its FBOs — a private-aviation airport northeast of downtown Atlanta — coordinated with your flight crew, ${SITE.hours}.`,
    chips: [
      { icon: "plane", text: "DeKalb-Peachtree (PDK)" },
      { icon: "pin", text: "NE of downtown Atlanta" },
      { icon: "radar", text: "Crew-coordinated" },
    ],
    facts: [
      { label: "Airport", value: "DeKalb-Peachtree Airport (PDK)" },
      { label: "Type", value: "General-aviation airport — no scheduled airline service" },
      { label: "Location", value: "Chamblee, DeKalb County, about 12 miles northeast of downtown Atlanta" },
      { label: "Ranking", value: "The second-busiest airport in Georgia, after Hartsfield-Jackson" },
      { label: "A-Town service", value: "Transfers to and from the FBOs on the field, coordinated with your crew" },
    ],
    factsSources: ["pdk"],
    introCols: [
      { icon: "plane", h2: "Met at the PDK FBO", html: `<p>Your chauffeur meets you at the FBO on the field at DeKalb-Peachtree, not a public terminal. We coordinate with your flight crew so the car is curbside when your aircraft arrives, then drive you anywhere in metro Atlanta.</p>` },
      { icon: "radar", h2: "On-Time for Your Departure", html: `<p>Flying out of PDK? We time your pickup from home, the office, or your hotel to your wheels-up, with no surge pricing and a professional chauffeur who handles the bags and the timing.</p>` },
    ],
    why: [
      { icon: "radar", title: "Coordinated with your crew", text: "We work to your schedule so the car is ready at the FBO when you are." },
      { icon: "shield", title: "Discreet VIP service", text: "Professional chauffeurs, privacy, and an immaculate vehicle." },
      { icon: "pin", title: "Anywhere in metro Atlanta", text: "Buckhead, the Perimeter, Dunwoody, or downtown — PDK sits close to the north side." },
      { icon: "clock", title: "24/7, short notice welcome", text: "Dispatch runs around the clock for last-minute private flights." },
    ],
    faqs: [
      { q: "Where will my chauffeur meet me at PDK?", a: "At the FBO on the field where your aircraft arrives. Tell us your FBO when you book and we coordinate with your flight crew so the car is curbside as you land. We don't claim ramp access — you're met at the FBO." },
      { q: "Where is DeKalb-Peachtree Airport?", a: "PDK is in Chamblee, in DeKalb County, about 12 miles northeast of downtown Atlanta — close to Buckhead, the Perimeter, and Dunwoody. It's the second-busiest airport in Georgia, used for general and private aviation." },
      { q: "Can you coordinate with my flight crew at PDK?", a: "Yes. Share your FBO and timing when you book and we coordinate so your chauffeur is in position when your aircraft arrives, or ahead of your departure." },
      { q: "Do you serve PDK 24/7?", a: `Yes. We operate ${SITE.hours} and do our best to accommodate short-notice private flights. ${SITE.responsePromise}` },
      { q: "Which vehicle should I book for a PDK transfer?", a: "The Executive Sedan or SUV suits most private-jet transfers; the Sprinter van carries a larger party with luggage. Choose by group size and bags." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },

  fty: {
    slug: "fty",
    h1: "FTY Private Jet Car Service (Fulton County)",
    title: "FTY Private Jet Car Service (Fulton County)",
    titleFull: "FTY Private Jet Car Service | A-Town Limo",
    description: `Chauffeured car service to Fulton County Airport (FTY, Brown Field) and its FBO — crew-coordinated, discreet transfers. Call ${PHONE.local}.`,
    summary: "Chauffeured transfers to and from Fulton County Airport (FTY, Brown Field) and its FBO — a reliever airport west of downtown Atlanta — coordinated with your flight crew.",
    answer: `A-Town Limo provides discreet chauffeured car service to and from Fulton County Airport (FTY) — also called Brown Field, a private-aviation airport west of downtown Atlanta — and its FBO, coordinated with your flight crew, ${SITE.hours}.`,
    chips: [
      { icon: "plane", text: "Fulton County (FTY)" },
      { icon: "pin", text: "West of downtown Atlanta" },
      { icon: "radar", text: "Crew-coordinated" },
    ],
    facts: [
      { label: "Airport", value: "Fulton County Airport (FTY) — also called Brown Field / Charlie Brown Field" },
      { label: "Type", value: "County-owned general-aviation airport; FAA reliever for Hartsfield-Jackson" },
      { label: "Location", value: "About 6 nautical miles west of downtown Atlanta, near I-20 and I-285" },
      { label: "FBO", value: "Signature Flight Support operates the FBO on the field" },
      { label: "A-Town service", value: "Transfers to and from the FBO, coordinated with your crew" },
    ],
    factsSources: ["fty", "ftyWiki"],
    introCols: [
      { icon: "plane", h2: "Met at the FTY FBO", html: `<p>Your chauffeur meets you at the FBO on the field at Fulton County Airport (Brown Field), on Atlanta's west side near I-20 and I-285. We coordinate with your flight crew so the car is ready when your aircraft arrives.</p>` },
      { icon: "radar", h2: "On-Time for Your Departure", html: `<p>Departing from FTY? We time your pickup to your wheels-up from anywhere in metro Atlanta, with no surge pricing and a discreet, professional chauffeur who handles the details.</p>` },
    ],
    why: [
      { icon: "radar", title: "Coordinated with your crew", text: "We work to your schedule so the car is ready at the FBO when you are." },
      { icon: "shield", title: "Discreet VIP service", text: "Professional chauffeurs, privacy, and an immaculate vehicle." },
      { icon: "pin", title: "Quick to the west side & downtown", text: "FTY sits near I-20/I-285, close to downtown and Atlanta's west side." },
      { icon: "clock", title: "24/7, short notice welcome", text: "Dispatch runs around the clock for last-minute private flights." },
    ],
    faqs: [
      { q: "Where will my chauffeur meet me at FTY?", a: "At the FBO on the field where your aircraft arrives. Tell us your FBO when you book and we coordinate with your flight crew so the car is curbside as you land. We don't claim ramp access — you're met at the FBO." },
      { q: "Where is Fulton County Airport?", a: "FTY — also called Brown Field or Charlie Brown Field — is about 6 nautical miles west of downtown Atlanta, near I-20 and I-285. It's a county-owned general-aviation airport the FAA classes as a reliever for Hartsfield-Jackson." },
      { q: "Can you coordinate with my flight crew at FTY?", a: "Yes. Share your FBO and timing when you book and we coordinate so your chauffeur is in position when your aircraft arrives, or ahead of your departure." },
      { q: "Do you serve FTY 24/7?", a: `Yes. We operate ${SITE.hours} and do our best to accommodate short-notice private flights. ${SITE.responsePromise}` },
      { q: "Which vehicle should I book for an FTY transfer?", a: "The Executive Sedan or SUV suits most private-jet transfers; the Sprinter van carries a larger party with luggage. Choose by group size and bags." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },
};
