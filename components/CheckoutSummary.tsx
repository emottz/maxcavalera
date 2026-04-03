"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/lib/api";

interface Props {
  product: Product;
  price: string;
  regularPrice: string | null;
  size?: string;
  image: string | null;
}

export default function CheckoutSummary({ product, price, regularPrice, size, image }: Props) {
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-[#E8E8E8] p-8 sticky top-24">
      <p className="text-[10px] tracking-widest uppercase text-[#999] mb-6">
        {t((s) => s.checkout.summaryTitle)}
      </p>

      <div className="flex gap-4 pb-6 border-b border-[#F0F0F0]">
        {image && (
          <div className="relative w-20 h-24 bg-[#F5F5F5] shrink-0 overflow-hidden">
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover object-top"
              sizes="80px"
            />
          </div>
        )}
        <div className="flex flex-col justify-between py-1">
          <div>
            <p className="text-[10px] tracking-wider text-[#999] uppercase mb-1">
              Max Cavalera®
            </p>
            <p className="text-sm text-[#111] leading-snug">{product.name}</p>
            {size && (
              <p className="text-xs text-[#999] mt-1">{t((s) => s.checkout.sizeLabel)}: {size}</p>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-[#111]">{price}</span>
            {regularPrice && (
              <span className="text-xs text-[#bbb] line-through">{regularPrice}</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-6 pb-6 border-b border-[#F0F0F0]">
        <div className="flex justify-between text-sm text-[#666]">
          <span>{t((s) => s.checkout.subtotal)}</span>
          <span>{price}</span>
        </div>
        <div className="flex justify-between text-sm text-[#666]">
          <span>{t((s) => s.checkout.shipping)}</span>
          <span className="text-[#4CAF50]">{t((s) => s.checkout.shippingFree)}</span>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <span className="text-sm tracking-wider text-[#111] uppercase">{t((s) => s.checkout.total)}</span>
        <span className="text-lg text-[#111]">{price}</span>
      </div>

      <div className="mt-8 space-y-2.5">
        {t((s) => s.checkout.trustItems).map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <div className="w-1 h-1 bg-[#ccc] rounded-full shrink-0" />
            <span className="text-[11px] text-[#999] tracking-wider">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
