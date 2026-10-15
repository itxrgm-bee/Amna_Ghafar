import { useState } from 'react';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { formatCurrency } from '../data/products';

interface ProductCardProps {
  product: Product;
  currency: CurrencyConfig;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, stitching: 'unstitched' | 'stitched') => void;
}

export default function ProductCard({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedStitchingMode, setSelectedStitchingMode] = useState<'unstitched' | 'stitched'>('unstitched');

  const displayPrice = selectedStitchingMode === 'stitched' 
    ? product.unstitchedPricePKR + product.stitchingAddonPKR 
    : product.unstitchedPricePKR;

  return (
    <div
      className="group flex flex-col bg-white border border-[#ece7df] rounded overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Slot (65-75% height) */}
      <div className="relative aspect-[3/4] w-full bg-[#f4f2ee] overflow-hidden">
        {!imageError ? (
          <img
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#f3efe8]">
            <Sparkles className="w-8 h-8 text-neutral-400 mb-2" />
            <span className="font-serif-display text-lg text-neutral-700">{product.name}</span>
            <span className="text-xs text-neutral-500 mt-1">{product.fabric}</span>
          </div>
        )}

        {/* Quiet, unboxed text kicker tag on image (Rule 1.A: No pill badge sandwich) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isNewArrival && (
            <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-neutral-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 border border-neutral-200/50">
              New Arrival
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-amber-900 bg-amber-50/95 backdrop-blur-xs px-2 py-0.5 border border-amber-200/60">
              Limited Edition
            </span>
          )}
        </div>

        {/* Wishlist Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted
              ? 'bg-amber-900 text-white shadow-sm'
              : 'bg-white/90 text-neutral-700 hover:text-neutral-900 hover:bg-white shadow-xs'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-xs text-neutral-900 text-[11px] uppercase tracking-wider font-semibold hover:bg-white shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={() => onQuickAdd(product, selectedStitchingMode)}
            className="py-2 px-3 bg-[#22201d] text-white text-[11px] uppercase tracking-wider font-semibold hover:bg-black shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title="Add directly to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Metadata & Action Section */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* Unboxed category metadata with subtle separator */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 uppercase tracking-wider font-medium mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block border border-neutral-300 shrink-0"
              style={{ backgroundColor: product.colorHex }}
              title={product.colorName}
            />
            <span className="truncate">{product.categoryLabel}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif-display text-base font-medium text-neutral-900 leading-snug hover:text-amber-950 cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Stitching Option Toggle & Pricing */}
        <div className="mt-4 pt-3 border-t border-[#f0ede6] flex flex-col gap-2">
          {/* Functional segmented control for Unstitched vs Stitched price comparison */}
          <div className="flex items-center p-0.5 bg-[#f6f4ee] rounded text-[11px] font-medium">
            <button
              onClick={() => setSelectedStitchingMode('unstitched')}
              className={`flex-1 py-1 text-center transition-colors rounded-xs ${
                selectedStitchingMode === 'unstitched'
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Unstitched 3-Pc
            </button>
            <button
              onClick={() => setSelectedStitchingMode('stitched')}
              className={`flex-1 py-1 text-center transition-colors rounded-xs ${
                selectedStitchingMode === 'stitched'
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Stitched Pret
            </button>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div className="flex flex-col">
              <span className="font-mono tabular-nums text-sm font-semibold text-neutral-900">
                {formatCurrency(displayPrice, currency)}
              </span>
              <span className="text-[10px] text-neutral-400">
                {selectedStitchingMode === 'stitched' ? 'Tailored to Fit' : 'Fabric 3-Piece'}
              </span>
            </div>

            <button
              onClick={() => onQuickAdd(product, selectedStitchingMode)}
              className="text-xs uppercase tracking-wider font-semibold text-neutral-800 hover:text-amber-900 underline underline-offset-4 cursor-pointer"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
