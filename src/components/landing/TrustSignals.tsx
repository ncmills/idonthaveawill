const stats = [
  { figure: "100%", label: "Free, forever" },
  { figure: "51", label: "Jurisdictions" },
  { figure: "10 min", label: "To complete" },
  { figure: "0", label: "Data on our servers" },
];

export default function TrustSignals() {
  return (
    <section className="bg-[var(--color-cream)] py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 md:px-6 py-4 md:py-2 text-center md:text-left ${
                i > 0 ? "md:border-l md:border-[var(--color-rule)]" : ""
              }`}
            >
              <div className="iha-figure text-[34px] md:text-[40px]">
                {s.figure}
              </div>
              <div className="iha-caps mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
