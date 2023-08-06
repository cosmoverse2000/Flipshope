import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signupUserAccount, loginUserAccount } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  loginErrors: null,
};

//signup ACtion
export const signupUserAccountAsync = createAsyncThunk(
  "user/signupUserAccount",
  async (userData) => {
    const response = await signupUserAccount(userData);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

//login ACtion
export const loginUserAccountAsync = createAsyncThunk(
  "user/loginUserAccount",
  async (loginData) => {
    const response = await loginUserAccount(loginData);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const authSlice = createSlice({
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
      .addCase(signupUserAccountAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUserAccountAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAccountAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAccountAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAccountAsync.rejected, (state, action) => {
        state.status = "idle";
        state.loginErrors = action.error;
      });
  },
});

export const { increment } = authSlice.actions;

export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectLoginErrors = (state) => state.user.loginErrors;

export default authSlice.reducer;
