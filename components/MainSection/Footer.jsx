"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Noto_Sans, Saira_Stencil_One } from "next/font/google";
import Logo from "@/app/assets/LOGO.png";

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
    title: "Info",
    links: [
      { label: "Size Guide", href: "#" },
      { label: "Track Order", href: "#" },
      { label: "Gift Cards", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Story", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer
      className={`${notoSans.className} relative overflow-hidden bg-stone-950 text-stone-300`}
    >
      <div className="relative z-10 px-6 pt-16 pb-8 md:px-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand + contact */}
          <div className="flex max-w-xs flex-col gap-5">
            <div className="flex items-center gap-3">
              {/* <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                <Image
                  src={Logo}
                  alt="Histora"
                  width={22}
                  height={22}
                  className="brightness-0 invert"
                />
              </span> */}
              <span
                className={`${sairaStencil.className} text-xl tracking-tight text-white`}
              >
                Histora
              </span>
            </div>

            <div className="flex items-start gap-2 text-sm text-stone-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span>Casablanca, Morocco</span>
            </div>

            <div className="flex flex-col gap-2 text-sm text-stone-400">
              <a
                href="tel:+212682211228"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                (+212) 6 82 21 12 28
              </a>
              <a
                href="mailto:histora.art@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                histora.art@gmail.com
              </a>
            </div>

            <div className="mt-2 flex gap-3">
              <a
                href="https://www.instagram.com/histora.art/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-stone-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
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
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 md:gap-x-12">
            {linkGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-white">
                  {group.title}
                </span>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group relative flex items-center text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    <span className="w-0 overflow-hidden text-white/60 opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:w-3 group-hover:opacity-100">
                      →
                    </span>
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative mt-16 h-px bg-white/10">
          <span className="absolute -top-1.5 left-0 text-white/20">+</span>
          <span className="absolute -top-1.5 right-0 text-white/20">+</span>
        </div>

        {/* Bottom row */}
        <div className="relative flex flex-col items-center gap-3 pt-6 text-xs text-stone-500 sm:flex-row sm:justify-center">
          <span>
            © {new Date().getFullYear()} Histora. All rights reserved.
          </span>
          <div className="flex gap-5 sm:absolute sm:right-0">
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

      {/* Watermark */}
      <div className="relative z-0 h-[10vw] min-h-17.5 overflow-hidden select-none pointer-events-none">
        <span
          className={`${sairaStencil.className} absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[22vw] leading-none text-white/5`}
        >
          HISTORA
        </span>
      </div>
    </footer>
  );
}

export default Footer;
