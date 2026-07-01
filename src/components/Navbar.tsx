import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, Heart, Search, Menu, X, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartDrawer } from "@/components/CartDrawer";
import { useStore } from "@/context/StoreContext";
import { useTheme } from "@/lib/theme";
import { categories } from "@/data/products";

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
    <header className="navbar">
      <div className="container-luxe navbar__inner">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="menu-trigger">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sheet-width">
            <SheetHeader>
              <SheetTitle className="serif sheet-brand-title">
                oneof1custom
              </SheetTitle>
            </SheetHeader>
            <nav className="sheet-nav">
              <Link to="/" className="mobile-item">
                Home
              </Link>
              <Link to="/shop" className="mobile-item">
                Shop
              </Link>
              <Link to="/shop" search={{ category: "Bracelets" }} className="mobile-item">
                Bracelets
              </Link>
              <Link to="/wishlist" className="mobile-item">
                Wishlist
              </Link>
              <div className="sheet-nav__group">
                <p className="eyebrow muted sheet-nav__label">
                  Collections
                </p>
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    to="/shop"
                    search={{ category: c.name }}
                    className="sheet-nav__sub"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="navbar__brand">
          oneof1custom
        </Link>

        <nav className="navbar__nav">
          <Link to="/" className="nav-link" activeProps={{ className: "nav-link is-active" }}>
            Home
          </Link>
          <Link to="/shop" className="nav-link" activeProps={{ className: "nav-link is-active" }}>
            Shop
          </Link>
          <Link to="/shop" search={{ category: "Bracelets" }} className="nav-link">
            Bracelets
          </Link>
          <Link
            to="/wishlist"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            Wishlist
          </Link>
        </nav>

        <div className="navbar__actions">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
            <Link to="/wishlist" className="icon-link">
              <Heart />
              {wishlist.length > 0 && <span className="count-bubble">{wishlist.length}</span>}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Cart">
            <Link to="/cart" className="icon-link">
              <ShoppingBag />
              {cartCount > 0 && <span className="count-bubble">{cartCount}</span>}
            </Link>
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar__search animate-fade-up">
          <form onSubmit={submitSearch} className="container-luxe search-form">
            <Search className="muted icon-sm" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rings, bracelets, beads…"
              className="input--bare"
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
