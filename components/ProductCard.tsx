"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/api";
import { formatPrice } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const img1 = product.images[0]?.src;
  const img2 = product.images[1]?.src ?? img1;
  const price = formatPrice(
    product.prices.price,
    product.prices.currency_minor_unit
  );

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-[#F7F7F7] aspect-[3/4]">
        {img1 && (
          <Image
            src={img1}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${
              hovered && img2 !== img1 ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        {img2 && img2 !== img1 && (
          <Image
            src={img2}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        {product.on_sale && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-[#111111] text-white px-2 py-1">
            Sale
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="text-xs tracking-wider text-[#999999] uppercase">
          {product.categories[0]?.name ?? ""}
        </p>
        <p className="text-sm font-light text-[#111111] leading-snug line-clamp-2">
          {product.name}
        </p>
        <p className="text-sm text-[#111111]">{price}</p>
      </div>
    </Link>
  );
}
