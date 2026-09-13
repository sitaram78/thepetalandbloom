import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { products, formatPrice } from '@/data/products';

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const wishlistedProducts = products.filter((p) => items.includes(p.code));

  const handleMoveToCart = (product: any) => {
    addItem(product);
    removeItem(product.code);
  };

  return (
    <div className="bg-parchment-50 min-h-screen">
      <PageHeader
        label="Curated Savings"
        title={<>My Saved Blooms</>}
        subtitle="A personal gallery of your favourite pieces, waiting for the perfect moment."
      />

      <main className="container-lux py-12 lg:py-24">
        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistedProducts.map((product, i) => (
              <Reveal key={product.code} delay={i * 100}>
                <div className="group relative bg-white rounded-sm border border-silk shadow-soft overflow-hidden transition-all duration-500 hover:-translate-y-2">
                  <div className="aspect-[4/5] overflow-hidden bg-silk relative">
                    <Link to={`/product/${product.code}`} className="block w-full h-full">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeItem(product.code);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm text-ink-light hover:text-rose rounded-full transition-colors shadow-sm z-10"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <Link to={`/product/${product.code}`} className="block group/link">
                      <p className="text-[10px] uppercase tracking-widest text-rose font-medium mb-1">
                        {product.code}
                      </p>
                      <h3 className="font-serif text-xl text-ink truncate group-hover/link:text-rose transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between pt-4 border-t border-silk">
                      <span className="font-serif text-lg text-ink">{formatPrice(product.price)}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleMoveToCart(product);
                        }}
                        className="flex items-center gap-2 text-xs font-medium text-ink-light hover:text-rose transition-colors group/btn"
                      >
                        <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
              <div className="w-20 h-20 bg-silk rounded-full flex items-center justify-center text-ink-light/30">
                <Heart size={40} strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <h2 className="heading-serif text-3xl text-ink">Your gallery is empty</h2>
                <p className="text-ink-light max-w-md mx-auto font-light">
                  You haven't saved any botanical pieces yet. Start exploring our collection to find your favourites.
                </p>
              </div>
              <Link
                to="/shop"
                className="btn-primary px-10 py-4"
              >
                Continue Shopping
              </Link>
            </div>
          </Reveal>
        )}
      </main>
    </div>
  );
}
