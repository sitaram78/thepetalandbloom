import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Search, MessageCircle, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { buildWhatsAppLink, generalEnquiryMessage } from '@/utils/whatsapp';

export default function MobileBottomNav() {
  const location = useLocation();
  const { totalItems, openCart } = useCart();
  const { count } = useWishlist();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-cream-50/95 backdrop-blur-md border-t border-cream-300">
      <div className="flex items-center justify-around h-14">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
            isActive('/') ? 'text-terracotta-600' : 'text-brown-500'
          }`}
          aria-label="Home"
        >
          <Home size={20} strokeWidth={1.5} />
          <span className="text-[9px] font-medium">Home</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
            isActive('/shop') ? 'text-terracotta-600' : 'text-brown-500'
          }`}
          aria-label="Shop"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span className="text-[9px] font-medium">Shop</span>
        </Link>

        <Link
          to="/gift-finder"
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
            isActive('/gift-finder') ? 'text-terracotta-600' : 'text-brown-500'
          }`}
          aria-label="Gift Finder"
        >
          <Search size={20} strokeWidth={1.5} />
          <span className="text-[9px] font-medium">Find</span>
        </Link>

        <button
          onClick={openCart}
          className="relative flex flex-col items-center justify-center gap-0.5 w-16 h-full text-brown-500"
          aria-label={`Bag with ${totalItems} items`}
        >
          <div className="relative">
            <Heart size={20} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-terracotta-500 text-cream-50 text-[8px] font-medium w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <span className="text-[9px] font-medium">Saved</span>
        </button>

        <a
          href={buildWhatsAppLink(generalEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 w-16 h-full text-sage-600"
          aria-label="Order on WhatsApp"
        >
          <MessageCircle size={20} strokeWidth={1.5} />
          <span className="text-[9px] font-medium">Order</span>
        </a>
      </div>
    </nav>
  );
}
