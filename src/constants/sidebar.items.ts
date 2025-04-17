import { BaggageClaimIcon, CopyPlusIcon, Home,  ShoppingBagIcon } from "lucide-react";

export const items = [
  {
    title: "Home",
    url: "/dashboard/",
    icon: Home,
  },
  {
    title: "Order List",
    url: "/dashboard/order-list",
    icon: BaggageClaimIcon,
  },
  {
    title: "Product List",
    url: "/dashboard/product-list",
    icon: ShoppingBagIcon,
  },
  {
    title: "Add Product",
    url: "/dashboard/add-product",
    icon: CopyPlusIcon,
  },
];
