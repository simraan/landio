/**
 * ATL airport guides — content. The hub (HUB) plus one block per built guide,
 * keyed by the config GUIDES slug. A guide is "built" when it has a GUIDE_PAGES
 * entry here. Guides are informational (FAQPage), not services — each links to
 * its terminal page in the answer (first 150 words). Third-party facts are
 * logged in docs/FACTS.md ("ATL airport guides"); nothing contested is stated.
 */

import { PHONE } from "../config.js";

export const HUB = {
  h1: "ATL Airport Guide",
  title: "ATL Airport Guide",
  titleFull: "ATL Airport Guide | A-Town Limo",
  description: `A traveler's guide to Hartsfield-Jackson (ATL): terminals, concourses, the Plane Train, and the world's busiest airport. Call ${PHONE.local}.`,
  summary: "A plain-language guide to Hartsfield-Jackson (ATL) — its two terminals, seven concourses, the Plane Train, and how a car service makes arrivals simple.",
  answer: "A-Town Limo's guide to Hartsfield-Jackson (ATL) — the world's busiest airport. Here's how its two terminals, seven concourses, and the Plane Train fit together, and how a chauffeured pickup skips the maze entirely.",
  chips: [
    { icon: "pin", text: "Terminals & concourses" },
    { icon: "route", text: "The Plane Train" },
    { icon: "sign", text: "Arrivals made simple" },
  ],
  introCols: [
    {
      icon: "radar",
      h2: "Built for Busy Travelers",
      html: `<p>ATL moves more passengers than any airport on earth, but its layout is simpler than its size suggests — two terminals at opposite ends and seven concourses in a straight line. These guides explain how it all connects, so you know what to expect before you fly.</p>`,
    },
    {
      icon: "sign",
      h2: "Arrivals Without the Maze",
      html: `<p>The easiest way through ATL is not to navigate it alone. With a pre-booked chauffeur, you walk off your flight and straight to a waiting car — no parking decks, no rideshare lots. These guides cover the airport; our terminal pages cover the pickup.</p>`,
    },
  ],
  why: [
    { icon: "sign", title: "Meet & greet inside", text: "Your chauffeur waits with a name sign, so there's nothing to find on arrival." },
    { icon: "radar", title: "Flight-tracked pickups", text: "We watch your flight and adjust to the actual landing time, with no charge for delays." },
    { icon: "clock", title: "24/7, holidays included", text: "Early departures and red-eye arrivals are all covered, every day of the year." },
    { icon: "shield", title: "ATL-permitted", text: "A-Town Limo holds the ATL Ground Transportation permit for airport pickups." },
  ],
  faqs: [
    { q: "How many terminals does ATL have?", a: "Hartsfield-Jackson has two terminals — the Domestic Terminal and the International Terminal — at opposite ends of the airport. Seven concourses (T and A through F) sit between them, all linked by the Plane Train." },
    { q: "What is the fastest way between ATL concourses?", a: "The Plane Train, ATL's automated people mover, is the main way between concourses and both terminals. It has run since 1980 and connects the Domestic Terminal, concourses T and A–F, and the International Terminal along one line." },
    { q: "Do I need to know my concourse before I fly?", a: "It helps. Your gate number begins with its concourse letter — B22 is on Concourse B, for example — so once you know your gate, you know which concourse to head to. Your airline's boarding pass shows it." },
    { q: "How does a car service make ATL easier?", a: `With a pre-booked chauffeur you skip parking and rideshare lots entirely — you're met inside and walked to the car. ${PHONE.display} reaches our dispatch team, or book online.` },
  ],
};

export const GUIDE_PAGES = {
  "is-atl-easy-to-navigate": {
    slug: "is-atl-easy-to-navigate",
    h1: "Is ATL Easy to Navigate?",
    title: "Is ATL Easy to Navigate? Atlanta Airport Guide",
    titleFull: "Is ATL Easy to Navigate? | A-Town Limo",
    description: `Is Hartsfield-Jackson easy to navigate? Yes — two terminals, seven concourses, one Plane Train. A guide to getting around ATL. Call ${PHONE.local}.`,
    summary: "A straight answer on navigating Hartsfield-Jackson: how its terminals and concourses are laid out, how to find your gate, and why arrivals are simplest by car service.",
    linkIntro: "Arriving with a car service, you don't navigate it at all —",
    terminalLinkHtml: `<a href="/atlanta-airport-car-service/domestic-terminal/">your chauffeur meets you at the Domestic Terminal</a>`,
    answerLead: "Yes — despite being the world's busiest airport, Hartsfield-Jackson is laid out simply. Two terminals sit at opposite ends and seven concourses (T and A through F) run in a straight line between them, all linked by the Plane Train, so you rarely walk far.",
    chips: [
      { icon: "pin", text: "2 terminals · 7 concourses" },
      { icon: "route", text: "One Plane Train line" },
      { icon: "sign", text: "Gates by letter" },
    ],
    facts: [
      { label: "Terminals", value: "2 — Domestic and International, at opposite ends" },
      { label: "Concourses", value: "7 — T, A, B, C, D, E, F" },
      { label: "Between concourses", value: "The Plane Train (automated people mover)" },
      { label: "Finding your gate", value: "Gate numbers begin with the concourse letter (e.g. B22)" },
      { label: "Size", value: "The world's busiest airport — 106.3 million passengers in 2025" },
    ],
    tabs: [
      { label: "Finding your gate", title: "Finding your gate", html: `<p>Every ATL gate number starts with its concourse letter, so a glance at your boarding pass tells you where to go: T-gates are in the Domestic Terminal's concourse, and A through F follow in order. Screens throughout the terminal point you to the Plane Train platform, and announcements call each concourse as you reach it.</p>` },
      { label: "Between concourses", title: "Getting between concourses", html: `<p>The Plane Train runs the length of the airport, stopping at each concourse in turn. If you connect from, say, Concourse A to Concourse E, you board once and ride through — there's no need to leave security. Because the concourses sit in a line, the train makes even the longest connection quick.</p>` },
      { label: "Arriving by car", title: "Arriving by car", html: `<p>The simplest ATL arrival skips navigation altogether. With a pre-booked chauffeur you leave your concourse, ride the Plane Train to the terminal, and walk straight to a waiting car — no parking decks, no rideshare lot, no app. We confirm your meeting point before you land.</p>` },
    ],
    faqs: [
      { q: "Is Atlanta airport hard to get around?", a: "No. ATL is the world's busiest airport but has a simple shape: two terminals at opposite ends and seven concourses (T and A–F) in a straight line, all connected by the Plane Train. Most travelers move between concourses in minutes." },
      { q: "How do I find my gate at ATL?", a: "Your gate number starts with its concourse letter — B22 is on Concourse B. Check your boarding pass for the gate, follow the terminal signs to the Plane Train, and ride to that concourse. Overhead screens confirm each stop." },
      { q: "How do I get between terminals at ATL?", a: "The Plane Train connects the Domestic Terminal, all seven concourses, and the International Terminal on one line, so you can ride from end to end without leaving security. ATL also runs a free surface shuttle between the two terminals." },
      { q: "What's the easiest way to leave ATL after landing?", a: "A pre-booked car service. Instead of finding a parking deck or walking to a rideshare lot, you're met and walked to a waiting vehicle. We track your flight, so the pickup matches your real landing time." },
      { q: "Where does my chauffeur meet me at ATL?", a: "It depends on your terminal. We confirm the meeting point when you book and send your chauffeur's details before pickup — see our Domestic and International Terminal guides for the exact spots." },
    ],
  },

  "terminal-map-plane-train": {
    slug: "terminal-map-plane-train",
    h1: "ATL Terminal Map & the Plane Train",
    title: "ATL Terminal Map & Plane Train Guide",
    titleFull: "ATL Terminal Map & Plane Train | A-Town Limo",
    description: `How ATL's terminals, seven concourses, and the Plane Train fit together — a map-in-words for Hartsfield-Jackson travelers. Call ${PHONE.local}.`,
    summary: "How Hartsfield-Jackson is laid out: the two terminals, the seven concourses, and the Plane Train that links them — plus where a car service fits in.",
    linkIntro: "Flying in from abroad? See",
    terminalLinkHtml: `<a href="/atlanta-airport-car-service/international-terminal/">how pickups work at the International Terminal</a>`,
    answerLead: "ATL's Plane Train is a free automated people mover that has run since 1980, connecting the Domestic Terminal, all seven concourses (T, A, B, C, D, E, F), and the International Terminal along one underground line — the backbone of the airport's layout.",
    chips: [
      { icon: "route", text: "Plane Train since 1980" },
      { icon: "pin", text: "7 concourses, one line" },
      { icon: "plane", text: "Both terminals linked" },
    ],
    facts: [
      { label: "Plane Train", value: "Free automated people mover, running since 1980" },
      { label: "What it connects", value: "Domestic Terminal → T, A, B, C, D, E, F → International Terminal" },
      { label: "Terminals", value: "2 — Domestic and International, at opposite ends" },
      { label: "Concourses", value: "7 — T, A, B, C, D, E, F, in a straight line" },
      { label: "Gate numbers", value: "Begin with the concourse letter (e.g. E15)" },
    ],
    tabs: [
      { label: "The layout", title: "How ATL is laid out", html: `<p>Picture ATL as a straight line. The Domestic Terminal sits at the west end; the International Terminal at the east. Between them, seven concourses — T, A, B, C, D, E, and F — are strung in order. Knowing that order is most of the map: your concourse letter tells you how far along the line your gate is.</p>` },
      { label: "The Plane Train", title: "The Plane Train", html: `<p>The Plane Train has carried travelers along that line since 1980. It stops at each concourse and at both terminals, so you board once and ride to your concourse without leaving the secure area. For arrivals, it's how you get from your gate back to baggage claim and the terminal exit.</p>` },
      { label: "Where a car fits", title: "Where a car service fits", html: `<p>Your chauffeured ride begins where the Plane Train ends. After you reach the terminal, you're met and walked to a waiting car — no shuttle to a lot, no app. We confirm the exact meeting point, including after customs at the International Terminal, before you land.</p>` },
    ],
    faqs: [
      { q: "What is the ATL Plane Train?", a: "It's Hartsfield-Jackson's automated people mover — a free, driverless train that has run since 1980. It connects the Domestic Terminal, all seven concourses (T and A–F), and the International Terminal along one underground line." },
      { q: "Does the Plane Train go to the International Terminal?", a: "Yes. The Plane Train runs end to end, linking the Domestic Terminal, every concourse, and the International Terminal on one line, so you can ride between the two terminals without leaving security. A free surface shuttle also connects them." },
      { q: "How are ATL's concourses arranged?", a: "In a straight line between the two terminals: T, A, B, C, D, E, F. Your gate number starts with its concourse letter, so E15 is on Concourse E. That single fact is most of what you need to read the terminal map." },
      { q: "Where do I catch the Plane Train?", a: "Follow the terminal signs after security; the Plane Train platform sits below the concourse level, and overhead screens announce each concourse stop. For arrivals, ride it from your concourse back toward baggage claim and the terminal exit." },
      { q: "How does a car service pick me up after the Plane Train?", a: "You ride the Plane Train to your terminal, then your chauffeur meets you at the agreed spot and walks you to the car. We track your flight and send your chauffeur's details before pickup, so there's nothing to arrange on arrival." },
    ],
  },
};
