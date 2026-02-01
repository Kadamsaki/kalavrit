export type Artwork = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  currency: "INR";
  size: string;
  medium: string;
  year: string;
  tags: string[];
  availability: "Available" | "Sold";
  story: string;
  image: string;
  accent: "terracotta" | "gold" | "ink";
  objectPosition?: string; // Optional: custom positioning for image cropping
  objectFit?: "cover" | "contain"; // Optional: custom fit style (default: cover)
};

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  occasion: string;
  createdAt: string;
  image?: string; // Optional artwork image
};

export type CustomOrderDraft = {
  paintingType: "Ghibli" | "Vector Art" | "Sketch" | "Charcoal" | "Realistic";
  person: "Couple" | "Solo";
  size: "A1" | "A2" | "A3" | "Custom";
  frame: "With Frame" | "Without Frame";
  story: string;
  references: File[];
};

export type OrderStatus = "New" | "In review" | "Sketch approved" | "Painting" | "Shipped" | "Delivered";

export type AdminOrder = {
  id: string;
  customer: string;
  type: CustomOrderDraft["person"];
  status: OrderStatus;
  budget: string;
  createdAt: string;
};

export const adminSeedOrders: AdminOrder[] = [
  {
    id: "ORD-001",
    customer: "Amit Sharma",
    type: "Couple",
    status: "In review",
    budget: "₹7k–₹13k",
    createdAt: "2025-11-05",
  },
  {
    id: "ORD-002",
    customer: "Sneha Reddy",
    type: "Solo",
    status: "New",
    budget: "Under ₹7k",
    createdAt: "2025-11-06",
  },
];

export const artist = {
  name: "KalaVrit",
  studio: "KalaVrit",
  city: "KalaVrit Studio",
  tagline: "Turning emotions into art",
};

export const artworks: Artwork[] = [
  {
    id: "iv-001",
    title: "Eternal Devotion",
    subtitle: "Divine portrait — expressive color study",
    price: 0,
    currency: "INR",
    size: "A1",
    medium: "Acrylic on canvas",
    year: "2025",
    tags: ["Portrait", "Realistic", "Featured"],
    availability: "Available",
    story: "A majestic portrayal of devotion, captured in a vibrant explosion of colors and emotion.",
    image: "/featured_1.jpg",
    accent: "terracotta",
  },
  {
    id: "iv-002",
    title: "The Artist's Soul",
    subtitle: "Ghibli style — soft memory sketch",
    price: 0,
    currency: "INR",
    size: "A2",
    medium: "Digital Painting",
    year: "2025",
    tags: ["Ghibli", "Memory", "Featured"],
    availability: "Available",
    story: "Capturing the playful yet profound essence of creation through the whimsical lens of Ghibli-inspired art.",
    image: "/featured_2.jpg",
    accent: "gold",
    objectPosition: "top",
  },
  {
    id: "iv-003",
    title: "Divine Harmony",
    subtitle: "Iconic portrait — spiritual serenity",
    price: 0,
    currency: "INR",
    size: "A2",
    medium: "Mixed media",
    year: "2025",
    tags: ["Portrait", "Realistic", "Featured"],
    availability: "Available",
    story: "A piece that transcends the physical, reflecting inner peace and divine connection.",
    image: "/featured_3.jpg",
    accent: "ink",
  },
  {
    id: "iv-004",
    title: "Radha Krishna",
    subtitle: "Sketch — divine love study",
    price: 0,
    currency: "INR",
    size: "A4",
    medium: "Pencil Sketch",
    year: "2025",
    tags: ["Sketch", "Portrait", "Spiritual"],
    availability: "Available",
    story: "A delicate study of divine love, capturing the eternal bond of Radha and Krishna through intricate pencil work.",
    image: "/artwork_4.jpg",
    accent: "ink",
  },
  {
    id: "iv-005",
    title: "The Visionary",
    subtitle: "Portrait — expressive character study",
    price: 0,
    currency: "INR",
    size: "A3",
    medium: "Acrylic on paper",
    year: "2025",
    tags: ["Portrait", "Realistic"],
    availability: "Available",
    story: "Capturing the intellectual depth and visionary spirit through a bold, expressive portrait style.",
    image: "/artwork_5.jpg",
    accent: "ink",
  },
  {
    id: "iv-006",
    title: "Gaze of Reflection",
    subtitle: "Portrait — moody color study",
    price: 0,
    currency: "INR",
    size: "A3",
    medium: "Acrylic on canvas",
    year: "2025",
    tags: ["Portrait", "Realistic"],
    availability: "Available",
    story: "A moment of deep reflection captured with vibrant colors and expressive brushstrokes.",
    image: "/artwork_6.jpg",
    accent: "terracotta",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Priya & Arjun",
    location: "Mumbai",
    rating: 5,
    occasion: "Wedding Anniversary",
    createdAt: "2025-11-03",
    text: "We ordered this beautiful Shiv Parvati vector art for our first wedding anniversary. The divine love between Lord Shiva and Goddess Parvati perfectly represents our bond. The colors, the expressions, the intricate details — everything is so beautifully crafted. It now hangs in our pooja room and everyone who visits admires it!",
    image: "/featured_1.jpg",
  },
  {
    id: "r2",
    name: "Engineering Students",
    location: "Pune",
    rating: 5,
    occasion: "Gift for Watchman Uncle",
    createdAt: "2025-11-01",
    text: "We wanted to do something special for our college watchman uncle who has always been so kind to us. KalaVrit captured his warm smile and the tilak on his forehead perfectly. When we gifted it to him, his eyes filled with tears of joy. He said nobody had ever done something so thoughtful for him. Thank you for helping us express our gratitude!",
    image: "/reaction_watchman.jpg",
  },
  {
    id: "r3",
    name: "Salman Khan Fan Club",
    location: "Bangalore",
    rating: 5,
    occasion: "Fan Art Collection",
    createdAt: "2025-10-28",
    text: "As die-hard Bhai fans, we wanted a unique Salman Khan portrait that stands out from regular posters. This vibrant vector art is absolutely stunning! The bold colors and artistic style capture his iconic personality perfectly. It is the crown jewel of our fan collection. Being Bhaijaan is now an art piece in our room!",
    image: "/reaction_salman.jpg",
  },
  {
    id: "r4",
    name: "Kavita Deshmukh",
    location: "Pune",
    rating: 4,
    occasion: "Janmashtami Gift",
    createdAt: "2025-10-25",
    text: "Ordered this Radha Krishna artwork for Janmashtami and it arrived just in time. The divine love between Radha and Krishna is portrayed so beautifully — you can feel the devotion in every brushstroke. My grandmother was moved to tears when she saw it. It has brought such positive energy to our home temple.",
    image: "/reaction_radhakrishna.jpg",
  },
];
