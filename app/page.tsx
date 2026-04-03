import Image from "next/image";
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PageTransition from "@/components/PageTransition";

const CATEGORY_LABELS: Record<string, string> = {
  "all-suits": "Takımlar",
  "tuxedo-luxury-suit": "Smokin",
  "coat-overcoats": "Palto & Kaban",
  "all-shoes": "Ayakkabı",
  "all-shirt": "Gömlek",
  accessory: "Aksesuar",
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ per_page: 8, orderby: "date", order: "desc" }),
    getCategories(),
  ]);

  const heroProduct = products[0];
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
          <h2 className="text-2xl font-light tracking-wide text-[#111]">Kategoriler</h2>
          <Link href="/shop" className="text-[11px] tracking-widest uppercase text-[#999] hover:text-[#111] transition-colors">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative bg-[#F7F7F7] aspect-square overflow-hidden flex items-end p-4 hover:bg-[#EFEFEF] transition-colors"
            >
              {cat.image && (
                <Image
                  src={cat.image.src}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 50vw, 16vw"
                />
              )}
              <div className="relative z-10">
                <p className="text-[11px] font-medium tracking-widest uppercase text-[#111] bg-white/90 px-2 py-1">
                  {CATEGORY_LABELS[cat.slug] ?? cat.name}
                </p>
                <p className="text-[10px] text-[#999] mt-1">{cat.count} ürün</p>
              </div>
            </Link>
          ))}
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
