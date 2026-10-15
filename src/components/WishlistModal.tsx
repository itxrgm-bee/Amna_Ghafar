import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { formatCurrency } from '../data/products';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  currency: CurrencyConfig;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, stitching: 'unstitched' | 'stitched') => void;
  onExplore: () => void;
}

export default function WishlistModal({
  isOpen,
  onClose,
  products,
  wishlistIds,
  currency,
  onToggleWishlist,
  onQuickAdd,
  onExplore,
}: WishlistModalProps) {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#ece7df] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ece7df] flex items-center justify-between bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber-900 fill-amber-900" />
            <h2 className="font-serif-display text-xl font-medium text-neutral-900">Saved Wishlist</h2>
            <span className="font-mono text-xs text-neutral-400">({wishlistedProducts.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400 space-y-4">
              <Heart className="w-12 h-12 stroke-1 text-neutral-300" />
              <div>
                <h3 className="font-serif-display text-xl text-neutral-700">No saved favorites</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Click the heart icon on any summer lawn or pret article to curate your personal wardrobe wishlist.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="px-5 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-800 transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-3.5 pb-4 border-b border-[#f0ece5] last:border-none"
              >
                {/* Thumbnail */}
                <div className="w-20 h-26 bg-[#f4f2ee] rounded overflow-hidden shrink-0 border border-neutral-200/60">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif-display text-sm font-semibold text-neutral-900 leading-tight">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onToggleWishlist(product)}
                        className="text-neutral-400 hover:text-red-700 transition-colors p-0.5"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-neutral-500 mt-1">
                      <span>{product.colorName}</span> · <span>{product.fabric}</span>
                    </div>

                    <div className="font-mono tabular-nums text-xs font-semibold text-neutral-900 mt-1">
                      {formatCurrency(product.unstitchedPricePKR, currency)}
                    </div>
                  </div>

                  {/* Add to bag action */}
                  <div className="pt-2">
                    <button
                      onClick={() => onQuickAdd(product, 'unstitched')}
                      className="w-full py-1.5 px-3 bg-neutral-900 text-white text-[11px] uppercase tracking-wider font-semibold rounded hover:bg-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-4 border-t border-[#ece7df] bg-[#faf8f5]">
            <button
              onClick={() => {
                // Add all to bag as unstitched
                wishlistedProducts.forEach((p) => onQuickAdd(p, 'unstitched'));
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-[#22201d] text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-black rounded transition-colors text-center"
            >
              Move All to Bag ({wishlistedProducts.length} items)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
