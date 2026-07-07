// Product catalog — single source of truth
const products = [
  { id: 1, name: "Oslo Lounge Chair",   price: 249, category: "Chair", rating: 5, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Nordic Fabric Sofa",  price: 899, category: "Sofa",  rating: 4, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Oak Dining Table",    price: 549, category: "Table", rating: 5, image: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Cloud Platform Bed",  price: 1199,category: "Bed",   rating: 5, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Brass Arc Lamp",      price: 189, category: "Lamp",  rating: 4, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Velvet Accent Chair", price: 329, category: "Chair", rating: 5, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80" },
  { id: 7, name: "Modular L-Sofa",      price: 1499,category: "Sofa",  rating: 5, image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "Marble Coffee Table", price: 399, category: "Table", rating: 4, image: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?auto=format&fit=crop&w=600&q=80" },
  { id: 9, name: "Linen Queen Bed",     price: 899, category: "Bed",   rating: 4, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" },
  { id:10, name: "Ceramic Table Lamp",  price:  89, category: "Lamp",  rating: 5, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80" },
  { id:11, name: "Rattan Reading Chair",price: 279, category: "Chair", rating: 4, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80" },
  { id:12, name: "Walnut Side Table",   price: 219, category: "Table", rating: 5, image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80" },
];
const categories = [
  { name: "All",   icon: "bi-grid" },
  { name: "Chair", icon: "bi-square" },
  { name: "Sofa",  icon: "bi-columns" },
  { name: "Table", icon: "bi-table" },
  { name: "Bed",   icon: "bi-moon" },
  { name: "Lamp",  icon: "bi-lightbulb" },
];
