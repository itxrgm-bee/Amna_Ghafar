import { Sparkles, Feather, Scissors, Droplets } from 'lucide-react';

export default function CraftsmanshipSection() {
  const PILLARS = [
    {
      icon: Feather,
      title: '80s Fine Count Swiss Voile',
      description: 'Spun from extra-long staple combed cotton threads with high twist density. Feather-light, crisp against high humidity, and softer with every wash.',
      metric: '80s Combed Voile',
    },
    {
      icon: Sparkles,
      title: 'Schiffli & Hand Shadow-Work',
      description: 'Intricate floral jaals, laser eyelet cutwork, and fine resham needlework crafted by generational artisans in Multan and Lahore.',
      metric: 'Over 120,000 Stitches/Suit',
    },
    {
      icon: Droplets,
      title: 'Colorfast Reactive Dyes',
      description: 'Pastel pistachio, dusty rose, and sunlit buttercup hues dyed with European non-toxic reactive compounds that resist intense sun fading.',
      metric: 'Grade 5 Lightfastness',
    },
    {
      icon: Scissors,
      title: 'Laser Scalloped Borders',
      description: 'Every 3-piece suit includes authentic organza embroidered daman strips, neckline yokes, and sleeve cuff cutwork ready for master stitching.',
      metric: 'Included in All 3-Pc Boxes',
    },
  ];

  return (
    <section className="py-16 bg-[#f7f5ef] border-t border-[#ece7df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-2">
            The Textile Heritage
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-neutral-900 tracking-tight font-normal">
            Anatomy of Authentic Pakistani Summer Lawn
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Pakistani lawn is globally renowned for harmonizing opulent South Asian embroidery with ultra-breathable, cooling woven cotton.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#e8e4dc] p-6 rounded-sm shadow-2xs flex flex-col justify-between hover:border-neutral-400 transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded bg-[#faf8f5] border border-neutral-200/80 flex items-center justify-center text-amber-900 mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif-display text-lg font-medium text-neutral-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Standard</span>
                  <span className="font-semibold text-neutral-800">{pillar.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lahore Atelier note */}
        <div className="mt-12 text-center text-xs text-neutral-500 max-w-xl mx-auto border-t border-[#e8e4dc] pt-6 font-serif italic">
          "Designed in our Lahore Design House, woven in Faisalabad mills, and shipped directly to discerning wardrobes across 38 countries."
        </div>

      </div>
    </section>
  );
}
