"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/TranslatedText";
import type { Product, Category } from "@/lib/api";

interface Props {
  products: Product[];
  categories: Category[];
  catImageMap: Record<string, string | null>;
  secondProduct: Product | null;
}

export default function HomeContent({ products, categories, catImageMap, secondProduct }: Props) {
  const { t } = useLanguage();

  return (
    <>
      {/* MARQUEE BAND */}
      <div className="overflow-hidden border-y border-[#E8E8E8] py-4 bg-white">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] tracking-widest uppercase text-[#bbb] shrink-0">
              {t((s) => s.marquee)}
            </span>
          ))}
        </div>
      </div>

      {/* KATEGORİLER */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#999] mb-2">
              {t((s) => s.home.categoriesLabel)}
            </p>
            <h2 className="text-2xl font-light tracking-wide text-[#111]">
              {t((s) => s.home.categoriesTitle)}
            </h2>
          </div>
          <Link href="/shop" className="text-[11px] tracking-widest uppercase text-[#999] hover:text-[#111] transition-colors">
            {t((s) => s.home.viewAll)}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 auto-rows-[320px]">
          {categories.map((cat) => {
            const meta = t((s) => s.categories)[cat.slug as keyof typeof import("@/lib/translations").translations.tr.categories];
            const imgSrc = catImageMap[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group relative overflow-hidden bg-[#F2F2F2] flex flex-col justify-end"
              >
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={meta?.label ?? cat.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="relative z-10 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] tracking-widest uppercase text-white/60 mb-1">{cat.count} ürün</p>
                  <p className="text-sm font-light tracking-widest uppercase text-white leading-tight">
                    {meta?.label ?? cat.name}
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {meta?.sub}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      {secondProduct && (
        <section className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#111] flex flex-col justify-center px-10 py-24 order-2 md:order-1">
            <p className="text-[10px] tracking-widest uppercase text-[#666] mb-4">
              {t((s) => s.home.featuredLabel)}
            </p>
            <h2 className="text-3xl font-light text-white leading-snug mb-6 max-w-xs">
              <TranslatedText text={secondProduct.name} />
            </h2>
            <Link
              href={`/product/${secondProduct.slug}`}
              className="self-start text-[11px] tracking-widest uppercase border border-white text-white px-6 py-3 hover:bg-white hover:text-[#111] transition-colors duration-300"
            >
              {t((s) => s.home.featuredCta)}
            </Link>
          </div>
          <div className="relative bg-[#F2F2F2] min-h-[60vh] overflow-hidden order-1 md:order-2">
            <Image
              src="/featured.png"
              alt="Royal Sapphire Gold Embroidered Tuxedo"
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>
      )}

      {/* YENİ ÜRÜNLER */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl font-light tracking-wide text-[#111]">
            {t((s) => s.home.newTitle)}
          </h2>
          <Link href="/shop" className="text-[11px] tracking-widest uppercase text-[#999] hover:text-[#111] transition-colors">
            {t((s) => s.home.viewAll)}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="bg-[#F7F7F7] py-24 px-6 text-center">
        <p className="text-[10px] tracking-widest uppercase text-[#999] mb-6">
          {t((s) => s.home.brandLabel)}
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-[#111] max-w-2xl mx-auto leading-relaxed">
          {t((s) => s.home.brandQuote)}
        </h2>
        <div className="w-12 h-px bg-[#ccc] mx-auto mt-10 mb-10" />
        <Link href="/about" className="text-[11px] tracking-widest uppercase text-[#111] hover:text-[#666] transition-colors">
          {t((s) => s.home.brandCta)}
        </Link>
      </section>
    </>
  );
}
