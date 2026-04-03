import { getProducts, formatPrice } from "@/lib/api";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { product?: string; size?: string };
}) {
  const slug = searchParams.product;
  const size = searchParams.size;

  let product = null;
  let price = "";

  if (slug) {
    const products = await getProducts({ per_page: 100 });
    product = products.find((p) => p.slug === slug) ?? null;
    if (product) {
      price = formatPrice(product.prices.price, product.prices.currency_minor_unit);
    }
  }

  const orderNumber = `MC-${Date.now().toString().slice(-6)}`;

  return (
    <main className="pt-16 min-h-screen bg-[#FAFAFA]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Max Cavalera" width={100} height={28} className="object-contain" />
          </Link>
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#999]">
            <span className="text-[#bbb]">Sipariş</span>
            <span className="text-[#ccc]">/</span>
            <span className="text-[#bbb]">Ödeme</span>
            <span className="text-[#ccc]">/</span>
            <span className="text-[#111]">Onay</span>
          </div>
          <div />
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-6 py-24 text-center">
        {/* Checkmark */}
        <div className="w-16 h-16 border border-[#111] rounded-full flex items-center justify-center mx-auto mb-10">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path d="M1 8L8 15L21 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className="text-[10px] tracking-widest uppercase text-[#999] mb-3">
          Sipariş Alındı
        </p>
        <h1 className="text-3xl font-light text-[#111] mb-6">
          Teşekkürler!
        </h1>
        <p className="text-sm text-[#666] leading-relaxed mb-2">
          Siparişiniz başarıyla alındı. Kısa süre içinde e-posta ile bilgilendirileceksiniz.
        </p>
        <p className="text-[11px] tracking-widest text-[#999] mb-12">
          Sipariş No: <span className="text-[#111]">{orderNumber}</span>
        </p>

        {/* Product summary */}
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
                {size && <p className="text-xs text-[#999] mt-1">Beden: {size}</p>}
              </div>
              <p className="text-sm text-[#111]">{price}</p>
            </div>
          </div>
        )}

        {/* Delivery info */}
        <div className="bg-[#F7F7F7] border border-[#EFEFEF] px-8 py-6 text-left mb-12 space-y-3">
          {[
            ["Tahmini Teslimat", "3–5 iş günü"],
            ["Kargo", "Ücretsiz"],
            ["Destek", "shop@maxcavalera.com.tr"],
          ].map(([label, value]) => (
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
            Alışverişe Devam Et
          </Link>
          <Link
            href="/"
            className="text-[11px] tracking-widest uppercase text-[#999] px-10 py-4 hover:text-[#111] transition-colors"
          >
            Ana Sayfa
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
