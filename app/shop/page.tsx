import { getProducts, getCategories } from "@/lib/api";
import Footer from "@/components/Footer";
import ShopContent from "@/components/ShopContent";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const categorySlug = searchParams.category;

  const allCategories = await getCategories();

  let categoryId: number | undefined;
  if (categorySlug) {
    const found = allCategories.find((c) => c.slug === categorySlug);
    categoryId = found?.id;
  }

  const products = await getProducts({
    per_page: 16,
    page,
    category: categoryId,
    orderby: "date",
    order: "desc",
  });

  return (
    <main className="pt-16 min-h-screen">
      <ShopContent
        products={products}
        categories={allCategories}
        categorySlug={categorySlug}
        page={page}
        hasMore={products.length === 16}
      />
      <Footer />
    </main>
  );
}
