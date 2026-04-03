const BASE = "https://maxcavalera.com.tr/wp-json/wc/store/v1";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json",
};

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  terms: { id: number; name: string; slug: string }[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_symbol: string;
    currency_minor_unit: number;
  };
  on_sale: boolean;
  images: ProductImage[];
  categories: ProductCategory[];
  attributes: ProductAttribute[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
  image: { src: string } | null;
}

export async function getProducts(params?: {
  per_page?: number;
  page?: number;
  category?: number;
  orderby?: string;
  order?: string;
}): Promise<Product[]> {
  const query = new URLSearchParams({
    per_page: String(params?.per_page ?? 16),
    page: String(params?.page ?? 1),
    orderby: params?.orderby ?? "date",
    order: params?.order ?? "desc",
    ...(params?.category ? { category: String(params.category) } : {}),
  });

  const res = await fetch(`${BASE}/products?${query}`, {
    headers: HEADERS,
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts({ per_page: 100 });
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/products/categories?per_page=50`, {
    headers: HEADERS,
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];
  const all: Category[] = await res.json();
  const featured = [
    "all-suits",
    "luxury-suit",
    "coat-overcoats",
    "all-shoes",
    "all-shirt",
    "accessory",
  ];
  return featured
    .map((slug) => all.find((c) => c.slug === slug))
    .filter(Boolean) as Category[];
}

export function formatPrice(price: string, minorUnit: number): string {
  const value = parseInt(price) / Math.pow(10, minorUnit);
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}
