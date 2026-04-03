import { getProducts, formatPrice } from "@/lib/api";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutSummary from "@/components/CheckoutSummary";
import CheckoutHeader from "@/components/CheckoutHeader";
import Footer from "@/components/Footer";
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
      <CheckoutHeader activeStep={0} />

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
          <div>
            <CheckoutForm productSlug={slug} size={size} />
          </div>
          <div>
            <CheckoutSummary
              product={product}
              price={price}
              regularPrice={regularPrice}
              size={size}
              image={image}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
