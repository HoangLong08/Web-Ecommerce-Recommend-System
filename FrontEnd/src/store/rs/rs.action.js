import { createAsyncThunk } from "@reduxjs/toolkit";
import rs from "../../api/rs";

const getProductsSimilarAction = createAsyncThunk(
  "rs/getProductsSimilarAction",
  async (params, thunkAPI) => {
    const { specs, idProduct } = params;
    try {
      const res = await rs
        .getProductsSimilar(specs, idProduct)
        .then((response) => {
          if (response) {
            return response?.data;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const getProductRatingSimilarAction = createAsyncThunk(
  "rs/getProductRatingSimilarAction",
  async (params, thunkAPI) => {
    const { idCustomer } = params;
    try {
      const res = await rs
        .getProductRatingSimilar(idCustomer)
        .then((response) => {
          if (response) {
            return response?.data;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export { getProductsSimilarAction, getProductRatingSimilarAction };
