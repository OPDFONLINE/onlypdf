import { Lock, WifiOff, UserX, Scissors, RotateCw, Combine, ListOrdered, Eraser, FileText } from "lucide-react";

const trustPoints = [
  { icon: UserX, label: "No sign-up" },
  { icon: Lock, label: "Files stay on your device" },
  { icon: WifiOff, label: "Works without an upload" },
];

export function Hero() {
  return (
    <section className="container-page grid items-center gap-12 pb-20 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pb-28 md:pt-20">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-accent-soft px-3 py-1 text-xs font-bold text-accent-dark">
          Free PDF tools, zero sign-up
        </span>
        <h1 className="mt-5 max-w-xl text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-[3.4rem]">
          Simple PDF tools that work right in your browser.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
          Merge, split, compress, convert, edit, and clean up PDF and Word files
          without signing up.
        </p>

        <ul className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
          {trustPoints.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink-muted">
              <Icon size={16} className="text-accent" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto hidden aspect-square w-full max-w-sm md:block">
        {/* Blurred color blobs */}
        <div className="absolute -left-6 top-4 h-40 w-40 rounded-full bg-sky-soft blur-2xl" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-pink-soft blur-2xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-8 h-44 w-44 rounded-full bg-amber-soft blur-2xl" aria-hidden="true" />

        {/* Document card */}
        <div className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] rounded-card border-2 border-border bg-surface p-5 shadow-lift">
          <div className="h-2.5 w-16 rounded-full bg-accent" />
          <div className="mt-4 h-2 w-full rounded-full bg-paper" />
          <div className="mt-2.5 h-2 w-5/6 rounded-full bg-paper" />
          <div className="mt-2.5 h-2 w-4/6 rounded-full bg-paper" />
          <div className="mt-2.5 h-2 w-full rounded-full bg-paper" />
          <div className="mt-2.5 h-2 w-3/6 rounded-full bg-paper" />
        </div>

        {/* Floating icon badges */}
        <div
          className="absolute left-2 top-10 flex h-14 w-14 rotate-[-10deg] items-center justify-center rounded-2xl bg-coral text-white shadow-lift"
          aria-hidden="true"
        >
          <Scissors size={24} strokeWidth={2.25} />
        </div>
        <div
          className="absolute right-1 top-16 flex h-12 w-12 rotate-[8deg] items-center justify-center rounded-2xl bg-sky text-white shadow-lift"
          aria-hidden="true"
        >
          <RotateCw size={20} strokeWidth={2.25} />
        </div>
        <div
          className="absolute bottom-14 right-0 flex h-14 w-14 rotate-[10deg] items-center justify-center rounded-2xl bg-accent text-white shadow-lift"
          aria-hidden="true"
        >
          <Combine size={24} strokeWidth={2.25} />
        </div>
        <div
          className="absolute bottom-4 left-0 flex h-12 w-12 rotate-[-8deg] items-center justify-center rounded-2xl bg-pink text-white shadow-lift"
          aria-hidden="true"
        >
          <ListOrdered size={20} strokeWidth={2.25} />
        </div>
        <div className="absolute left-10 bottom-24 flex h-11 w-11 rotate-[8deg] items-center justify-center rounded-2xl bg-teal text-white shadow-lift" aria-hidden="true">
          <Eraser size={19} strokeWidth={2.25} />
        </div>
        <div className="absolute right-14 bottom-3 flex h-11 w-11 rotate-[-8deg] items-center justify-center rounded-2xl bg-amber text-white shadow-lift" aria-hidden="true">
          <FileText size={19} strokeWidth={2.25} />
        </div>
      </div>
    </section>
  );
}
