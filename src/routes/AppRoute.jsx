// routes/AppRoute.jsx
import { Route, Routes } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Tentang from "../pages/Tentang";
import Blog from "../pages/Blog";
import Menu from "../pages/Menu";
import Kontak from "../pages/Kontak";
import Testimoni from "../pages/Testimoni";
import Profile from "../pages/Profile"; // ✅ tambahin profile

import MainLayout from "../layouts/MainLayout.jsx";

import Login from "../pages/auth2/Login";
import Register from "../pages/auth2/Register";

function AppRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/testimoni" element={<Testimoni />} />
        <Route path="/profile" element={<Profile />} /> {/* ✅ halaman profil */}
      </Route>

      {/* Auth route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoute;
