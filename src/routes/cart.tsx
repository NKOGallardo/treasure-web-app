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
      <div className="container-luxe state">
        <ShoppingBag className="state__icon" style={{ width: "3rem", height: "3rem" }} />
        <h1 className="state__title">Your bag is empty</h1>
        <p className="state__text">Discover pieces worthy of your collection.</p>
        <Button asChild variant="luxe" size="lg" style={{ marginTop: "2rem" }}>
          <Link to="/shop">Explore the collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxe page">
      <h1 className="page__title page__title--mb">Your Bag</h1>

      <div className="split-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <div key={`${item.product.id}-${item.size ?? ""}`} className="cart-item">
              <Link to="/products/$id" params={{ id: item.product.id }} style={{ flexShrink: 0 }}>
                <img src={item.product.image} alt={item.product.name} className="cart-item__img" />
              </Link>

              <div className="cart-item__body">
                <div className="cart-item__top">
                  <div>
                    <p className="eyebrow muted">{item.product.category}</p>
                    <Link
                      to="/products/$id"
                      params={{ id: item.product.id }}
                      className="cart-item__name"
                    >
                      {item.product.name}
                    </Link>
                    {item.size && <p className="cart-item__sub">Size: {item.size}</p>}
                  </div>
                  <p className="cart-item__line">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>

                <div className="cart-item__controls">
                  <div className="qty-control">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1, item.size)
                      }
                      className="qty-btn"
                      aria-label="Decrease quantity"
                    >
                      <Minus />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1, item.size)
                      }
                      className="qty-btn"
                      aria-label="Increase quantity"
                    >
                      <Plus />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="remove-btn"
                  >
                    <Trash2 /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="summary summary--sticky">
          <h2 className="summary__title">Order Summary</h2>
          <Separator />
          <dl className="summary__rows">
            <div className="summary__row">
              <dt className="muted">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="summary__row">
              <dt className="muted">Shipping</dt>
              <dd className="gold">Free</dd>
            </div>
          </dl>
          <Separator />
          <div className="summary__total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button asChild variant="gold" size="xl" className="btn--block" style={{ marginTop: "1.5rem" }}>
            <Link to="/checkout">
              Checkout <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="link" className="btn--block" style={{ marginTop: "0.5rem" }}>
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}

