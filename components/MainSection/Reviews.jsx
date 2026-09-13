"use client";

import { Saira_Stencil_One, Cormorant_Garamond, Noto_Sans } from "next/font/google";
import { Star } from "lucide-react";
import SplitText from "@/components/SplitText";

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
];

function Reviews() {
  return (
    <section
      className={`${notoSans.className} relative px-6 py-24 md:px-16`}
    >
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
        <div className="flex gap-0.5 text-stone-900">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
          ))}
        </div>
        <span className="text-sm text-stone-500">
          4.9 out of 5 · 500+ reviews
        </span>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="flex flex-col gap-4 border border-stone-200 bg-white/40 p-6"
          >
            <div className="flex gap-0.5 text-stone-900">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < review.rating ? "fill-current" : "fill-stone-200 text-stone-200"
                  }`}
                  strokeWidth={0}
                />
              ))}
            </div>

            <p className="text-sm leading-relaxed text-stone-600">
              &ldquo;{review.quote}&rdquo;
            </p>

            <div className="mt-auto flex items-center gap-3 pt-2">
              <span
                className={`${sairaStencil.className} flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-xs text-white`}
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
        ))}
      </div>
    </section>
  );
}

export default Reviews;
