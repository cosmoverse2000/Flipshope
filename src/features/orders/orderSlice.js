import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToOrders,
  fetchAllOrders,
  updateOrder,
  deleteOrder,
} from "./orderAPI";

const initialState = {
  orders: [], //user only order list
  allOrders: [], // admin orders list of all users combined
  status: "idle",
  currentOrder: null, //users current order
  totalOrders: 0, // count of totalOrders in admin allOrderslist
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
export const updateOrderAsync = createAsyncThunk(
  "orders/updateOrder",
  async (updatedOrder) => {
    const response = await updateOrder(updatedOrder);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "orders/fetchAllOrders",
  async ({ sorting, page }) => {
    //executing filter api function and getting reasponse
    // console.log(sorting, page);
    const response = await fetchAllOrders({ sorting, page });

    // The value we return becomes the `fulfilled` action payload
    // console.log(response, "admin orders list  ");
    return response.data;
  }
);
export const deleteOrderAsync = createAsyncThunk(
  "orders/deleteOrder",
  async (deleteOrderId) => {
    const response = await deleteOrder(deleteOrderId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
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
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allOrders = action.payload.ordersList;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.allOrders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.allOrders[index] = action.payload;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.allOrders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.allOrders.splice(index, 1);
      });
  },
});

export const { resetCurrentOrder } = orderSlice.actions;

//user
export const selectOrders = (state) => state.order.orders;
//admin
export const selectAllOrders = (state) => state.order.allOrders;
export const selectTotalOrdersCount = (state) => state.order.totalOrders;
//oder detail
export const selectCurrentOrder = (state) => state.order.currentOrder;
//chekout order  place status-all status comb
export const selectOrderLoadingStatus = (state) => state.order.status;

export default orderSlice.reducer;
