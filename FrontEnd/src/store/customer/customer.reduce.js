import { createSlice } from "@reduxjs/toolkit";
import {
  postDetailCustomerAction,
  getOrderByIdCustomerAction,
} from "./customer.action";

const customerSlice = createSlice({
  name: "brand",
  initialState: {
    detailCustomer: {
      data: {},
      load: false,
      error: "",
    },

    orders: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [postDetailCustomerAction.pending]: (state) => {
      state.detailCustomer.load = true;
      state.detailCustomer.data = {};
      state.detailCustomer.error = "";
    },
    [postDetailCustomerAction.fulfilled]: (state, action) => {
      state.detailCustomer.load = false;
      state.detailCustomer.data = action.payload;
      state.detailCustomer.error = "";
    },
    [postDetailCustomerAction.rejected]: (state, action) => {
      state.detailCustomer.load = false;
      state.detailCustomer.error = action.payload.error;
      state.detailCustomer.data = {};
    },

    // -------------------

    [getOrderByIdCustomerAction.pending]: (state) => {
      state.orders.load = true;
      state.orders.data = [];
      state.orders.error = "";
    },
    [getOrderByIdCustomerAction.fulfilled]: (state, action) => {
      state.orders.load = false;
      state.orders.data = action.payload;
      state.orders.error = "";
    },
    [getOrderByIdCustomerAction.rejected]: (state, action) => {
      state.orders.load = false;
      state.orders.error = action.payload.error;
      state.orders.data = [];
    },
  },
});

export default customerSlice.reducer;
