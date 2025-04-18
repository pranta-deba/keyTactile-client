export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  availableQuantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
}
