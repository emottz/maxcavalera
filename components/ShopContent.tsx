"use client";

import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import ShopFilters from "@/components/ShopFilters";
import { useLanguage } from "@/context/LanguageContext";
import type { Product, Category } from "@/lib/api";

interface Props {
  products: Product[];
  categories: Category[];
  categorySlug?: string;
  page: number;
  hasMore: boolean;
}

export default function ShopContent({ products, categories, categorySlug, page, hasMore }: Props) {
  const { t } = useLanguage();

  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const catMeta = activeCategory
    ? t((s) => s.categories)[activeCategory.slug as keyof typeof import("@/lib/translations").translations.tr.categories]
    : null;

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="border-b border-[#E8E8E8] bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <p className="text-[10px] tracking-widest uppercase text-[#999] mb-2">
            {activeCategory ? t((s) => s.shop.categoryLabel) : t((s) => s.shop.allCollection)}
          </p>
          <h1 className="text-3xl font-light text-[#111]">
            {catMeta?.label ?? activeCategory?.name ?? t((s) => s.shop.title)}
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex gap-10">
          <aside className="hidden lg:block w-52 shrink-0">
            <ShopFilters categories={categories} active={categorySlug} />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs text-[#999] tracking-wider">
                {t((s) => s.shop.showing)(products.length)}
              </p>
            </div>
            <ProductGrid products={products} />

            {hasMore && (
              <div className="flex justify-center mt-16">
                <Link
                  href={`/shop?${new URLSearchParams({
                    ...(categorySlug ? { category: categorySlug } : {}),
                    page: String(page + 1),
                  })}`}
                  className="text-[11px] tracking-widest uppercase border border-[#111] text-[#111] px-10 py-4 hover:bg-[#111] hover:text-white transition-colors"
                >
                  {t((s) => s.shop.loadMore)}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
