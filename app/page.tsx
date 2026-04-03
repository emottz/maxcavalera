import Image from "next/image";
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PageTransition from "@/components/PageTransition";

const CATEGORY_META: Record<string, { label: string; sub: string }> = {
  "all-suits":    { label: "Takımlar",     sub: "Klasik & Modern" },
  "luxury-suit":  { label: "Lüks Süit",   sub: "Smokin & Özel" },
  "coat-overcoats": { label: "Palto",      sub: "Kış Koleksiyonu" },
  "all-shoes":    { label: "Ayakkabı",     sub: "İtalyan Kesim" },
  "all-shirt":    { label: "Gömlek",       sub: "Klasik & Smokin" },
  "accessory":    { label: "Aksesuar",     sub: "Papyon & Daha Fazlası" },
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ per_page: 8, orderby: "date", order: "desc" }),
    getCategories(),
  ]);

  // Fetch 1 representative product per category for its image
  const catImages = await Promise.all(
    categories.map(async (cat) => {
      if (cat.image?.src) return { slug: cat.slug, src: cat.image.src };
      const prods = await getProducts({ per_page: 1, category: cat.id, orderby: "popularity" });
      return { slug: cat.slug, src: prods[0]?.images[0]?.src ?? null };
    })
  );
  const catImageMap = Object.fromEntries(catImages.map((c) => [c.slug, c.src]));

  const secondProduct = products[1];

  return (
    <main className="pt-16">
      {/* HERO */}
      <HeroSection />

      <PageTransition>
      {/* MARQUEE BAND */}
      <div className="overflow-hidden border-y border-[#E8E8E8] py-4 bg-white">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="text-[10px] tracking-widest uppercase text-[#bbb] shrink-0"
              >
                Max Cavalera® &nbsp;·&nbsp; Lüks Erkek Moda &nbsp;·&nbsp; Fatih / İstanbul &nbsp;·&nbsp; Sınırlı Üretim &nbsp;·&nbsp; El İşçiliği &nbsp;·&nbsp;
              </span>
            ))}
        </div>
      </div>

      {/* KATEGORİLER */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#999] mb-2">Koleksiyon</p>
            <h2 className="text-2xl font-light tracking-wide text-[#111]">Kategoriler</h2>
          </div>
          <Link href="/shop" className="text-[11px] tracking-widest uppercase text-[#999] hover:text-[#111] transition-colors">
            Tümünü Gör →
          </Link>
        </div>

        {/* Grid: first card is wider */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 auto-rows-[320px]">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat.slug];
            const imgSrc = catImageMap[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group relative overflow-hidden bg-[#F2F2F2] flex flex-col justify-end"
              >
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={meta?.label ?? cat.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                  />
                )}
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Text */}
                <div className="relative z-10 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] tracking-widest uppercase text-white/60 mb-1">
                    {cat.count} ürün
                  </p>
                  <p className="text-sm font-light tracking-widest uppercase text-white leading-tight">
                    {meta?.label ?? cat.name}
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {meta?.sub}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      {secondProduct && (
        <section className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#111] flex flex-col justify-center px-10 py-24 order-2 md:order-1">
            <p className="text-[10px] tracking-widest uppercase text-[#666] mb-4">Öne Çıkan</p>
            <h2 className="text-3xl font-light text-white leading-snug mb-6 max-w-xs">
              {secondProduct.name}
            </h2>
            <Link
              href={`/product/${secondProduct.slug}`}
              className="self-start text-[11px] tracking-widest uppercase border border-white text-white px-6 py-3 hover:bg-white hover:text-[#111] transition-colors duration-300"
            >
              İncele
            </Link>
          </div>
          <div className="relative bg-[#F2F2F2] min-h-[60vh] overflow-hidden order-1 md:order-2">
            <Image
              src="/featured.png"
              alt="Royal Sapphire Gold Embroidered Tuxedo"
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>
      )}

      {/* YENİ ÜRÜNLER */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl font-light tracking-wide text-[#111]">Yeni Gelenler</h2>
          <Link href="/shop" className="text-[11px] tracking-widest uppercase text-[#999] hover:text-[#111] transition-colors">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="bg-[#F7F7F7] py-24 px-6 text-center">
        <p className="text-[10px] tracking-widest uppercase text-[#999] mb-6">Max Cavalera® Hakkında</p>
        <h2 className="text-3xl md:text-4xl font-light text-[#111] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Her takım, sizi en iyi versiyonunuza taşımak için tasarlandı.&rdquo;
        </h2>
        <div className="w-12 h-px bg-[#ccc] mx-auto mt-10 mb-10" />
        <Link href="/about" className="text-[11px] tracking-widest uppercase text-[#111] hover:text-[#666] transition-colors">
          Hikayemiz →
        </Link>
      </section>

      <Footer />
      </PageTransition>
    </main>
  );
}
