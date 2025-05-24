import { IUserLoginResponse } from "@/pages/login-page/login.model";
import { LocalStorage } from "@/storage/LocalStorage";
import { create } from "zustand";

interface AuthState {
  authUser: IUserLoginResponse | null;
}

const fetchUserDataFromLocalStorage = (): IUserLoginResponse | null => {
  const storage = new LocalStorage<IUserLoginResponse>();
  return storage.get("user");
};

const setUserDataInLocalStorage = (user: IUserLoginResponse) => {
  const storage = new LocalStorage<IUserLoginResponse>();
  storage.set("user", user);
};

export const useAuthStore = create<AuthState>((set) => ({
  authUser: fetchUserDataFromLocalStorage(),
}));

export const useAuthState = () => useAuthStore((state) => state.authUser);
export const useAuthRole = () =>
  useAuthStore((state) => state.authUser?.roleName);

export const setAuthState = (user: IUserLoginResponse | null) => {
  useAuthStore.setState({ authUser: user });
  user != null && setUserDataInLocalStorage(user);
};
