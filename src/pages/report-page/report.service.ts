import { ReportDataResponse } from "@/models/report-model";
import { IErrorResponseModel } from "../../models/error-response-model";
import apiClient from "@/service/api-service";

export class ReportDataService {
  public async fetchReportData(): Promise<
    ReportDataResponse | IErrorResponseModel
  > {
    const url = `/report-data/getReportData`;
    try {
      const response = await apiClient.get<ReportDataResponse>(url);
      return response.data;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("Failed to fetch report data:", error);
      return errorResponse.response.data;
    }
  }
}
