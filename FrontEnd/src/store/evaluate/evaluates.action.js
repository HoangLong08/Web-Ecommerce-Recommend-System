import { createAsyncThunk } from "@reduxjs/toolkit";
import evaluates from "../../api/evaluates";

const getEvaluateByIdProductAction = createAsyncThunk(
  "evaluates/getEvaluateByIdProductAction",
  async (params, thunkAPI) => {
    try {
      const { idProduct } = params;
      const res = await evaluates
        .getEvaluateByIdProduct(idProduct)
        .then((response) => {
          if (response) {
            return response?.data;
          }
          return {};
        });
      console.log("res: ", res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const postEvaluateAction = createAsyncThunk(
  "evaluates/postEvaluateAction",
  async (params, thunkAPI) => {
    try {
      const { idCustomer, idProduct, title, content, stars } = params;
      console.log("params: ", params);
      const res = await evaluates
        .postEvaluates(idCustomer, idProduct, title, content, stars)
        .then((response) => {
          if (response) {
            return response;
          }
          return {};
        });
      console.log("res: ", res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export { postEvaluateAction, getEvaluateByIdProductAction };
