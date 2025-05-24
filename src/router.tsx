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
import AppLayout from "./components/layout/AppLayout";
import { getDashboardChildren } from "./utility/getDashboardRoutes";
import { useAuthRole } from "./store/authStore";

export default function AppRouter() {
  const role = useAuthRole();

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
          children: getDashboardChildren(role),
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
  return (
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  );
}
