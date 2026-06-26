import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
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

    // Collect the customer's contact + delivery details from the form so we can
    // include "who they are" in the WhatsApp message.
    const form = e.currentTarget as HTMLFormElement;
    const get = (id: string) =>
      (form.elements.namedItem(id) as HTMLInputElement | null)?.value.trim() ?? "";

    const name = [get("firstName"), get("lastName")].filter(Boolean).join(" ");
    const addressParts = [
      get("address"),
      get("suburb"),
      get("city"),
      get("province"),
      get("postal"),
    ].filter(Boolean);

    // Build a WhatsApp message with the order details and open a chat to the
    // store's number so the order can be sent through. (+27 = South Africa,
    // local number 060 342 2259.)
    const lines = cart.map(
      (item) =>
        `• ${item.product.name}${item.size ? ` (Size ${item.size})` : ""} ×${item.quantity} — ${formatPrice(
          item.product.price * item.quantity,
        )}`,
    );
    const message = [
      "Hi oneof1custom! I'd like to place this order:",
      "",
      `Name: ${name}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      addressParts.length ? `Delivery: ${addressParts.join(", ")}` : "",
      "",
      ...lines,
      "",
      `Total: ${formatPrice(subtotal)}`,
    ]
      .filter((line) => line !== "")
      .join("\n");
    const whatsappUrl = `https://wa.me/27603422259?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setPlaced(true);
    clearCart();
    toast.success("Order ready", {
      description: "Your order is opening in WhatsApp — tap send to confirm.",
    });
  };

  if (placed) {
    return (
      <div className="container-luxe state">
        <CheckCircle2 className="state__icon state__icon--lg state__icon--gold" />
        <h1 className="state__title">Thank you for your order</h1>
        <p className="state__text">
          Your pieces are being lovingly prepared. We'll email tracking details shortly.
        </p>
        <Button asChild variant="luxe" size="lg" className="mt-xl">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-luxe state">
        <h1 className="state__title">Your bag is empty</h1>
        <Button asChild variant="luxe" size="lg" className="mt-xl">
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

          <p className="checkout-note">
            No online payment needed — once you place your order, WhatsApp opens
            with your details and items ready to send. We'll confirm payment and
            delivery with you directly on chat.
          </p>
        </div>


        <aside className="summary summary--sticky">
          <h2 className="summary__title">Order Summary</h2>
          <Separator />
          <ul className="summary__items">
            {cart.map((item) => (
              <li key={`${item.product.id}-${item.size ?? ""}`} className="summary__item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="summary__item-body">
                  <p className="summary__item-name">{item.product.name}</p>
                  <p className="summary__item-qty">
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
          <Button type="submit" variant="gold" size="xl" className="btn--block mt-lg">
            <MessageCircle /> Send Order on WhatsApp
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

