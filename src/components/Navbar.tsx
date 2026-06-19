import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/context/StoreContext";
import { useTheme } from "@/lib/theme";
import { categories } from "@/data/products";

const navItemClass =
  "relative text-xs uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-foreground";
const mobileItemClass =
  "rounded-md px-3 py-3 text-sm uppercase tracking-[0.12em] transition-colors hover:bg-accent";

export function Navbar() {
  const { cartCount, wishlist } = useStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: query || undefined } });
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-luxe flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-serif text-2xl tracking-[0.2em]">
                AURÉLIE
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1 px-1">
              <Link to="/" className={mobileItemClass}>
                Home
              </Link>
              <Link to="/shop" className={mobileItemClass}>
                Shop
              </Link>
              <Link to="/shop" search={{ category: "Custom" }} className={mobileItemClass}>
                Custom
              </Link>
              <Link to="/wishlist" className={mobileItemClass}>
                Wishlist
              </Link>
              <div className="mt-4 border-t border-border pt-4">
                <p className="eyebrow mb-2 px-3 text-muted-foreground">Collections</p>
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    to="/shop"
                    search={{ category: c.name }}
                    className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          to="/"
          className="font-serif text-2xl font-medium tracking-[0.25em] md:text-3xl"
        >
          AURÉLIE
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className={navItemClass} activeProps={{ className: "text-foreground" }}>
            Home
          </Link>
          <Link to="/shop" className={navItemClass} activeProps={{ className: "text-foreground" }}>
            Shop
          </Link>
          <Link
            to="/shop"
            search={{ category: "Custom" }}
            className={navItemClass}
          >
            Custom
          </Link>
          <Link
            to="/wishlist"
            className={navItemClass}
            activeProps={{ className: "text-foreground" }}
          >
            Wishlist
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
            <Link to="/wishlist" className="relative">
              <Heart />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-gold-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Cart">
            <Link to="/cart" className="relative">
              <ShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-gold-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border/60 bg-background/95 py-3 animate-fade-up">
          <form onSubmit={submitSearch} className="container-luxe flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rings, necklaces, diamonds…"
              className="border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
            />
            <Button variant="ghost" size="icon" type="button" onClick={() => setSearchOpen(false)}>
              <X />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
