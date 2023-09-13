import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfile } from "./userAPI";

const initialState = {
  status: "idle",
  userProfile: null,
  userProfileLoadingStatus: true,
};

export const fetchUserProfileAsync = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserProfile();
      // The value we return becomes the `fulfilled` action payload
      // console.log(response, "userProfile");
      return response;
    } catch (error) {
      console.log(error, "USER PROFILE ERR");
      return rejectWithValue(error);
    }
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
    reset: (state) => {
      return initialState;
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
        state.userProfileLoadingStatus = false;
      })
      .addCase(fetchUserProfileAsync.rejected, (state, action) => {
        state.status = "idle";
        // state.userProfile = action.payload;
        state.userProfileLoadingStatus = false;
        console.log(action.payload, "USER PROFILE ERROR");
      })
      .addCase(updateUserProfileAsync.pending, (state) => {
        state.status = "loading";
        state.userProfileLoadingStatus = true;
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userProfileLoadingStatus = false;
        state.userProfile = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;

export const selectUserProfile = (state) => state.user.userProfile;
export const selectUserLoadStatus = (state) => state.user.status;
export const selectUserProfileLoadingStatus = (state) =>
  state.user.userProfileLoadingStatus;

export default userSlice.reducer;
