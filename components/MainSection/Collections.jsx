"use client";
import React, { useState } from "react";
import { Saira_Stencil_One, Noto_Sans } from "next/font/google";
import Image from "next/image";

import img3 from "@/app/assets/daa.jpeg";
import img4 from "@/app/assets/dqdqd.jpeg";
import img5 from "@/app/assets/qsq.jpeg";
import img6 from "@/app/assets/10 Things Graceful Women Avoid.jpeg";
import { ArrowDown } from "lucide-react";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const products = [
  {
    id: 1,
    category: "V-Neck T-Shirt",
    name: "Embroidered Seersucker Shirt",
    price: 99,
    swatches: [],
    swatchCount: 0,
    image: img3,
  },
  {
    id: 2,
    category: "Cotton T Shirt",
    name: "Basic Slim Fit T-Shirt",
    price: 99,
    swatches: ["#e8e8e0", "#1a1a1a", "#c4b5a0", "#8b7355", "#d4c5b0"],
    swatchCount: 5,
    image: img4,
  },
  {
    id: 3,
    category: "Henley T-Shirt",
    name: "Blurred Print T-Shirt",
    price: 99,
    swatches: ["#d4cdb8", "#2c2c2c", "#8b8575"],
    swatchCount: 3,
    image: img5,
  },
  {
    id: 4,
    category: "Crewneck T-Shirt",
    name: "Full Sleeve Zipper",
    price: 99,
    swatches: ["#f0ead8", "#3d3d3d"],
    swatchCount: 2,
    image: img6,
  },
];

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col gap-3"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image container */}
      <div
        className="relative bg-[#eceef2] overflow-hidden cursor-pointer"
        style={{ aspectRatio: "4/4" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Placeholder silhouette (replace with actual Image component) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Quick add button */}
        <button
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 border border-stone-400 bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ fontSize: "18px", lineHeight: 1 }}
        >
          +
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
  const totalCount = 50;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

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
          <div className="flex gap-4 mt-5">
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
          </div>
        </h2>

        <button
          className={`${notoSans.className} text-sm text-stone-500 hover:text-stone-900 transition-colors duration-200 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-700 mt-2`}
        >
          See All
        </button>
      </div>
      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
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
