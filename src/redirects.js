/**
 * Cloudflare Pages edge rules — _redirects and _headers.
 *
 * Phase 1 keeps redirects minimal: host canonicalization (www → apex) and the
 * live-site slug parity rules (/about/ → /about-us/, /contact-us/ → /contact/).
 * Programmatic-SEO cluster renames are added back in the SEO wave once those
 * pages ship. HTTPS is forced by Cloudflare's "Always Use HTTPS" setting plus
 * the HSTS header below.
 *
 * Emitted to dist/_redirects and dist/_headers by build.js.
 */

/**
 * Cloudflare Pages `_redirects`. www is the canonical host Pages serves (the
 * Squarespace CNAME points www → <project>.pages.dev, and the apex forwards to
 * www at Squarespace), so NO www↔apex rule is emitted here — a www→apex rule
 * would loop against the Squarespace apex→www forward. Only slug-parity rules.
 */
export function renderRedirectsFile(builtPaths = new Set()) {
  void builtPaths;
  return [
    "# Landio Limo Services redirects (Cloudflare Pages).",
    "# Slug parity.",
    "/about       /about-us/  301",
    "/about/      /about-us/  301",
    "/contact-us  /contact/   301",
    "/contact-us/ /contact/   301",
    "",
  ].join("\n");
}

/**
 * Security + caching headers. HSTS forces HTTPS; hashed assets and fonts are
 * immutable (content-hashed filenames), so they get a long cache. HTML is left
 * to Cloudflare's defaults so deploys publish instantly.
 */
export function renderHeadersFile() {
  return [
    "# Landio Limo Services headers (Cloudflare Pages).",
    "/*",
    "  X-Content-Type-Options: nosniff",
    "  X-Frame-Options: SAMEORIGIN",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
    "  Permissions-Policy: geolocation=(), microphone=(), camera=()",
    "",
    "# Content-hashed assets never change — cache hard.",
    "/assets/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
    "/fonts/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
  ].join("\n");
}
