import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
      <DialogContent className="dialog-content--wide">
        <div className="quickview">
          <img src={product.image} alt={product.name} className="quickview__img" />
          <div className="quickview__body">
            <p className="eyebrow muted">{product.category}</p>
            <DialogTitle className="quickview__title">{product.name}</DialogTitle>
            <div className="quickview__rating">
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>
            <p className="quickview__price">{formatPrice(product.price)}</p>
            <p className="quickview__desc">{product.description}</p>
            <p className="quickview__material">{product.material}</p>

            {product.sizes && (
              <div className="pdp__block">
                <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                  Size
                </p>
                <div className="size-row">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn("size-btn", size === s && "is-active")}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quickview__cta">
              <Button
                variant="gold"
                className="btn--flex1"
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
                <Heart className={cn(wished && "fill-gold")} />
              </Button>
            </div>

            <Button asChild variant="link" className="quickview__details">
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
