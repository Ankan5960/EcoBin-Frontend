import { IErrorResponseModel } from "../../models/error-response-model";

export interface ILoginRequest {
  email: string;
  password: string;
  ipAddress: string;
  deviceInfo: string;
}

export interface IUserLoginResponse {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  roleName: string;
  areaOfService: string
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  isSuccess: boolean;
  userData: IUserLoginResponse | null;
  errorData: IErrorResponseModel | null;
}
