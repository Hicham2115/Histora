"use client";
import { useParams } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { useStore } from "@/components/store/useStore";

import img1 from "@/app/assets/Better Days Ahead Tee - Black _ M.jpeg";
import img2 from "@/app/assets/ffff.jpeg";
import img3 from "@/app/assets/Heren Casual Slogan Print Losse Ronde Hals Korte Mouw T-shirt.jpeg";
import img4 from "@/app/assets/K-GLORY Men's Casual Versatile Simple Graphic Print Short Sleeve T-ShirtI discovered amazing products on SHEIN_com, come check them out!.jpeg";
import img5 from "@/app/assets/Men's Round Neck Short Sleeve Figure Printed Minimalist T-Shirt, Casual Everyday Wear.jpeg";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2X"];

const COLOR_MAP: Record<string, string> = {
  Green: "#7ecbb4",
  Blanc: "#f0ede8",
  Yellow: "#e8d87a",
  Black: "#111111",
  Gray: "#8a8a8a",
};

const products = [
  {
    id: 1,
    name: "Basic Slim Fit T-Shirt",
    price: 199,
    images: [img1],
    sizes: ["S", "M"],
    category: "T-SHIRTS",
    inStock: true,
    colors: ["Green"],
    description:
      "Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.",
  },
  {
    id: 2,
    name: "Heavy Weight T-Shirt",
    price: 199,
    images: [img2],
    sizes: ["L", "XL"],
    category: "T-SHIRTS",
    inStock: false,
    colors: ["Blanc"],
    description:
      "Premium heavyweight cotton. Boxy silhouette with drop shoulders.",
  },
  {
    id: 3,
    name: "Full Sleeve Zipper",
    price: 199,
    images: [img3],
    sizes: ["M", "L"],
    category: "JACKETS",
    inStock: true,
    colors: ["Yellow"],
    description:
      "Oversized zip-up jacket. Ribbed cuffs and hem. Front zip closure.",
  },
  {
    id: 4,
    name: "Graphic Print T-Shirt",
    price: 199,
    images: [img4],
    sizes: ["S", "M"],
    category: "T-SHIRTS",
    inStock: true,
    colors: ["Black"],
    description:
      "Bold graphic print. Crew neck. Regular fit with short sleeves.",
  },
  {
    id: 5,
    name: "Minimalist T-Shirt",
    price: 199,
    images: [img5],
    sizes: ["L", "XL"],
    category: "T-SHIRTS",
    inStock: false,
    colors: ["Yellow"],
    description:
      "Clean minimalist design. Soft cotton blend. Relaxed everyday fit.",
  },
];

export default function ProductPage() {
  const params = useParams();
  const rawId = params.ids;
  const product = products.find((p) => p.id === Number(rawId));

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.colors[0] ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const wishlist = useStore((state) => state.wishlist);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const addToCart = useStore((state) => state.addToCart);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const thumbnails: StaticImageData[] =
    product.images.length > 1
      ? product.images
      : [
          product.images[0],
          product.images[0],
          product.images[0],
          product.images[0],
        ];

  return (
    <div className="min-h-screen  p-8 mt-16">
      <div className="max-w-5xl mx-auto grid grid-cols-[1fr_100px_360px] gap-6 items-start">
        {/* Main image */}
        <div className=" rounded overflow-hidden aspect-[4/5] relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnail strip */}
        <div className="flex flex-col gap-2">
          {thumbnails.slice(0, 5).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-full aspect-square rounded overflow-hidden border-[1.5px] transition-colors ${
                activeImage === i ? "border-black" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} view ${i + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Info card */}
        <div className=" rounded-lg p-6 relative">
          {/* Wishlist */}
          <button
            onClick={() =>
              isWishlisted
                ? removeFromWishlist(product.id)
                : addToWishlist({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0].src,
                    quantity,
                  })
            }
            className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors"
            aria-label="Add to wishlist"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Name & price */}
          <h1 className="text-sm font-medium tracking-widest uppercase text-black mb-2">
            {product.name}
          </h1>
          <p className="text-2xl font-medium text-black mb-1">
            ${product.price}
          </p>
          <p className="text-xs text-gray-500 mb-5">MRP incl. of all taxes</p>
          <p className="text-sm text-black leading-relaxed mb-6 pb-5 border-b border-gray-100">
            {product.description}
          </p>

          {/* Color selector */}
          <p className="text-xs font-medium tracking-widest uppercase text-gray-500 mb-3">
            Color
          </p>
          <div className="flex gap-2 mb-6">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                title={color}
                className={`w-9 h-9 rounded-full border transition-all relative ${
                  color === "Blanc" ? "border-gray-300" : "border-transparent"
                }`}
                style={{ backgroundColor: COLOR_MAP[color] ?? "#ccc" }}
              >
                {selectedColor === color && (
                  <span className="absolute inset-[-4px] rounded-full border-[1.5px] border-black pointer-events-none" />
                )}
              </button>
            ))}
          </div>

          {/* Size selector */}
          <p className="text-xs font-medium tracking-widest uppercase text-gray-500 mb-3">
            Size
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {ALL_SIZES.map((size) => {
              const available = product.sizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => available && setSelectedSize(size)}
                  disabled={!available}
                  className={`w-11 h-11 rounded text-sm font-medium border transition-all ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : available
                        ? "border-gray-300 text-black hover:bg-gray-50"
                        : "border-gray-100 text-gray-300 cursor-not-allowed line-through"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* Size guide links */}
          <div className="flex items-center gap-2 mb-5">
            <button className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-400 hover:text-black transition-colors">
              Find your size
            </button>
            <span className="text-gray-300 text-xs">|</span>
            <button className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-400 hover:text-black transition-colors">
              Measurement guide
            </button>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-medium tracking-widest uppercase text-gray-500">
              Quantity
            </p>
            <div className="flex items-center border border-gray-200 rounded">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 text-lg text-gray-600 hover:text-black"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 text-lg text-gray-600 hover:text-black"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add button */}
          <button
            type="button"
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0].src,
                quantity,
              })
            }
            className={`w-full py-4 rounded text-xs font-medium tracking-widest uppercase transition-all cursor-pointer bg-black text-white`}
            disabled={!product.inStock}
          >
            {product.inStock ? "Add" : "Out of stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
