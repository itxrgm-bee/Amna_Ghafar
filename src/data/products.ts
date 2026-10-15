import { CurrencyCode, CurrencyConfig, Product } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: { code: 'PKR', symbol: '₨', rate: 1, decimals: 0 },
  USD: { code: 'USD', symbol: '$', rate: 0.0036, decimals: 0 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0028, decimals: 0 },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.0132, decimals: 0 },
  CAD: { code: 'CAD', symbol: 'C$', rate: 0.0049, decimals: 0 },
};

export function formatCurrency(amountPKR: number, currency: CurrencyConfig): string {
  const converted = amountPKR * currency.rate;
  if (currency.code === 'PKR') {
    return `${currency.symbol} ${Math.round(converted).toLocaleString('en-PK')}`;
  }
  return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
}

export const PRODUCTS: Product[] = [
  {
    id: 'gn-lawn-01',
    name: 'Gul-e-Bahar Embroidered Mint Lawn',
    sku: 'GN-SM26-01',
    collection: 'lawn',
    categoryLabel: 'Luxury Swiss Lawn · 3-Piece',
    description: 'An ethereal ensemble woven in 80s count fine Swiss lawn featuring soft pistachio mint tones with intricate ivory resham flora, scalloped laser cutwork lace, and an airy digital-printed pure silk chiffon dupatta.',
    unstitchedPricePKR: 11950,
    stitchingAddonPKR: 4500,
    image: '/src/assets/images/hero_summer_lawn_campaign_1792048714135.jpg',
    secondaryImage: '/src/assets/images/product_printed_lawn_sage_1792048714923.jpg',
    colorName: 'Pistachio Mint',
    colorHex: '#C5DCC9',
    fabric: '80s Fine Count Swiss Voile Lawn',
    dupattaFabric: 'Pure Bemberg Chiffon (2.5m)',
    pieces: {
      shirt: '3.0m Embroidered Front, Back & Sleeves with Schiffli floral trellis',
      dupatta: '2.5m Pure Silk Chiffon with dual-tone botanical digital print',
      trouser: '2.5m Dyed Cambric Cotton with embroidered ankle cutwork',
      embroideryPatches: [
        '1 Embroidered Organza Neckline with pearl and thread motifs',
        '2 Organza Scalloped Borders for Daman (1.5m each)',
        '2 Sleeve Cuff Embroidered Organza Borders'
      ]
    },
    isNewArrival: true,
    isBestSeller: true,
    careInstructions: [
      'Dry clean recommended for first wash',
      'Cold gentle hand wash with mild detergent',
      'Do not bleach or wring',
      'Warm iron under a protective press cloth'
    ],
    inStock: true,
  },
  {
    id: 'gn-chikan-02',
    name: 'Mehrosh Chikankari Blush Ensemble',
    sku: 'GN-SM26-02',
    collection: 'chikankari',
    categoryLabel: 'Handcrafted Chikankari · 3-Piece',
    description: 'Masterfully crafted Lucknowi-inspired shadow work and fine needlepoint chikankari on soft blush pink cotton lawn. Accented with scalloped organza lace borders and a delicate featherlight mulmul dupatta.',
    unstitchedPricePKR: 13850,
    stitchingAddonPKR: 4800,
    image: '/src/assets/images/product_chikankari_blush_1792048714444.jpg',
    secondaryImage: '/src/assets/images/hero_summer_lawn_campaign_1792048714135.jpg',
    colorName: 'Blush Rose',
    colorHex: '#F6D5D5',
    fabric: 'Pure Cambric Lawn with Schiffli Cutwork',
    dupattaFabric: 'Sheer Mulmul Organza with Lace Borders (2.5m)',
    pieces: {
      shirt: '3.1m Hand-finished Chikankari All-Over Embroidered Shirt',
      dupatta: '2.5m Organza Dupatta with 4-side laser-cut scalloped borders',
      trouser: '2.5m Pure Cambric Cotton with organza pleat inserts',
      embroideryPatches: [
        'Hand-embroidered Schiffli Neck Yoke',
        '3m Scalloped Hemline Lace with Resham Threadwork'
      ]
    },
    isNewArrival: true,
    isBestSeller: true,
    careInstructions: [
      'Gentle hand wash in cold water',
      'Dry in shade to preserve pastel brilliance',
      'Medium steam iron on reverse'
    ],
    inStock: true,
  },
  {
    id: 'gn-festive-03',
    name: 'Noor-ul-Ain Summer Festive Organza',
    sku: 'GN-SM26-03',
    collection: 'festive_organza',
    categoryLabel: 'Summer Festive Pret · 3-Piece',
    description: 'A regal daytime festive outfit in pearl ivory, accented with champagne gold tilla, delicate resham floral bouquets, and micro-pearl beadwork. Paired with a diaphanous organza dupatta with scalloped borders.',
    unstitchedPricePKR: 16500,
    stitchingAddonPKR: 5200,
    image: '/src/assets/images/product_festive_organza_ivory_1792048715494.jpg',
    secondaryImage: '/src/assets/images/product_chikankari_blush_1792048714444.jpg',
    colorName: 'Pearl Ivory & Pale Gold',
    colorHex: '#FBF9F1',
    fabric: 'Luxury Cotton Net with Zari Weave',
    dupattaFabric: 'Embroidered Sheer Organza with Tilla Borders (2.5m)',
    pieces: {
      shirt: '3.0m Heavily Embroidered Zari & Resham Front and Sleeves',
      dupatta: '2.5m Embroidered Organza Dupatta with Scalloped Dori Border',
      trouser: '2.5m Raw Silk Trouser with Embroidered Trouser Patti',
      embroideryPatches: [
        'Organza Embroidered Front Neckline Motif',
        '2 Embroidered Daman Organza Extensions',
        'Beaded Gota & Pearl Tassel Finishing Kit'
      ]
    },
    isLimitedEdition: true,
    careInstructions: [
      'Dry clean only',
      'Store in provided breathable muslin garment bag',
      'Avoid direct spray of perfumes onto zari work'
    ],
    inStock: true,
  },
  {
    id: 'gn-pret-04',
    name: 'Zarmineh Botanical Sage Kurta Set',
    sku: 'GN-SM26-04',
    collection: 'luxury_pret',
    categoryLabel: 'Ready-to-Wear Pret · 2-Piece',
    description: 'Effortlessly chic everyday luxury in serene sage green. Cut in a breezy relaxed Pakistani silhouette with delicate mother-of-pearl buttons, pintucks on sleeves, and cropped wide-leg culottes.',
    unstitchedPricePKR: 8950,
    stitchingAddonPKR: 3500,
    image: '/src/assets/images/product_printed_lawn_sage_1792048714923.jpg',
    secondaryImage: '/src/assets/images/hero_summer_lawn_campaign_1792048714135.jpg',
    colorName: 'Sage Green',
    colorHex: '#A3B899',
    fabric: '100% Breathable Pima Cotton Lawn',
    dupattaFabric: 'Matching Printed Silk Voile Dupatta (2.5m)',
    pieces: {
      shirt: 'Stitched Relaxed Silhouette Kurta with Pearl Button Placket',
      dupatta: '2.5m Lightweight Silk Voile Dupatta',
      trouser: 'Matching Wide-Leg Culottes with Lace Insets',
      embroideryPatches: [
        'Pre-stitched Embroidered Sleeve Cuffs',
        'Embroidered Hemline Facing'
      ]
    },
    isBestSeller: true,
    careInstructions: [
      'Machine wash gentle cycle at 30°C',
      'Line dry in partial shade',
      'Warm iron'
    ],
    inStock: true,
  },
  {
    id: 'gn-lawn-05',
    name: 'Niloufar Powder Blue Schiffli',
    sku: 'GN-SM26-05',
    collection: 'lawn',
    categoryLabel: 'Luxury Swiss Lawn · 3-Piece',
    description: 'Evoking the crisp serenity of mountain summers, Niloufar showcases sky blue Swiss voile with porcelain white thread embroidery, laser cutwork borders, and an iridescent silver-dust chiffon dupatta.',
    unstitchedPricePKR: 12450,
    stitchingAddonPKR: 4500,
    image: '/src/assets/images/hero_summer_lawn_campaign_1792048714135.jpg',
    secondaryImage: '/src/assets/images/product_chikankari_blush_1792048714444.jpg',
    colorName: 'Powder Sky Blue',
    colorHex: '#D1E3ED',
    fabric: 'Swiss Voile Lawn with Laser Cutwork',
    dupattaFabric: 'Silver-Striped Chiffon (2.5m)',
    pieces: {
      shirt: '3.0m Embroidered Laser-Cut Front with Schiffli Trellis',
      dupatta: '2.5m Printed Chiffon Dupatta with Silver Zari Weft',
      trouser: '2.5m Dyed Cambric Trouser with Embroidered Motif Patch',
      embroideryPatches: [
        'Embroidered Front & Back Daman Lace',
        '2 Sleeve Border Bands'
      ]
    },
    isNewArrival: true,
    careInstructions: [
      'Dry clean or gentle cold hand wash',
      'Do not twist or wring',
      'Medium steam iron'
    ],
    inStock: true,
  },
  {
    id: 'gn-chikan-06',
    name: 'Shehrbano Sunshine Chikankari',
    sku: 'GN-SM26-06',
    collection: 'chikankari',
    categoryLabel: 'Handcrafted Chikankari · 3-Piece',
    description: 'A radiant summer morning piece in lemon butter and ivory. Crafted with traditional chicken-kari jaal work across the daman, framed by French knot floral sprigs and a lightweight jacquard cotton dupatta.',
    unstitchedPricePKR: 14200,
    stitchingAddonPKR: 4800,
    image: '/src/assets/images/product_chikankari_blush_1792048714444.jpg',
    secondaryImage: '/src/assets/images/product_festive_organza_ivory_1792048715494.jpg',
    colorName: 'Buttercup Lemon',
    colorHex: '#FDF2C7',
    fabric: 'Fine Count Cambric with Jaal Embroidery',
    dupattaFabric: 'Jacquard Weave Pure Cotton (2.5m)',
    pieces: {
      shirt: '3.0m All-Over Chikankari Embroidered Shirt with Back Motif',
      dupatta: '2.5m Self-Jacquard Weave Dupatta with Scalloped Edges',
      trouser: '2.5m Dyed Cambric Trouser with Embroidered Bottoms',
      embroideryPatches: [
        'Organza Resham Neckband & Button Loops',
        'Embroidered Chalk Patti for Side Slits'
      ]
    },
    isLimitedEdition: true,
    careInstructions: [
      'Cold hand wash with delicate fabric soap',
      'Dry flat in shade',
      'Iron while slightly damp'
    ],
    inStock: true,
  },
  {
    id: 'gn-festive-07',
    name: 'Zulekha Noir Festive Jacquard',
    sku: 'GN-SM26-07',
    collection: 'festive_organza',
    categoryLabel: 'Summer Festive Pret · 3-Piece',
    description: 'Sophisticated summer evening allure in jet black accented with antique silver tilla and soft gold resham. Engineered on breathable lawn jacquard to stay breezy even in midsummer humidity.',
    unstitchedPricePKR: 15800,
    stitchingAddonPKR: 5200,
    image: '/src/assets/images/product_festive_organza_ivory_1792048715494.jpg',
    secondaryImage: '/src/assets/images/hero_summer_lawn_campaign_1792048714135.jpg',
    colorName: 'Midnight Noir & Silver',
    colorHex: '#1E1E24',
    fabric: 'Lawn Jacquard with Tilla & Resham',
    dupattaFabric: 'Crinkled Chiffon with Heavy Embroidered Pallu (2.5m)',
    pieces: {
      shirt: '3.0m Woven Jacquard Lawn with Embroidered Neck & Front',
      dupatta: '2.5m Chiffon Dupatta with 4-Side Embroidered Border',
      trouser: '2.5m Dyed Silk Cotton Trouser with Pleated Borders',
      embroideryPatches: [
        'Heavy Embroidered Front Daman Border with Cutwork',
        '2 Sleeve Organza Motifs with Zari Details'
      ]
    },
    isBestSeller: true,
    careInstructions: [
      'Dry clean only',
      'Steam iron on reverse with press cloth',
      'Keep away from direct heat sources'
    ],
    inStock: true,
  },
  {
    id: 'gn-pret-08',
    name: 'Yasmin Dusty Lilac Pret Set',
    sku: 'GN-SM26-08',
    collection: 'luxury_pret',
    categoryLabel: 'Ready-to-Wear Pret · 2-Piece',
    description: 'A muted lilac ensemble in airy lawn with tonal floral thread embroidery on the neckline and sleeve hem. Accompanied by relaxed cigarette pants with pin-tucked organza inserts.',
    unstitchedPricePKR: 9400,
    stitchingAddonPKR: 3500,
    image: '/src/assets/images/product_printed_lawn_sage_1792048714923.jpg',
    secondaryImage: '/src/assets/images/product_chikankari_blush_1792048714444.jpg',
    colorName: 'Dusty Lilac',
    colorHex: '#DDD1E6',
    fabric: 'Premium 80s Swiss Lawn',
    dupattaFabric: 'Digital Printed Pure Voile (2.5m)',
    pieces: {
      shirt: 'Ready-to-Wear Tailored Shirt with Keyhole Button Neckline',
      dupatta: '2.5m Soft Drape Voile Dupatta with Tassel Edges',
      trouser: 'Tailored Cigarette Trouser with Sheer Organza Insets',
      embroideryPatches: [
        'Pre-attached Resham Neck Yoke',
        'Organza Slit Bindings'
      ]
    },
    isNewArrival: true,
    careInstructions: [
      'Machine wash gentle cold',
      'Do not wring',
      'Warm iron'
    ],
    inStock: true,
  }
];

export const STANDARD_SIZES: { size: 'XS' | 'S' | 'M' | 'L' | 'XL'; chest: string; length: string; shoulder: string; hip: string }[] = [
  { size: 'XS', chest: '36"', length: '39"', shoulder: '14"', hip: '38"' },
  { size: 'S', chest: '38"', length: '40"', shoulder: '14.5"', hip: '40"' },
  { size: 'M', chest: '40"', length: '41"', shoulder: '15"', hip: '43"' },
  { size: 'L', chest: '43"', length: '42"', shoulder: '15.5"', hip: '46"' },
  { size: 'XL', chest: '46"', length: '42.5"', shoulder: '16.5"', hip: '49"' },
];

export const TAILORING_STYLES = {
  kurtaCuts: [
    { id: 'straight_slit', name: 'Straight Classic with High Slits', desc: 'Timeless Pakistani cut with structured posture and clean side chalks.' },
    { id: 'boxy_contemporary', name: 'Boxy Relaxed Kurta', desc: 'Modern drop-shoulder loose silhouette, ideal for high summer heat.' },
    { id: 'a_line', name: 'Soft A-Line Silhouette', desc: 'Gently flaring from chest to hem for breezy movement.' },
    { id: 'flared_angrakha', name: 'Cross-Over Angrakha Wrap', desc: 'Royal asymmetrical front overlap with handmade cloth dori strings.' },
  ],
  trouserStyles: [
    { id: 'cigarette', name: 'Cigarette Pants', desc: 'Tapered structured pants with embroidered hem or organza inserts.' },
    { id: 'tulip_shalwar', name: 'Tulip Shalwar', desc: 'Traditional pleated tulip petal wrap cuffs with dainty lace trims.' },
    { id: 'culottes', name: 'Wide-Leg Cropped Culottes', desc: 'Airy summer trousers with 22-inch bottom hem flare.' },
    { id: 'straight', name: 'Classic Straight Trouser', desc: 'Standard comfortable straight silhouette suited for daily wear.' },
  ]
};

export const DRAPING_STYLES = [
  {
    id: 'cascade',
    title: 'The Royal Shoulder Cascade',
    subtitle: 'Classic formal elegance',
    description: 'Pin the dupatta securely on the left shoulder, letting the lavishly embroidered pallu fall across the back while displaying the detailed front daman.',
    occasion: 'Summer Soirées & Eid Day 1',
    steps: ['Fold dupatta lengthwise into three neat pleats', 'Anchor to shoulder seam with safety pin', 'Drape front edge across right arm or wrist']
  },
  {
    id: 'shawl',
    title: 'The Evening Silk Wrap',
    subtitle: 'Full silhouette grandeur',
    description: 'Unfold the pure silk or crinkled chiffon dupatta completely and drape lightly across both shoulders like a royal summer shawl.',
    occasion: 'Garden Weddings & Family Dinners',
    steps: ['Open full 2.5m breadth across back', 'Gently rest over forearms', 'Allows intricate back shirt motif and heavy pallu to shine']
  },
  {
    id: 'cowl',
    title: 'The Contemporary Cross-Neck Cowl',
    subtitle: 'Airy effortless daylight styling',
    description: 'Drape both ends backwards over the shoulders, creating an elegant gentle cowl across the collarbones, keeping hands entirely free.',
    occasion: 'Brunch, Office & Daily Lawn',
    steps: ['Place center of dupatta across front chest', 'Toss both ends loosely over each shoulder', 'Adjust gentle soft folds for breezy breathability']
  }
];
