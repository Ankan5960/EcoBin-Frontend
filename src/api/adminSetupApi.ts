import axios from "axios";
import type { DustbinData } from "@/types/dustbinTypes";
import { AdminFormInputs } from "@/types/adminApiTypes";
import { DustbinDetailsDataTypes } from "@/types/dustbinDetailsDataTypes";

export const fetchDustbinData = async (
  latitude: string | number,
  longitude: string | number
): Promise<DustbinData[]> => {
  const response = await axios.get<DustbinData[]>(
    `${
      import.meta.env.VITE_ECOBIN_USER_DATA_SERVICE
    }/api/DustbinData/get-dustbin-data`,
    {
      params: {
        Latitude: latitude,
        Longitude: longitude,
      },
    }
  );
  return response.data;
};

export const postSetup = async (data: AdminFormInputs): Promise<string> => {
  const res = await axios.post(
    `${import.meta.env.VITE_ECOBIN_SENSOR_DATA_SERVICE}/api/AdminSetup/setup`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const fetchSetup = async (
  DustbinId: string
): Promise<DustbinDetailsDataTypes> => {
  const res = await axios.get<DustbinDetailsDataTypes>(
    `${
      import.meta.env.VITE_ECOBIN_SENSOR_DATA_SERVICE
    }/api/AdminSetup/getsetup`,
    {
      params: {
        dustbinId: DustbinId,
      },
    }
  );

  return res.data;
};

export const deleteSetup = async (DustbinId: string): Promise<string> => {
  const res = await axios.delete(
    `${
      import.meta.env.VITE_ECOBIN_SENSOR_DATA_SERVICE
    }/api/AdminSetup/deleteSetup`,
    {
      params: {
        dustbinId: DustbinId,
      },
    }
  );

  return res.data;
};
