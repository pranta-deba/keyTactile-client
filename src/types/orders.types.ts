export type TCartItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
};

export type TOrderData = {
  phone: string;
  address: string;
  cartItems: TCartItem[];
  totalAmount: number;
};
