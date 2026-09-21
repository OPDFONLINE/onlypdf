import { Lock, WifiOff, UserX } from "lucide-react";

const trustPoints = [
  { icon: UserX, label: "No sign-up" },
  { icon: Lock, label: "Files stay on your device" },
  { icon: WifiOff, label: "Works without an upload" },
];

export function Hero() {
  return (
    <section className="container-page grid items-center gap-12 pb-20 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pb-28 md:pt-20">
      <div>
        <h1 className="max-w-xl text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-[3.25rem]">
          Simple PDF tools that work right in your browser.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
          Merge, split, extract, rearrange, and rotate PDF files without
          signing up.
        </p>

        <ul className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
          {trustPoints.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm text-ink-muted">
              <Icon size={16} className="text-accent" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto hidden aspect-square w-full max-w-sm md:block">
        <HeroIllustration />
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 360 360"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="70"
        y="60"
        width="170"
        height="220"
        rx="10"
        fill="#FFFFFF"
        stroke="#E1E3DC"
        transform="rotate(-8 155 170)"
      />
      <rect
        x="95"
        y="80"
        width="170"
        height="220"
        rx="10"
        fill="#FFFFFF"
        stroke="#E1E3DC"
        transform="rotate(5 180 190)"
      />
      <rect x="120" y="100" width="170" height="220" rx="10" fill="#FFFFFF" stroke="#2B5F5C" strokeWidth="2" />
      <g transform="translate(120 100)">
        <rect x="24" y="34" width="96" height="10" rx="5" fill="#E1ECEA" />
        <rect x="24" y="56" width="122" height="10" rx="5" fill="#F3F4EF" />
        <rect x="24" y="78" width="122" height="10" rx="5" fill="#F3F4EF" />
        <rect x="24" y="100" width="80" height="10" rx="5" fill="#F3F4EF" />
        <circle cx="72" cy="168" r="34" fill="#2B5F5C" />
        <path
          d="M56 168l11 11 21-24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
