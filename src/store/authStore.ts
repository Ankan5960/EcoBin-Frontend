import { IUserLoginResponse } from "@/pages/login-page/login.model";
import { LocalStorage } from "@/storage/LocalStorage";
import { create } from "zustand";

interface AuthState {
  authUser: IUserLoginResponse | null;
}

const fetchUserDataFromLocalStorage = (): IUserLoginResponse | null => {
  const storage = new LocalStorage<IUserLoginResponse>();
  const loginTime = localStorage.getItem("login_timestamp");

  if (loginTime) {
    const currentTime = Date.now();
    const timeElapsed = currentTime - parseInt(loginTime, 10);

    const maxSessionDuration = 60 * 60 * 1000;
    if (timeElapsed > maxSessionDuration) {
      storage.remove("user");
      localStorage.removeItem("login_timestamp");
      return null;
    }
  }

  return storage.get("user");
};

const setUserDataInLocalStorage = (user: IUserLoginResponse) => {
  const storage = new LocalStorage<IUserLoginResponse>();
  storage.set("user", user);
  localStorage.setItem("login_timestamp", Date.now().toString());
};

export const useAuthStore = create<AuthState>(() => ({
  authUser: fetchUserDataFromLocalStorage(),
}));

export const useAuthState = () => useAuthStore((state) => state.authUser);
export const useAuthRole = () =>
  useAuthStore((state) => state.authUser?.roleName);

export const setAuthState = (user: IUserLoginResponse | null) => {
  useAuthStore.setState({ authUser: user });
  if (user != null) {
    setUserDataInLocalStorage(user);
  }
};

export const clearAuthState = () => {
  useAuthStore.setState({ authUser: null });
  const storage = new LocalStorage<IUserLoginResponse>();
  storage.remove("user");
  localStorage.removeItem("login_timestamp");
};
