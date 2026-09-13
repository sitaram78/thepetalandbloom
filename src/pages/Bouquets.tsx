import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import CategoryPage from '@/components/CategoryPage';
import Reveal from '@/components/Reveal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useProducts } from '@/context/ProductContext';
import { formatPrice } from '@/data/products';
import { bouquetTiers, heroImages } from '@/data/site';
import { customOrderMessage } from '@/utils/whatsapp';

export default function Bouquets() {
  const { products } = useProducts();
  const bouquets = products.filter(p => p.category === 'bouquets');
  return (
    <div>
      <CategoryPage
        label="Bouquets"
        title={<>A bouquet for every story</>}
        subtitle="From a single bloom to a garden in your hands — each bouquet is handmade, wrapped, and made to order. Choose a size, or create something entirely custom."
        image={heroImages.primary}
        products={bouquets}
        showCustomCTA
      >
        {/* Bouquet comparison */}
        <Reveal className="mt-16">
          <div className="bg-cream-100 p-8 lg:p-12 rounded-sm">
            <h3 className="heading-serif text-2xl lg:text-3xl text-center mb-8">
              Choose your bouquet size
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
              {bouquetTiers.map((tier) => (
                <Link
                  key={tier.code}
                  to={`/product/${tier.code}`}
                  className={`group block p-5 rounded-sm text-center transition-all duration-500 ${
                    tier.popular
                      ? 'bg-brown-700 text-cream-50 hover:bg-brown-800 hover:-translate-y-1'
                      : 'bg-cream-50 text-brown-700 hover:bg-cream-200 hover:-translate-y-1'
                  }`}
                >
                  {tier.popular && (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider bg-terracotta-500 text-cream-50 px-2 py-0.5 rounded-sm mb-2">
                      <Star size={8} fill="currentColor" /> Most Popular
                    </span>
                  )}
                  <h4 className="font-serif text-lg leading-tight">{tier.name}</h4>
                  <p className={`text-xs mt-1 ${tier.popular ? 'text-cream-200/70' : 'text-brown-400'}`}>
                    {tier.flowers}
                  </p>
                  <p className="font-serif text-2xl mt-3">{formatPrice(tier.price)}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-brown-400 mb-4">
                Custom bouquets from {formatPrice(1199)} — choose every detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/custom" className="btn-primary">
                  Create a custom bouquet <ArrowRight size={16} />
                </Link>
                <WhatsAppButton
                  message={customOrderMessage()}
                  label="Talk to us on WhatsApp"
                  variant="outline"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </CategoryPage>
    </div>
  );
}
