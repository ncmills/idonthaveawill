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
          className="inline-block px-8 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition"
        >
          Draft Your Will
        </Link>
        <Link
          href="/will-requirements"
          className="inline-block px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
        >
          Browse State Requirements
        </Link>
      </div>
    </section>
  );
}
