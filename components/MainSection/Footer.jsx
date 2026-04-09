import React from "react";

import { Noto_Sans, Saira_Stencil_One } from "next/font/google";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["300", "400"] });

function Footer() {
  return (
    <footer className="relative bg-[#faf9f7] border-t border-stone-200 px-8 md:px-24 py-12 ">
      {/* Decorative grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & tagline */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span
            className={`${sairaStencil.className} text-2xl text-stone-900 tracking-tight`}
          >
            Histora
          </span>
          <span
            className={`${notoSans.className} text-xs text-stone-500 tracking-[0.2em] uppercase`}
          >
            Every Product Tells a Story
          </span>
        </div>

        {/* Center: Navigation */}
        <nav className="flex gap-6 text-stone-700 text-sm font-medium">
          <a href="#" className="hover:text-[#f56464] transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-[#f56464] transition-colors">
            Collections
          </a>
          <a href="#" className="hover:text-[#f56464] transition-colors">
            New Arrivals
          </a>
        </nav>

        {/* Right: Socials */}
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/histora.art/"
            target="__blank"
            aria-label="Instagram"
            className="hover:text-[#f56464] text-stone-400 transition-colors"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".5" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="relative z-10 mt-8 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Histora. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
