"use client";

import {
  Heart,
  HouseIcon,
  InboxIcon,
  Pin,
  ShoppingCart,
  SparklesIcon,
  Trash2,
  UserRound,
  ZapIcon,
} from "lucide-react";

import Logo from "@/app/assets/LOGO.png";
import UserMenu from "@/components/navbar-components/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";

const normalizeImages = (value: string[] | string | null | undefined) => {
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

// Navigation links array
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/#new_arrivals", label: "New Arrivals" },
  // { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export default function Component() {
  const wishlist = useStore((state) => state.wishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const solid = !isHome || scrolled;

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");
    if (!hash || !isHome || (path && path !== "/")) return;

    e.preventDefault();
    const target = document.getElementById(hash);
    if (!target) return;

    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (t: Element, opts?: { offset?: number }) => void };
      }
    ).lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -110 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-9 left-0 right-0 z-50 px-4 transition-all duration-300 md:px-6",
        solid
          ? "border-b border-stone-200 bg-[#dfdddd]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  "group size-8 md:hidden",
                  solid
                    ? "text-stone-900 hover:bg-stone-100 hover:text-stone-900"
                    : "text-white hover:bg-white/10 hover:text-white",
                )}
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="-translate-y-[7px] origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                    d="M4 12L20 12"
                  />
                  <path
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    d="M4 12H20"
                  />
                  <path
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                    d="M4 12H20"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link) => {
                    return (
                      <NavigationMenuItem className="w-full" key={link.label}>
                        <NavigationMenuLink
                          className="group flex-row items-center gap-2 border-l-2 border-transparent py-1.5 pl-2 text-xs tracking-[0.15em] text-foreground uppercase transition-all duration-200 hover:border-stone-900 hover:bg-white hover:pl-3.5 hover:text-stone-900"
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                        >
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-6">
              {navigationLinks.map((link) => {
                return (
                  <NavigationMenuItem
                    key={link.label}
                    className="group/navlink"
                  >
                    <NavigationMenuLink
                      className={cn(
                        "relative flex-row items-center py-1.5 text-xs font-light tracking-[0.2em] whitespace-nowrap uppercase transition-all duration-300 group-hover/navlink:tracking-[0.3em] hover:bg-transparent",
                        solid
                          ? "text-stone-600 group-hover/navlink:text-stone-900"
                          : "text-white/85 group-hover/navlink:text-white",
                      )}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      <span>{link.label}</span>
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 ease-out group-hover/navlink:w-full",
                          solid ? "bg-stone-900" : "bg-white",
                        )}
                      />
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Middle side: Logo */}
        <Link href="/" className="flex items-center">
          <Image
            alt="Histora Logo"
            height={96}
            src={Logo}
            width={96}
            className={cn(
              "h-20 w-20 cursor-pointer transition-transform duration-300  md:h-24 md:w-24",
              !solid && "brightness-0 invert",
            )}
          />
        </Link>

        {/* Right side: Actions */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                aria-label="Wishlist"
                className={cn(
                  "relative size-9 rounded-full backdrop-blur-sm transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer",
                  solid
                    ? "border border-stone-200 bg-stone-100 text-stone-900 hover:border-stone-300 hover:bg-stone-200"
                    : "border border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/15",
                )}
              >
                <Heart className="size-4" strokeWidth={1.75} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b8874f] px-0.5 text-[10px] font-semibold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 p-4">
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">
                Liked Items
              </p>
              {wishlist.length === 0 ? (
                <p className="text-sm text-stone-500">No items yet.</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-auto pr-1">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded bg-stone-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-stone-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-stone-500">${item.price}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </PopoverContent>
          </Popover>
          {/* User menu */}
          {/* <Button
            className="
    h-auto rounded-full bg-black p-2 text-white
    transition-all duration-300 ease-out
    hover:bg-[#b8874f]
    hover:scale-110
    hover:-translate-y-1
    hover:rotate-6
    active:scale-95
    cursor-pointer
  "
            variant="ghost"
          >
            <UserRound />
          </Button> */}
          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Cart"
                className={cn(
                  "relative size-9 rounded-full backdrop-blur-sm transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer",
                  solid
                    ? "border border-stone-200 bg-stone-100 text-stone-900 hover:border-stone-300 hover:bg-stone-200"
                    : "border border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/15",
                )}
              >
                <ShoppingCart className="size-4" strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b8874f] px-0.5 text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
              <SheetHeader className="border-b border-stone-100 pb-4">
                <SheetTitle className="text-xs font-medium tracking-[0.2em] text-stone-900 uppercase">
                  Cart
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-auto px-4">
                {cart.length === 0 ? (
                  <p className="text-sm text-stone-500">Your cart is empty.</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const primaryImage = normalizeImages(item.image)[0];
                      return (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-stone-100">
                            {primaryImage ? (
                              <Image
                                src={primaryImage}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-stone-400">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-stone-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-stone-500">
                              {item.quantity} × {item.price} MAD
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-stone-600">
                              {(item.price * item.quantity).toFixed(2)} MAD
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-400 transition-colors hover:text-stone-900 cursor-pointer"
                              aria-label="Remove from cart"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <SheetFooter className="border-t border-stone-100 pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-stone-500">Total</span>
                    <span className="text-sm font-medium">
                      {cartTotal.toFixed(2)} MAD
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    className="block w-full rounded border border-black bg-black px-4 py-3 text-center text-xs font-medium tracking-widest text-white uppercase transition-colors hover:border-[#b8874f] hover:bg-[#b8874f]"
                  >
                    Checkout
                  </Link>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
