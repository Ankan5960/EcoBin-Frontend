import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import Body from "./body/Body";
import { SidebarProvider } from "../../states/useSidebarOpen";


export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">

        <Navbar />

        <div className="flex flex-1">
          <Sidebar />
          <Body />
        </div>
        
        <Footer />

      </div>
    </SidebarProvider>
  );
}
