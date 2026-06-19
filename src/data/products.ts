import ring from "@/assets/product-ring.jpg";
import necklace from "@/assets/product-necklace.jpg";
import earrings from "@/assets/product-earrings.jpg";
import bracelet from "@/assets/product-bracelet.jpg";
import watch from "@/assets/product-watch.jpg";
import custom from "@/assets/product-custom.jpg";

export type Category =
  | "Rings"
  | "Necklaces"
  | "Earrings"
  | "Bracelets"
  | "Watches"
  | "Custom";

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
  { name: "Rings", blurb: "Statement & solitaire", image: ring },
  { name: "Necklaces", blurb: "Pendants & chains", image: necklace },
  { name: "Earrings", blurb: "Studs & drops", image: earrings },
  { name: "Bracelets", blurb: "Tennis & bangles", image: bracelet },
  { name: "Watches", blurb: "Timeless timepieces", image: watch },
  { name: "Custom", blurb: "Made for you", image: custom },
];

export const products: Product[] = [
  {
    id: "aurora-solitaire",
    name: "Aurora Solitaire Ring",
    category: "Rings",
    price: 18500,
    rating: 4.9,
    reviews: 128,
    image: ring,
    material: "18K Yellow Gold · 1.2ct Diamond",
    description:
      "A timeless brilliant-cut diamond held in a delicate halo setting. The Aurora Solitaire is hand-finished by our master jewellers for a flawless silhouette that catches the light from every angle.",
    isNew: true,
    popularity: 98,
    sizes: ["4", "5", "6", "7", "8", "9"],
  },
  {
    id: "celeste-pendant",
    name: "Celeste Diamond Pendant",
    category: "Necklaces",
    price: 9200,
    rating: 4.8,
    reviews: 96,
    image: necklace,
    material: "18K Gold · 0.5ct Diamond · 45cm Chain",
    description:
      "A single radiant diamond suspended on a fine rope chain. Effortless elegance that transitions from day to evening with quiet confidence.",
    isNew: true,
    popularity: 94,
  },
  {
    id: "luna-studs",
    name: "Luna Diamond Studs",
    category: "Earrings",
    price: 6400,
    rating: 4.9,
    reviews: 211,
    image: earrings,
    material: "18K Gold · 0.75ct Diamonds (pair)",
    description:
      "Classic four-prong diamond studs, perfectly matched for brilliance and clarity. The essential pair every collection deserves.",
    popularity: 99,
  },
  {
    id: "eternity-bracelet",
    name: "Eternity Tennis Bracelet",
    category: "Bracelets",
    price: 24800,
    rating: 5.0,
    reviews: 64,
    image: bracelet,
    material: "18K Gold · 3.0ct Diamonds",
    description:
      "An unbroken line of hand-set diamonds encircling the wrist. A modern heirloom defined by its uninterrupted sparkle.",
    popularity: 91,
  },
  {
    id: "regent-timepiece",
    name: "Regent Gold Timepiece",
    category: "Watches",
    price: 32000,
    rating: 4.7,
    reviews: 38,
    image: watch,
    material: "18K Gold Case · Sapphire Crystal",
    description:
      "A refined automatic movement housed in a polished gold case. Understated horology for those who value precision and presence.",
    popularity: 86,
  },
  {
    id: "bespoke-engagement",
    name: "Bespoke Engagement Ring",
    category: "Custom",
    price: 28500,
    rating: 5.0,
    reviews: 47,
    image: custom,
    material: "Your choice of gold & certified diamond",
    description:
      "Co-create a one-of-a-kind ring with our design atelier. From stone selection to the final polish, every detail is crafted to your story.",
    isNew: true,
    popularity: 95,
    sizes: ["4", "5", "6", "7", "8", "9"],
  },
  {
    id: "halo-promise",
    name: "Halo Promise Ring",
    category: "Rings",
    price: 12400,
    rating: 4.8,
    reviews: 73,
    image: custom,
    material: "18K Gold · 0.9ct Diamond",
    description:
      "A romantic halo of micro-pavé diamonds surrounding a central stone, designed to symbolise a promise that endures.",
    popularity: 88,
    sizes: ["4", "5", "6", "7", "8"],
  },
  {
    id: "aria-drop-earrings",
    name: "Aria Drop Earrings",
    category: "Earrings",
    price: 8800,
    rating: 4.9,
    reviews: 58,
    image: earrings,
    material: "18K Gold · 1.0ct Diamonds (pair)",
    description:
      "Graceful diamond drops that move with you, catching candlelight at every turn. The finishing note to any evening look.",
    popularity: 84,
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value);

export const getProduct = (id: string) => products.find((p) => p.id === id);
