"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store/useStore";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";
const normalizeImages = (value: string[] | string | null | undefined) => {
  if (!value) return [] as string[];
  if (Array.isArray(value)) return value.filter(Boolean) as string[];
  const trimmed = String(value).trim();
  if (!trimmed) return [] as string[];
  if (trimmed.includes(",")) {
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [trimmed];
};

const STEPS = ["Information"] as const;
type Step = (typeof STEPS)[number];

export default function CheckoutPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const [currentStep, setCurrentStep] = useState<Step>("Information");

  // Simple state for inputs
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [purchasedProduct, setPurchasedProduct] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNext = async () => {
    const newErrors: { [key: string]: string } = {};
    // if (!email.includes("@")) newErrors.email = "Enter a valid email";
    if (phone.length < 7) newErrors.phone = "Enter a valid phone number";
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    // if (address.length < 5) newErrors.address = "Address is too short";
    if (city.length < 2) newErrors.city = "City is required";
    // if (postalCode.length < 3) newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const orderCreated = await submitOrder();
      if (!orderCreated) return;

      const response = await fetch("/api/sendOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          firstName,
          lastName,
          address,
          city,
          postalCode,
          cart,
          subtotal: cart
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setShowSuccessModal(true);
      } else {
        toast.error("Failed to send order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const submitOrder = async () => {
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            phone,
            email,
            city,
            total: Number(subtotal.toFixed(2)),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(error);
        toast.error("Failed to save order. Please try again.");
        return false;
      }
      const items = cart.map((item) => {
        const productId =
          typeof item.id === "string" ? Number.parseInt(item.id, 10) : item.id;

        if (!Number.isFinite(productId)) {
          throw new Error("Invalid product id in cart.");
        }

        // console.log("Saving item", { ...item, productId });

        return {
          order_id: order.id,
          product_id: productId,
          quantity: item.quantity,
          size: item.size ?? null,
          color: item.color ?? null,
        };
      });

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);

      if (itemsError) {
        console.error(itemsError);
        toast.error("Failed to save order items. Please try again.");
        return false;
      }

      return true;
    } catch (err) {
      console.error(err);
      toast.error(
        "Order failed. Please remove items from cart and add them again.",
      );
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f1ef] px-6 md:px-16 py-10">
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                  Order confirmed
                </p>
                <h2 className="mt-2 text-lg font-medium text-stone-900">
                  Order placed successfully
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="text-stone-400 hover:text-stone-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm text-stone-600">
              Thanks for your order. We will contact you soon.
            </p>
            <div className="mt-6 flex gap-3">
              {/* <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 rounded border border-stone-200 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-stone-700 hover:border-stone-400"
              >
                Continue
              </button> */}
              <Link
                href="/collections"
                onClick={clearCart}
                className="flex-1 rounded bg-stone-900 px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-white hover:bg-stone-800"
              >
                Shop more
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-stone-700 transition-colors mb-8"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Back to Collections
        </Link>

        <h1 className="text-3xl font-medium tracking-[0.06em] uppercase text-stone-900 mb-5">
          Checkout
        </h1>

        {/* Step tabs */}
        <div className="flex items-end gap-7 border-b border-stone-200 mb-8">
          {STEPS.map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => setCurrentStep(step)}
              className={`pb-3 text-[11px] tracking-[0.1em] uppercase font-medium border-b-[1.5px] -mb-px transition-colors ${
                currentStep === step
                  ? "border-stone-900 text-stone-900"
                  : "border-transparent text-stone-400 hover:text-stone-600"
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {cart.length === 0 ? (
          <div className="rounded border border-stone-200 bg-white p-10 text-center">
            <p className="text-stone-500 text-sm mb-4">Your cart is empty.</p>
            <Link
              href="/collections"
              className="text-[11px] tracking-[0.2em] uppercase text-stone-800 border-b border-stone-400 hover:text-red-400 transition-colors"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-[1fr_340px] items-start">
            {/* Left: form */}
            <div className="space-y-8">
              <section>
                {/* <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-stone-800 mb-3">
                  Contact info
                </p> */}
                <div className="flex flex-col gap-2.5">
                  {/* <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3.5 py-3 bg-white border border-stone-200 rounded text-sm text-stone-900 placeholder:text-stone-300 focus:border-stone-500 outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )} */}
                  {/* 
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 py-3 bg-white border border-stone-200 rounded text-sm text-stone-900 placeholder:text-stone-300 focus:border-stone-500 outline-none transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )} */}
                </div>
              </section>

              <section>
                <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-stone-800 mb-3">
                  Contact info
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <input
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full h-11 px-3.5 py-3 bg-white border border-stone-200 rounded text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-500 outline-none transition-colors"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full h-11 px-3.5 py-3 bg-white border border-stone-200 rounded text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-500 outline-none transition-colors"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <input
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-11 px-3.5 py-3 bg-white border border-stone-200 rounded text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-500 outline-none transition-colors"
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-2">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="w-full h-11 px-3.5 flex items-center justify-between bg-white border border-stone-200 rounded text-sm text-stone-900"
                      >
                        {city
                          ? city.charAt(0).toUpperCase() + city.slice(1)
                          : "Select a city"}
                        <ChevronsUpDown className="w-4 h-4 opacity-50" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      side="bottom"
                      align="start"
                      sideOffset={8}
                      avoidCollisions={false}
                      className="w-full max-h-64 overflow-hidden p-0"
                    >
                      <Command>
                        <CommandInput placeholder="Search city..." />

                        <CommandEmpty>No city found.</CommandEmpty>

                        <CommandGroup className="max-h-56 overflow-y-auto">
                          {[
                            "casablanca",
                            "rabat",
                            "marrakesh",
                            "fes",
                            "tangier",
                            "agadir",
                            "meknes",
                            "oujda",
                            "kenitra",
                            "tetouan",
                            "safi",
                            "el_jadida",
                            "beni_mellal",
                            "nador",
                            "taza",
                            "khouribga",
                            "settat",
                            "larache",
                            "khemisset",
                            "guelmim",
                            "errachidia",
                            "ouarzazate",
                            "taroudant",
                            "tinghir",
                            "ifran",
                            "azrou",
                            "dakhla",
                            "laayoune",
                            "smara",
                            "boujdour",
                          ].map((c) => (
                            <CommandItem
                              key={c}
                              value={c}
                              onSelect={(currentValue) => {
                                setCity(currentValue);
                                setOpen(false);
                              }}
                            >
                              {c}
                              <Check
                                className={`ml-auto h-4 w-4 ${
                                  city === c ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 py-3 bg-white border border-stone-200 rounded text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-500 outline-none transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}

                  {/* <div>
                    <input
                      placeholder="Postal code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3.5 py-3 bg-white border border-stone-200 rounded text-sm text-stone-900 placeholder:text-stone-300 focus:border-stone-500 outline-none transition-colors"
                    />
                    {errors.postalCode && (
                      <p className="text-xs text-red-500">
                        {errors.postalCode}
                      </p>
                    )}
                  </div> */}
                </div>
              </section>

              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="w-full flex items-center justify-between px-5 py-4 bg-stone-200 hover:bg-stone-900 hover:text-white text-stone-900 rounded text-[11px] font-medium tracking-[0.12em] uppercase transition-colors group disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-stone-200 disabled:hover:text-stone-900"
              >
                <span>{isSubmitting ? "Submitting..." : "Confirm Order"}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            {/* Right: order summary */}
            <div className="bg-white border border-stone-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-stone-800">
                  Your order
                </p>
                <span className="text-xs font-medium text-blue-600">
                  ({cart.reduce((n, i) => n + i.quantity, 0)})
                </span>
              </div>

              <div className="space-y-0 divide-y divide-stone-100">
                {cart.map((item) => {
                  const primaryImage = normalizeImages(item.image)[0];
                  return (
                    <div key={item.id} className="flex gap-3 py-3">
                      <div className="relative w-[72px] h-[88px] flex-shrink-0 rounded overflow-hidden bg-stone-100">
                        {primaryImage ? (
                          <Image
                            src={primaryImage}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[10px] text-stone-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="text-[13px] font-medium text-stone-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-blue-600 font-medium mt-2">
                          ({item.quantity})
                        </p>
                      </div>
                      <div className="text-right pt-0.5">
                        <p className="text-[13px] font-medium text-stone-900">
                          {item.price} MAD
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[11px] cursor-pointer text-stone-400 underline hover:text-red-400 transition-colors mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-stone-100 mt-2 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="text-stone-900">
                    {subtotal.toFixed(2)} MAD
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Shipping</span>
                  <span className="text-xs text-stone-400">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-sm font-medium border-t border-stone-200 mt-4 pt-4">
                <span>Total</span>
                <span>{subtotal.toFixed(2)} MAD</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
