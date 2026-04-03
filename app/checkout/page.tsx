import { getProducts, formatPrice } from "@/lib/api";
import CheckoutForm from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { product?: string; size?: string };
}) {
  const slug = searchParams.product;
  const size = searchParams.size;

  if (!slug) notFound();

  const products = await getProducts({ per_page: 100 });
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const price = formatPrice(
    product.prices.price,
    product.prices.currency_minor_unit
  );
  const regularPrice = product.on_sale
    ? formatPrice(product.prices.regular_price, product.prices.currency_minor_unit)
    : null;

  const image = product.images[0]?.src ?? null;

  return (
    <main className="pt-16 min-h-screen bg-[#FAFAFA]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Max Cavalera" width={100} height={28} className="object-contain" />
          </Link>
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#999]">
            <span className="text-[#111]">Sipariş</span>
            <span className="text-[#ccc]">/</span>
            <span>Ödeme</span>
            <span className="text-[#ccc]">/</span>
            <span>Onay</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#999]">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="1" y="5" width="10" height="9" rx="1" stroke="#999" strokeWidth="1.2"/>
              <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="#999" strokeWidth="1.2"/>
            </svg>
            <span className="tracking-wider">Güvenli Ödeme</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">

          {/* LEFT — Form */}
          <div>
            <CheckoutForm productSlug={slug} size={size} />
          </div>

          {/* RIGHT — Order summary */}
          <div>
            <div className="bg-white border border-[#E8E8E8] p-8 sticky top-24">
              <p className="text-[10px] tracking-widest uppercase text-[#999] mb-6">
                Sipariş Özeti
              </p>

              {/* Product row */}
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
                      <p className="text-xs text-[#999] mt-1">Beden: {size}</p>
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

              {/* Cost breakdown */}
              <div className="space-y-3 pt-6 pb-6 border-b border-[#F0F0F0]">
                <div className="flex justify-between text-sm text-[#666]">
                  <span>Ara Toplam</span>
                  <span>{price}</span>
                </div>
                <div className="flex justify-between text-sm text-[#666]">
                  <span>Kargo</span>
                  <span className="text-[#4CAF50]">Ücretsiz</span>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <span className="text-sm tracking-wider text-[#111] uppercase">Toplam</span>
                <span className="text-lg text-[#111]">{price}</span>
              </div>

              {/* Trust */}
              <div className="mt-8 space-y-2.5">
                {[
                  "256-bit SSL şifreleme",
                  "Hızlı kargo & kolay iade",
                  "%100 orijinal ürün",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 bg-[#ccc] rounded-full shrink-0" />
                    <span className="text-[11px] text-[#999] tracking-wider">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
