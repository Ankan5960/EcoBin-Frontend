import { AvtarDropdown } from "@/components/avatardropdown/avtarDropdown";
import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";
import { useSidebarStore } from "@/store/useSidebarStore";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();

  return (
    <nav className={`${DEFAULT_ITEM_PROPERTIES.themeColor.navbar} text-white p-4 flex justify-between items-center`}>
      <div className="flex gap-1.5">
        <div className="lg:hidden flex justify-center items-center">
          <div onClick={toggleSidebar}>
            <Menu color="black" size={24} />
          </div>
        </div>
        <div className="flex p-1 justify-center items-center">
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
