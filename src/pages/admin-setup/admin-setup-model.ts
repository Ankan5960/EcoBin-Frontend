import { DustbinDetailsDataModel } from "@/components/dustbin-data/dustbin-data-model";
import { IErrorResponseModel } from "@/models/error-response-model";

export type DustbinFormInputs = {
  dustbinType: string;
};

export type RoleFormInputs = {
  roleId: string;
  areaOfService: string;
};

export interface IDustbinSetUpPostRequest {
  dustbinType: string;
}

export interface IDustbinSetUpPost {
  dustbinId: string;
}

export interface IDustbinSetupPostResponse {
  isSucess: boolean;
  data: IDustbinSetUpPost;
  errorData: IErrorResponseModel;
}

export interface IDustbinSetupGetResponse {
  isSucess: boolean;
  data: DustbinDetailsDataModel;
  errorData: IErrorResponseModel;
}

export interface IDeleteDustbinSetup {
  message: string;
}

export interface IDeleteDustbinSetupResponse {
  isSucess: boolean;
  data: IDeleteDustbinSetup;
  errorData: IErrorResponseModel;
}

export interface RoleResponse {
  roleId: string;
  roleName: string;
}

export interface IGetRoleSetupResponse {
  isSucess: boolean;
  data: RoleResponse[];
  errorData: IErrorResponseModel;
}

export interface RegistrationKeyResponseDto {
  keyId: string;
  registrationKey: string;
  roleId: string;
  isUsed: boolean;
  expiresAt: string;
  createdAt: string;
  deleteAt?: string | null;
}

export interface IPostRoleSetupResponse {
  isSucess: boolean;
  data: RegistrationKeyResponseDto;
  errorData: IErrorResponseModel;
}

export interface IPostRoleSetupRequest{
  roleId: string;
}

// export interface IRoleSetUpPostRequest {
//   roleId: string;
// }
