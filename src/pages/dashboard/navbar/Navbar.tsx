import { Button } from "@mui/material";
import { useSidebarOpen } from "../../../states/useSidebarOpen";

const Navbar = () => {
  const { isOpen, toggleSidebar } = useSidebarOpen();

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">EcoBin Dashboard</h1>
      <div className="lg:hidden">
        <Button
          variant="contained"
          onClick={() => toggleSidebar()}
        >
          {isOpen ? "Close" : "Menu"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
