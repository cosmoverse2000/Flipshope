import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchFilterProducts } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (amount) => {
    const response = await fetchAllProducts(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//just like all-products api func above , getting filtered products
export const fetchFilterProductsAsync = createAsyncThunk(
  "product/fetchFilterProducts",
  async (amount) => {
    //executing filter api function and getting reasponse
    const response = await fetchFilterProducts(amount);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchFilterProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilterProductsAsync.fulfilled, (state, action) => {
        // console.log(action.payload);
        //replacing prev product list to new filtered products
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
