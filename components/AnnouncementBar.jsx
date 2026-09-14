"use client";

import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const messages = [
  "Complimentary Shipping On Orders Over $75",
  "New Winter 2026 Collection Now Live",
];

const REPEAT = 2;

function AnnouncementBar() {
  const content = Array.from({ length: REPEAT })
    .map(() => messages.join("   •   "))
    .join("   •   ");

  return (
    <div className="fixed top-0 right-0 left-0 z-40 h-9 overflow-hidden border-b border-white/10 bg-stone-950">
      <div
        className={`${notoSans.className} flex h-full w-max animate-marquee items-center whitespace-nowrap text-[11px] tracking-[0.25em] text-white/70 uppercase`}
      >
        <span className="pr-12">{content}</span>
        <span className="pr-12" aria-hidden="true">
          {content}
        </span>
      </div>
    </div>
  );
}

export default AnnouncementBar;
