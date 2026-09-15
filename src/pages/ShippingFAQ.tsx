import { useState } from 'react';
import { Plus, Minus, Truck, Clock, Package } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useSiteAssets, getDynamicAsset } from '@/context/SiteAssetsContext';
import { SITE_ASSET_KEYS } from '@/utils/siteAssetKeys';
import { faqs } from '@/data/site';
import { formatPrice } from '@/data/products';
import SEO from '@/components/SEO';

export default function ShippingFAQ() {
  const { assets } = useSiteAssets();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-linen min-h-screen">
      <SEO
        title="Shipping & FAQ — The Petal & Bloom"
        description="Everything you need to know about our pan-India delivery, preparation timelines, and frequently asked questions."
        canonicalPath="/shipping"
      />

      {/* Atelier Shipping Header */}
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-20">
        <div className="container-lux grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="font-serif italic text-sm text-rose mb-3 block uppercase tracking-widest">Shipping & FAQ</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-bark leading-tight mb-6">
              Everything you <br />need to know.
            </h1>
            <p className="text-ink-light text-base sm:text-lg max-w-2xl leading-relaxed">
              Shipping details, preparation times, and answers to the questions we hear most often.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[16/9] rounded-atelier-img overflow-hidden shadow-soft">
              <img
                src={getDynamicAsset(assets, SITE_ASSET_KEYS.SHIPPING_FAQ_HERO)}
                alt="Shipping and packaging"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="py-16 lg:py-24 bg-linen">
        <div className="container-lux">
          <Reveal>
            <h2 className="font-serif text-4xl lg:text-5xl text-bark mb-4">Pan-India delivery</h2>
            <p className="text-ink-light max-w-xl mb-12 text-lg font-light">
              We ship across India with trusted courier services. Orders typically arrive within 2–5 business days after preparation.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { range: 'Orders below ₹799', cost: '₹69', note: 'Standard shipping fee', icon: Truck },
              { range: 'Orders ₹799 – ₹1,199', cost: '₹49', note: 'Reduced shipping fee', icon: Package },
              { range: 'Orders ₹1,200 & above', cost: 'FREE', note: 'No shipping cost', icon: Clock },
            ].map((tier, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`p-8 rounded-atelier-panel h-full transition-all duration-500 shadow-sm border ${
                  tier.cost === 'FREE' ? 'bg-moss text-linen border-moss' : 'bg-canvas border-canvas-line text-bark'
                }`}>
                  <tier.icon size={28} strokeWidth={1.5} className={tier.cost === 'FREE' ? 'text-linen' : 'text-rose'} />
                  <p className={`text-xs uppercase tracking-widest mt-6 mb-2 font-semibold ${tier.cost === 'FREE' ? 'text-linen/70' : 'text-ink-light/60'}`}>{tier.range}</p>
                  <p className={`font-serif text-4xl mb-2 ${tier.cost === 'FREE' ? 'text-linen' : 'text-bark'}`}>
                    {tier.cost === 'FREE' ? 'FREE' : formatPrice(parseInt(tier.cost.replace(/[^\d]/g, '')))}
                  </p>
                  <p className={`text-xs ${tier.cost === 'FREE' ? 'text-linen/70' : 'text-ink-light/70'}`}>{tier.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 bg-canvas p-8 rounded-atelier-panel border border-canvas-line shadow-soft">
            <p className="text-sm text-ink-light leading-relaxed">
              <span className="font-semibold text-bark">Preparation time varies by product.</span> Individual flowers take 3–5 days.
              Bouquets take 4–7 days. Custom orders may take 5–10 days. We will always confirm your timeline when you place an order.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-canvas">
        <div className="container-lux max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl lg:text-5xl text-bark mb-4">Frequently asked questions</h2>
            <p className="text-ink-light mb-12 text-lg font-light">If you don't find your answer here, message us on WhatsApp — we are happy to help.</p>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="bg-linen rounded-atelier-panel border border-canvas-line overflow-hidden shadow-sm transition-all duration-300">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-6 text-left"
                    aria-expanded={openIndex === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span className="font-serif text-xl text-bark pr-4">{faq.question}</span>
                    {openIndex === i ? (
                      <Minus size={20} className="text-rose flex-shrink-0" strokeWidth={1.5} />
                    ) : (
                      <Plus size={20} className="text-ink-light flex-shrink-0" strokeWidth={1.5} />
                    )}
                  </button>
                  {openIndex === i && (
                    <div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      className="px-6 pb-6 animate-fade-in"
                    >
                      <p className="text-sm text-ink-light leading-relaxed border-t border-canvas-line pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
