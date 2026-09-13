import "server-only";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  color: string;
  size: string;
  category: string;
  in_stock: string;
};

const API_VERSION = "2025-01";

function getShopifyConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable",
    );
  }
  return { domain, token };
}

async function shopifyStorefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { domain, token } = getShopifyConfig();

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(
      Array.isArray(json.errors)
        ? json.errors.map((e: { message: string }) => e.message).join(", ")
        : "Unknown Shopify GraphQL error",
    );
  }

  return json.data as T;
}

function extractNumericId(gid: string) {
  const match = gid.match(/(\d+)$/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function getShopifyAdminConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  if (!domain || !token) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_ACCESS_TOKEN environment variable",
    );
  }
  return { domain, token };
}

async function shopifyAdminFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { domain, token } = getShopifyAdminConfig();

  const res = await fetch(`https://${domain}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(
      Array.isArray(json.errors)
        ? json.errors.map((e: { message: string }) => e.message).join(", ")
        : "Unknown Shopify GraphQL error",
    );
  }

  return json.data as T;
}

export type OrderInput = {
  email?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode?: string;
  lineItems: {
    name: string;
    price: number;
    quantity: number;
    size?: string | null;
    color?: string | null;
  }[];
  currency?: string;
};

export async function createShopifyOrder(
  input: OrderInput,
): Promise<{ id: string; name: string }> {
  const lineItems = input.lineItems.map((item) => {
    const variantBits = [item.size, item.color].filter(Boolean).join(" / ");
    return {
      title: variantBits ? `${item.name} (${variantBits})` : item.name,
      quantity: item.quantity,
      priceSet: {
        shopMoney: {
          amount: item.price.toFixed(2),
          currencyCode: input.currency ?? "MAD",
        },
      },
    };
  });

  const data = await shopifyAdminFetch<{
    orderCreate: {
      order: { id: string; name: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(
    `
      mutation OrderCreate($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
        orderCreate(order: $order, options: $options) {
          order { id name }
          userErrors { field message }
        }
      }
    `,
    {
      order: {
        email: input.email || undefined,
        phone: input.phone || undefined,
        lineItems,
        shippingAddress: {
          firstName: input.firstName,
          lastName: input.lastName,
          address1: input.address,
          city: input.city,
          zip: input.postalCode || undefined,
          phone: input.phone || undefined,
          countryCode: "MA",
        },
        financialStatus: "PENDING",
        note: "Placed through histora.com custom checkout (cash on delivery).",
      },
      options: {
        inventoryBehaviour: "BYPASS",
      },
    },
  );

  const { order, userErrors } = data.orderCreate;
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(", "));
  }
  if (!order) {
    throw new Error("Shopify did not return an order");
  }
  return order;
}

type ShopifyOption = { name: string; values: string[] };
type ShopifyProductNode = {
  id: string;
  title: string;
  description: string;
  productType: string;
  availableForSale: boolean;
  images: { edges: { node: { url: string } }[] };
  options: ShopifyOption[];
  priceRange: { minVariantPrice: { amount: string } };
};

function findOptionValues(options: ShopifyOption[], name: string) {
  const match = options.find(
    (option) => option.name.toLowerCase() === name.toLowerCase(),
  );
  return match ? match.values.join(",") : "";
}

function mapProduct(node: ShopifyProductNode): Product {
  return {
    id: extractNumericId(node.id),
    name: node.title,
    price: Number.parseFloat(node.priceRange.minVariantPrice.amount),
    description: node.description,
    image: node.images.edges.map((edge) => edge.node.url).join(","),
    color: findOptionValues(node.options, "color"),
    size: findOptionValues(node.options, "size"),
    category: node.productType || "Uncategorized",
    in_stock: node.availableForSale ? "true" : "false",
  };
}



const PRODUCT_FIELDS = `
  id
  title
  description
  productType
  availableForSale
  images(first: 10) {
    edges { node { url } }
  }
  options {
    name
    values
  }
  priceRange {
    minVariantPrice { amount }
  }
`;

export async function getShopifyProducts(): Promise<Product[]> {
  const data = await shopifyStorefrontFetch<{
    products: { edges: { node: ShopifyProductNode }[] };
  }>(`
    query GetProducts {
      products(first: 100, sortKey: TITLE) {
        edges {
          node {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }
  `);

  return data.products.edges.map((edge) => mapProduct(edge.node));
}

export async function getShopifyProductById(
  id: number | string,
): Promise<Product | null> {
  const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  if (!Number.isFinite(numericId)) return null;

  const data = await shopifyStorefrontFetch<{ product: ShopifyProductNode | null }>(
    `
      query GetProduct($id: ID!) {
        product(id: $id) {
          ${PRODUCT_FIELDS}
        }
      }
    `,
    { id: `gid://shopify/Product/${numericId}` },
  );

  return data.product ? mapProduct(data.product) : null;
}
