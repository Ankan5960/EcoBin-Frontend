import { fetchDustbinData } from "@/api/axios";
import useLocationStore from "@/store/useUserLocationStore";
import type { DustbinData, LocationData } from "@/types/dustbinTypes";
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

    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchDustbinData(
          locationData?.latitude || "",
          locationData?.longitude || ""
        );
        setData(res);
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

    loadData();
  }, [locationData?.latitude, locationData?.longitude, data]);

  return { data, loading };
}
