import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProductsAction,
  getDetailProductAction,
  getAllProductsAdminAction,
  getAllProductByCategoryAction,
  getSearchListProductAction,
} from "./products.action";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    listProduct: {
      data: [],
      load: false,
      error: "",
    },

    detailProduct: {
      data: {},
      load: false,
      error: "",
    },

    thumbnail: "",

    listProductAdmin: {
      data: [],
      load: false,
      error: "",
    },

    listProductByNameUrl: {
      data: [],
      load: false,
      error: "",
    },

    listProductSearch: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {
    setThumbnail: (state, action) => {
      state.thumbnail = action.payload;
    },
  },

  extraReducers: {
    [getAllProductsAction.pending]: (state) => {
      state.listProduct.load = true;
      state.listProduct.data = [];
      state.listProduct.error = "";
    },
    [getAllProductsAction.fulfilled]: (state, action) => {
      state.listProduct.load = false;
      state.listProduct.data = action.payload;
      state.listProduct.error = "";
    },
    [getAllProductsAction.rejected]: (state, action) => {
      state.listProduct.load = false;
      state.listProduct.error = action.payload.error;
      state.listProduct.data = [];
    },

    // ---------------------------------------------------

    [getDetailProductAction.pending]: (state) => {
      state.detailProduct.load = true;
      state.detailProduct.data = {};
      state.detailProduct.error = "";
    },
    [getDetailProductAction.fulfilled]: (state, action) => {
      state.detailProduct.load = false;
      state.detailProduct.data = action.payload;
      state.detailProduct.error = "";
    },
    [getDetailProductAction.rejected]: (state, action) => {
      state.detailProduct.load = false;
      state.detailProduct.error = action.payload.error;
      state.detailProduct.data = {};
    },

    // ------------------------------------------------

    [getAllProductsAdminAction.pending]: (state) => {
      state.listProductAdmin.load = true;
      state.listProductAdmin.data = [];
      state.listProductAdmin.error = "";
    },
    [getAllProductsAdminAction.fulfilled]: (state, action) => {
      state.listProductAdmin.load = false;
      state.listProductAdmin.data = action.payload;
      state.listProductAdmin.error = "";
    },
    [getAllProductsAdminAction.rejected]: (state, action) => {
      state.listProductAdmin.load = false;
      state.listProductAdmin.error = action.payload.error;
      state.listProductAdmin.data = [];
    },

    // -----------------------------------------------

    [getAllProductByCategoryAction.pending]: (state) => {
      state.listProductByNameUrl.load = true;
      state.listProductByNameUrl.data = [];
      state.listProductByNameUrl.error = "";
    },
    [getAllProductByCategoryAction.fulfilled]: (state, action) => {
      state.listProductByNameUrl.load = false;
      state.listProductByNameUrl.data = action.payload;
      state.listProductByNameUrl.error = "";
    },
    [getAllProductByCategoryAction.rejected]: (state, action) => {
      state.listProductByNameUrl.load = false;
      state.listProductByNameUrl.error = action.payload.error;
      state.listProductByNameUrl.data = [];
    },

    // -------------------------------------------
    [getSearchListProductAction.pending]: (state) => {
      state.listProductSearch.load = true;
      state.listProductSearch.data = [];
      state.listProductSearch.error = "";
    },
    [getSearchListProductAction.fulfilled]: (state, action) => {
      state.listProductSearch.load = false;
      state.listProductSearch.data = action.payload;
      state.listProductSearch.error = "";
    },
    [getSearchListProductAction.rejected]: (state, action) => {
      state.listProductSearch.load = false;
      state.listProductSearch.error = action.payload.error;
      state.listProductSearch.data = [];
    },
  },
});

export const { setThumbnail } = productsSlice.actions;

export default productsSlice.reducer;
