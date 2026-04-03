import { getProducts, formatPrice } from "@/lib/api";
import Footer from "@/components/Footer";
import CheckoutHeader from "@/components/CheckoutHeader";
import SuccessContent from "@/components/SuccessContent";

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
      <CheckoutHeader activeStep={2} />
      <SuccessContent
        product={product}
        price={price}
        size={size}
        orderNumber={orderNumber}
      />
      <Footer />
    </main>
  );
}
