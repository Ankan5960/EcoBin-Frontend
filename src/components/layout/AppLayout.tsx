import { useEffect } from "react";
import userLocationStore from "@/store/userLocationStore";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { fetchGeoLocation, loading, location } = userLocationStore();

  useEffect(() => {
    fetchGeoLocation();
  }, [fetchGeoLocation]);

  if (loading || !location) return <div>Getting your location...</div>;

  return <>{children}</>;
};

export default AppLayout;
