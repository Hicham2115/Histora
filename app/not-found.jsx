import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f7] text-stone-800 px-4">
      <h1 className="text-6xl sm:text-7xl font-bold mb-4 tracking-tight text-[#b8874f]">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-stone-500 mb-6 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-md border border-stone-900 bg-stone-900 text-white transition-colors hover:border-[#b8874f] hover:bg-[#b8874f]"
      >
        Go Home
      </Link>
    </div>
  );
}
