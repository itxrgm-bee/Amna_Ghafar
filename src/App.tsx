import { useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig, Product, CartItem, StitchingOption, StandardSize, TailoringMeasurements } from './types';
import { CURRENCIES, PRODUCTS } from './data/products';
import PromoBanner from './components/PromoBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import DrapeStudio from './components/DrapeStudio';
import CraftsmanshipSection from './components/CraftsmanshipSection';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CustomTailoringModal from './components/CustomTailoringModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WishlistModal from './components/WishlistModal';

export default function App() {
  // Currency State (default to PKR)
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyConfig>(CURRENCIES.PKR);

  // Cart State with LocalStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gulenor_cart');
      return saved ? JSON.parse(saved) : [
        // Seed with 1 initial sample item so user immediately sees a live shopping bag
        {
          cartItemId: 'seed-item-1',
          product: PRODUCTS[0],
          stitching: 'unstitched',
          quantity: 1,
          pricePerItemPKR: PRODUCTS[0].unstitchedPricePKR,
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gulenor_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1].id];
    } catch {
      return [];
    }
  });

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [tailoringProduct, setTailoringProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync cart and wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gulenor_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('gulenor_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // Handlers
  const handleCurrencyChange = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrentCurrency(CURRENCIES[code]);
    }
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleAddToCart = (
    product: Product,
    stitching: StitchingOption,
    size?: StandardSize,
    customMeasurements?: TailoringMeasurements,
    quantity = 1
  ) => {
    const unitPricePKR =
      stitching === 'stitched'
        ? product.unstitchedPricePKR + product.stitchingAddonPKR
        : product.unstitchedPricePKR;

    const cartItemId = `${product.id}-${stitching}-${size || 'custom'}-${Date.now()}`;

    setCartItems((prev) => [
      ...prev,
      {
        cartItemId,
        product,
        stitching,
        size,
        customMeasurements,
        quantity,
        pricePerItemPKR: unitPricePKR,
      },
    ]);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, stitching: 'unstitched' | 'stitched') => {
    handleAddToCart(product, stitching, stitching === 'stitched' ? 'M' : undefined, undefined, 1);
  };

  const handleConfirmCustomStitching = (product: Product, measurements: TailoringMeasurements) => {
    handleAddToCart(product, 'stitched', undefined, measurements, 1);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDrape = () => {
    const el = document.getElementById('drape-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-neutral-900 selection:bg-amber-100 selection:text-neutral-900">
      {/* 1. Dismissible Top Promo Banner */}
      <PromoBanner onExplore={scrollToCollection} />

      {/* 2. Top Bar Contract Navbar */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={handleCurrencyChange}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCollection();
        }}
        onOpenTailoringGuide={() => setTailoringProduct(PRODUCTS[0])}
        onOpenDrapeStudio={scrollToDrape}
        onSearchClick={scrollToCollection}
      />

      {/* 3. Main Storefront Hero */}
      <Hero
        onShopNow={scrollToCollection}
        onOpenTailoring={() => setTailoringProduct(PRODUCTS[0])}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCollection();
        }}
      />

      {/* 4. Product Catalog with Category Tabs, Fabric Filters, Tabular Figures */}
      <ProductCatalog
        products={PRODUCTS}
        currency={currentCurrency}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={(p) => setQuickViewProduct(p)}
        onQuickAdd={handleQuickAdd}
      />

      {/* 5. Dupatta Draping Atelier Guide */}
      <DrapeStudio onShopCollection={scrollToCollection} />

      {/* 6. Textile Heritage & Craftsmanship */}
      <CraftsmanshipSection />

      {/* 7. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCollection();
        }}
        onOpenTailoring={() => setTailoringProduct(PRODUCTS[0])}
        onOpenDrapeStudio={scrollToDrape}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        currency={currentCurrency}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenCustomTailoring={(p) => setTailoringProduct(p)}
      />

      {/* Bespoke Tailoring Studio Modal */}
      <CustomTailoringModal
        product={tailoringProduct}
        currency={currentCurrency}
        isOpen={!!tailoringProduct}
        onClose={() => setTailoringProduct(null)}
        onConfirmCustomStitching={handleConfirmCustomStitching}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currentCurrency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExplore={scrollToCollection}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currentCurrency}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Wishlist Drawer */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={PRODUCTS}
        wishlistIds={wishlistIds}
        currency={currentCurrency}
        onToggleWishlist={handleToggleWishlist}
        onQuickAdd={handleQuickAdd}
        onExplore={scrollToCollection}
      />
    </div>
  );
}
