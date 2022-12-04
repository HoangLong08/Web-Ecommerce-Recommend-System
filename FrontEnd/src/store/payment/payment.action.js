import { createAsyncThunk } from "@reduxjs/toolkit";
import payment from "../../api/payment";

const createCheckoutSessionAction = createAsyncThunk(
  "rs/createCheckoutSessionAction",
  async (params, thunkAPI) => {
    const { listProduct } = params;
    try {
      const res = await rs
        .createCheckoutSession(listProduct)
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

export { createCheckoutSessionAction };
