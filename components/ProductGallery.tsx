"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/api";

export default function ProductGallery({
  images,
  name,
}: {
  images: ProductImage[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-16 shrink-0">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden border transition-colors ${
                active === i ? "border-[#111]" : "border-transparent"
              }`}
            >
              <Image
                src={img.src}
                alt={`${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 bg-[#F7F7F7] aspect-[3/4] overflow-hidden">
        {images[active] && (
          <Image
            src={images[active].src}
            alt={name}
            fill
            className="object-cover object-top transition-opacity duration-300"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}
      </div>
    </div>
  );
}
