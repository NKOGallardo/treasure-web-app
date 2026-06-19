import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { useStore } from "@/context/StoreContext";
import { formatPrice, type Product } from "@/data/products";

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  const wished = isWishlisted(product.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
          <div className="flex flex-col p-6 md:p-8">
            <p className="eyebrow text-muted-foreground">{product.category}</p>
            <DialogTitle className="mt-2 font-serif text-2xl font-normal">
              {product.name}
            </DialogTitle>
            <div className="mt-2">
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>
            <p className="mt-4 text-2xl font-medium">{formatPrice(product.price)}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {product.material}
            </p>

            {product.sizes && (
              <div className="mt-5">
                <p className="eyebrow mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`flex h-9 min-w-9 items-center justify-center rounded-sm border px-2 text-sm transition-colors ${
                        size === s
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <Button
                variant="gold"
                className="flex-1"
                onClick={() => {
                  addToCart(product, 1, size);
                  toast.success("Added to bag", { description: product.name });
                  onOpenChange(false);
                }}
              >
                <ShoppingBag /> Add to Bag
              </Button>
              <Button
                variant="outlineLuxe"
                size="icon"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
              >
                <Heart className={wished ? "fill-gold text-gold" : ""} />
              </Button>
            </div>

            <Button asChild variant="link" className="mt-4 self-start px-0">
              <Link to="/products/$id" params={{ id: product.id }}>
                View full details →
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
