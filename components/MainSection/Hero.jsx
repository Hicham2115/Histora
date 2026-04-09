import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Saira_Stencil_One, Noto_Sans } from "next/font/google";

import img1 from "@/app/assets/78ed5049ffa1fdb4f90bf2df4a83f27f.jpg";
import img2 from "@/app/assets/2bd760b75c0486cf71264531bcad6673.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const sairaStencil = Saira_Stencil_One({
  subsets: ["latin"],
  weight: "400",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
});

function Hero() {
  const router = useRouter();

  return (
    <div className="relative h-screen overflow-hidden ">
      {/* Subtle grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Decorative vertical rule */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-stone-300/40 z-0" />

      {/* Top label bar */}
      <div
        className={`${notoSans.className} absolute top-6 left-0 right-0 flex justify-between items-center px-8 md:px-16 z-20`}
      >
        <span className="text-xs tracking-[0.3em] uppercase text-stone-400">
          Summer {new Date().getFullYear()}
        </span>
        <span className="text-xs tracking-[0.3em] uppercase text-stone-400">
          New Arrivals
        </span>
      </div>

      {/* Main layout */}
      <div
        className={`${sairaStencil.className} h-full flex items-center flex-wrap justify-between px-8 md:px-16 gap-8`}
      >
        {/* LEFT TEXT */}
        <div className="relative z-20 flex flex-col gap-6 max-w-sm">
          {/* Vertical accent line */}
          <div className="absolute -left-4 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-stone-400 to-transparent" />

          <div className="flex flex-col leading-none">
            <span
              className="text-[clamp(3.5rem,8vw,6.5rem)] text-stone-800 tracking-tight"
              style={{ lineHeight: "0.9" }}
            >
              New
            </span>
            <span
              className="text-[clamp(3.5rem,8vw,6.5rem)] text-stone-800 tracking-tight"
              style={{ lineHeight: "0.9" }}
            >
              Collection
            </span>
          </div>

          {/* Thin divider */}
          <div className="w-12 h-px bg-stone-400" />

          <p
            className={`${notoSans.className} text-sm font-light leading-relaxed text-stone-500 `}
          >
            Explore our curated collection of clothing, mugs, and wall art —
            every piece designed to express your personality, inspire your
            space, and tell a story that's uniquely yours.
          </p>

          {/* CTA */}
          <button
            className={`${notoSans.className} group relative w-fit text-xs tracking-[0.25em] uppercase font-light text-stone-800 border border-stone-800 px-6 py-3 overflow-hidden transition-all duration-300 hover:text-[#f5f0ea] cursor-pointer`}
            onClick={() => {
              router.push("collections");
            }}
          >
            <span className="absolute inset-0 bg-stone-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10">Go To Shop</span>
          </button>
        </div>

        {/* RIGHT CAROUSEL */}
        <div className="relative z-20 w-full lg:w-[55%] max-w-2xl">
          {/* Decorative offset box */}
          <div className="absolute top-4 -right-4 w-full h-full border border-stone-300/60 rounded-none z-0" />

          <Carousel
            opts={{ align: "start" }}
            className="relative z-10 lg:mt-30 mt-40"
          >
            <CarouselContent className="-ml-2">
              {[img1, img2].map((img, index) => (
                <CarouselItem key={index} className="basis-1/2 pl-2">
                  <div className="group relative w-full h-[360px] md:h-[480px] overflow-hidden bg-stone-200">
                    <Image
                      src={img}
                      alt={`Collection piece ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-90"
                    />
                    {/* Number badge */}
                    <div
                      className={`${notoSans.className} absolute bottom-3 left-3 text-[10px] tracking-[0.2em] text-white/80 uppercase bg-black/20 backdrop-blur-sm px-2 py-1`}
                    >
                      0{index + 1}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom nav buttons */}
            <div className="absolute -bottom-10 right-0 flex gap-2">
              <CarouselPrevious
                className={`${notoSans.className} static translate-y-0 h-8 w-8 rounded-none border border-stone-400 bg-transparent text-stone-600 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-200`}
              />
              <CarouselNext
                className={`${notoSans.className} static translate-y-0 h-8 w-8 rounded-none border border-stone-400 bg-transparent text-stone-600 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-200`}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Hero;
