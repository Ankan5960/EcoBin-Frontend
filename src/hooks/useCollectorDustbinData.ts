import { fetchCollectorDustbinData } from "@/api/dustbinDataApi";
import userLocationStore from "@/store/userLocationStore";
import type { DustbinData, LocationData } from "@/types/dustbinTypes";
import { useEffect, useRef, useState } from "react";

export function useCollectorDustbinData(localityName: string) {
  const [data, setData] = useState<DustbinData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const locationData = userLocationStore((state) => state.location);

  const lastLocation = useRef<LocationData | null>(null);

  useEffect(() => {
    const hasLocationChanged =
      lastLocation.current?.latitude !== locationData?.latitude ||
      lastLocation.current?.longitude !== locationData?.longitude;

    if (!hasLocationChanged && data) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchCollectorDustbinData(
          localityName,
          locationData?.latitude || "",
          locationData?.longitude || ""
        );
        setData(res);
        lastLocation.current = {
          latitude: locationData?.latitude || "",
          longitude: locationData?.longitude || "",
        };
      } catch (err) {
        console.error("Error fetching dustbin data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [localityName,locationData?.latitude, locationData?.longitude, data]);

  return { data, loading };
}
