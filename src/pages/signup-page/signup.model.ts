import { IErrorResponseModel } from "../../models/error-response-model";

export interface IApiErrorData {
  errorHeading: string | null;
  errorMessage: string | null;
  statusCode: number;
}

export interface ISignUpModel {
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;
  key: string;
}

export interface ISignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  secretKey: string;
}

export interface IUserSignupResponse {
  userId: string;
}

export interface ISignupResponse {
  isSuccess: boolean;
  registerData: IUserSignupResponse | null;
  errorData: IErrorResponseModel | null;
}
