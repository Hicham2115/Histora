import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { Product } from "@/lib/shopify";

export function useProduct(id: string | number | null | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () =>
      (await api.get<{ product: Product | null }>(`/api/products/${id}`)).data
        .product,
    enabled: id !== null && id !== undefined && id !== "",
  });
}
