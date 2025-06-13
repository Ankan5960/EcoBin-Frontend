import apiClient from "@/service/api-service";
import { LocalStorage } from "@/storage/LocalStorage";
import { ILogoutRequest, IUserLogoutResponse } from "./logout.model";
import { clearAuthState } from "@/store/authStore";

export class LogOutService {
  userLocalStorage = new LocalStorage<IUserLogoutResponse>();

  public async logout(loginData: ILogoutRequest): Promise<void> {
    const url = `/api/user-auth/Auth/logout`;
    try {
      await apiClient.post(url, loginData);
    } catch (error) {
      console.error("Issue while logging out:", error);
    } finally {
      console.log("Logging out");
      clearAuthState();
    }
  }
}
