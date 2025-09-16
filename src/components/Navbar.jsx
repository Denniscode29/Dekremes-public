// components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";
import Swal from "sweetalert2";
import LoadingScreen from "./LoadingScreen";
import { Menu, X } from "lucide-react";

function Navbar({ title }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingForPage, setLoadingForPage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuRef = useRef();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);

  const location = useLocation();
  const solidBgRoutes = ["/tentang", "/blog", "/menu", "/kontak", "/testimoni"];

  // auth state
  const isLoggedIn = AuthController((state) => state.isLoggedIn);
  const user = AuthController((state) => state.user);
  const logout = AuthController((state) => state.logout);

  // navigasi dengan loading
  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      setLoadingForPage(path);
      setIsLoading(true);
      setMobileMenuOpen(false); // tutup menu mobile
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    navigate(loadingForPage);
  };

  // logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    Swal.fire({
      title: "Logging out...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logout();
      setShowProfileMenu(false);
      Swal.close();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Terjadi kesalahan saat logout. Silakan coba lagi.",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // klik luar untuk nutup dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // kontrol scroll navbar
  const controlNavbar = useCallback(() => {
    if (window.scrollY > 50) setNavbarBackground(true);
    else setNavbarBackground(false);

    if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
      setNavbarVisible(false);
    } else {
      setNavbarVisible(true);
    }

    lastScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [controlNavbar]);

  // menu items
  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/tentang" },
    { name: "Blog", path: "/blog" },
    { name: "Menu", path: "/menu" },
    { name: "Kontak", path: "/kontak" },
    { name: "Testimoni", path: "/testimoni" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 
          ${navbarVisible ? "translate-y-0" : "-translate-y-full"}
          ${
            navbarBackground || solidBgRoutes.includes(location.pathname)
              ? "bg-[#FFF5CC] shadow-lg"
              : "bg-transparent"
          }`}
      >
        <div className="flex justify-between items-center py-4 px-6 md:px-12">
          {/* Logo */}
          <div
            className={`font-extrabold text-2xl md:text-3xl tracking-wide transition-colors duration-300 ${
              navbarBackground || solidBgRoutes.includes(location.pathname)
                ? "text-gray-800"
                : "text-white"
            }`}
          >
            {title}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`relative font-semibold transition duration-300 group ${
                  navbarBackground || solidBgRoutes.includes(location.pathname)
                    ? "text-black hover:text-[#B80002]"
                    : "text-white hover:text-[#FFD700]"
                }`}
              >
                {item.name}
                <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-[#B80002] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4 relative" ref={menuRef}>
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => handleNavigation("/login")}
                  className={`px-5 py-2 rounded-lg transition font-semibold ${
                    navbarBackground || solidBgRoutes.includes(location.pathname)
                      ? "bg-[#B80002] text-white hover:bg-[#a00002]"
                      : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => handleNavigation("/register")}
                  className="px-5 py-2 rounded-lg bg-[#B80002] text-white hover:bg-[#a00002] transition font-semibold"
                >
                  Daftar
                </Link>
              </>
            ) : (
              <div className="relative">
                <img
                  src={user?.avatar || defaultProfile}
                  alt="Profile"
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                    showProfileMenu
                      ? "border-[#B80002] scale-105"
                      : "border-gray-300 hover:border-[#B80002]"
                  }`}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
                {showProfileMenu && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fadeIn">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                      <p className="text-gray-800 font-medium">
                        Halo, {user?.name || "User"}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="block text-center text-gray-700 font-medium mb-2 hover:bg-gray-100 rounded-md py-2 transition-colors"
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleNavigation("/profile");
                        }}
                      >
                        Edit Profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full bg-[#B80002] text-white py-2 rounded-md hover:bg-[#a00002] transition mt-2 font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF5CC] shadow-lg px-6 py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className="block text-gray-800 font-semibold hover:text-[#B80002]"
              >
                {item.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  onClick={() => handleNavigation("/login")}
                  className="px-5 py-2 rounded-lg bg-[#B80002] text-white text-center font-semibold hover:bg-[#a00002]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => handleNavigation("/register")}
                  className="px-5 py-2 rounded-lg bg-[#FFD700] text-black text-center font-semibold hover:bg-[#e6c200]"
                >
                  Daftar
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full bg-[#B80002] text-white py-2 rounded-md hover:bg-[#a00002] transition font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
    </>
  );
}

export default Navbar;
