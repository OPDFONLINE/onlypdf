import { ShieldCheck, Zap, Gift } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Your files stay yours",
    body: "Supported tools process your PDF directly in your browser, so the file itself is never sent to a server.",
  },
  {
    icon: Zap,
    title: "Built to be fast",
    body: "No accounts to create, no queues to wait in. Pick a tool, drop in a file, and get your result right away.",
  },
  {
    icon: Gift,
    title: "Free, with no catch",
    body: "The core tools are free to use, with no sign-up and no hidden limits designed to push you toward a paid plan.",
  },
];

export function PrivacySection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3 md:py-20">
        {points.map(({ icon: Icon, title, body }) => (
          <div key={title}>
            <Icon size={22} className="text-accent" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-medium text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
