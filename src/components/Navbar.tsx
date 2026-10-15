import { ShoppingBag, Heart, Search, Globe, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types';
import { CURRENCIES } from '../data/products';

interface NavbarProps {
  currentCurrency: CurrencyConfig;
  onCurrencyChange: (code: CurrencyCode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (category: string) => void;
  onOpenTailoringGuide: () => void;
  onOpenDrapeStudio: () => void;
  onSearchClick: () => void;
}

export default function Navbar({
  currentCurrency,
  onCurrencyChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  onOpenTailoringGuide,
  onOpenDrapeStudio,
  onSearchClick,
}: NavbarProps) {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#ece7df] transition-colors">
      {/* Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-700 hover:text-neutral-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif-display text-2xl sm:text-3xl tracking-[0.2em] font-medium text-neutral-900 uppercase whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
          >
            GUL-E-NOOR
          </a>
        </div>

        {/* Zone 2: 4-5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-[0.1em] uppercase font-medium text-neutral-700">
          <button
            onClick={() => onSelectCategory('lawn')}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Summer Lawn
          </button>
          <button
            onClick={() => onSelectCategory('chikankari')}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Chikankari
          </button>
          <button
            onClick={() => onSelectCategory('festive_organza')}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Festive Pret
          </button>
          <button
            onClick={onOpenTailoringGuide}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-amber-900"
          >
            Custom Tailoring
          </button>
          <button
            onClick={onOpenDrapeStudio}
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Drape Studio
          </button>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            className="text-neutral-600 hover:text-neutral-900 p-1.5 transition-colors cursor-pointer"
            title="Search collection"
            aria-label="Search collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-xs font-medium tracking-wider text-neutral-700 hover:text-neutral-900 py-1 px-2 border border-neutral-200/80 rounded hover:border-neutral-400 transition-colors cursor-pointer"
              aria-label="Select Currency"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span>{currentCurrency.code}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {currencyDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-36 bg-white border border-neutral-200 shadow-lg py-1 z-50 rounded"
                onMouseLeave={() => setCurrencyDropdownOpen(false)}
              >
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      onCurrencyChange(code);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                      currentCurrency.code === code ? 'bg-neutral-100 font-semibold text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{code}</span>
                    <span className="text-neutral-400 font-mono text-[11px]">{CURRENCIES[code].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative text-neutral-600 hover:text-neutral-900 p-1.5 transition-colors cursor-pointer"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger (Primary Action) */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#22201d] text-[#fcfbf9] px-3.5 py-2 text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors rounded cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums text-amber-200">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-[#fcfbf9] px-6 py-4 space-y-3">
          <button
            onClick={() => {
              onSelectCategory('all');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 text-sm font-medium uppercase tracking-wider text-neutral-800"
          >
            All Summer '26
          </button>
          <button
            onClick={() => {
              onSelectCategory('lawn');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 text-sm font-medium uppercase tracking-wider text-neutral-800"
          >
            Summer Lawn 3-Piece
          </button>
          <button
            onClick={() => {
              onSelectCategory('chikankari');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 text-sm font-medium uppercase tracking-wider text-neutral-800"
          >
            Chikankari Craft
          </button>
          <button
            onClick={() => {
              onSelectCategory('festive_organza');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 text-sm font-medium uppercase tracking-wider text-neutral-800"
          >
            Festive Organza
          </button>
          <button
            onClick={() => {
              onSelectCategory('luxury_pret');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 text-sm font-medium uppercase tracking-wider text-neutral-800"
          >
            Ready-to-Wear Pret
          </button>
          <div className="pt-2 border-t border-neutral-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenTailoringGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-1.5 text-sm font-medium text-amber-900 uppercase tracking-wider"
            >
              Custom Tailoring & Measurements
            </button>
            <button
              onClick={() => {
                onOpenDrapeStudio();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-1.5 text-sm font-medium text-neutral-700 uppercase tracking-wider"
            >
              Dupatta Drape Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
