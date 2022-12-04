import { createSlice } from "@reduxjs/toolkit";
import {
  getProductsSimilarAction,
  getProductRatingSimilarAction,
} from "./rs.action";

const rsSlice = createSlice({
  name: "rs",
  initialState: {
    listProductSimilar: {
      data: [],
      load: false,
      error: "",
    },

    listProductRatingSimilar: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getProductsSimilarAction.pending]: (state) => {
      state.listProductSimilar.load = true;
      state.listProductSimilar.data = [];
      state.listProductSimilar.error = "";
    },
    [getProductsSimilarAction.fulfilled]: (state, action) => {
      state.listProductSimilar.load = false;
      state.listProductSimilar.data = action.payload;
      state.listProductSimilar.error = "";
    },
    [getProductsSimilarAction.rejected]: (state, action) => {
      state.listProductSimilar.load = false;
      state.listProductSimilar.error = action.payload.error;
      state.listProductSimilar.data = [];
    },

    // -------------------------------
    [getProductRatingSimilarAction.pending]: (state) => {
      state.listProductRatingSimilar.load = true;
      state.listProductRatingSimilar.data = [];
      state.listProductRatingSimilar.error = "";
    },
    [getProductRatingSimilarAction.fulfilled]: (state, action) => {
      state.listProductRatingSimilar.load = false;
      state.listProductRatingSimilar.data = action.payload;
      state.listProductRatingSimilar.error = "";
    },
    [getProductRatingSimilarAction.rejected]: (state, action) => {
      state.listProductRatingSimilar.load = false;
      state.listProductRatingSimilar.error = action.payload.error;
      state.listProductRatingSimilar.data = [];
    },
  },
});

export default rsSlice.reducer;
