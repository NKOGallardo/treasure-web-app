import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function FloatingCart() {
  const { cartCount } = useStore();

  return (
    <Link to="/cart" className="floating-cart" aria-label="View cart">
      <ShoppingBag />
      {cartCount > 0 && <span className="floating-cart__count">{cartCount}</span>}
    </Link>
  );
}
