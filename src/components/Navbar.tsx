import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, MessageCircle, Menu, X, XCircle, Heart } from 'lucide-react';
import { brandInfo } from '@/data/site';
import { products, formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { buildWhatsAppLink, generalEnquiryMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { supabase } from '@/lib/supabaseClient';


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [navLinks, setNavLinks] = useState<{ label: string; path: string }[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchNav() {
      const { data, error } = await supabase
        .from('navigation_links')
        .select('label, path')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setNavLinks(data);
      }
    }
    fetchNav();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    
    // Check for budget queries like "under 500"
    const budgetMatch = q.match(/under\s*(\d+)/);
    if (budgetMatch) {
      const max = parseInt(budgetMatch[1], 10);
      return products.filter((p) => p.price <= max).slice(0, 6);
    }
    if (q.includes('premium') || q.includes('2000') || q.includes('expensive')) {
      return products.filter((p) => p.price >= 2000).slice(0, 6);
    }

    return products
      .filter((p) => {
        const haystack = [
          p.name, p.description, p.code, p.category,
          ...(p.occasions || []),
          ...(p.colors || []),
          formatPrice(p.price),
        ].join(' ').toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackEvent('search', { query: searchQuery.trim() });
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-panel shadow-sm'
            : 'bg-parchment-50/40 backdrop-blur-sm'
        }`}
      >
        <nav className="container-lux flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3" aria-label="The Petal & Bloom home">
            <img src="/logo.jpeg" alt="The Petal & Bloom Logo" className="w-10 h-10 rounded-full object-cover shadow-sm border border-silk" />
            <span className="font-serif text-lg lg:text-xl font-medium tracking-wide text-ink leading-tight hidden sm:inline">
              THE PETAL<span className="text-rose"> &amp; </span>BLOOM
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 link-underline ${
                  isActive(link.path) ? 'text-rose' : 'text-ink-light hover:text-rose'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-ink-light hover:text-rose transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-50 rounded-sm"
              aria-label="Search products"
              aria-expanded={searchOpen}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link
              to="/wishlist"
              className="relative text-ink-light hover:text-rose transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-50 rounded-sm hidden sm:block"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-ink text-parchment-50 text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              className="relative text-ink-light hover:text-rose transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-50 rounded-sm"
              aria-label={`Cart with ${totalItems} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose text-parchment-50 text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
<a
              href={buildWhatsAppLink(generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-whatsapp !py-2.5 !px-5"
            >
              <MessageCircle size={16} />
              Gift Concierge
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-ink-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400 rounded-sm"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        {/* Search bar with live results */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 glass-panel border-t border-silk shadow-xl animate-fade-in">
            <div className="container-lux py-6">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a bloom, an occasion, or a mood..."
                    className="w-full bg-transparent border-b border-silk pb-3 pr-8 text-ink placeholder-ink/30 focus:outline-none focus:border-rose font-serif text-xl transition-colors duration-300"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-0 top-1 text-ink-light/50 hover:text-ink transition-colors"
                      aria-label="Clear search"
                    >
                      <XCircle size={20} />
                    </button>
                  )}
                </div>
              </form>

              {/* Live results */}
              {searchResults.length > 0 && (
                <div className="mt-4 space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-brown-400 mb-2">Products</p>
                  {searchResults.map((product) => (
                    <Link
                      key={product.code}
                      to={`/product/${product.code}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      className="flex items-center gap-3 p-2 rounded-sm hover:bg-cream-100 transition-colors"
                    >
                      <div className="w-12 h-14 overflow-hidden rounded-sm bg-cream-200 flex-shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-base text-ink truncate">{product.name}</p>
                        <p className="text-xs text-brown-400 truncate">{product.description}</p>
                      </div>
                      <span className="text-sm font-medium text-rose flex-shrink-0">
                        {product.priceLabel || formatPrice(product.price)}
                      </span>
                    </Link>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="text-sm text-rose hover:text-rose mt-2 link-underline"
                  >
                    See all results →
                  </button>
                </div>
              )}

              {/* Empty state */}
              {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                <div className="mt-4 text-center py-6">
                  <p className="font-serif text-lg text-ink-light">Can't find what you're looking for?</p>
                  <a
                    href={buildWhatsAppLink(generalEnquiryMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-rose hover:text-rose mt-2 inline-block link-underline"
                  >
                    Talk to us on WhatsApp →
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm glass-panel shadow-2xl animate-slide-in flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-silk">
              <span className="font-serif text-base font-medium text-ink">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="text-ink-light hover:text-ink transition-colors" aria-label="Close menu">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-5 py-3.5 text-base font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-rose bg-rose/10'
                      : 'text-ink-light hover:text-ink hover:bg-silk/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-silk mt-2 pt-2">
                <Link to="/decor" className="block px-5 py-3.5 text-base font-medium text-ink-light hover:text-ink hover:bg-silk/50">Home Décor</Link>
                <Link to="/gift-boxes" className="block px-5 py-3.5 text-base font-medium text-ink-light hover:text-ink hover:bg-silk/50">Gift Boxes</Link>
                <Link to="/care-guide" className="block px-5 py-3.5 text-base font-medium text-ink-light hover:text-ink hover:bg-silk/50">Care Guide</Link>
                <Link to="/shipping" className="block px-5 py-3.5 text-base font-medium text-ink-light hover:text-ink hover:bg-silk/50">Shipping &amp; FAQ</Link>
                <Link to="/contact" className="block px-5 py-3.5 text-base font-medium text-ink-light hover:text-ink hover:bg-silk/50">Contact</Link>
              </div>
            </div>
            <div className="p-5 border-t border-silk">
              <a
                href={buildWhatsAppLink(generalEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                <MessageCircle size={16} />
                Chat with Gift Concierge
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
