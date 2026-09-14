import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/MainSection/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/MainSection/Footer";
import Grainient from "@/components/Grainient";
import SmoothScroll from "@/components/SmoothScroll";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://histora.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Histora – Clothing, Mugs & Wall Art",
    template: "%s | Histora",
  },
  description:
    "Discover unique clothing, stylish mugs, and modern wall art from Histora. Every product tells a story. Shop high-quality lifestyle pieces designed to inspire.",

  keywords: [
    "clothing store",
    "mugs",
    "wall art",
    "home decor",
    "fashion",
    "lifestyle brand",
    "unique designs",
    "Morocco streetwear",
  ],

  authors: [{ name: "Histora" }],
  creator: "Histora",
  publisher: "Histora",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Histora – Every Product Tells a Story",
    description:
      "Shop clothing, mugs, and artistic wall decor crafted with style and meaning.",
    url: siteUrl,
    siteName: "Histora",
    images: [
      {
        url: "/og-image.png",
        width: 1808,
        height: 870,
        alt: "Histora Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Histora Store",
    description:
      "Clothing, mugs, and wall art that bring style to your everyday life.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  metadataBase: new URL(siteUrl),
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative text-black">
        <QueryProvider>
          <SmoothScroll />
          <div className="fixed inset-0 -z-10">
            <Grainient
              color1="#c0bfc0"
              color2="#dfdddd"
              color3="#b8b7b7"
              timeSpeed={0.25}
              colorBalance={0}
              warpStrength={1}
              warpFrequency={5}
              warpSpeed={2}
              warpAmplitude={50}
              blendAngle={0}
              blendSoftness={0.05}
              rotationAmount={500}
              noiseScale={2}
              grainAmount={0.1}
              grainScale={2}
              grainAnimated={false}
              contrast={1.5}
              gamma={1}
              saturation={1}
              centerX={0}
              centerY={0}
              zoom={0.9}
            />
          </div>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
