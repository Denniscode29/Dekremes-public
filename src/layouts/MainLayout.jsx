import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import AuthController from "../controllers/AuthController";

function MainLayout() {
  const refreshUserStatus = AuthController((state) => state.refreshUserStatus);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshUserStatus();
    }
  }, [refreshUserStatus]);

  return (
    <>
      <ScrollToTop /> {/* ini kuncinya */}
      <Navbar title="DeKremes&Chicken" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
