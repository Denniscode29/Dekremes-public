import { Route, Routes } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Kategori from "../pages/Kategori";
import Kontak from "../pages/Kontak";
import Testimoni from "../pages/Testimoni";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<About />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/Kategori" element={<Kategori />} />
      <Route path="/Kontak" element={<Kontak />} />
      <Route path="/Testimoni" element={<Testimoni />} />
    </Routes>
  );
}

export default AppRoute;