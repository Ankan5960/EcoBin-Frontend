import axios from "axios";
import type { ReportDataResponse } from "@/models/report-model";

export const fetchReportData = async (): Promise<ReportDataResponse> => {
  const response = await axios.get<ReportDataResponse>(
    `${
      import.meta.env.VITE_ECOBIN_SENSOR_DATA_SERVICE
    }/api/ReportData/getReportData`
  );
  return response.data;
};
