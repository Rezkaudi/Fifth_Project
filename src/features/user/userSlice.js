import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  signIn,
  getUserData,
  creatUserToken,
  getUserTokens,
} from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  userData: null,
  userTokens: null,
  token: null,
  stateOfCreate: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("userToken");
      toast.success("Log Out successful");
    },
    loadUserToken: (state) => {
      const userToken = localStorage.getItem("userToken");
      if (userToken) state.token = userToken;
    },
  },
  extraReducers: (builder) => {
    // signUp
    builder
      .addCase(signUp.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success("Sign up successful");
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false;
        // toast.error("error");
        payload.forEach(message => {
          toast.error(message);
      });
      });

    //signIn
    builder
      .addCase(signIn.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        toast.success("Sign in successful");
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });

    //getUserData
    builder
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.userData = payload;
        // toast.success("successfull getUserData");
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        toast.error("error");
      });

    //creatUserToken
    builder
      .addCase(creatUserToken.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(creatUserToken.fulfilled, (state, { payload }) => {
        // state.userTokens = [...state.userTokens, payload];
        state.loading = false;
        toast.success("successfull creatUserToken");
      })
      .addCase(creatUserToken.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error("token exist");
      });

    // getUserTokens
    builder
      .addCase(getUserTokens.fulfilled, (state, { payload }) => {
        state.userTokens = payload;
        // toast.success("successfull getUserTokens");
      })
      .addCase(getUserTokens.rejected, (state, { payload }) => {
        toast.error("error");
      });
  },
});

export const { logOut, loadUserToken } = userSlice.actions;
export default userSlice.reducer;

// signup
// {
//   "message": "Registration successful"
// }
