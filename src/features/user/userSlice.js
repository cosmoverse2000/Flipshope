import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfile } from "./userAPI";

const initialState = {
  status: "idle",
  userProfile: null,
};

export const fetchUserProfileAsync = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    const response = await fetchUserProfile();
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

export const selectUserProfile = (state) => state.user.userProfile;
export const selectUserLoadStatus = (state) => state.user.status;

export default userSlice.reducer;
