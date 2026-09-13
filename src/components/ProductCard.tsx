import { Link } from 'react-router-dom';
import { Star, Sparkles, Clock, ArrowRight, Eye, Heart } from 'lucide-react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/data/products';
import { useQuickView } from '@/context/QuickViewContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { openQuickView } = useQuickView();
  const { toggleItem, isWishlisted } = useWishlist();

  return (
    <div className="group block relative">
      <div className="relative overflow-hidden bg-parchment-100 rounded-sm">
        <Link
          to={`/product/${product.code}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-50 rounded-sm"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={product.images?.[0] || 'https://images.pexels.com/photos/20269075/pexels-photo-20269075.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900'}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product.code);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-parchment-50/80 backdrop-blur-sm flex items-center justify-center text-ink-light hover:text-rose transition-all duration-300 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
          aria-label={isWishlisted(product.code) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            fill={isWishlisted(product.code) ? 'currentColor' : 'none'}
            className={isWishlisted(product.code) ? 'text-rose' : ''}
          />
        </button>

        {/* Quick view button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickView(product);
          }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
          aria-label={`Quick view ${product.name}`}
        >
          <span className="bg-parchment-50/95 text-ink text-xs font-medium tracking-wide flex items-center gap-1.5 px-4 py-2 rounded-sm hover:bg-parchment-50 transition-colors">
            <Eye size={14} strokeWidth={1.5} /> Quick view
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="mt-4">
        <Link to={`/product/${product.code}`}>
          <h3 className="font-serif text-lg text-ink leading-tight group-hover:text-rose transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-ink-light mt-1 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-medium text-ink">
            {product.priceLabel || formatPrice(product.price)}
          </span>
          {product.customisable && (
            <span className="text-[10px] text-sage flex items-center gap-1">
              <Sparkles size={10} /> Custom colours
            </span>
          )}
        </div>
        {product.preparationDays && (
          <p className="text-[11px] text-ink-light mt-2 flex items-center gap-1">
            <Clock size={11} strokeWidth={1.5} className="text-ink-light/50" />
            Handcrafted in {product.preparationDays}
          </p>
        )}
      </div>
    </div>
  );
}
