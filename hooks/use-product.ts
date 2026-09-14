import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { Product } from "@/lib/shopify";

export function useProduct(handle: string | null | undefined) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: async () =>
      (await api.get<{ product: Product | null }>(`/api/products/${handle}`))
        .data.product,
    enabled: Boolean(handle),
  });
}
