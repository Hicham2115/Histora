"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/components/store/useStore";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2X"];

const COLOR_MAP: Record<string, string> = {
  Green: "#7ecbb4",
  Blanc: "#f0ede8",
  Yellow: "#e8d87a",
  Black: "#111111",
  Gray: "#8a8a8a",
};

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

const isInStockValue = (value: string | null) => {
  if (!value) return false;
  return ["true", "yes", "1", "in_stock", "in stock"].includes(
    value.toLowerCase(),
  );
};

export default function ProductPage() {
  const params = useParams();
  const rawId = params.ids;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const wishlist = useStore((state) => state.wishlist);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const loadProduct = async () => {
      const productId = Number(rawId);
      if (!Number.isFinite(productId)) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, price, description, image, color, size, category, in_stock",
        )
        .eq("id", productId)
        .single();

      // console.log("Supabase response for product:", { data, error });

      if (error) {
        console.error(error);
        setProduct(null);
      } else {
        setProduct(data as Product);
      }

      setLoading(false);
    };

    loadProduct();
  }, [rawId]);

  useEffect(() => {
    if (!product) return;
    const sizes = normalizeList(product.size);
    const colors = normalizeList(product.color);
    setSelectedSize((prev) => prev ?? sizes[0] ?? null);
    setSelectedColor((prev) => prev ?? colors[0] ?? null);
  }, [product]);

  const productSizes = useMemo(
    () => normalizeList(product?.size ?? null),
    [product],
  );
  const productColors = useMemo(
    () => normalizeList(product?.color ?? null),
    [product],
  );
  const inStock = isInStockValue(product?.in_stock ?? null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const thumbnails = normalizeImages(product?.image ?? null);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 mt-16">
      <div className="max-w-5xl mx-auto">
        {/* ── Mobile / Tablet layout (< lg) ── */}
        <div className="lg:hidden flex flex-col gap-4">
          {/* Main image */}
          <div className="rounded overflow-hidden aspect-[4/5] relative w-full">
            {thumbnails.length > 0 && (
              <Image
                src={thumbnails[activeImage] || thumbnails[0]}
                alt={product.name || "Product"}
                fill
                unoptimized
                className="object-cover"
              />
            )}
          </div>

          {/* Thumbnail strip — horizontal on mobile */}
          {thumbnails.length > 0 && (
            <div className="flex flex-row gap-2 overflow-x-auto pb-1">
              {thumbnails.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden border-[1.5px] transition-colors ${
                    activeImage === i ? "border-black" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name || "Product"} view ${i + 1}`}
                    width={80}
                    height={80}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Info card */}
          <div className="rounded-lg p-4 sm:p-6 relative">
            {/* Wishlist */}
            <button
              onClick={() =>
                isWishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist({
                      id: product.id,
                      name: product.name || "",
                      price: product.price || 0,
                      image: thumbnails[0] || "",
                      quantity,
                    })
              }
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-400 hover:text-black transition-colors"
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
            <h1 className="text-sm font-medium tracking-widest uppercase text-black mb-2 pr-8">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-black mb-1">
              {product.price} MAD
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
              {productColors.map((color) => (
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
                const available = productSizes.includes(size);
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
              {/* <button className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-400 hover:text-black transition-colors">
                Measurement guide
              </button> */}
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
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name || "",
                  price: product.price || 0,
                  image: thumbnails[0] || "",
                  quantity,
                  size: selectedSize ?? null,
                  color: selectedColor ?? null,
                });
                toast.success("Added to cart");
              }}
              className="w-full py-4 rounded text-xs font-medium tracking-widest uppercase transition-all cursor-pointer bg-black text-white disabled:opacity-50"
              disabled={!inStock}
            >
              {inStock ? "Add" : "Out of stock"}
            </button>
          </div>
        </div>

        {/* ── Desktop layout (lg+) ── */}
        <div className="hidden lg:grid grid-cols-[1fr_100px_360px] gap-6 items-start">
          {/* Main image */}
          <div className="rounded overflow-hidden aspect-[4/5] relative">
            {thumbnails.length > 0 && (
              <Image
                src={thumbnails[activeImage] || thumbnails[0]}
                alt={product.name || "Product"}
                fill
                unoptimized
                className="object-cover"
              />
            )}
          </div>

          {/* Thumbnail strip — vertical */}
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
                  alt={`${product.name || "Product"} view ${i + 1}`}
                  width={100}
                  height={100}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Info card */}
          <div className="rounded-lg p-6 relative">
            {/* Wishlist */}
            <button
              onClick={() =>
                isWishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist({
                      id: product.id,
                      name: product.name || "",
                      price: product.price || 0,
                      image: thumbnails[0] || "",
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
              {product.price} MAD
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
              {productColors.map((color) => (
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
                const available = productSizes.includes(size);
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
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name || "",
                  price: product.price || 0,
                  image: thumbnails[0] || "",
                  quantity,
                  size: selectedSize ?? null,
                  color: selectedColor ?? null,
                });
                toast.success("Added to cart");
              }}
              className="w-full py-4 rounded text-xs font-medium tracking-widest uppercase transition-all cursor-pointer bg-black text-white disabled:opacity-50"
              disabled={!inStock}
            >
              {inStock ? "Add" : "Out of stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
