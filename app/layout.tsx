import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";
import { getSiteSettings } from "@/lib/supabase/settings";
import { JsonLd } from "@/components/seo/JsonLd";
import { isValidAdsensePublisherId } from "@/lib/ads/validate";
import { HOME_DEFAULT_TITLE, HOME_DEFAULT_DESCRIPTION } from "@/lib/seo/metadata";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.homepage_title || HOME_DEFAULT_TITLE;
  const description = settings.homepage_description || HOME_DEFAULT_DESCRIPTION;

  // "Other" verification tags are stored as one "meta-name=content" pair per
  // line (e.g. Bing's msvalidate.01, Pinterest's p:domain_verify, Ezoic's
  // ezoic-site-verification) so new providers never need a code change —
  // just paste the pair into Admin > Settings.
  const other: Record<string, string> = {};
  for (const line of (settings.other_verification_meta || "").split("\n")) {
    const separatorIndex = line.indexOf("=");
    if (separatorIndex <= 0) continue;
    const name = line.slice(0, separatorIndex).trim();
    const content = line.slice(separatorIndex + 1).trim();
    if (name && content) other[name] = content;
  }
  if (isValidAdsensePublisherId(settings.google_adsense_publisher_id)) {
    other["google-adsense-account"] = settings.google_adsense_publisher_id;
  }

  return {
    metadataBase: new URL("https://onlypdf.online"),
    title: { default: title, template: "%s — OnlyPDF" },
    description,
    openGraph: { title, description, siteName: settings.site_name || "OnlyPDF", locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image", title, description },
    verification: {
      google: settings.google_site_verification || undefined,
      other: Object.keys(other).length > 0 ? other : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="flex min-h-screen flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "OnlyPDF",
            url: "https://onlypdf.online",
            description: "Fast, privacy-friendly PDF tools that work in your browser.",
          }}
        />
        {isValidAdsensePublisherId(settings.google_adsense_publisher_id) ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.google_adsense_publisher_id}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <PageAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
