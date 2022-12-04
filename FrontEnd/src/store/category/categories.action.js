import { createAsyncThunk } from "@reduxjs/toolkit";
import categories from "../../api/categories";

const getAllCategoryAdminAction = createAsyncThunk(
  "categories/getAllBrandAdminAction",
  async (params, thunkAPI) => {
    try {
      const { nameCategory } = params;
      const res = await categories
        .getAllCategoriesAdmin(nameCategory)
        .then((response) => {
          if (response) {
            return response;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const postCategoriesAdminAction = createAsyncThunk(
  "categories/postCategoriesAdminAction",
  async (params, thunkAPI) => {
    try {
      const { idCategory, nameCategory } = params;
      const res = await categories
        .postCategoriesAdmin(idCategory, nameCategory)
        .then((response) => {
          if (response) {
            return response;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const addCategoriesAdminAction = createAsyncThunk(
  "categories/addCategoriesAdminAction",
  async (params, thunkAPI) => {
    try {
      const { nameCategory } = params;
      const res = await categories
        .addCategoriesAdmin(nameCategory)
        .then((response) => {
          if (response) {
            return response;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const deleteCategoriesAdminAction = createAsyncThunk(
  "categories/deleteCategoriesAdminAction",
  async (params, thunkAPI) => {
    try {
      const { idCategory } = params;
      const res = await categories
        .deleteCategoriesAdmin(idCategory)
        .then((response) => {
          if (response) {
            return response;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const detailCategoriesAdminAction = createAsyncThunk(
  "categories/detailCategoriesAdminAction",
  async (params, thunkAPI) => {
    try {
      const { idCategory } = params;
      console.log("idCategory: ", idCategory);
      const res = await categories
        .detailCategoriesAdmin(idCategory)
        .then((response) => {
          if (response) {
            return response.data;
          }
          return {};
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export {
  getAllCategoryAdminAction,
  postCategoriesAdminAction,
  addCategoriesAdminAction,
  deleteCategoriesAdminAction,
  detailCategoriesAdminAction,
};
