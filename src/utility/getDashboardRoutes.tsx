import type { RouteObject } from "react-router-dom";
import UserMap from "../pages/map/userMap";
import CollectorMap from "../pages/map/collectorMap";
import AdminSetup from "../pages/admin/admin";
import AdminPanel from "../pages/report-page/report";
import Settings from "../pages/setting-page/setting";
import ContactUs from "../pages/contactus-page/contactUs";

export function getDashboardChildren(role: string | undefined): RouteObject[] {
  const routes: RouteObject[] = [
    { index: true, element: <UserMap /> },
    { path: "collectormap", element: <CollectorMap /> },
    { path: "settings", element: <Settings /> },
    { path: "contactus", element: <ContactUs /> },
  ];

  if (role === "Admin") {
    routes.push(
      { path: "admin-setup", element: <AdminSetup /> },
      { path: "admin-panel", element: <AdminPanel /> }
    );
  }

  return routes;
}
