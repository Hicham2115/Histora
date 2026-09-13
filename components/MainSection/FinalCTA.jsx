"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Saira_Stencil_One,
  Cormorant_Garamond,
  Noto_Sans,
} from "next/font/google";
import SplitText from "@/components/SplitText";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
});

function FinalCTA() {
  return (
    <section
      className={`${notoSans.className} relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center`}
    >
      {/* Oversized watermark type */}
      <span
        className={`${sairaStencil.className} pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[26vw] leading-none text-stone-900/5 select-none`}
        aria-hidden="true"
      >
        HISTORA
      </span>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-10 bg-stone-400" />
          <span className="text-xs tracking-[0.35em] text-stone-500 uppercase">
            Winter {new Date().getFullYear()}
          </span>
          <span className="h-px w-10 bg-stone-400" />
        </div>

        <SplitText
          text="Wear Your Story."
          tag="h2"
          className={`${sairaStencil.className} text-[clamp(2.6rem,8vw,6rem)] leading-[0.95] text-stone-900`}
          delay={35}
          duration={1.1}
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
          rootMargin="-100px"
          textAlign="center"
        />

        <p
          className={`${cormorant.className} mt-6 max-w-md text-lg font-light text-stone-600`}
        >
          Every piece leaves the studio ready to carry a little more of who you
          are.
        </p>

        <Link
          href="/collections"
          className={`${notoSans.className} group relative mt-10 flex w-fit items-center gap-3 overflow-hidden border border-stone-900 bg-stone-900 px-8 py-4 text-xs font-light tracking-[0.25em] text-white hover:text-black uppercase transition-colors duration-300`}
        >
          <span className="absolute inset-0 -translate-x-full bg-[#f6f1ee] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
          <span className="relative z-10">Shop The Collection</span>
          <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export default FinalCTA;
