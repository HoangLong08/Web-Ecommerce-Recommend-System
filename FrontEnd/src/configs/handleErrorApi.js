import { openNotificationWithIcon } from "../utils";
import jwt_decode from "jwt-decode";
// import instance from '../configs/axios';
import axios from "axios";
import { isEmpty } from "lodash";

const handleError = (error) => {
  if (error) {
    console.log("error of file handle error api");
  } else {
    console.log("error of file handle error api");
  }
};

export const errorException = (error) => {
  const statusCode = error.response?.status || error.message;
  console.log("123: ", statusCode);
  switch (statusCode) {
    case 400:
      openNotificationWithIcon("error", error.response?.data?.msg);
      break;

    case 401:
      openNotificationWithIcon("error", error.response?.data?.msg);
      if (window.location.href.includes("admin")) {
        localStorage.removeItem("infoAccount");
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 3000);
      }
      // console.log("window.location: ", window.location.href)
      break;

    case 403:
      openNotificationWithIcon("error", error.response?.data?.msg);
      if (window.location.href.includes("admin")) {
        setTimeout(async () => {
          const currentDate = new Date();
          const infoAccount = localStorage.getItem("infoAccount");
          const parseInfoAccount = JSON.parse(infoAccount);
          const decodeToken = jwt_decode(parseInfoAccount.accessToken);
          if (decodeToken.exp * 1000 < currentDate.getTime()) {
            try {
              const res = await axios.post(
                process.env.REACT_APP_URL_API +
                  ":" +
                  process.env.REACT_APP_PORT_API +
                  "/auth/refresh",
                {
                  token: parseInfoAccount.refreshToken,
                }
              );
              if (!isEmpty(res.data)) {
                const infoUser = {
                  email: parseInfoAccount.email,
                  idUser: parseInfoAccount.idUser,
                  name: parseInfoAccount.name,
                  accessToken: res.data.accessToken,
                  refreshToken: res.data.refreshToken,
                };
                await localStorage.setItem(
                  "infoAccount",
                  JSON.stringify(infoUser)
                );
                await window.location.reload();
              }
            } catch (error) {
              if (error?.response?.status === 403) {
                localStorage.removeItem("infoAccount");
                window.location.href = "/admin/login";
              }
            }
          } else {
            localStorage.removeItem("infoAccount");
            window.location.href = "/admin/login";
          }
        }, 500);
      } else {
        setTimeout(async () => {
          const currentDate = new Date();
          const infoAccount = localStorage.getItem("infoAccount");
          const parseInfoAccount = JSON.parse(infoAccount);
          const decodeToken = jwt_decode(parseInfoAccount.accessToken);
          if (decodeToken.exp * 1000 < currentDate.getTime()) {
            try {
              const res = await axios.post(
                process.env.REACT_APP_URL_API +
                  ":" +
                  process.env.REACT_APP_PORT_API +
                  "/auth/refresh",
                {
                  token: parseInfoAccount.refreshToken,
                }
              );
              if (!isEmpty(res.data)) {
                const infoUser = {
                  email: parseInfoAccount.email,
                  idUser: parseInfoAccount.idUser,
                  name: parseInfoAccount.name,
                  accessToken: res.data.accessToken,
                  refreshToken: res.data.refreshToken,
                };
                await localStorage.setItem(
                  "infoAccount",
                  JSON.stringify(infoUser)
                );
                await window.location.reload();
              }
            } catch (error) {
              if (error?.response?.status === 403) {
                localStorage.removeItem("infoAccount");
                window.location.href = "/login";
              }
            }
          } else {
            localStorage.removeItem("infoAccount");
            window.location.href = "/login";
          }
        }, 3000);
      }
      break;

    case 404:
      window.location.href = "/404";
      break;

    case 413:
      openNotificationWithIcon("error", error.message);
      break;

    case 422:
      handleError(error.response?.data);
      break;

    case 500:
      openNotificationWithIcon("error", error.message || "Lỗi từ server");
      // window.location.href = '/500';
      break;
    case "Network Error":
      openNotificationWithIcon("error", error.message);
      break;
    case "timeout of 55000ms exceeded":
      openNotificationWithIcon("error", error.message);
      break;
    default:
      console.log("");
      break;
  }

  return Promise.reject(error.response?.data);
};
