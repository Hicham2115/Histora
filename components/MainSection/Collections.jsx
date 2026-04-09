"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Saira_Stencil_One, Noto_Sans } from "next/font/google";
import Image from "next/image";
import { ArrowDown, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const normalizeList = (value) => {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-3"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image container */}
      <div
        className="relative bg-[#eceef2] overflow-hidden cursor-pointer"
        style={{ aspectRatio: "4/4" }}
        onClick={() => {
          router.push(`/collections/${product.id}`);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Placeholder silhouette (replace with actual Image component) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={product.image?.[0] || ""}
            alt={product.name || "Product"}
            width={640}
            height={640}
            unoptimized
            className="object-cover w-full h-full"
          />
        </div>

        {/* Quick add button */}
        <button
          className={`absolute bottom-4 left-1/2 -translate-x-1/2
    w-10 h-10 rounded-full
    bg-white/80 backdrop-blur-md
    border border-stone-200
    shadow-md
    flex items-center justify-center
    text-stone-700
    transition-all duration-300
    hover:bg-black hover:text-white hover:scale-110
    active:scale-95
    ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
  `}
        >
          <Eye className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-1">
        {/* Category + swatches row */}
        <div className="flex items-center gap-2">
          <span
            className={`${notoSans.className} text-[11px] text-stone-400 font-light tracking-wide`}
          >
            {product.category}
          </span>
          {product.swatchCount > 0 && (
            <div className="flex items-center gap-1">
              {product.swatches.slice(0, 2).map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 border border-stone-200"
                  style={{ backgroundColor: color }}
                />
              ))}
              {product.swatchCount > 2 && (
                <span
                  className={`${notoSans.className} text-[10px] text-stone-400`}
                >
                  +{product.swatchCount - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Name + price row */}
        <div className="flex items-start justify-between gap-2">
          <span
            className={`${notoSans.className} text-sm font-semibold text-stone-800 leading-snug`}
          >
            {product.name}
          </span>
          <span
            className={`${notoSans.className} text-sm font-light text-stone-700 whitespace-nowrap`}
          >
            $ {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

function Collections() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image, category, color")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
        setProducts([]);
      } else {
        setProducts(
          (data ?? []).map((item) => {
            const swatches = normalizeList(item.color);
            return {
              id: item.id,
              category: item.category ?? "",
              name: item.name ?? "",
              price: item.price ?? 0,
              swatches,
              swatchCount: swatches.length,
              image: item.image ?? "",
            };
          }),
        );
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
  const visibleProducts = useMemo(() => {
    const start = page * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [page, products]);

  return (
    <section
      className={`${notoSans.className} min-h-screen px-8 md:px-16 py-12`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-8">
        <h2
          className={`${sairaStencil.className} text-[clamp(2.2rem,6vw,4.5rem)] leading-none text-stone-900`}
        >
          Our Latest{" "}
          <span className="inline-flex items-start gap-3">Collections</span>
          <p className={`${notoSans.className} text-sm text-stone-500 mt-2`}>
            Discover our newest arrivals and exclusive collections
          </p>
          {/* <div className="flex gap-4 mt-5">
            <span
              className={`${notoSans.className} text-sm text-black mt-2 hover:underline cursor-pointer`}
            >
              (All)
            </span>
            <span
              className={`${notoSans.className} text-sm text-black mt-2 hover:underline cursor-pointer`}
            >
              Men
            </span>
            <span
              className={`${notoSans.className} text-sm text-black mt-2 hover:underline cursor-pointer`}
            >
              Women
            </span>
            <span
              className={`${notoSans.className} text-sm text-black mt-2 hover:underline cursor-pointer`}
            >
              Kids
            </span>
          </div> */}
        </h2>

        <button
          onClick={() => {
            router.push("/collections");
          }}
          className={`${notoSans.className} text-sm text-stone-500 hover:text-stone-900 transition-colors duration-200 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-700 mt-2`}
        >
          See All
        </button>
      </div>
      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-stone-100" style={{ aspectRatio: "4/4" }} />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-24 bg-stone-100" />
                  <div className="h-4 w-32 bg-stone-100" />
                  <div className="h-4 w-16 bg-stone-100" />
                </div>
              </div>
            ))
          : visibleProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-12">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="w-10 h-10 border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:border-stone-800 hover:bg-stone-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          ‹
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="w-10 h-10 border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:border-stone-800 hover:bg-stone-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center flex-col items-center gap-3 mt-12">
        <p className={`${notoSans.className} text-sm text-stone-500`}>More</p>
        <span className="animate-bounce">
          <ArrowDown />
        </span>{" "}
      </div>
    </section>
  );
}

export default Collections;
