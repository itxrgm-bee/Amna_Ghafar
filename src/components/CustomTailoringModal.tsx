import { useState } from 'react';
import { X, Scissors, Check, HelpCircle, Sparkles } from 'lucide-react';
import { Product, CurrencyConfig, TailoringMeasurements, KurtaCut, TrouserStyle } from '../types';
import { TAILORING_STYLES, formatCurrency } from '../data/products';

interface CustomTailoringModalProps {
  product: Product | null;
  currency: CurrencyConfig;
  isOpen: boolean;
  onClose: () => void;
  onConfirmCustomStitching: (product: Product, measurements: TailoringMeasurements) => void;
}

export default function CustomTailoringModal({
  product,
  currency,
  isOpen,
  onClose,
  onConfirmCustomStitching,
}: CustomTailoringModalProps) {
  if (!isOpen || !product) return null;

  const [kurtaCut, setKurtaCut] = useState<KurtaCut>('straight_slit');
  const [trouserStyle, setTrouserStyle] = useState<TrouserStyle>('cigarette');
  
  // Standard default measurements in inches
  const [kameezLength, setKameezLength] = useState(41);
  const [chestBust, setChestBust] = useState(39);
  const [waist, setWaist] = useState(35);
  const [hip, setHip] = useState(42);
  const [shoulder, setShoulder] = useState(14.5);
  const [sleeveLength, setSleeveLength] = useState(21);
  const [trouserLength, setTrouserLength] = useState(38);
  const [specialNotes, setSpecialNotes] = useState('Attach provided organza cutwork on daman; add pearl buttons along placket.');

  const totalPricePKR = product.unstitchedPricePKR + product.stitchingAddonPKR;

  const handleSubmit = () => {
    const measurements: TailoringMeasurements = {
      kameezLength,
      chestBust,
      waist,
      hip,
      shoulder,
      sleeveLength,
      trouserLength,
      trouserStyle,
      kurtaCut,
      notes: specialNotes,
    };
    onConfirmCustomStitching(product, measurements);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl border border-[#ece7df] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#faf8f5] border-b border-[#ece7df] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100/70 border border-amber-300/60 rounded text-amber-900">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-500">
                Bespoke Atelier Service
              </span>
              <h2 className="font-serif-display text-xl sm:text-2xl text-neutral-900 font-medium leading-tight">
                Master Darzi Custom Tailoring Studio
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Article Info Bar */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-50 border border-neutral-200/80 rounded text-xs">
            <div>
              <span className="text-neutral-400 uppercase text-[10px] tracking-wider block">Selected Article</span>
              <span className="font-serif-display text-base font-semibold text-neutral-900">{product.name}</span>
            </div>
            <div className="text-right">
              <span className="text-neutral-400 uppercase text-[10px] tracking-wider block">Total with Tailoring</span>
              <span className="font-mono tabular-nums text-sm font-bold text-neutral-900">
                {formatCurrency(totalPricePKR, currency)}
              </span>
            </div>
          </div>

          {/* Step 1: Kurta Silhouette Cut */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
              1. Choose Kameez / Kurta Silhouette Cut
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TAILORING_STYLES.kurtaCuts.map((cut) => (
                <button
                  key={cut.id}
                  type="button"
                  onClick={() => setKurtaCut(cut.id as KurtaCut)}
                  className={`p-3 text-left border rounded transition-all cursor-pointer ${
                    kurtaCut === cut.id
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-900">
                    <span>{cut.name}</span>
                    {kurtaCut === cut.id && <Check className="w-3.5 h-3.5 text-amber-900" />}
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1 leading-normal">{cut.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Trouser / Shalwar Style */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
              2. Choose Trouser / Bottom Cut
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TAILORING_STYLES.trouserStyles.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setTrouserStyle(style.id as TrouserStyle)}
                  className={`p-3 text-left border rounded transition-all cursor-pointer ${
                    trouserStyle === style.id
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-900">
                    <span>{style.name}</span>
                    {trouserStyle === style.id && <Check className="w-3.5 h-3.5 text-amber-900" />}
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1 leading-normal">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Exact Body Measurements (Inches) */}
          <div className="p-4 bg-[#faf8f5] border border-[#ece7df] rounded">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                3. Precise Measurements (Inches)
              </label>
              <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Standard Pakistani Tape Measurement
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-sans">Kameez Length</span>
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    step="0.5"
                    min="36"
                    max="48"
                    value={kameezLength}
                    onChange={(e) => setKameezLength(parseFloat(e.target.value) || 40)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-900"
                  />
                  <span className="ml-1 text-neutral-400">in</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-sans">Chest / Bust</span>
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    step="0.5"
                    min="32"
                    max="54"
                    value={chestBust}
                    onChange={(e) => setChestBust(parseFloat(e.target.value) || 38)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-900"
                  />
                  <span className="ml-1 text-neutral-400">in</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-sans">Waist</span>
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    step="0.5"
                    min="26"
                    max="50"
                    value={waist}
                    onChange={(e) => setWaist(parseFloat(e.target.value) || 34)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-900"
                  />
                  <span className="ml-1 text-neutral-400">in</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-sans">Hip Flare</span>
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    step="0.5"
                    min="34"
                    max="56"
                    value={hip}
                    onChange={(e) => setHip(parseFloat(e.target.value) || 42)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-900"
                  />
                  <span className="ml-1 text-neutral-400">in</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-sans">Shoulder</span>
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    step="0.5"
                    min="13"
                    max="18"
                    value={shoulder}
                    onChange={(e) => setShoulder(parseFloat(e.target.value) || 14.5)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-900"
                  />
                  <span className="ml-1 text-neutral-400">in</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-sans">Sleeve Length</span>
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    step="0.5"
                    min="15"
                    max="24"
                    value={sleeveLength}
                    onChange={(e) => setSleeveLength(parseFloat(e.target.value) || 21)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-900"
                  />
                  <span className="ml-1 text-neutral-400">in</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-sans">Trouser Length</span>
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    step="0.5"
                    min="34"
                    max="44"
                    value={trouserLength}
                    onChange={(e) => setTrouserLength(parseFloat(e.target.value) || 38)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-900"
                  />
                  <span className="ml-1 text-neutral-400">in</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-sans">Trouser Bottom Flare</span>
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    readOnly
                    value={trouserStyle === 'culottes' ? 12 : trouserStyle === 'tulip_shalwar' ? 6.5 : 7}
                    className="w-full bg-neutral-100 border border-neutral-300 rounded px-2.5 py-1.5 font-mono text-xs text-neutral-600"
                  />
                  <span className="ml-1 text-neutral-400">in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Special Darzi Instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
              4. Special Embellishment &amp; Stitching Instructions
            </label>
            <textarea
              rows={2}
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="E.g., Include lining in sleeves, keep neckline boat-cut, attach organza laser patch on hem..."
              className="w-full text-xs p-3 bg-white border border-neutral-300 rounded focus:outline-none focus:border-neutral-800 text-neutral-800 placeholder-neutral-400"
            />
          </div>

          {/* Atelier Assurance Box */}
          <div className="p-3 bg-amber-50/60 border border-amber-200/50 rounded flex items-start gap-2.5 text-xs text-amber-950">
            <Sparkles className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <p>
              <strong>Master Darzi Fitting Guarantee:</strong> Every suit includes hand-stitched inner piping, pure cotton lining (astar) where necessary, and high-tensile silk thread seams. Tailoring adds 3–5 working days to delivery.
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#faf8f5] border-t border-[#ece7df] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-900"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#22201d] text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-black rounded shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 text-amber-300" />
            <span>Confirm Custom Tailoring ({formatCurrency(totalPricePKR, currency)})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
