import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/data/products';
import { cartEnquiryMessage, buildWhatsAppLink } from '@/utils/whatsapp';
import { useNotification } from '@/context/NotificationContext';
import { addOns } from '@/data/site';

export interface CartItem {
  code: string;
  name: string;
  price: number;
  priceLabel?: string;
  quantity: number;
  color?: string;
  giftWrap?: boolean;
  message?: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, opts?: { color?: string; quantity?: number; giftWrap?: boolean; message?: string }) => void;
  removeItem: (code: string) => void;
  updateQuantity: (code: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutWhatsApp: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { showNotification } = useNotification();

  const addItem = useCallback(
    (product: Product, opts?: { color?: string; quantity?: number; giftWrap?: boolean; message?: string }) => {
      const quantity = opts?.quantity ?? 1;
      setItems((prev) => {
        const existing = prev.find((i) => i.code === product.code && i.color === opts?.color);
        if (existing) {
          return prev.map((i) =>
            i.code === product.code && i.color === opts?.color
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [
          ...prev,
          {
            code: product.code,
            name: product.name,
            price: product.price,
            priceLabel: product.priceLabel,
            quantity,
            color: opts?.color,
            giftWrap: opts?.giftWrap,
            message: opts?.message,
          },
        ];
      });
      setIsOpen(true);

      // Intelligent Upselling: Suggest add-ons for flowers/bouquets
      if (product.category === 'flowers' || product.category === 'bouquets') {
        const suggestion = addOns[0]; // Suggest Greeting Card
        showNotification(
          `Complete your ${product.name} with a ${suggestion.name}?`,
          'info',
          'Add Greeting Card',
          () => {
            const addonCode = `ADDON-${suggestion.name.toUpperCase().replace(/\s+/g, '-')}`;
            setItems((prev) => {
              const existing = prev.find((i) => i.code === addonCode);
              if (existing) {
                return prev.map((i) =>
                  i.code === addonCode ? { ...i, quantity: i.quantity + 1 } : i
                );
              }
              return [
                ...prev,
                {
                  code: addonCode,
                  name: suggestion.name,
                  price: suggestion.price,
                  quantity: 1,
                },
              ];
            });
            showNotification(`Added ${suggestion.name} to your bag!`, 'success');
          }
        );
      }
    },
    [showNotification]
  );

  const removeItem = useCallback((code: string) => {
    setItems((prev) => prev.filter((i) => i.code !== code));
  }, []);

  const updateQuantity = useCallback((code: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.code !== code));
    } else {
      setItems((prev) => prev.map((i) => (i.code === code ? { ...i, quantity } : i)));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const checkoutWhatsApp = useCallback(() => {
    const messageItems = items.map((i) => ({
      name: i.name,
      code: i.code,
      price: i.priceLabel || formatPrice(i.price),
      quantity: i.quantity,
    }));
    const link = buildWhatsAppLink(cartEnquiryMessage(messageItems));
    window.open(link, '_blank');
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
        checkoutWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
