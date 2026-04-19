import Link from "next/link";

export default function PreviewWill() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-cream)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.35fr] gap-12 md:gap-16 items-start">
          {/* Editorial caption */}
          <div className="md:sticky md:top-24">
            <p className="iha-caps">A sample page</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[34px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
              What you&apos;ll
              <br />
              <span className="italic font-medium">actually receive.</span>
            </h2>
            <p className="mt-6 text-[16px] text-[var(--color-ink-soft)] leading-relaxed max-w-md">
              A plainly formatted draft, prepared for your state, printed on
              letter-sized paper. No watermarks. No branding. Just a document
              you can take to an attorney, a notary, or a pair of witnesses.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/create"
                className="font-[family-name:var(--font-display)] italic text-[17px] text-[var(--color-ink)] underline decoration-[var(--color-sage)] decoration-[1.5px] underline-offset-[6px] hover:decoration-[var(--color-ink)] transition-colors"
              >
                Draft yours now
              </Link>
              <span className="text-[var(--color-rule)]" aria-hidden="true">·</span>
              <span className="iha-caps">~ ten minutes</span>
            </div>
          </div>

          {/* Document card — typewriter aesthetic */}
          <div className="relative">
            {/* Soft drop shadow — paper on paper */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 bg-[var(--color-cream-deep)] translate-x-2 translate-y-3"
            />

            <article
              aria-label="Sample will draft preview"
              className="relative bg-white border border-[var(--color-rule)] p-8 md:p-12 font-[family-name:var(--font-mono)] text-[12.5px] md:text-[13px] text-[var(--color-ink)] leading-[1.75]"
            >
              {/* Page marker */}
              <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)] pb-6 mb-6 border-b border-[var(--color-rule)]">
                <span>Draft · Not for Execution</span>
                <span>Page 1 of 7</span>
              </div>

              <h3 className="text-center font-[family-name:var(--font-display)] text-[22px] md:text-[24px] font-medium tracking-wide text-[var(--color-ink)]">
                LAST WILL AND TESTAMENT
              </h3>
              <p className="mt-2 text-center text-[11px] tracking-[0.25em] uppercase text-[var(--color-ink-soft)]">
                of [Your Full Legal Name]
              </p>

              <hr className="iha-rule my-8" />

              <p>
                I,{" "}
                <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                  [Your Full Legal Name]
                </span>
                , a resident of{" "}
                <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                  [City]
                </span>
                , in the State of{" "}
                <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                  [Your State]
                </span>
                , being of sound mind and memory, do hereby make, publish, and
                declare this to be my Last Will and Testament, revoking all
                prior wills and codicils previously made by me.
              </p>

              <h4 className="mt-8 font-medium tracking-wide text-[13px]">
                ARTICLE I &mdash; APPOINTMENT OF EXECUTOR
              </h4>
              <p className="mt-3">
                I hereby nominate and appoint{" "}
                <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                  [Executor&apos;s Name]
                </span>{" "}
                to serve as the Executor of this, my Last Will and Testament.
                Should they be unable or unwilling to serve, I appoint{" "}
                <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                  [Alternate Executor]
                </span>{" "}
                as successor Executor. I direct that no bond shall be required
                of either appointee.
              </p>

              <h4 className="mt-8 font-medium tracking-wide text-[13px]">
                ARTICLE II &mdash; PAYMENT OF DEBTS
              </h4>
              <p className="mt-3">
                I direct my Executor to pay from my estate all of my legally
                enforceable debts, funeral expenses, and the costs of
                administration of my estate, as soon after my death as is
                practicable.
              </p>

              <h4 className="mt-8 font-medium tracking-wide text-[13px]">
                ARTICLE III &mdash; SPECIFIC BEQUESTS
              </h4>
              <p className="mt-3">
                I give and bequeath the following items of personal property:
              </p>
              <ul className="mt-3 space-y-2 pl-6 list-[lower-roman]">
                <li>
                  To{" "}
                  <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                    [Beneficiary Name]
                  </span>
                  , my{" "}
                  <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                    [Item Description]
                  </span>
                  , if they survive me.
                </li>
                <li className="opacity-60">…</li>
              </ul>

              {/* Fade into next page */}
              <div className="relative mt-10 pt-6 border-t border-dashed border-[var(--color-rule)]">
                <p className="text-center text-[10px] tracking-[0.25em] uppercase text-[var(--color-ink-soft)]">
                  — continues through Article VII —
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
