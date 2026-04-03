"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function HeroSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[92vh] overflow-hidden">
      {/* Image — slides in from left */}
      <div
        className="relative bg-[#F0F0F0] overflow-hidden min-h-[65vh] md:min-h-auto"
        style={{
          transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 1s ease",
          transform: ready ? "translateX(0)" : "translateX(-40px)",
          opacity: ready ? 1 : 0,
        }}
      >
        <Image
          src="/hero.png"
          alt="Max Cavalera Hero"
          fill
          className="object-cover object-center scale-[1.02]"
          style={{
            transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)",
            transform: ready ? "scale(1)" : "scale(1.06)",
          }}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
      </div>

      {/* Text panel — fades up */}
      <div className="flex flex-col justify-end px-10 md:px-16 py-16 md:py-28 bg-white relative overflow-hidden">

        {/* Decorative line — draws in */}
        <div
          className="absolute top-0 left-0 w-px bg-[#E8E8E8]"
          style={{
            transition: "height 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s",
            height: ready ? "100%" : "0%",
          }}
        />

        <div
          style={{
            transition: "opacity 0.9s ease 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#999] mb-6">
            Yeni Koleksiyon — 2026
          </p>
        </div>

        <div
          style={{
            transition: "opacity 0.9s ease 0.65s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <h1 className="text-5xl md:text-6xl font-light leading-[1.1] text-[#111] mb-8 tracking-tight">
            Zarafet
            <br />
            <span className="italic text-[#444]">Sadelikle</span>
            <br />
            Buluşuyor
          </h1>
        </div>

        <div
          style={{
            transition: "opacity 0.9s ease 0.8s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <p className="text-sm text-[#888] leading-relaxed max-w-xs mb-12">
            Lüks erkek modası. Her dikiş bir özen,
            <br />her kumaş bir seçim. Fatih / İstanbul.
          </p>
        </div>

        <div
          style={{
            transition: "opacity 0.9s ease 0.95s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.95s",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-4 self-start border border-[#111] text-[#111] text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#111] hover:text-white transition-all duration-400 overflow-hidden relative"
          >
            <span>Koleksiyonu Keşfet</span>
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* Bottom decorative element */}
        <div
          className="absolute bottom-8 right-10 text-[9px] tracking-[0.35em] text-[#ccc] uppercase"
          style={{
            transition: "opacity 1s ease 1.2s",
            opacity: ready ? 1 : 0,
          }}
        >
          Est. İstanbul
        </div>
      </div>
    </section>
  );
}
