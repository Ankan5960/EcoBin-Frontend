import { ILoginRequest, ILoginResponse, IUserLoginResponse } from "./login.model";
import { IErrorResponseModel } from "../../models/error-response-model";
import getIp from "@/service/ip-service";
import getDeviceInfo from "@/service/device-info-service";
import apiClient from "@/service/api-service";
import { LocalStorage } from "@/storage/LocalStorage";

export class LogInService {

  userLocalStorage = new LocalStorage<IUserLoginResponse>();

  public async logIn(loginData: ILoginRequest): Promise<ILoginResponse> {
    const url = `/user-auth/auth/login`;
    loginData.ipAddress = await getIp();
    loginData.deviceInfo = getDeviceInfo();
    const loginResponse = {} as ILoginResponse;
    try {
      const response = await apiClient.post(url, loginData);
      console.log("User data:", response.data);

      loginResponse.userData = response.data;
      loginResponse.isSuccess = true;
      if (loginResponse.userData) {
        this.userLocalStorage.set("user", loginResponse.userData);
      }
      return loginResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("Login failed:", error);
      loginResponse.errorData = errorResponse.response.data;
      return loginResponse;
    }
  }
}
