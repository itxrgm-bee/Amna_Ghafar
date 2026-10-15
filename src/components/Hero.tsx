import { ArrowRight, Scissors, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onOpenTailoring: () => void;
  onSelectCategory: (cat: string) => void;
}

export default function Hero({ onShopNow, onOpenTailoring, onSelectCategory }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5] border-b border-[#ece7df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Brand Prose & Direct Route */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              {/* Clean unboxed metadata kicker */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">
                <span>Summer 2026</span>
                <span aria-hidden="true">·</span>
                <span>The Lawn Edit</span>
                <span aria-hidden="true">·</span>
                <span>Unstitched &amp; Stitched Pret</span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-900 leading-[1.08] mb-6 max-w-xl">
                Whisper-light lawn for radiant summer afternoons.
              </h1>

              <p className="text-base text-neutral-600 font-normal leading-relaxed max-w-lg mb-8">
                Crafted in 80s fine-count Swiss voile, hand-finished Chikankari shadow-work, 
                laser-scalloped organza daman embroideries, and diaphanous pure Bemberg chiffon dupattas. 
                Wear it unstitched or tailored to your bespoke measurements.
              </p>

              {/* Direct Route Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={onShopNow}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#22201d] text-[#fcfbf9] text-xs uppercase tracking-[0.15em] font-medium hover:bg-neutral-800 transition-colors rounded cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenTailoring}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-neutral-300 text-neutral-800 text-xs uppercase tracking-[0.15em] font-medium hover:border-neutral-800 hover:text-neutral-950 transition-colors rounded cursor-pointer bg-white/70"
                >
                  <Scissors className="w-3.5 h-3.5 text-amber-800" />
                  <span>Custom Stitching Guide</span>
                </button>
              </div>

              {/* Quick Category Anchors */}
              <div className="pt-6 border-t border-[#e8e2d8] flex items-center gap-6 text-xs text-neutral-500">
                <span className="font-medium text-neutral-700 tracking-wider uppercase text-[11px]">Quick Jump:</span>
                <div className="flex items-center gap-4 tracking-wide font-medium">
                  <button onClick={() => onSelectCategory('lawn')} className="hover:text-neutral-900 hover:underline">Swiss Lawn</button>
                  <span className="text-neutral-300">/</span>
                  <button onClick={() => onSelectCategory('chikankari')} className="hover:text-neutral-900 hover:underline">Chikankari</button>
                  <span className="text-neutral-300">/</span>
                  <button onClick={() => onSelectCategory('festive_organza')} className="hover:text-neutral-900 hover:underline">Festive Organza</button>
                </div>
              </div>
            </div>

            {/* Editorial Quote note */}
            <div className="mt-8 pt-6 border-t border-dashed border-[#e8e2d8] text-xs text-neutral-500 italic font-serif">
              "A tribute to Lahore’s historic colonial courtyards and the timeless grace of the three-piece Pakistani jora."
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-full min-h-[420px] lg:min-h-[540px] rounded-sm overflow-hidden bg-[#eeeae3] shadow-sm">
              <img
                src="/src/assets/images/hero_summer_lawn_campaign_1792048714135.jpg"
                alt="Pakistani woman wearing luxury pistachio mint embroidered lawn suit with pure silk dupatta in historic architectural courtyard"
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container if needed
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
              {/* Scrim and subtle caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-200">
                  Featured Campaign · Look 01
                </span>
                <h3 className="font-serif-display text-2xl font-light tracking-wide text-white">
                  Gul-e-Bahar Embroidered Lawn
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-sm">
                  80s Swiss Voile with Schiffli Trellis &amp; Bemberg Silk Chiffon Dupatta
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Pillar Trust Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-[#ece7df] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50/70 border border-amber-200/50 rounded text-amber-900 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">80s Swiss Voile</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Finest breathable weave for 40°C+ summer climate</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50/70 border border-amber-200/50 rounded text-amber-900 shrink-0">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Custom Stitching</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Expert tailors for tulip shalwars, cigarette &amp; culottes</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50/70 border border-amber-200/50 rounded text-amber-900 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Cash on Delivery</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Doorstep payment across all major cities of Pakistan</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50/70 border border-amber-200/50 rounded text-amber-900 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Worldwide Express</h4>
              <p className="text-xs text-neutral-500 mt-0.5">3–5 days DHL door-to-door to USA, UK, UAE &amp; Canada</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
