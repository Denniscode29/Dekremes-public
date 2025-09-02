import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";  
import AuthController from "../controllers/AuthController";

function MainLayout() {
  const refreshUserStatus = AuthController((state) => state.refreshUserStatus);
  
  // Hapus line berikut jika tidak digunakan:
  // const isLoggedIn = AuthController((state) => state.isLoggedIn);

  useEffect(() => {
    // Periksa status autentikasi saat komponen dimuat
    const token = localStorage.getItem("token");
    if (token) {
      refreshUserStatus();
    }
  }, [refreshUserStatus]);

  return (
    <>
      <Navbar title="DeKremes&Chicken" />
      <main>
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default MainLayout;