import { Hero } from "@/components/marketing/hero";
import { StatusSection } from "@/components/marketing/status-section";
import { ZodiacSection } from "@/components/marketing/zodiac-section";
import { CountriesSection } from "@/components/marketing/countries-section";
import { FiguresSection } from "@/components/marketing/figures-section";
import { DaivikSection } from "@/components/marketing/daivik-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatusSection />
      <ZodiacSection />
      <CountriesSection />
      <FiguresSection />
      <DaivikSection />
    </>
  );
}
