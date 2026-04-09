"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Saira_Stencil_One,
  Cormorant_Garamond,
  Noto_Sans,
} from "next/font/google";

// shadcn
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });

type Product = {
  id: number;
  name: string | null;
  price: number | null;
  description: string | null;
  image: string[] | null;
  color: string | null;
  size: string | null;
  category: string | null;
  in_stock: string | null;
};

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setLoadError(null);
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, price, description, image, color, size, category, in_stock",
        )
        .order("id", { ascending: true });

      console.log("Fetched products:", data);

      if (error) {
        console.error(error);
        setLoadError("Failed to load products.");
        setProducts([]);
      } else {
        setProducts((data ?? []) as Product[]);
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  const normalizeList = (value: string | null) => {
    if (!value) return [] as string[];
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  };

  const sizesList = useMemo(
    () => Array.from(new Set(products.flatMap((p) => normalizeList(p.size)))),
    [products],
  );

  const colorsList = ["White", "Black"];

  const categoriesList = [
    "T-Shirts",

    "Hoodies / Sweatshirts",
    "Sweaters / Pullovers",

    "Jeans",
    "Trousers / Pants",

    "Sweatpants / Joggers",
  ];

  const isInStock = (value: string | null) => {
    if (!value) return false;
    return ["true", "yes", "1", "in_stock", "in stock"].includes(
      value.toLowerCase(),
    );
  };

  // toggle helpers
  const toggle = (value: string, list: string[], setList: any) => {
    setList(
      list.includes(value) ? list.filter((i) => i !== value) : [...list, value],
    );
  };

  // FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    const matchSearch = (p.name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const productSizes = normalizeList(p.size);
    const matchSize =
      selectedSizes.length === 0 ||
      productSizes.some((s) => selectedSizes.includes(s));

    const productCategories = normalizeList(p.category).map((c) =>
      c.toLowerCase(),
    );
    const matchCategory =
      selectedCategories.length === 0 ||
      productCategories.some((c) =>
        selectedCategories.map((s) => s.toLowerCase()).includes(c),
      );

    const matchStock = !inStockOnly || isInStock(p.in_stock);

    const productColors = normalizeList(p.color).map((c) => c.toLowerCase());
    const matchColor =
      selectedColors.length === 0 ||
      productColors.some((c) =>
        selectedColors.map((s) => s.toLowerCase()).includes(c),
      );

    return (
      matchSearch && matchSize && matchCategory && matchStock && matchColor
    );
  });

  return (
    <div className="flex flex-col gap-10 px-4 py-8 sm:px-6 lg:flex-row lg:px-10 lg:py-10">
      {/* FILTERS */}
      <div className="w-full space-y-6 lg:mt-30 lg:w-[260px]">
        <h2 className={`text-xl font-semibold ${sairaStencil.className}`}>
          Filters
        </h2>

        {/* SIZE */}
        <div>
          <p className={`mb-2 font-medium ${sairaStencil.className}`}>Size</p>
          <div className="flex flex-wrap gap-2">
            {sizesList.length === 0 ? (
              <span className="text-sm text-stone-400">No sizes</span>
            ) : (
              sizesList.map((size) => (
                <Button
                  key={size}
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
                  onClick={() => toggle(size, selectedSizes, setSelectedSizes)}
                  className="bg-transparent border border-[#606054ac] rounded-sm"
                >
                  {size}
                </Button>
              ))
            )}
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="space-y-2">
          <p className={`font-medium ${sairaStencil.className}`}>
            Availability
          </p>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={inStockOnly}
              onCheckedChange={() => setInStockOnly(!inStockOnly)}
              className="bg-transparent border border-[#606054ac] rounded-sm"
            />
            <span>In Stock Only</span>
          </div>
        </div>

        {/* CATEGORY */}
        <div>
          <p className={`mb-2 font-medium ${sairaStencil.className}`}>
            Category
          </p>
          <div className="space-y-2">
            {categoriesList.length === 0 ? (
              <span className="text-sm text-stone-400">No categories</span>
            ) : (
              categoriesList.map((cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() =>
                      toggle(cat, selectedCategories, setSelectedCategories)
                    }
                    className="bg-transparent border border-[#606054ac] rounded-sm"
                  />
                  <span>{cat}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <p className={`mb-2 font-medium ${sairaStencil.className}`}>Colors</p>
          <div className="space-y-2">
            {colorsList.length === 0 ? (
              <span className="text-sm text-stone-400">No colors</span>
            ) : (
              colorsList.map((color) => (
                <div key={color} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() =>
                      toggle(color, selectedColors, setSelectedColors)
                    }
                    className="bg-transparent border border-[#606054ac] rounded-sm"
                  />
                  <span>{color}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        {/* HEADER */}
        <div className="mb-6 mt-6 lg:mt-20">
          <p className="text-sm text-muted-foreground">Home / Collections</p>
          <h1 className={`text-3xl mt-2 ${sairaStencil.className}`}>
            COLLECTIONS
          </h1>
        </div>

        {/* SEARCH */}
        <Input
          placeholder="Search..."
          className="mb-6 border border-[#606054ac] rounded-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loadError && <p className="text-sm text-red-500 mb-4">{loadError}</p>}

        {/* ACTIVE FILTERS */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {selectedSizes.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
          {selectedCategories.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
          {selectedColors.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
          {inStockOnly && <Badge>In Stock</Badge>}
        </div>

        {/* GRID */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-64 w-full bg-stone-100 sm:h-[280px] lg:h-[320px]" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-24 bg-stone-100" />
                    <div className="h-4 w-40 bg-stone-100" />
                    <div className="h-4 w-20 bg-stone-100" />
                  </div>
                </div>
              ))
            : filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => router.push(`/collections/${product.id}`)}
                >
                  <div className="bg-gray-100 overflow-hidden cursor-pointer">
                    <Image
                      src={product.image?.[0] || "/placeholder.png"}
                      alt={product.name || "Product"}
                      width={640}
                      height={800}
                      unoptimized
                      className="h-64 w-full object-cover transition hover:scale-105 sm:h-[280px] lg:h-[320px]"
                    />
                  </div>

                  <div className="mt-3">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="mt-1">{product.price} MAD</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
