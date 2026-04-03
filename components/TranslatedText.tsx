"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const cache = new Map<string, string>();

async function translate(text: string, from: string, to: string): Promise<string> {
  const key = `${from}|${to}|${text.slice(0, 80)}`;
  if (cache.has(key)) return cache.get(key)!;
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    );
    const data = await res.json();
    const translated = data?.responseData?.translatedText ?? text;
    cache.set(key, translated);
    return translated;
  } catch {
    return text;
  }
}

interface Props {
  text: string;
  sourceLang?: string; // default "en"
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export default function TranslatedText({
  text,
  sourceLang = "en",
  as: Tag = "span",
  className,
}: Props) {
  const { lang } = useLanguage();
  const [displayed, setDisplayed] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const targetLang = lang === "tr" ? "tr" : lang === "fr" ? "fr" : "en";
    if (targetLang === sourceLang || (targetLang === "en" && sourceLang === "en")) {
      setDisplayed(text);
      return;
    }

    let cancelled = false;
    setLoading(true);
    translate(text, sourceLang, targetLang).then((result) => {
      if (!cancelled) {
        setDisplayed(result);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [lang, text, sourceLang]);

  return (
    <Tag
      className={`${className ?? ""} transition-opacity duration-200 ${loading ? "opacity-50" : "opacity-100"}`}
    >
      {displayed}
    </Tag>
  );
}
