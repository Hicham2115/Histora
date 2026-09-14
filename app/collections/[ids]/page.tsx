import type { Metadata } from "next";
import { getShopifyProductByHandle } from "@/lib/shopify";
import ProductClient from "./ProductClient";

type Props = {
  params: Promise<{ ids: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ids: handle } = await params;
  const product = await getShopifyProductByHandle(handle).catch(() => null);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const image = product.image.split(",")[0]?.trim();
  const description =
    product.description?.slice(0, 155) ||
    `Shop ${product.name} at Histora — ${product.price} MAD.`;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `/collections/${product.handle}`,
    },
    openGraph: {
      title: product.name,
      description,
      url: `/collections/${product.handle}`,
      type: "website",
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default function ProductPage() {
  return <ProductClient />;
}
