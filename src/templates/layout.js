/**
 * Base HTML layout. Composes the shared header + footer (partials.js). Head
 * carries: title, meta description, canonical, robots, Open Graph + Twitter
 * cards, the sitewide business JSON-LD (LimousineService + LocalBusiness), and
 * any page-level JSON-LD (FAQPage, BreadcrumbList, CollectionPage, Service).
 */

import { SITE, absoluteUrl, businessJsonLd } from "../config.js";
import { esc, header, footer, floatingCta, preFooterCta, scrollTop, quoteModal } from "./partials.js";

const OG_IMAGE = "/assets/img/brand/landio-og.jpg";

export function renderPage(page, assets) {
  const { cssHref, jsHref, siteUrl, year, noindexAll, gtmId, ga4Id, mapsKey, adsId, adsLead, adsCall } = assets;

  // GTM only when GTM_ID is set (validated in build.js). dataLayer events
  // (form_submit_success, click_to_call) are pushed by client/main.js.
  const gtmHead = gtmId
    ? `  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>\n`
    : "";
  const gtmBody = gtmId
    ? `  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n`
    : "";
  // GA4 (gtag) loaded directly — pageviews auto; conversion events
  // (generate_lead, contact) are fired from client/main.js.
  const ga4Head = ga4Id
    ? `  <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>\n  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');</script>\n`
    : "";
  // Google Ads tag — shares the gtag.js that GA4 loads. Configures the AW- id
  // and exposes the per-action send_to values to client/main.js, which fires
  // the lead conversion on /thankyou/ and the call conversion on a tel: tap.
  const adsHead = adsId
    ? `  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('config','${adsId}');window.__ADS={lead:${JSON.stringify(adsLead)},call:${JSON.stringify(adsCall)}};</script>\n`
    : "";
  // Google Maps JS API (Places New) — powers live pickup/drop-off autocomplete
  // in client/main.js. Loaded async; fields fall back to the built-in DMV list
  // until it's ready, or permanently if the key is unset.
  const mapsHead = mapsKey
    ? `  <script async src="https://maps.googleapis.com/maps/api/js?key=${mapsKey}&libraries=places&v=weekly&loading=async"></script>\n`
    : "";
  const canonical = absoluteUrl(siteUrl, page.path || "/");

  // Title: "<Page> – Aura Hamptons".
  const title =
    page.titleFull ||
    (page.title ? `${page.title} – ${SITE.company}` : SITE.company);

  const description = esc(page.description || SITE.description);
  const noindex = noindexAll || page.noindex;
  const ogImage = absoluteUrl(siteUrl, OG_IMAGE);

  // Sitewide business schema on every page. A page can either add separate
  // blocks (`jsonLd`) or merge nodes into the SAME @graph as the business
  // (`graph`) — nodes then reference the business via its @id.
  const biz = businessJsonLd(siteUrl);
  const stripCtx = ({ "@context": _ctx, ...node }) => node;
  const ld = [
    page.graph
      ? { "@context": biz["@context"], "@graph": [...biz["@graph"], ...page.graph.filter(Boolean).map(stripCtx)] }
      : biz,
    ...(page.jsonLd || []),
  ].filter(Boolean);
  const ldBlocks = ld
    .map(
      (obj) =>
        `  <script type="application/ld+json">${JSON.stringify(obj)}</script>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
${gtmHead}${ga4Head}${adsHead}${mapsHead}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>document.documentElement.classList.add("js")</script>
  <title>${esc(title)}</title>
  <meta name="description" content="${description}">
${
  noindex
    ? `  <meta name="robots" content="noindex, nofollow">`
    : `  <meta name="robots" content="index, follow">`
}
  <link rel="canonical" href="${esc(canonical)}">
  <meta name="theme-color" content="#0a0a0a">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SITE.company)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${esc(ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${esc(ogImage)}">

  <link rel="icon" href="/assets/img/brand/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/img/brand/apple-touch-icon.png">
  <link rel="preload" href="/fonts/inter-latin-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${esc(cssHref)}">
${page.headExtra ? `  ${page.headExtra}\n` : ""}${ldBlocks ? ldBlocks + "\n" : ""}</head>
<body class="${esc(page.bodyClass || "")}" data-phone-e164="${esc(SITE.phone.e164)}" data-phone-display="${esc(SITE.phone.display)}"${page.defaultPickup ? ` data-default-pickup="${esc(page.defaultPickup)}"` : ""}>
${gtmBody}  <a class="sr-only sr-only--focusable" href="#main">Skip to content</a>
  ${header(page.path || "/")}
  <main id="main">
${page.main}
  </main>
  ${(page.bodyClass || "").includes("page-event") || page.hidePreFooterCta ? "" : preFooterCta(page.preFooterCta)}
  ${footer(year)}
  ${floatingCta()}
  ${scrollTop()}
  ${quoteModal()}
  <script type="module" src="${esc(jsHref)}"></script>
</body>
</html>
`;
}
