/**
 * Private jet / FBO transfer pages — content. The hub (HUB) plus one block per
 * config FBOS slug. A field is "built" when it has an FBO_PAGES entry here.
 *
 * Scope: chauffeured transfers to and from the FBOs on the field, coordinated
 * with the flight crew — NOT ramp access or a named FBO partnership (except
 * Signature, which the client operates transfers to by name). Business facts
 * come from config.js. Keep each text block tight.
 */

import { SITE, PHONE } from "../config.js";

export const HUB = {
  h1: "DC-Area Private Jet Airports & FBOs We Serve",
  title: "Private Jet Airports & FBOs",
  titleFull: "DC-Area Private Jet Airports & FBOs We Serve | Landio Limo Services",
  description: `Chauffeured car service to the DC area's private-jet terminals and FBOs — Signature at IAD, DCA & BWI, plus Manassas, Leesburg, Montgomery County Airpark & Frederick. Crew-coordinated, 24/7. Call ${PHONE.local}.`,
  summary: "Chauffeured transfers to and from the DC area's private-aviation terminals and FBOs — Signature at Dulles, Reagan National and BWI, plus Manassas, Leesburg Executive, Montgomery County Airpark and Frederick — coordinated with your flight crew.",
  answer: `Landio Limo Services provides discreet chauffeured transfers to and from the DC area's private-aviation terminals and FBOs — Signature Aviation at Dulles (IAD), Reagan National (DCA) and BWI, plus Manassas, Leesburg Executive, Montgomery County Airpark and Frederick — coordinated with your flight crew, ${SITE.hours}.`,
  chips: [
    { icon: "plane", text: "Signature IAD · DCA · BWI" },
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
    { icon: "plane", title: "Every DC-area FBO", text: "Signature at IAD, DCA and BWI, plus the region's executive airports." },
    { icon: "clock", title: "24/7 for short-notice flights", text: "Dispatch runs around the clock for last-minute private departures and arrivals." },
  ],
  faqs: [
    { q: "Which DC-area private-jet terminals do you serve?", a: `Landio provides chauffeured transfers to and from Signature Aviation at Dulles (IAD), Reagan National (DCA) and BWI, plus Manassas Regional (HEF), Leesburg Executive (JYO), Montgomery County Airpark (GAI) and Frederick Municipal (FDK). ${SITE.responsePromise}` },
    { q: "Can you coordinate with my flight crew or FBO?", a: "Yes. We coordinate with your flight crew or the FBO so your chauffeur is in position when your aircraft arrives, or ahead of a departure. Share your FBO and timing when you book." },
    { q: "Do you provide service for short-notice private flights?", a: "We operate 24/7 and do our best to accommodate short-notice private-aviation transfers. Call us and we'll confirm availability." },
    { q: "Which vehicle is best for a private-jet transfer?", a: "The Executive Sedan and SUV suit most VIP transfers; the Sprinter van carries a larger party and luggage. Choose by group size and bags." },
    { q: "Is pricing fixed for FBO transfers?", a: "Every trip is quoted before you book, with no surge pricing. The quote depends on distance, vehicle, duration, tolls, and stops." },
    { q: "What is your cancellation policy?", a: SITE.cancellation.full },
  ],
};

/** Build a standard FBO page block. */
const fbo = ({ slug, code, airport, place, where, type, note, nearLine }) => ({
  slug,
  h1: `${code} Private Jet Car Service`,
  title: `${code} Private Jet Car Service`,
  titleFull: `${code} Private Jet Car Service | Landio Limo Services`,
  description: `Chauffeured car service to ${airport} and its FBO — crew-coordinated, discreet transfers across the DC metro. Call ${PHONE.local}.`,
  summary: `Chauffeured transfers to and from ${airport} and its FBO — coordinated with your flight crew.`,
  answer: `Landio Limo Services provides discreet chauffeured car service to and from ${airport} and its FBO — ${where} — coordinated with your flight crew, ${SITE.hours}.`,
  chips: [
    { icon: "plane", text: code },
    { icon: "pin", text: where },
    { icon: "radar", text: "Crew-coordinated" },
  ],
  facts: [
    { label: "Airport", value: airport },
    { label: "Type", value: type },
    { label: "Location", value: where },
    { label: "FBO", value: note },
    { label: "Landio service", value: "Transfers to and from the FBO on the field, coordinated with your crew" },
  ],
  factsSources: [],
  introCols: [
    { icon: "plane", h2: `Met at the ${code} FBO`, html: `<p>Your chauffeur meets you at the FBO on the field at ${airport}, not a public terminal. We coordinate with your flight crew so the car is curbside when your aircraft arrives, then drive you anywhere across the DC metro.</p>` },
    { icon: "radar", h2: "On-Time for Your Departure", html: `<p>Flying out of ${code}? We time your pickup from home, the office, or your hotel to your wheels-up, with no surge pricing and a professional chauffeur who handles the bags and the timing.</p>` },
  ],
  why: [
    { icon: "radar", title: "Coordinated with your crew", text: "We work to your schedule so the car is ready at the FBO when you are." },
    { icon: "shield", title: "Discreet VIP service", text: "Professional chauffeurs, privacy, and an immaculate vehicle." },
    { icon: "pin", title: nearLine.title, text: nearLine.text },
    { icon: "clock", title: "24/7, short notice welcome", text: "Dispatch runs around the clock for last-minute private flights." },
  ],
  faqs: [
    { q: `Where will my chauffeur meet me at ${code}?`, a: `At the FBO on the field where your aircraft arrives. Tell us your FBO when you book and we coordinate with your flight crew so the car is curbside as you land. We don't claim ramp access — you're met at the FBO.` },
    { q: `Where is ${airport}?`, a: `${where}. ${type}` },
    { q: `Can you coordinate with my flight crew at ${code}?`, a: "Yes. Share your FBO and timing when you book and we coordinate so your chauffeur is in position when your aircraft arrives, or ahead of your departure." },
    { q: `Do you serve ${code} 24/7?`, a: `Yes. We operate ${SITE.hours} and do our best to accommodate short-notice private flights. ${SITE.responsePromise}` },
    { q: `Which vehicle should I book for a ${code} transfer?`, a: "The Executive Sedan or SUV suits most private-jet transfers; the Sprinter van carries a larger party with luggage. Choose by group size and bags." },
    { q: "What is your cancellation policy?", a: SITE.cancellation.full },
  ],
});

export const FBO_PAGES = {
  "signature-iad": fbo({
    slug: "signature-iad", code: "Signature IAD",
    airport: "Washington Dulles International Airport (IAD)",
    place: "Signature Aviation — Washington Dulles (IAD)",
    where: "the private-aviation side of Dulles, in Loudoun and Fairfax counties, west of Washington, DC",
    type: "Signature Aviation private terminal at a major international airport.",
    note: "Signature Aviation operates the private-aviation terminal on the field.",
    nearLine: { title: "Close to Dulles-corridor demand", text: "Reston, Ashburn, Tysons, and the Dulles tech corridor are all nearby." },
  }),
  "signature-dca": fbo({
    slug: "signature-dca", code: "Signature DCA",
    airport: "Ronald Reagan Washington National Airport (DCA)",
    place: "Signature Aviation — Reagan National (DCA)",
    where: "the private-aviation side of Reagan National, on the Potomac just south of Washington, DC",
    type: "Signature Aviation private terminal, closest of the three to downtown DC.",
    note: "Signature Aviation operates the private-aviation terminal on the field.",
    nearLine: { title: "Closest to downtown DC", text: "Arlington, the District, and Alexandria are minutes away." },
  }),
  "signature-bwi": fbo({
    slug: "signature-bwi", code: "Signature BWI",
    airport: "Baltimore/Washington International Thurgood Marshall Airport (BWI)",
    place: "Signature Aviation — BWI",
    where: "the private-aviation side of BWI, between Baltimore and Washington in Anne Arundel County, MD",
    type: "Signature Aviation private terminal serving the Baltimore–Washington corridor.",
    note: "Signature Aviation operates the private-aviation terminal on the field.",
    nearLine: { title: "Baltimore–Washington corridor", text: "Baltimore, Annapolis, and the Maryland suburbs are all close by." },
  }),
  manassas: fbo({
    slug: "manassas", code: "HEF",
    airport: "Manassas Regional Airport (HEF)",
    place: "Manassas Regional Airport (HEF)",
    where: "Manassas, in Prince William County, VA, southwest of the District",
    type: "General-aviation reliever airport — one of Virginia's busiest GA airports, with FBOs on the field.",
    note: "FBOs on the field handle private-aviation arrivals and departures.",
    nearLine: { title: "Serving Northern Virginia", text: "Fairfax, Tysons, and the I-66 corridor are nearby." },
  }),
  "leesburg-executive": fbo({
    slug: "leesburg-executive", code: "JYO",
    airport: "Leesburg Executive Airport (JYO)",
    place: "Leesburg Executive Airport (JYO)",
    where: "Leesburg, in Loudoun County, VA, in the region's western suburbs and wine country",
    type: "General-aviation executive airport with an on-field FBO.",
    note: "The on-field FBO handles private-aviation arrivals and departures.",
    nearLine: { title: "Loudoun County & wine country", text: "Leesburg, Ashburn, and Sterling are all close by." },
  }),
  "montgomery-airpark": fbo({
    slug: "montgomery-airpark", code: "GAI",
    airport: "Montgomery County Airpark (GAI)",
    place: "Montgomery County Airpark (GAI)",
    where: "Gaithersburg, in Montgomery County, MD, northwest of Washington, DC",
    type: "County general-aviation airport with an on-field FBO.",
    note: "The on-field FBO handles private-aviation arrivals and departures.",
    nearLine: { title: "Montgomery County", text: "Gaithersburg, Germantown, and Rockville are all nearby." },
  }),
  frederick: fbo({
    slug: "frederick", code: "FDK",
    airport: "Frederick Municipal Airport (FDK)",
    place: "Frederick Municipal Airport (FDK)",
    where: "Frederick, MD, at the northern edge of the DC metro",
    type: "One of Maryland's busiest general-aviation airports, with an on-field FBO.",
    note: "The on-field FBO handles private-aviation arrivals and departures.",
    nearLine: { title: "Northern Maryland", text: "Germantown, Gaithersburg, and upper Montgomery County are close by." },
  }),
};
