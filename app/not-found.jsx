import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f7] text-stone-800 px-4">
      <h1 className="text-7xl font-bold mb-4 tracking-tight text-[#f56464]">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-stone-500 mb-6 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-stone-900 text-white rounded-md hover:bg-[#f56464] transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
