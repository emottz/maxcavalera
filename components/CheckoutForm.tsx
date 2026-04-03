"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  productSlug: string;
  size?: string;
}

export default function CheckoutForm({ productSlug, size }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState<"contact" | "payment">("contact");
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", zip: "",
  });

  const [payment, setPayment] = useState({
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  function handleContactChange(e: React.ChangeEvent<HTMLInputElement>) {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePaymentChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;
    if (e.target.name === "cardNumber") {
      val = val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (e.target.name === "expiry") {
      val = val.replace(/\D/g, "").slice(0, 4);
      if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
    }
    if (e.target.name === "cvv") val = val.replace(/\D/g, "").slice(0, 3);
    setPayment((prev) => ({ ...prev, [e.target.name]: val }));
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePaymentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/checkout/success?product=${productSlug}${size ? `&size=${size}` : ""}`);
    }, 1600);
  }

  const inputClass = "w-full border border-[#E8E8E8] bg-white px-4 py-3 text-sm text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#111] transition-colors";
  const labelClass = "block text-[10px] tracking-widest uppercase text-[#999] mb-1.5";

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-10">
        <button
          onClick={() => step === "payment" && setStep("contact")}
          className={`flex items-center gap-2 text-[11px] tracking-wider uppercase ${step === "contact" ? "text-[#111]" : "text-[#999] cursor-pointer hover:text-[#111]"}`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${step === "contact" ? "border-[#111] bg-[#111] text-white" : "border-[#999] text-[#999]"}`}>1</span>
          {t((s) => s.checkout.step1)}
        </button>
        <div className="flex-1 h-px bg-[#E8E8E8]" />
        <div className={`flex items-center gap-2 text-[11px] tracking-wider uppercase ${step === "payment" ? "text-[#111]" : "text-[#bbb]"}`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${step === "payment" ? "border-[#111] bg-[#111] text-white" : "border-[#ddd] text-[#bbb]"}`}>2</span>
          {t((s) => s.checkout.step2)}
        </div>
      </div>

      {step === "contact" && (
        <form onSubmit={handleContactSubmit}>
          <p className="text-lg font-light text-[#111] mb-8">{t((s) => s.checkout.deliveryTitle)}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>{t((s) => s.checkout.firstName)}</label>
              <input name="firstName" value={contact.firstName} onChange={handleContactChange} required placeholder="Ahmet" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t((s) => s.checkout.lastName)}</label>
              <input name="lastName" value={contact.lastName} onChange={handleContactChange} required placeholder="Yılmaz" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>{t((s) => s.checkout.email)}</label>
              <input name="email" type="email" value={contact.email} onChange={handleContactChange} required placeholder="ahmet@mail.com" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t((s) => s.checkout.phone)}</label>
              <input name="phone" type="tel" value={contact.phone} onChange={handleContactChange} required placeholder="+90 5xx xxx xx xx" className={inputClass} />
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClass}>{t((s) => s.checkout.address)}</label>
            <input name="address" value={contact.address} onChange={handleContactChange} required placeholder="Mahalle, Cadde, No" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div>
              <label className={labelClass}>{t((s) => s.checkout.city)}</label>
              <input name="city" value={contact.city} onChange={handleContactChange} required placeholder="İstanbul" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t((s) => s.checkout.zip)}</label>
              <input name="zip" value={contact.zip} onChange={handleContactChange} required placeholder="34000" className={inputClass} />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#111] text-white text-[11px] tracking-widest uppercase py-4 hover:bg-[#333] transition-colors">
            {t((s) => s.checkout.nextStep)}
          </button>
        </form>
      )}

      {step === "payment" && (
        <form onSubmit={handlePaymentSubmit}>
          <p className="text-lg font-light text-[#111] mb-8">{t((s) => s.checkout.paymentTitle)}</p>

          <div className="bg-[#F7F7F7] border border-[#EFEFEF] px-5 py-4 mb-8 flex justify-between items-center">
            <div>
              <p className="text-xs text-[#999] tracking-wider mb-0.5">{t((s) => s.checkout.deliveryAddr)}</p>
              <p className="text-sm text-[#111]">{contact.firstName} {contact.lastName} — {contact.city}</p>
              <p className="text-xs text-[#999]">{contact.email}</p>
            </div>
            <button type="button" onClick={() => setStep("contact")} className="text-[10px] tracking-widest uppercase text-[#999] hover:text-[#111] underline underline-offset-2">
              {t((s) => s.checkout.edit)}
            </button>
          </div>

          <div className="mb-4">
            <label className={labelClass}>{t((s) => s.checkout.cardName)}</label>
            <input name="cardName" value={payment.cardName} onChange={handlePaymentChange} required placeholder="AHMET YILMAZ" className={inputClass} />
          </div>

          <div className="mb-4">
            <label className={labelClass}>{t((s) => s.checkout.cardNumber)}</label>
            <div className="relative">
              <input name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} required placeholder="0000 0000 0000 0000" maxLength={19} className={inputClass + " pr-12"} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ccc] text-xs">VISA</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div>
              <label className={labelClass}>{t((s) => s.checkout.expiry)}</label>
              <input name="expiry" value={payment.expiry} onChange={handlePaymentChange} required placeholder="AA/YY" maxLength={5} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t((s) => s.checkout.cvv)}</label>
              <input name="cvv" value={payment.cvv} onChange={handlePaymentChange} required placeholder="•••" maxLength={3} type="password" className={inputClass} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#111] text-white text-[11px] tracking-widest uppercase py-4 hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-3">
            {loading ? (
              <><span className="w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin" />{t((s) => s.checkout.processing)}</>
            ) : t((s) => s.checkout.complete)}
          </button>

          <p className="text-center text-[10px] text-[#ccc] tracking-wider mt-4">
            {t((s) => s.checkout.secureNote)}
          </p>
        </form>
      )}
    </div>
  );
}
