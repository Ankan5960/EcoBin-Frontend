import type { RouteObject } from "react-router-dom";
import AdminSetup from "../pages/admin-setup/adminSetUp";
import AdminPanel from "../pages/admin-panel-page/adminPanel";
import Settings from "../pages/setting-page/setting";
import ContactUs from "../pages/contactus-page/contactUs";
import MapPage from "@/pages/map/mapPage";

export function getDashboardChildren(role: string | undefined): RouteObject[] {
  const routes: RouteObject[] = [
    { index: true, element: <MapPage /> },
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
