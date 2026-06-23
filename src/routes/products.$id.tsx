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
            { title: `${p.name} — oneof1custom` },
            { name: "description", content: p.description },
            { property: "og:title", content: `${p.name} — oneof1custom` },
            { property: "og:description", content: p.description },
            { property: "og:image", content: p.image },
            { name: "twitter:image", content: p.image },
          ]
        : [{ title: "Product — oneof1custom" }],
    };
  },
  notFoundComponent: ProductNotFound,
  errorComponent: ProductNotFound,
  component: ProductDetail,
});

function ProductNotFound() {
  return (
    <div className="container-luxe state" style={{ padding: "8rem 0" }}>
      <h1 className="state__title">Piece not found</h1>
      <p className="state__text">This item may have sold out or moved.</p>
      <Button asChild variant="luxe" style={{ marginTop: "2rem" }}>
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
    <div className="container-luxe page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb__sep">/</span>
        <Link to="/shop" search={{ category: product.category }}>
          {product.category}
        </Link>
        <span className="breadcrumb__sep">/</span>
        <span className="breadcrumb__current">{product.name}</span>
      </nav>

      <div className="pdp__layout">
        <div className="pdp__media">
          <img src={product.image} alt={product.name} width={800} height={800} />
          {product.isNew && (
            <Badge variant="gold" className="pdp__badge">
              New
            </Badge>
          )}
        </div>

        <div className="pdp__info">
          <p className="eyebrow gold">{product.category}</p>
          <h1 className="pdp__title">{product.name}</h1>
          <div style={{ marginTop: "1rem" }}>
            <StarRating rating={product.rating} reviews={product.reviews} size="md" />
          </div>
          <p className="pdp__price">{formatPrice(product.price)}</p>

          <p className="pdp__desc">{product.description}</p>

          <div className="pdp__materials">
            <p className="eyebrow muted" style={{ marginBottom: "0.25rem" }}>
              Materials
            </p>
            <p style={{ fontSize: "0.875rem" }}>{product.material}</p>
          </div>

          {product.sizes && (
            <div className="pdp__block">
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                Select Size
              </p>
              <div className="size-row">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`size-btn size-btn--lg${size === s ? " is-active" : ""}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pdp__block">
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
              Quantity
            </p>
            <div className="qty-control qty-control--lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                <Minus />
              </button>
              <span className="qty-value qty-value--lg">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="qty-btn"
                aria-label="Increase quantity"
              >
                <Plus />
              </button>
            </div>
          </div>

          <div className="pdp__cta">
            <Button
              variant="gold"
              size="xl"
              className="btn--flex1"
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
              style={{ width: "3rem", height: "3rem" }}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
            >
              <Heart className={wished ? "fill-gold" : ""} />
            </Button>
          </div>

          <div className="pdp__trust">
            {[
              { icon: Gem, label: "Hand-picked beads" },
              { icon: ShieldCheck, label: "Made with care" },
              { icon: Truck, label: "Free delivery across SA" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="pdp__trust-item">
                <Icon />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="related">
        <h2 className="related__title">You May Also Love</h2>
        <div className="product-grid">
          {relatedList.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

