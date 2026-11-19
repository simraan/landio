/**
 * Atlanta event transportation — content. The hub (HUB) plus one block per
 * built event, keyed by the config EVENTS slug. An event is "built" when it has
 * an entry in EVENT_PAGES here; the hub lists exactly those, so the ItemList and
 * the pages never drift. Third-party facts are logged in docs/FACTS.md ("Events").
 *
 * Maintenance: the SEC block names the 2026 game date — refresh it each year
 * from NCAA.com (docs/OPEN-QUESTIONS.md). The URL stays evergreen.
 */

import { SITE, PHONE } from "../config.js";

export const HUB = {
  h1: "Atlanta Event Transportation",
  title: "Atlanta Event Transportation",
  titleFull: "Atlanta Event Transportation | A-Town Limo",
  description: `Chauffeured transportation for Atlanta's biggest events — game days, bowls, conventions. Door-to-door drop-off and scheduled returns. Call ${PHONE.local}.`,
  summary: "Chauffeured car service for Atlanta's major events — championship games, bowls, and conventions — with door-to-door drop-off, a scheduled return, and airport transfers for visiting guests.",
  answer: `A-Town Limo runs chauffeured transportation for Atlanta's biggest events — championship games, bowls, and conventions — dropping you near the gates and picking you up on a schedule you set, ${SITE.hours}.`,
  chips: [
    { icon: "calendar", text: "Game days & conventions" },
    { icon: "car", text: "Door-to-door" },
    { icon: "van", text: "Groups up to 14" },
  ],
  introCols: [
    {
      icon: "car",
      h2: "Skip Event-Day Parking",
      html: `<p>On a big event day, driving yourself means traffic, a scramble for parking, and a long walk back to the lot afterward. Your chauffeur drops you close to the entrance and is back at a set spot when you're ready, so the stadium or convention hall is the only thing you have to think about.</p>`,
    },
    {
      icon: "radar",
      h2: "Flying in for the Event?",
      html: `<p>Visiting from out of town? We meet you at Hartsfield-Jackson (ATL), track your flight, and handle both the airport run and the ride to your event on the same booking — one chauffeured plan from the moment you land to the final whistle.</p>`,
    },
  ],
  why: [
    { icon: "van", title: "Group-sized vehicles", text: "The Sprinter van keeps a group of up to 14 together, with room for gear." },
    { icon: "tag", title: "No game-day surge", text: "Every trip is quoted up front, with no surge pricing — even on the busiest event nights." },
    { icon: "clock", title: "A return on your schedule", text: "Set your pickup time and spot; your chauffeur is there when the event lets out." },
    { icon: "radar", title: "Airport-to-event in one booking", text: "Out-of-town guests get the ATL transfer and the event ride on a single reservation." },
  ],
  faqs: [
    { q: "Do you provide group transportation for Atlanta events?", a: `Yes. For groups, the Sprinter van seats up to 14 with luggage, and the Executive SUV seats up to 6. Tell us your headcount when you book and we match the vehicle. ${SITE.responsePromise}` },
    { q: "Can you drop off and pick up at the venue?", a: "Yes. Your chauffeur drops you as close to the entrance as event traffic control allows, then returns to a spot and time you set for the ride home. You're not hunting for parking or a rideshare after the event." },
    { q: "Do you handle airport transfers for event guests?", a: "Yes. We meet guests flying into Hartsfield-Jackson (ATL), track the flight, and can combine the airport pickup and the event ride on one booking across metro Atlanta." },
    { q: "How far ahead should I book event transportation?", a: `Book as early as you can for major event dates — demand is highest on game days and convention weeks. Reserve online or call ${PHONE.display}; ${SITE.responsePromise.toLowerCase()}` },
    { q: "Is pricing higher on event days?", a: "No. A-Town Limo has no surge pricing. Every trip is quoted before you book, and the quote depends on distance, vehicle, duration, tolls, and stops — not the date." },
    { q: "What is your cancellation policy?", a: SITE.cancellation.full },
  ],
};

export const EVENT_PAGES = {
  "sec-championship": {
    slug: "sec-championship",
    venue: "mercedes-benz-stadium",
    venueName: "Mercedes-Benz Stadium",
    event: { name: "2026 SEC Championship Game", startDate: "2026-12-05T16:00:00-05:00" },
    h1: "SEC Championship Transportation in Atlanta",
    title: "SEC Championship Transportation (Atlanta)",
    titleFull: "SEC Championship Transportation in Atlanta | A-Town Limo",
    description: `SEC Championship car service at Mercedes-Benz Stadium: game-day drop-off, a scheduled return, and ATL transfers for fans. Call ${PHONE.local}.`,
    summary: "Game-day car service for the SEC Championship at Mercedes-Benz Stadium: drop-off near the gates, a scheduled return pickup, and ATL airport transfers for out-of-town fans.",
    answer: `A-Town Limo provides chauffeured transportation for the SEC Championship Game at Mercedes-Benz Stadium in downtown Atlanta — drop-off near the gates, a return pickup on your schedule, and ATL airport transfers for out-of-town fans, ${SITE.hours}.`,
    chips: [
      { icon: "calendar", text: "Sat, Dec 5, 2026" },
      { icon: "pin", text: "Mercedes-Benz Stadium" },
      { icon: "car", text: "Door-to-door" },
    ],
    // Key facts (sourced to NCAA.com — docs/FACTS.md). Refresh the date yearly.
    facts: [
      { label: "Event", value: "SEC Championship Game (2026)" },
      { label: "Date", value: "Saturday, December 5, 2026" },
      { label: "Kickoff", value: "4:00 p.m. ET (ABC)" },
      { label: "Venue", value: "Mercedes-Benz Stadium, downtown Atlanta" },
      { label: "Matchup", value: "The SEC's top two teams by conference winning percentage" },
      { label: "Service", value: "Chauffeured round-trip, group vehicles, and ATL airport transfers" },
    ],
    introCols: [
      {
        icon: "car",
        h2: "Game-Day Drop-off at the Stadium",
        html: `<p>Mercedes-Benz Stadium sits in downtown Atlanta, where SEC Championship traffic and road closures make parking a headache. Your chauffeur takes the route around the congestion and drops you as close to the gates as event control allows, so you walk in instead of circling for a space.</p>`,
      },
      {
        icon: "clock",
        h2: "A Scheduled Ride Home",
        html: `<p>When the game ends, tens of thousands of fans leave at once. Instead of waiting in a rideshare queue, you set a pickup time and meeting spot in advance, and your chauffeur is there — no surge pricing, no scramble, just a quiet ride back to your hotel or the airport.</p>`,
      },
    ],
    why: [
      { icon: "van", title: "Keep your group together", text: "The Sprinter van seats up to 14, so your whole party rides to the game in one vehicle." },
      { icon: "tag", title: "No game-day surge pricing", text: "Your fare is quoted up front and doesn't spike because it's championship weekend." },
      { icon: "radar", title: "Flying in for the game", text: "We track your flight into Hartsfield-Jackson (ATL) and handle both the airport run and the stadium ride." },
      { icon: "clock", title: "Punctual, flight-tracked, 24/7", text: "Early arrivals, late finishes, and tailgate timing all built into your pickup." },
    ],
    faqs: [
      { q: "When and where is the 2026 SEC Championship Game?", a: "The 2026 SEC Championship Game is Saturday, December 5, 2026, with a 4:00 p.m. ET kickoff on ABC, at Mercedes-Benz Stadium in downtown Atlanta. The two teams are the SEC's top two by conference winning percentage." },
      { q: "Can you drop us off right at Mercedes-Benz Stadium?", a: "Your chauffeur drops you as close to the stadium gates as game-day traffic control and street closures allow, then returns to a set meeting spot for the ride home. We confirm the exact drop-off and pickup points before the game." },
      { q: "Do you offer group transportation for the SEC Championship?", a: `Yes. The Sprinter van seats up to 14 with luggage and the Executive SUV seats up to 6, so your group rides together. Tell us your headcount when you book. ${SITE.responsePromise}` },
      { q: "Can you pick us up from the airport for the game?", a: "Yes. We meet fans flying into Hartsfield-Jackson (ATL), track the flight, and can combine the airport transfer and the stadium ride on one booking — ideal for out-of-town fans." },
      { q: "Is pricing higher for championship weekend?", a: "No. A-Town Limo has no surge pricing. Your trip is quoted before you book, based on distance, vehicle, duration, tolls, and stops — not the date or the event." },
      { q: "How early should we book for the SEC Championship?", a: `Book as early as possible — championship weekend is one of Atlanta's busiest. Reserve online or call ${PHONE.display}; ${SITE.responsePromise.toLowerCase()}` },
    ],
  },

  "peach-bowl": {
    slug: "peach-bowl",
    venue: "mercedes-benz-stadium",
    venueName: "Mercedes-Benz Stadium",
    event: { name: "Chick-fil-A Peach Bowl", startDate: "2027-01-01" },
    h1: "Peach Bowl Transportation in Atlanta",
    title: "Peach Bowl Transportation (Atlanta)",
    titleFull: "Peach Bowl Transportation in Atlanta | A-Town Limo",
    description: `Car service for the Chick-fil-A Peach Bowl at Mercedes-Benz Stadium — game-day drop-off, a scheduled return, and ATL transfers. Call ${PHONE.local}.`,
    summary: "Bowl-game car service for the Chick-fil-A Peach Bowl at Mercedes-Benz Stadium: drop-off near the gates, a scheduled return, and ATL airport transfers for visiting fans.",
    answer: `A-Town Limo provides chauffeured transportation for the Chick-fil-A Peach Bowl at Mercedes-Benz Stadium in downtown Atlanta — drop-off near the gates, a return pickup on your schedule, and ATL airport transfers for out-of-town fans, ${SITE.hours}.`,
    chips: [
      { icon: "calendar", text: "New Year's · Jan 1, 2027" },
      { icon: "pin", text: "Mercedes-Benz Stadium" },
      { icon: "car", text: "Door-to-door" },
    ],
    facts: [
      { label: "Event", value: "Chick-fil-A Peach Bowl" },
      { label: "Next game", value: "Friday, January 1, 2027 (College Football Playoff quarterfinal)" },
      { label: "Venue", value: "Mercedes-Benz Stadium, downtown Atlanta" },
      { label: "Held", value: "Annually around New Year's at Mercedes-Benz Stadium" },
      { label: "Service", value: "Chauffeured round-trip, group vehicles, and ATL airport transfers" },
    ],
    introCols: [
      { icon: "car", h2: "Bowl-Day Drop-off at the Stadium", html: `<p>The Peach Bowl fills downtown Atlanta on New Year's with out-of-town fans and holiday traffic. Your chauffeur takes the route around the congestion and drops you as close to the gates as event control allows, so you walk in warm instead of parking blocks away.</p>` },
      { icon: "clock", h2: "A Ride Home After the Final Whistle", html: `<p>When the bowl ends, the whole stadium empties into downtown at once. Instead of a holiday-night rideshare surge, you set a pickup spot and time in advance and your chauffeur is there — no surge pricing, straight to your hotel or Hartsfield-Jackson (ATL).</p>` },
    ],
    why: [
      { icon: "van", title: "Keep your group together", text: "The Sprinter van seats up to 14, so your tailgate crew rides to the bowl in one vehicle." },
      { icon: "tag", title: "No holiday surge pricing", text: "Your fare is quoted up front and doesn't spike for a New Year's bowl game." },
      { icon: "radar", title: "Flying in for the bowl", text: "We track your flight into Hartsfield-Jackson (ATL) and cover the airport run and the stadium ride." },
      { icon: "clock", title: "Punctual, flight-tracked, 24/7", text: "Tailgate timing and a late finish are built into your pickup." },
    ],
    faqs: [
      { q: "When and where is the next Peach Bowl?", a: "The Chick-fil-A Peach Bowl is played at Mercedes-Benz Stadium in downtown Atlanta. The next game is Friday, January 1, 2027, a College Football Playoff quarterfinal. Game time and TV are announced closer to the date." },
      { q: "Can you drop us off right at Mercedes-Benz Stadium for the Peach Bowl?", a: "Your chauffeur drops you as close to the stadium gates as game-day traffic control and street closures allow, then returns to a set meeting spot for the ride home. We confirm the exact points before the game." },
      { q: "Do you offer group transportation for the Peach Bowl?", a: `Yes. The Sprinter van seats up to 14 with luggage and the Executive SUV seats up to 6, so your group rides together. Tell us your headcount when you book. ${SITE.responsePromise}` },
      { q: "Can you pick us up from the airport for the Peach Bowl?", a: "Yes. We meet fans flying into Hartsfield-Jackson (ATL), track the flight, and can combine the airport transfer and the stadium ride on one booking — ideal for out-of-town fans." },
      { q: "Is pricing higher on New Year's for the bowl?", a: "No. A-Town Limo has no surge pricing. Your trip is quoted before you book, based on distance, vehicle, duration, tolls, and stops — not the date or the event." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },

  "ippe": {
    slug: "ippe",
    venue: "georgia-world-congress-center",
    venueName: "Georgia World Congress Center",
    event: { name: "International Production & Processing Expo (IPPE) 2027", startDate: "2027-01-26", endDate: "2027-01-28" },
    h1: "IPPE Transportation in Atlanta",
    title: "IPPE Transportation (Atlanta)",
    titleFull: "IPPE Transportation in Atlanta | A-Town Limo",
    description: `Car service for IPPE at the Georgia World Congress Center — exhibitor and attendee transfers, hotel runs, and ATL airport pickups. Call ${PHONE.local}.`,
    summary: "Convention car service for IPPE at the Georgia World Congress Center: exhibitor and attendee transfers, hotel-to-hall runs, group vehicles, and ATL airport pickups.",
    answer: `A-Town Limo provides chauffeured transportation for IPPE — the International Production & Processing Expo — at the Georgia World Congress Center in downtown Atlanta, with exhibitor and attendee transfers, hotel runs, and ATL airport pickups, ${SITE.hours}.`,
    chips: [
      { icon: "calendar", text: "Jan 26–28, 2027" },
      { icon: "briefcase", text: "GWCC · Downtown" },
      { icon: "van", text: "Exhibitor groups" },
    ],
    facts: [
      { label: "Event", value: "International Production & Processing Expo (IPPE) 2027" },
      { label: "Dates", value: "January 26–28, 2027" },
      { label: "Venue", value: "Georgia World Congress Center, downtown Atlanta" },
      { label: "About", value: "One of the world's largest annual trade shows for the poultry, meat, and animal-food industries" },
      { label: "Service", value: "Exhibitor and attendee groups, hotel transfers, and ATL airport pickups" },
    ],
    introCols: [
      { icon: "briefcase", h2: "Exhibitor & Attendee Transfers", html: `<p>IPPE fills the Georgia World Congress Center and downtown's hotels for three days each January. Your chauffeur runs the hotel-to-hall transfers on schedule, and the Sprinter van keeps a booth team and their materials together — one vehicle, on time, every morning of the show.</p>` },
      { icon: "radar", h2: "Flying In for the Expo", html: `<p>Thousands of IPPE attendees land at Hartsfield-Jackson (ATL). We track flights, meet guests inside the terminal, and can set up the airport run and the GWCC transfers on one booking — so your team arrives at the expo without a rideshare scramble.</p>` },
    ],
    why: [
      { icon: "van", title: "Exhibitor-sized vehicles", text: "The Sprinter van carries a booth team and materials; the SUV handles smaller groups." },
      { icon: "briefcase", title: "On-schedule show logistics", text: "Punctual hotel-to-hall transfers across all three days of the expo." },
      { icon: "radar", title: "Airport-to-expo in one booking", text: "ATL transfers and GWCC rides on a single reservation for your team." },
      { icon: "tag", title: "No surge on convention week", text: "Upfront quotes that hold even during one of Atlanta's biggest shows." },
    ],
    faqs: [
      { q: "When and where is IPPE 2027?", a: "IPPE — the International Production & Processing Expo — runs January 26–28, 2027, at the Georgia World Congress Center in downtown Atlanta. It's one of the world's largest annual trade shows for the poultry, meat, and animal-food industries." },
      { q: "Do you handle exhibitor transportation for IPPE?", a: `Yes. The Sprinter van seats up to 14 with room for materials, and the Executive SUV up to 6. We run hotel-to-hall transfers on your schedule across all three days. ${SITE.responsePromise}` },
      { q: "Can you pick up IPPE attendees from ATL?", a: "Yes. We meet attendees flying into Hartsfield-Jackson (ATL), track their flights, and can combine the airport transfer and the GWCC rides on one booking." },
      { q: "Do you provide hotel-to-GWCC transfers during IPPE?", a: "Yes. Downtown hotel-to-GWCC transfers are a regular run for us — point to point or on a set schedule for your group across the expo." },
      { q: "Is pricing higher during IPPE week?", a: "No. A-Town Limo has no surge pricing. Every trip is quoted before you book, based on distance, vehicle, duration, tolls, and stops." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },

  "falcons-game-day": {
    slug: "falcons-game-day",
    venue: "mercedes-benz-stadium",
    venueName: "Mercedes-Benz Stadium",
    // Evergreen (no single date) — no Event JSON-LD node.
    h1: "Falcons Game Day Transportation",
    title: "Falcons Game Day Car Service (Atlanta)",
    titleFull: "Falcons Game Day Transportation | A-Town Limo",
    description: `Car service for Atlanta Falcons game days at Mercedes-Benz Stadium — drop-off near the gates, a scheduled return, and ATL transfers. Call ${PHONE.local}.`,
    summary: "Game-day car service for Atlanta Falcons home games at Mercedes-Benz Stadium: drop-off near the gates, a scheduled return, group vehicles, and ATL airport transfers.",
    answer: `A-Town Limo provides chauffeured transportation for Atlanta Falcons home games at Mercedes-Benz Stadium in downtown Atlanta — drop-off near the gates, a return pickup on your schedule, and ATL airport transfers for visiting fans, ${SITE.hours}.`,
    chips: [
      { icon: "pin", text: "Mercedes-Benz Stadium" },
      { icon: "car", text: "Near-gate drop-off" },
      { icon: "van", text: "Tailgate groups up to 14" },
    ],
    facts: [
      { label: "Team", value: "Atlanta Falcons (NFL)" },
      { label: "Venue", value: "Mercedes-Benz Stadium, downtown Atlanta" },
      { label: "Season", value: "Home games roughly September through January" },
      { label: "Also", value: "Same service for Atlanta United (MLS) matches at the stadium" },
      { label: "Service", value: "Chauffeured round-trip, tailgate groups, and ATL airport transfers" },
    ],
    introCols: [
      { icon: "car", h2: "Game-Day Drop-off at the Stadium", html: `<p>On a Falcons Sunday, downtown Atlanta's decks fill and the streets around the stadium close. Your chauffeur takes the route around the congestion and drops you near the gates, so your group walks straight to the tailgate instead of circling for parking.</p>` },
      { icon: "clock", h2: "A Ride Home After the Game", html: `<p>Win or lose, 70,000 fans leave at once. Rather than wait out the post-game rideshare surge, you set a pickup spot and time in advance and your chauffeur is there — no surge pricing, a smooth ride home across the metro.</p>` },
    ],
    why: [
      { icon: "van", title: "Tailgate-sized vehicles", text: "The Sprinter van seats up to 14, so the whole crew rides to the game together." },
      { icon: "tag", title: "No game-day surge", text: "Your fare is quoted up front and doesn't spike for a Falcons Sunday or a big match." },
      { icon: "radar", title: "Flying in for the game", text: "We track your flight into Hartsfield-Jackson (ATL) and cover the airport run and the stadium ride." },
      { icon: "clock", title: "Punctual, 24/7", text: "Early tailgates and overtime finishes are all built into your pickup." },
    ],
    faqs: [
      { q: "Do you provide transportation for Atlanta Falcons games?", a: `Yes. A-Town Limo runs chauffeured car service to Atlanta Falcons home games at Mercedes-Benz Stadium — drop-off near the gates and a scheduled return. ${SITE.responsePromise}` },
      { q: "Where will my chauffeur drop me for a Falcons game?", a: "Your chauffeur drops you as close to the stadium gates as game-day traffic control and street closures allow, then returns to a set meeting spot for the ride home. We confirm the exact points before kickoff." },
      { q: "Do you offer group transportation for a Falcons game?", a: `Yes. The Sprinter van seats up to 14 with luggage and the Executive SUV up to 6, so your tailgate group rides together. Tell us your headcount when you book. ${SITE.responsePromise}` },
      { q: "Can you pick us up from the airport for a game?", a: "Yes. We meet fans flying into Hartsfield-Jackson (ATL), track the flight, and can combine the airport transfer and the stadium ride on one booking." },
      { q: "Do you also drive to Atlanta United matches?", a: "Yes. Atlanta United (MLS) plays at Mercedes-Benz Stadium too, and we provide the same drop-off, scheduled return, and group service for matches." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },
};
