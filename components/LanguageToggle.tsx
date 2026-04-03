"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/translations";

const LANGS: { code: Lang; label: string }[] = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5">
      {LANGS.map(({ code, label }, i) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`text-[10px] tracking-wider px-1.5 py-0.5 transition-all duration-200 ${
            lang === code
              ? "text-[#111] font-medium"
              : "text-[#bbb] hover:text-[#888]"
          }`}
        >
          {label}
          {i < LANGS.length - 1 && (
            <span className="ml-0.5 text-[#E0E0E0]">/</span>
          )}
        </button>
      ))}
    </div>
  );
}
