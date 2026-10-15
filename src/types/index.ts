export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier from PKR base
  decimals: number;
}

export type StitchingOption = 'unstitched' | 'stitched';
export type StandardSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type TrouserStyle = 'cigarette' | 'tulip_shalwar' | 'culottes' | 'straight';
export type KurtaCut = 'straight_slit' | 'boxy_contemporary' | 'a_line' | 'flared_angrakha';

export interface TailoringMeasurements {
  kameezLength: number; // inches
  chestBust: number;
  waist: number;
  hip: number;
  shoulder: number;
  sleeveLength: number;
  trouserLength: number;
  trouserStyle: TrouserStyle;
  kurtaCut: KurtaCut;
  notes?: string;
}

export interface ProductPieceDetails {
  shirt: string;
  dupatta: string;
  trouser: string;
  embroideryPatches: string[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  collection: 'lawn' | 'chikankari' | 'festive_organza' | 'luxury_pret';
  categoryLabel: string;
  description: string;
  unstitchedPricePKR: number;
  stitchingAddonPKR: number; // cost to stitch
  image: string;
  secondaryImage?: string;
  colorName: string;
  colorHex: string;
  fabric: string;
  dupattaFabric: string;
  pieces: ProductPieceDetails;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  careInstructions: string[];
  inStock: boolean;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  stitching: StitchingOption;
  size?: StandardSize;
  customMeasurements?: TailoringMeasurements;
  quantity: number;
  pricePerItemPKR: number;
}

export interface FilterState {
  collection: string;
  fabric: string;
  colorFamily: string;
  priceRange: [number, number];
  stitchingOnly: 'all' | 'unstitched' | 'stitched';
  searchQuery: string;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'name';
}
