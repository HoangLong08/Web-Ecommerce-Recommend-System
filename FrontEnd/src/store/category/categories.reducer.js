import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCategoryAdminAction,
  detailCategoriesAdminAction,
} from "./categories.action";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    listCategoryAdmin: {
      data: [],
      load: false,
      error: "",
    },

    detailCategoryAdmin: {
      data: {},
      load: false,
      error: "",
    },

    valueFormCategory: {
      name: "",
    },
  },
  reducers: {
    setValueFormCategoryName: (state, action) => {
      state.valueFormCategory.name = action.payload;
    },
  },

  extraReducers: {
    [getAllCategoryAdminAction.pending]: (state) => {
      state.listCategoryAdmin.load = true;
      state.listCategoryAdmin.data = [];
      state.listCategoryAdmin.error = "";
    },
    [getAllCategoryAdminAction.fulfilled]: (state, action) => {
      state.listCategoryAdmin.load = false;
      state.listCategoryAdmin.data = action.payload;
      state.listCategoryAdmin.error = "";
    },
    [getAllCategoryAdminAction.rejected]: (state, action) => {
      state.listCategoryAdmin.load = false;
      state.listCategoryAdmin.error = action.payload.error;
      state.listCategoryAdmin.data = [];
    },

    // --------------------

    [detailCategoriesAdminAction.pending]: (state) => {
      state.detailCategoryAdmin.load = true;
      state.detailCategoryAdmin.data = {};
      state.detailCategoryAdmin.error = "";
    },
    [detailCategoriesAdminAction.fulfilled]: (state, action) => {
      state.detailCategoryAdmin.load = false;
      state.detailCategoryAdmin.data = action.payload;
      state.detailCategoryAdmin.error = "";
    },
    [detailCategoriesAdminAction.rejected]: (state, action) => {
      state.detailCategoryAdmin.load = false;
      state.detailCategoryAdmin.error = action.payload.error;
      state.detailCategoryAdmin.data = {};
    },
  },
});

export const { setValueFormCategoryName } = categoriesSlice.actions;

export default categoriesSlice.reducer;
