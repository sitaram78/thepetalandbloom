export const occasions = [
  {
    name: 'Birthday',
    description: 'For their special day.',
    image: 'https://images.pexels.com/photos/33772940/pexels-photo-33772940.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    filter: 'Birthday',
    color: 'bg-rose-200',
    textColor: 'text-rose-700',
    icon: 'Gift',
    slug: 'birthday',
    tags: ['Birthday'],
    descriptionLong: 'For their special day.',
    imageAlt: 'Wrapped bouquet for a birthday gift',
    emoji: 'Gift',
    emojiColor: 'text-rose-600',
    emojiBg: 'bg-rose-100',
  },
  {
    name: 'Anniversary',
    description: 'For something that lasts.',
    image: 'https://images.pexels.com/photos/36399728/pexels-photo-36399728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    filter: 'Anniversary',
    color: 'bg-terracotta-200',
    textColor: 'text-terracotta-700',
    icon: 'Heart',
    slug: 'anniversary',
    tags: ['Anniversary'],
    descriptionLong: 'For something that lasts.',
    imageAlt: 'Elegant red flower bouquet for an anniversary',
    emoji: 'Heart',
    emojiColor: 'text-terracotta-600',
    emojiBg: 'bg-terracotta-100',
  },
  {
    name: 'Friendship',
    description: 'For your favourite person.',
    image: 'https://images.pexels.com/photos/16536447/pexels-photo-16536447.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    filter: 'Friendship',
    color: 'bg-sage-200',
    textColor: 'text-sage-700',
    icon: 'Users',
    slug: 'friendship',
    tags: ['Friendship'],
    descriptionLong: 'For your favourite person.',
    imageAlt: 'Wrapped bouquet for a friend',
    emoji: 'Users',
    emojiColor: 'text-sage-600',
    emojiBg: 'bg-sage-100',
  },
  {
    name: 'Just Because',
    description: 'No occasion needed.',
    image: 'https://images.pexels.com/photos/17555771/pexels-photo-17555771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    filter: 'Just Because',
    color: 'bg-cream-300',
    textColor: 'text-brown-600',
    icon: 'Sparkles',
    slug: 'just-because',
    tags: ['Just Because'],
    descriptionLong: 'No occasion needed.',
    imageAlt: 'Gerbera daisy bouquet wrapped in hand',
    emoji: 'Sparkles',
    emojiColor: 'text-gold-600',
    emojiBg: 'bg-gold-200',
  },
  {
    name: "Mother's Day",
    description: 'A little handmade love.',
    image: 'https://images.pexels.com/photos/23944960/pexels-photo-23944960.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    filter: "Mother's Day",
    color: 'bg-rose-200',
    textColor: 'text-rose-700',
    icon: 'Flower2',
    slug: 'mothers-day',
    tags: ["Mother's Day"],
    descriptionLong: 'A little handmade love.',
    imageAlt: 'Flower bouquet for Mother\'s Day',
    emoji: 'Flower2',
    emojiColor: 'text-rose-600',
    emojiBg: 'bg-rose-100',
  },
  {
    name: 'Festivals',
    description: 'Thoughtful festive gifting.',
    image: 'https://images.pexels.com/photos/33228791/pexels-photo-33228791.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    filter: 'Festivals',
    color: 'bg-gold-200',
    textColor: 'text-gold-600',
    icon: 'Sparkle',
    slug: 'festivals',
    tags: ['Festivals'],
    descriptionLong: 'Thoughtful festive gifting.',
    imageAlt: 'Festive flower bouquet wrapped in gift paper',
    emoji: 'Sparkle',
    emojiColor: 'text-gold-600',
    emojiBg: 'bg-gold-200',
  },
];

export const budgetFilters = [
  { label: 'Under ₹300', min: 0, max: 299, param: 'under-300' },
  { label: 'Under ₹500', min: 0, max: 500, param: 'under-500' },
  { label: 'Under ₹1,000', min: 0, max: 1000, param: 'under-1000' },
  { label: 'Under ₹1,500', min: 0, max: 1500, param: 'under-1500' },
  { label: 'Premium ₹2,000+', min: 2000, max: 99999, param: 'premium' },
];

export const howItWorksSteps = [
  { num: '01', label: 'Choose your piece', desc: 'Browse our collection or start a custom order.' },
  { num: '02', label: 'Choose your colours', desc: 'Pick from our palette or request something custom.' },
  { num: '03', label: 'We handcraft it', desc: 'Every petal is shaped stitch by stitch.' },
  { num: '04', label: 'We wrap it', desc: 'Premium wrapping, ribbon, and gift-ready presentation.' },
  { num: '05', label: 'We ship it to you', desc: 'Pan-India delivery to your doorstep.' },
];

export const giftingOccasions = [
  'Birthday',
  'Anniversary',
  'Friendship',
  "Valentine's Day",
  'Just Because',
];

export const addOns = [
  { name: 'Greeting Card', price: 49, description: 'A handwritten card to accompany your gift.' },
  { name: 'Personalised Message', price: 39, description: 'A custom message card tucked inside your wrapping.' },
  { name: 'Name Customisation', price: 79, description: 'A name woven or attached to your bloom.' },
  { name: 'Premium Ribbon', price: 49, description: 'An upgraded ribbon finish on your bouquet wrapping.' },
  { name: 'Premium Wrapping', price: 79, description: 'Premium wrapping paper and packaging for your gift.' },
  { name: 'Extra Flower', price: 199, description: 'Add an additional bloom to any bouquet.', priceLabel: '₹199+' },
];

export const trustStrip = [
  { label: 'Handmade in India', icon: 'Heart' },
  { label: 'Made to order', icon: 'Clock' },
  { label: 'Custom colours', icon: 'Palette' },
  { label: 'Gift-ready', icon: 'Gift' },
  { label: 'Pan-India delivery', icon: 'Truck' },
];

export const footerPolicyLinks = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms', path: '/terms' },
  { label: 'Refund / Cancellation', path: '/refund' },
];

export const faqs = [
  {
    question: 'Are the flowers handmade?',
    answer: 'Yes. Every flower, bouquet, and piece we create is handmade by our small team of crochet makers. Each petal is shaped stitch by stitch — no machine production, no mass manufacturing.',
  },
  {
    question: 'How long does an order take?',
    answer: 'Most individual flowers take 3–5 days to prepare. Bouquets take 4–7 days depending on size. Custom orders may take 5–10 days. We will always confirm your timeline when you place an order.',
  },
  {
    question: 'Can I customise colours?',
    answer: 'Absolutely. Most of our blooms are available in multiple colours, and many can be made in any colour you choose. Look for the "Customisable" label on a product, or start a custom bouquet and tell us what you have in mind.',
  },
  {
    question: 'Can I create my own bouquet?',
    answer: 'Yes — that is what our Custom Bouquet experience is for. You choose the flower types, the number of flowers, the colours, the wrapping, the ribbon, and the message. We handcraft it from scratch.',
  },
  {
    question: 'Do you deliver across India?',
    answer: 'Yes, we deliver pan-India. Orders are shipped via trusted courier services and typically arrive within 2–5 business days after preparation, depending on your location.',
  },
  {
    question: 'How much is shipping?',
    answer: 'Orders below ₹799 have a ₹69 shipping fee. Orders between ₹799 and ₹1,199 have a ₹49 shipping fee. Orders above ₹1,200 ship free.',
  },
  {
    question: 'Can I add a personalised message?',
    answer: 'Yes. You can add a personalised message card to any order for ₹39. We will handwrite your message and tuck it inside the wrapping.',
  },
  {
    question: 'Can I order in bulk?',
    answer: 'Yes. We take bulk and corporate orders for events, weddings, and return gifts. Please contact us on WhatsApp or through the Contact page with your requirements and timeline.',
  },
  {
    question: 'Do you accept urgent orders?',
    answer: 'We do our best to accommodate urgent requests. Since every piece is handmade, we cannot guarantee same-day or next-day delivery, but we will always try. Please message us on WhatsApp with your deadline.',
  },
  {
    question: 'How should crochet flowers be cared for?',
    answer: 'Keep them away from water and excessive dust. Avoid prolonged direct sunlight. Store carefully when not displayed. Use gentle cleaning methods — a soft brush or a light dust — and do not pull loose threads. Our Care Guide page has full details.',
  },
];

export const bouquetTiers = [
  { name: 'Little Bloom', flowers: '1 flower', price: 499, code: 'TPB-BQ-001' },
  { name: 'Bloom Duo', flowers: '2 flowers', price: 699, code: 'TPB-BQ-002' },
  { name: 'Trio of Petals', flowers: '3 flowers', price: 899, code: 'TPB-BQ-003', popular: true },
  { name: 'Petal Story', flowers: '5 flowers', price: 1299, code: 'TPB-BQ-004' },
  { name: 'Garden in Bloom', flowers: '7 flowers', price: 1599, code: 'TPB-BQ-005' },
  { name: 'Forever Garden', flowers: '9 flowers', price: 1999, code: 'TPB-BQ-006' },
];

export const instagramPosts = [
  'https://images.pexels.com/photos/20269075/pexels-photo-20269075.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/29753251/pexels-photo-29753251.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/17864125/pexels-photo-17864125.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/36595917/pexels-photo-36595917.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/39412616/pexels-photo-39412616.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'https://images.pexels.com/photos/32280850/pexels-photo-32280850.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
];

export const heroImages = {
  primary: 'https://images.unsplash.com/photo-1747856056384-ba35f5ed353d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0',
  secondary: 'https://images.pexels.com/photos/29753251/pexels-photo-29753251.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
  texture: 'https://images.pexels.com/photos/3693232/pexels-photo-3693232.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
  hands: 'https://images.pexels.com/photos/7750721/pexels-photo-7750721.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
  yarn: 'https://images.pexels.com/photos/8931780/pexels-photo-8931780.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
  giftBox: 'https://images.pexels.com/photos/10482144/pexels-photo-10482144.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
};

export const navLinks = [
  { label: 'Shop', path: '/shop' },
  { label: 'Flowers', path: '/flowers' },
  { label: 'Bouquets', path: '/bouquets' },
  { label: 'Gifts', path: '/gifts' },
  { label: 'Bags', path: '/bags' },
  { label: 'Custom', path: '/custom' },
  { label: 'About', path: '/about' },
];

export const brandInfo = {
  name: 'The Petal & Bloom',
  tagline: 'Handmade Crochet Gifts & Blooms',
  secondaryMessage: 'Flowers that never fade. Gifts that stay.',
  instagram: '@thepetalandbloom',
  instagramUrl: 'https://instagram.com/thepetalandbloom',
  whatsappNumber: '+919861615937',
  email: '',
  businessHours: 'Monday – Saturday, 10 AM – 7 PM IST',
  responseTime: 'We typically respond within a few hours during business hours.',
  announcementsEnabled: true,
  announcements: [
    "Free shipping on orders above ₹1,200! 🌸",
    "Limited Edition Mother's Day collection now available. ✨",
    "Each petal is handmade with love and precision. 🧶",
    "Custom bouquets take 5-10 days to perfect. 🕰️"
  ]
};
