"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";

const links = [
  { label: "Koleksiyon", href: "/shop" },
  { label: "Takımlar", href: "/shop?category=all-suits" },
  { label: "Aksesuarlar", href: "/shop?category=accessory" },
  { label: "Hakkımızda", href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white border-b border-[#E8E8E8]" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Max Cavalera"
              width={120}
              height={60}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs tracking-widest uppercase text-[#666666] hover:text-[#111111] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button className="hidden md:block text-[#666666] hover:text-[#111111] transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              href="/shop"
              className="text-[#666666] hover:text-[#111111] transition-colors"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
            </Link>
            <button
              className="md:hidden text-[#666666] hover:text-[#111111] transition-colors"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#E8E8E8]">
            <Image src="/logo.png" alt="Max Cavalera" width={100} height={50} className="h-9 w-auto object-contain" />
            <button onClick={() => setOpen(false)}>
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col gap-0 mt-8 px-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-5 text-sm tracking-widest uppercase border-b border-[#E8E8E8] text-[#111111]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-6 pb-10 text-xs text-[#999] tracking-wider">
            shop@maxcavalera.com.tr
          </div>
        </div>
      )}
    </>
  );
}
