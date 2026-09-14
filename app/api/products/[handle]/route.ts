import { getShopifyProductByHandle } from "@/lib/shopify";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ handle: string }> },
) {
  try {
    const { handle } = await params;
    const product = await getShopifyProductByHandle(handle);
    return Response.json({ product });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 },
    );
  }
}
