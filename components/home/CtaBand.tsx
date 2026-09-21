import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="container-page pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-accent via-accent to-pink px-8 py-14 text-center shadow-lift sm:px-14">
        <div
          className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -right-10 h-52 w-52 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <h2 className="relative text-2xl text-white sm:text-3xl">
          Pick a tool and get it done in under a minute.
        </h2>
        <p className="relative mx-auto mt-3 max-w-sm text-white/85">
          No account, no waiting room, no catch.
        </p>
        <Link
          href="/tools"
          className="relative mt-7 inline-flex items-center gap-1.5 rounded-pill bg-white px-6 py-3 text-sm font-bold text-accent-dark transition-transform hover:-translate-y-0.5"
        >
          Browse all tools
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
