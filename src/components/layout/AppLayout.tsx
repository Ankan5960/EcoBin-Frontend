import { useEffect } from "react";
import userLocationStore from "@/store/userLocationStore";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { fetchLocation, loading, location } = userLocationStore();

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  if (loading || !location) return <div>Getting your location...</div>;

  return <>{children}</>;
};

export default AppLayout;
