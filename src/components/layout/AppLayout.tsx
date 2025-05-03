import { useEffect } from "react";
import useLocationStore from "@/store/useUserLocationStore";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { fetchGeoLocation, loading, location } = useLocationStore();

  useEffect(() => {
    fetchGeoLocation();
  }, [fetchGeoLocation]);

  if (loading || !location) return <div>Getting your location...</div>;

  return <>{children}</>;
};

export default AppLayout;
