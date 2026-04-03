"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Size {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  slug: string;
  sizes: Size[];
}

export default function ProductActions({ slug, sizes }: Props) {
  const [selected, setSelected] = useState<string>("");
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function handleBuyNow() {
    const params = new URLSearchParams({ product: slug });
    if (selected) params.set("size", selected);
    router.push(`/checkout?${params}`);
  }

  return (
    <div>
      {sizes.length > 0 && (
        <div className="mb-8">
          <p className="text-[10px] tracking-widest uppercase text-[#999] mb-4">
            Beden Seç
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s.name)}
                className={`text-[11px] tracking-wider border px-3 py-2 transition-colors ${
                  selected === s.name
                    ? "border-[#111] bg-[#111] text-white"
                    : "border-[#E8E8E8] text-[#111] hover:border-[#111]"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="w-full bg-[#111] text-white text-[11px] tracking-widest uppercase py-4 hover:bg-[#333] transition-colors mb-4"
      >
        {addedToCart ? "✓ Sepete Eklendi" : "Sepete Ekle"}
      </button>

      <button
        onClick={handleBuyNow}
        className="w-full border border-[#111] text-[#111] text-[11px] tracking-widest uppercase py-4 hover:bg-[#111] hover:text-white transition-colors"
      >
        Hemen Al
      </button>
    </div>
  );
}
