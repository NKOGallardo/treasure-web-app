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
    toast.success("Welcome to oneof1custom", {
      description: "You're on the list for private previews and new arrivals.",
    });
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="container-luxe footer__grid">
        <div>
          <h3 className="footer__brand-title">oneof1custom</h3>
          <p className="footer__lead">
            Fine jewellery handcrafted for life's most precious moments. Ethically sourced, made
            to last generations.
          </p>
          <div className="footer__socials">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="social-link">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow footer__heading">Collections</p>
          <ul className="footer__list">
            {categories.map((c) => (
              <li key={c.name}>
                <Link to="/shop" search={{ category: c.name }}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow footer__heading">Contact</p>
          <ul className="footer__list footer__list--contact">
            <li className="footer__contact-item footer__contact-item--top">
              <MapPin />
              42 Diamond Walk, Sandton City, Johannesburg
            </li>
            <li className="footer__contact-item">
              <Phone /> +27 11 555 0142
            </li>
            <li className="footer__contact-item">
              <Mail /> hello@aurelie.co.za
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow footer__heading">Private Previews</p>
          <p className="footer__note">Subscribe for early access to new collections.</p>
          <form onSubmit={subscribe} className="footer__form">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="footer__input"
            />
            <Button type="submit" variant="gold">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container-luxe footer__bottom-inner">
          <p>© {new Date().getFullYear()} oneof1custom Fine Jewellery. All rights reserved.</p>
          <p>Crafted in South Africa · Secure checkout</p>
        </div>
      </div>
    </footer>
  );
}
