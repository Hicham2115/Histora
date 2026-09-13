import { Resend } from "resend";
import { createShopifyOrder } from "@/lib/shopify";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image?: string | string[] | null;
  size?: string | null;
  color?: string | null;
};

const normalizeImages = (value: unknown) => {
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

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }

  return new Resend(apiKey);
}

export async function POST(req: Request) {
  try {
    const resend = getResendClient();
    const data = await req.json();

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "histora.art@gmail.com",
      subject: "New Order from Checkout Page",
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address}, ${data.city}, ${data.postalCode}</p>
        <h3>Items:</h3>
        <ul style="list-style: none; padding: 0;">
          ${data.cart
            .map((item: CartItem) => {
              const primaryImage = normalizeImages(item.image)[0];
              return `
            <li style="margin-bottom: 15px;">
              ${
                primaryImage
                  ? `<img src="${primaryImage}" alt="${item.name}" width="80" height="80" style="object-fit: cover; border: 1px solid #ccc; margin-right: 10px; vertical-align: middle;" />`
                  : ""
              }
              <span>${item.name} x ${item.quantity} - $${item.price}${item.size ? ` (Size: ${item.size})` : ""}</span>
            </li>
          `;
            })
            .join("")}
        </ul>
        <p><strong>Total:</strong> $${data.subtotal}</p>
      `,
    });

    let shopifyOrderName: string | null = null;
    let shopifyError: string | null = null;
    try {
      const order = await createShopifyOrder({
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        lineItems: data.cart.map((item: CartItem) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
      });
      shopifyOrderName = order.name;
    } catch (shopifyErr) {
      shopifyError =
        shopifyErr instanceof Error ? shopifyErr.message : "Unknown error";
      console.error("Shopify order creation failed:", shopifyError);
    }

    return new Response(
      JSON.stringify({ success: true, shopifyOrderName, shopifyError }),
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
    });
  }
}
