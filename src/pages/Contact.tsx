import { useState } from 'react';
import { Instagram, MessageCircle, Mail, Clock, Send } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { brandInfo, heroImages } from '@/data/site';
import { buildWhatsAppLink, generalEnquiryMessage } from '@/utils/whatsapp';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      'Hi The Petal & Bloom! I have an enquiry.',
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      product && `Product of interest: ${product}`,
      message && `Message: ${message}`,
    ].filter(Boolean);
    const link = buildWhatsAppLink(parts.join('\n'));
    window.open(link, '_blank');
  };

  return (
    <div>
      <PageHeader
        label="Contact"
        title={<>Start an order</>}
        subtitle="Message us on WhatsApp for the fastest response, or send us an enquiry below. We typically reply within a few hours during business hours."
        image={heroImages.secondary}
      />

      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact methods */}
            <Reveal>
              <h2 className="heading-serif text-3xl mb-6">Get in touch</h2>
              <div className="space-y-5">
                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-5 bg-cream-100 rounded-sm">
                  <div className="w-11 h-11 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} className="text-[#25D366]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-brown-800">WhatsApp</h3>
                    <p className="text-sm text-brown-400 mt-1">The fastest way to reach us. Order, enquire, or ask anything.</p>
                    <a
                      href={buildWhatsAppLink(generalEnquiryMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-terracotta-500 hover:text-terracotta-600 mt-2 inline-block link-underline"
                    >
                      Message on WhatsApp →
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4 p-5 bg-cream-100 rounded-sm">
                  <div className="w-11 h-11 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <Instagram size={20} className="text-rose-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-brown-800">Instagram</h3>
                    <p className="text-sm text-brown-400 mt-1">Follow our latest blooms and share your gifts with us.</p>
                    <a
                      href={brandInfo.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-terracotta-500 hover:text-terracotta-600 mt-2 inline-block link-underline"
                    >
                      {brandInfo.instagram} →
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-5 bg-cream-100 rounded-sm">
                  <div className="w-11 h-11 rounded-full bg-sage-200 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-sage-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-brown-800">Email</h3>
                    <p className="text-sm text-brown-400 mt-1">
                      Email address coming soon. For now, please reach us on WhatsApp or Instagram.
                    </p>
                    <span className="text-sm text-brown-300 mt-2 inline-block">Coming soon</span>
                  </div>
                </div>

                {/* Business hours */}
                <div className="flex items-start gap-4 p-5 bg-cream-100 rounded-sm">
                  <div className="w-11 h-11 rounded-full bg-gold-200 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-gold-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-brown-800">Business hours</h3>
                    <p className="text-sm text-brown-400 mt-1">{brandInfo.businessHours}</p>
                    <p className="text-xs text-brown-300 mt-1">{brandInfo.responseTime}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Enquiry form */}
            <Reveal delay={150}>
              <div className="bg-cream-100 p-6 lg:p-8 rounded-sm border border-cream-300">
                <h2 className="heading-serif text-2xl mb-2">Send an enquiry</h2>
                <p className="text-sm text-brown-400 mb-6">
                  Fill in the form and we will open a WhatsApp chat with your details pre-filled.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">Your name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">Email (optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">Product of interest (optional)</label>
                    <input
                      type="text"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      placeholder="e.g. Trio of Petals, Custom Bouquet"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you are looking for..."
                      rows={4}
                      className="input-field resize-none"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    <Send size={16} />
                    Send enquiry
                  </button>
                </form>
                <div className="mt-4 pt-4 border-t border-cream-300">
                  <p className="text-xs text-brown-400 text-center mb-3">Or reach us directly</p>
                  <WhatsAppButton message={generalEnquiryMessage()} label="Order on WhatsApp" className="w-full" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
