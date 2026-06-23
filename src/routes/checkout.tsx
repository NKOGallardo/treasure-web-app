import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, CheckCircle2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — oneof1custom" },
      { name: "description", content: "Securely complete your oneof1custom order." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { cart, subtotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Payment gateway integration (e.g. PayFast) connects here once a
    // backend is added. For now we confirm the order locally.
    setPlaced(true);
    clearCart();
    toast.success("Order confirmed", {
      description: "A confirmation email is on its way.",
    });
  };

  if (placed) {
    return (
      <div className="container-luxe state">
        <CheckCircle2 className="gold" style={{ margin: "0 auto", width: "3.5rem", height: "3.5rem" }} />
        <h1 className="state__title">Thank you for your order</h1>
        <p className="state__text">
          Your pieces are being lovingly prepared. We'll email tracking details shortly.
        </p>
        <Button asChild variant="luxe" size="lg" style={{ marginTop: "2rem" }}>
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-luxe state">
        <h1 className="state__title">Your bag is empty</h1>
        <Button asChild variant="luxe" size="lg" style={{ marginTop: "2rem" }}>
          <Link to="/shop">Explore the collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxe page">
      <h1 className="page__title page__title--mb">Checkout</h1>

      <form onSubmit={handleSubmit} className="checkout-form split-layout">
        <div className="checkout__col">
          {/* Contact */}
          <section>
            <h2 className="checkout-section__title">Contact Information</h2>
            <div className="form-grid form-grid--2">
              <Field id="firstName" label="First name" required />
              <Field id="lastName" label="Last name" required />
              <Field id="email" label="Email" type="email" required className="col-span-2" />
              <Field id="phone" label="Phone" type="tel" required className="col-span-2" />
            </div>
          </section>

          {/* Delivery */}
          <section>
            <h2 className="checkout-section__title">Delivery Address</h2>
            <div className="form-grid form-grid--2">
              <Field id="address" label="Street address" required className="col-span-2" />
              <Field id="suburb" label="Suburb" required />
              <Field id="city" label="City" required />
              <Field id="province" label="Province" required />
              <Field id="postal" label="Postal code" required />
            </div>
          </section>

          {/* Payment */}
          <section>
            <div className="payment-head">
              <h2 className="checkout-section__title">Payment</h2>
              <span className="payment-secured">
                <Lock /> Secured
              </span>
            </div>
            <div className="payment-card">
              <div className="payment-card__head">
                <CreditCard /> Card / PayFast
              </div>
              <p className="payment-card__note">
                Secure payment processing will be enabled here once your payment gateway (such as
                PayFast) is connected.
              </p>
              <div className="form-grid form-grid--2">
                <Field id="card" label="Card number" placeholder="•••• •••• •••• ••••" className="col-span-2" />
                <Field id="expiry" label="Expiry" placeholder="MM / YY" />
                <Field id="cvc" label="CVC" placeholder="•••" />
              </div>
            </div>
          </section>
        </div>

        <aside className="summary summary--sticky">
          <h2 className="summary__title">Order Summary</h2>
          <Separator />
          <ul className="summary__items">
            {cart.map((item) => (
              <li key={`${item.product.id}-${item.size ?? ""}`} className="summary__item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="summary__item-body">
                  <p style={{ lineHeight: 1.2 }}>{item.product.name}</p>
                  <p className="cart-item__sub" style={{ fontSize: "0.75rem" }}>
                    Qty {item.quantity}
                    {item.size && ` · Size ${item.size}`}
                  </p>
                </div>
                <p>{formatPrice(item.product.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
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
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Button type="submit" variant="gold" size="xl" className="btn--block" style={{ marginTop: "1.5rem" }}>
            <Lock /> Place Order
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
  className,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={["field", className].filter(Boolean).join(" ")}>
      <Label htmlFor={id} className="field__label">
        {label}
      </Label>
      <Input id={id} type={type} required={required} placeholder={placeholder} />
    </div>
  );
}

