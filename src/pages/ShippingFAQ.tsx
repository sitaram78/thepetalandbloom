import { useState } from 'react';
import { Plus, Minus, Truck, Clock, Package } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { faqs, heroImages } from '@/data/site';
import { formatPrice } from '@/data/products';

export default function ShippingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-parchment-50">
      <PageHeader
        label="Shipping & FAQ"
        title={<>Everything you need to know</>}
        subtitle="Shipping details, preparation times, and answers to the questions we hear most often."
        image={heroImages.giftBox}
      />

      {/* Shipping */}
      <section className="py-16 lg:py-24 bg-parchment-50">
        <div className="container-lux">
          <Reveal>
            <h2 className="heading-serif text-4xl lg:text-5xl mb-4">Pan-India delivery</h2>
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
                <div className={`p-8 rounded-sm h-full transition-all duration-500 shadow-sm border ${
                  tier.cost === 'FREE' ? 'bg-sage-light border-sage-dark text-sage-dark' : 'bg-silk/50 border-silk text-ink'
                }`}>
                  <tier.icon size={28} strokeWidth={1.5} className={tier.cost === 'FREE' ? 'text-sage-dark' : 'text-rose'} />
                  <p className="text-xs uppercase tracking-widest mt-6 mb-2 opacity-60 font-semibold">{tier.range}</p>
                  <p className={`font-serif text-4xl mb-2 ${tier.cost === 'FREE' ? 'text-sage-dark' : 'text-ink'}`}>
                    {tier.cost === 'FREE' ? 'FREE' : formatPrice(parseInt(tier.cost.replace(/[^\d]/g, '')))}
                  </p>
                  <p className="text-xs opacity-70">{tier.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 glass-panel p-8 rounded-sm border border-silk shadow-soft">
            <p className="text-sm text-ink-light leading-relaxed">
              <span className="font-semibold text-ink">Preparation time varies by product.</span> Individual flowers take 3–5 days.
              Bouquets take 4–7 days. Custom orders may take 5–10 days. We will always confirm your timeline when you place an order.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-silk/30">
        <div className="container-lux max-w-3xl">
          <Reveal>
            <h2 className="heading-serif text-4xl lg:text-5xl mb-4">Frequently asked questions</h2>
            <p className="text-ink-light mb-12 text-lg font-light">If you don't find your answer here, message us on WhatsApp — we are happy to help.</p>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="glass-panel rounded-sm border border-silk overflow-hidden shadow-sm transition-all duration-300">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-6 text-left"
                  >
                    <span className="font-serif text-xl text-ink pr-4">{faq.question}</span>
                    {openIndex === i ? (
                      <Minus size={20} className="text-rose flex-shrink-0" strokeWidth={1.5} />
                    ) : (
                      <Plus size={20} className="text-ink-light flex-shrink-0" strokeWidth={1.5} />
                    )}
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <p className="text-sm text-ink-light leading-relaxed border-t border-silk pt-4">
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
