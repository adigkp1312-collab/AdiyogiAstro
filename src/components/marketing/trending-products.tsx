"use client";

import Image from "next/image";
import { ExternalLink, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const trendingProducts = [
  {
    title: "वार्षिक राशिफल 2026",
    titleEn: "Yearly Rashifal 2026",
    category: "Book",
    price: "₹199",
    originalPrice: "₹350",
    discount: "-43%",
    image: "/products/yearly-rashifal.svg",
    amazonQuery: "yearly+rashifal+2026+hindi+astrology+book",
    tag: "NEW",
  },
  {
    title: "नवरत्न ब्रेसलेट",
    titleEn: "Navratna Bracelet",
    category: "Gemstone",
    price: "₹1,299",
    originalPrice: "₹2,500",
    discount: "-48%",
    image: "/products/navratna-bracelet.svg",
    amazonQuery: "navratna+bracelet+original+certified+astrology",
    tag: "BESTSELLER",
  },
  {
    title: "रुद्राक्ष माला",
    titleEn: "Rudraksha Mala",
    category: "Spiritual",
    price: "₹499",
    originalPrice: "₹999",
    discount: "-50%",
    image: "/products/rudraksha-mala.svg",
    amazonQuery: "original+rudraksha+mala+5+mukhi+certified",
    tag: "POPULAR",
  },
  {
    title: "कुंडली सॉफ्टवेयर",
    titleEn: "Kundli Software Pro",
    category: "Software",
    price: "₹599",
    originalPrice: "₹1,200",
    discount: "-50%",
    image: "/products/kundli-software.svg",
    amazonQuery: "kundli+software+astrology+hindi+professional",
    tag: "-50%",
  },
  {
    title: "शनि यंत्र",
    titleEn: "Shani Yantra",
    category: "Yantra",
    price: "₹349",
    originalPrice: "₹699",
    discount: "-50%",
    image: "/products/shani-yantra.svg",
    amazonQuery: "shani+yantra+original+energized+brass",
    tag: null,
  },
  {
    title: "ज्योतिष शास्त्र",
    titleEn: "Jyotish Shastra Book",
    category: "Book",
    price: "₹299",
    originalPrice: "₹500",
    discount: "-40%",
    image: "/products/jyotish-shastra.svg",
    amazonQuery: "jyotish+shastra+vedic+astrology+book+hindi",
    tag: null,
  },
  {
    title: "गोमेद रत्न",
    titleEn: "Gomed (Hessonite)",
    category: "Gemstone",
    price: "₹2,499",
    originalPrice: "₹4,999",
    discount: "-50%",
    image: "/products/gomed-stone.svg",
    amazonQuery: "gomed+stone+original+certified+hessonite+rahu",
    tag: "CERTIFIED",
  },
  {
    title: "पंचांग 2026",
    titleEn: "Panchang 2026",
    category: "Book",
    price: "₹150",
    originalPrice: "₹250",
    discount: "-40%",
    image: "/products/panchang-2026.svg",
    amazonQuery: "panchang+2026+hindi+calendar+astrology",
    tag: "NEW",
  },
];

function ProductCard({ product }: { product: (typeof trendingProducts)[0] }) {
  const { t } = useLanguage();
  return (
    <a
      href={`https://www.amazon.in/s?k=${product.amazonQuery}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-w-[130px] shrink-0 flex-col overflow-hidden rounded border border-orange-200 bg-white shadow-sm transition-all hover:border-[#FF6600] hover:shadow-md sm:min-w-0"
    >
      {/* Image area */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="flex h-full items-center justify-center p-2">
          <Image
            src={product.image}
            alt={product.titleEn}
            width={80}
            height={100}
            className="h-full w-auto object-contain transition-transform group-hover:scale-105"
          />
        </div>
        {product.tag && (
          <span className="absolute left-1 top-1 rounded bg-[#FF6600] px-1.5 py-px text-[8px] font-bold text-white">
            {product.tag}
          </span>
        )}
        {product.discount && (
          <span className="absolute right-1 top-1 rounded bg-green-600 px-1 py-px text-[8px] font-bold text-white">
            {product.discount}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#FF6600]">
          {product.category}
        </p>
        <h3 className="mt-0.5 text-xs font-bold leading-tight text-gray-900">
          {product.title}
        </h3>
        <p className="text-[10px] text-gray-500">{product.titleEn}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-sm font-bold text-[#FF6600]">
            {product.price}
          </span>
          <span className="text-[10px] text-gray-400 line-through">
            {product.originalPrice}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-[9px] text-gray-400 group-hover:text-[#FF6600]">
          <ExternalLink className="size-2.5" />
          <span>{t("trending.buyOnAmazon")}</span>
        </div>
      </div>
    </a>
  );
}

export function TrendingProducts() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden border-t border-orange-200 bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-white py-6">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-20 top-0 size-44 rounded-full bg-orange-100/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 size-36 rounded-full bg-amber-100/20 blur-2xl" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 text-center">
          <div className="mb-1 flex items-center justify-center gap-1.5">
            <TrendingUp className="size-4 text-[#FF6600]" />
            <h2 className="text-lg font-extrabold text-[#FF6600] sm:text-xl">
              {t("trending.title")}
            </h2>
          </div>
          <div className="mx-auto flex w-fit items-center gap-1">
            <span className="h-0.5 w-8 rounded bg-gradient-to-r from-transparent to-[#FF6600]" />
            <span className="text-sm text-[#FF6600]">☸</span>
            <span className="h-0.5 w-8 rounded bg-gradient-to-l from-transparent to-[#FF6600]" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {t("trending.subtitle")}
          </p>
        </div>

        {/* Product Grid - horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible md:grid-cols-4 lg:grid-cols-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.titleEn} product={product} />
          ))}
        </div>

        {/* View All on Amazon */}
        <div className="mt-4 text-center">
          <a
            href="https://www.amazon.in/s?k=astrology+jyotish+vedic+books+gemstones+yantra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#FF6600] px-4 py-1.5 text-xs font-bold text-[#FF6600] transition-all hover:bg-[#FF6600] hover:text-white"
          >
            {t("trending.viewAllAmazon")}
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
