import Hero from "@/components/landing/Hero";
import WhyYouNeed from "@/components/landing/WhyYouNeed";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Disclaimer from "@/components/landing/Disclaimer";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyYouNeed />
      <HowItWorks />
      <Features />
      <Disclaimer />
    </>
  );
}
