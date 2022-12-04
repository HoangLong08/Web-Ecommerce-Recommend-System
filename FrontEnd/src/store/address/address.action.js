import { createAsyncThunk } from "@reduxjs/toolkit";
import address from "../../api/address";

const getAllCityAction = createAsyncThunk(
  "address/getAllCityAction",
  async (params, thunkAPI) => {
    try {
      const res = await address.getAllCity().then((response) => {
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

const getListDistrictByIdCityAction = createAsyncThunk(
  "address/getListDistrictByIdCity",
  async (params, thunkAPI) => {
    const { idCity } = params;
    try {
      const res = await address
        .getListDistrictByIdCity(idCity)
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

const getListStreetByIdDistrictAction = createAsyncThunk(
  "address/getListStreetByIdDistrictAction",
  async (params, thunkAPI) => {
    const { idDistrict } = params;
    try {
      const res = await address
        .getListStreetByIdDistrict(idDistrict)
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

export {
  getAllCityAction,
  getListDistrictByIdCityAction,
  getListStreetByIdDistrictAction,
};
