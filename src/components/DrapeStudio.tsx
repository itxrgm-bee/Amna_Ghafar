import { useState } from 'react';
import { DRAPING_STYLES } from '../data/products';
import { Sparkles, Check, ChevronRight } from 'lucide-react';

interface DrapeStudioProps {
  onShopCollection: () => void;
}

export default function DrapeStudio({ onShopCollection }: DrapeStudioProps) {
  const [activeDrapeIndex, setActiveDrapeIndex] = useState(0);
  const currentDrape = DRAPING_STYLES[activeDrapeIndex];

  return (
    <section id="drape-studio" className="py-16 bg-[#faf8f5] border-t border-[#ece7df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-2">
            The Styling Atelier
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-neutral-900 tracking-tight font-normal">
            The Art of the Pakistani Summer Dupatta Drape
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            A diaphanous 2.5-meter pure silk chiffon or organza dupatta defines the poise of a Pakistani summer ensemble. Explore three timeless styling rituals.
          </p>
        </div>

        {/* Interactive Drape Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#ece7df] rounded p-6 sm:p-10 shadow-xs">
          
          {/* Left Column: Style Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
              Select Draping Technique:
            </span>
            {DRAPING_STYLES.map((drape, idx) => (
              <button
                key={drape.id}
                onClick={() => setActiveDrapeIndex(idx)}
                className={`w-full text-left p-4 rounded border transition-all cursor-pointer ${
                  activeDrapeIndex === idx
                    ? 'border-neutral-900 bg-[#faf8f5] shadow-xs ring-1 ring-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif-display text-base font-semibold text-neutral-950">
                    {drape.title}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-amber-900 font-semibold">
                    {drape.occasion}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                  {drape.subtitle} — {drape.description}
                </p>
              </button>
            ))}
          </div>

          {/* Right Column: Active Drape Visual & Step-by-Step Guide */}
          <div className="lg:col-span-7 bg-[#faf8f5] border border-[#e8e4dc] p-6 sm:p-8 rounded space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ece7df] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-amber-900">
                  Recommended For: {currentDrape.occasion}
                </span>
                <h3 className="font-serif-display text-2xl font-medium text-neutral-900 mt-0.5">
                  {currentDrape.title}
                </h3>
              </div>
              <div className="p-2 bg-white rounded border border-neutral-200/80 text-xs font-mono text-neutral-600 shrink-0">
                2.5m Pure Silk / Organza
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {currentDrape.description}
            </p>

            {/* Steps */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>How to Style This Drape:</span>
              </h4>
              <ol className="space-y-2.5 text-xs text-neutral-700">
                {currentDrape.steps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Bottom link to shop suits matching this drape */}
            <div className="pt-4 border-t border-[#ece7df] flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Pairs best with Swiss Lawn 3-Piece ensembles
              </span>
              <button
                onClick={onShopCollection}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-amber-950 underline underline-offset-4 flex items-center gap-1 cursor-pointer"
              >
                <span>View Lawn Suits</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
