import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import  useLocationStore  from '@/store/useUserLocationStore';

export const useDustbinData = () => {
  const location = useLocationStore((state) => state.location);

  return useQuery({
    queryKey: ['dustbinData', location?.latitude, location?.longitude],
    queryFn: async () => {
      if (!location) return [];
      const response = await axios.get(
        `http://localhost:5274/api/DustbinData/get-dustbin-data`,
        {
          params: {
            Latitude: location.latitude,
            Longitude: location.longitude,
          },
        }
      );
      return response.data;
    },
    enabled: !!location, // only fetch when location exists
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
