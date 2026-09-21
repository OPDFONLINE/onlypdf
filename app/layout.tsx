import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onlypdf.online"),
  title: {
    default: "OnlyPDF \u2014 Simple PDF Tools. Right in Your Browser.",
    template: "%s \u2014 OnlyPDF",
  },
  description:
    "Free PDF tools that run in your browser. Merge, split, extract, rearrange, and rotate PDF files with no sign-up and no file uploads.",
  openGraph: {
    title: "OnlyPDF \u2014 Simple PDF Tools. Right in Your Browser.",
    description:
      "Free PDF tools that run in your browser. Merge, split, extract, rearrange, and rotate PDF files with no sign-up and no file uploads.",
    url: "https://onlypdf.online",
    siteName: "OnlyPDF",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlyPDF \u2014 Simple PDF Tools. Right in Your Browser.",
    description:
      "Free PDF tools that run in your browser. No sign-up, no file uploads.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
