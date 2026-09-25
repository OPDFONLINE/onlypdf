import { NextResponse } from "next/server";

const MAX_MESSAGE = 5000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "General";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";

  if (honeypot) return NextResponse.json({ ok: true });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!message || message.length > MAX_MESSAGE) return NextResponse.json({ error: "Please enter a message up to 5,000 characters." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ error: "Contact email delivery is not configured yet. Please use hello@onlypdf.online." }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
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

  if (!response.ok) {
    console.error("Resend contact delivery failed", await response.text());
    return NextResponse.json({ error: "We couldn't send your message right now. Please email hello@onlypdf.online instead." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
