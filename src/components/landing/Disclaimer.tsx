import Link from "next/link";

export default function Disclaimer() {
  return (
    <section className="py-16 bg-[var(--color-brand)] text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-bold text-center mb-8">
          Important: Please Read
        </h2>

        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-white">This is not legal advice.</strong>{" "}
            idonthaveawill.com is a self-help document preparation tool, not a
            law firm and not a substitute for an attorney. We do not provide
            legal advice, legal opinions, or legal representation of any kind.
          </p>

          <p>
            This tool generates a <strong className="text-white">draft</strong>{" "}
            will based on information you provide. It is your starting point,
            not your finish line.{" "}
            <strong className="text-white">
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
            <strong className="text-white">
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

          <p className="text-sm text-gray-400">
            By using this tool, you acknowledge that you have read and
            understood this disclaimer. See our full{" "}
            <Link href="/terms" className="underline hover:text-white">
              Terms of Service
            </Link>{" "}
            for more information.
          </p>
        </div>
      </div>
    </section>
  );
}
