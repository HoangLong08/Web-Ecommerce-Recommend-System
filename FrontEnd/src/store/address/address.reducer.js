import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCityAction,
  getListDistrictByIdCityAction,
  getListStreetByIdDistrictAction,
} from "./address.action";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    listCity: {
      data: [],
      load: false,
      error: "",
    },

    listDistrict: {
      data: [],
      load: false,
      error: "",
    },

    listStreet: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {
    setListDistrict: (state, action) => {
      state.listDistrict.data = action.payload;
    },

    setListStreet: (state, action) => {
      state.listStreet.data = action.payload;
    },
  },

  extraReducers: {
    [getAllCityAction.pending]: (state) => {
      state.listCity.load = true;
      state.listCity.data = [];
      state.listCity.error = "";
    },
    [getAllCityAction.fulfilled]: (state, action) => {
      state.listCity.load = false;
      state.listCity.data = action.payload;
      state.listCity.error = "";
    },
    [getAllCityAction.rejected]: (state, action) => {
      state.listCity.load = false;
      state.listCity.error = action.payload.error;
      state.listCity.data = [];
    },

    // -------------------------------

    [getListDistrictByIdCityAction.pending]: (state) => {
      state.listDistrict.load = true;
      state.listDistrict.data = [];
      state.listDistrict.error = "";
    },
    [getListDistrictByIdCityAction.fulfilled]: (state, action) => {
      state.listDistrict.load = false;
      state.listDistrict.data = action.payload;
      state.listDistrict.error = "";
    },
    [getListDistrictByIdCityAction.rejected]: (state, action) => {
      state.listDistrict.load = false;
      state.listDistrict.error = action.payload.error;
      state.listDistrict.data = [];
    },

    // --------------------------------
    [getListStreetByIdDistrictAction.pending]: (state) => {
      state.listStreet.load = true;
      state.listStreet.data = [];
      state.listStreet.error = "";
    },
    [getListStreetByIdDistrictAction.fulfilled]: (state, action) => {
      state.listStreet.load = false;
      state.listStreet.data = action.payload;
      state.listStreet.error = "";
    },
    [getListStreetByIdDistrictAction.rejected]: (state, action) => {
      state.listStreet.load = false;
      state.listStreet.error = action.payload.error;
      state.listStreet.data = [];
    },
  },
});

export const { setListDistrict, setListStreet } = addressSlice.actions;

export default addressSlice.reducer;
