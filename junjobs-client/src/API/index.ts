import axios from "axios";

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
    if (error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);