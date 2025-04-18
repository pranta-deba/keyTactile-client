export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  image: string;
}

export interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
}
