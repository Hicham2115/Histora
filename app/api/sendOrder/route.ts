import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  await resend.emails.send({
    from: 'histora.com',
    to: 'hichamkama20@gmail.com',
    subject: '🛒 New Order',
    html: `<p>New order from ${body.first_name}</p>`,
  });

  return Response.json({ success: true });
}