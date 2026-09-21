import { ShieldCheck, Zap, Gift } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Your files stay yours",
    body: "Supported tools process your PDF directly in your browser, so the file itself is never sent to a server.",
    badgeBg: "bg-teal-soft",
    badgeText: "text-teal",
  },
  {
    icon: Zap,
    title: "Built to be fast",
    body: "No accounts to create, no queues to wait in. Pick a tool, drop in a file, and get your result right away.",
    badgeBg: "bg-amber-soft",
    badgeText: "text-amber",
  },
  {
    icon: Gift,
    title: "Free, with no catch",
    body: "The core tools are free to use, with no sign-up and no hidden limits designed to push you toward a paid plan.",
    badgeBg: "bg-pink-soft",
    badgeText: "text-pink",
  },
];

export function PrivacySection() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="container-page">
        <h2 className="max-w-md text-2xl sm:text-3xl">
          Why people stick with OnlyPDF
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {points.map(({ icon: Icon, title, body, badgeBg, badgeText }) => (
            <div
              key={title}
              className="rounded-card border-2 border-border bg-paper p-6"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${badgeBg} ${badgeText}`}
              >
                <Icon size={20} aria-hidden="true" strokeWidth={2.25} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
