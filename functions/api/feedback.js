/**
 * POST /api/feedback — private feedback capture (the 1–3★ branch of the
 * /feedback/ review-gating page). Emails the feedback to the team via Resend.
 * Happy customers (4–5★) are redirected straight to Google on the client and
 * never reach this endpoint.
 *
 * Reuses the same Resend env vars as /api/lead:
 *   RESEND_API_KEY, QUOTE_NOTIFY_FROM (verified sender), QUOTE_NOTIFY_TO.
 */

import { SITE } from "../../src/config.js";

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const clean = (v, max) => String(v ?? "").replace(/\r\n/g, "\n").trim().slice(0, max);

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: { allow: "POST" } });
  }

  let d;
  try {
    d = await request.json();
  } catch {
    return json(400, { ok: false });
  }

  const f = {
    rating: clean(d.rating, 2).replace(/[^1-5]/g, ""),
    name: clean(d.name, 120),
    email: clean(d.email, 160),
    feedback: clean(d.feedback, 4000),
    pageUrl: clean(d.page_url, 300),
  };
  if (!f.name || !f.email || !f.feedback) return json(400, { ok: false });

  const ok = await sendFeedback(env, f);
  return json(ok ? 200 : 503, { ok, accepted: ok, phone: SITE.phone.display });
}

/** Email the feedback to the team via Resend. Returns true only on a 2xx. */
async function sendFeedback(env, f) {
  const key = env.RESEND_API_KEY;
  // From must be on the verified Resend domain (same rule as /api/lead).
  const DEFAULT_FROM = `${SITE.company} <leads@send.landiolimoservices.com>`;
  const envFrom = (env.QUOTE_NOTIFY_FROM || "").trim();
  const from = /@send\.landiolimoservices\.com/i.test(envFrom) ? envFrom : DEFAULT_FROM;
  const envTo = (env.QUOTE_NOTIFY_TO || "").split(",").map((s) => s.trim()).filter(Boolean);
  const to = [...new Set([SITE.email, "reinterio@gmail.com", ...envTo])];
  if (!key) return false;

  const stars = f.rating ? `${f.rating}★` : "low rating";
  const text = [
    `Private feedback — ${SITE.company}`,
    ``,
    `Rating:   ${f.rating ? `${f.rating} / 5` : "—"}`,
    ``,
    `Name:     ${f.name}`,
    `Email:    ${f.email}`,
    ``,
    `Feedback:`,
    f.feedback,
    f.pageUrl ? `` : null,
    f.pageUrl ? `Page:     ${f.pageUrl}` : null,
    ``,
    `Reply to this email to respond directly to the customer.`,
  ].filter((l) => l !== null).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: f.email, // team hits Reply → straight to the customer
      subject: `Private feedback (${stars}) — ${f.name}`,
      text,
    }),
  });
  return res.ok;
}
