import axios from "axios";

export const fetchMapBoxApiKeyData = async (): Promise<string> => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_ECOBIN_USER_DATA_SERVICE
    }/api/MapBoxApiKey/get-mapBox-api-key`
  );
  return response.data;
};
