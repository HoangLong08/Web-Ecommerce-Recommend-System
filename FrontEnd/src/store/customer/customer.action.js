import { createAsyncThunk } from "@reduxjs/toolkit";
import customers from "../../api/customer";

const postDetailCustomerAction = createAsyncThunk(
  "customers/postDetailCustomerAction",
  async (params, thunkAPI) => {
    try {
      const { idCustomer } = params;
      const res = await customers
        .postDetailCustomer(idCustomer)
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

const updateInfoCustomerAction = createAsyncThunk(
  "customers/updateInfoCustomerAction",
  async (params, thunkAPI) => {
    try {
      const { idCustomer, avatar, name, phone } = params;
      const res = await customers
        .updateInfoCustomer(idCustomer, avatar, name, phone)
        .then((response) => {
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

const getOrderByIdCustomerAction = createAsyncThunk(
  "customers/getOrderByIdCustomerAction",
  async (params, thunkAPI) => {
    try {
      const { idCustomer } = params;
      const res = await customers
        .getOrderByIdCustomer(idCustomer)
        .then((response) => {
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

export {
  postDetailCustomerAction,
  updateInfoCustomerAction,
  getOrderByIdCustomerAction,
};
