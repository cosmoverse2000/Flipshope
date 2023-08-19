import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchUserOrders,
  fetchUserProfile,
  updateUserProfile,
} from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
  userProfile: null,
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

export const fetchUserProfileAsync = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId) => {
    const response = await fetchUserProfile(userId);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response, "userProfile");
    return response;
  }
);

export const updateUserProfileAsync = createAsyncThunk(
  "user/updateUserProfile",
  async (userData) => {
    const response = await updateUserProfile(userData);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response, "updateUserProf");
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
      })
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userProfile = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserProfile = (state) => state.user.userProfile;
export const selectUserLoadStatus = (state) => state.user.status;

export default userSlice.reducer;
