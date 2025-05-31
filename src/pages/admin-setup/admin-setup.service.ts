import apiClient from "@/service/api-service";
import { IErrorResponseModel } from "../../models/error-response-model";
import {
  IAdminSetupDeleteResponse,
  IAdminSetupGetResponse,
  IAdminSetupPostResponse,
  IDustbinSetUpPostRequest,
} from "./admin-setup-model";

export class AdminSetUpService {
  public async postSetup(
    postData: IDustbinSetUpPostRequest
  ): Promise<IAdminSetupPostResponse> {
    const url = `/api/dustbinSetup/setup`;
    const postResponse = {} as IAdminSetupPostResponse;
    try {
      const response = await apiClient.post(url, postData);
      console.log("dustbin setup data:", response.data);
      postResponse.data = response.data;
      postResponse.isSucess = true;
      return postResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("dustbin setup failed:", error);
      postResponse.errorData = errorResponse.response.data;
      postResponse.isSucess = false;
      return postResponse;
    }
  }

  public async getSetup(
    dustbinId: string 
  ): Promise<IAdminSetupGetResponse> {
    const url = `/api/dustbinSetup/getsetup?dustbinId=${dustbinId}`;
    const getResponse = {} as IAdminSetupGetResponse;
    try {
      const response = await apiClient.get(url);
      console.log("dustbin setup data:", response.data);
      getResponse.data = response.data;
      getResponse.isSucess = true;
      return getResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("dustbin setup failed:", error);
      getResponse.errorData = errorResponse.response.data;
      getResponse.isSucess = false;
      return getResponse;
    }
  }

  public async deleteSetup(
    dustbinId: string
  ): Promise<IAdminSetupDeleteResponse> {
    const url = `/api/dustbinSetup/deleteSetup?dustbinId=${dustbinId}`;
    const deleteResponse = {} as IAdminSetupDeleteResponse;
    try {
      const response = await apiClient.delete(url);
      console.log("dustbin setup data:", response.data);
      deleteResponse.data = response.data;
      deleteResponse.isSucess = true;
      return deleteResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("dustbin setup failed:", error);
      deleteResponse.errorData = errorResponse.response.data;
      deleteResponse.isSucess = false;
      return deleteResponse;
    }
  }
}
