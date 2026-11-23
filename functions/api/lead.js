/**
 * POST /api/lead — Landio Limo Services quote-request capture.
 *
 * Delivery (web-standard fetch only — no Node built-ins, no deps, so
 * `nodejs_compat` is NOT required):
 *   1. Email the lead to the team via Resend (primary — this decides success).
 *   2. Best-effort push the lead into GoHighLevel (secondary — never blocks).
 *
 * Response contract the client relies on:
 *   - 200 { ok: true, accepted: true }   → delivered: conversion + /thankyou/
 *   - 200 { ok: true, accepted: false }  → spam-guarded: silent, no conversion
 *   - 503 { ok: false, message, phone }  → not delivered: show message + call button
 *
 * Cloudflare Pages env vars (Settings → Variables):
 *   RESEND_API_KEY   (secret)  — required for delivery
 *   QUOTE_NOTIFY_FROM (plain)  — from address on a verified Resend domain
 *   QUOTE_NOTIFY_TO  (plain)   — inbox(es) that receive leads (comma-separated ok)
 *   GHL_PIT          (secret)  — GoHighLevel Private Integration Token (optional)
 *   GHL_LOCATION_ID  (plain)   — GoHighLevel sub-account location id (optional)
 */

import { PHONE, SITE } from "../../src/config.js";

const MIN_ELAPSED_MS = 2500;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const clean = (value) => String(value ?? "").replace(/[\r\n]+/g, " ").trim();
function safeEmail(value) {
  const v = String(value || "").replace(/[\r\n]+/g, "").trim();
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? v : "";
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: { allow: "POST" } });
  }

  let data = {};
  try {
    data = await request.json();
  } catch (_) {
    return json(400, { ok: false, accepted: false });
  }

  // --- Spam guard: silent success, no side effects. ---
  const honeypot = clean(data.company_website);
  const elapsed = Number(data.elapsed_ms) || 0;
  if (honeypot || elapsed < MIN_ELAPSED_MS) {
    return json(200, { ok: true, accepted: false });
  }

  const lead = normalizeLead(data);

  // Primary delivery: email via Resend. If it isn't configured or fails, we do
  // NOT pretend the lead landed — we tell the visitor to call.
  let delivered = false;
  try {
    delivered = await sendResend(env, lead);
  } catch (_) {
    delivered = false;
  }

  // Secondary: push into GoHighLevel. Best-effort — never changes the result.
  context.waitUntil?.(pushToGhl(env, lead).catch(() => {}));

  if (!delivered) {
    return json(503, {
      ok: false,
      accepted: false,
      message: `Online booking is temporarily unavailable — call ${PHONE.display}.`,
      phone: { e164: PHONE.e164, display: PHONE.display },
    });
  }

  return json(200, { ok: true, accepted: true });
}

/** Shape the raw form payload into a clean lead object. */
export function normalizeLead(d) {
  return {
    name: clean(d.name),
    email: safeEmail(d.email),
    phone: `${clean(d.country_code)} ${clean(d.phone)}`.trim(),
    message: clean(d.notes || d.message),
    smsConsent: d.sms_consent === "yes",
    // Partner-enquiry fields (empty on the ride-booking forms).
    company: clean(d.company),
    partnerType: clean(d.partner_type),
    tripType: clean(d.trip_type),
    pickup: clean(d.pickup),
    dropoff: clean(d.dropoff),
    date: clean(d.date),
    time: clean(d.time),
    hours: clean(d.hours),
    vehicle: clean(d.vehicle),
    passengers: clean(d.passengers),
    returnPickup: clean(d.return_pickup),
    returnDropoff: clean(d.return_dropoff),
    returnDate: clean(d.return_date),
    returnTime: clean(d.return_time),
    tracking: {
      gclid: clean(d.gclid),
      utm_source: clean(d.utm_source),
      utm_medium: clean(d.utm_medium),
      utm_campaign: clean(d.utm_campaign),
      utm_term: clean(d.utm_term),
      utm_content: clean(d.utm_content),
      page_url: clean(d.page_url),
      referrer: clean(d.referrer),
      submitted_at: clean(d.submitted_at),
      device_type: clean(d.device_type),
      form_location: clean(d.form_location),
    },
  };
}

const escHtml = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Branded dark/gold lead-notification email (Aura Hamptons). */
function renderEmail(lead) {
  const row = (label, value) =>
    value
      ? `<tr><td style="padding:6px 12px;color:#9a8f7a;font:600 12px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;vertical-align:top">${escHtml(label)}</td><td style="padding:6px 12px;color:#f5f0e6;font:400 15px/1.5 Arial,sans-serif">${escHtml(value)}</td></tr>`
      : "";
  const t = lead.tracking;
  const isPartner = t.form_location === "partner";
  const headline = isPartner ? "New partner enquiry" : "New quote request";
  const trip = lead.tripType === "Hourly" && lead.hours ? `Hourly · ${lead.hours}` : lead.tripType;
  const ret =
    lead.returnPickup || lead.returnDate
      ? `${lead.returnPickup || ""} → ${lead.returnDropoff || ""} · ${lead.returnDate || ""} ${lead.returnTime || ""}`.trim()
      : "";
  const src = [t.utm_source, t.utm_campaign].filter(Boolean).join(" / ") || t.referrer || "Direct";

  const html = `<!doctype html><html><body style="margin:0;background:#0a0a0a;padding:24px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#141414;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden">
      <tr><td style="background:#0a0a0a;padding:20px 24px;border-bottom:2px solid #c9a94e">
        <span style="color:#c9a94e;font:700 20px/1 Arial,sans-serif;letter-spacing:.06em">${escHtml(SITE.company.toUpperCase())}</span>
        <span style="color:#9a8f7a;font:400 13px/1 Arial,sans-serif;float:right;padding-top:6px">${escHtml(headline)}</span>
      </td></tr>
      <tr><td style="padding:18px 12px 6px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("Company", lead.company)}
          ${row("Partner type", lead.partnerType)}
          ${row("Name", lead.name)}
          ${row("Phone", lead.phone)}
          ${row("Email", lead.email)}
          ${row("Trip", trip)}
          ${row("Pickup", lead.pickup)}
          ${row("Drop-off", lead.dropoff)}
          ${row("Date / Time", `${lead.date} ${lead.time}`.trim())}
          ${row("Vehicle", lead.vehicle)}
          ${row("Return", ret)}
          ${row("Notes", lead.message)}
          ${row("SMS opt-in", lead.smsConsent ? "Yes" : "No")}
          ${row("Source", src)}
          ${row("Page", t.page_url)}
        </table>
      </td></tr>
      <tr><td style="padding:14px 24px 20px">
        <a href="tel:${escHtml(lead.phone)}" style="display:inline-block;background:#c9a94e;color:#0a0a0a;font:700 14px Arial,sans-serif;text-decoration:none;padding:11px 20px;border-radius:8px">Call ${escHtml(lead.name || "lead")}</a>
      </td></tr>
    </table></body></html>`;

  const text = [
    `New ${SITE.company} ${isPartner ? "partner enquiry" : "quote request"}`,
    lead.company ? `Company:  ${lead.company}` : "",
    lead.partnerType ? `Partner:  ${lead.partnerType}` : "",
    `Name:     ${lead.name}`,
    `Phone:    ${lead.phone}`,
    `Email:    ${lead.email}`,
    isPartner ? "" : `Trip:     ${trip}`,
    isPartner ? "" : `Pickup:   ${lead.pickup}`,
    isPartner ? "" : `Drop-off: ${lead.dropoff}`,
    isPartner ? "" : `When:     ${lead.date} ${lead.time}`,
    isPartner ? "" : `Vehicle:  ${lead.vehicle}`,
    ret ? `Return:   ${ret}` : "",
    lead.message ? `Notes:    ${lead.message}` : "",
    `SMS:      ${lead.smsConsent ? "Yes" : "No"}`,
    `Source:   ${src}`,
  ].filter(Boolean).join("\n");

  return { html, text };
}

/** Plain customer auto-reply — confirms the request, signed by the owner.
 *  Reply-To is the business inbox so a customer reply reaches the team. */
function renderCustomerEmail(lead) {
  const name = (lead.name || "").split(" ")[0] || "there";
  const phone = PHONE.display;
  const text = [
    `Hi ${name},`,
    ``,
    `Thank you for requesting a quote with ${SITE.company}. We've received your details and are preparing your quote now.`,
    ``,
    `If you have any questions in the meantime, call us at ${phone} or simply reply to this email.`,
    ``,
    `Regards,`,
    `Mohamet Thiam`,
    SITE.company,
    SITE.email,
    phone,
  ].join("\n");

  const html = `<div style="font:400 15px/1.6 Arial,Helvetica,sans-serif;color:#1a1a1a;max-width:560px">
    <p>Hi ${escHtml(name)},</p>
    <p>Thank you for requesting a quote with <strong>${escHtml(SITE.company)}</strong>. We've received your details and are preparing your quote now.</p>
    <p>If you have any questions in the meantime, call us at <a href="tel:${escHtml(PHONE.e164)}" style="color:#9a7a1e">${escHtml(phone)}</a> or simply reply to this email.</p>
    <p style="margin-top:22px;color:#1a1a1a">Regards,<br>
      Mohamet Thiam<br>
      ${escHtml(SITE.company)}<br>
      <a href="mailto:${escHtml(SITE.email)}" style="color:#9a7a1e">${escHtml(SITE.email)}</a><br>
      ${escHtml(phone)}</p>
  </div>`;

  return { subject: `We've received your request — ${SITE.company}`, html, text };
}

/** Send the lead emails via Resend. Returns true only when the team
 *  notification is accepted (2xx); the customer auto-reply is best-effort. */
async function sendResend(env, lead) {
  const key = env.RESEND_API_KEY;
  const from = env.QUOTE_NOTIFY_FROM;
  // Team recipients: always the business inbox + owner's Gmail, plus any extra
  // addresses configured in QUOTE_NOTIFY_TO (comma-separated). Deduped.
  const envTo = (env.QUOTE_NOTIFY_TO || "").split(",").map((s) => s.trim()).filter(Boolean);
  const to = [...new Set([SITE.email, "reinterio@gmail.com", ...envTo])];
  if (!key || !from) return false;

  const { html, text } = renderEmail(lead);
  const ownerBody = {
    from,
    to,
    subject: `New quote: ${lead.name || "website"}${lead.vehicle ? ` · ${lead.vehicle}` : ""}`,
    html,
    text,
  };
  // Owner hits Reply → goes straight to the customer.
  if (lead.email) ownerBody.reply_to = lead.email;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify(ownerBody),
  });
  const delivered = res.ok;

  // Customer auto-reply — best-effort, never changes the delivered result.
  if (delivered && lead.email) {
    try {
      const addr = (String(from).match(/<([^>]+)>/) || [null, from])[1].trim();
      const c = renderCustomerEmail(lead);
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: `${SITE.company} <${addr}>`,
          to: [lead.email],
          reply_to: SITE.email, // customer hits Reply → business inbox
          subject: c.subject,
          html: c.html,
          text: c.text,
        }),
      });
    } catch (_) { /* best-effort */ }
  }

  return delivered;
}

/** Best-effort upsert into GoHighLevel. Silent on any failure. */
async function pushToGhl(env, lead) {
  const pit = env.GHL_PIT;
  const locationId = env.GHL_LOCATION_ID;
  if (!pit || !locationId) return;

  const isPartner = lead.tracking.form_location === "partner";
  const [firstName, ...rest] = (lead.name || "").split(" ");
  const summary = [
    lead.company && `Company: ${lead.company}`,
    lead.partnerType && `Partner type: ${lead.partnerType}`,
    lead.tripType && `Trip: ${lead.tripType}`,
    lead.pickup && `Pickup: ${lead.pickup}`,
    lead.dropoff && `Drop-off: ${lead.dropoff}`,
    (lead.date || lead.time) && `When: ${lead.date} ${lead.time}`,
    lead.vehicle && `Vehicle: ${lead.vehicle}`,
    lead.message && `Notes: ${lead.message}`,
  ].filter(Boolean).join(" | ");

  const body = {
    locationId,
    firstName: firstName || lead.name || "Website",
    lastName: rest.join(" "),
    email: lead.email || undefined,
    phone: lead.phone || undefined,
    companyName: lead.company || undefined,
    source: `${SITE.company} website`,
    tags: (isPartner
      ? ["partner-enquiry", lead.partnerType]
      : ["website-quote", lead.vehicle]
    ).filter(Boolean),
    ...(lead.tracking.utm_source ? { attributionSource: { utmSource: lead.tracking.utm_source, utmCampaign: lead.tracking.utm_campaign, sessionSource: lead.tracking.referrer } } : {}),
  };

  await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
    method: "POST",
    headers: {
      authorization: `Bearer ${pit}`,
      version: "2021-07-28",
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  }).then(async (res) => {
    // Add the trip summary as a note on the contact (best-effort).
    if (!res.ok || !summary) return;
    const out = await res.json().catch(() => null);
    const contactId = out?.contact?.id || out?.id;
    if (!contactId) return;
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${pit}`,
        version: "2021-07-28",
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ body: summary }),
    }).catch(() => {});
  });
}
