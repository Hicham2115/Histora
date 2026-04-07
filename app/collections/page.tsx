"use client";

import React, { useState } from "react";
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

import img1 from "@/app/assets/Better Days Ahead Tee - Black _ M.jpeg";
import img2 from "@/app/assets/ffff.jpeg";
import img3 from "@/app/assets/Heren Casual Slogan Print Losse Ronde Hals Korte Mouw T-shirt.jpeg";
import img4 from "@/app/assets/K-GLORY Men's Casual Versatile Simple Graphic Print Short Sleeve T-ShirtI discovered amazing products on SHEIN_com, come check them out!.jpeg";
import img5 from "@/app/assets/Men's Round Neck Short Sleeve Figure Printed Minimalist T-Shirt, Casual Everyday Wear.jpeg";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });

const sizesList = ["S", "M", "L", "XL"];
const categoriesList = ["T-SHIRTS", "JACKETS", "MUGS", "WALL ART", "HOODIES"];

const products = [
  {
    id: 1,
    name: "Basic Slim Fit T-Shirt",
    price: 199,
    image: img1,
    sizes: ["S", "M"],
    category: "T-SHIRTS",
    inStock: true,
    colors: ["Green"],
  },
  {
    id: 2,
    name: "Heavy Weight T-Shirt",
    price: 199,
    image: img2,
    sizes: ["L", "XL"],
    category: "T-SHIRTS",
    inStock: false,
    colors: ["Balnc"],
  },
  {
    id: 3,
    name: "Full Sleeve Zipper",
    price: 199,
    image: img3,
    sizes: ["M", "L"],
    category: "JACKETS",
    inStock: true,
    colors: ["Yellow"],
  },
  {
    id: 4,
    name: "Graphic Print T-Shirt",
    price: 199,
    image: img4,
    sizes: ["S", "M"],
    category: "T-SHIRTS",
    inStock: true,
    colors: ["Black"],
  },
  {
    id: 5,
    name: "Minimalist T-Shirt",
    price: 199,
    image: img5,
    sizes: ["L", "XL"],
    category: "T-SHIRTS",
    inStock: false,
    colors: ["Yellow"],
  },
];

const colorsList = Array.from(new Set(products.flatMap((p) => p.colors || [])));

export default function Collections() {
  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // toggle helpers
  const toggle = (value: string, list: string[], setList: any) => {
    setList(
      list.includes(value) ? list.filter((i) => i !== value) : [...list, value],
    );
  };

  // FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

    const matchSize =
      selectedSizes.length === 0 ||
      p.sizes.some((s) => selectedSizes.includes(s));

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);

    const matchStock = !inStockOnly || p.inStock;

    const matchColor =
      !selectedColors ||
      selectedColors.length === 0 ||
      (p.colors && p.colors.some((c) => selectedColors.includes(c)));

    return (
      matchSearch && matchSize && matchCategory && matchStock && matchColor
    );
  });

  return (
    <div className="flex gap-10 px-10 py-10">
      {/* FILTERS */}
      <div className="w-[260px] space-y-6 mt-30">
        <h2 className={`text-xl font-semibold ${sairaStencil.className}`}>
          Filters
        </h2>

        {/* SIZE */}
        <div>
          <p className={`mb-2 font-medium ${sairaStencil.className}`}>Size</p>
          <div className="flex flex-wrap gap-2">
            {sizesList.map((size) => (
              <Button
                key={size}
                variant={selectedSizes.includes(size) ? "default" : "outline"}
                onClick={() => toggle(size, selectedSizes, setSelectedSizes)}
                className="bg-transparent border border-[#606054ac] rounded-sm"
              >
                {size}
              </Button>
            ))}
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
            {categoriesList.map((cat) => (
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
            ))}
          </div>
        </div>

        <div>
          <p className={`mb-2 font-medium ${sairaStencil.className}`}>Colors</p>
          <div className="space-y-2">
            {colorsList.map((color) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        {/* HEADER */}
        <div className="mb-6 mt-20">
          <p className="text-sm text-muted-foreground">Home / Products</p>
          <h1 className={`text-3xl mt-2 ${sairaStencil.className}`}>
            PRODUCTS
          </h1>
        </div>

        {/* SEARCH */}
        <Input
          placeholder="Search..."
          className="mb-6 border border-[#606054ac] rounded-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ACTIVE FILTERS */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {selectedSizes.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
          {selectedCategories.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
          {inStockOnly && <Badge>In Stock</Badge>}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <div className="bg-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[320px] object-cover hover:scale-105 transition"
                />
              </div>

              <div className="mt-3">
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
                <h3 className="font-medium">{product.name}</h3>
                <p className="mt-1">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
