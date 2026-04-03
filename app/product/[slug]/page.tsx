import { notFound } from "next/navigation";
import { getProducts, formatPrice } from "@/lib/api";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const products = await getProducts({ per_page: 100 });
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | Max Cavalera®`,
    description: product.short_description.replace(/<[^>]+>/g, "").slice(0, 150),
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const products = await getProducts({ per_page: 100 });
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const price = formatPrice(
    product.prices.price,
    product.prices.currency_minor_unit
  );
  const regularPrice =
    product.on_sale
      ? formatPrice(product.prices.regular_price, product.prices.currency_minor_unit)
      : null;

  const sizes =
    product.attributes.find((a) => a.name === "size")?.terms ?? [];

  // Strip HTML from description
  const description = product.short_description
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <main className="pt-16">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-[10px] tracking-wider text-[#999] uppercase">
          <Link href="/" className="hover:text-[#111] transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#111] transition-colors">Mağaza</Link>
          {product.categories[0] && (
            <>
              <span>/</span>
              <Link
                href={`/shop?category=${product.categories[0].slug}`}
                className="hover:text-[#111] transition-colors"
              >
                {product.categories[0].name}
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Product layout */}
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Info */}
          <div className="lg:pt-6 lg:max-w-md">
            {/* Brand */}
            <p className="text-[10px] tracking-widest uppercase text-[#999] mb-3">
              Max Cavalera®
            </p>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-light text-[#111] leading-snug mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-xl text-[#111]">{price}</span>
              {regularPrice && (
                <span className="text-sm text-[#999] line-through">{regularPrice}</span>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-[#666] leading-relaxed mb-8 border-t border-[#E8E8E8] pt-8">
                {description}
              </p>
            )}

            <ProductActions slug={product.slug} sizes={sizes} />

            {/* Trust badges */}
            <div className="mt-10 space-y-3 border-t border-[#E8E8E8] pt-8">
              {[
                "Hızlı Kargo & Kolay İade",
                "%100 Orijinal Ürün Garantisi",
                "Güvenli Ödeme",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-[#ccc] rounded-full" />
                  <span className="text-xs text-[#999] tracking-wider">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
