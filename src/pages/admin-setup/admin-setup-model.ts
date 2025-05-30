import { DustbinDetailsDataModel } from "@/components/dustbin-data/dustbin-data-model";
import { IErrorResponseModel } from "@/models/error-response-model";

export interface IDustbinSetUpPostRequest {
  dustbinType: string;
}

export interface IDustbinSetUpPostResponse {
  dustbinId: string;
}

export interface IAdminSetupPostResponse {
  isSucess: boolean;
  data: IDustbinSetUpPostResponse;
  errorData: IErrorResponseModel;
}

export interface IAdminSetupGetResponse {
  isSucess: boolean;
  data: DustbinDetailsDataModel;
  errorData: IErrorResponseModel;
}

export interface IDustbinSetUpDeleteResponse {
  message: string;
}

export interface IAdminSetupDeleteResponse {
  isSucess: boolean;
  data: IDustbinSetUpDeleteResponse;
  errorData: IErrorResponseModel;
}
