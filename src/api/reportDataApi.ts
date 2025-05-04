import { ReportDataResponse } from "@/types/reportTypes";
import { URLs } from "@/URLs/urls";
import axios from "axios";


export const fetchReportData = async (): Promise<ReportDataResponse> => {
  const response = await axios.get<ReportDataResponse>(URLs.EcoBin_Sensor_Data_Service+"/ReportData/getReportData");
  return response.data;
};