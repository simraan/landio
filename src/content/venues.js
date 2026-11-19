/**
 * Atlanta venue transportation — content. The hub (HUB) plus one block per
 * built venue, keyed by the config VENUES slug. A venue is "built" when it has
 * a VENUE_PAGES entry here; the hub lists exactly those. Third-party facts are
 * logged in docs/FACTS.md ("Venues"); business facts come from config.js.
 */

import { SITE, PHONE } from "../config.js";

export const HUB = {
  h1: "Atlanta Venue Car Service",
  title: "Atlanta Venue Car Service",
  titleFull: "Atlanta Venue Car Service | A-Town Limo",
  description: `Chauffeured car service to Atlanta's stadiums, arenas, and theaters: near-gate drop-off, a scheduled return, no surge pricing. Call ${PHONE.local}.`,
  summary: "Chauffeured car service to Atlanta's major venues — stadiums, arenas, and theaters — with drop-off near the entrance, a return pickup you schedule, and no surge pricing.",
  answer: `A-Town Limo drives you to Atlanta's stadiums, arenas, and theaters — dropping you near the entrance and returning at a time you set, with no surge pricing and no scramble for parking, ${SITE.hours}.`,
  chips: [
    { icon: "pin", text: "Stadiums, arenas & theaters" },
    { icon: "car", text: "Door-to-door" },
    { icon: "tag", text: "No surge pricing" },
  ],
  introCols: [
    {
      icon: "car",
      h2: "Closer Than the Rideshare Lot",
      html: `<p>Most Atlanta venues push rideshare pickups to a designated zone a walk from the doors. Your chauffeur drops you as close to the entrance as event-day traffic control allows, then returns to a spot you agree on — so you skip the parking deck and the long walk back in the dark.</p>`,
    },
    {
      icon: "van",
      h2: "One Vehicle for the Whole Group",
      html: `<p>Heading to a game or show with a group? The Sprinter van seats up to 14 and the Executive SUV up to 6, so your party travels together instead of splitting across cars. Tell us the headcount and we match the vehicle to it.</p>`,
    },
  ],
  why: [
    { icon: "clock", title: "A return on your schedule", text: "Set your pickup time and spot; your chauffeur is there when the event lets out." },
    { icon: "tag", title: "No event-night surge", text: "Every trip is quoted up front — the price doesn't spike because it's a game night." },
    { icon: "radar", title: "Airport-to-venue in one booking", text: "Flying in? We handle the ATL transfer and the venue ride on a single reservation." },
    { icon: "van", title: "Groups up to 14", text: "The Sprinter van keeps your whole party together, with room for gear." },
  ],
  faqs: [
    { q: "Which Atlanta venues do you serve?", a: `A-Town Limo drives to venues across metro Atlanta — stadiums, arenas, and theaters. We're adding a page per venue; if you don't see yours, book online or call ${PHONE.display} and we'll arrange the ride.` },
    { q: "Can you drop off and pick up right at the venue?", a: "Yes. Your chauffeur drops you as close to the entrance as event traffic control allows, then returns to a meeting spot and time you set. You're not walking from a rideshare zone or a distant parking deck." },
    { q: "Do you offer group transportation to events?", a: `Yes. The Sprinter van seats up to 14 with luggage and the Executive SUV seats up to 6. Give us your headcount when you book and we match the vehicle. ${SITE.responsePromise}` },
    { q: "Is pricing higher on event nights?", a: "No. A-Town Limo has no surge pricing. Your trip is quoted before you book, based on distance, vehicle, duration, tolls, and stops — not the date or the event." },
    { q: "What is your cancellation policy?", a: SITE.cancellation.full },
  ],
};

export const VENUE_PAGES = {
  "mercedes-benz-stadium": {
    slug: "mercedes-benz-stadium",
    h1: "Mercedes-Benz Stadium Car Service",
    title: "Mercedes-Benz Stadium Car Service (Atlanta)",
    titleFull: "Mercedes-Benz Stadium Car Service | A-Town Limo",
    description: `Chauffeured car service to Mercedes-Benz Stadium in downtown Atlanta — drop-off near the gates, a scheduled return, and ATL transfers. Call ${PHONE.local}.`,
    summary: "Car service to Mercedes-Benz Stadium: drop-off closer than the rideshare zones, a scheduled return pickup, group vehicles, and ATL airport transfers for visiting fans.",
    answer: `A-Town Limo provides chauffeured car service to Mercedes-Benz Stadium in downtown Atlanta — drop-off as close to your gate as event control allows, a return pickup on your schedule, and ATL airport transfers for out-of-town guests, ${SITE.hours}.`,
    chips: [
      { icon: "pin", text: "Downtown Atlanta" },
      { icon: "car", text: "Near-gate drop-off" },
      { icon: "van", text: "Groups up to 14" },
    ],
    introCols: [
      {
        icon: "car",
        h2: "Drop-off Closer Than the Rideshare Zones",
        html: `<p>Mercedes-Benz Stadium's rideshare zones sit a walk from the doors — Zone 1 is across the Home Depot Backyard bridge on Northside Drive, Zone 2 is on Broad Street in South Downtown. Your chauffeur takes you as close to your gate as game-day traffic control allows, so you walk straight in instead of following wayfinding signs.</p>`,
      },
      {
        icon: "clock",
        h2: "A Ride Home Without the Queue",
        html: `<p>When a Falcons game, an Atlanta United match, or a concert ends, tens of thousands leave at once. Instead of waiting in the Broad Street rideshare line, you set a pickup time and spot in advance and your chauffeur is there — no surge pricing, just a quiet ride to your hotel or the airport.</p>`,
      },
    ],
    // Ground-transport options at MBS — sourced to the official site (FACTS.md).
    options: {
      lede: "How the stadium's own options compare. A pre-booked chauffeur is the only one that meets you at a spot you choose.",
      head: ["Option", "Where", "Notes"],
      rows: [
        ["Pre-booked chauffeur", "A drop-off and pickup spot you set, as close to your gate as event control allows", "Arranged in advance; no walk from a zone"],
        ["Rideshare Zone 1", "GWCC Bus Lane C on Northside Dr. — exit Gate 1 and head north across the Home Depot Backyard bridge", "App-based; follow wayfinding signs"],
        ["Rideshare Zone 2", "South Downtown on Broad St. between Trinity and Mitchell St. — best for Gates 2–4", "Quicker access to the airport, I-20, and I-75/85"],
        ["MARTA rail", "SEC District Station (next to the stadium) or Vine City Station; Rapid A-Line stops at South Downtown", "Red, Gold, Blue, and Green lines"],
      ],
      sources: ["mbsParking"],
    },
    why: [
      { icon: "van", title: "Keep your group together", text: "The Sprinter van seats up to 14, so your whole party rides to the event in one vehicle." },
      { icon: "tag", title: "No event-night surge", text: "Your fare is quoted up front and doesn't spike for a Falcons game or a big concert." },
      { icon: "radar", title: "Flying in for the event", text: "We track your flight into Hartsfield-Jackson (ATL) and handle both the airport run and the stadium ride." },
      { icon: "clock", title: "Punctual, flight-tracked, 24/7", text: "Early tailgates and late finishes are all built into your pickup time." },
    ],
    faqs: [
      { q: "Where will my chauffeur drop me at Mercedes-Benz Stadium?", a: "Your chauffeur drops you as close to your gate as game-day traffic control and street closures allow, then returns to a meeting spot and time you set. We confirm the exact drop-off and pickup points before the event, so you skip the rideshare zones entirely." },
      { q: "How is this different from a rideshare to the stadium?", a: "Rideshare drops at a fixed zone — Zone 1 is across the Home Depot Backyard bridge on Northside Drive, Zone 2 is on Broad Street in South Downtown — and you walk from there. A pre-booked chauffeur meets you at a spot you choose, with no surge pricing and no post-event queue." },
      { q: "Do you provide group transportation to Mercedes-Benz Stadium?", a: `Yes. The Sprinter van seats up to 14 with luggage and the Executive SUV seats up to 6, so your group rides together. Tell us your headcount when you book. ${SITE.responsePromise}` },
      { q: "Can you pick us up from the airport before the event?", a: "Yes. We meet guests flying into Hartsfield-Jackson (ATL), track the flight, and can combine the airport transfer and the stadium ride on one booking across metro Atlanta." },
      { q: "What events are held at Mercedes-Benz Stadium?", a: "Mercedes-Benz Stadium is the home of the Atlanta Falcons (NFL) and Atlanta United (MLS), and it hosts the SEC Championship, the Peach Bowl, and major concerts. We drive to all of them." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },

  "state-farm-arena": {
    slug: "state-farm-arena",
    h1: "State Farm Arena Car Service",
    title: "State Farm Arena Car Service (Atlanta)",
    titleFull: "State Farm Arena Car Service | A-Town Limo",
    description: `Car service to State Farm Arena in downtown Atlanta — Hawks games and concerts. Near-door drop-off, a scheduled return, ATL transfers. Call ${PHONE.local}.`,
    summary: "Car service to State Farm Arena: drop-off near the doors for Hawks games and concerts, a scheduled return, group vehicles, and ATL airport transfers.",
    answer: `A-Town Limo provides chauffeured car service to State Farm Arena in downtown Atlanta — home of the Atlanta Hawks — with drop-off near the doors, a return pickup on your schedule, and ATL airport transfers, ${SITE.hours}.`,
    chips: [
      { icon: "pin", text: "Downtown Atlanta" },
      { icon: "car", text: "Near-door drop-off" },
      { icon: "van", text: "Groups up to 14" },
    ],
    facts: [
      { label: "Home team", value: "Atlanta Hawks (NBA)" },
      { label: "Location", value: "1 State Farm Drive, downtown Atlanta, by Centennial Olympic Park" },
      { label: "Nearest MARTA", value: "GWCC/CNN Center and Vine City stations" },
      { label: "Also hosts", value: "Concerts, family shows, and special events" },
      { label: "A-Town service", value: "Round-trip chauffeur, group vehicles, and ATL airport transfers" },
    ],
    factsSources: ["sfa"],
    introCols: [
      { icon: "car", h2: "Drop-off at the Doors", html: `<p>State Farm Arena sits in the thick of downtown Atlanta, where event traffic and one-way streets make driving yourself a chore. Your chauffeur handles the route and drops you near the doors, so you walk in instead of circling for a deck with an open space.</p>` },
      { icon: "clock", h2: "A Ride Home After the Buzzer", html: `<p>When a Hawks game or concert lets out, downtown fills with cars and rideshare requests at once. You set your pickup spot and time ahead, and your chauffeur is waiting — no surge pricing, no standing on a corner refreshing an app.</p>` },
    ],
    why: [
      { icon: "van", title: "Keep your group together", text: "The Sprinter van seats up to 14, so your party rides downtown in one vehicle." },
      { icon: "tag", title: "No event-night surge", text: "Your fare is quoted up front and doesn't spike for a game or a sold-out show." },
      { icon: "radar", title: "Flying in for the game", text: "We track your flight into Hartsfield-Jackson (ATL) and cover the airport run and the arena ride." },
      { icon: "clock", title: "Punctual, 24/7", text: "Tip-off and encore timing are built into your pickup." },
    ],
    faqs: [
      { q: "Where will my chauffeur drop me at State Farm Arena?", a: "Your chauffeur drops you as close to the arena doors as downtown traffic control allows, then returns to a meeting spot and time you set. We confirm the exact points before the event, so you skip the parking decks." },
      { q: "Do you provide group transportation to State Farm Arena?", a: `Yes. The Sprinter van seats up to 14 with luggage and the Executive SUV up to 6, so your group rides together. Tell us your headcount when you book. ${SITE.responsePromise}` },
      { q: "Can you pick us up from the airport before an event?", a: "Yes. We meet guests flying into Hartsfield-Jackson (ATL), track the flight, and can combine the airport transfer and the arena ride on one booking." },
      { q: "What events are held at State Farm Arena?", a: "State Farm Arena is the home of the Atlanta Hawks (NBA) and hosts major concerts, family shows, and special events in downtown Atlanta. We drive to all of them." },
      { q: "Is pricing higher on game nights?", a: "No. A-Town Limo has no surge pricing. Your trip is quoted before you book, based on distance, vehicle, duration, tolls, and stops — not the date." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },

  "georgia-world-congress-center": {
    slug: "georgia-world-congress-center",
    h1: "Georgia World Congress Center Car Service",
    title: "Georgia World Congress Center Car Service",
    titleFull: "Georgia World Congress Center Car Service | A-Town Limo",
    description: `Car service to the Georgia World Congress Center — conventions and expos downtown. Exhibitor and group transfers, ATL runs. Call ${PHONE.local}.`,
    summary: "Car service to the Georgia World Congress Center: convention and expo transfers, exhibitor and attendee groups, hotel runs, and ATL airport pickups downtown.",
    answer: `A-Town Limo provides chauffeured car service to the Georgia World Congress Center in downtown Atlanta — one of the country's largest convention centers — with exhibitor and attendee transfers, hotel runs, and ATL airport pickups, ${SITE.hours}.`,
    chips: [
      { icon: "pin", text: "Downtown Atlanta" },
      { icon: "briefcase", text: "Conventions & expos" },
      { icon: "van", text: "Exhibitor groups" },
    ],
    facts: [
      { label: "Type", value: "One of the largest convention centers in the U.S." },
      { label: "Location", value: "285 Andrew Young Intl Blvd, downtown, by Centennial Olympic Park and Mercedes-Benz Stadium" },
      { label: "Nearest MARTA", value: "GWCC/CNN Center (W-1) and Vine City (W-2) stations" },
      { label: "Hosts", value: "IPPE and other major expos and conventions" },
      { label: "A-Town service", value: "Exhibitor and attendee groups, hotel transfers, and ATL airport pickups" },
    ],
    factsSources: ["gwcc"],
    introCols: [
      { icon: "briefcase", h2: "Convention & Expo Transfers", html: `<p>For a convention at the GWCC, timing matters — exhibitors setting up, clients to collect, sessions to make. Your chauffeur runs the hotel-to-hall transfers on schedule, and the Sprinter van keeps a booth team and their gear together in one vehicle.</p>` },
      { icon: "radar", h2: "Attendees Flying Into ATL", html: `<p>Out-of-town attendees land at Hartsfield-Jackson (ATL) and need a clean ride to the convention hotels downtown. We track flights, meet guests inside the terminal, and can set up the airport run and the GWCC transfers on one booking.</p>` },
    ],
    why: [
      { icon: "van", title: "Exhibitor-sized vehicles", text: "The Sprinter van carries a booth team and materials; the SUV handles smaller groups." },
      { icon: "briefcase", title: "On-schedule corporate travel", text: "Punctual, discreet chauffeurs for sessions, client dinners, and hotel runs." },
      { icon: "radar", title: "Airport-to-convention in one booking", text: "ATL transfers and GWCC rides on a single reservation for your team." },
      { icon: "tag", title: "No surge on busy weeks", text: "Upfront quotes that hold even during a major convention." },
    ],
    faqs: [
      { q: "Do you handle group transportation for conventions at the GWCC?", a: `Yes. The Sprinter van seats up to 14 with room for materials, and the Executive SUV up to 6. We coordinate hotel-to-hall transfers on your schedule. ${SITE.responsePromise}` },
      { q: "Can you pick up attendees from ATL for a GWCC event?", a: "Yes. We meet attendees flying into Hartsfield-Jackson (ATL), track their flights, and can combine the airport transfer and the convention-center rides on one booking." },
      { q: "Where will my chauffeur drop me at the Georgia World Congress Center?", a: "The GWCC is a large campus (Buildings A, B, and C). Tell us your building or hall and we drop you at the nearest entrance event traffic allows, then return to a set spot for pickup." },
      { q: "Do you provide transfers between convention hotels and the GWCC?", a: "Yes. Downtown hotel-to-GWCC transfers are a regular run for us, point to point or on a schedule you set for your group across the convention." },
      { q: "Is pricing higher during a big convention?", a: "No. A-Town Limo has no surge pricing. Every trip is quoted before you book, based on distance, vehicle, duration, tolls, and stops." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },

  "truist-park": {
    slug: "truist-park",
    h1: "Truist Park & The Battery Car Service",
    title: "Truist Park Car Service (Atlanta Braves)",
    titleFull: "Truist Park & The Battery Car Service | A-Town Limo",
    description: `Car service to Truist Park & The Battery — Atlanta Braves games. Door-to-door drop-off, a scheduled return, ATL transfers. Call ${PHONE.local}.`,
    summary: "Car service to Truist Park & The Battery in Cobb County: door-to-door drop-off for Braves games, a scheduled return, group vehicles, and ATL airport transfers.",
    answer: `A-Town Limo provides chauffeured car service to Truist Park and The Battery Atlanta in Cobb County — home of the Atlanta Braves — with door-to-door drop-off, a return pickup on your schedule, and ATL airport transfers, ${SITE.hours}.`,
    chips: [
      { icon: "pin", text: "Cumberland · Cobb County" },
      { icon: "car", text: "No parking prepay" },
      { icon: "van", text: "Groups up to 14" },
    ],
    facts: [
      { label: "Home team", value: "Atlanta Braves (MLB)" },
      { label: "District", value: "The Battery Atlanta — dining, music, and entertainment" },
      { label: "Location", value: "755 Battery Avenue SE, the Cumberland area, Cobb County (northwest of Atlanta)" },
      { label: "Transit", value: "No MARTA rail station at the park; rideshare pickup is on Windy Ridge Parkway by the Orange Deck" },
      { label: "A-Town service", value: "Door-to-door chauffeur, group vehicles, and ATL airport transfers" },
    ],
    factsSources: ["truist", "battery"],
    introCols: [
      { icon: "car", h2: "Skip the Deck Prepay", html: `<p>Truist Park parking means prepaid decks and game-day traffic off I-75, and there's no MARTA rail station at the ballpark. Your chauffeur drives you straight to the drop-off, so you skip the prepay, the deck hunt, and the walk from a distant lot.</p>` },
      { icon: "clock", h2: "A Ride Home After the Ninth", html: `<p>Win or lose, everyone leaves The Battery at once. Rather than wait on the Windy Ridge rideshare line, you set your pickup spot and time ahead and your chauffeur is there — no surge pricing, straight back to your hotel, dinner, or the airport.</p>` },
    ],
    why: [
      { icon: "van", title: "Keep the group together", text: "The Sprinter van seats up to 14, so your whole crew rides to the game in one vehicle." },
      { icon: "tag", title: "No parking, no surge", text: "Skip the prepaid decks; your fare is quoted up front, even on a big game day." },
      { icon: "radar", title: "Flying in for the series", text: "We track your flight into Hartsfield-Jackson (ATL) and cover the airport run and the ballpark ride." },
      { icon: "clock", title: "Punctual, 24/7", text: "First pitch and extra innings are all built into your pickup." },
    ],
    faqs: [
      { q: "Where does my chauffeur drop me at Truist Park?", a: "Your chauffeur drops you as close to the ballpark and The Battery as game-day traffic control allows, then returns to a meeting spot you set. We confirm the exact points before the game, so you skip the prepaid decks entirely." },
      { q: "Is there a MARTA station at Truist Park?", a: "No. There is no MARTA rail station at the ballpark; transit riders use MARTA rail plus a CobbLinc connection via Cumberland. A pre-booked chauffeur drives you door to door instead, with no transfers." },
      { q: "Do you provide group transportation to Braves games?", a: `Yes. The Sprinter van seats up to 14 with luggage and the Executive SUV up to 6, so your group rides together. Tell us your headcount when you book. ${SITE.responsePromise}` },
      { q: "Can you pick us up from the airport for a game?", a: "Yes. We meet fans flying into Hartsfield-Jackson (ATL), track the flight, and can combine the airport transfer and the Truist Park ride on one booking." },
      { q: "Is pricing higher on game days?", a: "No. A-Town Limo has no surge pricing. Your trip is quoted before you book, based on distance, vehicle, duration, tolls, and stops — not the date." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },

  "gas-south-arena": {
    slug: "gas-south-arena",
    h1: "Gas South Arena Car Service",
    title: "Gas South Arena Car Service (Duluth)",
    titleFull: "Gas South Arena Car Service | A-Town Limo",
    description: `Car service to Gas South Arena in Duluth — concerts, hockey, and shows. Door-to-door, a scheduled return, ATL transfers. Call ${PHONE.local}.`,
    summary: "Car service to Gas South Arena in Duluth: door-to-door drop-off for concerts and games at the Gas South District, a scheduled return, and ATL airport transfers.",
    answer: `A-Town Limo provides chauffeured car service to Gas South Arena in Duluth — the hub of the Gas South District — with door-to-door drop-off, a return pickup on your schedule, and ATL airport transfers. We're based in Duluth, ${SITE.hours}.`,
    chips: [
      { icon: "pin", text: "Duluth · Gas South District" },
      { icon: "shield", text: "Based in Duluth" },
      { icon: "van", text: "Groups up to 14" },
    ],
    facts: [
      { label: "Resident teams", value: "Atlanta Gladiators (ECHL), Georgia Swarm (NLL), Atlanta Vibe (volleyball)" },
      { label: "District", value: "Gas South District — arena, theater, and convention center on a 118-acre campus" },
      { label: "Location", value: "6400 Sugarloaf Parkway, Duluth, off I-85" },
      { label: "Also hosts", value: "Major concerts, family shows, and expos" },
      { label: "A-Town service", value: "Local Duluth chauffeur, group vehicles, and ATL airport transfers" },
    ],
    factsSources: ["gassouth"],
    introCols: [
      { icon: "shield", h2: "Your Hometown Car Service", html: `<p>A-Town Limo is based in Duluth, so Gas South Arena is home turf. We know the Sugarloaf Parkway approach off I-85, the District's lots, and the fastest way in and out on a sold-out concert night — and we drop you right at the doors.</p>` },
      { icon: "clock", h2: "A Ride Home After the Show", html: `<p>After a Gladiators game, a Swarm match, or a concert, the District empties fast. You set your pickup spot and time ahead and your chauffeur is waiting — no surge pricing, straight back to your home in Gwinnett, your hotel, or Hartsfield-Jackson (ATL).</p>` },
    ],
    why: [
      { icon: "shield", title: "Local Duluth knowledge", text: "Our home base — we know the Gas South District and the Sugarloaf corridor cold." },
      { icon: "van", title: "Groups up to 14", text: "The Sprinter van keeps your party together for a game or a show." },
      { icon: "tag", title: "No event-night surge", text: "Upfront quotes that hold even for a sold-out concert." },
      { icon: "radar", title: "Flying in? We've got ATL", text: "We track your flight and cover the airport run and the arena ride." },
    ],
    faqs: [
      { q: "Where will my chauffeur drop me at Gas South Arena?", a: "Your chauffeur drops you as close to the arena doors in the Gas South District as event traffic allows, then returns to a spot and time you set. As a Duluth-based service, we know the campus and the Sugarloaf Parkway approach well." },
      { q: "What events are held at Gas South Arena?", a: "Gas South Arena is home to the Atlanta Gladiators (ECHL), Georgia Swarm (NLL), and Atlanta Vibe (volleyball), and it hosts major concerts, family shows, and expos. We drive to all of them." },
      { q: "Do you provide group transportation to Gas South Arena?", a: `Yes. The Sprinter van seats up to 14 with luggage and the Executive SUV up to 6. Tell us your headcount when you book. ${SITE.responsePromise}` },
      { q: "Can you combine an airport pickup with a Gas South Arena ride?", a: "Yes. We meet guests flying into Hartsfield-Jackson (ATL), track the flight, and can set up the airport transfer and the arena ride on one booking." },
      { q: "Is pricing higher on concert nights?", a: "No. A-Town Limo has no surge pricing. Your trip is quoted before you book, based on distance, vehicle, duration, tolls, and stops." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },

  "fox-theatre": {
    slug: "fox-theatre",
    h1: "Fox Theatre Car Service",
    title: "Fox Theatre Car Service (Atlanta)",
    titleFull: "Fox Theatre Car Service | A-Town Limo",
    description: `Car service to the Fox Theatre in Midtown Atlanta — Broadway, concerts, and shows. Curbside drop-off, a scheduled return. Call ${PHONE.local}.`,
    summary: "Car service to the Fox Theatre in Midtown Atlanta: curbside drop-off near the marquee for shows and concerts, a scheduled return, and ATL airport transfers.",
    answer: `A-Town Limo provides chauffeured car service to the Fox Theatre in Midtown Atlanta — the historic Peachtree Street landmark — with curbside drop-off near the marquee, a return pickup on your schedule, and ATL airport transfers, ${SITE.hours}.`,
    chips: [
      { icon: "pin", text: "Midtown · Peachtree St" },
      { icon: "car", text: "Curbside before curtain" },
      { icon: "van", text: "Groups up to 14" },
    ],
    facts: [
      { label: "Type", value: "Historic Midtown Atlanta theatre and landmark" },
      { label: "Location", value: "660 Peachtree Street NE, Midtown Atlanta" },
      { label: "Nearest MARTA", value: "North Avenue station (Red/Gold lines), one block away" },
      { label: "Hosts", value: "Broadway tours, concerts, comedy, and special events" },
      { label: "A-Town service", value: "Curbside drop-off, a scheduled return, and ATL airport transfers" },
    ],
    factsSources: ["fox"],
    introCols: [
      { icon: "car", h2: "Curbside Before Curtain", html: `<p>The Fox sits right on Peachtree Street in Midtown, where show-night traffic and scarce parking eat into your evening. Your chauffeur drops you at the curb near the marquee, so you're in your seat before the lights dim instead of circling for a space.</p>` },
      { icon: "clock", h2: "A Ride Home After the Encore", html: `<p>When the curtain falls, Peachtree fills with cars at once. You set your pickup spot and time ahead, and your chauffeur is waiting at the curb — no surge pricing, a smooth ride to dinner, your hotel, or home across the metro.</p>` },
    ],
    why: [
      { icon: "car", title: "No parking before the show", text: "Curbside drop-off near the marquee beats hunting for a Midtown space." },
      { icon: "van", title: "Make it a group night", text: "The Sprinter van seats up to 14 for a theatre outing or a celebration." },
      { icon: "tag", title: "No show-night surge", text: "Your fare is quoted up front and doesn't spike for a sold-out run." },
      { icon: "radar", title: "Dinner, show, home", text: "Add stops for dinner before and drinks after; your chauffeur waits." },
    ],
    faqs: [
      { q: "Where will my chauffeur drop me at the Fox Theatre?", a: "Your chauffeur drops you at the curb on Peachtree Street near the Fox's marquee, as close as show-night traffic allows, then returns to a spot and time you set for the ride home. No parking, no walk in the dark." },
      { q: "Can we add a dinner stop before the show?", a: `Yes. Tell your chauffeur or add it to your booking — dinner before and drinks after are easy, and your chauffeur waits. Added stops may affect the fare. ${SITE.responsePromise}` },
      { q: "Do you provide group transportation to the Fox Theatre?", a: `Yes. The Sprinter van seats up to 14 and the Executive SUV up to 6, so a theatre group rides together. Tell us your headcount when you book. ${SITE.responsePromise}` },
      { q: "What shows are at the Fox Theatre?", a: "The Fox Theatre hosts Broadway touring productions, concerts, comedy, and special events in Midtown Atlanta. We drive to all of them, day or night." },
      { q: "Is pricing higher on show nights?", a: "No. A-Town Limo has no surge pricing. Your trip is quoted before you book, based on distance, vehicle, duration, tolls, and stops — not the date." },
      { q: "What is your cancellation policy?", a: SITE.cancellation.full },
    ],
  },
};
