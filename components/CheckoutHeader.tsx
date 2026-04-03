"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  activeStep?: number; // 0=order, 1=payment, 2=confirmation
}

export default function CheckoutHeader({ activeStep = 0 }: Props) {
  const { t } = useLanguage();
  const steps = t((s) => s.checkout.steps);

  return (
    <div className="bg-white border-b border-[#E8E8E8]">
      <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Max Cavalera" width={100} height={28} className="object-contain" />
        </Link>
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#999]">
          {steps.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              {i > 0 && <span className="text-[#ccc]">/</span>}
              <span className={activeStep === i ? "text-[#111]" : "text-[#999]"}>{step}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#999]">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="1" y="5" width="10" height="9" rx="1" stroke="#999" strokeWidth="1.2"/>
            <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="#999" strokeWidth="1.2"/>
          </svg>
          <span className="tracking-wider">{t((s) => s.checkout.secureLabel)}</span>
        </div>
      </div>
    </div>
  );
}
