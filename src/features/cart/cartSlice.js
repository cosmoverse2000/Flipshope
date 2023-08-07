import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addItemsToCart,
  fetchCartByUserId,
  updateCartItems,
  deleteCartItems,
} from "./cartAPI";

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
export const updateCartItemsAsync = createAsyncThunk(
  "cart/updateCartItems",
  async (updatedItem) => {
    const response = await updateCartItems(updatedItem);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);
export const deleteCartItemsAsync = createAsyncThunk(
  "cart/deleteCartItems",
  async (deleteItemId) => {
    const response = await deleteCartItems(deleteItemId);
    // The value we return becomes the `fulfilled` action payload
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
      })
      .addCase(updateCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        state.items.splice(index, 1);
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
