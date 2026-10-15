import { useState } from 'react';
import { X, CheckCircle2, Truck, CreditCard, Banknote, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { CartItem, CurrencyConfig } from '../types';
import { formatCurrency } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyConfig;
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  currency,
  onOrderSuccess,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('Ayesha Khan');
  const [phone, setPhone] = useState('+92 300 8472910');
  const [email, setEmail] = useState('ayesha.k@example.com');
  const [address, setAddress] = useState('House 42, Block C-1, Gulberg III');
  const [city, setCity] = useState('Lahore');
  const [country, setCountry] = useState('Pakistan');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'bank'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotalPKR = items.reduce((acc, item) => acc + item.pricePerItemPKR * item.quantity, 0);
  const isFreeShipping = subtotalPKR >= 15000;
  const shippingFeePKR = isFreeShipping ? 0 : 650;
  const grandTotalPKR = subtotalPKR + shippingFeePKR;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrder = `GN-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-[#ece7df] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {!orderConfirmed ? (
          <div>
            {/* Header */}
            <div className="p-5 bg-[#faf8f5] border-b border-[#ece7df] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500">
                  Secure Checkout
                </span>
                <h2 className="font-serif-display text-xl sm:text-2xl text-neutral-900 font-medium">
                  Complete Your Summer Order
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
              {/* Order Quick Summary Strip */}
              <div className="p-3.5 bg-neutral-50 border border-neutral-200/80 rounded flex items-center justify-between text-xs">
                <div>
                  <span className="text-neutral-500">{items.length} {items.length === 1 ? 'Article' : 'Articles'} in Bag</span>
                  <div className="font-serif-display text-sm font-semibold text-neutral-900 mt-0.5">
                    {items[0]?.product.name} {items.length > 1 ? `+ ${items.length - 1} more` : ''}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Total Due</span>
                  <span className="font-mono tabular-nums text-base font-bold text-neutral-900">
                    {formatCurrency(grandTotalPKR, currency)}
                  </span>
                </div>
              </div>

              {/* Customer Contact */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3">
                  1. Contact Information (For Courier Updates)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-600 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2 bg-white border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1">WhatsApp / Phone Number</label>
                    <input
                      required
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 0000000"
                      className="w-full p-2 bg-white border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:border-neutral-900 font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-600 mb-1">Email Address (Order confirmation)</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 bg-white border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3">
                  2. Delivery Address
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-600 mb-1">Street Address, House/Apt No., Area</label>
                    <input
                      required
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 bg-white border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-600 mb-1">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2 bg-white border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:border-neutral-900"
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Sialkot">Sialkot</option>
                        <option value="Gujranwala">Gujranwala</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Dubai">Dubai, UAE</option>
                        <option value="London">London, UK</option>
                        <option value="New York">New York, USA</option>
                        <option value="Toronto">Toronto, Canada</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-neutral-600 mb-1">Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full p-2 bg-white border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:border-neutral-900"
                      >
                        <option value="Pakistan">Pakistan</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3">
                  3. Select Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 text-left border rounded transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-emerald-700 mb-1.5" />
                    <div className="font-semibold text-xs text-neutral-900">Cash on Delivery</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">Pay upon delivery across Pakistan</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 text-left border rounded transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-700 mb-1.5" />
                    <div className="font-semibold text-xs text-neutral-900">Credit / Debit Card</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">Visa, Mastercard, UnionPay</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 text-left border rounded transition-all cursor-pointer ${
                      paymentMethod === 'bank'
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-700 mb-1.5" />
                    <div className="font-semibold text-xs text-neutral-900">Raast / Bank Transfer</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">Instant Pakistani bank transfer</div>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#ece7df]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#22201d] text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-black transition-colors rounded shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <span>Place Order · {formatCurrency(grandTotalPKR, currency)}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-neutral-400 mt-2">
                  By clicking Place Order you agree to our 14-day exchange &amp; bespoke tailoring inspection terms.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Order Confirmed View */
          <div className="p-8 text-center bg-[#faf8f5] space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-emerald-800">
                Order Confirmed
              </span>
              <h2 className="font-serif-display text-3xl font-medium text-neutral-900 mt-1">
                Shukriya, {fullName.split(' ')[0]}!
              </h2>
              <p className="text-xs text-neutral-600 mt-2 max-w-md mx-auto">
                Your Summer '26 ensemble order <strong className="text-neutral-900 font-mono">#{orderNumber}</strong> has been received by our atelier.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#e8e4dc] rounded max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Dispatch Location:</span>
                <span className="font-medium text-neutral-900">{address}, {city}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Payment:</span>
                <span className="font-medium text-neutral-900">
                  {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Online Card' : 'Bank Transfer'}
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Estimated Delivery:</span>
                <span className="font-medium text-emerald-800">2–4 Business Days via Express Courier</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-neutral-500">Total Payable:</span>
                <span className="font-mono tabular-nums font-bold text-sm text-neutral-900">
                  {formatCurrency(grandTotalPKR, currency)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#22201d] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-800 transition-colors"
              >
                Continue Browsing Boutique
              </button>
              <a
                href={`https://wa.me/923000000000?text=Hi%20Gul-e-Noor,%20I%20just%20placed%20order%20${orderNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 border border-emerald-700 text-emerald-800 text-xs uppercase tracking-wider font-semibold rounded hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Order Updates</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
