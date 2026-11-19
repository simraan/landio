/**
 * GET /api/health — liveness probe for the Cloudflare Pages Functions runtime.
 *
 * Web-standard APIs only (Request/Response) — no Node built-ins, no framework,
 * no runtime deps, so `nodejs_compat` is NOT required.
 */
export function onRequestGet() {
  return new Response(
    JSON.stringify({ status: "ok", service: "atown-limo" }),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
}
