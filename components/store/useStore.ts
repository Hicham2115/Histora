"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type Store = {
  cart: Product[];
  wishlist: Product[];
  orders: Product[][];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  placeOrder: () => void;
  clearCart: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      orders: [],
      addToCart: (product) => {
        const cart = [...get().cart];
        const existing = cart.find((p) => p.id === product.id);
        if (existing) {
          existing.quantity += product.quantity;
        } else {
          cart.push(product);
        }
        set({ cart });
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((p) => p.id !== id) });
      },
      addToWishlist: (product) => {
        const wishlist = [...get().wishlist];
        if (!wishlist.find((p) => p.id === product.id)) {
          wishlist.push(product);
        }
        set({ wishlist });
      },
      removeFromWishlist: (id) => {
        set({ wishlist: get().wishlist.filter((p) => p.id !== id) });
      },
      placeOrder: () => {
        set((state) => ({
          orders: [...state.orders, state.cart],
          cart: [],
        }));
      },
      clearCart: () => set({ cart: [] }),
    }),
    { name: "store" } // localStorage key
  )
);