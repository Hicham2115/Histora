import { Resend } from "resend";

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
      to: "hichamkama20@gmail.com",
      subject: "New Order from Checkout Page",
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address}, ${data.city}, ${data.postalCode}</p>
        <h3>Items:</h3>
        <ul style="list-style: none; padding: 0;">
          ${data.cart
            .map((item: any) => {
              const primaryImage = normalizeImages(item.image)[0];
              return `
            <li style="margin-bottom: 15px;">
              ${
                primaryImage
                  ? `<img src="${primaryImage}" alt="${item.name}" width="80" height="80" style="object-fit: cover; border: 1px solid #ccc; margin-right: 10px; vertical-align: middle;" />`
                  : ""
              }
              <span>${item.name} x ${item.quantity} - $${item.price}</span>
            </li>
          `;
            })
            .join("")}
        </ul>
        <p><strong>Total:</strong> $${data.subtotal}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
    });
  }
}
