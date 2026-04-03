import { getProducts, getCategories } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import ShopFilters from "@/components/ShopFilters";

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

  const activeCategory = allCategories.find((c) => c.slug === categorySlug);

  return (
    <main className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#E8E8E8] bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <p className="text-[10px] tracking-widest uppercase text-[#999] mb-2">
            {activeCategory ? "Kategori" : "Tüm Koleksiyon"}
          </p>
          <h1 className="text-3xl font-light text-[#111]">
            {activeCategory?.name ?? "Mağaza"}
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <ShopFilters categories={allCategories} active={categorySlug} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs text-[#999] tracking-wider">
                {products.length} ürün gösteriliyor
              </p>
            </div>
            <ProductGrid products={products} />

            {products.length === 16 && (
              <div className="flex justify-center mt-16">
                <a
                  href={`/shop?${new URLSearchParams({
                    ...(categorySlug ? { category: categorySlug } : {}),
                    page: String(page + 1),
                  })}`}
                  className="text-[11px] tracking-widest uppercase border border-[#111] text-[#111] px-10 py-4 hover:bg-[#111] hover:text-white transition-colors"
                >
                  Daha Fazla Yükle
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
