import { useState, useEffect } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle, Check, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import { trackEvent } from '@/utils/analytics';
import Reveal from '@/components/Reveal';

export default function CartDrawer() {
  const {
    items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, totalPrice,
    appliedCoupon, discountAmount, applyCoupon, removeCoupon, checkoutWhatsApp,
  } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  useEffect(() => {
    if (isOpen && totalItems > 0) {
      setJustAdded(true);
      const timer = setTimeout(() => setJustAdded(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, totalItems]);

  const shippingCost = totalPrice >= 1200 ? 0 : totalPrice >= 799 ? 49 : 69;
  const grandTotal = totalPrice - discountAmount + shippingCost;

  const openCheckout = () => {
    setCheckoutMessage('');
    setIsCheckoutOpen(true);
  };

  const handleCheckout = (event: React.FormEvent) => {
    event.preventDefault();
    if (!customerName.trim() || !/^\d{6}$/.test(pinCode.trim())) {
      setCheckoutMessage('Enter your name and a valid 6-digit PIN code.');
      return;
    }
    trackEvent('checkout_started', { total: totalPrice, items: totalItems });
    checkoutWhatsApp({ name: customerName.trim(), pinCode: pinCode.trim(), shipping: shippingCost });
    clearCart();
    setCustomerName('');
    setPinCode('');
    removeCoupon();
    setCouponCode('');
    setCouponMessage('');
    setCheckoutMessage('');
    setIsCheckoutOpen(false);
    closeCart();
  };

  const handleCoupon = async () => {
    const result = await applyCoupon(couponCode);
    setCouponMessage(result.message);
    if (result.success) setCouponCode('');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={closeCart} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md glass-panel shadow-2xl animate-slide-in flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-silk">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} strokeWidth={1.5} className="text-ink-light" />
                <span className="font-serif text-xl font-medium text-ink">Your Collection</span>
                {totalItems > 0 && <span className="text-xs text-ink-light opacity-60">({totalItems})</span>}
              </div>
              <button onClick={closeCart} className="text-ink-light hover:text-ink transition-colors" aria-label="Close cart">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Added confirmation */}
            {justAdded && (
              <div className="px-5 py-3 bg-sage-light border-b border-sage-dark/10 flex items-center gap-2 animate-fade-in">
                <div className="w-6 h-6 rounded-full bg-sage flex items-center justify-center">
                  <Check size={14} className="text-parchment-50" strokeWidth={2.5} />
                </div>
                <p className="text-sm text-sage-dark font-medium">Added to your collection</p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} strokeWidth={1} className="text-silk mb-4" />
                  <p className="font-serif text-xl text-ink mb-2">Your collection is empty</p>
                  <p className="text-sm text-ink-light max-w-xs">
                    Begin your journey by selecting a bloom or designing a custom arrangement.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.code + (item.color || '')} className="flex gap-4 pb-6 border-b border-silk/50">
                      <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded-sm bg-silk/30">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-ink-light/50">No image</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-lg text-ink">{item.name}</h4>
                        <p className="text-[10px] uppercase tracking-wider text-ink-light/50 mt-0.5">{item.code}</p>
                        {item.color && <p className="text-xs text-ink-light mt-1">Colour: <span className="text-ink font-medium">{item.color}</span></p>}
                        {item.giftWrap && <p className="text-xs text-sage-dark mt-1">Gift wrapping included</p>}
                        {item.message && <p className="text-xs text-ink-light mt-1">Message: <span className="italic">"{item.message}"</span></p>}
                        <p className="text-sm font-medium text-rose mt-2">
                          {item.priceLabel || formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-silk bg-parchment-50 rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.code, item.quantity - 1)}
                              className="px-2 py-1 text-ink-light hover:text-ink transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2 text-sm text-ink min-w-[24px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.code, item.quantity + 1)}
                              className="px-2 py-1 text-ink-light hover:text-ink transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.code)}
                            className="text-ink-light hover:text-rose transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with shipping */}
            {items.length > 0 && (
              <div className="border-t border-silk px-5 py-4 space-y-3">
                {/* Shipping breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      className="input-field flex-1 text-sm py-2"
                      aria-label="Coupon code"
                    />
                    <button type="button" onClick={handleCoupon} className="btn-secondary px-3 text-xs">Apply</button>
                  </div>
                  {couponMessage && <p className="text-xs text-rose">{couponMessage}</p>}
                  {appliedCoupon && (
                    <div className="flex justify-between text-xs text-sage-dark">
                      <span>{appliedCoupon.code} ({appliedCoupon.discountPercent}% off)</span>
                      <button type="button" onClick={removeCoupon} className="underline">Remove</button>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-ink-light">Subtotal</span>
                    <span className="text-ink">{formatPrice(totalPrice)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sage-dark">
                      <span>Coupon discount</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-ink-light flex items-center gap-1">
                      <Truck size={12} strokeWidth={1.5} /> Shipping
                    </span>
                    <span className={shippingCost === 0 ? 'text-sage-dark font-medium' : 'text-ink'}>
                      {shippingCost === 0 ? 'COMPLIMENTARY' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-ink-light/60">
                      {totalPrice >= 799 && totalPrice < 1200
                        ? 'Add ₹' + (1200 - totalPrice) + ' more for complimentary shipping'
                        : totalPrice < 799
                        ? 'Add ₹' + (799 - totalPrice) + ' more for reduced shipping'
                        : ''}
                    </p>
                  )}
                  <div className="flex justify-between pt-3 border-t border-silk">
                    <span className="text-sm font-medium text-ink">Estimated total</span>
                    <span className="font-serif text-2xl text-ink">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <button onClick={openCheckout} className="btn-whatsapp w-full py-5 text-base">
                  <MessageCircle size={18} />
                  Order via Gift Concierge
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout details"
          />
          <form
            onSubmit={handleCheckout}
            className="relative z-10 w-full max-w-md bg-linen p-6 sm:p-8 rounded-atelier-panel shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-details-title"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rose mb-2">Almost there</p>
                <h2 id="checkout-details-title" className="font-serif text-3xl text-bark">Your delivery details</h2>
                <p className="text-sm text-ink-light mt-2">Your collection will stay saved until you submit these details.</p>
              </div>
              <button type="button" onClick={() => setIsCheckoutOpen(false)} className="text-ink-light hover:text-ink" aria-label="Close checkout details">
                <X size={22} />
              </button>
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-bark">
                Your name
                <input
                  autoFocus
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="input-field mt-2 w-full"
                />
              </label>
              <label className="block text-sm text-bark">
                PIN code
                <input
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit PIN code"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  className="input-field mt-2 w-full"
                />
              </label>
            </div>
            {checkoutMessage && <p className="text-sm text-rose mt-4">{checkoutMessage}</p>}
            <button type="submit" className="btn-whatsapp w-full py-4 mt-6 text-base">
              <MessageCircle size={18} /> Continue to WhatsApp
            </button>
          </form>
        </div>
      )}
    </>
  );
}
