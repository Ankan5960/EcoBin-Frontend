import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import { X } from "lucide-react";
import { useToggleSidebar } from "@/hooks/useToggleSidebar";
import { useNavigate } from "react-router-dom";
import { useAuthRole } from "@/store/authStore";
import { useEffect, useRef, useMemo } from "react";

type MenuItem = {
  label: string;
  path: string;
  roles?: string[]; // optional: if omitted, visible to all
};

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useToggleSidebar();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const role = useAuthRole();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (isOpen) toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

 const filteredItems = useMemo(() => {
  const menuItems: MenuItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Admin Setup", path: "/dashboard/admin-setup", roles: ["Admin"] },
    { label: "Admin Panel", path: "/dashboard/admin-panel", roles: ["Admin"] },
    { label: "Settings", path: "/dashboard/settings" },
    { label: "Contact us", path: "/dashboard/contactus" },
  ];

  return menuItems.filter(
    (item) => !item.roles || (role && item.roles.includes(role))
  );
}, [role]);


  const handleClick = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) toggleSidebar(); // Only auto-close on small screens
  };

  return (
    <aside
      ref={sidebarRef}
      className={`${
        DEFAULT_ITEM_PROPERTIES.themeColor.sidebar
      } text-white w-64 p-4 space-y-4 transition-transform transform lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed lg:static inset-y-0 left-0 lg:flex flex-col z-50`}
    >
      <div className="lg:hidden rounded hover:text-red-500 transition-colors duration-200">
        <X className="w-6 h-6" onClick={toggleSidebar} />
      </div>

      {filteredItems.map(({ label, path }) => (
        <button
          key={path}
          onClick={() => handleClick(path)}
          className="block text-left w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          {label}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
