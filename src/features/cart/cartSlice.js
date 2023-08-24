import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  fetchCartByUserId,
  updateCartItem,
  deleteCartItem,
  resetCartItems,
} from "./cartAPI";

const initialState = {
  items: [], //cartItems
  status: "idle",
};

export const addItemToCartAsync = createAsyncThunk(
  "cart/addItemToCart",
  async (cartItem) => {
    const response = await addItemToCart(cartItem);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response;
  }
);
export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (userId) => {
    const response = await fetchCartByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response.data;
  }
);
export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItem",
  async (updatedCartItem) => {
    const response = await updateCartItem(updatedCartItem);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (deleteCartItemId) => {
    const response = await deleteCartItem(deleteCartItemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartItemsAsync = createAsyncThunk(
  "cart/resetCartItems",
  async (userId) => {
    const response = await resetCartItems(userId);
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
      .addCase(addItemToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
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
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action.payload, "update");
        // console.log(state.items, "update state");
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        state.items.splice(index, 1);
      })
      .addCase(resetCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
