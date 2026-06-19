import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gem, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { products, categories } from "@/data/products";
import heroImg from "@/assets/hero.jpg";
import atelierImg from "@/assets/atelier.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURÉLIE — Fine Jewellery Handcrafted in South Africa" },
      {
        name: "description",
        content:
          "Explore AURÉLIE's collection of ethically sourced diamond rings, necklaces, earrings and bespoke fine jewellery, handcrafted for life's most precious moments.",
      },
      { property: "og:title", content: "AURÉLIE — Fine Jewellery" },
      {
        property: "og:description",
        content: "Ethically sourced diamond jewellery, handcrafted in South Africa.",
      },
    ],
  }),
  component: Home,
});

const testimonials = [
  {
    quote:
      "The craftsmanship is extraordinary. My engagement ring exceeded every expectation — it sparkles like nothing I've ever seen.",
    name: "Naledi M.",
    location: "Cape Town",
  },
  {
    quote:
      "From the first sketch to the final piece, the AURÉLIE atelier made the whole experience feel deeply personal and luxurious.",
    name: "James & Priya",
    location: "Johannesburg",
  },
  {
    quote:
      "Impeccable service and a truly timeless necklace. It has become the piece I reach for every single day.",
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
      <section className="relative overflow-hidden">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="flex items-center bg-[image:var(--gradient-dark)] px-6 py-20 text-primary-foreground md:px-12 lg:py-32">
            <div className="max-w-lg animate-fade-up">
              <p className="eyebrow text-gold">Fine Jewellery · Est. 2024</p>
              <h1 className="mt-5 font-serif text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
                Timeless pieces for{" "}
                <span className="text-gold-gradient">unforgettable</span> moments
              </h1>
              <p className="mt-6 max-w-md text-base text-primary-foreground/70">
                Ethically sourced diamonds and 18K gold, handcrafted by master
                jewellers into heirlooms made to last generations.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild variant="gold" size="xl">
                  <Link to="/shop">Shop Collection</Link>
                </Button>
                <Button asChild variant="outlineLuxe" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/shop" search={{ sort: "new" }}>
                    View New Arrivals
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-full">
            <img
              src={heroImg}
              alt="Gold diamond jewellery arranged on silk"
              width={1600}
              height={1200}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-card">
        <div className="container-luxe grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            { icon: Gem, label: "Ethically Sourced", sub: "Conflict-free diamonds" },
            { icon: ShieldCheck, label: "Lifetime Warranty", sub: "On every piece" },
            { icon: Truck, label: "Insured Delivery", sub: "Free across SA" },
            { icon: Sparkles, label: "Master Crafted", sub: "By hand in our atelier" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="size-6 shrink-0 text-gold" />
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-luxe py-20">
        <div className="mb-10 text-center">
          <p className="eyebrow text-gold">Explore</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/shop"
              search={{ category: c.name }}
              className="group relative overflow-hidden rounded-sm"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.15_0.01_60/0.75),transparent_60%)]" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-primary-foreground">
                <p className="font-serif text-lg">{c.name}</p>
                <p className="text-[11px] text-primary-foreground/70">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-luxe py-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow text-gold">Curated</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Featured Pieces</h2>
          </div>
          <Button asChild variant="link" className="hidden px-0 md:inline-flex">
            <Link to="/shop">
              View all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Atelier feature */}
      <section className="relative my-20 overflow-hidden">
        <div className="container-luxe grid items-center gap-10 rounded-sm bg-card p-6 shadow-[var(--shadow-card)] md:grid-cols-2 md:p-12">
          <img
            src={atelierImg}
            alt="A jeweller crafting a gold ring in the AURÉLIE atelier"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-sm object-cover"
          />
          <div>
            <p className="eyebrow text-gold">The Atelier</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
              Bespoke pieces, made for your story
            </h2>
            <p className="mt-5 text-muted-foreground">
              Work hand-in-hand with our master jewellers to design a one-of-a-kind
              creation. From selecting the perfect certified diamond to the final
              polish, every detail is shaped around you.
            </p>
            <Button asChild variant="luxe" size="lg" className="mt-7">
              <Link to="/shop" search={{ category: "Custom" }}>
                Start your custom design
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      {newArrivals.length > 0 && (
        <section className="container-luxe py-12">
          <div className="mb-10 text-center">
            <p className="eyebrow text-gold">Just In</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="bg-[image:var(--gradient-dark)] py-20 text-primary-foreground">
        <div className="container-luxe">
          <div className="mb-12 text-center">
            <p className="eyebrow text-gold">Loved By</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Our Clients</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-sm border border-primary-foreground/10 bg-primary-foreground/5 p-8"
              >
                <StarRating rating={5} size="md" />
                <blockquote className="mt-4 font-serif text-lg leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-primary-foreground/60"> · {t.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
