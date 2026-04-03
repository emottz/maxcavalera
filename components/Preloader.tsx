"use client";

import { useEffect, useState } from "react";

type Phase = "idle" | "rise" | "spin" | "hold" | "exit" | "done";

// Papyon path (svglogo.svg'den)
const BOW_PATH =
  "M714.2,499.49l-.17,36.05c-.7,9.61-6.91,17.98-15.89,21.44-9.04,3.48-19.34,1.38-26.31-5.37l-65.78-43.57h-9.57l-65.78,43.57c-6.97,6.76-17.26,8.86-26.31,5.37-8.98-3.46-15.19-11.83-15.89-21.44l-.17-36.05.17-36.05c.7-9.61,6.91-17.98,15.89-21.44,9.04-3.48,19.34-1.38,26.31,5.39,21.91,14.35,43.83,28.7,65.74,43.05,3.2.17,6.41.34,9.61.51l65.78-43.56c6.97-6.77,17.26-8.87,26.31-5.39,8.98,3.46,15.19,11.83,15.89,21.44l.17,36.05Z";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const seq: [Phase, number][] = [
      ["rise",  80],
      ["spin",  700],
      ["hold",  2900],
      ["exit",  3200],
      ["done",  4000],
    ];
    const timers = seq.map(([p, ms]) => setTimeout(() => setPhase(p), ms));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "done") return null;

  const isExit  = phase === "exit";
  const isRisen = phase !== "idle";
  const isSpin  = phase === "spin";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#fff",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: isExit ? "opacity 0.8s cubic-bezier(0.4,0,0.2,1)" : "none",
      opacity: isExit ? 0 : 1,
      pointerEvents: isExit ? "none" : "all",
    }}>

      {/* Köşe etiketler */}
      {(["EST. İSTANBUL", "2026"] as const).map((label, i) => (
        <span key={i} style={{
          position: "absolute", top: 28,
          ...(i === 0 ? { left: 36 } : { right: 36 }),
          fontSize: 9, letterSpacing: "0.38em",
          textTransform: "uppercase", color: "#D0D0D0",
          fontFamily: "inherit",
          transition: "opacity 0.9s ease 1.4s",
          opacity: isRisen && !isExit ? 1 : 0,
        }}>{label}</span>
      ))}

      {/* ── LOGO WRAPPER ── */}
      <div style={{
        transition: isExit
          ? "transform 0.6s ease, opacity 0.5s ease"
          : "transform 1s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease",
        transform: isRisen
          ? isExit ? "translateY(-18px) scale(0.93)" : "translateY(0)"
          : "translateY(32px)",
        opacity: isRisen && !isExit ? 1 : 0,
      }}>
        <svg
          viewBox="0 0 1200 900"
          width="320"
          style={{ overflow: "visible" }}
        >
          {/* ─── PAPYON ─── */}
          <path
            d={BOW_PATH}
            fill="#111"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: isSpin
                ? "bowSpin 1.1s ease-in-out 2 forwards"
                : undefined,
            }}
          />

          {/* ─── YAZI — HİÇ HAREKET ETMEZ ─── */}
          <text
            fontFamily="Century, 'Times New Roman', serif"
            fontSize="137.12"
            letterSpacing="-0.01em"
            fill="#111"
            transform="translate(145.67 717.62)"
          >
            Max Cavalera
          </text>

          {/* ® sembolü */}
          <circle
            cx="1028.7" cy="627.67" r="25.63"
            fill="none" stroke="#111" strokeWidth="3.15"
          />
          <text
            fontFamily="'Baskerville BT', Baskerville, Georgia, serif"
            fontSize="39.3"
            letterSpacing="-0.01em"
            fill="#111"
            transform="translate(1014.61 638.53)"
          >
            R
          </text>
        </svg>
      </div>

      {/* ─── Alt çift çizgi ─── */}
      <div style={{
        marginTop: 16,
        display: "flex", flexDirection: "column", gap: 3, alignItems: "center",
      }}>
        {[0, 1].map(i => (
          <div key={i} style={{
            height: "0.5px", background: "#E0E0E0",
            transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${1.1 + i * 0.12}s`,
            width: isRisen && !isExit ? 72 : 0,
          }} />
        ))}
      </div>

      {/* ─── Tagline ─── */}
      <p style={{
        marginTop: 14, fontSize: 8.5,
        letterSpacing: "0.44em", textTransform: "uppercase",
        color: "#C8C8C8", fontFamily: "inherit",
        transition: "opacity 0.9s ease 1.5s, transform 0.9s ease 1.5s",
        opacity: isRisen && !isExit ? 1 : 0,
        transform: isRisen ? "translateY(0)" : "translateY(6px)",
      }}>
        Luxury Men&apos;s Fashion
      </p>

      {/* ─── Progress bar ─── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "1.5px", background: "#F0F0F0",
      }}>
        <div style={{
          height: "100%", background: "#111",
          transition: isExit
            ? "width 0.3s ease"
            : phase === "idle" ? "none"
            : "width 3.2s cubic-bezier(0.4,0,0.2,1) 0.1s",
          width: phase === "idle" ? "0%" : isExit ? "100%" : "88%",
        }} />
      </div>
    </div>
  );
}
