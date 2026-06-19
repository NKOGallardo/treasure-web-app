import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, categories, formatPrice, type Category } from "@/data/products";

type SortKey = "featured" | "new" | "price-asc" | "price-desc" | "popular";

interface ShopSearch {
  category?: Category | "All";
  q?: string;
  sort?: SortKey;
  maxPrice?: number;
}

const PRICE_CEILING = 35000;

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: (search.category as ShopSearch["category"]) || undefined,
    q: (search.q as string) || undefined,
    sort: (search.sort as SortKey) || undefined,
    maxPrice: search.maxPrice ? Number(search.maxPrice) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Fine Jewellery — AURÉLIE" },
      {
        name: "description",
        content:
          "Browse the full AURÉLIE collection of diamond rings, necklaces, earrings, bracelets, watches and bespoke jewellery. Filter by category, price and style.",
      },
      { property: "og:title", content: "Shop Fine Jewellery — AURÉLIE" },
      {
        property: "og:description",
        content: "Browse diamond rings, necklaces, earrings and bespoke jewellery.",
      },
    ],
  }),
  component: Shop,
});

const sortLabels: Record<SortKey, string> = {
  featured: "Featured",
  new: "New Arrivals",
  popular: "Most Popular",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
};

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const activeCategory = search.category ?? "All";
  const sort = search.sort ?? "featured";
  const maxPrice = search.maxPrice ?? PRICE_CEILING;

  const setSearch = (patch: Partial<ShopSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q),
      );
    }
    list = list.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "new":
        list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      case "popular":
        list.sort((a, b) => b.popularity - a.popularity);
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
    }
    return list;
  }, [activeCategory, search.q, sort, maxPrice]);

  const categoryOptions: (Category | "All")[] = [
    "All",
    ...categories.map((c) => c.name),
  ];

  return (
    <div className="container-luxe py-12">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Shop</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl">
          {activeCategory === "All" ? "All Jewellery" : activeCategory}
        </h1>
        {search.q && (
          <p className="mt-2 text-sm text-muted-foreground">
            Results for "{search.q}"
          </p>
        )}
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className="space-y-8">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-2 text-muted-foreground">
              <SlidersHorizontal className="size-3.5" /> Category
            </p>
            <ul className="space-y-1">
              {categoryOptions.map((c) => (
                <li key={c}>
                  <button
                    onClick={() =>
                      setSearch({ category: c === "All" ? undefined : (c as Category) })
                    }
                    className={`w-full rounded-sm px-3 py-2 text-left text-sm transition-colors ${
                      activeCategory === c
                        ? "bg-foreground text-background"
                        : "hover:bg-accent"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-muted-foreground">Max Price</p>
            <Slider
              value={[maxPrice]}
              min={5000}
              max={PRICE_CEILING}
              step={1000}
              onValueChange={([v]) => setSearch({ maxPrice: v })}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              Up to <span className="text-foreground">{formatPrice(maxPrice)}</span>
            </p>
          </div>

          <Button
            variant="outlineLuxe"
            size="sm"
            className="w-full"
            onClick={() =>
              navigate({ search: {} })
            }
          >
            Clear filters
          </Button>
        </aside>

        {/* Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
            <Select value={sort} onValueChange={(v) => setSearch({ sort: v as SortKey })}>
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                  <SelectItem key={k} value={k}>
                    {sortLabels[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border py-24 text-center">
              <p className="font-serif text-2xl">No pieces found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your filters or browse the full collection.
              </p>
              <Button
                variant="luxe"
                className="mt-6"
                onClick={() => navigate({ search: {} })}
              >
                View all jewellery
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
