import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
// import { IStorage } from "../storage/IStorage";
// import { IAuthState } from "../auth/auth-store";
// import { IUserLoginResponse } from "../pages/login-page/login.model";

const getBaseUrl = () => {
  // const currentUrl = window.location.href;
  // const site = currentUrl.split("//")[1].split(":")[0];
  // if (site.includes("ecobin")) return "http://localhost";
  const BASEURL = import.meta.env.VITE_EcoBin_API_URL;
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
    }
  }
);

export const getAccessToken = async () => {
  // const storage = new LocalStorage<string>();
  // return await storage.get(BrowserStorageKeys.ACCESS_TOKEN);
  const userDataString = localStorage.getItem("user"); // replace with actual key if different
  if (!userDataString) return null;

  try {
    const userData = JSON.parse(userDataString);
    return userData.accessToken || null;
  } catch (err) {
    console.error("Failed to parse user data from localStorage", err);
    return null;
  }
};

// const setAccessToken = async (accessToken: string) => {
//   const storage = new LocalStorage<string>();
//   await storage.set(BrowserStorageKeys.ACCESS_TOKEN, accessToken);
// };

// const setAuth = async (user: IUserLoginResponse) => {
//   const auth: IAuthState = {
//     isAuthorized: true,
//     user: user,
//   };
//   const authLocalStore: IStorage<IAuthState> = new LocalStorage<IAuthState>();
//   await authLocalStore.set(BrowserStorageKeys.AUTH_STATE, auth);
// };

export default apiClient;
