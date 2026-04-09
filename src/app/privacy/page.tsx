import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for idonthaveawill.com. Your will content never leaves your browser. We collect optional emails and anonymized usage statistics only.",
  alternates: {
    canonical: "https://idonthaveawill.com/privacy",
  },
  robots: {
    index: false,
    follow: true,
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
            What We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            <strong>Email (optional):</strong> If you opt in to annual will
            review reminders, we store your email address and selected state.
            Nothing else. You can unsubscribe at any time.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Anonymous usage statistics:</strong> When you generate a
            will, we collect anonymized, categorical data about your selections
            — for example, which state you selected, your marital status
            category, and whether you included certain provisions (like digital
            assets or pet care). This data contains no names, addresses,
            amounts, or any information that could identify you. We may share
            aggregate statistical reports with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-brand)]">
            What We Never Collect
          </h2>
          <ul className="text-gray-600 leading-relaxed list-disc pl-5 space-y-1">
            <li>Names of any person (you, your spouse, children, beneficiaries, executor)</li>
            <li>Addresses, cities, or counties</li>
            <li>Specific bequest descriptions or dollar amounts</li>
            <li>Any free-text content you enter</li>
            <li>Your IP address</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            <strong>Your will content never leaves your browser.</strong> The
            will document is generated entirely on your device. We cannot see,
            access, or store your will.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-brand)]">
            No Accounts, No Tracking
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not require you to create an account. We do not use cookies
            for tracking. We do not use analytics services that track individual
            users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-brand)]">
            Affiliate Links
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may include links to attorney referral services or state bar
            associations. Some of these may be affiliate links, meaning we
            receive a referral fee if you use the service. We only recommend
            services we believe are legitimate. Clicking a referral link does
            not share any of your personal information with the referral
            partner — only your state (via the URL) is visible to them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-brand)]">
            Contact
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions about this privacy policy, contact us at
            info@idonthaveawill.com.
          </p>
        </section>
      </div>
    </div>
  );
}
