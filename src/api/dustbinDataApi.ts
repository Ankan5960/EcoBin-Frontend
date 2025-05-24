import { DirectionsResponseModel } from "@/models/directions-response-model";
import { DustbinData } from "@/models/dustbin-model";
import axios from "axios";

export const fetchUserDustbinData = async (
  latitude: string | number,
  longitude: string | number
): Promise<DustbinData[]> => {
  const response = await axios.get<DustbinData[]>(
    `${
      import.meta.env.VITE_ECOBIN_USER_DATA_SERVICE
    }/api/DustbinData/get-user-dustbin-data`,
    {
      params: {
        Latitude: latitude,
        Longitude: longitude,
      },
    }
  );
  return response.data;
};

export const fetchCollectorDustbinData = async (
  localityName: string | null,
  latitude: string | number,
  longitude: string | number
): Promise<DustbinData[]> => {
  const response = await axios.get<DustbinData[]>(
    `${
      import.meta.env.VITE_ECOBIN_USER_DATA_SERVICE
    }/api/DustbinData/get-collector-dustbin-data`,
    {
      params: {
        LocalityName: localityName,
        Latitude: latitude,
        Longitude: longitude,
      },
    }
  );
  return response.data;
};

export const fetchCollectRoute = async (
  localityName: string | null,
  latitude: string | number,
  longitude: string | number
): Promise<DirectionsResponseModel> => {
  try {
    const response = await axios.get<DirectionsResponseModel>(
      `${
        import.meta.env.VITE_ECOBIN_USER_DATA_SERVICE
      }/api/DustbinData/get-collect-path`,
      {
        params: {
          LocalityName: localityName,
          Latitude: latitude,
          Longitude: longitude,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching collection route:", error);
    throw error;
  }
};
