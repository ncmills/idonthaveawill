import Hero from "@/components/landing/Hero";
import WhyYouNeed from "@/components/landing/WhyYouNeed";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import TrustSignals from "@/components/landing/TrustSignals";
import HomepageEmailCapture from "@/components/landing/HomepageEmailCapture";
import Disclaimer from "@/components/landing/Disclaimer";

function InlineDisclaimer() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong className="text-gray-800">This tool is not legal advice.</strong>{" "}
          idonthaveawill.com helps you prepare a draft will — it is not a law firm
          and is not a substitute for an attorney. We strongly recommend that
          everyone have their will reviewed by their own legal counsel before
          signing.
        </p>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "idonthaveawill.com",
      url: "https://idonthaveawill.com",
      description:
        "A free self-help tool to draft a simple last will and testament. Covers all 50 US states and Washington DC.",
      applicationCategory: "LegalService",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Draft a simple will for any US state",
        "16-step plain-English questionnaire",
        "State-specific witness and notarization guidance",
        "Self-proving affidavit generation",
        "Print-ready document output",
        "PDF and Word document export",
        "100% client-side — no data stored on servers",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need a lawyer to make a will?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No state requires you to hire a lawyer to create a valid will. However, we strongly recommend having your draft reviewed by a licensed attorney, especially if you have a complex estate, blended family, business interests, or significant assets.",
          },
        },
        {
          "@type": "Question",
          name: "How many witnesses do I need to sign my will?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states require 2 witnesses. Pennsylvania is the only state that does not require witnesses at the time of signing (though they are recommended). Louisiana requires 2 witnesses plus a notary. Our tool tells you the exact requirements for your state.",
          },
        },
        {
          "@type": "Question",
          name: "Does my will need to be notarized?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Louisiana is the only state that requires notarization for a standard will to be valid. However, most other states offer a 'self-proving affidavit' — a notarized attachment that speeds up probate. We strongly recommend getting the self-proving affidavit notarized even if it's not required.",
          },
        },
        {
          "@type": "Question",
          name: "Is this tool really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, idonthaveawill.com is completely free. No account is needed, no credit card, and no upsell. Your data stays entirely on your device — nothing is stored on our servers. There is no paid version.",
          },
        },
        {
          "@type": "Question",
          name: "What is a will?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A will (or 'last will and testament') is a legal document that states how you want your property and assets distributed after you die. It can also name a guardian for minor children, an executor to manage your estate, and include specific instructions about debts, digital assets, and funeral wishes.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if I die without a will?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you die without a will (called 'dying intestate'), your state's default laws determine who inherits your property. This usually means your spouse and children split the estate according to a fixed formula — which may not match your wishes. A court will also appoint someone to manage your estate and, if you have minor children, decide who raises them.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to make a will with this tool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most people complete the questionnaire in about 10 minutes. The tool asks plain-English questions about your family, assets, and wishes, then generates a draft will formatted for your state. You can download it as a PDF or Word document immediately.",
          },
        },
        {
          "@type": "Question",
          name: "Is my data safe? Where is my information stored?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your data never leaves your browser. The entire will is generated client-side on your device. We do not store your name, address, beneficiaries, or any personal information on our servers. The only data we collect is anonymous usage statistics (like which state you selected).",
          },
        },
        {
          "@type": "Question",
          name: "Can I edit my will after I create it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can come back and create a new will at any time — the tool is free with no limits. However, if you have already signed your previous will, you should formally revoke it. Most states allow you to revoke a will by creating a new one that explicitly states it revokes all prior wills (which our tool does automatically).",
          },
        },
        {
          "@type": "Question",
          name: "Is a will made with this tool legally valid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This tool generates a properly formatted draft will, but a will is not legally valid until it is properly executed — meaning you must sign it and have it witnessed according to your state's specific requirements. Our tool provides your state's signing checklist. We strongly recommend having an attorney review your draft before signing.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a will if I'm young and healthy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. If you have any assets (a bank account, car, phone), a lease, or especially children, you need a will regardless of age. Without one, a court decides who gets your belongings and who raises your kids. 67% of Americans don't have a will — most because they assume it's only for older or wealthy people.",
          },
        },
        {
          "@type": "Question",
          name: "What's the difference between a will and a trust?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A will takes effect after you die and goes through probate court. A trust takes effect immediately and can avoid probate entirely. Trusts are more complex and typically used for larger estates or specific tax planning. For most people, a simple will is the right starting point. This tool creates wills, not trusts.",
          },
        },
      ],
    },
    {
      "@type": "Organization",
      name: "idonthaveawill.com",
      url: "https://idonthaveawill.com",
      logo: "https://idonthaveawill.com/logo.svg",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <InlineDisclaimer />
      <TrustSignals />
      <WhyYouNeed />
      <HowItWorks />
      <Features />
      <HomepageEmailCapture />
      <Disclaimer />
    </>
  );
}
