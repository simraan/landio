/**
 * llms.txt generator — a plain-text map of the site for AI/LLM search engines.
 * Answer-first business summary, NAP, fleet, services, and a link index built
 * from the indexable pages. Generated into dist/llms.txt by build.js.
 */

import { SITE } from "./config.js";

import { DEFAULT_SITE_URL } from "./config.js";

export function renderLlmsTxt(siteUrl, pages = []) {
  const origin = (siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
  const links = pages
    .filter((p) => !p.noindex && !p.path.endsWith(".html"))
    .map((p) => `- [${p.title || p.path}](${origin}${p.path})${p.summary ? `: ${p.summary}` : ""}`);

  const fleet = SITE.fleet
    .map((v) => `- ${v.name} — ${v.pax}${v.bags ? `, up to ${v.bags} bags` : ""}`)
    .join("\n");
  const services = SITE.services.map((s) => `- ${s.title}`).join("\n");

  return [
    `# ${SITE.company}`,
    "",
    `> ${SITE.description}`,
    "",
    "## Key facts",
    `- Business: ${SITE.company} (${SITE.legalName}) — luxury chauffeured ground transportation`,
    `- Address: ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}, ${SITE.address.countryName}`,
    `- Service area: Washington, DC, Maryland, and Northern Virginia`,
    `- Airports served: Washington Dulles (IAD), Ronald Reagan Washington National (DCA), and Baltimore/Washington (BWI)`,
    `- Phone: ${SITE.phone.display}`,
    `- Email: ${SITE.email}`,
    `- Hours: ${SITE.hours}`,
    `- Website: ${origin}/`,
    "",
    "## Fleet (complete)",
    fleet,
    "",
    "## Services",
    services,
    "",
    "## Pages",
    links.join("\n"),
    "",
  ].join("\n");
}
