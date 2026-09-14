"use client";

import { useState } from "react";
import {
  Saira_Stencil_One,
  Cormorant_Garamond,
  Noto_Sans,
} from "next/font/google";
import { Feather, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Required";
    if (!lastName.trim()) newErrors.lastName = "Required";
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
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          message,
        }),
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Message sent — we'll reply soon.");
        setFirstName("");
        setLastName("");
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
      className={`${notoSans.className} relative px-6 py-24 md:px-16`}
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Ticket notches */}
        <span className="absolute -top-3.5 left-1/2 z-10 h-7 w-7 -translate-x-1/2 rounded-full bg-[#eeece7]" />
        <span className="absolute -bottom-3.5 left-1/2 z-10 h-7 w-7 -translate-x-1/2 rounded-full bg-[#eeece7]" />

        <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-[#faf9f6] shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Left — brand & info */}
            <div className="relative flex flex-col justify-between gap-10 border-b border-dashed border-stone-300 p-8 sm:p-12 md:border-r md:border-b-0">
              <div>
                <p className="mb-4 text-xs tracking-[0.3em] text-[#b8874f] uppercase">
                  Get In Touch
                </p>

                <h2
                  className={`${sairaStencil.className} text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] text-stone-900`}
                >
                  Let&apos;s talk about{" "}
                  <span className="text-[#b8874f]">your story</span>
                </h2>

                <p
                  className={`${cormorant.className} mt-5 max-w-sm text-lg font-light text-stone-600`}
                >
                  A question about an order, a custom piece, or just want to say
                  hi? A real person reads every message.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-dotted border-stone-300 pb-3">
                  <span className="text-xs tracking-[0.15em] text-stone-400 uppercase">
                    Email
                  </span>
                  <span className="text-base text-stone-800">
                    histora.art@gmail.com
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-dotted border-stone-300 pb-3">
                  <span className="text-xs tracking-[0.15em] text-stone-400 uppercase">
                    Availability
                  </span>
                  <div className="text-right">
                    <p className="text-base text-stone-800">Mon–Fri, 9am–6pm</p>
                    <p className="text-xs text-stone-400">
                      Reply within 24–48h
                    </p>
                  </div>
                </div>

                <a
                  href="mailto:histora.art@gmail.com"
                  className={`${notoSans.className} group relative mt-2 flex w-fit items-center gap-2 overflow-hidden border border-stone-900 bg-stone-900 px-5 py-3 text-xs font-light tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:border-[#b8874f]`}
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#b8874f] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                  <Mail className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10">Email Us</span>
                </a>
              </div>
            </div>

            {/* Right — form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-7 p-8 sm:p-12"
            >
              <div className="grid grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-[0.15em] text-stone-700 uppercase">
                    First Name
                  </span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    className="border-b border-stone-300 bg-transparent py-1.5 text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-[#b8874f]"
                  />
                  {errors.firstName && (
                    <span className="text-xs text-[#b8874f]">
                      {errors.firstName}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-[0.15em] text-stone-700 uppercase">
                    Last Name
                  </span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Your last name"
                    className="border-b border-stone-300 bg-transparent py-1.5 text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-[#b8874f]"
                  />
                  {errors.lastName && (
                    <span className="text-xs text-[#b8874f]">
                      {errors.lastName}
                    </span>
                  )}
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-[0.15em] text-stone-700 uppercase">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="border-b border-stone-300 bg-transparent py-1.5 text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-[#b8874f]"
                />
                {errors.email && (
                  <span className="text-xs text-[#b8874f]">{errors.email}</span>
                )}
              </label>

              <label className="flex flex-1 flex-col gap-2">
                <span className="text-xs font-semibold tracking-[0.15em] text-stone-700 uppercase">
                  Your Message
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your order or question..."
                  rows={5}
                  className="flex-1 resize-none border-b border-stone-300 bg-transparent py-1.5 text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-[#b8874f]"
                />
                {errors.message && (
                  <span className="text-xs text-[#b8874f]">
                    {errors.message}
                  </span>
                )}
              </label>

              <div className="mt-auto flex flex-col gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs text-stone-400">
                  By sending this message, you agree to be contacted by our
                  team.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${notoSans.className} group relative flex w-fit shrink-0 items-center gap-3 overflow-hidden border border-stone-900 bg-stone-900 px-6 py-3.5 text-xs font-light tracking-[0.25em] text-white uppercase transition-colors duration-300 hover:border-[#b8874f] disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#b8874f] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send My Request"}
                  </span>
                  <ArrowRight className="relative z-10 h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
