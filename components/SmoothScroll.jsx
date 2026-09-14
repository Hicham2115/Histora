"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.lenis = lenis;

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Lenis caches the scrollable height at init and never recomputes it on
    // its own — as images, async product data, and GSAP text-split
    // animations change page height after load, that cached height goes
    // stale and scroll can appear to "stop" short of the real bottom.
    // Refresh Lenis's bounds whenever layout actually changes.
    const handleRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    const resizeObserver = new ResizeObserver(handleRefresh);
    resizeObserver.observe(document.documentElement);

    window.addEventListener("load", handleRefresh);

    return () => {
      gsap.ticker.remove(onTick);
      resizeObserver.disconnect();
      window.removeEventListener("load", handleRefresh);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return null;
}

export default SmoothScroll;
