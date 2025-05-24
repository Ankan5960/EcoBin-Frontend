import { AdminPanelDataResponse } from "@/pages/admin-panel-page/admin-panel-model";
import { IErrorResponseModel } from "../../models/error-response-model";
import apiClient from "@/service/api-service";

export class AdminPanelDataService {
  public async fetchAdminPanelData(): Promise<AdminPanelDataResponse> {
    const url = `/report-data/getReportData`;
    const adminPanelResponse = {} as AdminPanelDataResponse;
    try {
      const response = await apiClient.get(url);

      adminPanelResponse.adminPanelData = response.data;
      adminPanelResponse.errorData = null;
      return adminPanelResponse;
    } catch (error) {
      const errorResponse = error as {
        response: { data: IErrorResponseModel };
      };
      console.error("Failed to fetch report data:", error);
      adminPanelResponse.errorData = errorResponse.response.data;
      return adminPanelResponse;
    }
  }
}
