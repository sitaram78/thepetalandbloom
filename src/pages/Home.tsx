import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Clock, Palette, Truck, Gift, Sparkles, Users, Flower2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import SEO from '@/components/SEO';
import AtelierButton from '@/components/AtelierButton';
import StitchDivider from '@/components/StitchDivider';
import { formatPrice } from '@/data/products';
import { useSiteAssets, getDynamicAsset } from '@/context/SiteAssetsContext';
import {
  occasions, trustStrip, bouquetTiers, addOns, giftingOccasions,
  instagramPosts, heroImages, brandInfo, budgetFilters,
  howItWorksSteps, faqs,
} from '@/data/site';
import { customOrderMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { useProducts } from '@/context/ProductContext';

const trustIcons: Record<string, any> = {
  Heart, Clock, Palette, Truck, Gift,
};

const occasionIcons: Record<string, any> = {
  Gift, Heart, Users, Sparkles, Flower2,
};

// Mapping for organic occasion blobs
const OCCASION_BLOBS = [
  { name: 'Anniversaries', count: '18 pieces', color: 'bg-rose-400', textColor: 'text-rose-900' },
  { name: 'Just because', count: '24 pieces', color: 'bg-sage-400', textColor: 'text-sage-900' },
  { name: 'New homes', count: '12 pieces', color: 'bg-bark', textColor: 'text-linen' },
];

export default function Home() {
  const { products, getBestsellers, loading: productLoading } = useProducts();
  const { assets, loading: assetsLoading } = useSiteAssets();
  const bestsellers = getBestsellers();
  const featuredProduct = products ? products.find((p) => p.code === 'TPB-BQ-003') : undefined;

  useEffect(() => {
    trackEvent('homepage_view');
  }, []);

  if (productLoading || assetsLoading) {
    return (
      <div className="min-h-screen bg-linen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-canvas" />
          <p className="font-serif text-bark text-lg">Preparing the Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-linen">
      <SEO
        title="Handmade Crochet Flowers, Bouquets & Gifts"
        description="Handmade crochet flowers, bouquets, and gifts made in India. Custom colours, made to order, pan-India delivery. Flowers that never fade."
        canonicalPath="/"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: 'The Petal & Bloom',
          description: 'Handmade crochet flowers, bouquets, and gifts made in India.',
          url: 'https://petal-bloom-d2c-webs-k5dq.bolt.host',
        }}
      />

      {/* 01. THE THESIS: Hero Section (KEEP EXACT) */}
      <section className="relative min-h-screen flex items-center justify-center bg-linen">
        <div className="absolute inset-0">
          <img
            src={getDynamicAsset(assets, 'home_hero_primary')}
            alt="Handmade crochet bouquet"
            className="w-full h-full object-cover animate-gentle-zoom"
          />
          <div className="absolute inset-0 bg-bark/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-linen/30 via-transparent to-linen" />
        </div>

        <div className="container-lux relative z-10 text-center translate-y-12 lg:translate-y-24">
          <Reveal>
            <p className="font-serif italic text-sm text-rose mb-8 tracking-[0.4em] animate-fade-up uppercase">Handmade in India</p>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-9xl text-bark text-balance animate-fade-up leading-[1.05]" style={{ animationDelay: '0.2s' }}>
              Flowers that<br />never fade.
            </h1>
            <p className="mt-10 text-lg sm:text-2xl text-ink-light leading-relaxed max-w-3xl mx-auto animate-fade-up font-light" style={{ animationDelay: '0.4s' }}>
              Hand-sculpted crochet blooms and thoughtful gifts, created slowly to be given meaningfully.
            </p>
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <AtelierButton variant="primary" className="text-lg px-12 py-5">
                Explore the Studio <ArrowRight size={20} className="ml-2" />
              </AtelierButton>
              <AtelierButton variant="ghost" className="text-lg px-12 py-5">
                Co-create a Bouquet
              </AtelierButton>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-lux">
        <StitchDivider />
      </div>

      {/* 02. TRUST STRIP */}
      <section className="py-12 bg-canvas/30 border-b border-canvas-line">
        <div className="container-lux">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-80">
            {trustStrip.map((item, i) => {
              const Icon = trustIcons[item.icon] || Heart;
              return (
                <div key={i} className="flex items-center gap-4 text-ink-light">
                  <Icon size={20} strokeWidth={1.5} className="text-rose" />
                  <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. PHILOSOPHY */}
      <section className="py-32 lg:py-48 bg-linen text-center">
        <div className="container-lux">
          <div className="max-w-3xl mx-auto space-y-8">
            <Reveal>
              <span className="font-serif italic text-sm text-rose mb-4 block">Why crochet</span>
              <h2 className="font-serif text-5xl lg:text-7xl text-bark leading-tight mb-8">An heirloom of affection.</h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-6 text-lg text-ink-light leading-relaxed font-light">
                <p>
                  Fresh flowers are a fleeting beauty — a week, if you're lucky, before the bin. We wanted to make something that could hold the same feeling without the countdown.
                </p>
                <p>
                  Every bloom is built stitch by stitch from cotton yarn, shaped by hand over hours, not minutes — so what you're giving isn't just a flower. It's proof someone sat down and made something, on purpose, for someone else.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04. OCCASIONS */}
      <section className="py-32 lg:py-48 bg-canvas">
        <div className="container-lux">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <Reveal>
              <span className="font-serif italic text-sm text-rose mb-3 block">Shop by moment</span>
              <h2 className="font-serif text-5xl lg:text-7xl text-bark leading-tight">What's the occasion?</h2>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/shop" className="text-sm text-ink-light font-medium hover:text-rose transition-colors underline underline-offset-4">
                See all occasions
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {OCCASION_BLOBS.map((blob, i) => (
              <Reveal key={blob.name} delay={i * 100}>
                <div className="group cursor-pointer">
                  <div
                    className={`aspect-square ${blob.color} rounded-[40%_60%_70%_30%/40%_50%_60%_50%] transition-all duration-500 group-hover:scale-105 shadow-soft`}
                  />
                  <div className="mt-8 flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl text-bark">{blob.name}</h3>
                    <span className="text-xs text-ink-light font-light">{blob.count}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05. NEW THIS SEASON (Shop Preview) */}
      <section className="py-32 lg:py-48 bg-linen">
        <div className="container-lux">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <Reveal>
              <span className="font-serif italic text-sm text-rose mb-3 block">From the studio</span>
              <h2 className="font-serif text-5xl lg:text-7xl text-bark leading-tight">New this season</h2>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/shop" className="text-sm text-ink-light font-medium hover:text-rose transition-colors underline underline-offset-4">
                View the full shop
              </Link>
            </Reveal>
          </div>

          <div className="flex flex-wrap gap-3 mb-16">
            {['All', 'Bouquets', 'Single stems', 'Gift boxes'].map((filter, i) => (
              <button
                key={filter}
                className={`px-5 py-2 rounded-full text-sm border transition-all ${i === 0 ? 'bg-bark text-linen border-bark' : 'border-canvas-line text-ink-light hover:border-rose'}`}
              >
                {filter}
              </button>
            ))}
            <button className="px-5 py-2 rounded-full text-sm border border-sage-400 text-sage-700 hover:bg-sage-400/10 transition-all">
              Customisable only
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {products?.slice(0, 3).map((product, i) => (
              <Reveal key={product.code} delay={i * 100}>
                <div className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-atelier-img shadow-soft bg-canvas">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {product.customisable && (
                      <span className="absolute top-4 left-4 bg-moss text-linen text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
                        Customisable
                      </span>
                    )}
                    <div className="absolute inset-x-4 bottom-4 p-4 bg-linen rounded-sm text-center text-sm font-medium translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-lg">
                      Add to bag — {formatPrice(product.price)}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-baseline">
                    <h3 className="font-serif text-2xl text-bark">{product.name}</h3>
                    <span className="text-xs text-ink-light font-light">{product.code}</span>
                  </div>
                  <p className="font-serif text-xl text-rose mt-1">{formatPrice(product.price)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06. PRODUCT DETAIL PREVIEW */}
      <section className="py-32 lg:py-48 bg-canvas">
        <div className="container-lux">
          <Reveal className="mb-12">
            <span className="font-serif italic text-sm text-rose">A closer look — product page</span>
          </Reveal>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-atelier-img bg-linen shadow-soft">
                {featuredProduct && (
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex gap-4 mt-6">
                {featuredProduct?.images.slice(0, 3).map((img, i) => (
                  <div key={i} className={`w-20 h-20 rounded-sm overflow-hidden border-2 ${i === 0 ? 'border-rose' : 'border-transparent'}`}>
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5">
              <div className="bg-linen p-10 rounded-[2px_30px_2px_30px] shadow-soft space-y-8">
                <div>
                  <span className="text-xs text-ink-light font-light">{featuredProduct?.code}</span>
                  <h2 className="font-serif text-4xl text-bark mt-2">{featuredProduct?.name}</h2>
                  <p className="font-serif text-2xl text-rose mt-4">{featuredProduct ? formatPrice(featuredProduct.price) : ''}</p>
                  <p className="text-ink-light mt-6 leading-relaxed font-light">
                    {featuredProduct?.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-wider text-ink font-medium">Size</p>
                  <div className="flex flex-wrap gap-3">
                    {['Petite · 5 stems', 'Classic · 7 stems', 'Grand · 11 stems'].map((size, i) => (
                      <span
                        key={size}
                        className={`px-4 py-2 rounded-full text-sm border transition-all ${i === 1 ? 'bg-bark text-linen border-bark' : 'border-canvas-line text-ink-light hover:border-rose'}`}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <AtelierButton variant="primary" className="w-full justify-center py-4">
                    Add to bag
                  </AtelierButton>
                  <AtelierButton variant="ghost" className="w-full justify-center py-4">
                    Add a handwritten note
                  </AtelierButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 07. PROCESS: Stitch by Stitch */}
      <section className="py-32 lg:py-48 bg-bark text-linen">
        <div className="container-lux">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <span className="font-serif italic text-sm text-rose mb-4 block uppercase tracking-widest">The craft</span>
              <h2 className="font-serif text-5xl lg:text-7xl text-linen leading-tight">Stitch by stitch.</h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
            {[
              { num: '01', title: 'Yarn is chosen', desc: 'Cotton, dyed to hold colour through years, not seasons.' },
              { num: '02', title: 'Petals are looped', desc: 'Each petal is a single continuous stitch, shaped by hand.' },
              { num: '03', title: 'Blooms are built', desc: 'Petals are layered and wired into full, dimensional flowers.' },
              { num: '04', title: 'Arranged & wrapped', desc: 'Composed by eye, then wrapped in linen and twine.' },
              { num: '05', title: 'Sent your way', desc: 'Boxed flat-safe and shipped within 6 working days.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="space-y-4">
                  <span className="font-serif italic text-4xl text-rose">{step.num}</span>
                  <h4 className="font-serif text-xl text-linen">{step.title}</h4>
                  <p className="text-sm text-linen/60 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container-lux">
        <StitchDivider variant="dark" />
      </div>

      {/* 08. CLOSING CTA */}
      <section className="py-32 lg:py-48 bg-linen relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,214,188,0.3)_0%,transparent_70%)]" />
        <div className="container-lux relative z-10 text-center">
          <Reveal>
            <span className="font-serif italic text-sm text-rose mb-4 block">Still deciding?</span>
            <h2 className="font-serif text-6xl lg:text-8xl text-bark mb-12 leading-tight">
              Ready to give a gift<br />that stays?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <AtelierButton variant="primary" className="text-lg px-16 py-6">
                Shop the Collections <ArrowRight size={22} className="ml-2" />
              </AtelierButton>
              <AtelierButton variant="ghost" className="text-lg px-16 py-6">
                Design a Custom Piece
              </AtelierButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
