import { NextResponse } from "next/server";
import { getClientKey, persistentRateLimit } from "@/lib/rate-limit";

const MAX_MESSAGE = 5000;
const MAX_EMAIL = 254;
const MAX_BODY_BYTES = 20_000;
// Must match the options in components/contact/ContactForm.tsx.
const CATEGORIES = new Set(["Bug report", "Tool request", "Privacy or terms", "Business or partnership", "General"]);

const TOO_MANY = "Too many messages in a short time. Please wait a few minutes and try again, or email hello@onlypdf.online.";

function tooMany(retryAfter: number) {
  return NextResponse.json({ error: TOO_MANY }, { status: 429, headers: { "Retry-After": String(Math.max(1, retryAfter)) } });
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) return NextResponse.json({ error: "Your message is too large." }, { status: 413 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const requestedCategory = typeof body.category === "string" ? body.category.trim() : "General";
  const category = CATEGORIES.has(requestedCategory) ? requestedCategory : "General";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";

  if (honeypot) return NextResponse.json({ ok: true });
  if (email.length > MAX_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!message || message.length > MAX_MESSAGE) return NextResponse.json({ error: "Please enter a message up to 5,000 characters." }, { status: 400 });

  // Rate limits apply only to valid submissions, so a typo never uses up a
  // visitor's allowance. Per visitor: 5 per 10 minutes and 20 per day. Across
  // the whole site: 150 per day, which protects the email quota.
  const client = getClientKey(request);
  if (client) {
    const shortWindow = await persistentRateLimit(`contact:ip10m:${client}`, 5, 600);
    if (!shortWindow.allowed) return tooMany(shortWindow.retryAfter);
    const daily = await persistentRateLimit(`contact:ipday:${client}`, 20, 86_400);
    if (!daily.allowed) return tooMany(daily.retryAfter);
  }
  const site = await persistentRateLimit("contact:site:day", 150, 86_400);
  if (!site.allowed) return tooMany(site.retryAfter);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ error: "Contact email delivery is not configured yet. Please use hello@onlypdf.online." }, { status: 503 });
  }

  const failure = () => NextResponse.json({ error: "We couldn't send your message right now. Please email hello@onlypdf.online instead." }, { status: 502 });

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[OnlyPDF contact] ${category}`,
        text: `Category: ${category}\nFrom: ${email}\n\n${message}`,
      }),
    });
  } catch (error) {
    console.error("Resend contact delivery request failed", error instanceof Error ? error.message : error);
    return failure();
  }

  if (!response.ok) {
    console.error("Resend contact delivery failed", await response.text());
    return failure();
  }

  return NextResponse.json({ ok: true });
}
