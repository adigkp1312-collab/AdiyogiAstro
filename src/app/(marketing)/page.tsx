import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { Testimonials } from "@/components/marketing/testimonials";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { TrendingProducts } from "@/components/marketing/trending-products";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <PricingCards />
      <TrendingProducts />
    </>
  );
}
