import { randomBytes } from "crypto";

const SCOPES = "write_orders,read_orders";

export async function GET() {
  const apiKey = process.env.SHOPIFY_API_KEY;
  const appUrl = process.env.SHOPIFY_APP_URL;
  const shop = process.env.SHOPIFY_STORE_DOMAIN;

  if (!apiKey || !appUrl || !shop) {
    return new Response("Missing Shopify OAuth environment variables", {
      status: 500,
    });
  }

  const state = randomBytes(16).toString("hex");
  const redirectUri = `${appUrl}/api/shopify/callback`;

  const authorizeUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authorizeUrl.searchParams.set("client_id", apiKey);
  authorizeUrl.searchParams.set("scope", SCOPES);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", state);

  const response = new Response(null, {
    status: 302,
    headers: { Location: authorizeUrl.toString() },
  });
  response.headers.append(
    "Set-Cookie",
    `shopify_oauth_state=${state}; Path=/; HttpOnly; Max-Age=300; SameSite=Lax`,
  );
  return response;
}
