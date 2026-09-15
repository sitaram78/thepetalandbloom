import { Droplets, Sun, Wind, Sparkles, Hand, AlertCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useSiteAssets, getDynamicAsset } from '@/context/SiteAssetsContext';
import { SITE_ASSET_KEYS } from '@/utils/siteAssetKeys';
import SEO from '@/components/SEO';

const careTips = [
  { icon: Droplets, title: 'Keep away from water', desc: 'Crochet flowers are not waterproof. Keep them away from water, rain, and high humidity areas.' },
  { icon: Wind, title: 'Keep away from excessive dust', desc: 'Dust can settle into the yarn fibres over time. Display in a clean, sheltered spot when possible.' },
  { icon: Sun, title: 'Avoid prolonged direct sunlight', desc: 'Extended sun exposure may fade yarn colours over time. Indirect light is best for display.' },
  { icon: Sparkles, title: 'Store carefully when not displayed', desc: 'When storing, place in a dry, clean box or bag. Avoid crushing or folding the petals.' },
  { icon: Hand, title: 'Use gentle cleaning methods', desc: 'If needed, use a soft brush or a light dust. Do not machine wash, soak, or use harsh cleaners.' },
  { icon: AlertCircle, title: 'Do not pull loose threads', desc: 'If a thread comes loose, tuck it back gently. Do not pull — pulling can unravel the stitch.' },
];

export default function CareGuide() {
  const { assets } = useSiteAssets();
  return (
    <div className="bg-linen min-h-screen">
      <SEO
        title="Care Guide — The Petal & Bloom"
        description="Learn how to maintain and preserve your handmade crochet blooms so they stay beautiful for years."
        canonicalPath="/care-guide"
      />

      {/* Atelier Care Header */}
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-20">
        <div className="container-lux grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="font-serif italic text-sm text-rose mb-3 block uppercase tracking-widest">Care Guide</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-bark leading-tight mb-6">
              Keep your bloom <br />beautiful.
            </h1>
            <p className="text-ink-light text-base sm:text-lg max-w-2xl leading-relaxed">
              A little care goes a long way. Follow these simple steps and your handmade bloom will stay beautiful for years.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[16/9] rounded-atelier-img overflow-hidden shadow-soft">
              <img
                src={getDynamicAsset(assets, SITE_ASSET_KEYS.CARE_GUIDE_HERO)}
                alt="Care guide illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-linen">
        <div className="container-lux">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careTips.map((tip, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-canvas p-8 rounded-atelier-panel border border-canvas-line shadow-soft h-full transition-all duration-500 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-linen flex items-center justify-center mb-6 text-rose shadow-sm">
                    <tip.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-bark mb-3">{tip.title}</h3>
                  <p className="text-sm text-ink-light leading-relaxed">{tip.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 bg-bark-dark p-12 lg:p-16 rounded-atelier-panel text-center shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img src={getDynamicAsset(assets, SITE_ASSET_KEYS.CARE_GUIDE_BG)} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <h3 className="font-serif text-3xl lg:text-4xl text-linen mb-6">
                Made to last. Made to stay.
              </h3>
              <p className="text-linen/70 max-w-xl mx-auto text-lg font-light leading-relaxed">
                With a little care, your handmade crochet bloom will keep its shape, colour, and softness for years —
                long after fresh flowers would have faded.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
