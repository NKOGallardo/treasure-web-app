import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — AURÉLIE" },
      { name: "description", content: "Review the pieces in your AURÉLIE shopping bag." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useStore();
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <ShoppingBag className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-6 font-serif text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Discover pieces worthy of your collection.
        </p>
        <Button asChild variant="luxe" size="lg" className="mt-8">
          <Link to="/shop">Explore the collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxe py-12">
      <h1 className="mb-10 font-serif text-4xl md:text-5xl">Your Bag</h1>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-border">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.size ?? ""}`}
              className="flex gap-4 py-6 first:pt-0"
            >
              <Link
                to="/products/$id"
                params={{ id: item.product.id }}
                className="shrink-0"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-28 rounded-sm object-cover md:size-32"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="eyebrow text-muted-foreground">
                      {item.product.category}
                    </p>
                    <Link
                      to="/products/$id"
                      params={{ id: item.product.id }}
                      className="font-serif text-lg transition-colors hover:text-gold"
                    >
                      {item.product.name}
                    </Link>
                    {item.size && (
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    )}
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="inline-flex items-center rounded-sm border border-border">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1, item.size)
                      }
                      className="flex size-9 items-center justify-center transition-colors hover:bg-accent"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1, item.size)
                      }
                      className="flex size-9 items-center justify-center transition-colors hover:bg-accent"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-sm border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl">Order Summary</h2>
          <Separator className="my-5" />
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="text-gold">Free</dd>
            </div>
          </dl>
          <Separator className="my-5" />
          <div className="flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button asChild variant="gold" size="xl" className="mt-6 w-full">
            <Link to="/checkout">
              Checkout <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="link" className="mt-2 w-full">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
