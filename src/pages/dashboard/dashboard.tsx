import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
