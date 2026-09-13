import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Clock, Palette, Truck, Gift, Sparkles, Users, Flower2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import SEO from '@/components/SEO';
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
      <div className="min-h-screen bg-parchment-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-silk" />
          <p className="font-serif text-ink text-lg">Preparing the Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-parchment-50">
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

      {/* 01. THE THESIS: Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-parchment-50">
        <div className="absolute inset-0">
          <img
            src={getDynamicAsset(assets, 'home_hero_primary')}
            alt="Handmade crochet bouquet"
            className="w-full h-full object-cover animate-gentle-zoom"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-parchment-50/30 via-transparent to-parchment-50" />
        </div>

        <div className="container-lux relative z-10 text-center">
          <Reveal>
            <p className="section-label mb-8 tracking-[0.4em] animate-fade-up">Handmade in India</p>
            <h1 className="heading-serif text-6xl sm:text-7xl lg:text-9xl text-ink text-balance animate-fade-up leading-[1.05]" style={{ animationDelay: '0.2s' }}>
              Flowers that<br />never fade.
            </h1>
            <p className="mt-10 text-lg sm:text-2xl text-ink-light leading-relaxed max-w-3xl mx-auto animate-fade-up font-light" style={{ animationDelay: '0.4s' }}>
              Hand-sculpted crochet blooms and thoughtful gifts, created slowly to be given meaningfully.
            </p>
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <Link to="/shop" className="btn-primary text-lg px-12 py-5">
                Explore the Studio <ArrowRight size={20} />
              </Link>
              <Link to="/custom-bouquet" className="btn-secondary text-lg px-12 py-5">
                Co-create a Bouquet
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02. THE PHILOSOPHY: Emotional Connection */}
      <section className="py-32 lg:py-48 bg-parchment-50">
        <div className="container-lux">
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute inset-0 shadow-soft rounded-full blur-3xl opacity-20 -z-10 bg-rose/20" />
            <Reveal>
              <h2 className="heading-serif text-5xl lg:text-7xl text-ink mb-12 leading-tight">
                An Heirloom of Affection.
              </h2>
              <p className="text-xl text-ink-light leading-relaxed mb-10 max-w-2xl mx-auto font-light">
                Fresh flowers are a fleeting beauty. We believe in a different kind of bloom — one that carries the memory of the moment it was given, indefinitely.
              </p>
              <p className="text-2xl font-serif italic text-rose opacity-90">
                Every petal is shaped stitch by stitch, turning yarn into a permanent symbol of love.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03. THE CURATION: Mood-based discovery */}
      <section className="py-32 lg:py-48 bg-silk/50">
        <div className="container-lux">
          <SectionHeading
            label="The Collections"
            title="Curated for your moments."
            subtitle="Whether it's a quiet thank you or a grand celebration, find the mood that matches yours."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            {occasions.slice(0, 3).map((occasion, i) => {
              const Icon = occasionIcons[occasion.icon] || Heart;
              return (
                <Reveal key={occasion.name} delay={i * 100}>
                  <Link
                    to={`/shop?occasion=${occasion.filter}`}
                    className="group relative block overflow-hidden rounded-sm aspect-[4/5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose shadow-soft transition-all duration-500 hover:-translate-y-2"
                  >
                    <img
                      src={occasion.image}
                      alt={occasion.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-10 text-left">
                      <div className={`w-12 h-12 rounded-full ${occasion.emojiBg} flex items-center justify-center mb-6`}>
                        <Icon size={24} className={occasion.emojiColor} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-3xl text-parchment-50">{occasion.name}</h3>
                      <p className="text-sm text-parchment-100/80 mt-3 leading-relaxed">
                        {occasion.description}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="text-center mt-20">
            <Link to="/shop" className="btn-secondary px-12 py-4">
              View all Collections <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 04. THE STUDIO EXPERIENCE: Custom Bouquet */}
      <section className="py-32 lg:py-48 bg-parchment-50">
        <div className="container-lux">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-silk shadow-soft">
                <img
                  src={getDynamicAsset(assets, 'home_hero_secondary')}
                  alt="Custom Bouquet Process"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-rose/10 mix-blend-multiply" />
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5">
              <p className="section-label mb-6">The Studio Table</p>
              <h2 className="heading-serif text-5xl lg:text-7xl text-ink mb-8 leading-tight">
                Your flowers.<br />Your story.
              </h2>
              <p className="text-xl text-ink-light leading-relaxed mb-12 font-light">
                Not every emotion fits a standard bouquet. We invite you to co-create a piece of botanical art — choosing every bloom, every hue, and every detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/custom-bouquet" className="btn-primary px-10 py-5">
                  Start Co-creating <ArrowRight size={20} />
                </Link>
                <WhatsAppButton
                  message={customOrderMessage()}
                  label="Consult the Studio Assistant"
                  variant="outline"
                  className="px-10 py-5"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05. THE PROOF: Craftsmanship Macro */}
      <section className="py-32 lg:py-48 bg-forest text-parchment-50">
        <div className="container-lux">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <p className="section-label text-rose mb-6">The Detail</p>
              <h2 className="heading-serif text-5xl lg:text-7xl mb-8 text-white">Stitch by Stitch.</h2>
              <p className="text-parchment-50/90 text-xl leading-relaxed font-light">
                Luxury is found in the details. Every petal is sculpted by hand, ensuring that no two blooms are identical — just like the people they are given to.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Reveal delay={100}>
              <div className="aspect-[4/5] overflow-hidden rounded-sm group relative shadow-soft">
                <img src={getDynamicAsset(assets, 'home_hero_hands')} alt="Hand crafting" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-all duration-500" />
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="aspect-[4/5] overflow-hidden rounded-sm group relative mt-16 shadow-soft">
                <img src={getDynamicAsset(assets, 'home_hero_texture')} alt="Yarn detail" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-all duration-500" />
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="aspect-[4/5] overflow-hidden rounded-sm group relative shadow-soft">
                <img src={getDynamicAsset(assets, 'home_hero_yarn')} alt="Yarn palette" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-all duration-500" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06. THE TRUST STRIP: Minimalist */}
      <section className="py-16 bg-silk/30 border-b border-silk">
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

      {/* 07. THE CLOSING: Final CTA */}
      <section className="py-32 lg:py-48 bg-parchment-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,214,195,0.3)_0%,transparent_70%)]" />
        <div className="container-lux relative z-10 text-center">
          <Reveal>
            <h2 className="heading-serif text-6xl lg:text-8xl text-ink mb-12 leading-tight">
              Ready to give a gift<br />that stays?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link to="/shop" className="btn-primary text-lg px-16 py-6">
                Shop the Collections <ArrowRight size={22} />
              </Link>
              <Link to="/custom-bouquet" className="btn-secondary text-lg px-16 py-6">
                Design a Custom Piece
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
