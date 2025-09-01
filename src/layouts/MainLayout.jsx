import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";


function MainLayout() {
  return (
    <>
      <Navbar title="DeKremes&Chicken" />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;