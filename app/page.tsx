import { Hero } from "@/components/home/Hero";
import { ToolGrid } from "@/components/home/ToolGrid";
import { PrivacySection } from "@/components/home/PrivacySection";
import { Faq } from "@/components/ui/Faq";

const homeFaq = [
  {
    question: "Do I need to create an account?",
    answer:
      "No. Every tool on OnlyPDF works without signing up or logging in. Just open a tool and use it.",
  },
  {
    question: "Are my PDF files uploaded to your servers?",
    answer:
      "For these six tools, no. Processing happens in your browser, so your file stays on your device the whole time.",
  },
  {
    question: "Is OnlyPDF really free?",
    answer:
      "Yes. The core tools are free to use, with no hidden limits designed to push you toward a paid plan.",
  },
  {
    question: "Which browsers and devices are supported?",
    answer:
      "OnlyPDF works in current versions of Chrome, Firefox, Safari, and Edge, on both desktop and mobile.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolGrid />
      <PrivacySection />
      <section className="container-page py-20 md:py-28">
        <Faq items={homeFaq} />
      </section>
    </>
  );
}
