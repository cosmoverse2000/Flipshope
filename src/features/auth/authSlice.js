import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signupUserAccount,
  loginUserAccount,
  logoutUserAccount,
  checkUserTokenExists,
  resetPasswordRequest,
  resetPassword,
} from "./authAPI";

const initialState = {
  loggedInUserToken: null, //only jwt token is passed here for more sequrity
  status: "idle",
  authErrors: null,
  userCheckLoadingStatus: true, //intially load 'true' after fulfilled/rejected it will be 'false'
  resetPassMailSent: false,
  passwordSavedStatus: false,
};

//signup ACtion
export const signupUserAccountAsync = createAsyncThunk(
  "auth/signupUserAccount",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signupUserAccount(userData);
      // The value we return becomes the `fulfilled` action payload
      return response;
    } catch (error) {
      // to handle reject from api
      // console.log(error,"login errors if any");
      return rejectWithValue(error);
    }
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkUserTokenExists();
      return response;
    } catch (error) {
      console.log(error);
      // return rejectWithValue(error);
      //todo: redirect to login
    }
  }
);

//logout ACtion
export const logoutUserAccountAsync = createAsyncThunk(
  "auth/logoutUserAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUserAccount();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//generate reset password link
export const resetPasswordRequestAsync = createAsyncThunk(
  "auth/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//set new password
export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await resetPassword(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: (state) => {
      return initialState;
    },
    resetAuthErrors: (state) => {
      state.authErrors = null;
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
      .addCase(signupUserAccountAsync.rejected, (state, action) => {
        state.status = "idle";
        state.authErrors = action.payload;
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
        state.authErrors = action.payload;
        // console.log(action, "login user reject error thunk");
      })
      .addCase(logoutUserAccountAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAccountAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.loggedInUserToken = null;
        window.location.reload();
      })
      .addCase(logoutUserAccountAsync.rejected, (state, action) => {
        state.status = "idle";
        // state.loggedInUserToken = null;
        state.authErrors = action.payload;
        window.location.reload();
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
        state.resetPassMailSent = false;
        state.authErrors = null;
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.resetPassMailSent = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = "idle";
        state.resetPassMailSent = false;
        state.authErrors = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
        state.passwordSavedStatus = false;
        state.authErrors = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordSavedStatus = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.passwordSavedStatus = false;
        state.authErrors = action.payload;
      })
      .addCase(checkUserTokenExistsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserTokenExistsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userCheckLoadingStatus = false; // here user will be loaded
        //instead of login, 'checkUser' will set loogeinUsertoken if session exits in bak
        // however we dont need token val any where in our site only in browser cookie
        // that will automatically send token on every http req, to backend
        //and backend will check,in backend session that user.token exits thn allow client
        // also,we only need 'loggedInUserToken' as a boolean of if user exits in frontend
      })
      .addCase(checkUserTokenExistsAsync.rejected, (state, action) => {
        state.status = "idle";
        // state.loggedInUserToken = action.payload;
        // state.authErrors = action.payload;
        state.userCheckLoadingStatus = false; //
      });
  },
});

export const { resetAuthErrors } = authSlice.actions;

export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectAuthErrors = (state) => state.auth.authErrors;
export const selectResetPassMailSent = (state) => state.auth.resetPassMailSent;
export const selectNewPwdSavedStatus = (state) =>
  state.auth.passwordSavedStatus;
export const selectUserCheckLoadingStatus = (state) =>
  state.auth.userCheckLoadingStatus;
export const authLoadingStatus = (state) => state.auth.status;

export default authSlice.reducer;
