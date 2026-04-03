"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/lib/api";

interface Props {
  product: Product | null;
  price: string;
  size?: string;
  orderNumber: string;
}

export default function SuccessContent({ product, price, size, orderNumber }: Props) {
  const { t } = useLanguage();

  const infoRows = [
    [t((s) => s.success.delivery), t((s) => s.success.deliveryVal)],
    [t((s) => s.success.shipping), t((s) => s.success.shippingFree)],
    [t((s) => s.success.support), "shop@maxcavalera.com.tr"],
  ];

  return (
    <div className="max-w-[640px] mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 border border-[#111] rounded-full flex items-center justify-center mx-auto mb-10">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <path d="M1 8L8 15L21 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <p className="text-[10px] tracking-widest uppercase text-[#999] mb-3">
        {t((s) => s.success.orderReceived)}
      </p>
      <h1 className="text-3xl font-light text-[#111] mb-6">
        {t((s) => s.success.thanks)}
      </h1>
      <p className="text-sm text-[#666] leading-relaxed mb-2">
        {t((s) => s.success.message)}
      </p>
      <p className="text-[11px] tracking-widest text-[#999] mb-12">
        {t((s) => s.success.orderNo)} <span className="text-[#111]">{orderNumber}</span>
      </p>

      {product && (
        <div className="bg-white border border-[#E8E8E8] p-6 flex gap-5 text-left mb-12">
          {product.images[0] && (
            <div className="relative w-20 h-24 bg-[#F5F5F5] shrink-0 overflow-hidden">
              <Image
                src={product.images[0].src}
                alt={product.name}
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </div>
          )}
          <div className="flex flex-col justify-between py-1">
            <div>
              <p className="text-[10px] tracking-wider text-[#999] uppercase mb-1">Max Cavalera®</p>
              <p className="text-sm text-[#111]">{product.name}</p>
              {size && <p className="text-xs text-[#999] mt-1">{t((s) => s.success.sizeLabel)}: {size}</p>}
            </div>
            <p className="text-sm text-[#111]">{price}</p>
          </div>
        </div>
      )}

      <div className="bg-[#F7F7F7] border border-[#EFEFEF] px-8 py-6 text-left mb-12 space-y-3">
        {infoRows.map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-[#999]">{label}</span>
            <span className="text-[#111]">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/shop"
          className="border border-[#111] text-[#111] text-[11px] tracking-widest uppercase px-10 py-4 hover:bg-[#111] hover:text-white transition-colors"
        >
          {t((s) => s.success.continueShopping)}
        </Link>
        <Link
          href="/"
          className="text-[11px] tracking-widest uppercase text-[#999] px-10 py-4 hover:text-[#111] transition-colors"
        >
          {t((s) => s.success.home)}
        </Link>
      </div>
    </div>
  );
}
