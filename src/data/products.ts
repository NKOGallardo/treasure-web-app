import peridotRing from "@/assets/ring-peridot.jpeg.asset.json";
import amethystRing from "@/assets/ring-amethyst.jpeg.asset.json";
import pearlBracelet from "@/assets/bracelet-pearl.jpeg.asset.json";
import lilacStarBracelet from "@/assets/bracelet-lilac-star.jpeg.asset.json";
import tigerEyeBracelet from "@/assets/bracelet-tigereye.jpeg.asset.json";

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
  { name: "Rings", blurb: "Hand-wrapped rings", image: peridotRing.url },
  { name: "Bracelets", blurb: "Beaded bracelets", image: pearlBracelet.url },
];

export const products: Product[] = [
  {
    id: "peridot-wrap-ring",
    name: "Peridot Wire-Wrapped Ring",
    category: "Rings",
    price: 220,
    rating: 4.9,
    reviews: 24,
    image: peridotRing.url,
    material: "Gold-tone wire · Peridot-green resin stone",
    description:
      "A one-of-a-kind hand-wrapped ring featuring a luminous green stone cradled in gold-tone wire. Each piece is made to order and unique to you.",
    isNew: true,
    popularity: 96,
    sizes: ["4", "5", "6", "7", "8", "9"],
  },
  {
    id: "amethyst-wrap-ring",
    name: "Amethyst Wire-Wrapped Ring",
    category: "Rings",
    price: 220,
    rating: 4.8,
    reviews: 19,
    image: amethystRing.url,
    material: "Silver-tone wire · Lilac sparkle stone",
    description:
      "A delicate hand-wrapped ring set with a shimmering lilac stone on silver-tone wire. A dreamy everyday piece, individually crafted.",
    isNew: true,
    popularity: 93,
    sizes: ["4", "5", "6", "7", "8", "9"],
  },
  {
    id: "pearl-rhinestone-bracelet",
    name: "Pearl & Rhinestone Bracelet",
    category: "Bracelets",
    price: 180,
    rating: 5.0,
    reviews: 31,
    image: pearlBracelet.url,
    material: "Glass pearls · Crystal rhinestone spacers · Elastic",
    description:
      "A timeless stretch bracelet of glossy glass pearls accented with sparkling rhinestone spacers. Classic, feminine and effortless to wear.",
    popularity: 91,
  },
  {
    id: "lilac-star-bracelet",
    name: "Lilac Star Charm Bracelet",
    category: "Bracelets",
    price: 150,
    rating: 4.9,
    reviews: 27,
    image: lilacStarBracelet.url,
    material: "Lilac glass beads · Star charm · Elastic",
    description:
      "Soft lilac beads finished with a dainty star charm on a comfortable stretch fit. Playful, pretty and perfect for stacking.",
    isNew: true,
    popularity: 88,
  },
  {
    id: "tiger-eye-bracelet",
    name: "Men's Tiger Eye Bracelet",
    category: "Bracelets",
    price: 250,
    rating: 4.9,
    reviews: 18,
    image: tigerEyeBracelet.url,
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
