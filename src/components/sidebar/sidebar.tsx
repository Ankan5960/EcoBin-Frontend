import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import { SquareX } from "lucide-react";
import { useToggleSidebar } from "@/hooks/useToggleSidebar";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useToggleSidebar();

  return (
    <aside
      className={`${
        DEFAULT_ITEM_PROPERTIES.themeColor.sidebar
      } text-white w-64 p-4 space-y-4 transition-transform transform lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed lg:static inset-y-0 left-0 lg:flex flex-col z-50`}
    >
      <div className="lg:hidden">
        <SquareX size={24} onClick={() => toggleSidebar()} />
      </div>
      <a
        href="/dashboard"
        className="block py-2 px-4 rounded hover:bg-gray-700"
      >
        Dashboard
      </a>
      <a
        href="/dashboard/admin"
        className="block py-2 px-4 rounded hover:bg-gray-700"
      >
        Admin Panel
      </a>
      <a
        href="/dashboard/settings"
        className="block py-2 px-4 rounded hover:bg-gray-700"
      >
        Settings
      </a>
      <a
        href="/dashboard/contactus"
        className="block py-2 px-4 rounded hover:bg-gray-700"
      >
        Contact us
      </a>
      <a
        href="/dashboard/report"
        className="block py-2 px-4 rounded hover:bg-gray-700"
      >
        Report
      </a>
    </aside>
  );
};

export default Sidebar;
