import { useState, useEffect } from 'react';
import { X, ShoppingBag, Clock, Sparkles, Check, Heart } from 'lucide-react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import WhatsAppButton from '@/components/WhatsAppButton';
import { productOrderMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { Link } from 'react-router-dom';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedColor('');
      setQuantity(1);
      trackEvent('quick_view', { code: product.code });
    }
  }, [product]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, { color: selectedColor || undefined, quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative bg-ink rounded-sm shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-up text-parchment-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Close quick view"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="grid sm:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-[4/5] sm:aspect-auto overflow-hidden bg-cream-100">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="p-6 lg:p-8 flex flex-col">
            <div className="flex items-start justify-start gap-3 mb-2">
              <p className="text-xs uppercase tracking-[0.15em] text-parchment-100 font-medium">{product.code}</p>
              <button
                onClick={() => toggleItem(product.code)}
                className="text-parchment-100/60 hover:text-rose transition-colors"
                aria-label={isWishlisted(product.code) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={20}
                  strokeWidth={1.5}
                  fill={isWishlisted(product.code) ? 'currentColor' : 'none'}
                  className={isWishlisted(product.code) ? 'text-rose' : ''}
                />
              </button>
            </div>

            <h2 className="font-serif text-2xl lg:text-3xl text-white mb-2">{product.name}</h2>
            <p className="text-sm text-parchment-100 leading-relaxed mb-4">{product.description}</p>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="font-serif text-2xl text-white">
                {product.priceLabel || formatPrice(product.price)}
              </span>
              {product.customisable && (
                <span className="text-[10px] text-sage-200 font-medium flex items-center gap-1 bg-sage-900/30 px-2 py-1 rounded-sm">
                  <Sparkles size={10} /> Custom colours
                </span>
              )}
              {product.preparationDays && (
                <span className="text-[10px] text-brown-300 font-medium flex items-center gap-1 bg-white/10 px-2 py-1 rounded-sm">
                  <Clock size={10} strokeWidth={1.5} /> Made in {product.preparationDays}
                </span>
              )}
            </div>

            {/* Colours */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-parchment-100 mb-2">Colours</label>
                <div className="flex flex-wrap gap-1.5">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-sm border transition-all ${
                        selectedColor === color
                          ? 'bg-white text-ink border-white'
                          : 'bg-white/10 text-parchment-50 border-white/20 hover:border-sage-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-parchment-100 mb-2">Quantity</label>
              <div className="flex items-center border border-white/20 rounded-sm w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-parchment-50 hover:text-white"
                  aria-label="Decrease quantity"
                >−</button>
                <span className="px-3 text-sm text-parchment-50 font-medium min-w-[36px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-parchment-50 hover:text-white"
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 mt-auto">
              <button onClick={handleAddToCart} className="bg-parchment-50 text-ink hover:bg-parchment-100 transition-colors w-full py-4 px-6 rounded-sm font-medium flex items-center justify-center gap-2 shadow-soft">
                <ShoppingBag size={16} />
                Add to enquiry
              </button>
              <div className="flex gap-2">
                <WhatsAppButton
                  message={productOrderMessage(product)}
                  label="WhatsApp"
                  className="flex-1"
                />
                <Link
                  to={`/product/${product.code}`}
                  onClick={onClose}
                  className="btn-secondary flex-1 text-center bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
