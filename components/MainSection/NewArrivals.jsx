"use client";

import React, { useState } from "react";
import { Playfair_Display, Noto_Sans } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products as staticProducts } from "@/data/products";
import { ArrowLeft, ArrowRight, Eye, Heart } from "lucide-react";
import SplitText from "@/components/SplitText";
import { useStore } from "@/components/store/useStore";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const normalizeImages = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  const trimmed = String(value).trim();
  if (!trimmed) return [];
  if (trimmed.includes(",")) {
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [trimmed];
};

const normalizeList = (value) => {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const wishlist = useStore((state) => state.wishlist);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);

  const imageList = normalizeImages(product.image);
  const primaryImage = imageList[0];
  const swatches = normalizeList(product.color);
  const isWishlisted = wishlist.some((p) => p.id === product.id);

  const toggleWishlist = (e) => {
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
    <div className="flex flex-col gap-3">
      <div
        className="relative bg-[#eceef2] overflow-hidden cursor-pointer"
        style={{ aspectRatio: "1/1" }}
        onClick={() => {
          router.push(`/collections/${product.id}`);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name || "product"}
            fill
            className="object-cover transition-transform duration-700 ease-out hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}

        {/* Wishlist toggle */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm text-stone-700 shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? "fill-[#f56464] text-[#f56464]" : ""}`}
            strokeWidth={1.75}
          />
        </button>

        {/* Quick view */}
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

      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <span className={`${playfair.className} text-base text-stone-900`}>
            {product.name}
          </span>
          {swatches.length > 0 && (
            <div className="flex items-center gap-1 pt-1.5 shrink-0">
              {swatches.slice(0, 3).map((color, i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-full border border-stone-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
        <span className="text-sm text-stone-400">
          {swatches[0] || product.category}
        </span>
        <span className="text-sm text-stone-700">${product.price}</span>
      </div>
    </div>
  );
}

function NewArrivals() {
  const [page, setPage] = useState(0);
  const router = useRouter();

  const itemsPerPage = 4;
  const products = staticProducts;

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));

  const paginatedProducts = products.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  return (
    <section
      className={`${notoSans.className} px-6 md:px-16 py-20 md:py-28`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs tracking-[0.3em] uppercase text-stone-400">
              New Arrivals
            </span>
            <span className="h-px w-10 bg-stone-300" />
          </div>

          <SplitText
            text="New This Week"
            className={`${playfair.className} text-[clamp(2.4rem,6vw,4.25rem)] leading-none text-stone-900`}
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
            showCallback
          />

          <p className="text-sm text-stone-500 mt-4 max-w-md leading-relaxed">
            Fresh drops for the season. Timeless designs, real people,
            everyday stories.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/collections")}
          className="group flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-stone-800 shrink-0 cursor-pointer"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4 mt-14">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous page"
          className="text-stone-400 transition-colors duration-200 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="text-xs tracking-[0.2em] text-stone-500">
          {String(page + 1).padStart(2, "0")} /{" "}
          {String(totalPages).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          aria-label="Next page"
          className="text-stone-400 transition-colors duration-200 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

export default NewArrivals;
