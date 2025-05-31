import { AdminPanelData, AdminPanelDataResponse } from "@/pages/admin-panel-page/admin-panel-model";
import { IErrorResponseModel } from "../../models/error-response-model";
import apiClient from "@/service/api-service";

function getDefaultAdminPanelData(): AdminPanelData {
  return {
    totalDustbins: "0",
    totalActiveDustbins: "0",
    totalWeightData: "0",
    totalAirQualityData: "0",
    categories: {},
  };
}

export class AdminPanelDataService {
  public async fetchAdminPanelData(): Promise<AdminPanelDataResponse> {
    const url = `/api/report-data/getReportData`;
    const adminPanelResponse: AdminPanelDataResponse = {
      adminPanelData: getDefaultAdminPanelData(),
      errorData: null,
    };
    
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
