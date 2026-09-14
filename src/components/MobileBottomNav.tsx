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
    <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-linen/95 backdrop-blur-md border-t border-canvas-line">
      <div className="flex items-center justify-around h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${
            isActive('/') ? 'text-rose-deep' : 'text-ink-light'
          }`}
          aria-label="Home"
        >
          <Home size={20} strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${
            isActive('/shop') ? 'text-rose-deep' : 'text-ink-light'
          }`}
          aria-label="Shop"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Shop</span>
        </Link>

        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${
            isActive('/wishlist') ? 'text-rose-deep' : 'text-ink-light'
          }`}
          aria-label={`Wishlist with ${count} items`}
        >
          <div className="relative">
            <Heart size={20} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose text-linen text-[8px] font-medium w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Saved</span>
        </Link>

        <button
          onClick={openCart}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${
            totalItems > 0 ? 'text-rose-deep' : 'text-ink-light'
          }`}
          aria-label={`Bag with ${totalItems} items`}
        >
          <div className="relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-bark text-linen text-[8px] font-medium w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Bag</span>
        </button>

        <a
          href={buildWhatsAppLink(generalEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 w-16 h-full text-moss"
          aria-label="Order on WhatsApp"
        >
          <MessageCircle size={20} strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Order</span>
        </a>
      </div>
    </nav>
  );
}
