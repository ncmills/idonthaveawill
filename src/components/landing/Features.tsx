const features = [
  {
    roman: "i",
    title: "All 50 states + DC",
    description: "Formatted based on each state's requirements.",
  },
  {
    roman: "ii",
    title: "Your will is always free",
    description: "No hidden fees. Optional add-ons for related documents.",
  },
  {
    roman: "iii",
    title: "No account needed",
    description: "We don't store your data. Period.",
  },
  {
    roman: "iv",
    title: "Your data stays on your device",
    description: "Nothing is sent to a server.",
  },
  {
    roman: "v",
    title: "Plain English",
    description: "Every question is written so anyone can understand it.",
  },
  {
    roman: "vi",
    title: "State-specific guidance",
    description: "Shows your state's witness, notarization, and signing requirements.",
  },
];

export default function Features() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-cream)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center">
          <p className="iha-caps">On the imprint</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[34px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
            How this tool helps.
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 max-w-4xl mx-auto">
          {features.map((f) => (
            <div key={f.roman} className="border-t border-[var(--color-rule)] pt-6">
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-display)] italic text-[var(--color-sage)] text-[17px] tracking-wide">
                  {f.roman}.
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[19px] font-medium text-[var(--color-ink)] leading-snug">
                  {f.title}
                </h3>
              </div>
              <p className="mt-3 text-[14.5px] text-[var(--color-ink-soft)] leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
