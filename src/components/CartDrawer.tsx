import { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Scissors, Truck } from 'lucide-react';
import { CartItem, CurrencyConfig } from '../types';
import { formatCurrency } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyConfig;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onExplore: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExplore,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  // Calculate totals in base PKR
  const subtotalPKR = items.reduce((acc, item) => acc + item.pricePerItemPKR * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD_PKR = 15000;
  const isFreeShipping = subtotalPKR >= FREE_SHIPPING_THRESHOLD_PKR;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_PKR - subtotalPKR);
  const progressPct = Math.min(100, Math.round((subtotalPKR / FREE_SHIPPING_THRESHOLD_PKR) * 100));

  const discountAmountPKR = appliedPromo ? Math.round(subtotalPKR * (appliedPromo.discountPct / 100)) : 0;
  const shippingFeePKR = isFreeShipping || items.length === 0 ? 0 : 650;
  const grandTotalPKR = Math.max(0, subtotalPKR - discountAmountPKR + shippingFeePKR);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'SUMMERNOOR' || clean === 'EID26' || clean === 'GUL10') {
      setAppliedPromo({ code: clean, discountPct: 10 });
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try "SUMMERNOOR" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#ece7df] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ece7df] flex items-center justify-between bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-neutral-800" />
            <h2 className="font-serif-display text-xl font-medium text-neutral-900">Your Shopping Bag</h2>
            <span className="font-mono text-xs text-neutral-400">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="px-5 py-3 bg-[#f7f5ef] border-b border-[#e8e4dc]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-neutral-800">
              <Truck className="w-3.5 h-3.5 text-amber-800" />
              {isFreeShipping ? (
                <span className="text-emerald-800 font-semibold">You unlocked Free Express Shipping!</span>
              ) : (
                <span>Add {formatCurrency(amountToFreeShipping, currency)} for Free Express Delivery</span>
              )}
            </span>
            <span className="font-mono tabular-nums text-[11px] text-neutral-500">{progressPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${isFreeShipping ? 'bg-emerald-600' : 'bg-amber-800'}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400 space-y-4">
              <ShoppingBag className="w-12 h-12 stroke-1 text-neutral-300" />
              <div>
                <h3 className="font-serif-display text-xl text-neutral-700">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Explore our Summer '26 Swiss Lawn, Handcrafted Chikankari, and Festive Organza capsules.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="px-5 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-800 transition-colors"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-3.5 pb-4 border-b border-[#f0ece5] last:border-none"
              >
                {/* Thumbnail */}
                <div className="w-20 h-26 bg-[#f4f2ee] rounded overflow-hidden shrink-0 border border-neutral-200/60">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif-display text-sm font-semibold text-neutral-900 leading-tight">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-neutral-400 hover:text-red-700 transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Stitching specification */}
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-neutral-500">
                      {item.stitching === 'stitched' ? (
                        <span className="text-amber-900 font-medium flex items-center gap-1">
                          <Scissors className="w-2.5 h-2.5" />
                          {item.customMeasurements
                            ? 'Bespoke Tailored'
                            : `Stitched (Size ${item.size || 'M'})`}
                        </span>
                      ) : (
                        <span>Unstitched 3-Piece</span>
                      )}
                      <span>·</span>
                      <span className="truncate">{item.product.colorName}</span>
                    </div>

                    {/* Custom Tailoring breakdown tooltip if custom */}
                    {item.customMeasurements && (
                      <div className="mt-1 text-[10px] text-neutral-500 font-mono bg-neutral-50 p-1 rounded">
                        Kameez: {item.customMeasurements.kameezLength}" · Chest: {item.customMeasurements.chestBust}" · {item.customMeasurements.trouserStyle.replace('_', ' ')}
                      </div>
                    )}
                  </div>

                  {/* Pricing & Stepper */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-neutral-200 rounded bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-black font-mono text-xs"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-[11px] font-mono font-semibold tabular-nums text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-black font-mono text-xs"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono tabular-nums text-xs font-semibold text-neutral-900">
                      {formatCurrency(item.pricePerItemPKR * item.quantity, currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Financials & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#ece7df] bg-[#faf8f5] space-y-3">
            {/* Promo code input */}
            {!appliedPromo ? (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. SUMMERNOOR)"
                    className="w-full pl-7 pr-3 py-1.5 text-xs bg-white border border-neutral-300 rounded uppercase font-mono text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
                  />
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-950 transition-colors"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPct}% off)
                </span>
                <button
                  onClick={() => setAppliedPromo(null)}
                  className="text-neutral-500 hover:text-neutral-900 underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            )}
            {promoError && <p className="text-[11px] text-red-600">{promoError}</p>}

            {/* Calculations */}
            <div className="space-y-1 text-xs text-neutral-600 pt-1 font-mono tabular-nums">
              <div className="flex justify-between">
                <span className="font-sans">Subtotal</span>
                <span>{formatCurrency(subtotalPKR, currency)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-800">
                  <span className="font-sans">Summer Promo ({appliedPromo.discountPct}%)</span>
                  <span>-{formatCurrency(discountAmountPKR, currency)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-sans">Shipping</span>
                <span>{shippingFeePKR === 0 ? <span className="text-emerald-700 font-semibold uppercase">Free</span> : formatCurrency(shippingFeePKR, currency)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                <span className="font-sans">Estimated Total</span>
                <span>{formatCurrency(grandTotalPKR, currency)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3 px-4 bg-[#22201d] text-[#fcfbf9] text-xs uppercase tracking-[0.15em] font-medium hover:bg-black transition-colors rounded shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-center text-neutral-400">
              Cash on Delivery (Pakistan) · DHL Worldwide · Secure SSL
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
