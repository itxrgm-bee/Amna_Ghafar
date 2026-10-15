import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface PromoBannerProps {
  onExplore: () => void;
}

export default function PromoBanner({ onExplore }: PromoBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#1e1c1a] text-[#f5efe6] px-4 py-2 text-xs transition-all relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center text-center gap-2 overflow-hidden">
          <span className="font-serif italic text-amber-200/90 font-medium tracking-wide">
            Summer '26 Capsule Live
          </span>
          <span className="hidden sm:inline text-neutral-500">·</span>
          <span className="truncate text-neutral-300">
            Complimentary express courier across Pakistan on orders over ₨ 15,000 · Worldwide shipping via DHL
          </span>
          <button 
            onClick={onExplore}
            className="underline underline-offset-2 hover:text-white font-medium ml-1 shrink-0 cursor-pointer"
          >
            Explore Edit
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
