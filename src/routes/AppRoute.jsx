import { Route, Routes } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Menu from "../pages/Menu";
import Kontak from "../pages/Kontak";
import Testimoni from "../pages/Testimoni";
import Login from "../pages/auth2/Login";
import Register from "../pages/auth2/Register";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<About />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Kontak" element={<Kontak />} />
      <Route path="/Testimoni" element={<Testimoni />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

export default AppRoute;