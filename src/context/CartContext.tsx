import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/data/products';
import { cartEnquiryMessage, buildWhatsAppLink } from '@/utils/whatsapp';
import { useNotification } from '@/context/NotificationContext';
import { addOns } from '@/data/site';
import { supabase } from '@/lib/supabaseClient';

export interface AppliedCoupon {
  code: string;
  discountPercent: number;
  recipientName: string;
}

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
  appliedCoupon: AppliedCoupon | null;
  discountAmount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  checkoutWhatsApp: (details: { name: string; pinCode: string; shipping: number }) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = 'tpb-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage failures and keep the in-memory cart working.
    }
  }, [items]);

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
  const discountAmount = appliedCoupon ? Math.round((totalPrice * appliedCoupon.discountPercent) / 100) : 0;

  const applyCoupon = useCallback(async (code: string) => {
    const normalizedCode = code.trim().toUpperCase();
    if (!normalizedCode) return { success: false, message: 'Enter a coupon code.' };

    const { data, error } = await supabase
      .from('coupons')
      .select('code, recipient_name, discount_percent, expires_at, usage_limit, usage_count')
      .eq('code', normalizedCode)
      .eq('active', true)
      .maybeSingle();

    if (error || !data) return { success: false, message: 'That coupon is not valid.' };
    if (data.expires_at && new Date(data.expires_at) <= new Date()) return { success: false, message: 'That coupon has expired.' };
    if (data.usage_limit !== null && data.usage_count >= data.usage_limit) return { success: false, message: 'That coupon has reached its usage limit.' };

    const { error: usageError } = await supabase
      .from('coupons')
      .update({ usage_count: data.usage_count + 1 })
      .eq('code', normalizedCode)
      .eq('usage_count', data.usage_count);
    if (usageError) return { success: false, message: 'That coupon could not be applied.' };

    setAppliedCoupon({ code: data.code, discountPercent: Number(data.discount_percent), recipientName: data.recipient_name });
    return { success: true, message: `${data.discount_percent}% discount applied.` };
  }, []);

  const removeCoupon = useCallback(() => setAppliedCoupon(null), []);

  const checkoutWhatsApp = useCallback((details: { name: string; pinCode: string; shipping: number }) => {
    const messageItems = items.map((i) => ({
      name: i.name,
      code: i.code,
      price: i.priceLabel || formatPrice(i.price),
      quantity: i.quantity,
    }));
    const link = buildWhatsAppLink(cartEnquiryMessage(messageItems, {
      ...details,
      subtotal: totalPrice,
      discount: discountAmount,
      total: totalPrice - discountAmount + details.shipping,
      couponCode: appliedCoupon?.code,
    }));
    window.open(link, '_blank');
  }, [items, totalPrice, discountAmount, appliedCoupon]);

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
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
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
