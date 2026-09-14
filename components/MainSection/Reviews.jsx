"use client";

import { useEffect, useState } from "react";
import { Saira_Stencil_One, Cormorant_Garamond, Noto_Sans } from "next/font/google";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";
import SplitText from "@/components/SplitText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const reviews = [
  {
    name: "Yasmine B.",
    location: "Casablanca",
    rating: 5,
    quote:
      "The fabric quality is on another level. My Signature Tee still looks brand new after months of wear — fits exactly like the size guide said it would.",
  },
  {
    name: "Omar T.",
    location: "Rabat",
    rating: 5,
    quote:
      "Ordered the Baggy Fit Jeans and a hoodie. Both arrived fast and the packaging alone felt premium. Already eyeing my next order.",
  },
  {
    name: "Salma K.",
    location: "Marrakech",
    rating: 5,
    quote:
      "Every piece genuinely tells a story like they say. The Oversized Heavyweight Tee is now in permanent rotation.",
  },
  {
    name: "Anas E.",
    location: "Tangier",
    rating: 4,
    quote:
      "Loved the Relaxed Fit Hoodie — warm, well cut, and the print hasn't cracked after several washes. Sizing runs true.",
  },
  {
    name: "Nadia F.",
    location: "Fes",
    rating: 5,
    quote:
      "Customer service actually replied in person when I asked about sizing. Rare these days. The Essential Tee is now my everyday piece.",
  },
  {
    name: "Youssef L.",
    location: "Agadir",
    rating: 5,
    quote:
      "Wasn't expecting the denim to feel this solid at the price point. Wide Leg Denim holds its shape after multiple washes.",
  },
  {
    name: "Imane Z.",
    location: "Tetouan",
    rating: 4,
    quote:
      "Track Joggers are my go-to for travel days now — comfortable, don't wrinkle, and the fit is true to size.",
  },
  {
    name: "Karim S.",
    location: "Meknes",
    rating: 5,
    quote:
      "Ordered three tees in one go. Consistent quality across all of them, and delivery was quicker than I expected.",
  },
];

function StarRow({ rating, className = "h-3.5 w-3.5" }) {
  return (
    <div className="flex gap-0.5 text-stone-900">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${
            i < rating ? "fill-current" : "fill-stone-200 text-stone-200"
          }`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function Reviews() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <section className={`${notoSans.className} relative px-6 py-24 md:px-16`}>
      <p className="mb-6 text-center text-xs tracking-[0.3em] text-stone-400 uppercase">
        Testimonials
      </p>

      <div className="text-center">
        <SplitText
          text="Loved By Many"
          tag="h2"
          className={`${sairaStencil.className} text-[clamp(2.2rem,6vw,4.5rem)] text-stone-900`}
          delay={40}
          duration={1.1}
          splitType="chars"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.15}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="block h-px w-16 bg-stone-300" />
        <span className="block h-1.5 w-1.5 rounded-full bg-stone-400" />
        <span className="block h-px w-16 bg-stone-300" />
      </div>

      <p
        className={`${cormorant.className} mx-auto mt-6 max-w-lg text-center text-lg font-light text-stone-600 italic`}
      >
        Real people, real stories — in their own words.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <StarRow rating={5} className="h-4 w-4" />
        <span className="text-sm text-stone-500">
          4.9 out of 5 · 500+ reviews
        </span>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl">
        <Carousel
          opts={{ align: "start", loop: true }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {reviews.map((review) => (
              <CarouselItem
                key={review.name}
                className="basis-full pl-4 sm:basis-1/2 md:pl-6 lg:basis-1/3"
              >
                <div className="group relative flex h-full flex-col gap-5 border border-stone-200 bg-white/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md">
                  <Quote
                    className="h-7 w-7 text-stone-200 transition-colors duration-300 group-hover:text-stone-300"
                    strokeWidth={0}
                    fill="currentColor"
                  />

                  <StarRow rating={review.rating} />

                  <p className="flex-1 text-base leading-relaxed text-stone-600">
                    &ldquo;{review.quote}&rdquo;
                  </p>

                  <div className="mt-auto flex items-center gap-3 border-t border-stone-100 pt-5">
                    <span
                      className={`${sairaStencil.className} flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs text-white`}
                    >
                      {review.name.charAt(0)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-stone-900">
                        {review.name}
                      </span>
                      <span className="text-xs text-stone-400">
                        {review.location}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous reviews"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors duration-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "w-6 bg-stone-900" : "w-1.5 bg-stone-300"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Next reviews"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors duration-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
