import Hero from "@/components/landing/Hero";
import WhyYouNeed from "@/components/landing/WhyYouNeed";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
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

export default function Home() {
  return (
    <>
      <Hero />
      <InlineDisclaimer />
      <WhyYouNeed />
      <HowItWorks />
      <Features />
      <Disclaimer />
    </>
  );
}
