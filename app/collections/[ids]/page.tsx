"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { Heart, Minus, Plus, ZoomIn } from "lucide-react";
import { useStore } from "@/components/store/useStore";
import { useProduct } from "@/hooks/use-product";
import { useProducts } from "@/hooks/use-products";
import { toast } from "sonner";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2X"];

const COLOR_MAP: Record<string, string> = {
  Green: "#7ecbb4",
  Blanc: "#f0ede8",
  Yellow: "#e8d87a",
  Black: "#111111",
  Gray: "#8a8a8a",
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
  const router = useRouter();
  const rawId = params.ids;

  const [activeImage, setActiveImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const wishlist = useStore((state) => state.wishlist);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const addToCart = useStore((state) => state.addToCart);

  const productId = Array.isArray(rawId) ? rawId[0] : rawId;
  const { data: product, isPending } = useProduct(productId);
  const { data: allProducts = [] } = useProducts();

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

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [allProducts, product]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm tracking-[0.2em] text-stone-400 uppercase">
          Loading...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-stone-500">Product not found</p>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const thumbnails = normalizeImages(product?.image ?? null);
  const safeActiveImage = Math.min(
    activeImage,
    Math.max(thumbnails.length - 1, 0),
  );
  const activeImageSrc = thumbnails[safeActiveImage] || thumbnails[0] || "";
  const canZoom = Boolean(activeImageSrc);

  const handleOpenZoom = () => {
    if (!canZoom) return;
    setZoomLevel(1);
    setZoomOrigin("50% 50%");
    setIsZoomOpen(true);
  };

  const handleZoomToggle = () => {
    setZoomLevel((prev) => (prev === 1 ? 2 : 1));
  };

  const handleZoomMove = (event: MouseEvent<HTMLDivElement>) => {
    if (zoomLevel === 1) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const toggleWishlist = () =>
    isWishlisted
      ? removeFromWishlist(product.id)
      : addToWishlist({
          id: product.id,
          name: product.name || "",
          price: product.price || 0,
          image: thumbnails[0] || "",
          quantity,
        });

  return (
    <div className="min-h-screen px-4 pt-28 pb-20 sm:px-6 md:px-8 lg:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_96px_400px] lg:items-start">
          {/* Main image */}
          <div className="relative aspect-4/5 w-full overflow-hidden bg-[#eceef2]">
            {thumbnails.length > 0 && (
              <Image
                src={activeImageSrc}
                alt={product.name || "Product"}
                fill
                unoptimized
                className="object-cover"
              />
            )}
            <button
              type="button"
              onClick={handleOpenZoom}
              className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow transition-colors hover:bg-white"
              aria-label="Open zoom view"
              disabled={!canZoom}
            >
              <ZoomIn className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>

          {/* Thumbnail strip */}
          {thumbnails.length > 0 && (
            <div className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {thumbnails.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square w-16 shrink-0 overflow-hidden border transition-colors sm:w-20 lg:w-full ${
                    safeActiveImage === i
                      ? "border-stone-900"
                      : "border-transparent hover:border-stone-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name || "Product"} view ${i + 1}`}
                    width={100}
                    height={100}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Info */}
          <div className="relative">
            <button
              onClick={toggleWishlist}
              className="absolute top-0 right-0 text-stone-400 transition-colors hover:text-[#f56464]"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? "fill-[#f56464] text-[#f56464]" : ""}`}
                strokeWidth={1.5}
              />
            </button>

            <p className="mb-2 pr-8 text-xs font-medium tracking-[0.2em] text-stone-900 uppercase">
              {product.name}
            </p>
            <p className="mb-1 text-2xl font-medium text-stone-900">
              {product.price} MAD
            </p>
            <p className="mb-5 text-xs text-stone-400">MRP incl. of all taxes</p>
            <p className="mb-6 border-b border-stone-100 pb-5 text-sm leading-relaxed text-stone-600">
              {product.description}
            </p>

            {productColors.length > 0 && (
              <>
                <p className="mb-3 text-xs font-medium tracking-[0.2em] text-stone-500 uppercase">
                  Color
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {productColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className="relative h-9 w-9 rounded-full border border-stone-200"
                      style={{ backgroundColor: COLOR_MAP[color] ?? color }}
                    >
                      {selectedColor === color && (
                        <span className="pointer-events-none absolute -inset-1 rounded-full border-[1.5px] border-stone-900" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}

            {productSizes.length > 0 && (
              <>
                <p className="mb-3 text-xs font-medium tracking-[0.2em] text-stone-500 uppercase">
                  Size
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {ALL_SIZES.map((size) => {
                    const available = productSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => available && setSelectedSize(size)}
                        disabled={!available}
                        className={`h-11 w-11 border text-sm font-medium transition-all ${
                          selectedSize === size
                            ? "border-stone-900 bg-stone-900 text-white"
                            : available
                              ? "border-stone-300 text-stone-900 hover:border-stone-500"
                              : "cursor-not-allowed border-stone-100 text-stone-300 line-through"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Quantity */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-medium tracking-[0.2em] text-stone-500 uppercase">
                Quantity
              </p>
              <div className="flex items-center border border-stone-200">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center text-stone-600 hover:text-stone-900"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center text-stone-600 hover:text-stone-900"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
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
              className="w-full cursor-pointer bg-stone-900 py-4 text-xs font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-[#f56464] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!inStock}
            >
              {inStock ? "Add To Cart" : "Out Of Stock"}
            </button>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-stone-200 pt-12">
            <p className="mb-8 text-xs tracking-[0.25em] text-stone-400 uppercase">
              You May Also Like
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
              {relatedProducts.map((item) => {
                const image = normalizeImages(item.image)[0];
                return (
                  <div
                    key={item.id}
                    className="group cursor-pointer"
                    onClick={() => router.push(`/collections/${item.id}`)}
                  >
                    <div
                      className="relative overflow-hidden bg-[#eceef2]"
                      style={{ aspectRatio: "4/5" }}
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-stone-800">{item.name}</p>
                    <p className="text-sm text-stone-500">{item.price} MAD</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {isZoomOpen && canZoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            className="absolute inset-0 z-0"
            aria-label="Close zoom view"
          />
          <div
            className={`relative z-10 h-[80vh] w-full max-w-5xl overflow-hidden ${
              zoomLevel === 1 ? "cursor-zoom-in" : "cursor-zoom-out"
            }`}
            onMouseMove={handleZoomMove}
            onClick={handleZoomToggle}
          >
            <Image
              src={activeImageSrc}
              alt={product.name || "Product"}
              fill
              unoptimized
              className="object-contain"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: zoomOrigin,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
