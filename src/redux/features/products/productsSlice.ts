import { RootState } from "@/redux/store";
import { TProductState } from "@/types/products.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TProductState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;

export const selectedProducts = (state: RootState) => state.products.products;
