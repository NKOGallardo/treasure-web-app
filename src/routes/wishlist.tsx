import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — oneof1custom" },
      { name: "description", content: "Your saved oneof1custom pieces." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="container-luxe state">
        <Heart className="state__icon" style={{ width: "3rem", height: "3rem" }} />
        <h1 className="state__title">Your wishlist is empty</h1>
        <p className="state__text">Tap the heart on any piece to save it for later.</p>
        <Button asChild variant="luxe" size="lg" style={{ marginTop: "2rem" }}>
          <Link to="/shop">Discover pieces</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxe page">
      <h1 className="page__title page__title--mb">Your Wishlist</h1>
      <div className="product-grid">
        {saved.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

