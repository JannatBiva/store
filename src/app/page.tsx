import Container from "@/components/ui/Container";
import BannerHero from "@/components/shop/BannerHero";
import BannerSlider, { type Slide } from "@/components/shop/BannerSlider";
import ProductCard from "@/components/shop/ProductCard";
import CategoryChips from "@/components/shop/CategoryChips";
import ScrollableProducts from "@/components/shop/ScrollableProducts";
import Link from "next/link";
import { demoProducts } from "@/data/demoProducts";

export default function Home() {
  const slides: Slide[] = [
    {
      src: "/image/banners/banner.png",
      alt: "Happy shopper with bags",
      heading: "Shop Eco-Friendly\nProducts",
      subheading: "Ethnic sarees & sustainable goods from trusted sellers.",
      ctaLabel: "Shop now",
      ctaHref: "/shop",
    },
    {
      src: "/image/banners/banner 2.png",
      alt: "Happy shopper with bags",
      heading: "Handmade • Ethical • Local",
      subheading: "Discover unique crafts and planet-friendly essentials.",
    },
  ];

  // Featured = first 8; Hot Deals = items with a discount
  const featured = demoProducts.slice(0, 8);
  const hotDeals = demoProducts.filter((p: any) => Number(p?.discountPct) > 0).slice(0, 8);

  return (
    <Container>
      <div className="py-6 space-y-8">
        {/* Mobile: simple hero */}
        <div className="md:hidden">
          <BannerHero />
        </div>

        {/* Desktop/tablet: slider */}
        <div className="hidden md:block">
          <BannerSlider
            slides={slides}
            intervalMs={5000}
            className="mt-2"
            rounded="rounded-3xl"
            aspect="aspect-[16/6] lg:aspect-[24/7]"
            showArrows
            showDots
          />
        </div>

        <CategoryChips />


        {/* Featured */}
        <ScrollableProducts title="Featured Items" href="/shop" items={featured} />

        {/* Hot Deals */}
        {hotDeals.length > 0 && (
          <ScrollableProducts title="Hot Deals" href="/deals" items={hotDeals} />
        )}
      </div>
    </Container>
  );
}
