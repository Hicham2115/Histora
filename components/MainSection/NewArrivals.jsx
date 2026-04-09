"use client";

import React, { useEffect, useState } from "react";
import { Saira_Stencil_One, Noto_Sans } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import router from "next/dist/shared/lib/router/router";
import { Eye } from "lucide-react";
import SplitText from "@/components/SplitText";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});


function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

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
        {product.image ? (
          <Image
            src={product.image?.[0]}
            alt={product.name || "product"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}

        {/* Quick add */}
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
        <span className="text-[11px] text-stone-400">{product.category}</span>

        <div className="flex justify-between">
          <span className="text-sm font-semibold text-stone-800">
            {product.name}
          </span>
          <span className="text-sm text-stone-700">${product.price}</span>
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="h-3 w-16" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

function NewArrivals() {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const itemsPerPage = 4;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, description, image, category");

      // console.log("Supabase response:", { data, error });

      if (error) {
        setError("Failed to load products");
        setProducts([]);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  return (
    <section
      className={`${notoSans.className} min-h-screen px-6 md:px-16 py-12`}
    >
      {/* Header */}
      <div className="flex justify-between mb-8">
        <SplitText
          text="NEW THIS WEEK"
          className={`${sairaStencil.className} text-[clamp(2.2rem,6vw,4.5rem)]`}
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

        {/* <h2
          className={`${sairaStencil.className} text-[clamp(2.2rem,6vw,4.5rem)]`}
        >
          NEW THIS WEEK
        </h2> */}

        <button
          onClick={() => router.push("/collections")}
          className="text-sm text-stone-500 hover:text-black underline"
        >
          See All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
          : paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Error */}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-12">
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
          className="w-10 h-10 border border-stone-300 bg-white flex items-center justify-center text-stone-600 hover:border-stone-800 hover:bg-stone-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200  "
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default NewArrivals;
