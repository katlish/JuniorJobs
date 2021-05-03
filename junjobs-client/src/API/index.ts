import axios from "axios";


//TODO: fix page UI when server is not responding Error: timeout of 15000ms exceeded
export const API_BASE_URL = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: Number(process.env.REACT_APP_API_TIMEOUT),
  responseType: "json"
});

API_BASE_URL.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error.response?.status === 401 && error.response?.config.url !== "/auth/login") {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);