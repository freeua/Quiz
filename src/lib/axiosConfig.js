import dotenv from "dotenv";
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

import LRUCache from "lru-cache";
import { apiResponsesStorage } from "./localForage.instance";
dotenv.config();

const storageBlackList = ["/profile", "/start"];

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Cache-Control": "no-cache" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    defaultCache: new LRUCache({ maxAge: 604800000000, max: 500 }),
  }),
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  const tokenString = "Bearer " + token;
  if (token && config.headers.common.Authorization !== tokenString) {
    config.headers.common.Authorization = tokenString;
  }

  return config;
});

instance.interceptors.response.use(
  response => {
    if (window.location.pathname !== "/register" && response.data.access_token) {
      const token = response.data.access_token;
      axios.defaults.headers.common.Authorization = "Bearer " + token;
      localStorage.setItem("token", token);
    }

    const inBlackList = storageBlackList.some(word => response.config.url.includes(word));

    if (!inBlackList && response.config.method === "get") {
      var oneWeek = new Date();
      oneWeek.setHours(oneWeek.getHours() + 144);

      const storageData = {
        expires: oneWeek,
        data: response.data,
      };

      apiResponsesStorage.setItem(window.location.pathname, storageData);
    }

    return response.data;
  },
  error => {
    const response = error.response;

    if (response) {
      const status = response.status;

      if (
        window.location.pathname !== "/reset-request" &&
        window.location.pathname !== "/login" &&
        !window.location.pathname.includes("/confirm_registration") &&
        !window.location.pathname.includes("/reset-password")
      ) {
        if (status === 401 || status === 403) {
          // Redirect to login and remove invalid token
          localStorage.removeItem("token");
          localStorage.clear();
          window.location.href = "/login?sessionTimeout=1";
        }
      }

      return Promise.reject(response.data);
    }

    return Promise.reject({
      statusCode: 500,
      message: "Unexpected server error. Please try again.",
    });
  }
);

export default instance;
