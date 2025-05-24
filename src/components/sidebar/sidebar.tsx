import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import { SquareX } from "lucide-react";
import { useToggleSidebar } from "@/hooks/useToggleSidebar";
import { useNavigate } from "react-router-dom";
import { useAuthRole } from "@/store/authStore";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useToggleSidebar();
  const navigate = useNavigate();
  const role = useAuthRole();

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

      {role === "Admin" || role === "Guest" || role === "User" || role === null ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Dashboard
        </button>
      ) : null}

      {role === "Collector" ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Dashboard
        </button>
      ) : null}

      {role === "Admin" ? (
        <>
          <button
            onClick={() => navigate("/dashboard/admin-setup")}
            className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
          >
            Admin Setup
          </button>
          <button
            onClick={() => navigate("/dashboard/admin-panel")}
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
