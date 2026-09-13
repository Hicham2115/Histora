import { createHmac, timingSafeEqual } from "crypto";

function verifyHmac(searchParams: URLSearchParams, secret: string) {
  const hmac = searchParams.get("hmac");
  if (!hmac) return false;

  const pairs: string[] = [];
  searchParams.forEach((value, key) => {
    if (key !== "hmac" && key !== "signature") {
      pairs.push(`${key}=${value}`);
    }
  });
  pairs.sort();
  const message = pairs.join("&");

  const digest = createHmac("sha256", secret).update(message).digest("hex");

  const a = Buffer.from(digest);
  const b = Buffer.from(hmac);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const shop = url.searchParams.get("shop");
  const state = url.searchParams.get("state");

  const apiKey = process.env.SHOPIFY_API_KEY;
  const apiSecret = process.env.SHOPIFY_API_SECRET;
  const expectedShop = process.env.SHOPIFY_STORE_DOMAIN;

  if (!apiKey || !apiSecret || !expectedShop) {
    return new Response("Missing Shopify OAuth environment variables", {
      status: 500,
    });
  }

  if (!code || !shop || shop !== expectedShop) {
    return new Response("Invalid callback request", { status: 400 });
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const cookieState = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("shopify_oauth_state="))
    ?.split("=")[1];

  if (!state || !cookieState || state !== cookieState) {
    return new Response("Invalid state — please restart the install", {
      status: 400,
    });
  }

  if (!verifyHmac(url.searchParams, apiSecret)) {
    return new Response("Invalid HMAC signature", { status: 400 });
  }

  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return new Response(`Token exchange failed: ${text}`, { status: 500 });
  }

  const tokenData = await tokenRes.json();

  return new Response(
    `<!doctype html>
<html>
<body style="font-family: monospace; padding: 40px; background: #f7f5f2;">
  <h2>Shopify app installed</h2>
  <p>Copy this into SHOPIFY_ADMIN_ACCESS_TOKEN in your .env, then delete this page's route.</p>
  <textarea style="width: 100%; height: 60px; font-size: 16px; padding: 10px;">${tokenData.access_token}</textarea>
  <p>Granted scopes: ${tokenData.scope}</p>
</body>
</html>`,
    { headers: { "Content-Type": "text/html" } },
  );
}
