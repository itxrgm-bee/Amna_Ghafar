import { useState } from 'react';
import { Mail, Check, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenTailoring: () => void;
  onOpenDrapeStudio: () => void;
}

export default function Footer({ onSelectCategory, onOpenTailoring, onOpenDrapeStudio }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#1e1c1a] text-[#f4efe8] border-t border-[#33302c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#33302c]">
          
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif-display text-2xl tracking-[0.2em] font-medium text-white uppercase block">
              GUL-E-NOOR
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Celebrating the romantic poetry of Pakistani summer textiles. From 80s Swiss voile lawn to heritage Chikankari needlework, tailored with master craftsmanship and shipped to 38 countries worldwide.
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Flagship: MM Alam Road, Gulberg III, Lahore</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Client Concierge: +92 (42) 3578-9100</span>
              </div>
            </div>
          </div>

          {/* Quick Collections (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Summer '26 Capsules
            </h4>
            <ul className="text-xs text-neutral-400 space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('lawn')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Luxury Swiss Lawn (3-Piece)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('chikankari')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Handcrafted Chikankari &amp; Shadow Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('festive_organza')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Festive Organza &amp; Cotton Net
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('luxury_pret')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Ready-to-Wear Pret Kurtas &amp; Culottes
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTailoring}
                  className="hover:text-amber-200 transition-colors text-amber-300/90"
                >
                  Bespoke Darzi Tailoring Studio
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDrapeStudio}
                  className="hover:text-amber-200 transition-colors"
                >
                  Dupatta Draping Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Locations (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Boutiques
            </h4>
            <ul className="text-xs text-neutral-400 space-y-1.5 font-sans">
              <li>Gulberg III, Lahore</li>
              <li>Clifton Block 4, Karachi</li>
              <li>F-7 Markaz, Islamabad</li>
              <li>Jumeirah 1, Dubai</li>
              <li>Knightsbridge, London</li>
            </ul>
          </div>

          {/* Newsletter Column (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              The Lawn Journal
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Receive private preview invitations for upcoming midsummer lawn drops and Eid festive collections.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-[#2b2825] border border-[#443f3a] text-white rounded focus:outline-none focus:border-amber-400 placeholder-neutral-500"
                />
                <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#d4af37] text-neutral-950 text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#c29f2f] transition-colors"
              >
                {subscribed ? 'Subscribed with Pleasure' : 'Join Privilege List'}
              </button>
            </form>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>© 2026 Gul-e-Noor Atelier. Authentic Pakistani Summer Wear. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Cash on Delivery (Pakistan)</span>
            <span>·</span>
            <span>DHL Express Worldwide</span>
            <span>·</span>
            <span>14-Day Exchange Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
