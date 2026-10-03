const isProd = process.env.NODE_ENV === "production";

// Set CSP_ENFORCE=true in the Vercel environment once the Report-Only
// period shows no violations. Until then the policy is sent as
// Content-Security-Policy-Report-Only, which logs problems in the browser
// console but never blocks anything.
const enforceCsp = process.env.CSP_ENFORCE === "true";

const googleAds = [
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://*.doubleclick.net",
  "https://*.adtrafficquality.google",
  "https://*.google.com",
];

const csp = [
  "default-src 'self'",
  // Next.js injects small inline bootstrap scripts, so 'unsafe-inline' is
  // required until a nonce-based setup is added. 'unsafe-eval' is dev-only
  // (React Fast Refresh).
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} https://www.googletagservices.com https://partner.googleadservices.com https://adservice.google.com https://fundingchoicesmessages.google.com ${googleAds.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  // blob:/data: are needed for rendered PDF pages, thumbnails and downloads.
  `img-src 'self' data: blob: https://*.supabase.co https://images.pexels.com https://cdn.pixabay.com ${googleAds.join(" ")}`,
  "font-src 'self' data:",
  `connect-src 'self' blob: data: https://*.supabase.co wss://*.supabase.co ${googleAds.join(" ")}`,
  // The pdf.js worker is served from our own origin (/pdf.worker.min.mjs).
  "worker-src 'self' blob:",
  `frame-src ${googleAds.join(" ")}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: enforceCsp ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework version in a response header.
  poweredByHeader: false,
  // Blog images are copied into Supabase Storage by the admin workflow,
  // so external image domains are not required for published article media.
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The pdf.js worker URL carries ?v=<pdfjs version>, so it can be cached for a year.
      { source: "/pdf.worker.min.mjs", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      // Admin pages and admin APIs must never be cached by a CDN or browser.
      { source: "/admin/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
      { source: "/api/admin/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
      // Never index admin screens or API responses, even if a crawler ignores robots.txt.
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
