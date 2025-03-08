
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";

import { SidebarProvider } from "../../states/useSidebarOpen";
import Body from "./body/Body";

export default function Dashboard() {

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <Navbar />

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <Body />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </SidebarProvider>
  );
}
