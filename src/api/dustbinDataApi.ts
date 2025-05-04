import axios from "axios";
import { DustbinData } from "@/types/dustbinTypes";
import { URLs } from "@/URLs/urls";

export const fetchDustbinData = async (
  latitude: string | number,
  longitude: string | number
): Promise<DustbinData[]> => {
  const response = await axios.get<DustbinData[]>(
    URLs.EcoBin_User_Data_Service+"/DustbinData/get-dustbin-data",
    {
      params: {
        Latitude: latitude,
        Longitude: longitude,
      },
    }
  );
  return response.data;
};
