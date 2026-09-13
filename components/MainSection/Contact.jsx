"use client";

import { useState } from "react";
import { Saira_Stencil_One, Cormorant_Garamond, Noto_Sans } from "next/font/google";
import { Feather, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";
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

const STAMP_TEXT = "HISTORA · CASABLANCA · EVERY STORY WRITTEN · ";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Tell us your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email";
    if (message.trim().length < 5) newErrors.message = "Write a little more";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/sendContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Message sent — we'll reply soon.");
        setName("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else {
        toast.error("Couldn't send that. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`${notoSans.className} relative px-8 py-24 md:px-24 md:py-32`}
    >
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .stamp-spin {
          animation: spin-slow 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .stamp-spin {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-12">
        {/* Left — letterhead */}
        <div className="flex flex-col">
          <p className="mb-6 text-xs tracking-[0.3em] text-stone-400 uppercase">
            Get In Touch
          </p>

          <div className="relative">
            <div className="pointer-events-none absolute -top-10 -right-2 h-28 w-28 text-stone-900/70 sm:-right-8 md:h-32 md:w-32">
              <svg viewBox="0 0 100 100" className="stamp-spin h-full w-full">
                <defs>
                  <path
                    id="stampCircle"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  strokeDasharray="1.4 3.2"
                  opacity="0.45"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="29"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.35"
                />
                <text
                  fill="currentColor"
                  fontSize="7.2"
                  letterSpacing="1.5"
                  className={sairaStencil.className}
                >
                  <textPath href="#stampCircle" startOffset="0%">
                    {STAMP_TEXT}
                  </textPath>
                </text>
              </svg>
              <Feather
                className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-stone-900"
                strokeWidth={1.25}
              />
            </div>

            <SplitText
              text="Say Hello."
              tag="h2"
              className={`${sairaStencil.className} text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.95] text-stone-900`}
              delay={35}
              duration={1}
              splitType="chars"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.2}
              rootMargin="-80px"
              textAlign="left"
            />
          </div>

          <p
            className={`${cormorant.className} mt-6 max-w-sm text-lg font-light text-stone-600 italic`}
          >
            Questions, custom orders, or just a story to share — the studio
            reads every letter.
          </p>

          <div className="mt-10 flex flex-col gap-4 text-sm text-stone-600">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-stone-400" strokeWidth={1.5} />
              <span>Casablanca, Morocco</span>
            </div>
            <a
              href="mailto:histora.art@gmail.com"
              className="flex items-center gap-3 transition-colors hover:text-[#f56464]"
            >
              <Mail className="h-4 w-4 shrink-0 text-stone-400" strokeWidth={1.5} />
              histora.art@gmail.com
            </a>
            <a
              href="tel:+212682211228"
              className="flex items-center gap-3 transition-colors hover:text-[#f56464]"
            >
              <Phone className="h-4 w-4 shrink-0 text-stone-400" strokeWidth={1.5} />
              (+212) 6 82 21 12 28
            </a>
            <a
              href="https://www.instagram.com/histora.art/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-[#f56464]"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="shrink-0 text-stone-400"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".5" />
              </svg>
              @histora.art
            </a>
          </div>
        </div>

        {/* Right — the letter card */}
        <div className="relative">
          <span className="absolute -top-3 -left-3 text-stone-300">+</span>
          <span className="absolute -right-3 -bottom-3 text-stone-300">+</span>

          <div className="relative -rotate-1 transition-transform duration-500 hover:rotate-0">
            <span
              className={`${notoSans.className} absolute -top-3 left-7 z-10 -rotate-2 bg-stone-900 px-3 py-1 text-[10px] tracking-[0.2em] text-white uppercase shadow-sm`}
            >
              No. 001 — Studio Mail
            </span>

            <div
              className="p-1.25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, #1c1917 0px, #1c1917 8px, transparent 8px, transparent 16px, #f56464 16px, #f56464 24px, transparent 24px, transparent 32px)",
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="relative bg-[#f7f5f2]/95 p-8 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] backdrop-blur-sm sm:p-10"
              >
                <div className="mb-8 border-b border-dashed border-stone-300 pb-4 text-xs tracking-[0.25em] text-stone-400 uppercase">
                  Write to the studio
                </div>

                <div className="flex flex-col gap-7">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">
                  Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="border-b border-stone-300 bg-transparent py-1.5 text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-[#f56464]"
                />
                {errors.name && (
                  <span className="text-xs text-[#f56464]">{errors.name}</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="border-b border-stone-300 bg-transparent py-1.5 text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-[#f56464]"
                />
                {errors.email && (
                  <span className="text-xs text-[#f56464]">{errors.email}</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">
                  Message
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  rows={4}
                  className="resize-none border-b border-stone-300 bg-transparent py-1.5 text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-[#f56464]"
                />
                {errors.message && (
                  <span className="text-xs text-[#f56464]">{errors.message}</span>
                )}
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${notoSans.className} group relative mt-2 flex w-fit items-center gap-3 overflow-hidden border border-stone-900 px-6 py-3.5 text-xs font-light tracking-[0.25em] text-stone-900 uppercase transition-colors duration-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
              >
                <span className="absolute inset-0 -translate-x-full bg-stone-900 transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                <span className="relative z-10">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                <ArrowRight className="relative z-10 h-3.5 w-3.5" />
              </button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
