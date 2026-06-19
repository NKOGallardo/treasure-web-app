import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
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
      <article className="group relative flex flex-col">
        <div className="relative overflow-hidden rounded-sm bg-secondary">
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            aria-label={product.name}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {product.isNew && (
            <Badge className="absolute left-3 top-3 rounded-sm bg-gold text-gold-foreground hover:bg-gold">
              New
            </Badge>
          )}

          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
          >
            <Heart
              className={`size-4 ${wished ? "fill-gold text-gold" : "text-foreground"}`}
            />
          </button>

          <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              variant="luxe"
              size="sm"
              className="flex-1"
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
              className="bg-background/80 backdrop-blur"
              onClick={() => setQuickOpen(true)}
            >
              <Eye /> View
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <p className="eyebrow text-muted-foreground">{product.category}</p>
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="font-serif text-lg leading-tight transition-colors hover:text-gold"
          >
            {product.name}
          </Link>
          <StarRating rating={product.rating} reviews={product.reviews} />
          <p className="mt-1 text-base font-medium">{formatPrice(product.price)}</p>
        </div>
      </article>

      <QuickViewDialog product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </>
  );
}
