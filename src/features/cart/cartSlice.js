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
  async ({ newItemToCart, toast }) => {
    const response = await addItemToCart(newItemToCart);
    // The value we return becomes the `fulfilled` action payload
    toast.success("Added to cart !");
    return response;
  }
);
export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart/fetchCartByUserId",
  async () => {
    const response = await fetchCartByUserId();
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
  async ({ prodId, toast }) => {
    const response = await deleteCartItem(prodId);
    // The value we return becomes the `fulfilled` action payload
    toast.error("Product removed from Cart !");
    return response.data;
  }
);

export const resetCartItemsAsync = createAsyncThunk(
  "cart/resetCartItems",
  async () => {
    const response = await resetCartItems();
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
    reset: (state) => {
      return initialState;
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

export const { reset } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
