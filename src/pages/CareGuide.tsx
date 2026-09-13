import { Droplets, Sun, Wind, Sparkles, Hand, AlertCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { heroImages } from '@/data/site';

const careTips = [
  { icon: Droplets, title: 'Keep away from water', desc: 'Crochet flowers are not waterproof. Keep them away from water, rain, and high humidity areas.' },
  { icon: Wind, title: 'Keep away from excessive dust', desc: 'Dust can settle into the yarn fibres over time. Display in a clean, sheltered spot when possible.' },
  { icon: Sun, title: 'Avoid prolonged direct sunlight', desc: 'Extended sun exposure may fade yarn colours over time. Indirect light is best for display.' },
  { icon: Sparkles, title: 'Store carefully when not displayed', desc: 'When storing, place in a dry, clean box or bag. Avoid crushing or folding the petals.' },
  { icon: Hand, title: 'Use gentle cleaning methods', desc: 'If needed, use a soft brush or a light dust. Do not machine wash, soak, or use harsh cleaners.' },
  { icon: AlertCircle, title: 'Do not pull loose threads', desc: 'If a thread comes loose, tuck it back gently. Do not pull — pulling can unravel the stitch.' },
];

export default function CareGuide() {
  return (
    <div className="bg-parchment-50">
      <PageHeader
        label="Care Guide"
        title={<>Keep your bloom beautiful</>}
        subtitle="A little care goes a long way. Follow these simple steps and your handmade bloom will stay beautiful for years."
        image={heroImages.secondary}
      />

      <section className="py-16 lg:py-24 bg-parchment-50">
        <div className="container-lux">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careTips.map((tip, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="glass-panel p-8 rounded-sm border border-silk shadow-soft h-full transition-all duration-500 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-silk flex items-center justify-center mb-6 text-rose shadow-sm">
                    <tip.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-3">{tip.title}</h3>
                  <p className="text-sm text-ink-light leading-relaxed">{tip.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 bg-forest p-12 lg:p-16 rounded-sm text-center shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img src={heroImages.texture} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <h3 className="font-serif text-3xl lg:text-4xl text-parchment-50 mb-6">
                Made to last. Made to stay.
              </h3>
              <p className="text-parchment-100/70 max-w-xl mx-auto text-lg font-light leading-relaxed">
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
