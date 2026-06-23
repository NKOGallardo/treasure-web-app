import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  subtotal: number;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const lineKey = (id: string, size?: string) => `${id}__${size ?? ""}`;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("oneof1custom-cart") ?? "[]");
      const storedWish = JSON.parse(localStorage.getItem("oneof1custom-wishlist") ?? "[]");
      if (Array.isArray(storedCart)) {
        // rehydrate product references from current catalogue
        const rebuilt: CartItem[] = storedCart
          .map((item: { id: string; quantity: number; size?: string }) => {
            const product = products.find((p) => p.id === item.id);
            return product ? { product, quantity: item.quantity, size: item.size } : null;
          })
          .filter(Boolean) as CartItem[];
        setCart(rebuilt);
      }
      if (Array.isArray(storedWish)) setWishlist(storedWish);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      "oneof1custom-cart",
      JSON.stringify(
        cart.map((i) => ({ id: i.product.id, quantity: i.quantity, size: i.size })),
      ),
    );
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("oneof1custom-wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<StoreContextValue>(() => {
    const addToCart: StoreContextValue["addToCart"] = (product, quantity = 1, size) => {
      setCart((prev) => {
        const key = lineKey(product.id, size);
        const existing = prev.find((i) => lineKey(i.product.id, i.size) === key);
        if (existing) {
          return prev.map((i) =>
            lineKey(i.product.id, i.size) === key
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { product, quantity, size }];
      });
    };

    const removeFromCart: StoreContextValue["removeFromCart"] = (productId, size) => {
      const key = lineKey(productId, size);
      setCart((prev) => prev.filter((i) => lineKey(i.product.id, i.size) !== key));
    };

    const updateQuantity: StoreContextValue["updateQuantity"] = (productId, quantity, size) => {
      if (quantity < 1) return;
      const key = lineKey(productId, size);
      setCart((prev) =>
        prev.map((i) =>
          lineKey(i.product.id, i.size) === key ? { ...i, quantity } : i,
        ),
      );
    };

    const toggleWishlist: StoreContextValue["toggleWishlist"] = (productId) => {
      setWishlist((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );
    };

    return {
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart: () => setCart([]),
      toggleWishlist,
      isWishlisted: (id) => wishlist.includes(id),
      cartCount: cart.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    };
  }, [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
