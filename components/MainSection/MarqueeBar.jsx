"use client";

import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const messages = [
  "New Winter 2026 Collection",
  "Free Shipping On All Orders",
  "Crafted For You",
];

const REPEAT = 6;

function MarqueeBar() {
  const content = Array.from({ length: REPEAT })
    .map(() => messages.join("   •   "))
    .join("   •   ");

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-stone-900 py-3">
      <div
        className={`${notoSans.className} flex w-max animate-marquee items-center whitespace-nowrap text-xs tracking-[0.3em] text-white/80 uppercase`}
      >
        <span className="pr-16">{content}</span>
        <span className="pr-16" aria-hidden="true">
          {content}
        </span>
      </div>
    </div>
  );
}

export default MarqueeBar;
