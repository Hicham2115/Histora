import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
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
            .map(
              (item: any) => `
            <li style="margin-bottom: 15px;">
              <img src="${item.image}" alt="${item.name}" width="80" height="80" style="object-fit: cover; border: 1px solid #ccc; margin-right: 10px; vertical-align: middle;" />
              <span>${item.name} x ${item.quantity} - $${item.price}</span>
            </li>
          `,
            )
            .join("")}
        </ul>
        <p><strong>Total:</strong> $${data.subtotal}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    });
  }
}
