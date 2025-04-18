import { RootState } from "@/redux/store";
import { CartState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCarts: (state, action) => {
      console.log(state, action);
    },
  },
});

export const { setCarts } = cartSlice.actions;
export default cartSlice.reducer;

export const selectedCarts = (state: RootState) => state.carts.cartItems;
export const selectedTotalAmount = (state: RootState) => state.carts.totalAmount;
