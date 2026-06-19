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
      { title: "Checkout — AURÉLIE" },
      { name: "description", content: "Securely complete your AURÉLIE order." },
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
      <div className="container-luxe py-24 text-center">
        <CheckCircle2 className="mx-auto size-14 text-gold" />
        <h1 className="mt-6 font-serif text-4xl">Thank you for your order</h1>
        <p className="mt-3 text-muted-foreground">
          Your pieces are being lovingly prepared. We'll email tracking details
          shortly.
        </p>
        <Button asChild variant="luxe" size="lg" className="mt-8">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <h1 className="font-serif text-4xl">Your bag is empty</h1>
        <Button asChild variant="luxe" size="lg" className="mt-8">
          <Link to="/shop">Explore the collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxe py-12">
      <h1 className="mb-10 font-serif text-4xl md:text-5xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          {/* Contact */}
          <section>
            <h2 className="font-serif text-2xl">Contact Information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id="firstName" label="First name" required />
              <Field id="lastName" label="Last name" required />
              <Field id="email" label="Email" type="email" required className="sm:col-span-2" />
              <Field id="phone" label="Phone" type="tel" required className="sm:col-span-2" />
            </div>
          </section>

          {/* Delivery */}
          <section>
            <h2 className="font-serif text-2xl">Delivery Address</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id="address" label="Street address" required className="sm:col-span-2" />
              <Field id="suburb" label="Suburb" required />
              <Field id="city" label="City" required />
              <Field id="province" label="Province" required />
              <Field id="postal" label="Postal code" required />
            </div>
          </section>

          {/* Payment */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl">Payment</h2>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> Secured
              </span>
            </div>
            <div className="mt-5 rounded-sm border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CreditCard className="size-4 text-gold" /> Card / PayFast
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Secure payment processing will be enabled here once your payment
                gateway (such as PayFast) is connected.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field id="card" label="Card number" placeholder="•••• •••• •••• ••••" className="sm:col-span-2" />
                <Field id="expiry" label="Expiry" placeholder="MM / YY" />
                <Field id="cvc" label="CVC" placeholder="•••" />
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-sm border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl">Order Summary</h2>
          <Separator className="my-5" />
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={`${item.product.id}-${item.size ?? ""}`}
                className="flex gap-3 text-sm"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-14 rounded-sm object-cover"
                />
                <div className="flex-1">
                  <p className="leading-tight">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty {item.quantity}
                    {item.size && ` · Size ${item.size}`}
                  </p>
                </div>
                <p>{formatPrice(item.product.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
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
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Button type="submit" variant="gold" size="xl" className="mt-6 w-full">
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
    <div className={className}>
      <Label htmlFor={id} className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5"
      />
    </div>
  );
}
