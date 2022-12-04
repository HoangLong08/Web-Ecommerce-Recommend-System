import axios from "axios";
import { errorException } from "./handleErrorApi";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API + ":" + process.env.REACT_APP_PORT_API,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.defaults.timeout = process.env.REACT_APP_TIMEOUT_API;

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log("error config: ", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    errorException(error);
  }
);

export default instance;
