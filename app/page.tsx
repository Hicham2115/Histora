"use client";

import Hero from "@/components/MainSection/Hero";
import MarqueeBar from "@/components/MainSection/MarqueeBar";
import NewArrivals from "@/components/MainSection/NewArrivals";
import Collections from "@/components/MainSection/Collections";
import LookbookBanner from "@/components/MainSection/LookbookBanner";
import OurApproch from "@/components/MainSection/OurApproch";
import FAQ from "@/components/MainSection/FAQ";
import Contact from "@/components/MainSection/Contact";
import FinalCTA from "@/components/MainSection/FinalCTA";
import Footer from "@/components/MainSection/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <Hero />
      <MarqueeBar />
      <div id="new_arrivals">
        <NewArrivals />
      </div>
      <Collections />
      <LookbookBanner />
      <OurApproch />
      <FAQ />
      <Contact />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
