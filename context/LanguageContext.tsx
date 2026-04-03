"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations, Lang } from "@/lib/translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <T>(fn: (s: typeof translations.tr) => T) => T;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "tr",
  setLang: () => {},
  t: (fn) => fn(translations.tr),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mc_lang") as Lang | null;
    if (stored && ["tr", "en", "fr"].includes(stored)) setLangState(stored);
    setMounted(true);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("mc_lang", l);
  }

  function t<T>(fn: (s: typeof translations.tr) => T): T {
    return fn(translations[lang] as typeof translations.tr);
  }

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: "tr", setLang, t: (fn) => fn(translations.tr) }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
