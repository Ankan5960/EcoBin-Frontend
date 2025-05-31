import apiClient from "@/service/api-service";
import { IErrorResponseModel } from "../../models/error-response-model";
import {
  IDeleteDustbinSetupResponse,
  IDustbinSetupGetResponse as IGetDustbinSetupResponse,
  IDustbinSetupPostResponse as IPostDustbinSetUpResponse,
  IDustbinSetUpPostRequest as IPostDustbinSetUpRequest,
  IGetRoleSetupResponse as IGetRoleSetupResponse,
  IPostRoleSetupResponse as IPostRoleSetupResponse,
  IPostRoleSetupRequest,
} from "./admin-setup-model";

export class AdminSetUpService {
  public async postDustbinSetup(
    postData: IPostDustbinSetUpRequest
  ): Promise<IPostDustbinSetUpResponse> {
    const url = `/api/dustbinSetup/setup`;
    const postResponse = {} as IPostDustbinSetUpResponse;
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
      console.error("post dustbin setup failed:", error);
      postResponse.errorData = errorResponse.response.data;
      postResponse.isSucess = false;
      return postResponse;
    }
  }

  public async getDustbinSetup(
    dustbinId: string
  ): Promise<IGetDustbinSetupResponse> {
    const url = `/api/dustbinSetup/getsetup?dustbinId=${dustbinId}`;
    const getResponse = {} as IGetDustbinSetupResponse;
    try {
      const response = await apiClient.get(url);
      getResponse.data = response.data;
      getResponse.isSucess = true;
      return getResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("get dustbin setup failed:", error);
      getResponse.errorData = errorResponse.response.data;
      getResponse.isSucess = false;
      return getResponse;
    }
  }

  public async deleteDustbinSetup(
    dustbinId: string
  ): Promise<IDeleteDustbinSetupResponse> {
    const url = `/api/dustbinSetup/deleteSetup?dustbinId=${dustbinId}`;
    const deleteResponse = {} as IDeleteDustbinSetupResponse;
    try {
      const response = await apiClient.delete(url);
      deleteResponse.data = response.data;
      deleteResponse.isSucess = true;
      return deleteResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("delete dustbin setup failed:", error);
      deleteResponse.errorData = errorResponse.response.data;
      deleteResponse.isSucess = false;
      return deleteResponse;
    }
  }

  public async postRoleSetup(postdata: IPostRoleSetupRequest): Promise<IPostRoleSetupResponse> {
    const url = `/api/user-auth/RegistrationKey/create`;
    const postResponse = {} as IPostRoleSetupResponse;
    try {
      const response = await apiClient.post(url, postdata);
      postResponse.data = response.data;
      postResponse.isSucess = true;
      return postResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("Post Role failed:", error);
      postResponse.errorData = errorResponse.response.data;
      postResponse.isSucess = false;
      return postResponse;
    }
  }

  public async getRoleSetup(): Promise<IGetRoleSetupResponse> {
    const url = `/api/user-auth/roleId/get-role-ids`;
    const getResponse = {} as IGetRoleSetupResponse;
    try {
      const response = await apiClient.get(url);
      getResponse.data = response.data;
      getResponse.isSucess = true;
      return getResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("Get Role failed:", error);
      getResponse.errorData = errorResponse.response.data;
      getResponse.isSucess = false;
      return getResponse;
    }
  }
}
