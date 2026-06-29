export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  featured: boolean;
  inventory: number;
  image: string;
  description: string;
  details: string[];
};

export type CartItem = {
  id: string;
  quantity: number;
};

export type CartLine = CartItem & {
  product: Product;
};
