import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBanners from "./AnnouncementBanners";

const Layout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <AnnouncementBanners />
      <main className="flex-1">
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;