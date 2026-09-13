import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { Product } from "@/lib/shopify";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => (await api.get<{ products: Product[] }>("/api/products")).data.products,
  });
}
