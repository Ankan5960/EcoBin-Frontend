import { AvtarDropdown } from "@/components/avatardropdown/avtarDropdown";
import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import { useToggleSidebar } from "@/hooks/useToggleSidebar";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { toggleSidebar } = useToggleSidebar();
  const navigate = useNavigate();

  return (
    <nav
      className={`${DEFAULT_ITEM_PROPERTIES.themeColor.navbar} text-white p-2 lg:p-3 flex justify-between items-center`}
    >
      <div className="flex gap-1.5">
        <div className="lg:hidden flex justify-center items-center">
          <div
            onClick={toggleSidebar}
            className="p-0 rounded hover:text-gray-700 transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </div>
        </div>
        <div
          onClick={() => navigate("/dashboard")}
          className="flex p-1 justify-center items-center"
        >
          <img
            src="/EcoBin-white.png"
            alt="EcoBin Logo"
            className="h-5 w-auto sm:h-6 md:h-6 lg:h-8"
          />
          <h1 className={`${DEFAULT_ITEM_PROPERTIES.heading.heading1} " pl-2`}>
            EcoBin
          </h1>
        </div>
      </div>

      <div className="flex items-center">
        <AvtarDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
