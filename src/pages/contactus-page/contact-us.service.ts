import {
  IContactUsFromRequestModel,
  IContactUsFromResponseModel,
  IContactUsResponseModel,
} from "@/pages/contactus-page/contact-us-from-model";
import { IErrorResponseModel } from "@/models/error-response-model";
import apiClient from "@/service/api-service";

export class ContactUsService {
  public async postContactUs(
    fromData: IContactUsFromRequestModel
  ): Promise<IContactUsFromResponseModel> {
    const url = `/api/user-data/post-contact-us`;
    try {
      const response = await apiClient.post(url, fromData);
      console.log("contact us data:", response.data);
      return {
        data: response.data as IContactUsResponseModel,
        errorData: null,
      };
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("post contact us failed:", error);
      return {
        data: null,
        errorData: errorResponse.response.data,
      };
    }
  }
}
