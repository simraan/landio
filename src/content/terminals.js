/**
 * DC-area airport pages — content. One block per airport the client serves
 * (IAD, DCA, BWI). The renderer (pages/terminals.js) builds one page per entry
 * at /dc-airport-car-service/<code>/. Business facts come from config.js; airport
 * descriptions are kept general (meeting at baggage claim / arrivals curb).
 * Keep each text block tight.
 */

import { SITE, PHONE } from "../config.js";

const base = ({ code, name, h1short, where, arriveNote }) => ({
  key: code.toLowerCase(),
  code,
  name,
  h1: `${code} Airport Car Service (${h1short})`,
  title: `${code} Airport Car Service (${h1short})`,
  titleFull: `${code} Airport Car Service | Landio Limo Services`,
  description: `Car service to and from ${name} (${code}) — flight-tracked, meet & greet, 24/7, no surge pricing across the DC metro. Call ${PHONE.local}.`,
  summary: `Where your chauffeur meets you at ${name} (${code}), how drop-off works, and how to book a flight-tracked transfer across the DC metro.`,
  answer: `At ${name} (${code}), your Landio chauffeur meets you at baggage claim or the arrivals curb, tracks your flight, and drives you anywhere across Washington, DC, Maryland, and Northern Virginia, ${SITE.hours}.`,
  chips: [
    { icon: "sign", text: "Met at arrivals" },
    { icon: "radar", text: "Flight tracked" },
    { icon: "shield", text: "Meet & greet available" },
  ],
  where,
  pickupText: `<p>Arriving at ${code}? Share your flight number and we track it in real time. Your chauffeur meets you at baggage claim with a name sign, or at the arrivals curb, helps with your bags, and walks you to the car. ${arriveNote}</p>`,
  dropoffText: `<p>Flying out of ${code}? Your chauffeur picks you up at home, the office, or your hotel anywhere in the DC metro and drops you at the departures level, timed so you have plenty of margin before your flight.</p>`,
  arriving: {
    point: "At baggage claim with a name sign, or at the arrivals curb. We confirm the exact spot when you book.",
    steps: [
      ["radar", "We track your flight", "Your pickup moves with your actual landing time."],
      ["luggage", "Collect your bags", "Head to baggage claim for your airline."],
      ["sign", "Meet your chauffeur", "At baggage claim with a name sign, or at the arrivals curb."],
      ["car", "Ride to your door", "Straight to your home, hotel, or office across the DC metro."],
    ],
  },
  departing: {
    point: "The departures level, timed to your flight.",
    steps: [
      ["pin", "Pickup at your door", "Home, office, or hotel anywhere in the DC metro."],
      ["clock", "Timed for check-in", "We build in margin so you are never rushed."],
      ["car", "Curbside drop-off", "At the departures level for your airline."],
      ["plane", "Check in and fly", "Your chauffeur handles the bags to the curb."],
    ],
  },
  faqs: [
    { q: `Where will my chauffeur meet me at ${code}?`, a: `At baggage claim with a personalized name sign, or at the arrivals curb — whichever you prefer. We track your flight and confirm the exact meeting point when you book. Meet & greet inside the terminal is available on request.` },
    { q: `Do you track flights into ${code}?`, a: `Yes. We monitor your inbound flight in real time and move your pickup to your actual landing time, with no charge for flight delays.` },
    { q: `How much is a car service from ${code}?`, a: `Rates depend on your vehicle and destination. Use the booking form on this page for an instant quote, or call ${PHONE.display}.` },
    { q: `Can I book an SUV or Sprinter van at ${code}?`, a: `Yes. Choose from the Executive Sedan, Luxury SUV, Sprinter Van, Mini Bus, or Charter Bus — sized to your party and luggage.` },
    { q: `Do you serve ${code} 24/7?`, a: `Yes. Landio runs ${code} transfers ${SITE.hours}, for early departures and late-night arrivals alike.` },
    { q: "What is your cancellation policy?", a: SITE.cancellation.full },
  ],
});

export const TERMINALS = {
  iad: base({
    code: "IAD",
    name: "Washington Dulles International Airport",
    h1short: "Dulles",
    where: "in Dulles, Virginia, west of Washington, DC, with international and domestic service across its main terminal and midfield concourses",
    arriveNote: "International arrivals clear customs in the main terminal before meeting your chauffeur.",
  }),
  dca: base({
    code: "DCA",
    name: "Ronald Reagan Washington National Airport",
    h1short: "Reagan National",
    where: "on the Potomac just south of Washington, DC — the closest airport to the District",
    arriveNote: "DCA sits minutes from downtown DC, Arlington, and Alexandria.",
  }),
  bwi: base({
    code: "BWI",
    name: "Baltimore/Washington International Thurgood Marshall Airport",
    h1short: "BWI",
    where: "between Baltimore and Washington in Anne Arundel County, Maryland",
    arriveNote: "BWI serves the Baltimore–Washington corridor and the Maryland suburbs.",
  }),
};
