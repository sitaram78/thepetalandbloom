export type ProductCategory = 'flowers' | 'bouquets' | 'gifts' | 'bags' | 'decor' | 'giftboxes' | 'custom';

export interface Product {
  code: string;
  name: string;
  category: ProductCategory;
  price: number;
  priceLabel?: string;
  description: string;
  longDescription?: string;
  colors?: string[];
  preparationDays?: string;
  occasions?: string[];
  bestseller?: boolean;
  featured?: boolean;
  isNew?: boolean;
  madeToOrder?: boolean;
  customisable?: boolean;
  images: string[];
  bouquetSize?: string;
  whatsIncluded?: string[];
}

export const products: Product[] = [
  {
    code: 'TPB-FL-001',
    name: 'Evermore Rose',
    category: 'flowers',
    price: 349,
    description: 'A handmade crochet rose designed to last far beyond the day it is gifted.',
    longDescription:
      'The Evermore Rose is our signature single bloom — a handmade crochet rose shaped stitch by stitch to capture the softness of a real petal. Designed to sit on a desk, a shelf, or a bedside table, it is a quiet reminder of a moment worth keeping.',
    colors: ['Red', 'Pink', 'White', 'Lavender', 'Yellow', 'Custom'],
    preparationDays: '3–5 days',
    occasions: ['Birthday', 'Anniversary', 'Friendship', 'Gifting'],
    bestseller: true,
    featured: true,
    customisable: true,
    images: [
      'https://images.pexels.com/photos/18809860/pexels-photo-18809860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7185718/pexels-photo-7185718.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/31583953/pexels-photo-31583953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-FL-002',
    name: 'Golden Sun',
    category: 'flowers',
    price: 349,
    description: 'A warm sunflower bloom that brings a little light to any corner.',
    longDescription:
      'The Golden Sun is a cheerful crochet sunflower with warm golden petals and a textured centre. It is the kind of bloom that makes a room feel a little brighter — and a gift feel a little more thoughtful.',
    colors: ['Golden Yellow', 'Mustard', 'Cream', 'Custom'],
    preparationDays: '3–5 days',
    occasions: ['Birthday', 'Friendship', 'Just Because'],
    customisable: true,
    images: [
      'https://images.pexels.com/photos/36007970/pexels-photo-36007970.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32501693/pexels-photo-32501693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-FL-003',
    name: 'Daisy Daydream',
    category: 'flowers',
    price: 299,
    description: 'Simple, sweet, and made to sit quietly among your favourite things.',
    longDescription:
      'The Daisy Daydream is a delicate crochet daisy with soft white petals and a warm centre. Understated and gentle, it is the bloom for someone who appreciates the little things.',
    colors: ['White', 'Pink', 'Yellow', 'Custom'],
    preparationDays: '3–5 days',
    occasions: ['Friendship', 'Just Because', 'Birthday'],
    images: [
      'https://images.pexels.com/photos/5775875/pexels-photo-5775875.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32914223/pexels-photo-32914223.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-FL-004',
    name: 'Petal Whisper Tulip',
    category: 'flowers',
    price: 349,
    description: 'A graceful crochet tulip with a slender stem and soft cupped petals.',
    longDescription:
      'The Petal Whisper Tulip captures the quiet elegance of a single tulip in yarn. Its slender stem and cupped petals make it a beautiful standalone piece or a thoughtful addition to a larger bouquet.',
    colors: ['Pink', 'White', 'Lavender', 'Yellow', 'Custom'],
    preparationDays: '3–5 days',
    occasions: ['Birthday', 'Anniversary', 'Mother\'s Day'],
    customisable: true,
    images: [
      'https://images.pexels.com/photos/24361048/pexels-photo-24361048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/31104018/pexels-photo-31104018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-FL-005',
    name: 'Premium Rose',
    category: 'flowers',
    price: 399,
    description: 'A larger, fuller crochet rose with layered petals and a premium finish.',
    longDescription:
      'The Premium Rose is our most refined single bloom — larger, with more layered petals and a richer texture. It is the rose for moments that deserve something a little more.',
    colors: ['Red', 'Pink', 'White', 'Lavender', 'Peach', 'Custom'],
    preparationDays: '4–6 days',
    occasions: ['Anniversary', 'Valentine\'s Day', 'Mother\'s Day'],
    featured: true,
    customisable: true,
    images: [
      'https://images.pexels.com/photos/17143519/pexels-photo-17143519.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7185718/pexels-photo-7185718.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BQ-001',
    name: 'Little Bloom',
    category: 'bouquets',
    price: 499,
    description: 'One handmade bloom, wrapped and ready to make someone smile.',
    longDescription:
      'The Little Bloom is our simplest bouquet — a single crochet flower, wrapped with care. It is the perfect little gesture for someone who deserves a moment of thought.',
    bouquetSize: '1 flower',
    colors: ['Red', 'Pink', 'White', 'Lavender', 'Yellow', 'Custom'],
    preparationDays: '3–5 days',
    occasions: ['Just Because', 'Friendship', 'Birthday'],
    whatsIncluded: ['Handmade crochet flower', 'Premium wrapping', 'Ribbon', 'Gift-ready presentation'],
    images: [
      'https://images.pexels.com/photos/17864125/pexels-photo-17864125.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17864123/pexels-photo-17864123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BQ-002',
    name: 'Bloom Duo',
    category: 'bouquets',
    price: 699,
    description: 'Two complementary blooms brought together in a small, thoughtful pairing.',
    longDescription:
      'The Bloom Duo pairs two complementary crochet flowers — a rose and a tulip, a daisy and a sunflower — wrapped together as a small story. It is the bouquet for a friendship, a thank-you, or a quiet celebration.',
    bouquetSize: '2 flowers',
    colors: ['Custom mix available'],
    preparationDays: '4–6 days',
    occasions: ['Friendship', 'Birthday', 'Anniversary'],
    customisable: true,
    whatsIncluded: ['2 handmade crochet flowers', 'Premium wrapping', 'Ribbon', 'Gift-ready presentation'],
    images: [
      'https://images.pexels.com/photos/20269074/pexels-photo-20269074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32280850/pexels-photo-32280850.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BQ-003',
    name: 'Trio of Petals',
    category: 'bouquets',
    price: 899,
    description: 'Three handmade blooms, brought together into one little story.',
    longDescription:
      'The Trio of Petals is our most-loved bouquet. Three crochet flowers — each chosen to complement the others — wrapped together in premium packaging. It is the bouquet that turns a gift into a moment.',
    bouquetSize: '3 flowers',
    colors: ['Custom mix available'],
    preparationDays: '4–6 days',
    occasions: ['Birthday', 'Anniversary', 'Valentine\'s Day', 'Mother\'s Day'],
    bestseller: true,
    featured: true,
    customisable: true,
    whatsIncluded: ['3 handmade crochet flowers', 'Premium wrapping', 'Ribbon', 'Gift-ready presentation'],
    images: [
      'https://images.pexels.com/photos/20269075/pexels-photo-20269075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/29753251/pexels-photo-29753251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/28450065/pexels-photo-28450065.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BQ-004',
    name: 'Petal Story',
    category: 'bouquets',
    price: 1299,
    description: 'Five blooms arranged into a fuller, more expressive bouquet.',
    longDescription:
      'The Petal Story is a bouquet with more to say. Five crochet flowers in a considered arrangement, wrapped in premium packaging with a ribbon finish. It is the bouquet for anniversaries, milestones, and moments that deserve more than a single bloom.',
    bouquetSize: '5 flowers',
    colors: ['Custom mix available'],
    preparationDays: '5–7 days',
    occasions: ['Anniversary', 'Mother\'s Day', 'Birthday'],
    customisable: true,
    whatsIncluded: ['5 handmade crochet flowers', 'Premium wrapping', 'Ribbon', 'Gift-ready presentation'],
    images: [
      'https://images.pexels.com/photos/29753249/pexels-photo-29753249.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/20269075/pexels-photo-20269075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BQ-005',
    name: 'Garden in Bloom',
    category: 'bouquets',
    price: 1599,
    description: 'Seven flowers gathered into a rich, layered crochet bouquet.',
    longDescription:
      'The Garden in Bloom is a generous arrangement — seven crochet flowers in a mix of roses, tulips, and daisies, wrapped and finished with a premium ribbon. It is the bouquet that feels like a whole garden in your hands.',
    bouquetSize: '7 flowers',
    colors: ['Custom mix available'],
    preparationDays: '5–7 days',
    occasions: ['Anniversary', 'Mother\'s Day', 'Wedding', 'Festivals'],
    customisable: true,
    whatsIncluded: ['7 handmade crochet flowers', 'Premium wrapping', 'Ribbon', 'Gift-ready presentation'],
    images: [
      'https://images.pexels.com/photos/29753249/pexels-photo-29753249.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/39412616/pexels-photo-39412616.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BQ-006',
    name: 'Forever Garden',
    category: 'bouquets',
    price: 1999,
    description: 'Nine blooms — our largest standard bouquet, made to be unforgettable.',
    longDescription:
      'The Forever Garden is our most generous standard bouquet. Nine crochet flowers arranged into a rich, full composition, wrapped in premium packaging and finished with a ribbon. It is the bouquet for once-in-a-lifetime moments.',
    bouquetSize: '9 flowers',
    colors: ['Custom mix available'],
    preparationDays: '6–8 days',
    occasions: ['Anniversary', 'Wedding', 'Mother\'s Day'],
    featured: true,
    customisable: true,
    whatsIncluded: ['9 handmade crochet flowers', 'Premium wrapping', 'Ribbon', 'Gift-ready presentation'],
    images: [
      'https://images.pexels.com/photos/39412616/pexels-photo-39412616.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/29753249/pexels-photo-29753249.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BQ-007',
    name: 'Premium Mixed Bouquet',
    category: 'bouquets',
    price: 1499,
    description: 'A curated mix of flower types and colours for a one-of-a-kind arrangement.',
    longDescription:
      'The Premium Mixed Bouquet is a curated blend of different flower types — roses, tulips, daisies, and sunflowers — chosen to create a rich, textured arrangement. No two are exactly alike.',
    bouquetSize: '5–7 flowers',
    colors: ['Curated mix'],
    preparationDays: '5–7 days',
    occasions: ['Birthday', 'Anniversary', 'Festivals'],
    customisable: true,
    images: [
      'https://images.pexels.com/photos/29753249/pexels-photo-29753249.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/20269074/pexels-photo-20269074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BQ-008',
    name: 'Large Premium Bouquet',
    category: 'bouquets',
    price: 2499,
    priceLabel: 'from ₹2,499',
    description: 'Our grandest bouquet — a lush, abundant arrangement for the most special occasions.',
    longDescription:
      'The Large Premium Bouquet is our most abundant creation — a generous arrangement of 10+ crochet flowers in a rich, layered composition. Made for weddings, milestone anniversaries, and moments that deserve the fullest expression.',
    bouquetSize: '10+ flowers',
    colors: ['Custom mix available'],
    preparationDays: '7–10 days',
    occasions: ['Wedding', 'Anniversary', 'Corporate Gifting'],
    madeToOrder: true,
    customisable: true,
    images: [
      'https://images.pexels.com/photos/39412616/pexels-photo-39412616.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/29753249/pexels-photo-29753249.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-KR-001',
    name: 'Pocket Bloom Keyring',
    category: 'gifts',
    price: 199,
    description: 'A tiny crochet bloom you can carry everywhere.',
    longDescription:
      'The Pocket Bloom Keyring is a miniature crochet flower attached to a sturdy keyring. It is the smallest way to carry a little beauty with you — and a lovely little gift for someone who deserves a small surprise.',
    colors: ['Red', 'Pink', 'White', 'Lavender', 'Yellow'],
    preparationDays: '2–4 days',
    occasions: ['Just Because', 'Friendship', 'Return Gift'],
    bestseller: true,
    images: [
      'https://images.pexels.com/photos/37129474/pexels-photo-37129474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/38634277/pexels-photo-38634277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-KR-002',
    name: 'Premium Custom Keyring',
    category: 'gifts',
    price: 249,
    description: 'A custom-colour crochet keyring with a premium finish.',
    longDescription:
      'The Premium Custom Keyring lets you choose the colour, the flower type, and the accent. It is a small, personal gift made to order — and a favourite for return gifts and party favours.',
    colors: ['Custom'],
    preparationDays: '3–5 days',
    occasions: ['Return Gift', 'Friendship', 'Just Because'],
    customisable: true,
    madeToOrder: true,
    images: [
      'https://images.pexels.com/photos/38634277/pexels-photo-38634277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37129474/pexels-photo-37129474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-KR-003',
    name: 'Flower Bookmark',
    category: 'gifts',
    price: 199,
    description: 'A delicate crochet flower bookmark for the readers you love.',
    longDescription:
      'The Flower Bookmark is a slim crochet flower attached to a bookmark stem — a gentle, literary gift for the readers in your life. It sits beautifully between pages and lasts far longer than a real petal.',
    colors: ['Pink', 'White', 'Lavender', 'Yellow', 'Custom'],
    preparationDays: '2–4 days',
    occasions: ['Friendship', 'Just Because', 'Birthday'],
    customisable: true,
    images: [
      'https://images.pexels.com/photos/36595917/pexels-photo-36595917.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/34352098/pexels-photo-34352098.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-HD-001',
    name: 'Mini Flower Pot',
    category: 'decor',
    price: 499,
    description: 'A tiny crochet bloom planted in a mini pot — a little piece of permanent garden.',
    longDescription:
      'The Mini Flower Pot is a crochet flower set in a small decorative pot. It is a complete little piece of decor — a permanent garden for a desk, a shelf, or a windowsill.',
    colors: ['Pink', 'White', 'Yellow', 'Custom'],
    preparationDays: '3–5 days',
    occasions: ['Housewarming', 'Just Because', 'Mother\'s Day'],
    customisable: true,
    images: [
      'https://images.pexels.com/photos/17864123/pexels-photo-17864123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32280850/pexels-photo-32280850.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BG-001',
    name: 'Mini Crochet Purse',
    category: 'bags',
    price: 549,
    description: 'A small, charming crochet purse for everyday essentials.',
    longDescription:
      'The Mini Crochet Purse is a compact, handmade bag with a soft textured finish. It is the kind of piece that adds a handmade touch to an everyday outfit.',
    colors: ['Cream', 'Pink', 'Sage', 'Brown', 'Custom'],
    preparationDays: '4–6 days',
    occasions: ['Birthday', 'Just Because'],
    customisable: true,
    images: [
      'https://images.pexels.com/photos/33207480/pexels-photo-33207480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30224898/pexels-photo-30224898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BG-002',
    name: 'Petal Tote',
    category: 'bags',
    price: 899,
    description: 'A medium crochet tote with floral accents — functional and beautiful.',
    longDescription:
      'The Petal Tote is a medium-sized crochet bag with delicate floral accents woven into the design. It is roomy enough for daily use and pretty enough to carry with intention.',
    colors: ['Cream', 'Sage', 'Brown', 'Custom'],
    preparationDays: '5–7 days',
    occasions: ['Birthday', 'Just Because'],
    customisable: true,
    images: [
      'https://images.pexels.com/photos/30224898/pexels-photo-30224898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30859913/pexels-photo-30859913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-BG-003',
    name: 'Premium Tote',
    category: 'bags',
    price: 1299,
    description: 'A large, fully-lined crochet tote with a premium finish and sturdy straps.',
    longDescription:
      'The Premium Tote is our finest bag — a large, fully-lined crochet tote with sturdy straps and a structured finish. It is made to be used, carried, and loved for years.',
    colors: ['Cream', 'Brown', 'Sage', 'Custom'],
    preparationDays: '5–7 days',
    occasions: ['Birthday', 'Anniversary'],
    featured: true,
    customisable: true,
    images: [
      'https://images.pexels.com/photos/30859913/pexels-photo-30859913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30224897/pexels-photo-30224897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-GF-001',
    name: 'Little Bloom Gift Box',
    category: 'giftboxes',
    price: 799,
    description: 'A single crochet bloom, a keyring, and a greeting card in a gift-ready box.',
    longDescription:
      'The Little Bloom Gift Box brings together a single crochet flower, a Pocket Bloom keyring, and a greeting card in a beautifully packaged box. It is a complete gift — ready to give, ready to receive.',
    colors: ['Custom mix available'],
    preparationDays: '4–6 days',
    occasions: ['Birthday', 'Friendship', 'Just Because', 'Mother\'s Day'],
    featured: true,
    customisable: true,
    whatsIncluded: ['1 crochet flower', 'Pocket Bloom keyring', 'Greeting card', 'Gift box packaging'],
    images: [
      'https://images.pexels.com/photos/10482144/pexels-photo-10482144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/13143524/pexels-photo-13143524.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-GF-002',
    name: 'Premium Bloom Box',
    category: 'giftboxes',
    price: 1499,
    description: 'A trio of crochet blooms, a keyring, a bookmark, and a greeting card in a premium box.',
    longDescription:
      'The Premium Bloom Box is our most complete gift — a Trio of Petals bouquet, a Pocket Bloom keyring, a Flower Bookmark, and a greeting card, all presented in a premium gift box with wrapping and ribbon. It is the gift that needs nothing else.',
    colors: ['Custom mix available'],
    preparationDays: '5–7 days',
    occasions: ['Anniversary', 'Mother\'s Day', 'Birthday', 'Valentine\'s Day'],
    customisable: true,
    whatsIncluded: ['Trio of Petals bouquet (3 flowers)', 'Pocket Bloom keyring', 'Flower bookmark', 'Greeting card', 'Premium gift box with wrapping and ribbon'],
    images: [
      'https://images.pexels.com/photos/27291954/pexels-photo-27291954.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/13143524/pexels-photo-13143524.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    code: 'TPB-CS-001',
    name: 'Custom Bouquet',
    category: 'custom',
    price: 1199,
    priceLabel: 'from ₹1,199',
    description: 'Your flowers. Your colours. Your story — a bouquet designed entirely around you.',
    longDescription:
      'The Custom Bouquet is our made-to-order experience. You choose the flower types, the number of flowers, the colours, the wrapping, the ribbon, and the message. We handcraft it from scratch. No two custom bouquets are the same.',
    bouquetSize: 'Your choice',
    colors: ['Fully custom'],
    preparationDays: '5–10 days',
    occasions: ['All occasions'],
    madeToOrder: true,
    customisable: true,
    featured: true,
    images: [
      'https://images.pexels.com/photos/29753249/pexels-photo-29753249.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/20269075/pexels-photo-20269075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
];

export function getProductByCode(code: string): Product | undefined {
  return products.find((p) => p.code === code);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(price: any): string {
  const numPrice = typeof price === 'number' ? price : parseFloat(price);
  if (isNaN(numPrice)) return '₹0';
  return `₹${numPrice.toLocaleString('en-IN')}`;
}
