import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingBag, Minus, Plus, Gem, Truck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { formatPrice, getProduct, products } from "@/data/products";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: p
        ? [
            { title: `${p.name} — AURÉLIE` },
            { name: "description", content: p.description },
            { property: "og:title", content: `${p.name} — AURÉLIE` },
            { property: "og:description", content: p.description },
            { property: "og:image", content: p.image },
            { name: "twitter:image", content: p.image },
          ]
        : [{ title: "Product — AURÉLIE" }],
    };
  },
  notFoundComponent: ProductNotFound,
  errorComponent: ProductNotFound,
  component: ProductDetail,
});

function ProductNotFound() {
  return (
    <div className="container-luxe py-32 text-center">
      <h1 className="font-serif text-4xl">Piece not found</h1>
      <p className="mt-3 text-muted-foreground">
        This item may have sold out or moved.
      </p>
      <Button asChild variant="luxe" className="mt-8">
        <Link to="/shop">Back to shop</Link>
      </Button>
    </div>
  );
}

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  const wished = isWishlisted(product.id);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4);
  const relatedList = related.length ? related : fallbackRelated;

  return (
    <div className="container-luxe py-12">
      <nav className="mb-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" search={{ category: product.category }} className="hover:text-foreground">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-sm bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="aspect-square w-full object-cover"
          />
          {product.isNew && (
            <Badge className="absolute left-4 top-4 rounded-sm bg-gold text-gold-foreground hover:bg-gold">
              New
            </Badge>
          )}
        </div>

        <div className="flex flex-col">
          <p className="eyebrow text-gold">{product.category}</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4">
            <StarRating rating={product.rating} reviews={product.reviews} size="md" />
          </div>
          <p className="mt-6 text-3xl font-medium">{formatPrice(product.price)}</p>

          <p className="mt-6 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 rounded-sm border border-border bg-card p-4">
            <p className="eyebrow mb-1 text-muted-foreground">Materials</p>
            <p className="text-sm">{product.material}</p>
          </div>

          {product.sizes && (
            <div className="mt-6">
              <p className="eyebrow mb-3">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex h-11 min-w-11 items-center justify-center rounded-sm border px-3 text-sm transition-colors ${
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

          <div className="mt-6">
            <p className="eyebrow mb-3">Quantity</p>
            <div className="inline-flex items-center rounded-sm border border-border">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-11 items-center justify-center transition-colors hover:bg-accent"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-12 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex size-11 items-center justify-center transition-colors hover:bg-accent"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant="gold"
              size="xl"
              className="flex-1"
              onClick={() => {
                addToCart(product, quantity, size);
                toast.success("Added to bag", {
                  description: `${quantity} × ${product.name}`,
                });
              }}
            >
              <ShoppingBag /> Add to Bag
            </Button>
            <Button
              variant="outlineLuxe"
              size="icon"
              className="size-12"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
            >
              <Heart className={wished ? "fill-gold text-gold" : ""} />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
            {[
              { icon: Gem, label: "Conflict-free" },
              { icon: ShieldCheck, label: "Lifetime warranty" },
              { icon: Truck, label: "Free insured delivery" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="size-5 text-gold" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="mb-10 text-center font-serif text-3xl md:text-4xl">
          You May Also Love
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {relatedList.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
