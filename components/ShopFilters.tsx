"use client";

import Link from "next/link";
import type { Category } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export default function ShopFilters({
  categories,
  active,
}: {
  categories: Category[];
  active?: string;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase text-[#999] mb-5">
        {t((s) => s.shop.filters)}
      </p>
      <ul className="space-y-3">
        <li>
          <Link
            href="/shop"
            className={`text-xs tracking-wider transition-colors ${
              !active ? "text-[#111] font-medium" : "text-[#999] hover:text-[#111]"
            }`}
          >
            {t((s) => s.shop.allFilter)}
          </Link>
        </li>
        {categories.map((cat) => {
          const catMeta = t((s) => s.categories)[cat.slug as keyof typeof import("@/lib/translations").translations.tr.categories];
          return (
            <li key={cat.slug}>
              <Link
                href={`/shop?category=${cat.slug}`}
                className={`text-xs tracking-wider transition-colors ${
                  active === cat.slug
                    ? "text-[#111] font-medium"
                    : "text-[#999] hover:text-[#111]"
                }`}
              >
                {catMeta?.label ?? cat.name}
                <span className="ml-2 text-[#ccc]">({cat.count})</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
