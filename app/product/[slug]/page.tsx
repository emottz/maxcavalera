import { notFound } from "next/navigation";
import { getProducts, formatPrice } from "@/lib/api";
import ProductPageContent from "@/components/ProductPageContent";
import Footer from "@/components/Footer";

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

  const description = product.short_description
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <main className="pt-16">
      <ProductPageContent
        product={product}
        price={price}
        regularPrice={regularPrice}
        sizes={sizes}
        description={description}
      />
      <Footer />
    </main>
  );
}
