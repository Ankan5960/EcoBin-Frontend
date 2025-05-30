import {
  DustbinData,
  LocationData,
} from "@/components/dustbin-data/dustbin-data-model";
import { DustbinDataService } from "@/components/dustbin-data/dustbin-data.service";
import userLocationStore from "@/store/userLocationStore";
import { useEffect, useMemo, useRef, useState } from "react";

export function useUserDustbinData() {
  const [data, setData] = useState<DustbinData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const locationData = userLocationStore((state) => state.location);
  const collectorDustbinData = useMemo(() => new DustbinDataService(), []);

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
        const res = await collectorDustbinData.fetchUserDustbinData({
          latitude: locationData?.latitude || "",
          longitude: locationData?.longitude || "",
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

    loadData();
  }, [
    locationData?.latitude,
    locationData?.longitude,
    data,
    collectorDustbinData,
  ]);

  return { data, loading };
}
