import axios from "axios";
import { AdminFormInputs } from "@/types/adminApiTypes";
import { DustbinDetailsDataTypes } from "@/types/dustbinDetailsDataTypes";

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
