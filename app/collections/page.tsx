import type { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";

export const metadata: Metadata = {
  title: "Shop All Collections",
  description:
    "Browse Histora's full collection of clothing, mugs, and wall art. Filter by size, color, and category to find your next favorite piece.",
  alternates: {
    canonical: "/collections",
  },
  openGraph: {
    title: "Shop All Collections | Histora",
    description:
      "Browse Histora's full collection of clothing, mugs, and wall art.",
    url: "/collections",
  },
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}
