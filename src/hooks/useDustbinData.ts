import useLocationStore from "@/store/useUserLocationStore";
import { DustbinData, LocationData } from "@/types/dustbinTypes";
import { URLs } from "@/URLs/urls";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export function useDustbinData() {
  const [data, setData] = useState<DustbinData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const locationData = useLocationStore((state) => state.location);

  const lastLocation = useRef<LocationData | null>(null);
 // const lastZoomLevel = useRef<number | null>(null);

  useEffect(() => {
    const hasLocationChanged =
      lastLocation.current?.latitude !== locationData?.latitude ||
      lastLocation.current?.longitude !== locationData?.longitude;

    if (!hasLocationChanged && data) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get<DustbinData[]>(URLs.DustbinDataUrl, {
          params: {
            Latitude: locationData?.latitude || "",
            Longitude: locationData?.longitude || "",
            // ZoomLevel: zoomLevel,
          },
        });
        setData(res.data);
        lastLocation.current = {
          latitude: locationData?.latitude || "",
          longitude: locationData?.longitude || "",
        };
        //lastZoomLevel.current = zoomLevel;
      } catch (err) {
        console.error("Error fetching dustbin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data, locationData?.latitude, locationData?.longitude]);

  return { data, loading };
}
