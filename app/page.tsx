"use client";

import Hero from "@/components/MainSection/Hero";
import NewArrivals from "@/components/MainSection/NewArrivals";
import Collections from "@/components/MainSection/Collections";
import OurApproch from "@/components/MainSection/OurApproch";
import Footer from "@/components/MainSection/Footer";

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
      <div id="new_arrivals">
        <NewArrivals />
      </div>
      <Collections />
      <OurApproch />
      <Footer />
    </>
  );
}
