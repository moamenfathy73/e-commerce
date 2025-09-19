export interface CartItem {
  product: {
    id: string;
    title: string;
    imageCover?: string;
    price: number;
  };
  count: number;
  price: number;
}

export interface CartResponse {
  status: "success" | "error";
  message: string; 
  numOfCartItems?: number;
  data?: {
    products: CartItem[];
    totalCartPrice: number;
  };
}
