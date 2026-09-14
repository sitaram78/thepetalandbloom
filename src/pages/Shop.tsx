import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ProductGrid from '@/components/ProductGrid';
import ProductSkeleton from '@/components/ProductSkeleton';
import Reveal from '@/components/Reveal';
import WhatsAppButton from '@/components/WhatsAppButton';
import SEO from '@/components/SEO';
import { type ProductCategory, formatPrice } from '@/data/products';
import { occasions, heroImages, budgetFilters, giftingOccasions } from '@/data/site';
import { buildWhatsAppLink, generalEnquiryMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { useProducts } from '@/context/ProductContext';
import { getCache, setCache } from '@/utils/cache';
import { supabase } from '@/lib/supabaseClient';
import { filterProducts } from '@/utils/productSearch';


const categoryFilters: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Flowers', value: 'flowers' },
  { label: 'Bouquets', value: 'bouquets' },
  { label: 'Gifts', value: 'gifts' },
  { label: 'Bags', value: 'bags' },
  { label: 'Home Décor', value: 'decor' },
  { label: 'Gift Boxes', value: 'giftboxes' },
];

const sortOptions = [
  { label: 'Recommended', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

export default function ShopPage() {
  const { products, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const occasionFilter = searchParams.get('occasion') || '';
  const budgetFilter = searchParams.get('budget') || '';
  const searchQuery = searchParams.get('search') || '';
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [sort, setSort] = useState('featured');
  const [customOnly, setCustomOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      // 1. Try to get from cache first
      const cached = getCache<{ label: string; value: string }[]>('categories_cache');
      if (cached) {
        setCategories(cached);
        return;
      }

      const { data, error } = await supabase
        .from('categories')
        .select('name, slug')
        .order('display_order', { ascending: true });

      if (!error && data) {
        const mapped = data.map(c => ({ label: c.name, value: c.slug }));
        setCategories(mapped);
        setCache('categories_cache', mapped);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (occasionFilter || budgetFilter || searchQuery) {
      setCategory('all');
    }
    if (searchQuery) {
      trackEvent('search', { query: searchQuery });
    }
    if (occasionFilter || budgetFilter) {
      trackEvent('filter_use', { occasion: occasionFilter, budget: budgetFilter });
    }
  }, [occasionFilter, budgetFilter, searchQuery]);

  const activeBudget = budgetFilters.find((b) => b.param === budgetFilter);

  const filtered = useMemo(() => {
    if (!products) return [];

    // Combine filters into one pass using the utility
    let result = filterProducts(products, {
      query: searchQuery,
      category,
      occasion: occasionFilter,
      customOnly,
    });

    // Apply budget filter separately as it requires the mapping from data/site
    if (activeBudget) {
      result = result.filter((p) => p?.price >= activeBudget.min && p?.price <= activeBudget.max);
    }

    // Sort
    if (sort === 'price-asc') {
      result.sort((a, b) => (a?.price || 0) - (b?.price || 0));
    } else if (sort === 'price-desc') {
      result.sort((a, b) => (b?.price || 0) - (a?.price || 0));
    } else if (sort === 'newest') {
      result.sort((a, b) => (b?.isNew ? 1 : 0) - (a?.isNew ? 1 : 0));
    } else {
      result.sort((a, b) => (b?.featured ? 1 : 0) - (a?.featured ? 1 : 0));
    }

    return result;
  }, [products, category, occasionFilter, activeBudget, customOnly, searchQuery, sort]);

  const occasionName = occasions.find((o) => o.filter === occasionFilter)?.name;
  const hasActiveFilter = occasionFilter || budgetFilter || searchQuery || customOnly || category !== 'all';

  const clearAllFilters = () => {
    setSearchParams({});
    setCategory('all');
    setCustomOnly(false);
    setSort('featured');
  };

  const hasNoResults = filtered && filtered.length === 0 && searchQuery;

  if (loading) {
    return (
      <div className="bg-parchment-50 min-h-screen">
        <PageHeader
          label="Shop all"
          title="Loading Collection..."
          subtitle="Preparing the studio gallery for you."
          image={heroImages.secondary}
        />
        <div className="container-lux pb-24">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-parchment-50">
      <SEO
        title="Shop All Handmade Crochet Blooms & Gifts"
        description="Browse our full collection of handmade crochet flowers, bouquets, keyrings, bags, and gift boxes. Custom colours, made to order, pan-India delivery."
        canonicalPath="/shop"
      />

      <PageHeader
        label="Shop all"
        title={
          hasNoResults
            ? "No blooms found"
            : occasionName
            ? `${occasionName} gifts`
            : activeBudget
            ? activeBudget.label
            : searchQuery
            ? `Search: "${searchQuery}"`
            : 'The full collection'
        }
        subtitle={
          hasNoResults
            ? `We couldn't find any pieces matching "${searchQuery}". Try a different keyword or explore our full studio.`
            : occasionName
            ? `Handmade crochet blooms and gifts for ${occasionName.toLowerCase()}.`
            : activeBudget
            ? `Handmade pieces ${activeBudget.label.toLowerCase()}.`
            : 'Browse every handmade piece — flowers, bouquets, keyrings, bags, and gift boxes.'
        }
        image={heroImages.secondary}
      />

      {/* Filters */}
      <div className="container-lux pb-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value as ProductCategory)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-sm transition-all duration-500 ${
                    category === cat.value
                      ? 'bg-ink text-parchment-50 shadow-md'
                      : 'bg-parchment-100 text-ink-light hover:bg-parchment-200 hover:text-ink'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCustomOnly(!customOnly)}
              className={`px-5 py-2.5 text-sm font-medium rounded-sm border transition-all duration-500 ${
                customOnly
                  ? 'bg-sage text-parchment-50 border-sage shadow-sm'
                  : 'bg-parchment-100 text-ink-light border-silk hover:border-rose hover:bg-parchment-200'
              }`}
            >
              Customisable only
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-silk">
              <SlidersHorizontal size={16} className="text-ink-light/60" strokeWidth={1.5} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm text-ink-light bg-transparent border-none focus:ring-0 cursor-pointer hover:text-ink transition-colors"
                aria-label="Sort products"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Occasion filter row */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs text-ink-light/60 font-semibold uppercase tracking-widest mr-1">Occasion:</span>
          {giftingOccasions.map((occ) => (
            <button
              key={occ}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                if (occasionFilter === occ) {
                  params.delete('occasion');
                } else {
                  params.set('occasion', occ);
                }
                setSearchParams(params);
              }}
              className={`text-xs px-4 py-2 rounded-sm transition-all duration-300 ${
                occasionFilter === occ
                  ? 'bg-rose text-parchment-50 shadow-sm'
                  : 'bg-parchment-100 text-ink-light hover:bg-parchment-200 hover:text-ink'
              }`}
            >
              {occ}
            </button>
          ))}
        </div>

        {hasActiveFilter && (
          <div className="mt-6">
            <button
              onClick={clearAllFilters}
              className="text-sm text-rose hover:text-rose-dark transition-colors flex items-center gap-1.5 font-medium"
            >
              <X size={14} /> Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Products */}
      <div className="container-lux pb-24">
        <p className="text-sm text-ink-light/60 mb-10 font-light">
          {filtered?.length || 0} { (filtered?.length || 0) === 1 ? 'piece' : 'pieces'}
        </p>
        {filtered && filtered.length > 0 ? (
          <ProductGrid products={filtered} columns={3} />
        ) : (
          <Reveal className="text-center py-24 max-w-md mx-auto">
            <Search size={48} strokeWidth={1} className="text-silk mx-auto mb-6" />
            <p className="font-serif text-3xl text-ink mb-4">
              No blooms found.
            </p>
            <p className="text-sm text-ink-light/60 mb-10 leading-relaxed">
              We couldn't find a bloom matching those filters. Try adjusting your selection or explore our full studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={clearAllFilters} className="btn-secondary px-8 py-3">
                Clear filters
              </button>
              <Link to="/shop" className="btn-secondary px-8 py-3">
                Browse all
              </Link>
              <WhatsAppButton message={generalEnquiryMessage()} label="Talk to us" variant="outline" className="px-8 py-3" />
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
