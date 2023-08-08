import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToOrders } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
};

export const addToOrdersAsync = createAsyncThunk(
  "orders/addToOrders",
  async (order) => {
    const response = await addToOrders(order);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response;
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetCurrentOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;