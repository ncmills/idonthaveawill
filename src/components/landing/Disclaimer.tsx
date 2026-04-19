import Link from "next/link";

export default function Disclaimer() {
  return (
    <section className="py-20 md:py-24 bg-[var(--color-cream)]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <hr className="iha-rule flex-1" />
          <span className="iha-caps">A note on the document</span>
          <hr className="iha-rule flex-1" />
        </div>

        <div className="pl-6 md:pl-8 border-l border-[var(--color-ink)]">
          <h2 className="font-[family-name:var(--font-display)] italic text-[26px] md:text-[30px] font-medium text-[var(--color-ink)] tracking-[-0.005em]">
            Important — please read.
          </h2>

          <div className="mt-6 space-y-5 text-[15px] text-[var(--color-ink)] leading-[1.75]">
            <p>
              <strong className="font-semibold text-[var(--color-ink)]">This is not legal advice.</strong>{" "}
              idonthaveawill.com is a self-help document preparation tool, not a
              law firm and not a substitute for an attorney. We do not provide
              legal advice, legal opinions, or legal representation of any kind.
            </p>

            <p>
              This tool generates a{" "}
              <em className="font-[family-name:var(--font-display)] not-italic font-semibold">
                draft
              </em>{" "}
              will based on information you provide. It is your starting point,
              not your finish line.{" "}
              <strong className="font-semibold">
                We strongly recommend that you have your draft reviewed by a
                licensed attorney in your state before signing it.
              </strong>{" "}
              An attorney can ensure the document meets your specific needs,
              accounts for your full financial picture, and complies with your
              state&apos;s current laws.
            </p>

            <p>
              Every state has its own requirements for making a will legally
              valid — including specific rules about witnesses, notarization,
              and execution. Some states require notarization. Some require
              witnesses to be present at the same time. These steps vary and
              matter.{" "}
              <strong className="font-semibold">
                A will that is not properly executed under your state&apos;s
                law may be invalid.
              </strong>
            </p>

            <p>
              This tool is not appropriate for complex situations including
              estates with business interests, significant assets, tax planning
              needs, special needs beneficiaries, assets in multiple states or
              countries, or ongoing litigation. If any of these apply to you,
              please consult an estate planning attorney directly.
            </p>

            <p className="text-[14px] text-[var(--color-ink-soft)] pt-2">
              By using this tool, you acknowledge that you have read and
              understood this disclaimer. See our full{" "}
              <Link
                href="/terms"
                className="underline decoration-[var(--color-rule)] underline-offset-4 hover:decoration-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors"
              >
                Terms of Service
              </Link>{" "}
              for more information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
