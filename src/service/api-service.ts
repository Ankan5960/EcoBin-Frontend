import {
  clearAuthState,
  fetchUserDataFromLocalStorage,
  setAuthState,
} from "@/store/authStore";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
// import { IStorage } from "../storage/IStorage";
// import { IAuthState } from "../auth/auth-store";
// import { IUserLoginResponse } from "../pages/login-page/login.model";

const getBaseUrl = () => {
  // const currentUrl = window.location.href;
  // const site = currentUrl.split("//")[1].split(":")[0];
  // if (site.includes("ecobin")) return "http://localhost";
  const BASEURL = import.meta.env.VITE_ECOBIN_API_URL;
  return BASEURL;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out");
      return Promise.reject(new Error("Request timed out"));
    } else if (error.response.status === 401) {
      const user = fetchUserDataFromLocalStorage();
      const refreshToken = user?.refreshToken;
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${getBaseUrl()}/api/user-auth/auth/refresh-token`,
            {
              refreshToken: refreshToken,
              ipAddress: "",
              deviceInfo: "",
            }
          );

          setAuthState(response.data);

          error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return apiClient.request(error.config);
        } catch (err) {
          clearAuthState();
          window.location.href = "/dashboard";
        }
      }
    }
    return Promise.reject(error);
  }
);

export const getAccessToken = async () => {
  const userDataString = localStorage.getItem("user");
  if (!userDataString) return null;

  try {
    const userData = JSON.parse(userDataString);
    return userData.accessToken || null;
  } catch (err) {
    console.error("Failed to parse user data from localStorage", err);
    return null;
  }
};

export default apiClient;
