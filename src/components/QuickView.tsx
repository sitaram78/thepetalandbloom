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
      <div className="absolute inset-0 bg-brown-800/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative bg-cream-50 rounded-sm shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-brown-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400"
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
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-xs uppercase tracking-[0.15em] text-terracotta-400">{product.code}</p>
              <button
                onClick={() => toggleItem(product.code)}
                className="text-brown-400 hover:text-terracotta-500 transition-colors"
                aria-label={isWishlisted(product.code) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={20}
                  strokeWidth={1.5}
                  fill={isWishlisted(product.code) ? 'currentColor' : 'none'}
                  className={isWishlisted(product.code) ? 'text-terracotta-500' : ''}
                />
              </button>
            </div>

            <h2 className="font-serif text-2xl lg:text-3xl text-brown-800 mb-2">{product.name}</h2>
            <p className="text-sm text-brown-500 leading-relaxed mb-4">{product.description}</p>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="font-serif text-2xl text-brown-800">
                {product.priceLabel || formatPrice(product.price)}
              </span>
              {product.customisable && (
                <span className="text-[10px] text-sage-600 flex items-center gap-1 bg-sage-100 px-2 py-1 rounded-sm">
                  <Sparkles size={10} /> Custom colours
                </span>
              )}
              {product.preparationDays && (
                <span className="text-[10px] text-brown-400 flex items-center gap-1 bg-cream-100 px-2 py-1 rounded-sm">
                  <Clock size={10} strokeWidth={1.5} /> Made in {product.preparationDays}
                </span>
              )}
            </div>

            {/* Colours */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-medium text-brown-600 mb-2">Colours</label>
                <div className="flex flex-wrap gap-1.5">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-sm border transition-all ${
                        selectedColor === color
                          ? 'bg-brown-700 text-cream-50 border-brown-700'
                          : 'bg-cream-100 text-brown-600 border-cream-300 hover:border-sage-400'
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
              <label className="block text-xs font-medium text-brown-600 mb-2">Quantity</label>
              <div className="flex items-center border border-cream-400 rounded-sm w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-brown-600 hover:text-brown-800"
                  aria-label="Decrease quantity"
                >−</button>
                <span className="px-3 text-sm text-brown-700 min-w-[36px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-brown-600 hover:text-brown-800"
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 mt-auto">
              <button onClick={handleAddToCart} className="btn-primary w-full">
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
                  className="btn-secondary flex-1 text-center"
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
