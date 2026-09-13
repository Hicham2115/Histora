import { getShopifyProducts } from "@/lib/shopify";

export async function GET() {
  try {
    const products = await getShopifyProducts();
    return Response.json({ products });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 },
    );
  }
}
