import type { MetadataRoute } from "next";
import { getShopifyProducts } from "@/lib/shopify";

const siteUrl = "https://histora.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getShopifyProducts();
    productRoutes = products.map((product) => ({
      url: `${siteUrl}/collections/${product.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to load products for sitemap:", error);
  }

  return [...staticRoutes, ...productRoutes];
}
