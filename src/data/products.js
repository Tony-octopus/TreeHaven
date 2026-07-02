/**
 * TreeHaven product catalog (mock data).
 *
 * There is no backend in this project, so this module is the single source of
 * truth for categories and products. Each product carries an `art` descriptor
 * that the <ProductImage /> component turns into a self-contained SVG
 * illustration (no external image requests, so it works offline).
 */

/** @typedef {'indoor'|'outdoor'|'fruit'|'bonsai'|'care'} CategoryId */

export const categories = [
  {
    id: 'indoor',
    name: 'Indoor Trees',
    tagline: 'Living sculpture for bright corners',
    description:
      'Statement foliage that thrives in living rooms, studios, and offices.',
    art: { kind: 'plant', shape: 'round', leaf: '#3f8f5b', pot: '#c47a4b' },
  },
  {
    id: 'outdoor',
    name: 'Outdoor Trees',
    tagline: 'Shade, structure, and seasonal color',
    description:
      'Hardy specimens that anchor gardens, patios, and courtyards year-round.',
    art: { kind: 'plant', shape: 'pine', leaf: '#2f6f47', pot: '#9a9d94' },
  },
  {
    id: 'fruit',
    name: 'Fruit Trees',
    tagline: 'Homegrown harvests, small-space friendly',
    description:
      'Dwarf and patio varieties bred for real fruit in pots or plots.',
    art: { kind: 'plant', shape: 'round', leaf: '#4f9a54', pot: '#b5623a', fruit: '#e8b13a' },
  },
  {
    id: 'bonsai',
    name: 'Bonsai',
    tagline: 'The art of patience, in miniature',
    description:
      'Curated starter bonsai and refined specimens with training-ready form.',
    art: { kind: 'plant', shape: 'bonsai', leaf: '#2f7d51', pot: '#6f7268' },
  },
  {
    id: 'care',
    name: 'Tree Care Supplies',
    tagline: 'Everything your trees need to flourish',
    description:
      'Soil, feed, tools, and vessels chosen to keep every tree healthy.',
    art: { kind: 'supply', shape: 'soil', leaf: '#6f9a72', pot: '#7a5c41' },
  },
]

/** Quick lookup: category id -> category record. */
export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.id, category]),
)

/**
 * Care metadata shared across living plants.
 * light:     sunlight preference
 * water:     watering cadence
 * difficulty:'Easy' | 'Moderate' | 'Advanced'
 * size:      mature/shipped size guidance
 */
export const products = [
  // ------------------------------------------------------------- Indoor
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    category: 'indoor',
    price: 89,
    rating: 4.6,
    reviews: 214,
    stock: 12,
    badges: ['bestseller'],
    description:
      'The iconic Ficus lyrata, prized for its glossy, violin-shaped leaves. A single well-placed plant instantly warms up a bright room.',
    care: {
      light: 'Bright, indirect light',
      water: 'When top 2" of soil are dry',
      difficulty: 'Moderate',
      size: '3–4 ft tall on arrival',
    },
    art: { kind: 'plant', shape: 'round', leaf: '#3f8f5b', leafDark: '#2c6b41', pot: '#c47a4b' },
  },
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    category: 'indoor',
    price: 64,
    rating: 4.8,
    reviews: 389,
    stock: 20,
    badges: ['bestseller'],
    description:
      'The Swiss cheese plant, loved for dramatic split leaves that fenestrate more as it matures. Fast-growing and forgiving.',
    care: {
      light: 'Medium to bright, indirect',
      water: 'Weekly; let soil dry slightly',
      difficulty: 'Easy',
      size: '2–3 ft tall, trellis-ready',
    },
    art: { kind: 'plant', shape: 'split', leaf: '#3c8b57', leafDark: '#296a3f', pot: '#e5dcc8' },
  },
  {
    id: 'norfolk-island-pine',
    name: 'Norfolk Island Pine',
    category: 'indoor',
    price: 52,
    rating: 4.4,
    reviews: 96,
    stock: 15,
    badges: [],
    description:
      'A soft, symmetrical evergreen that doubles as a living holiday tree. Feathery tiers bring year-round texture indoors.',
    care: {
      light: 'Bright, indirect light',
      water: 'Keep evenly moist',
      difficulty: 'Moderate',
      size: '2–3 ft tall on arrival',
    },
    art: { kind: 'plant', shape: 'pine', leaf: '#356f4a', leafDark: '#244f34', pot: '#d9cdb4' },
  },
  {
    id: 'money-tree',
    name: 'Money Tree',
    category: 'indoor',
    price: 46,
    rating: 4.7,
    reviews: 271,
    stock: 24,
    badges: ['bestseller'],
    description:
      'Pachira aquatica with a signature braided trunk and lush palmate leaves. Famed as a symbol of good fortune and remarkably low-fuss.',
    care: {
      light: 'Bright, indirect light',
      water: 'Every 1–2 weeks',
      difficulty: 'Easy',
      size: '18–26 in tall',
    },
    art: { kind: 'plant', shape: 'palm', leaf: '#43966a', leafDark: '#2f6f47', pot: '#9a9d94', braided: true },
  },
  {
    id: 'bird-of-paradise',
    name: 'Bird of Paradise',
    category: 'indoor',
    price: 78,
    rating: 4.5,
    reviews: 142,
    stock: 9,
    badges: ['new'],
    description:
      'Strelitzia nicolai delivers big, paddle-shaped leaves and a tropical, architectural silhouette that fills a corner with ease.',
    care: {
      light: 'Bright light, some direct sun',
      water: 'When top inch is dry',
      difficulty: 'Moderate',
      size: '3–4 ft tall on arrival',
    },
    art: { kind: 'plant', shape: 'fan', leaf: '#3f8f5b', leafDark: '#2b6a40', pot: '#c47a4b' },
  },
  {
    id: 'rubber-plant',
    name: 'Rubber Plant',
    category: 'indoor',
    price: 42,
    rating: 4.6,
    reviews: 158,
    stock: 18,
    badges: [],
    description:
      'Ficus elastica with thick, burgundy-tinged leaves that shine. A sturdy, upright grower that tolerates a range of conditions.',
    care: {
      light: 'Medium to bright, indirect',
      water: 'When top 2" are dry',
      difficulty: 'Easy',
      size: '2–3 ft tall on arrival',
    },
    art: { kind: 'plant', shape: 'round', leaf: '#3a6f4d', leafDark: '#6a2f3a', pot: '#3f423e' },
  },

  // ------------------------------------------------------------- Outdoor
  {
    id: 'japanese-maple',
    name: 'Japanese Maple',
    category: 'outdoor',
    price: 119,
    rating: 4.9,
    reviews: 203,
    stock: 7,
    badges: ['bestseller'],
    description:
      'Acer palmatum with delicate, lace-like foliage that blazes crimson in autumn. A refined centerpiece for gardens and large patios.',
    care: {
      light: 'Partial shade to full sun',
      water: 'Regularly; keep roots cool',
      difficulty: 'Moderate',
      size: '3–4 ft, container-grown',
    },
    art: { kind: 'plant', shape: 'round', leaf: '#b8412e', leafDark: '#8a2c22', pot: '#9a9d94' },
  },
  {
    id: 'olive-tree',
    name: 'Olive Tree',
    category: 'outdoor',
    price: 98,
    rating: 4.7,
    reviews: 176,
    stock: 11,
    badges: [],
    description:
      'A Mediterranean classic with silvery-green leaves and a gnarled, characterful trunk. Drought-tolerant and endlessly elegant.',
    care: {
      light: 'Full sun',
      water: 'Drought-tolerant once established',
      difficulty: 'Easy',
      size: '3–4 ft tall on arrival',
    },
    art: { kind: 'plant', shape: 'round', leaf: '#7f9d78', leafDark: '#5c7a58', pot: '#b5623a' },
  },
  {
    id: 'dwarf-alberta-spruce',
    name: 'Dwarf Alberta Spruce',
    category: 'outdoor',
    price: 69,
    rating: 4.5,
    reviews: 88,
    stock: 16,
    badges: [],
    description:
      'A tidy, cone-shaped evergreen that keeps its neat form with almost no pruning. Perfect for flanking entryways in pairs.',
    care: {
      light: 'Full sun to partial shade',
      water: 'Weekly until established',
      difficulty: 'Easy',
      size: '2–3 ft tall on arrival',
    },
    art: { kind: 'plant', shape: 'cone', leaf: '#2f6f47', leafDark: '#214f33', pot: '#7a5c41' },
  },
  {
    id: 'weeping-willow',
    name: 'Weeping Willow',
    category: 'outdoor',
    price: 84,
    rating: 4.4,
    reviews: 64,
    stock: 6,
    badges: [],
    description:
      'Salix babylonica with graceful, cascading branches that sway with every breeze. A fast-growing shade tree for open spaces.',
    care: {
      light: 'Full sun',
      water: 'Loves consistent moisture',
      difficulty: 'Moderate',
      size: '4–5 ft, bare-root or potted',
    },
    art: { kind: 'plant', shape: 'weeping', leaf: '#6f9a4f', leafDark: '#4f7a38', pot: '#9a9d94' },
  },

  // -------------------------------------------------------------- Fruit
  {
    id: 'meyer-lemon-tree',
    name: 'Meyer Lemon Tree',
    category: 'fruit',
    price: 72,
    rating: 4.8,
    reviews: 331,
    stock: 14,
    badges: ['bestseller'],
    description:
      'A dwarf citrus that fruits indoors or out, with fragrant blossoms and sweeter-than-standard lemons. Productive in a patio pot.',
    care: {
      light: 'Full sun, 6+ hours',
      water: 'When top inch is dry',
      difficulty: 'Moderate',
      size: '2–3 ft, may arrive fruiting',
    },
    art: { kind: 'plant', shape: 'round', leaf: '#3f8f5b', leafDark: '#2c6b41', pot: '#b5623a', fruit: '#f2c333' },
  },
  {
    id: 'chicago-hardy-fig',
    name: 'Chicago Hardy Fig',
    category: 'fruit',
    price: 58,
    rating: 4.6,
    reviews: 149,
    stock: 13,
    badges: [],
    description:
      'A cold-tough fig that rebounds from frost and rewards you with rich, honeyed fruit. Big tropical leaves on a compact frame.',
    care: {
      light: 'Full sun',
      water: 'Deeply, once weekly',
      difficulty: 'Easy',
      size: '2–3 ft tall on arrival',
    },
    art: { kind: 'plant', shape: 'round', leaf: '#4a9358', leafDark: '#316638', pot: '#c47a4b', fruit: '#7d4a86' },
  },
  {
    id: 'dwarf-apple-tree',
    name: 'Dwarf Apple Tree',
    category: 'fruit',
    price: 66,
    rating: 4.5,
    reviews: 118,
    stock: 10,
    badges: [],
    description:
      'A patio-sized apple on dwarfing rootstock that delivers full-sized, crisp fruit. Spring blossoms are a pollinator favorite.',
    care: {
      light: 'Full sun',
      water: 'Weekly, deep watering',
      difficulty: 'Moderate',
      size: '3–4 ft, container-grown',
    },
    art: { kind: 'plant', shape: 'round', leaf: '#4f9a54', leafDark: '#367039', pot: '#9a9d94', fruit: '#d84c3e' },
  },
  {
    id: 'pomegranate-tree',
    name: 'Pomegranate Tree',
    category: 'fruit',
    price: 61,
    rating: 4.4,
    reviews: 77,
    stock: 8,
    badges: ['new'],
    description:
      'Punica granatum offers fiery orange blooms, jewel-toned fruit, and heat tolerance. Happy in the ground or a generous container.',
    care: {
      light: 'Full sun',
      water: 'Moderate; drought-tolerant',
      difficulty: 'Easy',
      size: '2–3 ft tall on arrival',
    },
    art: { kind: 'plant', shape: 'round', leaf: '#5a9a52', leafDark: '#3d7038', pot: '#b5623a', fruit: '#c8452f' },
  },

  // ------------------------------------------------------------- Bonsai
  {
    id: 'bonsai-juniper',
    name: 'Bonsai Juniper',
    category: 'bonsai',
    price: 54,
    rating: 4.7,
    reviews: 205,
    stock: 17,
    badges: ['bestseller'],
    description:
      'A classic starter bonsai with sculpted, windswept branches and dense green foliage. Ships in a glazed training pot.',
    care: {
      light: 'Bright light, some direct sun',
      water: 'When topsoil begins to dry',
      difficulty: 'Moderate',
      size: '8–10 in, shaped',
    },
    art: { kind: 'plant', shape: 'bonsai', leaf: '#2f7d51', leafDark: '#215538', pot: '#6f7268' },
  },
  {
    id: 'chinese-elm-bonsai',
    name: 'Chinese Elm Bonsai',
    category: 'bonsai',
    price: 63,
    rating: 4.6,
    reviews: 132,
    stock: 12,
    badges: [],
    description:
      'One of the most forgiving bonsai for beginners, with fine ramified branches and small, serrated leaves that back-bud readily.',
    care: {
      light: 'Bright, indirect to partial sun',
      water: 'Keep evenly moist',
      difficulty: 'Easy',
      size: '9–12 in, shaped',
    },
    art: { kind: 'plant', shape: 'bonsai', leaf: '#3f8f5b', leafDark: '#2b6a40', pot: '#4f3b2b' },
  },
  {
    id: 'japanese-maple-bonsai',
    name: 'Japanese Maple Bonsai',
    category: 'bonsai',
    price: 88,
    rating: 4.8,
    reviews: 94,
    stock: 5,
    badges: ['new'],
    description:
      'A refined deciduous bonsai that shifts from spring green to fiery fall red. A living calendar for a sunlit windowsill.',
    care: {
      light: 'Morning sun, afternoon shade',
      water: 'Daily in warm months',
      difficulty: 'Advanced',
      size: '10–12 in, shaped',
    },
    art: { kind: 'plant', shape: 'bonsai', leaf: '#c24a30', leafDark: '#8f3222', pot: '#3f423e' },
  },

  // ---------------------------------------------------------- Care supplies
  {
    id: 'organic-tree-food',
    name: 'Organic Slow-Release Tree Food',
    category: 'care',
    price: 24,
    rating: 4.7,
    reviews: 412,
    stock: 60,
    badges: ['bestseller'],
    description:
      'A gentle, OMRI-style granular feed that releases nutrients over three months. Safe for indoor trees, citrus, and bonsai alike.',
    attributes: { size: '2 lb resealable pouch', coverage: 'Feeds up to 12 potted trees' },
    art: { kind: 'supply', shape: 'food', leaf: '#6f9a72', pot: '#7a5c41' },
  },
  {
    id: 'bonsai-pruning-shears',
    name: 'Bonsai Pruning Shears',
    category: 'care',
    price: 34,
    rating: 4.8,
    reviews: 188,
    stock: 40,
    badges: [],
    description:
      'Precision carbon-steel shears with a comfortable loop handle for clean, accurate cuts on delicate branches and roots.',
    attributes: { material: 'Carbon steel', length: '7 in' },
    art: { kind: 'supply', shape: 'shears', leaf: '#9a9d94', pot: '#3f423e' },
  },
  {
    id: 'soil-moisture-meter',
    name: 'Soil Moisture Meter',
    category: 'care',
    price: 19,
    rating: 4.5,
    reviews: 264,
    stock: 55,
    badges: [],
    description:
      'Take the guesswork out of watering. Insert the probe for an instant, battery-free reading from dry to wet.',
    attributes: { power: 'No batteries required', probe: '8 in stainless probe' },
    art: { kind: 'supply', shape: 'meter', leaf: '#43966a', pot: '#e5dcc8' },
  },
  {
    id: 'terracotta-grow-pot',
    name: 'Terracotta Grow Pot',
    category: 'care',
    price: 28,
    rating: 4.6,
    reviews: 141,
    stock: 34,
    badges: [],
    description:
      'A breathable, kiln-fired terracotta planter with a drainage hole and matching saucer. Sized for young indoor trees.',
    attributes: { diameter: '10 in', includes: 'Saucer included' },
    art: { kind: 'supply', shape: 'pot', leaf: '#c47a4b', pot: '#b5623a' },
  },
  {
    id: 'coco-coir-potting-mix',
    name: 'Coco Coir Potting Mix',
    category: 'care',
    price: 22,
    rating: 4.7,
    reviews: 209,
    stock: 48,
    badges: [],
    description:
      'A light, well-draining mix of coco coir, perlite, and bark that resists compaction — ideal for trees, citrus, and bonsai.',
    attributes: { size: '8 qt bag', blend: 'Coir · perlite · bark' },
    art: { kind: 'supply', shape: 'soil', leaf: '#6f9a72', pot: '#7a5c41' },
  },
]

/* ------------------------------------------------------------------ Selectors */

/** Find a single product by its id. Returns undefined when not found. */
export function getProductById(id) {
  return products.find((product) => product.id === id)
}

/** All products in a category. */
export function getProductsByCategory(categoryId) {
  return products.filter((product) => product.category === categoryId)
}

/** Curated "best-selling" list for the home page. */
export function getFeaturedProducts(limit = 8) {
  return products
    .filter((product) => product.badges?.includes('bestseller'))
    .slice(0, limit)
}

/**
 * Products related to the given one: same category first, then padded with
 * other items so the strip is never empty. Never includes the product itself.
 */
export function getRelatedProducts(product, limit = 4) {
  if (!product) return []
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  )
  const others = products.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  )
  return [...sameCategory, ...others].slice(0, limit)
}
