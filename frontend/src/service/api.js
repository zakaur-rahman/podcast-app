import axios from "axios";

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  getType,
} from "../utils/common-utils";

const API_URL = "http://localhost:8000/api/v2";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json, form-data",
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Stop global loader here
    return processResponse(response);
  },
  async function (error) {
    // Stop global loader here
    return Promise.reject(await processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = async (error) => {
  if (error.response) {
    const errorData = error.response.data.error.message;
    if (error.response?.status === 403) {
      try {
        let refreshResponse = await API.refreshToken({ token: getRefreshToken() });
        if (refreshResponse.isSuccess) {
          sessionStorage.clear();
          setAccessToken(refreshResponse.data.accessToken);

          // Retry the original request after token refresh
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    } else {
      console.log("ERROR IN RESPONSE: ", error.toJSON());
      return {
        isError: true,
        msg: errorData,
        code: error.response.status,
      };
    }
  } else if (error.request) {
    console.log("ERROR IN RESPONSE: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
      code: "",
    }
  } else {
    console.log("ERROR IN RESPONSE: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError.message,
      code: "",
    };
  }
};

const API = {}

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? "" : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
    });
}

export { API };
