import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '../../services/catalogService';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, selectedOption?: string) => void;
  removeItem: (productId: string, selectedOption?: string) => void;
  updateQuantity: (productId: string, delta: number, selectedOption?: string) => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'lug_and_lever_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  // 1. Initialize state directly from localStorage if present
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to load cart from storage:', err);
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  // 2. Synchronize state to localStorage on every item modification
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart to storage:', err);
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (product: Product, selectedOption?: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedOption === selectedOption
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prev, { product, quantity: 1, selectedOption }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, selectedOption?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedOption === selectedOption))
    );
  };

  const updateQuantity = (productId: string, delta: number, selectedOption?: string) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedOption === selectedOption) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}