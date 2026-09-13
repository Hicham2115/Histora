"use client";

import { Playfair_Display, Noto_Sans } from "next/font/google";
import { useState } from "react";
import { ChevronUp, ChevronDown, ArrowRight, Play } from "lucide-react";

import bgHero from "@/app/assets/bg hero.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextType from "@/components/TextType";
import SplitText from "@/components/SplitText";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const TOTAL_SLIDES = 3;

function Hero() {
  const router = useRouter();
  const [slide, setSlide] = useState(1);

  const goPrev = () => setSlide((s) => (s === 1 ? TOTAL_SLIDES : s - 1));
  const goNext = () => setSlide((s) => (s === TOTAL_SLIDES ? 1 : s + 1));

  return (
    <div className="relative h-screen min-h-175 w-full overflow-hidden bg-black">
      {/* Background image */}
      <Image
        src={bgHero}
        alt="Histora Summer 2026"
        fill
        priority
        className="object-cover"
      />
      {/* Darkening overlay for text legibility */}
      {/* <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/25 to-black/10" /> */}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/20" />

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 md:px-16">
        <div className="flex max-w-xl flex-col gap-6">
          <div className="flex items-center gap-4">
            <span
              className={`${notoSans.className} text-xs tracking-[0.35em] uppercase text-white/80`}
            >
              Winter {new Date().getFullYear()}
            </span>
            <span className="h-px w-10 bg-white/50" />
          </div>

          <div className={`${playfair.className} leading-[0.95] text-white`}>
            <SplitText
              text="Crafted"
              className="block text-[clamp(3.5rem,9vw,6.5rem)] font-normal"
              delay={40}
              duration={1.1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
            <SplitText
              text="For You"
              className="block text-[clamp(3.5rem,9vw,6.5rem)] font-normal"
              delay={40}
              duration={1.1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
          </div>

          <TextType
            text={[
              "Style isn't just what you put on — it's what you put out into the world. Our collection brings together clothing, vibes, and real stories.",
            ]}
            typingSpeed={35}
            className={`${notoSans.className} max-w-md text-sm font-light leading-relaxed text-white/75`}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            deletingSpeed={0}
            loop={false}
            cursorBlinkDuration={0.5}
          />

          <button
            type="button"
            onClick={() => router.push("collections")}
            className={`${notoSans.className} group relative mt-2 flex w-fit items-center gap-3 overflow-hidden border border-white/70 px-6 py-3.5 text-xs font-light tracking-[0.25em] text-white uppercase transition-colors duration-300 hover:text-black cursor-pointer`}
          >
            <span className="absolute inset-0 -translate-x-full bg-[#f6f1ee] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
            <span className="relative z-10">Shop Now</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Slide indicator — right side */}
      {/* <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex md:right-10">
        <span
          className={`${notoSans.className} text-xs tracking-[0.2em] text-white/80`}
        >
          {String(slide).padStart(2, "0")}
        </span>
        <span className="h-10 w-px bg-white/40" />
        <span
          className={`${notoSans.className} text-xs tracking-[0.2em] text-white/50`}
        >
          {String(TOTAL_SLIDES).padStart(2, "0")}
        </span>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="cursor-pointer text-white/70 transition-colors hover:text-white"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="cursor-pointer text-white/70 transition-colors hover:text-white"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div> */}

      {/* Bottom bar */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-between px-6 sm:px-10 md:px-16">
        <div
          className={`${notoSans.className} flex items-center gap-3 text-[11px] tracking-[0.2em] text-white/70 uppercase`}
        >
          <span className="h-px w-8 bg-white/50" />
          <span>New Arrivals</span>
          <span className="text-white/40">/</span>
          <span>Winter {new Date().getFullYear()}</span>
        </div>

        {/* <button
          type="button"
          className={`${notoSans.className} group hidden cursor-pointer items-center gap-3 text-[11px] tracking-[0.2em] text-white/80 uppercase transition-colors hover:text-white sm:flex`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 transition-colors group-hover:bg-white/10">
            <Play className="h-3 w-3 translate-x-px fill-white text-white" />
          </span>
          Our Story
        </button> */}
      </div>
    </div>
  );
}

export default Hero;
