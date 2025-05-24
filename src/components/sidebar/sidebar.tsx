import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import { SquareX } from "lucide-react";
import { useToggleSidebar } from "@/hooks/useToggleSidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { LocalStorage } from "@/storage/LocalStorage";
import { IUserLoginResponse } from "@/pages/login-page/login.model";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useToggleSidebar();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("Guest");
  const userLocalStorage = useMemo(
    () => new LocalStorage<IUserLoginResponse>(),
    []
  );

  useEffect(() => {
    const user = userLocalStorage.get("user");
    if (user) setUserRole(user.roleName);
  }, [userLocalStorage]);

  return (
    <aside
      className={`${
        DEFAULT_ITEM_PROPERTIES.themeColor.sidebar
      } text-white w-64 p-4 space-y-4 transition-transform transform lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed lg:static inset-y-0 left-0 lg:flex flex-col z-50`}
    >
      <div className="lg:hidden">
        <SquareX size={24} onClick={toggleSidebar} />
      </div>

      {userRole === "Admin" || userRole === "Guest" || userRole === "User" ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Dashboard
        </button>
      ) : null}

      {userRole === "Collector" ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Dashboard
        </button>
      ) : null}

      {userRole === "Admin" ? (
        <>
          <button
            onClick={() => navigate("/dashboard/admin")}
            className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
          >
            Admin Setup
          </button>
          <button
            onClick={() => navigate("/dashboard/report")}
            className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
          >
            Admin Panel
          </button>
        </>
      ) : null}
      <button
        onClick={() => navigate("/dashboard/settings")}
        className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
      >
        Settings
      </button>
      <button
        onClick={() => navigate("/dashboard/contactus")}
        className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
      >
        Contact us
      </button>
    </aside>
  );
};

export default Sidebar;
