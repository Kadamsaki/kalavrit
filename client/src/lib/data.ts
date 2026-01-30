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
};

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  occasion: string;
  createdAt: string;
};

export type CustomOrderDraft = {
  paintingType: "Ghibli" | "Vector Art" | "Sketch" | "Charcoal" | "Realistic";
  person: "Couple" | "Solo";
  size: "A4" | "A3" | "12x16" | "16x20";
  frame: "With Frame" | "Without Frame";
  story: string;
  references: File[];
};

export type OrderStatus = "New" | "In review" | "Sketch approved" | "Painting" | "Shipped" | "Delivered";

export type AdminOrder = {
  id: string;
  customer: string;
  type: CustomOrderDraft["person"];
  budget: string;
  status: OrderStatus;
  createdAt: string;
};

export const artist = {
  name: "KalaVrit",
  studio: "KalaVrit",
  city: "",
  tagline: "Turning emotions into art",
};

export const artworks: Artwork[] = [
  {
    id: "iv-001",
    title: "A Quiet Promise",
    subtitle: "Couple portrait — warm terracotta wash",
    price: 12999,
    currency: "INR",
    size: "16×20 in",
    medium: "Acrylic on canvas",
    year: "2025",
    tags: ["Couple", "Warm", "Best seller"],
    availability: "Available",
    story:
      "Painted from a single phone photo taken on a rainy evening—this piece is about the soft kind of love that feels safe.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'%3E%3Cdefs%3E%3CradialGradient id='g' cx='30%25' cy='25%25'%3E%3Cstop offset='0%25' stop-color='%23f8efe4'/%3E%3Cstop offset='45%25' stop-color='%23e7c2a5'/%3E%3Cstop offset='100%25' stop-color='%23b86b49'/%3E%3C/radialGradient%3E%3ClinearGradient id='s' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23000000' stop-opacity='0.08'/%3E%3Cstop offset='100%25' stop-color='%23000000' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='900' fill='url(%23g)'/%3E%3Cpath d='M120 720 C260 600 340 560 480 620 C620 680 720 760 900 700 C1040 650 1110 560 1180 520' stroke='%23ffffff' stroke-opacity='0.42' stroke-width='20' fill='none'/%3E%3Crect width='1200' height='900' fill='url(%23s)'/%3E%3C/svg%3E",
    accent: "terracotta",
  },
  {
    id: "iv-002",
    title: "Sunlit Letters",
    subtitle: "Memory piece — handwritten note texture",
    price: 8999,
    currency: "INR",
    size: "12×16 in",
    medium: "Gouache & ink",
    year: "2025",
    tags: ["Memory", "Gold", "Limited"],
    availability: "Available",
    story:
      "A portrait built around a letter—because sometimes the voice of a person is what you miss the most.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'%3E%3Cdefs%3E%3CradialGradient id='g' cx='70%25' cy='18%25'%3E%3Cstop offset='0%25' stop-color='%23fff6d8'/%3E%3Cstop offset='55%25' stop-color='%23ecd5a8'/%3E%3Cstop offset='100%25' stop-color='%23d1a25a'/%3E%3C/radialGradient%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='1200' height='900' fill='url(%23g)'/%3E%3Crect width='1200' height='900' filter='url(%23n)' opacity='.12'/%3E%3Cpath d='M160 170 L1040 260' stroke='%23000000' stroke-opacity='0.10' stroke-width='18'/%3E%3Cpath d='M210 270 L980 345' stroke='%23000000' stroke-opacity='0.10' stroke-width='14'/%3E%3Cpath d='M190 360 L1020 460' stroke='%23000000' stroke-opacity='0.10' stroke-width='16'/%3E%3C/svg%3E",
    accent: "gold",
  },
  {
    id: "iv-003",
    title: "Paws in the Porchlight",
    subtitle: "Pet portrait — charcoal warmth",
    price: 6499,
    currency: "INR",
    size: "A3",
    medium: "Charcoal & pastel",
    year: "2024",
    tags: ["Pet", "Charcoal"],
    availability: "Sold",
    story:
      "A loyal face, painted with the kind of softness that makes a house feel like home.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'%3E%3Cdefs%3E%3CradialGradient id='g' cx='35%25' cy='20%25'%3E%3Cstop offset='0%25' stop-color='%23f2efe8'/%3E%3Cstop offset='55%25' stop-color='%23c9c1b2'/%3E%3Cstop offset='100%25' stop-color='%23424344'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='1200' height='900' fill='url(%23g)'/%3E%3Ccircle cx='420' cy='480' r='170' fill='%23ffffff' fill-opacity='0.16'/%3E%3Ccircle cx='680' cy='470' r='210' fill='%23ffffff' fill-opacity='0.10'/%3E%3C/svg%3E",
    accent: "ink",
  },
  {
    id: "iv-004",
    title: "Grandma’s Window",
    subtitle: "Family portrait — muted gold highlights",
    price: 18999,
    currency: "INR",
    size: "16×20 in",
    medium: "Oil on canvas",
    year: "2024",
    tags: ["Family", "Gold"],
    availability: "Available",
    story:
      "Commissioned to celebrate three generations—light enters like forgiveness and stays like love.",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23f7efe1'/%3E%3Cstop offset='55%25' stop-color='%23e0c79a'/%3E%3Cstop offset='100%25' stop-color='%23c27a52'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='900' fill='url(%23g)'/%3E%3Crect x='220' y='160' width='760' height='560' fill='%23ffffff' fill-opacity='0.12' stroke='%23ffffff' stroke-opacity='0.22' stroke-width='10'/%3E%3Cpath d='M260 620 C380 500 460 520 560 600 C650 670 750 690 950 560' stroke='%23000000' stroke-opacity='0.08' stroke-width='20' fill='none'/%3E%3C/svg%3E",
    accent: "terracotta",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Neha",
    location: "Mumbai",
    rating: 5,
    occasion: "Anniversary",
    createdAt: "2025-11-03",
    text:
      "When we opened it, my husband actually went quiet. It looked like a memory, not a photo. The warmth in the brushwork made us feel… held.",
  },
  {
    id: "r2",
    name: "Rohan",
    location: "Bengaluru",
    rating: 5,
    occasion: "Pet portrait",
    createdAt: "2025-10-14",
    text:
      "I didn’t expect a painting to bring that kind of comfort. It’s now the first thing I see every morning.",
  },
  {
    id: "r3",
    name: "Sana",
    location: "Delhi",
    rating: 4,
    occasion: "Family gift",
    createdAt: "2025-08-22",
    text:
      "The process was gentle and clear. The sketch approval step made us trust the final piece—and it turned out beautiful.",
  },
];

export const adminSeedOrders: AdminOrder[] = [
  { id: "o-1042", customer: "Neha R.", type: "Couple", budget: "₹12k–₹25k", status: "Delivered", createdAt: "2025-11-02" },
  { id: "o-1051", customer: "Imran S.", type: "Solo", budget: "₹6k–₹12k", status: "Painting", createdAt: "2025-12-06" },
  { id: "o-1058", customer: "Asha P.", type: "Solo", budget: "₹3k–₹6k", status: "In review", createdAt: "2025-12-18" },
];
