import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft, Heart, ShoppingBag, Clock, Truck,
  Check, Gift, Sparkles, Star, Palette,
} from 'lucide-react';
import { formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import CrossSell from '@/components/CrossSell';
import DeliveryEstimator from '@/components/DeliveryEstimator';
import ContextualFAQ from '@/components/ContextualFAQ';
import ReviewsSection from '@/components/ReviewsSection';
import RecentlyViewed from '@/components/RecentlyViewed';
import SEO from '@/components/SEO';
import { productOrderMessage, productEnquiryMessage } from '@/utils/whatsapp';
import { howItWorksSteps } from '@/data/site';
import { trackEvent } from '@/utils/analytics';
import { useProducts } from '@/context/ProductContext';

const productFAQs = [
  {
    question: 'How long does this take?',
    answer: 'Each piece is hand-sculpted to order. The preparation time shown is our studio estimate — we will confirm your exact timeline upon purchase.',
  },
  {
    question: 'Can I customise the colours?',
    answer: 'If this piece is marked "Customisable", yes — you can choose from our palette or request a specific hue. Our Studio Assistant will coordinate this with you.',
  },
  {
    question: 'Is it gift-ready?',
    answer: 'Every piece arrives in a curated gift-ready presentation. Premium gift wrapping and personalised messages can be added at checkout.',
  },
  {
    question: 'How much is shipping?',
    answer: 'Orders above ₹1,200 ship free across India. For other orders, a nominal shipping fee applies based on order value.',
  },
];

export default function ProductDetail() {
  const { code } = useParams<{ code: string }>();
  const { products, getProductByCode, loading } = useProducts();
  const product = code ? getProductByCode(code) : undefined;
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [personalMessage, setPersonalMessage] = useState('');

  useEffect(() => {
    if (product) {
      trackEvent('product_view', { code: product.code, name: product.name });
      addRecentlyViewed(product.code);
      window.scrollTo(0, 0);
    }
  }, [product, addRecentlyViewed]);

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-silk" />
          <p className="font-serif text-ink text-lg">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-parchment-50 flex flex-col items-center justify-center p-6 text-center">
        <Reveal>
          <div className="w-20 h-20 bg-silk rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-ink opacity-30" />
          </div>
          <h1 className="heading-serif text-4xl text-ink mb-4">Piece not found</h1>
          <p className="text-ink-light max-w-md mx-auto mb-10 leading-relaxed">
            The bloom you're looking for might have found a new home or is currently being hand-sculpted in our studio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn-primary px-8 py-3">
              Explore the Studio
            </Link>
            <WhatsAppButton
              message={generalEnquiryMessage()}
              label="Ask the Studio Assistant"
              variant="outline"
              className="px-8 py-3"
            />
          </div>
        </Reveal>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.code !== product.code)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, {
      color: selectedColor || undefined,
      quantity,
      giftWrap,
      message: personalMessage || undefined,
    });
    trackEvent('add_to_cart', { code: product.code, quantity });
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.code,
    brand: { '@type': 'Brand', name: 'The Petal & Bloom' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="pt-20 lg:pt-24 bg-parchment-50">
      <SEO
        title={product.name}
        description={product.description}
        canonicalPath={`/product/${product.code}`}
        ogType="product"
        ogImage={product.images?.[0] || 'https://images.pexels.com/photos/20269075/pexels-photo-20269075.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900'}
        structuredData={structuredData}
      />

      {/* Breadcrumb */}
      <div className="container-lux py-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink-light">
          <Link to="/shop" className="inline-flex items-center gap-2 hover:text-rose transition-colors">
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to Studio
          </Link>
        </nav>
      </div>

      {/* Product main */}
      <section className="container-lux pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Gallery - Left Column (7/12) */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-8">
                <div className="aspect-[4/5] overflow-hidden rounded-sm bg-parchment-50 shadow-soft">
                  <img
                    src={product.images?.[selectedImage] || 'https://images.pexels.com/photos/20269075/pexels-photo-20269075.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-4">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-24 h-32 overflow-hidden rounded-sm border-2 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose ${
                          selectedImage === i ? 'border-rose shadow-md' : 'border-silk hover:border-rose/50'
                        }`}
                        aria-label={`View image ${i + 1} of ${product.name}`}
                        aria-pressed={selectedImage === i}
                      >
                        <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Info - Right Column (5/12) */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="sticky top-32 glass-panel p-8 rounded-sm shadow-soft">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  {product.bestseller && (
                    <span className="bg-ink text-parchment-50 text-[10px] uppercase tracking-wider px-3 py-1 rounded-sm font-medium flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Studio Choice
                    </span>
                  )}
                  {product.madeToOrder && (
                    <span className="bg-silk text-ink-light text-[10px] uppercase tracking-wider px-3 py-1 rounded-sm font-medium">
                      Hand-sculpted to order
                    </span>
                  )}
                  {product.customisable && (
                    <span className="bg-sage/10 text-sage text-[10px] uppercase tracking-wider px-3 py-1 rounded-sm font-medium flex items-center gap-1">
                      <Sparkles size={10} /> Customisable
                    </span>
                  )}
                </div>

                <p className="text-xs uppercase tracking-[0.3em] text-rose mb-3">{product.code}</p>
                <h1 className="heading-serif text-5xl lg:text-6xl mb-6 leading-tight">{product.name}</h1>

                <div className="flex items-center gap-6 mb-10">
                  <span className="font-serif text-4xl text-ink">
                    {product.priceLabel || formatPrice(product.price)}
                  </span>
                  {product.bouquetSize && (
                    <span className="text-sm text-ink-light bg-silk px-3 py-1 rounded-sm border border-silk">
                      {product.bouquetSize}
                    </span>
                  )}
                  <button
                    onClick={() => toggleItem(product.code)}
                    className={`ml-auto flex items-center gap-2 text-sm transition-colors duration-300 ${
                      isWishlisted(product.code) ? 'text-rose' : 'text-ink-light hover:text-rose'
                    }`}
                    aria-label={isWishlisted(product.code) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      size={20}
                      strokeWidth={1.5}
                      fill={isWishlisted(product.code) ? 'currentColor' : 'none'}
                    />
                    {isWishlisted(product.code) ? 'Saved' : 'Save'}
                  </button>
                </div>

                <div className="space-y-6 mb-10">
                  <p className="text-lg text-ink-light leading-relaxed font-light">
                    {product.description}
                  </p>
                  {product.longDescription && (
                    <div className="p-6 bg-parchment-100 rounded-sm border-l-4 border-rose/50 italic text-ink-light leading-relaxed">
                      {product.longDescription}
                    </div>
                  )}
                </div>

                {/* Studio Fact Sheet */}
                <div className="grid grid-cols-2 gap-8 mb-10 py-8 border-y border-silk">
                  <div className="flex items-start gap-4">
                    <Clock size={20} className="text-rose flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-ink-light font-semibold">Timeline</p>
                      <p className="text-sm text-ink font-medium">{product.preparationDays || '3–5 days'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Truck size={20} className="text-rose flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-ink-light font-semibold">Shipping</p>
                      <p className="text-sm text-ink font-medium">Pan-India delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Palette size={20} className="text-rose flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-ink-light font-semibold">Palette</p>
                      <p className="text-sm text-ink font-medium">
                        {product.customisable ? 'Custom colours available' : 'Studio standard'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Gift size={20} className="text-rose flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-ink-light font-semibold">Presentation</p>
                      <p className="text-sm text-ink font-medium">Gift-ready wrapping</p>
                    </div>
                  </div>
                </div>

                {/* Customization Area */}
                <div className="space-y-8 mb-10">
                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-ink mb-4 uppercase tracking-wider">Select Hue</label>
                      <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-5 py-2 text-sm rounded-sm border transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose ${
                              selectedColor === color
                                ? 'bg-ink text-parchment-50 border-ink shadow-md'
                                : 'bg-parchment-50 text-ink-light border-silk hover:border-rose'
                            }`}
                            aria-pressed={selectedColor === color}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-ink uppercase tracking-wider">Quantity</label>
                    <div className="flex items-center border border-silk bg-parchment-50 rounded-sm">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-ink hover:bg-silk transition-colors focus-visible:outline-none"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-4 text-base text-ink min-w-[40px] text-center" aria-live="polite">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-ink hover:bg-silk transition-colors focus-visible:outline-none"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="personal-message" className="block text-sm font-medium text-ink uppercase tracking-wider">
                      Personalised message <span className="text-ink-light font-normal lowercase italic"> (optional, ₹39)</span>
                    </label>
                    <input
                      id="personal-message"
                      type="text"
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                      placeholder="Write a heartfelt note..."
                      className="input-field"
                    />
                  </div>

                  <label className="flex items-center gap-4 cursor-pointer group">
                    <button
                      onClick={() => setGiftWrap(!giftWrap)}
                      className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose ${
                        giftWrap ? 'bg-sage border-sage' : 'border-silk group-hover:border-rose'
                      }`}
                      aria-label="Toggle gift wrapping"
                      aria-pressed={giftWrap}
                    >
                      {giftWrap && <Check size={14} className="text-parchment-50" strokeWidth={3} />}
                    </button>
                    <span className="text-sm text-ink-light group-hover:text-ink transition-colors">
                      Add premium gift wrapping <span className="text-ink-light/60">(₹79)</span>
                    </span>
                  </label>
                </div>

                {/* Delivery Estimation */}
                <div className="mb-10">
                  <DeliveryEstimator preparationDays={product.preparationDays} />
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-4">
                  <button onClick={handleAddToCart} className="btn-primary w-full py-6 text-lg">
                    <ShoppingBag size={22} />
                    Add to Collection
                  </button>
                  <WhatsAppButton
                    message={productOrderMessage(product)}
                    label="Order via Gift Concierge"
                    className="w-full py-6 text-lg"
                  />
                  <WhatsAppButton
                    message={productEnquiryMessage(product)}
                    label="Inquire about this piece"
                    variant="outline"
                    className="w-full py-6 text-lg"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <CrossSell />

      {/* Story and Detail Sections */}
      <section className="py-24 lg:py-32 bg-parchment-100">
        <div className="container-lux">
          <div className="grid md:grid-cols-2 gap-16">
            {product.occasions && product.occasions.length > 0 && (
              <Reveal>
                <p className="section-label mb-4">Suggested For</p>
                <h2 className="heading-serif text-3xl lg:text-4xl mb-6">The perfect gesture for...</h2>
                <div className="flex flex-wrap gap-2">
                  {product.occasions.map((occasion) => (
                    <Link
                      key={occasion}
                      to={`/shop?occasion=${occasion}`}
                      className="px-4 py-2.5 bg-parchment-50 text-ink text-sm font-medium rounded-sm border border-silk hover:border-rose hover:text-rose transition-all duration-300"
                    >
                      {occasion}
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}

            {product.whatsIncluded && product.whatsIncluded.length > 0 && (
              <Reveal delay={100}>
                <p className="section-label mb-4">The Package</p>
                <h2 className="heading-serif text-3xl lg:text-4xl mb-6">What is included</h2>
                <ul className="space-y-4">
                  {product.whatsIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ink-light">
                      <span className="w-5 h-5 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-sage-dark" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Contextual FAQ */}
      <section className="py-24 lg:py-32 bg-parchment-50">
        <div className="container-lux max-w-2xl">
          <Reveal>
            <p className="section-label mb-4 text-center">Studio Insights</p>
            <h2 className="heading-serif text-3xl lg:text-4xl text-center mb-12">Frequently Asked Questions</h2>
          </Reveal>
          <ContextualFAQ faqs={productFAQs} />
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection />

      {/* Process Guide */}
      <section className="py-24 lg:py-32 bg-parchment-100">
        <div className="container-lux">
          <Reveal>
            <p className="section-label text-center mb-4">The Journey</p>
            <h2 className="heading-serif text-3xl lg:text-4xl text-center mb-16">From yarn to your doorstep.</h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {howItWorksSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="text-center">
                  <p className="font-serif text-4xl lg:text-5xl text-rose/40 mb-3">{step.num}</p>
                  <p className="text-sm font-medium text-ink leading-snug">{step.label}</p>
                  <p className="text-xs text-ink-light mt-2 leading-snug hidden sm:block">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recently viewed */}
      <RecentlyViewed excludeCode={product.code} />

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 lg:py-32 bg-parchment-50">
          <div className="container-lux">
            <Reveal>
              <h2 className="heading-serif text-3xl lg:text-4xl mb-12 text-center">You may also appreciate</h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p, i) => (
                <Reveal key={p.code} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
