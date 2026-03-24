import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for idonthaveawill.com. Your data never leaves your browser. We do not collect, store, or transmit any personal information.",
  alternates: {
    canonical: "https://idonthaveawill.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[var(--color-brand)] mb-8">
        Privacy Policy
      </h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-brand)]">
            Your Data Stays on Your Device
          </h2>
          <p className="text-gray-600 leading-relaxed">
            idonthaveawill.com is designed with privacy as a core principle. All
            information you enter — your name, family details, beneficiaries, and
            everything else — stays entirely on your device. We do not collect,
            store, transmit, or have access to any of the data you provide.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-brand)]">
            How It Works
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your will is generated entirely within your web browser using
            JavaScript. Your answers are stored temporarily in your
            browser&apos;s session storage so you don&apos;t lose progress if you
            refresh the page. This data is automatically cleared when you close
            your browser tab. No data is ever sent to our servers or any third
            party.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-brand)]">
            No Accounts, No Tracking
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not require you to create an account. We do not use cookies
            for tracking. We do not use analytics services that track individual
            users. We do not sell data because we do not have any data to sell.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-brand)]">
            Contact
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions about this privacy policy, contact us at
            privacy@idonthaveawill.com.
          </p>
        </section>
      </div>
    </div>
  );
}
