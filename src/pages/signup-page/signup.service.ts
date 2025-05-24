import apiClient from "@/service/api-service";
import { IErrorResponseModel } from "../../models/error-response-model";
import { ISignupRequest, ISignupResponse } from "./signup.model";

export class SignUpService {
  public async signup(signupData: ISignupRequest): Promise<ISignupResponse> {
    const url = `/user-auth/auth/signup`;
    const signupResponse = {} as ISignupResponse;
    try {
      const response = await apiClient.post(url, signupData);
      console.log("register data:", response.data);

      signupResponse.registerData = response.data;
      signupResponse.isSuccess = true;
      return signupResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("Signup failed:", error);
      signupResponse.errorData = errorResponse.response.data;
      return signupResponse;
    }
  }
}
