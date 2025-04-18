import { RootState } from "@/redux/store";
import { CartItem, CartState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCarts: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.productId === item.productId
      );
      if (existingItem) {
        if (existingItem.quantity < existingItem.availableQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.productId === action.payload);
      if (item && item.quantity < item.availableQuantity) {
        item.quantity += 1;
        state.totalAmount = state.cartItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
        const item = state.cartItems.find(i => i.productId === action.payload);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
          state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        }
      },

      
  },
});

export const { setCarts } = cartSlice.actions;
export default cartSlice.reducer;

export const selectedCarts = (state: RootState) => state.carts.cartItems;
export const selectedTotalAmount = (state: RootState) =>
  state.carts.totalAmount;
