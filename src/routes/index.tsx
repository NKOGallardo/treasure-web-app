import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gem, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { products, categories } from "@/data/products";
import heroImg from "@/assets/the-face.jpg";
import atelierImg from "@/assets/the-face.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "oneof1custom — Handmade Bead Jewellery" },
      {
        name: "description",
        content:
          "Explore the oneof1custom collection of hand-wrapped rings, beaded bracelets and unique handmade pieces, crafted for your everyday style.",
      },
      { property: "og:title", content: "oneof1custom — Handmade Bead Jewellery" },
      {
        property: "og:description",
        content: "Handmade bead jewellery crafted with chosen beads in South Africa.",
      },
    ],
  }),
  component: Home,
});

const testimonials = [
  {
    quote:
      "The craftsmanship is extraordinary. My bracelet exceeded every expectation — the colours are like nothing I've ever seen.",
    name: "Naledi M.",
    location: "Cape Town",
  },
  {
    quote:
      "From the first sketch to the final piece, the oneof1custom studio made the whole experience feel deeply personal.",
    name: "James & Priya",
    location: "Johannesburg",
  },
  {
    quote:
      "Impeccable service and a truly timeless bracelet. It has become the piece I reach for every single day.",
    name: "Sophia L.",
    location: "Durban",
  },
];

function Home() {
  const featured = products.slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero__grid">
          <div className="hero__content">
            <div className="hero__inner animate-fade-up">
              <p className="eyebrow gold">Handmade Beads · Est. 2024</p>
              <h1 className="hero__title">
                Timeless pieces for{" "}
                <span className="text-gold-gradient">unforgettable</span> moments
              </h1>
              <p className="hero__lead">
                Hand-wrapped rings and beaded bracelets made with chosen beads, crafted to be as
                unique as you are.
              </p>
              <div className="hero__actions">
                <Button asChild variant="gold" size="xl">
                  <Link to="/shop">Shop Collection</Link>
                </Button>
                <Button asChild variant="outlineLuxe" size="xl" className="btn--on-dark">
                  <Link to="/shop" search={{ sort: "new" }}>
                    View New Arrivals
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="hero__media">
            <img
              src={heroImg}
              alt="Handmade bead jewellery arranged on silk"
              width={1600}
              height={1200}
            />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="trust-bar">
        <div className="container-luxe trust-bar__grid">
          {[
            { icon: Gem, label: "Hand-picked Beads", sub: "Every bead chosen with care" },
            { icon: ShieldCheck, label: "Made with Care", sub: "Hand-wrapped & beaded" },
            { icon: Truck, label: "Free Delivery", sub: "Across South Africa" },
            { icon: Sparkles, label: "Hand-crafted", sub: "Each piece made by hand" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="trust-item">
              <Icon />
              <div>
                <p className="trust-item__label">{label}</p>
                <p className="trust-item__sub">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-luxe section section--lg">
        <div className="section-head section-head--center">
          <p className="eyebrow gold">Explore</p>
          <h2 className="section-head__title">Shop by Category</h2>
        </div>
        <div className="category-grid">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/shop"
              search={{ category: c.name }}
              className="category-card"
            >
              <img src={c.image} alt={c.name} loading="lazy" />
              <div className="category-card__overlay" />
              <div className="category-card__caption">
                <p className="category-card__name">{c.name}</p>
                <p className="category-card__blurb">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-luxe section">
        <div className="section-head section-head--between">
          <div>
            <p className="eyebrow gold">Curated</p>
            <h2 className="section-head__title">Featured Pieces</h2>
          </div>
          <Button asChild variant="link" className="link-desktop">
            <Link to="/shop">
              View all <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Atelier feature */}
      <section className="atelier">
        <div className="container-luxe atelier__inner">
          <img
            src={atelierImg}
            alt="Crafting a hand-wrapped bead ring at the oneof1custom studio"
            loading="lazy"
            className="atelier__img"
          />
          <div>
            <p className="eyebrow gold">The Studio</p>
            <h2 className="atelier__title">Unique pieces, made for your story</h2>
            <p className="atelier__text">
              Work with us to design a one-of-a-kind creation. From choosing the perfect bead to
              the final wrap, every detail is shaped around you.
            </p>
            <Button asChild variant="luxe" size="lg" className="atelier__cta">
              <Link to="/shop">
                Start your custom design
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      {newArrivals.length > 0 && (
        <section className="container-luxe section">
          <div className="section-head section-head--center">
            <p className="eyebrow gold">Just In</p>
            <h2 className="section-head__title">New Arrivals</h2>
          </div>
          <div className="product-grid">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container-luxe">
          <div className="section-head section-head--center">
            <p className="eyebrow gold">Loved By</p>
            <h2 className="section-head__title">Our Clients</h2>
          </div>
          <div className="testimonials__grid">
            {testimonials.map((t) => (
              <figure key={t.name} className="testimonial-card">
                <StarRating rating={5} size="md" />
                <blockquote>"{t.quote}"</blockquote>
                <figcaption>
                  <span className="name">{t.name}</span>
                  <span className="loc"> · {t.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

