import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin, loginUser } from "./auth.action";
const infoAccount = JSON.parse(localStorage.getItem("infoAccount"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    infoAccount: infoAccount || {},
  },
  reducers: {
    removeAuth: (state, action) => {
      state.infoAccount = action.payload;
      localStorage.setItem("infoAccount", JSON.stringify(action.payload));
    },
  },

  extraReducers: {
    [loginAdmin.pending]: (state) => {
      state.infoAccount = {};
    },
    [loginAdmin.fulfilled]: (state, action) => {
      state.infoAccount = action.payload;
      localStorage.setItem("infoAccount", JSON.stringify(action.payload));
    },
    [loginAdmin.rejected]: (state, action) => {
      state.infoAccount = {};
    },

    // --------------------

    [loginUser.pending]: (state) => {
      state.infoAccount = {};
    },
    [loginUser.fulfilled]: (state, action) => {
      state.infoAccount = {
        ...action.payload.data?.info,
        accessToken: action.payload.data?.accessToken,
        refreshToken: action.payload.data?.refreshToken,
      };
      localStorage.setItem(
        "infoAccount",
        JSON.stringify({
          ...action.payload.data?.info,
          accessToken: action.payload.data?.accessToken,
          refreshToken: action.payload.data?.refreshToken,
        })
      );
    },
    [loginUser.rejected]: (state, action) => {
      state.infoAccount = {};
    },
  },
});

export const { removeAuth } = authSlice.actions;

export default authSlice.reducer;
