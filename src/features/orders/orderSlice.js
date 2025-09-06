import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToOrders,
  fetchAllOrders,
  updateOrder,
  deleteOrder,
  fetchUserOrders,
} from "./orderAPI";

const initialState = {
  status: "idle",
  //user
  userOrders: [], //user only order list
  currentOrder: null, //users current order
  //admin
  allOrders: [], // admin orders list of all users combined
  totalOrders: 0, // count of totalOrders in admin allOrderslist for pagination in admin
};

// by user
export const addToOrdersAsync = createAsyncThunk(
  "orders/addToOrders",
  async (order) => {
    const response = await addToOrders(order);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response;
  }
);

// by user
export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrders",
  async () => {
    const response = await fetchUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// by admin only
export const updateOrderAsync = createAsyncThunk(
  "orders/updateOrder",
  async ({ updatedOrder, toast, updateType }) => {
    const response = await updateOrder(updatedOrder);
    // The value we return becomes the `fulfilled` action payload
    if (updateType === "orderStatus") {
      toast.success("Order-Status Updated Successfully !");
    }
    if (updateType === "paymentStatus") {
      toast.success("Payment-Status Updated Successfully !");
    }
    return response;
  }
);

// by admin only
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
// by admin only
export const deleteOrderAsync = createAsyncThunk(
  "orders/deleteOrder",
  async ({ orderId, toast }) => {
    const response = await deleteOrder(orderId);
    // The value we return becomes the `fulfilled` action payload
    toast.success("Order Deleted Success");
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: (state) => {
      return initialState;
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
        state.userOrders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
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
export const selectUserOrders = (state) => state.order.userOrders;
//admin
export const selectAllOrders = (state) => state.order.allOrders;
export const selectTotalOrdersCount = (state) => state.order.totalOrders;
//oder detail
export const selectCurrentOrder = (state) => state.order.currentOrder;
//chekout order  place status-all status comb
export const selectOrderLoadingStatus = (state) => state.order.status;

export default orderSlice.reducer;
