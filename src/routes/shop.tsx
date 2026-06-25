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

const PRICE_CEILING = 1000;

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: (search.category as ShopSearch["category"]) || undefined,
    q: (search.q as string) || undefined,
    sort: (search.sort as SortKey) || undefined,
    maxPrice: search.maxPrice ? Number(search.maxPrice) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Handmade Bead Jewellery — oneof1custom" },
      {
        name: "description",
        content:
          "Browse the full oneof1custom collection of hand-wrapped rings, beaded bracelets and unique jewellery pieces. Filter by category, price and style.",
      },
      { property: "og:title", content: "Shop Handmade Bead Jewellery — oneof1custom" },
      {
        property: "og:description",
        content: "Browse hand-wrapped rings, beaded bracelets and unique jewellery pieces.",
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
    navigate({ search: (prev: ShopSearch) => ({ ...prev, ...patch }) });

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
    <div className="container-luxe page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb__sep">/</span>
        <span className="breadcrumb__current">Shop</span>
      </nav>

      <header className="shop__header">
        <h1 className="page__title">
          {activeCategory === "All" ? "All Pieces" : activeCategory}
        </h1>
        {search.q && <p className="filter-note">Results for "{search.q}"</p>}
      </header>

      <div className="shop__layout">
        {/* Filters */}
        <aside className="filters">
          <div>
            <p className="eyebrow filter-group__title">
              <SlidersHorizontal /> Category
            </p>
            <ul className="category-list">
              {categoryOptions.map((c) => (
                <li key={c}>
                  <button
                    onClick={() =>
                      setSearch({ category: c === "All" ? undefined : (c as Category) })
                    }
                    className={`category-btn${activeCategory === c ? " is-active" : ""}`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow filter-group__title">Max Price</p>
            <Slider
              value={[maxPrice]}
              min={50}
              max={PRICE_CEILING}
              step={1}
              onValueChange={([v]) => setSearch({ maxPrice: v })}
            />
            <p className="filter-note">
              Up to <strong>{formatPrice(maxPrice)}</strong>
            </p>
          </div>

          <Button
            variant="outlineLuxe"
            size="sm"
            className="btn--block"
            onClick={() => navigate({ search: {} })}
          >
            Clear filters
          </Button>
        </aside>

        {/* Grid */}
        <div>
          <div className="shop__toolbar">
            <p className="muted shop__count">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
            <Select value={sort} onValueChange={(v) => setSearch({ sort: v as SortKey })}>
              <SelectTrigger className="select-w">
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
            <div className="empty-state">
              <p className="empty-state__title">No pieces found</p>
              <p className="filter-note">
                Try adjusting your filters or browse the full collection.
              </p>
              <Button
                variant="luxe"
                className="mt-lg"
                onClick={() => navigate({ search: {} })}
              >
                View all jewellery
              </Button>
            </div>
          ) : (
            <div className="product-grid product-grid--3">
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

