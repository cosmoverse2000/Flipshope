import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders } from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
};

export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrders",
  async (userId) => {
    const response = await fetchUserOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
