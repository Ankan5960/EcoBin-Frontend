import axios from "axios";
import type { DustbinData } from "@/types/dustbinTypes";
import type { ReportDataResponse } from "@/types/reportTypes";
import { AdminFormInputs } from "@/types/adminApiTypes";
import { DustbinDetailsDataResponseModel } from "@/types/DustbinDetailsDataResponseModel";

export const fetchDustbinData = async (
  latitude: string | number,
  longitude: string | number
): Promise<DustbinData[]> => {
  const response = await axios.get<DustbinData[]>(
    `${import.meta.env.VITE_ECOBIN_USER_DATA_SERVICE}/api/DustbinData/get-dustbin-data`,
    {
      params: {
        Latitude: latitude,
        Longitude: longitude,
      },
    }
  );
  return response.data;
};

export const fetchReportData = async (): Promise<ReportDataResponse> => {
  const response = await axios.get<ReportDataResponse>(
    `${import.meta.env.VITE_ECOBIN_SENSOR_DATA_SERVICE}/api/ReportData/getReportData`
  );
  return response.data;
};

export const postSetup = async (data: AdminFormInputs): Promise<string> => {
    const res = await axios.post(`${import.meta.env.VITE_ECOBIN_SENSOR_DATA_SERVICE}/api/AdminSetup/setup`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data; 
};

export const fetchSetup = async (DustbinId: string) : Promise<DustbinDetailsDataResponseModel> => {
  const res = await axios.get<DustbinDetailsDataResponseModel>(`${import.meta.env.VITE_ECOBIN_SENSOR_DATA_SERVICE}/api/AdminSetup/getsetup`,
    {
      params: {
        dustbinId: DustbinId
      },
    }
  );

  return res.data;
}

export const deleteSetup = async (DustbinId: string) : Promise<string> => {
  const res = await axios.delete(`${import.meta.env.VITE_ECOBIN_SENSOR_DATA_SERVICE}/api/AdminSetup/deleteSetup`,
    {
      params: {
        dustbinId: DustbinId
      }
    }
  );

  return res.data;
}