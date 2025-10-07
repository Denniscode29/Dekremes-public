// routes/AppRoute.jsx
import { Route, Routes } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Tentang from "../pages/Tentang";
import Blog from "../pages/Blog";
import Menu from "../pages/Menu";
import Kontak from "../pages/Kontak";
import Testimoni from "../pages/Testimoni";
import Profile from "../pages/Profile";
import MainLayout from "../layouts/MainLayout.jsx";
import Syarat from "../pages/Syarat.jsx";
import Kebijakan from "../pages/Kebijakan.jsx";
import CaraMembeli from "../pages/CaraMembeli.jsx";

// auth
import Register from "../pages/auth2/Register.jsx";
import Login from "../pages/auth2/Login";
import LoginSuccess from "../pages/LoginSuccess.jsx";
import VerifyCode from "../pages/auth2/VerifyCode.jsx";
import SetupProfile from "../pages/auth2/SetupProfile.jsx";

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
        <Route path="/profile" element={<Profile />} /> 
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/setup-Profile" element={<SetupProfile />} />
      <Route path="/syarat" element={<Syarat />} />
      <Route path="/kebijakan" element={<Kebijakan />} />
      <Route path="/CaraMembeli" element={<CaraMembeli />} />
    </Routes>
  );
}

export default AppRoute;
