import lavenderRing from "@/assets/Lavender.jpeg";
import amethystRing from "@/assets/Cat-eye.jpeg";
import lavenderBracelet from "@/assets/Lavender.jpeg";
import tigerEyeBracelet from "@/assets/bracelet-tigereye.jpeg";
import pearlcomboBracelet from "@/assets/Pearl-combo.jpeg";

export type Category = "Rings" | "Bracelets";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  material: string;
  description: string;
  isNew?: boolean;
  popularity: number;
  sizes?: string[];
}

export const categories: { name: Category; blurb: string; image: string }[] = [
  { name: "Rings", blurb: "Hand-wrapped rings", image: lavenderRing },
  { name: "Bracelets", blurb: "Beaded bracelets", image: lavenderBracelet },
];

export const products: Product[] = [
  {
    id: "lavender-jade-crystal-ring",
    name: "Lavender jade crystal wire-wrapped Ring",
    category: "Rings",
    price: 100,
    rating: 4.9,
    reviews: 24,
    image: lavenderRing,
    material: "Gold-tone wire · Peridot-green resin stone",
    description:
      "A one-of-a-kind hand-wrapped ring featuring a luminous green stone cradled in gold-tone wire. Each piece is made to order and unique to you.",
    isNew: true,
    popularity: 96,
    sizes: ["4", "5", "6", "7", "8", "9"],
  },
  {
    id: "cat-eye-wrap-ring",
    name: "cat-eye Wire-Wrapped Ring",
    category: "Rings",
    price: 100,
    rating: 4.8,
    reviews: 19,
    image: amethystRing,
    material: "forest-tone wire · beed stone",
    description:
      "A delicate hand-wrapped ring set with a shimmering lilac stone on silver-tone wire. A dreamy everyday piece, individually crafted.",
    isNew: true,
    popularity: 93,
    sizes: ["4", "5", "6", "7", "8", "9"],
  },
  {
    id: "pearlcombo-bracelet",
    name: "Pearl combo",
    category: "Bracelets",
    price: 100,
    rating: 5.0,
    reviews: 31,
    image: pearlcomboBracelet,
    material: "Glass Pearls",
    description:
      "A timeless stretch bracelet of glossy glass pearls accented with sparkling rhinestone spacers. Classic, feminine and effortless to wear.",
    popularity: 91,
  },
  {
    id: "lavender-jade-crystal-bracelet",
    name: "Lavender jade crystal bracelet",
    category: "Bracelets",
    price: 80,
    rating: 4.9,
    reviews: 27,
    image: lavenderBracelet,
    material: "crystal",
    description:
      "A delicate stretch bracelet of lavender jade crystal beads accented with a star charm. A subtle, feminine piece that adds a touch of sparkle to your everyday look.",
    isNew: true,
    popularity: 88,
  },
  {
    id: "tiger-eye-bracelet",
    name: "Men's Tiger Eye Bracelet",
    category: "Bracelets",
    price: 100,
    rating: 4.9,
    reviews: 18,
    image: tigerEyeBracelet,
    material: "Natural tiger eye stone · Waterproof elastic",
    description:
      "A grounding men's bracelet strung with natural tiger eye beads. Waterproof and built for everyday wear — wear it anywhere.",
    popularity: 90,
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value);

export const getProduct = (id: string) => products.find((p) => p.id === id);
