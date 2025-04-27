import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import Body from "./body/Body";

export default function Dashboard() {
  return (
      <div className="flex flex-col h-screen">

        <Navbar />

        <div className="flex flex-1">
          <Sidebar />
          <Body />
        </div>
        
        <Footer />

      </div>
  );
}
