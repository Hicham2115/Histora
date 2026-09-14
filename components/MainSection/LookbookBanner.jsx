"use client";

import { Playfair_Display, Noto_Sans } from "next/font/google";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import lookbookImage from "@/app/assets/banner.png";
import lookbookImageMobile from "@/app/assets/banner mobile.png";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
});

function LookbookBanner() {
  const router = useRouter();

  return (
    <section className="relative flex h-[85vh] min-h-[560px] w-full items-center justify-center overflow-hidden bg-black">
      <Image
        src={lookbookImageMobile}
        alt="Histora lookbook"
        fill
        className="object-cover object-top opacity-90 md:hidden"
      />
      <Image
        src={lookbookImage}
        alt="Histora lookbook"
        fill
        className="hidden object-cover object-top opacity-90 md:block"
      />
      {/* <div className="absolute inset-0 bg-black/50" /> */}
      {/* <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/40" /> */}

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <span
          className={`${notoSans.className} text-xs tracking-[0.35em] uppercase text-white/70`}
        >
          The Edit
        </span>

        <p
          className={`${playfair.className} max-w-3xl text-[clamp(1.8rem,5vw,3.25rem)] leading-tight text-white italic`}
        >
          &ldquo;Style isn&apos;t just what you wear — it&apos;s the story you
          carry with you.&rdquo;
        </p>

        <button
          type="button"
          onClick={() => router.push("/collections")}
          className={`${notoSans.className} group mt-2 flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white cursor-pointer`}
        >
          <span className="border-b border-white/50 pb-1 transition-colors duration-300 group-hover:border-white">
            Shop The Edit
          </span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

export default LookbookBanner;
