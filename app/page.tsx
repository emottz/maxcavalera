import { getProducts, getCategories } from "@/lib/api";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PageTransition from "@/components/PageTransition";
import HomeContent from "@/components/HomeContent";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ per_page: 8, orderby: "date", order: "desc" }),
    getCategories(),
  ]);

  const catImages = await Promise.all(
    categories.map(async (cat) => {
      if (cat.image?.src) return { slug: cat.slug, src: cat.image.src };
      const prods = await getProducts({ per_page: 1, category: cat.id, orderby: "popularity" });
      return { slug: cat.slug, src: prods[0]?.images[0]?.src ?? null };
    })
  );
  const catImageMap = Object.fromEntries(catImages.map((c) => [c.slug, c.src]));
  const secondProduct = products[1] ?? null;

  return (
    <main className="pt-16">
      <HeroSection />
      <PageTransition>
        <HomeContent
          products={products}
          categories={categories}
          catImageMap={catImageMap}
          secondProduct={secondProduct}
        />
        <Footer />
      </PageTransition>
    </main>
  );
}
