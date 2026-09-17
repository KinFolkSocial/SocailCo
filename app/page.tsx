import { Hero } from "@/components/sections/Hero";
import { LogoScroller } from "@/components/sections/LogoScroller";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { Services } from "@/components/sections/Services";
import { CTABand } from "@/components/sections/CTABand";
import { WhyUs } from "@/components/sections/WhyUs";
import { StatBand } from "@/components/sections/StatBand";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { JournalTeaser } from "@/components/sections/JournalTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoScroller />
      <IntroStatement />
      <WorkGrid />
      <Services />
      <CTABand />
      <WhyUs />
      <StatBand />
      <TestimonialCarousel />
      <JournalTeaser />
    </>
  );
}
