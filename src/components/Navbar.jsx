// components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";
import Swal from "sweetalert2";

function Navbar({ title }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuRef = useRef();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);

  // route sekarang
  const location = useLocation();

  // route dengan background solid
  const solidBgRoutes = ["/tentang", "/blog", "/menu", "/kontak", "/testimoni"];

  // auth state
  const isLoggedIn = AuthController((state) => state.isLoggedIn);
  const user = AuthController((state) => state.user);
  const logout = AuthController((state) => state.logout);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Tampilkan loading animation
    Swal.fire({
      title: "Logging out...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Simulasi proses logout (bisa disesuaikan dengan implementasi asli)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi delay
      logout();
      setShowProfileMenu(false);
      
      // Tutup loading dan redirect
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
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > 50) {
          setNavbarBackground(true);
        } else {
          setNavbarBackground(false);
        }

        if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
          setNavbarVisible(false); // scroll down -> hide
        } else {
          setNavbarVisible(true); // scroll up -> show
        }

        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
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

        {/* Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {["Beranda", "Tentang", "Blog", "Menu", "Kontak", "Testimoni"].map(
            (item) => (
              <Link
                key={item}
                to={item === "Beranda" ? "/" : `/${item.toLowerCase()}`}
                className={`relative font-semibold transition duration-300 group ${
                  navbarBackground || solidBgRoutes.includes(location.pathname)
                    ? "text-black hover:text-[#B80002]"
                    : "text-white hover:text-[#FFD700]"
                }`}
              >
                {item}
                <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-[#B80002] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        {/* Tombol Login & Profil */}
        <div className="flex items-center space-x-4 relative" ref={menuRef}>
          {/* tombol login/daftar tetap muncul kalau belum login */}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className={`text-center px-5 py-2 rounded-lg transition font-semibold ${
                  navbarBackground || solidBgRoutes.includes(location.pathname)
                    ? "bg-[#B80002] text-white hover:bg-[#a00002]"
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`hidden md:block text-center px-5 py-2 rounded-lg transition font-semibold ${
                  navbarBackground || solidBgRoutes.includes(location.pathname)
                    ? "bg-[#B80002] text-white hover:bg-[#a00002]"
                    : "bg-[#B80002] text-white hover:bg-[#a00002]"
                }`}
              >
                Daftar
              </Link>
            </>
          )}

          {/* Avatar selalu ada */}
          <div className="relative">
            <img
              src={user?.avatar || defaultProfile}
              alt="Profile"
              className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                showProfileMenu 
                  ? "border-[#B80002] scale-105" 
                  : navbarBackground || solidBgRoutes.includes(location.pathname)
                    ? "border-gray-300 hover:border-[#B80002]"
                    : "border-white/50 hover:border-white"
              }`}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <p className="text-gray-800 font-medium">
                    {isLoggedIn ? `Halo, ${user?.name}` : "Selamat Datang"}
                  </p>
                </div>

                <div className="p-2">
                  {!isLoggedIn ? (
                    <>
                      <Link
                        to="/login"
                        className="block text-center text-gray-700 font-medium mb-2 hover:bg-gray-100 rounded-md py-2 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block text-center text-gray-700 font-medium hover:bg-gray-100 rounded-md py-2 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Daftar
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="block text-center text-gray-700 font-medium mb-2 hover:bg-gray-100 rounded-md py-2 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Edit Profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full bg-[#B80002] text-white py-2 rounded-md hover:bg-[#a00002] transition mt-2 font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isLoggingOut ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging out...
                          </>
                        ) : (
                          "Logout"
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;