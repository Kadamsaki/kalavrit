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
    name: "Neha Sharma",
    location: "Mumbai",
    rating: 5,
    occasion: "Anniversary Gift",
    createdAt: "2025-11-03",
    text: "When we opened it, my husband actually went quiet for a moment. The way they captured our expressions, the warmth in the brushwork — it felt like looking at a cherished memory, not just a photo. We both had tears in our eyes. This is now the centerpiece of our living room.",
    image: "/featured_1.jpg",
  },
  {
    id: "r2",
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    occasion: "Birthday Surprise",
    createdAt: "2025-11-01",
    text: "I was honestly skeptical about digital art for a portrait, but KalaVrit completely exceeded my expectations. The way they captured the light dancing in my daughter's eyes was absolutely magical. She cried when she saw it — best birthday gift I've ever given!",
    image: "/featured_2.jpg",
  },
  {
    id: "r3",
    name: "Ananya Reddy",
    location: "Bangalore",
    rating: 5,
    occasion: "Couple Portrait",
    createdAt: "2025-10-28",
    text: "The Ghibli-style portrait of us brought out such whimsy and joy! Every visitor who comes to our home asks where we got it done. The attention to small details — the way my partner holds my hand, our matching smiles — it's like they understood our love story.",
    image: "/featured_3.jpg",
  },
  {
    id: "r4",
    name: "Vikram Patel",
    location: "Pune",
    rating: 4,
    occasion: "Memorial Tribute",
    createdAt: "2025-10-25",
    text: "We commissioned a portrait of my late grandmother from an old photograph. The depth and emotion in the charcoal-style work has a quality that photographs just cannot match. My mother was speechless. Thank you for helping us preserve her memory so beautifully.",
    image: "/artwork_4.jpg",
  },
];
