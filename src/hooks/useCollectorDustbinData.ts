import {
  DustbinData,
  LocationData,
} from "@/components/dustbin-data/dustbin-data-model";
import { DustbinDataService } from "@/components/dustbin-data/dustbin-data.service";
import userLocationStore from "@/store/userLocationStore";
import { useEffect, useMemo, useRef, useState } from "react";

export function useCollectorDustbinData(localityName: string) {
  const [data, setData] = useState<DustbinData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const locationData = userLocationStore((state) => state.location);
  const collectorDustbinData = useMemo(() => new DustbinDataService(), []);
  const lastLocation = useRef<LocationData | null>(null);
  
  const areaOfService = useMemo(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return null;
      const parsed = JSON.parse(userData);
      return parsed.areaOfService ?? null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  }, []);

  useEffect(() => {
    const hasLocationChanged =
      lastLocation.current?.latitude !== locationData?.latitude ||
      lastLocation.current?.longitude !== locationData?.longitude;

    if (!hasLocationChanged && data) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const res = await collectorDustbinData.fetchCollectorDustbinData({
          localityName: areaOfService || null,
          latitude: locationData?.latitude || "",
          longitude: locationData?.longitude || "",
        });
        setData(res.data);
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
  }, [
    localityName,
    locationData?.latitude,
    locationData?.longitude,
    data,
    collectorDustbinData,
  ]);

  return { data, loading };
}
