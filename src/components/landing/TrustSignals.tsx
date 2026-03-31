export default function TrustSignals() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[var(--color-brand)]">100%</div>
            <p className="mt-1 text-sm text-gray-500">Free, forever</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--color-brand)]">51</div>
            <p className="mt-1 text-sm text-gray-500">Jurisdictions covered</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--color-brand)]">10 min</div>
            <p className="mt-1 text-sm text-gray-500">Average completion time</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--color-brand)]">0 data</div>
            <p className="mt-1 text-sm text-gray-500">Stored on our servers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
