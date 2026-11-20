/**
 * DC-metro area car-service pages — content. One block per config AREAS slug.
 * The renderer (pages/areas.js) composes each page from this plus the AREAS
 * link map (neighbors, venues, fbo, routes) and the area's nearest airport.
 *
 * Geography only: neighborhood identity, the named highway, and local landmarks.
 * NO miles or drive times (unsourced = left out). Business facts come from
 * config.js. Keep each text block ≤ 120 words.
 */

export const HUB = {
  h1: "DC Metro Areas We Serve",
  title: "Areas We Serve",
  titleFull: "DC Metro Areas We Serve | Landio Limo Services",
  description: "Chauffeured car service and IAD, DCA & BWI airport transfers across the DC metro — Washington, DC, Bethesda, Tysons, Arlington, Reston, National Harbor, and more.",
  summary: "Chauffeured car service and DC-area airport transfers (IAD, DCA, BWI) across Washington, DC, Maryland, and Northern Virginia — by city, 24/7, with no surge pricing.",
  answer: "Landio Limo Services provides chauffeured car service and DC-area airport transfers across Washington, DC, Maryland, and Northern Virginia — from downtown DC and Bethesda to Tysons, Reston, and Loudoun County — 24/7, with no surge pricing.",
  chips: [
    { icon: "pin", text: "DC · Maryland · Virginia" },
    { icon: "radar", text: "IAD · DCA · BWI transfers" },
    { icon: "tag", text: "No surge pricing" },
  ],
  introCols: [
    {
      icon: "radar",
      h2: "Airport Transfers From Every Area",
      html: `<p>Wherever you are in the DC metro, your chauffeur runs the trip to and from Dulles (IAD), Reagan National (DCA), and BWI with real-time flight tracking, meet &amp; greet, and no charge for flight delays. Pick your area to see how the airport run works from there.</p>`,
    },
    {
      icon: "car",
      h2: "Local Chauffeur Service, Too",
      html: `<p>It's not only airport runs. Across these areas we handle corporate and executive travel, diplomatic service, nights out, events, and hourly charters in the same sedans, SUVs, and group vehicles — point to point or by the hour, with upfront quotes and no surge pricing.</p>`,
    },
  ],
  why: [
    { icon: "radar", title: "Flight-tracked transfers", text: "Pickups from any area move with your real landing time at IAD, DCA, and BWI." },
    { icon: "tag", title: "No surge pricing", text: "Every trip is quoted up front, the same standard across every area." },
    { icon: "van", title: "The right vehicle", text: "Sedan, SUV, Sprinter van, minibus, or charter bus, matched to your group and luggage." },
    { icon: "clock", title: "24/7, holidays included", text: "A live dispatch team around the clock, every day of the year." },
  ],
  faqs: [
    { q: "Which DC-area cities do you serve?", a: "Landio covers Washington, DC, Maryland, and Northern Virginia — including Bethesda, Potomac, Rockville, Silver Spring, Germantown, Gaithersburg, Chevy Chase, National Harbor, Baltimore, Annapolis, Arlington, Alexandria, McLean, Tysons, Fairfax, Reston, Ashburn, Sterling, and Leesburg." },
    { q: "Do you pick up from every area for airport runs?", a: "Yes. We run airport transfers to and from Dulles (IAD), Reagan National (DCA), and BWI across the metro, with flight tracking on arrivals and no charge for flight delays. Pick your area for the details of that run." },
    { q: "Is the service the same in every area?", a: "Yes. The same chauffeurs, vehicles, flight tracking, and no-surge pricing apply everywhere we drive — from downtown DC to the Maryland and Virginia suburbs." },
    { q: "What is your cancellation policy?", a: "Cancellation is free up to 24 hours before your scheduled pickup. Cancellations made within 24 hours of pickup are charged 100% of the fare." },
  ],
};

/** Per-area copy. `highway` is a named route (no miles/times). */
export const AREA_CONTENT = {
  "washington-dc": {
    context: "Washington, DC is the nation's capital — home to the federal government, the diplomatic corps, and the region's busiest hotels, convention space, and corporate offices.",
    highway: "I-395 and the Southwest Freeway",
    landmarks: "the National Mall, Capitol Hill, the White House, and the Walter E. Washington Convention Center",
    local: "We handle executive travel, diplomatic transportation, hotel and convention transfers, and nights out across the District.",
  },
  bethesda: {
    context: "Bethesda is an affluent Montgomery County hub just northwest of DC, anchored by the NIH campus, Walter Reed, and a dense downtown of offices, hotels, and restaurants.",
    highway: "I-495 (the Capital Beltway) and Wisconsin Avenue",
    landmarks: "the NIH campus, Walter Reed, and downtown Bethesda",
    local: "We handle executive travel, medical-campus visits, and dinner reservations across Bethesda.",
  },
  potomac: {
    context: "Potomac is one of Maryland's most exclusive residential communities, known for estate homes, country clubs, and quiet, leafy neighborhoods along the river.",
    highway: "I-495 and River Road",
    landmarks: "Congressional Country Club, Potomac Village, and the river estates",
    local: "We handle private residential pickups, country-club events, and airport runs across Potomac.",
  },
  rockville: {
    context: "Rockville is the Montgomery County seat, a mix of biotech and government offices, a revitalized town center, and major education campuses.",
    highway: "I-270 and Rockville Pike",
    landmarks: "Rockville Town Square, Montgomery College, and the Universities at Shady Grove",
    local: "We handle corporate travel, campus visits, and airport transfers across Rockville.",
  },
  "silver-spring": {
    context: "Silver Spring is a dense, transit-connected hub just over the DC line, with a lively downtown, the FDA campus, and major media and federal offices.",
    highway: "I-495 and Georgia Avenue (US-29)",
    landmarks: "downtown Silver Spring, the FDA campus, and the Discovery headquarters",
    local: "We handle corporate travel, event nights, and airport transfers across Silver Spring.",
  },
  germantown: {
    base: true,
    context: "Germantown, in upper Montgomery County along the I-270 corridor, is a growing residential and biotech hub — and it's where Landio Limo Services is based.",
    highway: "I-270",
    landmarks: "Montgomery College Germantown, the Milestone Center, and Germantown Town Center",
    local: "As your hometown car service, we know Germantown's neighborhoods, offices, and venues inside out.",
  },
  gaithersburg: {
    context: "Gaithersburg is a diverse I-270-corridor city of planned communities, biotech offices, and a popular waterfront town center.",
    highway: "I-270",
    landmarks: "the Rio and Washingtonian waterfront, Kentlands, and the Montgomery County Fairgrounds",
    local: "We handle corporate travel, family events, and airport transfers across Gaithersburg.",
  },
  "chevy-chase": {
    context: "Chevy Chase is an affluent community straddling the DC-Maryland line along Connecticut Avenue, known for upscale shopping and established neighborhoods.",
    highway: "I-495 and Connecticut Avenue",
    landmarks: "the Chevy Chase shops, Connecticut Avenue, and the country clubs",
    local: "We handle residential pickups, shopping and dining trips, and airport runs across Chevy Chase.",
  },
  "national-harbor": {
    context: "National Harbor is a waterfront resort-and-entertainment district on the Potomac in Prince George's County, built around hotels, a casino, and conference space.",
    highway: "I-495 and the Woodrow Wilson Bridge",
    landmarks: "MGM National Harbor, the Gaylord National, the Capital Wheel, and Tanger Outlets",
    local: "We handle resort and casino transfers, conference shuttles, and airport runs across National Harbor.",
  },
  baltimore: {
    context: "Baltimore is Maryland's largest city, a major port and sports town with a revitalized Inner Harbor, convention space, and a busy business district.",
    highway: "I-95 and the Baltimore-Washington Parkway",
    landmarks: "the Inner Harbor, the convention center, and the stadiums at Camden Yards",
    local: "We handle corporate travel, event nights, and BWI airport transfers across Baltimore.",
  },
  annapolis: {
    context: "Annapolis is Maryland's historic capital on the Chesapeake Bay, home to the Naval Academy, the State House, and a waterfront full of events.",
    highway: "US-50 (the John Hanson Highway)",
    landmarks: "the United States Naval Academy, the Maryland State House, and City Dock",
    local: "We handle Naval Academy events, waterfront weddings, and airport transfers across Annapolis.",
  },
  arlington: {
    context: "Arlington is a dense Northern Virginia county directly across the Potomac from DC, home to the Pentagon, major federal offices, and the Rosslyn and Crystal City business districts.",
    highway: "I-395 and US-50",
    landmarks: "the Pentagon, Rosslyn, Crystal City, and Arlington National Cemetery",
    local: "We handle executive travel, government and defense trips, and Reagan National transfers across Arlington.",
  },
  alexandria: {
    context: "Alexandria is a historic Potomac waterfront city just south of DC, known for Old Town's cobblestone streets, King Street, and a strong hospitality scene.",
    highway: "I-495 and US-1",
    landmarks: "Old Town Alexandria, King Street, and the Potomac waterfront",
    local: "We handle Old Town dining, weddings, and airport transfers across Alexandria.",
  },
  mclean: {
    context: "McLean is an affluent Fairfax County community bordering the Potomac and Tysons, home to corporate headquarters, the CIA, and estate neighborhoods.",
    highway: "I-495 and the George Washington Memorial Parkway",
    landmarks: "Tysons, the CIA headquarters, and the Capital One campus",
    local: "We handle executive travel, residential pickups, and airport runs across McLean.",
  },
  tysons: {
    context: "Tysons is Northern Virginia's business and shopping center — a dense cluster of corporate towers, hotels, two major malls, and a new performing-arts hall.",
    highway: "I-495 and the Dulles Toll Road",
    landmarks: "Tysons Corner Center, Capital One Hall, and the Tysons business district",
    local: "We handle corporate travel, roadshows, and airport transfers across Tysons.",
  },
  fairfax: {
    context: "Fairfax is a Northern Virginia county seat and university town, with government offices, George Mason University, and established commercial districts.",
    highway: "I-66",
    landmarks: "George Mason University, Fairfax Corner, and the county government center",
    local: "We handle corporate travel, campus visits, and airport transfers across Fairfax.",
  },
  reston: {
    context: "Reston is a planned Fairfax County community near Dulles, built around a walkable town center, corporate campuses, and a Silver Line Metro connection.",
    highway: "the Dulles Toll Road",
    landmarks: "Reston Town Center and the Wiehle-Reston East Metro",
    local: "We handle corporate travel, town-center events, and Dulles airport runs across Reston.",
  },
  ashburn: {
    context: "Ashburn is a fast-growing Loudoun County hub near Dulles, known as a data-center capital with new residential and mixed-use development along the Silver Line.",
    highway: "the Dulles Greenway (VA-267)",
    landmarks: "One Loudoun, the data-center corridor, and the Loudoun County campuses",
    local: "We handle corporate travel, Dulles transfers, and private-aviation runs across Ashburn.",
  },
  sterling: {
    context: "Sterling is a Loudoun County community bordering Dulles, with a strong tech and logistics base along the Route 28 corridor.",
    highway: "VA-7 (Leesburg Pike)",
    landmarks: "the Dulles Town Center and the Route 28 tech corridor",
    local: "We handle corporate travel, Dulles transfers, and airport runs across Sterling.",
  },
  leesburg: {
    context: "Leesburg is the Loudoun County seat in Virginia's wine country, with a historic downtown, outlet shopping, and its own executive airport.",
    highway: "the Dulles Greenway (VA-267)",
    landmarks: "Leesburg Executive Airport, historic downtown Leesburg, and the Leesburg Premium Outlets",
    local: "We handle private-aviation transfers, winery trips, and airport runs across Leesburg.",
  },
};
