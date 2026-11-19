/**
 * ATL terminal pages — content. Every third-party fact is from atl.com or
 * itsmarta.com and logged in docs/FACTS.md ("Terminals"). Business facts come
 * from config.js. Keep each text block ≤ 120 words.
 */

import { SITE, PHONE, CANCELLATION, DOMESTIC_MEETING_POINT, INTERNATIONAL_MEETING_POINT } from "../config.js";

export const TERMINALS = {
  domestic: {
    key: "domestic",
    label: "Domestic",
    name: "ATL Domestic Terminal",
    h1: "ATL Domestic Terminal Car Service",
    title: "ATL Domestic Terminal Car Service & Pickup",
    titleFull: "ATL Domestic Terminal Car Service & Pickup | A-Town Limo",
    description: `Car service at ATL's Domestic Terminal: your chauffeur meets you at the atrium or lower-level curb. Flight tracking, 24/7. Call ${PHONE.local}.`,
    summary: "Where your chauffeur meets you at Hartsfield-Jackson's Domestic Terminal, how drop-off works, and every other way out of the terminal.",
    address: "6000 North Terminal Parkway, Suite 4000, Atlanta, GA 30320",
    meet: DOMESTIC_MEETING_POINT,
    answer: `At Hartsfield-Jackson's Domestic Terminal, your A-Town Limo chauffeur meets you ${DOMESTIC_MEETING_POINT}, tracks your flight, and drives you anywhere in metro Atlanta, ${SITE.hours}.`,
    chips: [
      { icon: "sign", text: "Met near the atrium" },
      { icon: "radar", text: "Flight tracked" },
      { icon: "shield", text: "ATL-permitted" },
    ],
    pickupText: `<p>Arriving on a domestic flight? The Domestic Terminal has a North and a South baggage claim. Share your flight number and we track it. Your chauffeur meets you ${DOMESTIC_MEETING_POINT}, helps with your bags, and walks you to the car.</p>`,
    dropoffText: `<p>Flying out on a domestic flight? Domestic flights check in at the Domestic Terminal. ATL recommends arriving at least two hours before a domestic departure, so we time your pickup from home, the office, or your hotel around that. Your chauffeur drops you at the departures curb.</p>`,
    arriving: {
      point: `Inside near the atrium, or at the lower-level curb. We confirm the exact spot when you book.`,
      steps: [
        ["radar", "We track your flight", "Your pickup moves with your actual landing time."],
        ["luggage", "Collect your bags", "Head to North or South baggage claim, wherever your airline sends your bags."],
        ["sign", "Meet your chauffeur", "Near the atrium inside, or at the lower-level curb."],
        ["car", "Ride to your door", "Straight to your home, hotel, or office."],
      ],
    },
    departing: {
      point: "The Domestic Terminal departures curb.",
      steps: [
        ["pin", "Pickup at your door", "Home, office, or hotel anywhere in metro Atlanta."],
        ["clock", "Timed for check-in", "ATL recommends arriving at least 2 hours before a domestic flight."],
        ["car", "Curbside drop-off", "At the Domestic Terminal departures curb."],
        ["plane", "Check in and fly", "Domestic flights check in at the Domestic Terminal."],
      ],
    },
    timelineLede: "ATL allows only permitted limousine companies to pick up at the airport, and all limousine service must be arranged in advance. A-Town Limo holds the ATL Ground Transportation permit.",
    options: {
      lede: "Every way out of the Domestic Terminal, per ATL. A pre-booked chauffeur is the only one that meets you inside.",
      rows: [
        ["Pre-booked chauffeur", "Inside near the atrium, or the lower-level curb", "Arranged in advance; flight tracked"],
        ["Taxi", "Ground Transportation Center, Aisle A, stalls A3–A10", "Walk-up line"],
        ["Rideshare", "North Economy lot, via North baggage claim and the lower-level escalators at door LN1", "Request the ride once you reach the lot"],
        ["Shared-ride shuttle", "Ground Transportation Center, Aisle B (local providers B3–B8)", "Contact the company to reserve"],
        ["MARTA rail", "Inside the Domestic Terminal, between North and South baggage claim", "Red and Gold lines"],
        ["Terminal shuttle", "Ground Transportation Center / West Curb, doors W-1 or W-2", "Free; about every 15 minutes to the International Terminal"],
      ],
      sources: ["atlGT", "marta"],
    },
    faqs: [
      { q: "Where does my chauffeur meet me at the ATL Domestic Terminal?", a: `Your chauffeur meets you ${DOMESTIC_MEETING_POINT}. Those are the two pre-arranged limousine pickup points ATL lists for the Domestic Terminal. We confirm the exact spot and send your chauffeur's details before pickup.` },
      { q: "How early should I get to the Domestic Terminal for my flight?", a: "ATL recommends arriving at least two hours before a domestic departure. Tell us your flight time and we schedule your pickup around it, with extra time at busy hours; ATL says checkpoints are usually busiest from 5 to 9 a.m." },
      { q: "Do you pick up from the rideshare lot?", a: `No. Rideshare pickups use the North Economy lot. As a permitted, pre-booked car service, your chauffeur meets you ${DOMESTIC_MEETING_POINT} instead, so you don't walk to a lot.` },
      { q: "What if my domestic flight is delayed?", a: "Your pickup moves with your flight. We track your arrival and adjust to your actual landing time, and there is no charge for flight delays. A complimentary grace period gives you time to collect your bags." },
      { q: "How do I get from the Domestic to the International Terminal?", a: "ATL runs a free terminal-to-terminal shuttle about every 15 minutes, from the Ground Transportation Center / West Curb at doors W-1 or W-2. If your next leg is a car, book your pickup at the terminal where you land." },
      { q: "What is your cancellation policy?", a: CANCELLATION.full },
    ],
  },

  international: {
    key: "international",
    label: "International",
    name: "ATL International Terminal",
    h1: "ATL International Terminal Car Service",
    title: "ATL International Terminal Car Service",
    titleFull: "ATL International Terminal Car Service | A-Town Limo",
    description: `Car service at ATL's International Terminal: met inside at Arrivals or on the outer curb after customs. Flight tracking, 24/7. Call ${PHONE.local}.`,
    summary: "How arrivals work at Hartsfield-Jackson's International Terminal, where your chauffeur meets you after customs, and how drop-off works.",
    address: "2600 Maynard H. Jackson Jr. Blvd., Atlanta, GA 30354",
    meet: INTERNATIONAL_MEETING_POINT,
    answer: `At Hartsfield-Jackson's International Terminal, your A-Town Limo chauffeur meets you ${INTERNATIONAL_MEETING_POINT} once you clear customs, then drives you anywhere in metro Atlanta, ${SITE.hours}.`,
    chips: [
      { icon: "sign", text: "Met at Arrivals" },
      { icon: "radar", text: "Flight tracked" },
      { icon: "shield", text: "ATL-permitted" },
    ],
    pickupText: `<p>International flights arrive at Concourses E and F. You clear passport control, collect your bags at one of seven carousels, then turn right into the Arrivals hall. Your chauffeur meets you ${INTERNATIONAL_MEETING_POINT}, and we track your flight the whole way.</p>`,
    dropoffText: `<p>Passengers flying outside the United States check in at the International Terminal, and ATL asks drivers to drop departing international passengers on the departures level. ATL recommends arriving at least three hours before an international flight, so we time your pickup around that.</p>`,
    arriving: {
      point: "Inside the terminal at the Arrivals level, or outside on the Arrival outer curb. We confirm the exact spot when you book.",
      steps: [
        ["shield", "Clear passport control", "The CBP hall has 40 passport-control counters."],
        ["luggage", "Collect your bags", "Seven carousels serve Atlanta-bound passengers."],
        ["arrow", "Turn right into Arrivals", "Atlanta-bound passengers exit through the Arrivals hall."],
        ["sign", "Meet your chauffeur", "Inside at Arrivals or on the outer curb."],
      ],
    },
    departing: {
      point: "The International Terminal departures level.",
      steps: [
        ["pin", "Pickup at your door", "Home, office, or hotel anywhere in metro Atlanta."],
        ["clock", "Timed for check-in", "ATL recommends arriving at least 3 hours before an international flight."],
        ["car", "Departures-level drop-off", "ATL asks drivers to drop international passengers there."],
        ["plane", "Check in and fly", "International flights check in at the International Terminal."],
      ],
    },
    timelineLede: "ATL allows only permitted limousine companies to pick up at the airport, and all limousine service must be arranged in advance. A-Town Limo holds the ATL Ground Transportation permit.",
    options: {
      lede: "Every way out of the International Terminal, per ATL. A pre-booked chauffeur is the only one that meets you inside.",
      rows: [
        ["Pre-booked chauffeur", "Inside at the Arrivals level, or the Arrival outer curb", "Arranged in advance; flight tracked"],
        ["Taxi", "Arrival level, outside the A-1 door", "Walk-up line"],
        ["Rideshare", "Arrival level curb near doors A1–A3", "Requires the provider's app"],
        ["Shared-ride shuttle", "Arrival level, to the right of the A3 door", "Limited service; contact the company in advance"],
        ["Terminal shuttle", "Arrivals level, between doors A1 and A2", "Free; about every 15 minutes to the Domestic Terminal and Rental Car Center"],
        ["MARTA rail", "Take the terminal shuttle to the Domestic Terminal, where the station is", "Red and Gold lines"],
      ],
      sources: ["atlGT", "atlMaps"],
    },
    faqs: [
      { q: "Where does my chauffeur meet me at the ATL International Terminal?", a: `Your chauffeur meets you ${INTERNATIONAL_MEETING_POINT}, the two pre-arranged limousine pickup points ATL lists for the International Terminal. We confirm the spot and send your chauffeur's details before pickup.` },
      { q: "Do I meet my chauffeur before or after customs?", a: "After. Arriving international passengers clear passport control, collect their bags, and Atlanta-bound passengers then turn right into the Arrivals hall. Your chauffeur meets you there or on the Arrival outer curb." },
      { q: "What if customs takes a long time?", a: "We track your flight and adjust the pickup to your actual landing time, with no charge for flight delays and a complimentary grace period. If the passport line is long, message your chauffeur; their details arrive before pickup." },
      { q: "How early should I get to the International Terminal?", a: "ATL recommends arriving at least three hours before an international departure. The International Terminal departures checkpoint opens at 4:30 a.m., so tell us your flight time and we set the pickup to match." },
      { q: "Can you pick me up at the Domestic Terminal instead?", a: "Yes, if that's where you are. ATL's free terminal shuttle runs about every 15 minutes between the International and Domestic terminals, from the Arrivals level between doors A1 and A2. Just tell us which terminal to meet you at." },
      { q: "What is your cancellation policy?", a: CANCELLATION.full },
    ],
  },
};
