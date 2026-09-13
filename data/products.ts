import img1 from "@/app/assets/1.png";
import img2 from "@/app/assets/2.png";
import hash1 from "@/app/assets/1bb3a0d6b5a6ac7f0266bc0673a0df6d.jpg";
import hash2 from "@/app/assets/1cd1182eb97fa3347fb70ec1306b857c.jpg";
import hash3 from "@/app/assets/2bd760b75c0486cf71264531bcad6673.jpg";
import hash4 from "@/app/assets/55f3c564692998cb42c31d358d75eb06.jpg";
import hash5 from "@/app/assets/78ed5049ffa1fdb4f90bf2df4a83f27f.jpg";
import akieron from "@/app/assets/Akieron Tees.jpeg";
import archangel from "@/app/assets/Archangel Apparel.jpeg";
import betterDays from "@/app/assets/Better Days Ahead Tee - Black _ M.jpeg";
import betterTogether from "@/app/assets/Better together.jpeg";
import heren from "@/app/assets/Heren Casual Slogan Print Losse Ronde Hals Korte Mouw T-shirt.jpeg";
import kglory from "@/app/assets/K-GLORY Men's Casual Versatile Simple Graphic Print Short Sleeve T-ShirtI discovered amazing products on SHEIN_com, come check them out!.jpeg";
import minimalist from "@/app/assets/Men's Round Neck Short Sleeve Figure Printed Minimalist T-Shirt, Casual Everyday Wear.jpeg";
import oversized from "@/app/assets/Oversized Premium Super Heavyweight T-shirt.jpeg";
import asas from "@/app/assets/asas.jpeg";
import hash6 from "@/app/assets/b1ef2751e0f770c18e14bc30f1512734.jpg";
import ffff from "@/app/assets/ffff.jpeg";
import printedTee from "@/app/assets/Футболка с принтом.jpeg";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  color: string;
  size: string;
  category: string;
  in_stock: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Essential Tee",
    price: 45,
    description:
      "A clean, everyday tee cut from heavyweight cotton for a structured, boxy fit that holds its shape wash after wash.",
    image: asas.src,
    color: "White",
    size: "S,M,L,XL",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 2,
    name: "Signature Tee",
    price: 45,
    description:
      "Our signature back-print tee, made from soft-touch combed cotton with a relaxed drop-shoulder silhouette.",
    image: ffff.src,
    color: "Black",
    size: "S,M,L,XL,2X",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 3,
    name: "Boxy Crewneck Tee",
    price: 42,
    description:
      "A boxy crewneck built for layering, with a wide neckline and dropped shoulders for an off-duty look.",
    image: img1.src,
    color: "White",
    size: "S,M,L",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 4,
    name: "Classic Logo Tee",
    price: 40,
    description:
      "A wardrobe staple featuring a subtle chest logo, cut from mid-weight jersey for year-round wear.",
    image: img2.src,
    color: "Black",
    size: "S,M,L,XL",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 5,
    name: "Relaxed Fit Hoodie",
    price: 85,
    description:
      "A heavyweight fleece hoodie with a relaxed fit, ribbed cuffs, and a kangaroo pocket for cold-weather layering.",
    image: hash1.src,
    color: "Black,Gray",
    size: "S,M,L,XL,2X",
    category: "Hoodies / Sweatshirts",
    in_stock: "true",
  },
  {
    id: 6,
    name: "Heavyweight Crew Sweater",
    price: 78,
    description:
      "A dense, brushed-back crewneck sweater designed to keep its shape and warmth through every season.",
    image: hash2.src,
    color: "Gray",
    size: "M,L,XL",
    category: "Sweaters / Pullovers",
    in_stock: "true",
  },
  {
    id: 7,
    name: "Wide Leg Denim",
    price: 89,
    description:
      "Rigid selvedge denim cut with a wide leg and a high rise for a grounded, modern silhouette.",
    image: hash3.src,
    color: "Black",
    size: "S,M,L,XL",
    category: "Jeans",
    in_stock: "true",
  },
  {
    id: 8,
    name: "Straight Cut Trousers",
    price: 70,
    description:
      "Tailored straight-leg trousers in a durable twill, finished with a clean waistband and side pockets.",
    image: hash4.src,
    color: "Black",
    size: "S,M,L,XL",
    category: "Trousers / Pants",
    in_stock: "false",
  },
  {
    id: 9,
    name: "Track Joggers",
    price: 65,
    description:
      "Tapered fleece joggers with an elastic waist and ribbed hem, built for movement and comfort alike.",
    image: hash5.src,
    color: "Gray",
    size: "S,M,L,XL,2X",
    category: "Sweatpants / Joggers",
    in_stock: "true",
  },
  {
    id: 10,
    name: "Akieron Graphic Tee",
    price: 40,
    description:
      "A graphic-forward tee with a bold front print, cut from soft cotton jersey for daily rotation.",
    image: akieron.src,
    color: "Black,White",
    size: "S,M,L",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 11,
    name: "Archangel Tee",
    price: 42,
    description:
      "A minimal statement tee with a small embroidered motif, cut for a clean, structured fit.",
    image: archangel.src,
    color: "Black",
    size: "M,L,XL",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 12,
    name: "Better Days Tee",
    price: 38,
    description:
      "A soft-spoken graphic tee with a hopeful message, made from lightweight breathable cotton.",
    image: betterDays.src,
    color: "Black",
    size: "S,M",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 13,
    name: "Better Together Tee",
    price: 39,
    description:
      "A relaxed everyday tee with a light hand-feel, designed to pair effortlessly with anything in rotation.",
    image: betterTogether.src,
    color: "White,Gray",
    size: "S,M,L,XL,2X",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 14,
    name: "Slogan Print Tee",
    price: 36,
    description:
      "A loose, round-neck tee with a short-sleeve cut and a printed slogan across the chest.",
    image: heren.src,
    color: "White",
    size: "S,M,L",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 15,
    name: "K-Glory Graphic Tee",
    price: 41,
    description:
      "A versatile casual tee with a simple graphic print, cut generously for a laid-back silhouette.",
    image: kglory.src,
    color: "Black,White",
    size: "S,M,L,XL",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 16,
    name: "Minimalist Print Tee",
    price: 37,
    description:
      "A round-neck tee with a subtle figure print, built for casual everyday wear.",
    image: minimalist.src,
    color: "Gray",
    size: "M,L",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 17,
    name: "Oversized Heavyweight Tee",
    price: 55,
    description:
      "A premium super-heavyweight tee with an oversized drop-shoulder cut for a substantial, structured feel.",
    image: oversized.src,
    color: "Black",
    size: "M,L,XL,2X",
    category: "T-Shirts",
    in_stock: "true",
  },
  {
    id: 18,
    name: "Baggy Fit Jeans",
    price: 75,
    description:
      "Washed-black baggy denim with a dropped crotch and stacked hem for a lived-in, oversized fit.",
    image: hash6.src,
    color: "Black",
    size: "S,M,L,XL",
    category: "Jeans",
    in_stock: "true",
  },
  {
    id: 19,
    name: "Printed Statement Tee",
    price: 43,
    description:
      "A bold printed tee designed to stand out, cut from mid-weight cotton with a true-to-size fit.",
    image: printedTee.src,
    color: "Black,White",
    size: "S,M,L,XL",
    category: "T-Shirts",
    in_stock: "true",
  },
];

export function getProductById(id: number | string) {
  const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  return products.find((p) => p.id === numericId) ?? null;
}
