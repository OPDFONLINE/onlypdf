import { Hero } from "@/components/home/Hero";
import { ToolGrid } from "@/components/home/ToolGrid";
import { PrivacySection } from "@/components/home/PrivacySection";
import { SeoContent } from "@/components/home/SeoContent";
import { CtaBand } from "@/components/home/CtaBand";
import { Faq } from "@/components/ui/Faq";
import { getSiteSettings } from "@/lib/supabase/settings";

const homeFaq = [
  {
    question: "Do I need to create an account?",
    answer:
      "No. Every tool on OnlyPDF works without signing up or logging in. Just open a tool and use it.",
  },
  {
    question: "Are my PDF files uploaded to your servers?",
    answer:
      "No. Processing happens in your browser, so your file stays on your device the whole time.",
  },
  {
    question: "Is OnlyPDF really free?",
    answer:
      "Yes. The core tools are free to use, with no hidden limits designed to push you toward a paid plan.",
  },
  {
    question: "Can I compress a PDF to a specific file size?",
    answer:
      "Yes. Compress PDF offers High, Medium, and Express automatic modes, plus a target-size mode where you can enter a maximum size such as 10 MB or 800 KB.",
  },
  {
    question: "Which browsers and devices are supported?",
    answer:
      "OnlyPDF works in current versions of Chrome, Firefox, Safari, and Edge, on both desktop and mobile.",
  },
];

export default async function HomePage() {
  const settings = await getSiteSettings();
  return (
    <>
      <Hero tagline={settings.site_tagline} />
      <ToolGrid />
      <PrivacySection />
      <SeoContent />
      <section className="container-page py-20 md:py-28">
        <Faq items={homeFaq} />
      </section>
      <CtaBand />
    </>
  );
}
