import Link from "next/link";
import Image from "next/image";

const cols = [
  {
    title: "Koleksiyon",
    links: [
      { label: "Tüm Ürünler", href: "/shop" },
      { label: "Takımlar", href: "/shop?category=all-suits" },
      { label: "Smokinler", href: "/shop?category=tuxedo-luxury-suit" },
      { label: "Palto & Kaban", href: "/shop?category=coat-overcoats" },
      { label: "Gömlek", href: "/shop?category=all-shirt" },
      { label: "Aksesuar", href: "/shop?category=accessory" },
    ],
  },
  {
    title: "Bilgi",
    links: [
      { label: "Hakkımızda", href: "/about" },
      { label: "Bize Ulaşın", href: "/about#contact" },
      { label: "Beden Rehberi", href: "/about#size" },
      { label: "Teslimat & İade", href: "/about#shipping" },
      { label: "Gizlilik Politikası", href: "/about#privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E8E8] bg-white mt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link href="/" className="block mb-4">
            <Image src="/logo.png" alt="Max Cavalera" width={130} height={65} className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </Link>
          <p className="text-xs text-[#999] leading-relaxed max-w-xs">
            Kemalpaşa Mahallesi, Gençtürk Caddesi No: 2<br />
            34134 Fatih / İstanbul
          </p>
          <p className="text-xs text-[#999] mt-3">+90 (543) 527 59 00</p>
          <p className="text-xs text-[#999]">shop@maxcavalera.com.tr</p>

          <div className="flex gap-4 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest text-[#999] uppercase hover:text-[#111] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest text-[#999] uppercase hover:text-[#111] transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>

        {/* Link columns */}
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[10px] tracking-widest uppercase text-[#111] mb-5">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs text-[#999] hover:text-[#111] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E8E8E8]">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#bbb] tracking-wider">
            © {new Date().getFullYear()} Max Cavalera. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX"].map((card) => (
              <span
                key={card}
                className="text-[9px] tracking-widest border border-[#E8E8E8] rounded px-2 py-1 text-[#aaa]"
              >
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
