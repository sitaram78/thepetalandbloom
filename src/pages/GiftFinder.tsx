import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Gift, Heart, Users, Sparkles, PartyPopper, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useProducts } from '@/context/ProductContext';
import { formatPrice } from '@/data/products';
import { heroImages } from '@/data/site';
import { giftFinderMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

const occasions = ['Birthday', 'Anniversary', 'Friendship', 'Festival', 'Just Because'];
const recipients = ['Partner', 'Friend', 'Mother', 'Sibling', 'Other'];
const budgets = [
  { label: 'Under ₹300', min: 0, max: 299 },
  { label: '₹300 – ₹500', min: 300, max: 500 },
  { label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 – ₹1,500', min: 1000, max: 1500 },
  { label: '₹1,500+', min: 1500, max: 99999 },
];

export default function GiftFinder() {
  const { products, loading } = useProducts();
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState('');
  const [recipient, setRecipient] = useState('');
  const [budget, setBudget] = useState('');

  const recommendations = useMemo(() => {
    if (!occasion || !recipient || !budget) return [];
    const budgetObj = budgets.find((b) => b.label === budget);
    if (!budgetObj) return [];

    return products
      .filter((p) => {
        const inBudget = p.price >= budgetObj.min && p.price <= budgetObj.max;
        const matchesOccasion = p.occasions?.some((o) =>
          o.toLowerCase().includes(occasion.toLowerCase()) ||
          occasion.toLowerCase().includes(o.toLowerCase())
        );
        return inBudget && (matchesOccasion || !p.occasions?.length);
      })
      .sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0))
      .slice(0, 4);
  }, [products, occasion, recipient, budget]);

  const isComplete = step === 3;

  const handleStart = () => {
    setStep(0);
    trackEvent('gift_finder_started');
  };

  const handleComplete = () => {
    setStep(3);
    trackEvent('gift_finder_completed', { occasion, recipient, budget });
  };

  const reset = () => {
    setStep(0);
    setOccasion('');
    setRecipient('');
    setBudget('');
  };

  const steps = ['Occasion', 'Recipient', 'Budget', 'Results'];
  const canProceed = step === 0 ? !!occasion : step === 1 ? !!recipient : step === 2 ? !!budget : true;

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-silk" />
          <p className="font-serif text-ink text-lg">Finding the perfect gift...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-parchment-50">
      <PageHeader
        label="Gift Finder"
        title={<>Help me choose a gift</>}
        subtitle="Not sure where to start? Answer three quick questions and we'll suggest the perfect bloom."
        image={heroImages.giftBox}
      />

      <section className="py-16 lg:py-24 bg-parchment-50">
        <div className="container-lux max-w-2xl">
          {/* Progress indicator */}
          {step < 3 && (
            <div className="flex items-center justify-center gap-2 mb-10">
              {steps.slice(0, 3).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      i < step
                        ? 'bg-sage-600 text-parchment-50'
                        : i === step
                        ? 'bg-terracotta-500 text-cream-50'
                        : 'bg-cream-200 text-brown-400'
                    }`}
                  >
                    {i < step ? <Check size={14} strokeWidth={2.5} /> : i + 1}
                  </div>
                  {i < 2 && <div className={`w-12 h-px ${i < step ? 'bg-sage-500' : 'bg-cream-300'}`} />}
                </div>
              ))}
            </div>
          )}

          {/* Step 0: Occasion */}
          {step === 0 && (
            <Reveal>
              <p className="section-label text-center mb-3">Step 1 of 3</p>
              <h2 className="heading-serif text-3xl text-center mb-8">What's the occasion?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setOccasion(occ)}
                    className={`p-5 rounded-sm border text-center transition-all duration-300 ${
                      occasion === occ
                        ? 'bg-brown-700 text-cream-50 border-brown-700'
                        : 'bg-cream-100 text-brown-700 border-cream-300 hover:border-terracotta-400'
                    }`}
                  >
                    <span className="font-serif text-lg">{occ}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {/* Step 1: Recipient */}
          {step === 1 && (
            <Reveal>
              <p className="section-label text-center mb-3">Step 2 of 3</p>
              <h2 className="heading-serif text-3xl text-center mb-8">Who is it for?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {recipients.map((rec) => (
                  <button
                    key={rec}
                    onClick={() => setRecipient(rec)}
                    className={`p-5 rounded-sm border text-center transition-all duration-300 ${
                      recipient === rec
                        ? 'bg-brown-700 text-cream-50 border-brown-700'
                        : 'bg-cream-100 text-brown-700 border-cream-300 hover:border-terracotta-400'
                    }`}
                  >
                    <span className="font-serif text-lg">{rec}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {/* Step 2: Budget */}
          {step === 2 && (
            <Reveal>
              <p className="section-label text-center mb-3">Step 3 of 3</p>
              <h2 className="heading-serif text-3xl text-center mb-8">What's your budget?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgets.map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setBudget(b.label)}
                    className={`p-5 rounded-sm border text-center transition-all duration-300 ${
                      budget === b.label
                        ? 'bg-brown-700 text-cream-50 border-brown-700'
                        : 'bg-cream-100 text-brown-700 border-cream-300 hover:border-terracotta-400'
                    }`}
                  >
                    <span className="font-serif text-lg">{b.label}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {/* Navigation buttons */}
          {step < 3 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0}
                className={`btn-secondary ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <ArrowLeft size={16} /> Back
              </button>
              {step < 2 ? (
                <button
                  onClick={() => canProceed && setStep(step + 1)}
                  disabled={!canProceed}
                  className={`btn-primary ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => canProceed && handleComplete()}
                  disabled={!canProceed}
                  className={`btn-primary ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  See recommendations <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}

          {/* Results */}
          {isComplete && (
            <Reveal>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-sage-200 flex items-center justify-center mx-auto mb-4">
                  <PartyPopper size={28} className="text-sage-700" strokeWidth={1.5} />
                </div>
                <h2 className="heading-serif text-3xl mb-2">Here's what we found</h2>
                <p className="text-sm text-brown-500">
                  For a {occasion.toLowerCase()} gift for your {recipient.toLowerCase()}, {budget.toLowerCase()}
                </p>
              </div>

              {recommendations.length > 0 ? (
                <div className="grid grid-cols-2 gap-5">
                  {recommendations.map((p) => (
                    <ProductCard key={p.code} product={p} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-cream-100 rounded-sm">
                  <p className="font-serif text-xl text-brown-600 mb-2">No blooms found in that range.</p>
                  <p className="text-sm text-brown-400 mb-4">We couldn't find a perfect match for those filters.</p>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={reset} className="btn-secondary">
                  Start over
                </button>
                <WhatsAppButton
                  message={giftFinderMessage({ occasion, recipient, budget })}
                  label="Need help choosing? Ask on WhatsApp"
                  className="flex-1"
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}
