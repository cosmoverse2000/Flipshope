import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addItemsToCart, fetchCartByUserId } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addItemsToCartAsync = createAsyncThunk(
  "cart/addItemsToCart",
  async (item) => {
    const response = await addItemsToCart(item);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response;
  }
);
export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (item) => {
    const response = await fetchCartByUserId(item);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemsToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
