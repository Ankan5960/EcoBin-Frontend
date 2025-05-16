import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Error404Page from "./pages/error-page/Error404Page";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login-page/login";
import Root from "./pages/root/root";
import Signup from "./pages/signup-page/signup";
import AdminPanel from "./pages/admin/admin";
import Settings from "./pages/setting-page/setting";
import Report from "./pages/report-page/report";
import ContactUs from "./pages/contactus-page/contactUs";
import AppLayout from "./components/layout/AppLayout";
import UserMap from "./pages/map/userMap";
//import CollectorMap from "./pages/map/collectorMap";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404Page />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <UserMap />,
          },
          // {
          //   index: true,
          //   element: <CollectorMap />,
          // },
          {
            path: "admin",
            element: <AdminPanel />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "report",
            element: <Report />,
          },
          {
            path: "contactus",
            element: <ContactUs />,
          },
        ],
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function AppRouter() {
  return (
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  );
}
