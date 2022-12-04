import { createAsyncThunk } from "@reduxjs/toolkit";
import orders from "../../api/orders";

const addOrderAction = createAsyncThunk(
  "orders/addOrderAction",
  async (params, thunkAPI) => {
    try {
      const { idCustomer, name, phone, address, note, listProduct } = params;
      const res = await orders
        .addOrder(idCustomer, name, phone, address, note, listProduct)
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

export { addOrderAction };
