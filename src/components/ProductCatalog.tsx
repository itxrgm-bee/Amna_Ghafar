import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import ProductCard from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  currency: CurrencyConfig;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, stitching: 'unstitched' | 'stitched') => void;
}

export default function ProductCatalog({
  products,
  currency,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [fabricFilter, setFabricFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'name'>('featured');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Filter categories definition
  const CATEGORIES = [
    { id: 'all', label: "All Summer '26" },
    { id: 'lawn', label: 'Swiss Lawn 3-Pc' },
    { id: 'chikankari', label: 'Chikankari Craft' },
    { id: 'festive_organza', label: 'Festive Organza' },
    { id: 'luxury_pret', label: 'Ready-to-Wear Pret' },
  ];

  const FABRIC_OPTIONS = [
    { id: 'all', label: 'All Summer Weaves' },
    { id: 'voile', label: 'Swiss Voile Lawn' },
    { id: 'cambric', label: 'Cambric Schiffli' },
    { id: 'organza', label: 'Cotton Net & Organza' },
    { id: 'pima', label: 'Pima Cotton' },
  ];

  const COLOR_OPTIONS = [
    { id: 'all', label: 'All Tones' },
    { id: 'mint', label: 'Mint & Sage' },
    { id: 'pink', label: 'Blush & Rose' },
    { id: 'ivory', label: 'Ivory & Gold' },
    { id: 'blue', label: 'Sky & Cyan' },
    { id: 'lemon', label: 'Lemon & Ochre' },
  ];

  // Filtered & sorted products computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.collection !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          const matchColor = p.colorName.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchFabric && !matchColor && !matchSku) {
            return false;
          }
        }
        // Fabric filter
        if (fabricFilter !== 'all') {
          if (fabricFilter === 'voile' && !p.fabric.toLowerCase().includes('voile') && !p.fabric.toLowerCase().includes('swiss')) return false;
          if (fabricFilter === 'cambric' && !p.fabric.toLowerCase().includes('cambric')) return false;
          if (fabricFilter === 'organza' && !p.fabric.toLowerCase().includes('organza') && !p.fabric.toLowerCase().includes('net') && !p.fabric.toLowerCase().includes('jacquard')) return false;
          if (fabricFilter === 'pima' && !p.fabric.toLowerCase().includes('pima') && !p.fabric.toLowerCase().includes('cotton')) return false;
        }
        // Color filter
        if (colorFilter !== 'all') {
          const c = p.colorName.toLowerCase();
          if (colorFilter === 'mint' && !c.includes('mint') && !c.includes('sage')) return false;
          if (colorFilter === 'pink' && !c.includes('blush') && !c.includes('rose') && !c.includes('lilac')) return false;
          if (colorFilter === 'ivory' && !c.includes('ivory') && !c.includes('gold')) return false;
          if (colorFilter === 'blue' && !c.includes('blue') && !c.includes('cyan')) return false;
          if (colorFilter === 'lemon' && !c.includes('lemon') && !c.includes('ochre') && !c.includes('mustard')) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.unstitchedPricePKR - b.unstitchedPricePKR;
        if (sortBy === 'price_high') return b.unstitchedPricePKR - a.unstitchedPricePKR;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, fabricFilter, colorFilter, sortBy]);

  const resetFilters = () => {
    onSelectCategory('all');
    setSearchQuery('');
    setFabricFilter('all');
    setColorFilter('all');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery !== '' || fabricFilter !== 'all' || colorFilter !== 'all' || sortBy !== 'featured';

  return (
    <section id="collection-grid" className="py-12 lg:py-16 bg-[#fcfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-1">
              Curated Spring/Summer Edition
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-neutral-900 tracking-tight font-normal">
              The Pakistani Summer Collection
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lawn, chikankari, color..."
                className="w-48 sm:w-64 pl-8 pr-7 py-2 text-xs bg-white border border-[#dfdad1] rounded focus:outline-none focus:border-neutral-800 transition-all text-neutral-800 placeholder-neutral-400"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`flex items-center gap-1.5 py-2 px-3 text-xs uppercase tracking-wider font-medium border rounded transition-colors cursor-pointer ${
                showFilterDrawer || fabricFilter !== 'all' || colorFilter !== 'all'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-[#dfdad1] hover:border-neutral-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Collection Category Tabs (Functional segmented tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#ece7df] mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`py-2 px-4 text-xs tracking-wider uppercase whitespace-nowrap transition-colors border-b-2 font-medium cursor-pointer ${
                selectedCategory === cat.id
                  ? 'border-neutral-900 text-neutral-950 font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Collapsible Secondary Filters Bar */}
        {showFilterDrawer && (
          <div className="mb-8 p-4 bg-[#f7f5ef] border border-[#e8e4dc] rounded-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Fabric Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-500 font-medium uppercase text-[11px] tracking-wider">Fabric:</span>
                  <select
                    value={fabricFilter}
                    onChange={(e) => setFabricFilter(e.target.value)}
                    className="bg-white border border-[#d8d3c8] text-neutral-800 text-xs py-1.5 px-2.5 rounded focus:outline-none"
                  >
                    {FABRIC_OPTIONS.map((f) => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </select>
                </div>

                {/* Color Palette Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-500 font-medium uppercase text-[11px] tracking-wider">Palette:</span>
                  <select
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value)}
                    className="bg-white border border-[#d8d3c8] text-neutral-800 text-xs py-1.5 px-2.5 rounded focus:outline-none"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-500 font-medium uppercase text-[11px] tracking-wider">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-[#d8d3c8] text-neutral-800 text-xs py-1.5 px-2.5 rounded focus:outline-none"
                  >
                    <option value="featured">Featured Summer Edit</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name">Article Name</option>
                  </select>
                </div>
              </div>

              {/* Reset button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-950 font-medium underline underline-offset-4 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tabular Count Bar */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-6">
          <div className="flex items-center gap-2 font-mono tabular-nums">
            <span>Showing</span>
            <span className="font-semibold text-neutral-800">{filteredProducts.length}</span>
            <span>of {products.length} articles</span>
          </div>
          {searchQuery && (
            <div className="text-xs text-neutral-600">
              Filtered for <span className="font-semibold text-neutral-900">"{searchQuery}"</span>
            </div>
          )}
        </div>

        {/* Product Grid (Rule 2.A: 3 or 4 columns with generous whitespace gap-6 to gap-8) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-[#ece7df] rounded p-8">
            <h3 className="font-serif-display text-2xl text-neutral-800 mb-2 font-normal">
              No matching articles found
            </h3>
            <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
              We couldn't find any designs matching your specific fabric or palette selection. Try broadening your criteria or reset filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
