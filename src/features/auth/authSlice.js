import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signupUserAccount,
  loginUserAccount,
  logoutUserAccount,
  checkUserTokenExists,
} from "./authAPI";

const initialState = {
  loggedInUserToken: null, //only jwt token is passed here for more sequrity
  status: "idle",
  loginErrors: null,
};

//signup ACtion
export const signupUserAccountAsync = createAsyncThunk(
  "auth/signupUserAccount",
  async (userData) => {
    const response = await signupUserAccount(userData);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

//login ACtion
export const loginUserAccountAsync = createAsyncThunk(
  "auth/loginUserAccount",
  async (loginData, { rejectWithValue }) => {
    try {
      // to handle resolve from api
      const response = await loginUserAccount(loginData);
      // console.log(response, "from auth slice");
      return response;
    } catch (error) {
      // to handle reject from api
      // console.log(error,"login errors if any");
      return rejectWithValue(error);
    }
  }
);

//check user token ACtion
export const checkUserTokenExistsAsync = createAsyncThunk(
  "auth/checkUserTokenExists",
  async () => {
    try {
      const response = await checkUserTokenExists();
      return response;
    } catch (error) {
      // return rejectWithValue(error);
      console.log(error);
      //todo: redirect to login
    }
  }
);

//logout ACtion
export const logoutUserAccountAsync = createAsyncThunk(
  "auth/logoutUserAccount",
  async () => {
    const response = await logoutUserAccount();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
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
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAccountAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAccountAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAccountAsync.rejected, (state, action) => {
        state.status = "idle";
        state.loginErrors = action.payload;
        // console.log(action, "login user reject error thunk");
      })
      .addCase(logoutUserAccountAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAccountAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkUserTokenExistsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserTokenExistsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        //instead of login, 'checkUser' will set loogeinUsertoken if session exits in bak
        // however we dont need token val any where in our site only in browser cookie
        // that will automatically send token on every http req, to backend
        //and backend will check,in backend session that user.token exits thn allow client
        // also,we only need 'loggedInUserToken' as a boolean of if user exits in frontend
      });
  },
});

export const { increment } = authSlice.actions;

export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectLoginErrors = (state) => state.auth.loginErrors;

export default authSlice.reducer;
