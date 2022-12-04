import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../../api/auth";

const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (params, thunkAPI) => {
    try {
      const { email, password } = params;
      const res = await auth.loginAdmin(email, password).then((response) => {
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

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (params, thunkAPI) => {
    try {
      const { email, password } = params;
      const res = await auth.loginUser(email, password).then((response) => {
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

const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (params, thunkAPI) => {
    try {
      const {
        fullName,
        email,
        password,
        idCity,
        idDistrict,
        idStreet,
        address,
      } = params;
      const res = await auth
        .registerUser(
          fullName,
          email,
          password,
          idCity,
          idDistrict,
          idStreet,
          address
        )
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

export { loginAdmin, loginUser, registerUser };
