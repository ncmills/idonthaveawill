import Link from "next/link";

const steps = [
  {
    number: "I",
    title: "Answer a few simple questions",
    description:
      "We ask plain-English questions about your family, your stuff, and your wishes. No legal jargon. Takes about ten minutes.",
  },
  {
    number: "II",
    title: "We draft a will for you to review",
    description:
      "Based on your answers, we generate a draft will formatted for your state. You review every word before anything is finalized.",
  },
  {
    number: "III",
    title: "Print, sign, and follow your state's steps",
    description:
      "We provide a checklist of what your state requires — witnesses, notarization, and more. Have an attorney review your draft, then complete the steps to make it official.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-cream-deep)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center">
          <p className="iha-caps">Chapter Two</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[34px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
            It&apos;s easier than you think.
          </h2>
          <p className="mt-4 font-[family-name:var(--font-display)] italic text-[18px] text-[var(--color-ink-soft)]">
            Three steps to get your draft started.
          </p>
        </div>

        <ol className="mt-20 grid md:grid-cols-3 gap-10 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.number} className="relative">
              {/* Vertical rule between steps on desktop */}
              {i > 0 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute -left-3 top-2 bottom-0 w-px bg-[var(--color-rule)]"
                />
              )}

              <div className="md:pl-4">
                <span className="font-[family-name:var(--font-display)] italic text-[20px] text-[var(--color-sage-deep)] tracking-wide">
                  {step.number}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[24px] md:text-[26px] font-medium text-[var(--color-ink)] leading-[1.25]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20 text-center">
          <p className="font-[family-name:var(--font-display)] italic text-[17px] text-[var(--color-ink-soft)] mb-6">
            Ready? It takes ten minutes.
          </p>
          <Link href="/create" className="iha-seal">
            <span className="iha-seal-mark" aria-hidden="true" />
            Begin the Draft
          </Link>
        </div>
      </div>
    </section>
  );
}
