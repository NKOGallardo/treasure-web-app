import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/data/products";
import { useState } from "react";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart, subtotal, cartCount } = useStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="cart-sheet">
        <SheetHeader>
          <SheetTitle className="serif cart-sheet__title">
            Your Bag {cartCount > 0 && <span className="cart-sheet__count">({cartCount})</span>}
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="cart-sheet__empty">
            <ShoppingBag className="cart-sheet__empty-icon" />
            <p className="cart-sheet__empty-text">Your bag is empty</p>
            <Button asChild variant="luxe" size="lg" onClick={() => setOpen(false)}>
              <Link to="/shop">Explore the collection</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-sheet__items">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size ?? ""}`} className="cart-sheet__item">
                  <Link
                    to="/products/$id"
                    params={{ id: item.product.id }}
                    className="cart-sheet__img-link"
                    onClick={() => setOpen(false)}
                  >
                    <img src={item.product.image} alt={item.product.name} />
                  </Link>

                  <div className="cart-sheet__item-body">
                    <div className="cart-sheet__item-top">
                      <Link
                        to="/products/$id"
                        params={{ id: item.product.id }}
                        className="cart-sheet__item-name"
                        onClick={() => setOpen(false)}
                      >
                        {item.product.name}
                      </Link>
                      <p className="cart-sheet__item-price">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                    {item.size && (
                      <p className="cart-sheet__item-size">Size: {item.size}</p>
                    )}
                    <div className="cart-sheet__item-controls">
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

            <div className="cart-sheet__footer">
              <Separator />
              <div className="cart-sheet__total">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="cart-sheet__note">Shipping calculated at checkout.</p>
              <Button
                asChild
                variant="gold"
                size="xl"
                className="btn--block"
                onClick={() => setOpen(false)}
              >
                <Link to="/checkout">
                  Checkout <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="btn--block"
                onClick={() => setOpen(false)}
              >
                <Link to="/cart">View full bag</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
