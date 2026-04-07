import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/MainSection/Navbar";
import Grainient from "@/components/Grainient";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Histora – Clothing, Mugs & Wall Art",
  description:
    "Discover unique clothing, stylish mugs, and modern wall art. Every product tells a story. Shop high-quality lifestyle pieces designed to inspire.",

  keywords: [
    "clothing store",
    "mugs",
    "wall art",
    "home decor",
    "fashion",
    "lifestyle brand",
    "unique designs",
  ],

  authors: [{ name: "Histora" }],
  creator: "Histora",

  openGraph: {
    title: "Histora – Every Product Tells a Story",
    description:
      "Shop clothing, mugs, and artistic wall decor crafted with style and meaning.",
    url: "https://yourdomain.com",
    siteName: "Histora",
    images: [
      {
        url: "/og-image.jpg", // put in /public
        width: 1200,
        height: 630,
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
    images: ["/og-image.jpg"],
  },

  metadataBase: new URL("https://yourdomain.com"),
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
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
