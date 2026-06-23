import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { QuickViewDialog } from "@/components/QuickViewDialog";
import { useStore } from "@/context/StoreContext";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quickOpen, setQuickOpen] = useState(false);
  const wished = isWishlisted(product.id);

  return (
    <>
      <article className="product-card">
        <div className="product-card__media">
          <Link to="/products/$id" params={{ id: product.id }} aria-label={product.name}>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="product-card__img"
            />
          </Link>

          {product.isNew && (
            <Badge variant="gold" className="product-card__badge">
              New
            </Badge>
          )}

          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Toggle wishlist"
            className="product-card__wishlist"
          >
            <Heart className={cn(wished && "fill-gold")} />
          </button>

          <div className="product-card__actions">
            <Button
              variant="luxe"
              size="sm"
              className="btn--flex1"
              onClick={() => {
                addToCart(product);
                toast.success("Added to bag", { description: product.name });
              }}
            >
              <ShoppingBag /> Add
            </Button>
            <Button
              variant="outlineLuxe"
              size="sm"
              className="product-card__glass"
              onClick={() => setQuickOpen(true)}
            >
              <Eye /> View
            </Button>
          </div>
        </div>

        <div className="product-card__body">
          <p className="eyebrow muted">{product.category}</p>
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="product-card__name"
          >
            {product.name}
          </Link>
          <StarRating rating={product.rating} reviews={product.reviews} />
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </article>

      <QuickViewDialog product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </>
  );
}
