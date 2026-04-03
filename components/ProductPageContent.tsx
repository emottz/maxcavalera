"use client";

import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/lib/api";

interface Size {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  product: Product;
  price: string;
  regularPrice: string | null;
  sizes: Size[];
  description: string;
}

export default function ProductPageContent({ product, price, regularPrice, sizes, description }: Props) {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-[10px] tracking-wider text-[#999] uppercase">
          <Link href="/" className="hover:text-[#111] transition-colors">{t((s) => s.product.breadHome)}</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#111] transition-colors">{t((s) => s.product.breadShop)}</Link>
          {product.categories[0] && (
            <>
              <span>/</span>
              <Link
                href={`/shop?category=${product.categories[0].slug}`}
                className="hover:text-[#111] transition-colors"
              >
                {product.categories[0].name}
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Product layout */}
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={product.images} name={product.name} />

          <div className="lg:pt-6 lg:max-w-md">
            <p className="text-[10px] tracking-widest uppercase text-[#999] mb-3">
              {t((s) => s.product.brand)}
            </p>

            <h1 className="text-2xl md:text-3xl font-light text-[#111] leading-snug mb-6">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-xl text-[#111]">{price}</span>
              {regularPrice && (
                <span className="text-sm text-[#999] line-through">{regularPrice}</span>
              )}
            </div>

            {description && (
              <p className="text-sm text-[#666] leading-relaxed mb-8 border-t border-[#E8E8E8] pt-8">
                {description}
              </p>
            )}

            <ProductActions slug={product.slug} sizes={sizes} />

            <div className="mt-10 space-y-3 border-t border-[#E8E8E8] pt-8">
              {t((s) => s.product.trust).map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-[#ccc] rounded-full" />
                  <span className="text-xs text-[#999] tracking-wider">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
