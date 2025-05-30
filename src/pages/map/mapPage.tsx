import { useAuthRole } from "@/store/authStore";
import UserMap from "./userMap";
import CollectorMap from "./collectorMap";

const MapPage: React.FC = () => {
  const role = useAuthRole();

  return role === "Admin" || role === "Collector" ? (
    <CollectorMap />
  ) : (
    <UserMap />
  );
};

export default MapPage;
