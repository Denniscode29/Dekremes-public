import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";  


function MainLayout() {
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