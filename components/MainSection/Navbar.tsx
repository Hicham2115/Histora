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
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store/useStore";

// Navigation links array
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/#new_arrivals", label: "New Arrivals" },
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

  console.log("from navbar", { wishlist, cart });

  return (
    <header className="fixed top-0 left-0 right-0 border-b px-4 md:px-6 z-50 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
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
                          className="flex-row items-center gap-2 py-1.5 hover:text-[#f56464] font-medium text-foreground hover:bg-white"
                          href={link.href}
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
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link) => {
                return (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      className="flex-row items-center gap-2 py-1.5 hover:text-[#f56464] font-medium text-foreground hover:bg-transparent"
                      href={link.href}
                    >
                      <span>{link.label}</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Middle side: Logo */}
        <div className="flex items-center">
          <Image
            alt="Histora Logo"
            height={100}
            src={Logo}
            width={100}
            className=" cursor-pointer "
          />
        </div>

        {/* Right side: Actions */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="
    relative h-auto rounded-full bg-black p-2 text-white
    transition-all duration-300 ease-out
    hover:bg-[#f56464]
    hover:scale-110
    hover:-translate-y-1
    hover:rotate-6
    active:scale-95
    cursor-pointer
  "
              >
                <Heart />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f56464] text-[10px] font-semibold text-white">
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
                        className="text-stone-400 hover:text-[#f56464] transition-colors"
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
    hover:bg-[#f56464]
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
          {/* Upgrade button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="
    relative h-auto rounded-full bg-black p-2 text-white
    transition-all duration-300 ease-out
    hover:bg-[#f56464]
    hover:scale-110
    hover:-translate-y-1
    hover:rotate-6
    active:scale-95
    cursor-pointer
  "
              >
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f56464] text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-4">
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">
                Cart
              </p>
              {cart.length === 0 ? (
                <p className="text-sm text-stone-500">Your cart is empty.</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded bg-stone-100">
                        <Image
                          src={item.image?.[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-stone-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-stone-500">
                          {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-stone-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-[#f56464] transition-colors"
                          aria-label="Remove from cart"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {cart.length > 0 && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-stone-500">Total</span>
                  <span className="text-sm font-medium">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              )}
              <Link
                href="/checkout"
                className="mt-4 block w-full rounded bg-black px-4 py-2 text-center text-xs font-medium tracking-widest uppercase text-white hover:bg-[#f56464] transition-colors"
              >
                Checkout
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
