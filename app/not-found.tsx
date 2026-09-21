import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-28 text-center">
      <p className="font-display text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-sm text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist, or may have
        moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-card bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
      >
        Back to homepage
      </Link>
    </div>
  );
}
