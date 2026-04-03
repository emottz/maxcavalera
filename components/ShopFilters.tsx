"use client";

import Link from "next/link";
import type { Category } from "@/lib/api";

const LABELS: Record<string, string> = {
  "all-suits": "Takımlar",
  "tuxedo-luxury-suit": "Smokin",
  "coat-overcoats": "Palto & Kaban",
  "all-shoes": "Ayakkabı",
  "all-shirt": "Gömlek",
  accessory: "Aksesuar",
};

export default function ShopFilters({
  categories,
  active,
}: {
  categories: Category[];
  active?: string;
}) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase text-[#999] mb-5">
        Kategoriler
      </p>
      <ul className="space-y-3">
        <li>
          <Link
            href="/shop"
            className={`text-xs tracking-wider transition-colors ${
              !active ? "text-[#111] font-medium" : "text-[#999] hover:text-[#111]"
            }`}
          >
            Tümü
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/shop?category=${cat.slug}`}
              className={`text-xs tracking-wider transition-colors ${
                active === cat.slug
                  ? "text-[#111] font-medium"
                  : "text-[#999] hover:text-[#111]"
              }`}
            >
              {LABELS[cat.slug] ?? cat.name}
              <span className="ml-2 text-[#ccc]">({cat.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
