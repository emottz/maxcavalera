"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const cols = [
    {
      title: t((s) => s.home.categoriesTitle),
      links: [
        { label: t((s) => s.categories["all-suits"].label), href: "/shop?category=all-suits" },
        { label: t((s) => s.categories["luxury-suit"].label), href: "/shop?category=luxury-suit" },
        { label: t((s) => s.categories["coat-overcoats"].label), href: "/shop?category=coat-overcoats" },
        { label: t((s) => s.categories["all-shirt"].label), href: "/shop?category=all-shirt" },
        { label: t((s) => s.categories["accessory"].label), href: "/shop?category=accessory" },
      ],
    },
    {
      title: t((s) => s.footer.colInfo),
      links: [
        { label: t((s) => s.footer.links.about), href: "/about" },
        { label: t((s) => s.footer.links.shipping), href: "/about#shipping" },
        { label: t((s) => s.footer.links.size), href: "/about#size" },
        { label: t((s) => s.footer.links.privacy), href: "/about#privacy" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#E8E8E8] bg-white mt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
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
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest text-[#999] uppercase hover:text-[#111] transition-colors">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest text-[#999] uppercase hover:text-[#111] transition-colors">TikTok</a>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[10px] tracking-widest uppercase text-[#111] mb-5">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-[#999] hover:text-[#111] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#E8E8E8]">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#bbb] tracking-wider">
            © {new Date().getFullYear()} Max Cavalera. {t((s) => s.footer.rights)}
          </p>
          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX"].map((card) => (
              <span key={card} className="text-[9px] tracking-widest border border-[#E8E8E8] rounded px-2 py-1 text-[#aaa]">{card}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
