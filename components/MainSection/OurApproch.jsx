"use client";
import React, { useState } from "react";
import {
  Saira_Stencil_One,
  Cormorant_Garamond,
  Noto_Sans,
} from "next/font/google";
import Image from "next/image";

import img3 from "@/app/assets/Urban Edge_ Street Style Outfit Inspo for Your Daily Vibe 🧢👟✨.jpeg";
import img4 from "@/app/assets/AI - Dark Academia reference.jpeg";
import img5 from "@/app/assets/bg.jpeg";
import img6 from "@/app/assets/kj.jpeg";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

function OurApproch() {
  return (
    <section
      className={`${notoSans.className} min-h-screen px-8 md:px-24 py-24 `}
    >
      {/* Eyebrow label */}
      <p
        className={`${notoSans.className} text-xs tracking-[0.3em] uppercase text-stone-400 text-center mb-6`}
      >
        Our Philosophy
      </p>

      {/* Headline */}
      <h2
        className={`${sairaStencil.className} text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.05] text-center text-stone-900 mb-6`}
      >
        Where Art Meets
        <br />
        <span
          className={`${cormorant.className} font-light italic text-[clamp(2.6rem,7.5vw,6rem)]`}
        >
          Everyday Life
        </span>
      </h2>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="block h-px w-16 bg-stone-300" />
        <span className="block w-1.5 h-1.5 rounded-full bg-stone-400" />
        <span className="block h-px w-16 bg-stone-300" />
      </div>

      {/* Body copy */}
      <p
        className={`${cormorant.className} text-lg md:text-xl font-light text-center text-stone-700 leading-relaxed max-w-5xl mx-auto mb-20`}
      >
        At Histora, we blend creativity with craftsmanship to bring you pieces
        that transcend trends and stand the test of time. Every design — from
        our signature tees to our wall art — is meticulously crafted to carry an
        exquisite finish worthy of the spaces and people it adorns.
      </p>

      {/* Image grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="relative overflow-hidden rounded-sm group">
          <Image
            src={img3}
            alt="Collection 1"
            className="w-full h-[340px] md:h-[480px] object-cover  hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-all duration-500" />
        </div>

        <div className="relative overflow-hidden rounded-sm group mt-0 md:mt-10">
          <Image
            src={img4}
            alt="Collection 2"
            className="w-full h-[340px] md:h-[480px] object-cover  hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-all duration-500" />
        </div>

        <div className="relative overflow-hidden rounded-sm group">
          <Image
            src={img5}
            alt="Collection 3"
            className="w-full h-[340px] md:h-[480px] object-cover  hover:-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-all duration-500" />
        </div>

        <div className="relative overflow-hidden rounded-sm group mt-0 md:mt-10">
          <Image
            src={img6}
            alt="Collection 4"
            className="w-full h-[340px] md:h-[480px] object-cover  hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-all duration-500" />
        </div>
      </div>

      {/* Bottom tagline */}
      <p
        className={`${notoSans.className} text-xs tracking-[0.25em] uppercase text-stone-400 text-center mt-16`}
      >
        Timeless by design &nbsp;·&nbsp; Exquisite by nature
      </p>
    </section>
  );
}

export default OurApproch;
