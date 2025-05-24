import { IErrorResponseModel } from "@/models/error-response-model";

export interface IContactUsFromRequestModel {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IContactUsResponseModel {
  isSuccess: boolean
}

export interface IContactUsFromResponseModel {
  data: IContactUsResponseModel | null;
  errorData: IErrorResponseModel | null;
}
