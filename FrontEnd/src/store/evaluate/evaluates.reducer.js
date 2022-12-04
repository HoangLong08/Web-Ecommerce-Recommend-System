import { createSlice } from "@reduxjs/toolkit";
import { getEvaluateByIdProductAction } from "./evaluates.action";

const evaluateSlice = createSlice({
  name: "evaluate",
  initialState: {
    listEvaluate: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getEvaluateByIdProductAction.pending]: (state) => {
      state.listEvaluate.load = true;
      state.listEvaluate.data = [];
      state.listEvaluate.error = "";
    },
    [getEvaluateByIdProductAction.fulfilled]: (state, action) => {
      state.listEvaluate.load = false;
      state.listEvaluate.data = action.payload;
      state.listEvaluate.error = "";
    },
    [getEvaluateByIdProductAction.rejected]: (state, action) => {
      state.listEvaluate.load = false;
      state.listEvaluate.error = action.payload.error;
      state.listEvaluate.data = [];
    },
  },
});

export default evaluateSlice.reducer;
