import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import AuthController from "../controllers/AuthController";
import LoadingScreen from "../components/LoadingScreen.jsx";

function MainLayout() {
  const refreshUserStatus = AuthController((state) => state.refreshUserStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshUserStatus();
    }

    // Simulasikan loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // Sesuaikan dengan kebutuhan

    return () => clearTimeout(timer);
  }, [refreshUserStatus]);

  return (
    <>
      <ScrollToTop />
      <Navbar title="DeKremes&Crispy" />
      <main>
        {loading && <LoadingScreen />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;