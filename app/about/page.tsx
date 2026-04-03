import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <div className="bg-[#111] py-32 px-6 text-center">
        <p className="text-[10px] tracking-widest uppercase text-[#666] mb-4">
          Hakkımızda
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-white max-w-xl mx-auto leading-snug">
          Max Cavalera®
        </h1>
      </div>

      {/* Story */}
      <section className="max-w-2xl mx-auto px-6 py-24">
        <p className="text-[10px] tracking-widest uppercase text-[#999] mb-8">
          Hikayemiz
        </p>
        <div className="space-y-6 text-sm text-[#444] leading-loose">
          <p>
            Max Cavalera, lüks erkek modasında köklü bir isim olarak Fatih,
            İstanbul&apos;dan yükseldi. Her takım, her smokin ve her aksesuar;
            ustalığın, kalitenin ve zarafetin bir ifadesidir.
          </p>
          <p>
            Modern erkek modasının gereksinimlerini anlayan tasarımcılarımız,
            geleneksel terzilik sanatıyla çağdaş çizgileri harmanlayarak
            zamansız parçalar yaratır. Sınırlı üretim anlayışımız, her müşterimizin
            özel hissetmesini sağlar.
          </p>
          <p>
            İstanbul&apos;un kalbinden dünyaya uzanan koleksiyonlarımız;
            galalar, düğünler, kırmızı halı etkinlikleri ve her özel an için
            tasarlanmıştır.
          </p>
        </div>
      </section>

      <div className="border-t border-[#E8E8E8]" />

      {/* Details grid */}
      <section id="contact" className="max-w-[1400px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-[#999] mb-5">
            İletişim
          </p>
          <div className="space-y-2 text-sm text-[#444]">
            <p>Kemalpaşa Mahallesi</p>
            <p>Gençtürk Caddesi No: 2</p>
            <p>34134 Fatih / İstanbul</p>
            <p className="pt-2">+90 (543) 527 59 00</p>
            <p>shop@maxcavalera.com.tr</p>
          </div>
        </div>

        <div id="shipping">
          <p className="text-[10px] tracking-widest uppercase text-[#999] mb-5">
            Teslimat & İade
          </p>
          <div className="space-y-3 text-sm text-[#444] leading-relaxed">
            <p>Siparişler en fazla 4 iş günü içinde kargoya verilir.</p>
            <p>Türkiye genelinde hızlı kargo imkânı sunulmaktadır.</p>
            <p>Ürünlerin iade süresi teslimattan itibaren 14 gündür.</p>
          </div>
        </div>

        <div id="size">
          <p className="text-[10px] tracking-widest uppercase text-[#999] mb-5">
            Beden Rehberi
          </p>
          <div className="text-sm text-[#444] leading-relaxed space-y-2">
            <p>Bedenlerimiz US / EU karşılıklı olarak etiketlenmiştir.</p>
            <p>Örnek: 40 US = 50 EU</p>
            <p className="pt-2">
              Doğru beden için göğüs çevresi ölçünüzü baz alarak seçim yapabilirsiniz.
              Detaylı beden tablosu için bize ulaşın.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F7F7F7] py-20 text-center px-6">
        <h2 className="text-2xl font-light text-[#111] mb-8">
          Koleksiyonu Keşfetmeye Hazır mısınız?
        </h2>
        <Link
          href="/shop"
          className="inline-block border border-[#111] text-[#111] text-[11px] tracking-widest uppercase px-10 py-4 hover:bg-[#111] hover:text-white transition-colors"
        >
          Mağazaya Git
        </Link>
      </section>

      <Footer />
    </main>
  );
}
