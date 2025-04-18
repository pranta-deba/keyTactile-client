export type TProduct = {
  _id?: string;
  title: string;
  brand: string;
  availableQuantity: number;
  price: number;
  rating: number;
  description: string;
  images: string[];
};

export type TUpdateProduct = {
  title: string;
  brand: string;
  availableQuantity: number;
  price: number;
  rating: number;
  description: string;
  images: string[];
};

export type TProductState = {
  products: TProduct[];
};

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export type TUpdateQuantity = {
  productId: string;
  action: "increase" | "decrease";
};
