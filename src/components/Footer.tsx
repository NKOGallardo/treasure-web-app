import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/products";

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to AURÉLIE", {
      description: "You're on the list for private previews and new arrivals.",
    });
    setEmail("");
  };

  return (
    <footer className="mt-24 border-t border-border bg-[image:var(--gradient-dark)] text-primary-foreground">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <h3 className="font-serif text-3xl tracking-[0.25em]">AURÉLIE</h3>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Fine jewellery handcrafted for life's most precious moments. Ethically
            sourced, made to last generations.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-gold hover:text-gold-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4 text-gold">Collections</p>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {categories.map((c) => (
              <li key={c.name}>
                <Link
                  to="/shop"
                  search={{ category: c.name }}
                  className="transition-colors hover:text-gold"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-gold">Contact</p>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              42 Diamond Walk, Sandton City, Johannesburg
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" /> +27 11 555 0142
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" /> hello@aurelie.co.za
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-gold">Private Previews</p>
          <p className="mb-4 text-sm text-primary-foreground/70">
            Subscribe for early access to new collections.
          </p>
          <form onSubmit={subscribe} className="flex flex-col gap-3">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
            />
            <Button type="submit" variant="gold">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-6">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 text-xs text-primary-foreground/50 md:flex-row">
          <p>© {new Date().getFullYear()} AURÉLIE Fine Jewellery. All rights reserved.</p>
          <p>Crafted in South Africa · Secure checkout</p>
        </div>
      </div>
    </footer>
  );
}
