import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";
import { getSiteSettings } from "@/lib/supabase/settings";
import { JsonLd } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.homepage_title || "OnlyPDF — Simple PDF Tools. Right in Your Browser.";
  const description = settings.homepage_description ||
    "Free PDF tools that run in your browser. Merge, split, compress, edit, convert PDF and Word files, and remove selected watermark areas in your browser, with no sign-up and no file uploads.";

  return {
    metadataBase: new URL("https://onlypdf.online"),
    title: { default: title, template: "%s — OnlyPDF" },
    description,
    openGraph: { title, description, url: "https://onlypdf.online", siteName: settings.site_name || "OnlyPDF", locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <PageAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
