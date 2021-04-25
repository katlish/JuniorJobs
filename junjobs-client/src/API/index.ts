import axios from "axios";

export const API_USER = axios.create({
  baseURL: process.env.REACT_APP_USER_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: Number(process.env.REACT_API_JOBS_TIMEOUT),
  responseType: "json"
});

API_USER.interceptors.response.use(
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

export const API_JOBS = axios.create({
  baseURL: process.env.REACT_APP_JOBS_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: Number(process.env.REACT_API_JOBS_TIMEOUT),
  responseType: "json"
});

export const API_CANDIDATES = axios.create({
  baseURL: process.env.REACT_APP_CANDIDATES_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: Number(process.env.REACT_API_JOBS_TIMEOUT),
  responseType: "json"
});
