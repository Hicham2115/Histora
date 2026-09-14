"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Noto_Sans, Saira_Stencil_One } from "next/font/google";
import { toast } from "sonner";

const sairaStencil = Saira_Stencil_One({ subsets: ["latin"], weight: "400" });
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const linkGroups = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/#new_arrivals" },
      { label: "Collections", href: "/collections" },
      { label: "Best Sellers", href: "/collections" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/#contact" },
      { label: "FAQ", href: "/#faq" },
      { label: "Shipping & Returns", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/#about" },
      { label: "Careers", href: "#" },
      { label: "Gift Cards", href: "#" },
    ],
  },
];

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    toast.success("You're on the list.");
    setEmail("");
  };

  return (
    <footer className={`${notoSans.className} relative bg-black`}>
      <div className="px-3 pt-3 sm:px-6">
        <div className="relative overflow-hidden rounded-t-[2rem] bg-stone-950 px-6 pt-14 pb-10 text-stone-300 sm:rounded-t-[2.5rem] md:px-14 md:pt-16">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-[1.2fr_0.65fr_0.65fr_0.65fr_1.05fr]">
            {/* Brand + contact */}
            <div className="flex flex-col gap-5">
              <span
                className={`${sairaStencil.className} text-2xl tracking-tight text-white`}
              >
                Histora
              </span>

              <p className="max-w-xs text-sm leading-relaxed text-stone-400">
                Unique clothing, mugs, and wall art — every piece crafted to
                carry a little more of who you are.
              </p>

              <div className="mt-1 flex flex-col gap-2 text-sm text-stone-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <span>Casablanca, Morocco</span>
                </div>
                <a
                  href="tel:+212682211228"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  (+212) 6 82 21 12 28
                </a>
                <a
                  href="mailto:histora.art@gmail.com"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  histora.art@gmail.com
                </a>
              </div>

              <a
                href="https://www.instagram.com/histora.art/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-stone-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
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

            {/* Link columns */}
            {linkGroups.map((group) => (
              <div
                key={group.title}
                className="flex flex-col gap-5 border-white/10 sm:border-l sm:pl-8"
              >
                <div className="flex flex-col gap-2.5">
                  <span className="h-px w-6 bg-[#b8874f]" />
                  <span className="text-xs font-medium tracking-[0.2em] text-stone-500 uppercase">
                    {group.title}
                  </span>
                </div>
                <div className="flex flex-col gap-3.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group relative flex w-fit items-center text-sm text-stone-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
                    >
                      <span className="w-0 overflow-hidden text-[#b8874f] opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:w-3 group-hover:opacity-100">
                        →
                      </span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Newsletter */}
            <div className="flex flex-col gap-5 border-white/10 sm:border-l sm:pl-8">
              <div className="flex flex-col gap-2.5">
                <span className="h-px w-6 bg-[#b8874f]" />
                <span className="text-xs font-medium tracking-[0.2em] text-stone-500 uppercase">
                  Stay In The Loop
                </span>
              </div>
              <p className="text-sm leading-relaxed text-stone-400">
                New drops, restocks, and the occasional story — straight to your
                inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-stone-500 outline-none transition-colors focus:border-white/40"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b8874f] cursor-pointer text-white transition-colors hover:bg-white hover:text-stone-900"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          {/* <div className="mt-14 h-px bg-white/10" /> */}

          {/* Payment methods */}
          {/* <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="flex h-8 items-center rounded-md bg-white px-3 text-xs font-bold tracking-wide text-[#1a1f71] italic">
              VISA
            </span>
            <span className="flex h-8 items-center gap-1 rounded-md bg-white px-3">
              <span className="h-3.5 w-3.5 rounded-full bg-[#eb001b]" />
              <span className="-ml-2 h-3.5 w-3.5 rounded-full bg-[#f79e1b] mix-blend-multiply" />
            </span>
            <span className="flex h-8 items-center rounded-md bg-white px-3 text-xs font-medium tracking-wide text-stone-700">
              Cash on Delivery
            </span>
          </div> */}

          {/* Divider */}
          <div className="mt-8 h-px bg-white/10" />

          {/* Bottom row */}
          <div className="mt-6 flex flex-col items-center gap-3 text-xs text-stone-500 sm:flex-row sm:justify-between">
            <span>
              © {new Date().getFullYear()} Histora. All rights reserved.
            </span>
            <div className="flex gap-5">
              <Link
                href="#"
                className="border-b border-transparent pb-0.5 transition-colors hover:border-white/40 hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="border-b border-transparent pb-0.5 transition-colors hover:border-white/40 hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="relative h-[9vw] min-h-16 overflow-hidden bg-black select-none pointer-events-none">
        <span
          className={`${sairaStencil.className} absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[20vw] leading-none text-white/5`}
        >
          HISTORA
        </span>
      </div>
    </footer>
  );
}

export default Footer;
