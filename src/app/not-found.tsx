import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-24 md:py-32 text-center">
      <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl font-bold text-[var(--color-brand)]">
        404
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        This page doesn&apos;t exist — but your will should.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/create"
          className="inline-block px-8 py-3 bg-[var(--color-brand)] text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          Create My Will
        </Link>
        <Link
          href="/"
          className="inline-block px-8 py-3 border-2 border-[var(--color-brand)] text-[var(--color-brand)] font-semibold rounded-lg hover:bg-gray-50 transition"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
