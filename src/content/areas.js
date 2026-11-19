/**
 * Metro-Atlanta area car-service pages — content. One block per config AREAS
 * slug (all built in this batch). The renderer (pages/areas.js) composes each
 * page from this plus the AREAS link map (neighbors, venues, fbo, routes).
 *
 * Geography only: neighborhood identity, the named highway from ATL, and local
 * landmarks (low-risk, from the prior route pages — docs/FACTS.md "Needs
 * source"). NO miles or drive times (unsourced = left out). Business facts come
 * from config.js. Keep each text block ≤ 120 words.
 */

export const HUB = {
  h1: "Atlanta Areas We Serve",
  title: "Atlanta Areas We Serve",
  titleFull: "Atlanta Areas We Serve | A-Town Limo",
  description: "Chauffeured car service and ATL airport transfers across metro Atlanta — Buckhead, Midtown, Downtown, Sandy Springs, Dunwoody, Alpharetta, and more.",
  summary: "Chauffeured car service and Hartsfield-Jackson (ATL) airport transfers across metro Atlanta — by city and neighborhood, 24/7, with no surge pricing.",
  answer: "A-Town Limo provides chauffeured car service and Hartsfield-Jackson (ATL) airport transfers across metro Atlanta — from Buckhead and Midtown to the northern suburbs — 24/7, with no surge pricing.",
  chips: [
    { icon: "pin", text: "Metro Atlanta & Georgia" },
    { icon: "radar", text: "ATL transfers" },
    { icon: "tag", text: "No surge pricing" },
  ],
  introCols: [
    {
      icon: "radar",
      h2: "Airport Transfers From Every Neighborhood",
      html: `<p>Wherever you are in metro Atlanta, your chauffeur runs the trip to and from Hartsfield-Jackson (ATL) with real-time flight tracking, meet &amp; greet, and no charge for flight delays. Pick your area to see how the airport run works from there.</p>`,
    },
    {
      icon: "car",
      h2: "Local Chauffeur Service, Too",
      html: `<p>It's not only airport runs. Across these areas we handle corporate travel, nights out, events, and hourly charters in the same sedans, SUVs, and Sprinter van — point to point or by the hour, with upfront quotes and no surge pricing.</p>`,
    },
  ],
  why: [
    { icon: "radar", title: "Flight-tracked ATL transfers", text: "Pickups from any metro area move with your real landing time." },
    { icon: "tag", title: "No surge pricing", text: "Every trip is quoted up front, the same standard across every neighborhood." },
    { icon: "van", title: "The right vehicle", text: "Sedan, SUV, or the 14-seat Sprinter van, matched to your group and luggage." },
    { icon: "clock", title: "24/7, holidays included", text: "A live dispatch team around the clock, every day of the year." },
  ],
  faqs: [
    { q: "Which Atlanta areas do you serve?", a: "A-Town Limo covers metro Atlanta and the surrounding Georgia region — including Buckhead, Midtown, Downtown, Sandy Springs, Dunwoody, Alpharetta, Marietta, Roswell, Decatur, and our home base of Duluth — plus long-distance trips across Georgia." },
    { q: "Do you pick up from every area for ATL airport runs?", a: "Yes. We run airport transfers to and from Hartsfield-Jackson (ATL) across the metro, with flight tracking on arrivals and no charge for flight delays. Pick your area for the details of that run." },
    { q: "Is the service the same in every area?", a: "Yes. The same chauffeurs, vehicles, flight tracking, and no-surge pricing apply everywhere we drive — from in-town neighborhoods to the northern suburbs." },
    { q: "What is your cancellation policy?", a: "Cancellation is free up to 24 hours before your scheduled pickup. Cancellations made within 24 hours of pickup are charged 100% of the fare." },
  ],
};

/** Per-area copy. `highway` is a named route from ATL (no miles/times). */
export const AREA_CONTENT = {
  duluth: {
    base: true,
    context: "Duluth, in Gwinnett County northeast of Atlanta, is a fast-growing suburb around Sugarloaf Parkway and the Gas South District — and it's where A-Town Limo is based.",
    highway: "I-85",
    landmarks: "the Gas South District, Sugarloaf Mills, and historic downtown Duluth",
    local: "As your hometown car service, we know Duluth's neighborhoods, offices, and venues inside out.",
  },
  buckhead: {
    context: "Buckhead is Atlanta's upscale business and shopping district, home to Lenox Square, Phipps Plaza, and a cluster of corporate towers and luxury hotels.",
    highway: "I-85",
    landmarks: "Lenox Square, Phipps Plaza, the St. Regis, and the Buckhead business towers",
    local: "We handle executive travel, dinner reservations, and hotel transfers across Buckhead.",
  },
  midtown: {
    context: "Midtown is Atlanta's arts and tech core — the Fox Theatre, the High Museum, Georgia Tech, and a growing list of corporate headquarters.",
    highway: "the Downtown Connector",
    landmarks: "the Fox Theatre, the High Museum of Art, Georgia Tech, and Piedmont Park",
    local: "From show nights at the Fox to campus visits and client meetings, we keep Midtown moving.",
  },
  "downtown-atlanta": {
    context: "Downtown Atlanta holds the convention district — the Georgia World Congress Center, Mercedes-Benz Stadium, State Farm Arena, and the major convention hotels.",
    highway: "the Downtown Connector",
    landmarks: "the Georgia World Congress Center, Mercedes-Benz Stadium, State Farm Arena, and Centennial Olympic Park",
    local: "Conventions, game days, and hotel transfers downtown are our daily work.",
  },
  "sandy-springs": {
    context: "Sandy Springs sits just north of the Perimeter (I-285) and is a major corporate hub, with headquarters along Hammond Drive and the Perimeter office district.",
    highway: "I-85 and GA-400",
    landmarks: "the Perimeter office district, City Springs, and Northside Hospital",
    local: "Corporate pickups and hospital transfers across Sandy Springs are a regular run for us.",
  },
  dunwoody: {
    context: "Dunwoody anchors the Perimeter Center business district on the north side of I-285, with Perimeter Mall and a dense cluster of offices and hotels.",
    highway: "GA-400",
    landmarks: "Perimeter Mall, the Perimeter Center offices, and Dunwoody Village",
    local: "We serve the Perimeter's offices and hotels with punctual, discreet chauffeurs.",
  },
  alpharetta: {
    context: "Alpharetta, in north Fulton County, is a tech-corridor city along GA-400, with Avalon, a lively downtown, and the Ameris Bank Amphitheatre.",
    highway: "GA-400",
    landmarks: "Avalon, Downtown Alpharetta, and the Ameris Bank Amphitheatre",
    local: "Concert nights at the amphitheatre and corporate travel along the GA-400 corridor are our specialty here.",
  },
  marietta: {
    context: "Marietta, in Cobb County to the northwest, centers on the historic Marietta Square and sits near Truist Park and The Battery Atlanta.",
    highway: "I-75",
    landmarks: "Marietta Square, Truist Park, and The Battery Atlanta",
    local: "Braves game days and Square dinners are easy with a chauffeur who knows Cobb County.",
  },
  roswell: {
    context: "Roswell, in north Fulton County, pairs a historic district on the Chattahoochee with modern office and residential areas.",
    highway: "GA-400",
    landmarks: "Historic Roswell, Canton Street, and the Chattahoochee River",
    local: "From Canton Street evenings to corporate runs, we cover Roswell day and night.",
  },
  decatur: {
    context: "Decatur, just east of the city, is a walkable downtown known for Emory University, Agnes Scott College, and a restaurant scene around the courthouse square.",
    highway: "I-20",
    landmarks: "Decatur Square, Emory University, and Agnes Scott College",
    local: "Campus visits, hospital transfers, and dinners on the Square are routine for us in Decatur.",
  },
};
