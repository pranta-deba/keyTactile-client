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

export type TGetOrder = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cartItems: TCartItem[];
  totalAmount: number;
  orderDate: string;
  status: "pending" | "processing" | "shipped" | "delivered";
};

export interface TOrderQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}
