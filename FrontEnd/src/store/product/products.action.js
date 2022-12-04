import { createAsyncThunk } from "@reduxjs/toolkit";
import products from "../../api/products";

const getAllProductsAction = createAsyncThunk(
  "products/getAllProductsAction",
  async (params, thunkAPI) => {
    try {
      const res = await products.search().then((response) => {
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

const getDetailProductAction = createAsyncThunk(
  "products/getDetailProductAction",
  async (params, thunkAPI) => {
    try {
      const { idProduct } = params;
      const res = await products.detail(idProduct).then((response) => {
        if (response) {
          return response;
        }
        return {};
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const getAllProductsAdminAction = createAsyncThunk(
  "products/getAllProductsAdminAction",
  async (params, thunkAPI) => {
    try {
      const res = await products.getAllProductAdmin().then((response) => {
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

const addProductsAdminAction = createAsyncThunk(
  "products/addProductsAdminAction",
  async (params, thunkAPI) => {
    try {
      const { info } = params;
      const res = await products.addProductsAdmin(info).then((response) => {
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

const updateProductsAdminAction = createAsyncThunk(
  "products/updateProductsAdminAction",
  async (params, thunkAPI) => {
    try {
      const { infoFormProduct, idProduct } = params;
      console.log("infoFormProduct action: ", infoFormProduct, idProduct);
      const res = await products
        .updateProductsAdmin(infoFormProduct, idProduct)
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

const getAllProductByCategoryAction = createAsyncThunk(
  "products/getAllProductByCategoryAction",
  async (params, thunkAPI) => {
    try {
      const { nameUrl } = params;
      const res = await products
        .getAllProductByCategory(nameUrl)
        .then((response) => {
          if (response) {
            return response.data;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const getSearchListProductAction = createAsyncThunk(
  "products/getSearchListProductAction",
  async (params, thunkAPI) => {
    try {
      const { queryString } = params;
      console.log("infoFormProduct action: ", queryString);
      const res = await products
        .getSearchListProduct(queryString)
        .then((response) => {
          if (response) {
            return response.data;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export {
  getAllProductsAction,
  getDetailProductAction,
  getAllProductsAdminAction,
  addProductsAdminAction,
  updateProductsAdminAction,
  getAllProductByCategoryAction,
  getSearchListProductAction,
};
