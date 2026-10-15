import { useState } from 'react';
import { X, Check, Heart, Scissors, Sparkles, Truck, ShieldCheck, Ruler } from 'lucide-react';
import { Product, CurrencyConfig, StitchingOption, StandardSize, TailoringMeasurements } from '../types';
import { formatCurrency, STANDARD_SIZES } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  currency: CurrencyConfig;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (
    product: Product,
    stitching: StitchingOption,
    size?: StandardSize,
    customMeasurements?: TailoringMeasurements,
    quantity?: number
  ) => void;
  onOpenCustomTailoring: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  currency,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenCustomTailoring,
}: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [stitching, setStitching] = useState<StitchingOption>('unstitched');
  const [selectedSize, setSelectedSize] = useState<StandardSize>('M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const unitPrice = stitching === 'stitched' 
    ? product.unstitchedPricePKR + product.stitchingAddonPKR 
    : product.unstitchedPricePKR;

  const handleAdd = () => {
    onAddToCart(product, stitching, stitching === 'stitched' ? selectedSize : undefined, undefined, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-sm shadow-2xl border border-[#ece7df] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-neutral-600 hover:text-neutral-950 hover:bg-white shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-[#f7f5f0] p-6 flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full rounded overflow-hidden bg-neutral-200 shadow-xs">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => onToggleWishlist(product)}
                className={`absolute top-3 left-3 p-2 rounded-full transition-colors ${
                  isWishlisted ? 'bg-amber-900 text-white' : 'bg-white/90 text-neutral-700 hover:bg-white'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail switcher if secondary image exists */}
            {product.secondaryImage && (
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-14 h-18 rounded overflow-hidden border-2 transition-all ${
                    activeImage === product.image ? 'border-neutral-900 scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.image} alt="Primary angle" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-14 h-18 rounded overflow-hidden border-2 transition-all ${
                    activeImage === product.secondaryImage ? 'border-neutral-900 scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.secondaryImage} alt="Secondary angle" className="w-full h-full object-cover" />
                </button>
              </div>
            )}

            {/* Quick authenticity seal */}
            <div className="mt-4 pt-3 border-t border-[#e8e4dc] flex items-center justify-between text-[11px] text-neutral-500">
              <span className="font-mono">SKU: {product.sku}</span>
              <span className="font-medium text-emerald-800">100% Authentic Pakistani Lawn</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Unboxed category metadata */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500 font-medium mb-1">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-900 font-semibold">{product.colorName}</span>
              </div>

              <h2 className="font-serif-display text-2xl sm:text-3xl font-medium text-neutral-950 leading-snug">
                {product.name}
              </h2>

              {/* Price Display */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-mono tabular-nums text-2xl font-bold text-neutral-900">
                  {formatCurrency(unitPrice * quantity, currency)}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-neutral-400 font-mono">
                    ({formatCurrency(unitPrice, currency)} each)
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Stitching Selection Module */}
              <div className="mt-6 pt-5 border-t border-[#ece7df]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
                  Select Stitching Format:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setStitching('unstitched')}
                    className={`p-3 text-left border rounded transition-all cursor-pointer ${
                      stitching === 'unstitched'
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-[#dfdad1] hover:border-neutral-400'
                    }`}
                  >
                    <div className="font-medium text-xs text-neutral-900">Unstitched 3-Piece</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Complete unstitched fabric box with patches</div>
                    <div className="font-mono text-xs font-semibold text-neutral-800 mt-1">
                      {formatCurrency(product.unstitchedPricePKR, currency)}
                    </div>
                  </button>

                  <button
                    onClick={() => setStitching('stitched')}
                    className={`p-3 text-left border rounded transition-all cursor-pointer ${
                      stitching === 'stitched'
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-[#dfdad1] hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-neutral-900">Stitched RTW Pret</span>
                      <span className="text-[10px] text-amber-800 uppercase font-bold">+ Tailoring</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Lined, piped &amp; finished by master darzi</div>
                    <div className="font-mono text-xs font-semibold text-neutral-800 mt-1">
                      {formatCurrency(product.unstitchedPricePKR + product.stitchingAddonPKR, currency)}
                    </div>
                  </button>
                </div>
              </div>

              {/* Size Selection (if Stitched) */}
              {stitching === 'stitched' && (
                <div className="mt-4 p-3.5 bg-[#fbfaf6] border border-[#e8e4dc] rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800">Standard Size:</span>
                    <button
                      onClick={() => setShowSizeChart(!showSizeChart)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-900 hover:underline cursor-pointer"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>{showSizeChart ? 'Hide Chart' : 'View Size Chart'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {(['XS', 'S', 'M', 'L', 'XL'] as StandardSize[]).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`flex-1 py-1.5 text-xs font-semibold border rounded transition-colors ${
                          selectedSize === sz
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-800'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  {/* Size Chart Drawer view */}
                  {showSizeChart && (
                    <div className="pt-2 text-xs border-t border-neutral-200">
                      <table className="w-full text-left font-mono text-[11px] tabular-nums">
                        <thead>
                          <tr className="text-neutral-400 border-b border-neutral-200">
                            <th className="py-1">Size</th>
                            <th className="py-1">Chest</th>
                            <th className="py-1">Length</th>
                            <th className="py-1">Hip</th>
                          </tr>
                        </thead>
                        <tbody>
                          {STANDARD_SIZES.map((row) => (
                            <tr key={row.size} className={`border-b border-neutral-100 ${selectedSize === row.size ? 'font-bold text-amber-900 bg-amber-50/50' : 'text-neutral-600'}`}>
                              <td className="py-1">{row.size}</td>
                              <td className="py-1">{row.chest}</td>
                              <td className="py-1">{row.length}</td>
                              <td className="py-1">{row.hip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Bespoke Tailoring Link */}
                  <div className="pt-2 border-t border-dashed border-[#dfdad1] flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500">Need specific custom measurements?</span>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenCustomTailoring(product);
                      }}
                      className="text-[11px] text-amber-900 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                    >
                      <Scissors className="w-3 h-3" />
                      <span>Custom Fit Studio</span>
                    </button>
                  </div>
                </div>
              )}

              {/* What's Included in the 3-Piece Box */}
              <div className="mt-5 pt-4 border-t border-[#ece7df]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
                  What's In The Ensemble:
                </h4>
                <ul className="text-xs text-neutral-600 space-y-1.5 pl-1">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong className="text-neutral-900">Kameez / Shirt:</strong> {product.pieces.shirt}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong className="text-neutral-900">Dupatta:</strong> {product.pieces.dupatta}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong className="text-neutral-900">Trouser:</strong> {product.pieces.trouser}</span>
                  </li>
                  {product.pieces.embroideryPatches.map((patch, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-neutral-500">
                      <Sparkles className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                      <span>{patch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Add-to-Bag Controls */}
            <div className="mt-6 pt-5 border-t border-[#ece7df] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-neutral-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-600 hover:text-neutral-950 font-mono text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-semibold tabular-nums text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-neutral-600 hover:text-neutral-950 font-mono text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 bg-[#22201d] text-[#fcfbf9] text-xs uppercase tracking-[0.15em] font-medium hover:bg-black transition-colors rounded shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className={`w-3.5 h-3.5 ${addedNotice ? 'text-amber-300' : 'hidden'}`} />
                  <span>{addedNotice ? 'Added to Bag!' : `Add to Bag · ${formatCurrency(unitPrice * quantity, currency)}`}</span>
                </button>
              </div>

              {/* Delivery info */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-neutral-400" />
                  COD in Pakistan (2-4 days)
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-neutral-400" />
                  DHL Worldwide Express
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
