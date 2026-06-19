import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — AURÉLIE" },
      { name: "description", content: "Your saved AURÉLIE pieces." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <Heart className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-6 font-serif text-4xl">Your wishlist is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Tap the heart on any piece to save it for later.
        </p>
        <Button asChild variant="luxe" size="lg" className="mt-8">
          <Link to="/shop">Discover pieces</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxe py-12">
      <h1 className="mb-10 font-serif text-4xl md:text-5xl">Your Wishlist</h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {saved.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
