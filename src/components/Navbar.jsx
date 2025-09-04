import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";

function Navbar({ title }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [navbarBackground, setNavbarBackground] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);

  // route sekarang
  const location = useLocation();

  // route yang harus selalu abu
  const solidBgRoutes = ["/tentang", "/blog", "/menu", "/kontak", "/testimoni"];

  // auth state
  const isLoggedIn = AuthController((state) => state.isLoggedIn);
  const user = AuthController((state) => state.user);
  const logout = AuthController((state) => state.logout);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/");
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
      <div className="flex justify-between items-center py-6 px-6 md:px-12">
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
                    ? "text-black"
                    : "text-white"
                }`}
              >
                {item}
                <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-[#B80002] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        {/* Tombol Login & Profil */}
        <div className="flex items-center space-x-8 relative">
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="text-center bg-[#B80002] text-white px-5 py-2 rounded-lg hover:bg-[#a00002] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden md:block text-center bg-[#B80002] text-white px-5 py-2 rounded-lg hover:bg-[#a00002] transition"
              >
                Daftar
              </Link>
            </>
          )}

          {/* Profil Avatar */}
          <div className="relative ml-4 md:ml-10" ref={menuRef}>
            <img
              src={user?.avatar || defaultProfile}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4">
                  <p className="text-gray-800 font-medium mb-2">
                    Halo, {user?.name || "Tamu"}
                  </p>

                  {!isLoggedIn ? (
                    <>
                      <Link
                        to="/login"
                        className="block w-full text-center bg-[#B80002] text-white py-2 rounded-lg hover:bg-[#a00002] transition mb-2"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block w-full text-center bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Daftar
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="block text-center text-black font-medium mb-2 hover:underline py-2 border-b border-gray-200"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Edit Profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-[#B80002] text-white py-2 rounded-lg hover:bg-[#a00002] transition mt-2"
                      >
                        Logout
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
