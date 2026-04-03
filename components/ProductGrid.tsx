import type { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm tracking-widest text-[#999] uppercase">
          Ürün bulunamadı
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
