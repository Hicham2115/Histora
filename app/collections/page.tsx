"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Saira_Stencil_One,
  Cormorant_Garamond,
  Playfair_Display,
  Noto_Sans,
} from "next/font/google";
import { Search, X, Heart, Eye, SlidersHorizontal } from "lucide-react";

import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { useStore } from "@/components/store/useStore";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/shopify";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const normalizeList = (value: string | null) => {
  if (!value) return [] as string[];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

const normalizeImages = (value: string[] | string | null) => {
  if (!value) return [] as string[];
  if (Array.isArray(value)) return value.filter(Boolean) as string[];
  const trimmed = String(value).trim();
  if (!trimmed) return [] as string[];
  if (trimmed.includes(",")) {
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [trimmed];
};

const isInStock = (value: string | null) => {
  if (!value) return false;
  return ["true", "yes", "1", "in_stock", "in stock"].includes(
    value.toLowerCase(),
  );
};

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-stone-200 pb-6">
      <p
        className={`${notoSans.className} mb-4 text-xs font-medium tracking-[0.25em] text-stone-500 uppercase`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`${notoSans.className} group flex w-full items-center gap-2.5 py-1 text-left text-sm text-stone-600 transition-colors hover:text-stone-900 cursor-pointer`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
          checked
            ? "border-stone-900 bg-stone-900"
            : "border-stone-300 group-hover:border-stone-500"
        }`}
      >
        {checked && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const wishlist = useStore((state) => state.wishlist);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);

  const primaryImage = normalizeImages(product.image)[0];
  const swatches = normalizeList(product.color);
  const inStock = isInStock(product.in_stock);
  const isWishlisted = wishlist.some((p) => p.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: primaryImage,
        quantity: 1,
      });
    }
  };

  return (
    <div
      className="group flex cursor-pointer flex-col gap-3"
      onClick={() => router.push(`/collections/${product.handle}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden bg-[#eceef2]"
        style={{ aspectRatio: "4/5" }}
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name || "Product"}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
            No Image
          </div>
        )}

        {!inStock && (
          <span
            className={`${notoSans.className} absolute top-3 left-3 bg-stone-900/85 px-2.5 py-1 text-xs tracking-[0.2em] text-white uppercase`}
          >
            Sold Out
          </span>
        )}

        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-stone-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white cursor-pointer"
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? "fill-[#b8874f] text-[#b8874f]" : ""}`}
            strokeWidth={1.75}
          />
        </button>

        <span
          className={`pointer-events-none absolute bottom-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 shadow-md backdrop-blur-md transition-all duration-300 ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <Eye className="h-4 w-4 stroke-[1.8]" />
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <span className={`${playfair.className} text-base text-stone-900`}>
            {product.name}
          </span>
          {swatches.length > 0 && (
            <div className="flex shrink-0 items-center gap-1 pt-1.5">
              {swatches.slice(0, 3).map((color: string, i: number) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-full border border-stone-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
        <span className={`${notoSans.className} text-xs text-stone-400`}>
          {product.category}
        </span>
        <span className={`${notoSans.className} text-sm text-stone-700`}>
          {product.price} MAD
        </span>
      </div>
    </div>
  );
}

export default function Collections() {
  const { data: products = [], isPending } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sizesList = useMemo(
    () => Array.from(new Set(products.flatMap((p) => normalizeList(p.size)))),
    [products],
  );

  const colorsList = useMemo(
    () => Array.from(new Set(products.flatMap((p) => normalizeList(p.color)))),
    [products],
  );

  const categoriesList = useMemo(
    () => Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
    [products],
  );

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void,
  ) => {
    setList(
      list.includes(value) ? list.filter((i) => i !== value) : [...list, value],
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch = (p.name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const productSizes = normalizeList(p.size);
    const matchSize =
      selectedSizes.length === 0 ||
      productSizes.some((s) => selectedSizes.includes(s));

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);

    const matchStock = !inStockOnly || isInStock(p.in_stock);

    const productColors = normalizeList(p.color);
    const matchColor =
      selectedColors.length === 0 ||
      productColors.some((c) => selectedColors.includes(c));

    return (
      matchSearch && matchSize && matchCategory && matchStock && matchColor
    );
  });

  const activeFilters = [
    ...selectedSizes.map((v) => ({ type: "size" as const, value: v })),
    ...selectedCategories.map((v) => ({ type: "category" as const, value: v })),
    ...selectedColors.map((v) => ({ type: "color" as const, value: v })),
    ...(inStockOnly ? [{ type: "stock" as const, value: "In Stock" }] : []),
  ];

  const clearFilter = (type: string, value: string) => {
    if (type === "size") toggle(value, selectedSizes, setSelectedSizes);
    if (type === "category")
      toggle(value, selectedCategories, setSelectedCategories);
    if (type === "color") toggle(value, selectedColors, setSelectedColors);
    if (type === "stock") setInStockOnly(false);
  };

  const clearAll = () => {
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedColors([]);
    setInStockOnly(false);
    setSearch("");
  };

  const filterContent = (
    <div className="flex flex-col gap-6">
      {sizesList.length > 0 && (
        <FilterGroup label="Size">
          <div className="flex flex-wrap gap-2">
            {sizesList.map((size) => {
              const active = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggle(size, selectedSizes, setSelectedSizes)}
                  className={`${notoSans.className} h-9 min-w-9 border px-3 text-xs transition-colors ${
                    active
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-300 text-stone-600 hover:border-stone-500"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </FilterGroup>
      )}

      {categoriesList.length > 0 && (
        <FilterGroup label="Category">
          <div className="flex flex-col gap-1">
            {categoriesList.map((cat) => (
              <CheckRow
                key={cat}
                label={cat}
                checked={selectedCategories.includes(cat)}
                onToggle={() =>
                  toggle(cat, selectedCategories, setSelectedCategories)
                }
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {colorsList.length > 0 && (
        <FilterGroup label="Color">
          <div className="flex flex-col gap-1">
            {colorsList.map((color) => (
              <CheckRow
                key={color}
                label={color}
                checked={selectedColors.includes(color)}
                onToggle={() =>
                  toggle(color, selectedColors, setSelectedColors)
                }
              />
            ))}
          </div>
        </FilterGroup>
      )}

      <div className="pb-2">
        <p
          className={`${notoSans.className} mb-4 text-xs font-medium tracking-[0.25em] text-stone-500 uppercase`}
        >
          Availability
        </p>
        <CheckRow
          label="In Stock Only"
          checked={inStockOnly}
          onToggle={() => setInStockOnly((v) => !v)}
        />
      </div>
    </div>
  );

  return (
    <div
      className={`${notoSans.className} mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-10 lg:pt-36`}
    >
      {/* HEADER */}
      <div className="mb-12 border-b border-stone-200 pb-10">
        <p className="text-xs tracking-[0.25em] text-stone-400 uppercase">
          <Link href="/" className="transition-colors hover:text-stone-900">
            Home
          </Link>
          <span className="mx-2 text-stone-300">/</span>
          <span className="text-stone-600">Collections</span>
        </p>

        <h1
          className={`${sairaStencil.className} mt-4 text-[clamp(2.4rem,6vw,4rem)] leading-none text-stone-900`}
        >
          The Collection
        </h1>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* FILTERS — desktop */}
        <div className="hidden w-60 shrink-0 lg:block">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs tracking-[0.3em] text-stone-400 uppercase">
              Filters
            </span>
            <span className="h-px flex-1 bg-stone-200" />
          </div>
          {filterContent}
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          {/* SEARCH + mobile filter toggle */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-b border-stone-300 bg-transparent py-2 pl-6 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-[#b8874f]"
              />
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className={`${notoSans.className} flex items-center gap-2 border border-stone-300 px-4 py-2 text-xs tracking-[0.15em] text-stone-700 uppercase transition-colors hover:border-stone-900 hover:text-stone-900 lg:hidden`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </button>
          </div>

          {/* ACTIVE FILTERS */}
          {activeFilters.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <button
                  key={`${f.type}-${f.value}`}
                  type="button"
                  onClick={() => clearFilter(f.type, f.value)}
                  className="flex items-center gap-1.5 border border-stone-300 px-3 py-1 text-xs text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900"
                >
                  {f.value}
                  <X className="h-3 w-3" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-stone-400 underline underline-offset-2 hover:text-stone-900 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* GRID */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
            {isPending &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton
                    className="rounded-none"
                    style={{ aspectRatio: "4/5" }}
                  />
                  <Skeleton className="h-3 w-2/3 rounded-none" />
                  <Skeleton className="h-3 w-1/3 rounded-none" />
                </div>
              ))}

            {!isPending &&
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {!isPending && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p
                className={`${sairaStencil.className} text-2xl text-stone-800`}
              >
                Nothing here yet.
              </p>
              <p className="text-base text-stone-500">
                Try adjusting your filters or search.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-2 border border-stone-900 px-6 py-2.5 text-xs tracking-[0.2em] text-stone-900 uppercase transition-colors hover:border-[#b8874f] hover:bg-[#b8874f] hover:text-white cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FILTERS — mobile drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute top-0 right-0 h-full w-[85vw] max-w-sm overflow-y-auto bg-[#f7f5f2] p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span
                className={`${sairaStencil.className} text-xl text-stone-900`}
              >
                Filters
              </span>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close"
                className="text-stone-500 hover:text-stone-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterContent}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full cursor-pointer bg-stone-900 py-3 text-xs tracking-[0.2em] text-white uppercase transition-colors hover:bg-[#b8874f]"
            >
              Show {filteredProducts.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
