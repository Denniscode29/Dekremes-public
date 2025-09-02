import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/default-profile.png";

function Navbar({ title }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  
  // Mengambil state dari AuthController
  const isLoggedIn = AuthController((state) => state.isLoggedIn);
  const user = AuthController((state) => state.user);
  const logout = AuthController((state) => state.logout);
  // Hapus line berikut jika tidak digunakan:
  // const error = AuthController((state) => state.error);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/");
  };

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="shadow-lg bg-[#FFF5CC]">
      <div className="flex justify-between items-center py-4 px-4 md:px-40">
        {/* Logo atau Judul */}
        <div className="font-bold text-gray-800 text-xl">{title}</div>

        {/* Menu Utama */}
        <div className="flex items-center space-x-6">
          {["Beranda", "Tentang", "Blog", "Menu", "Kontak", "Testimoni"].map((item) => (
            <Link
              key={item}
              to={item === "Beranda" ? "/" : `/${item.toLowerCase()}`}
              className="relative text-black font-semibold transition duration-300 group"
            >
              {item}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#B80002] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Tombol Login & Daftar + Profil */}
        <div className="flex items-center space-x-4 ml-8 relative">
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="text-center bg-[#B80002] text-white px-4 py-2 rounded-lg hover:bg-[#a00002] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-center bg-[#B80002] text-white px-4 py-2 rounded-lg hover:bg-[#a00002] transition"
              >
                Daftar
              </Link>
            </>
          )}

          {/* Profil Avatar - selalu tampilkan, tapi dengan kondisi berbeda */}
          <div className="relative ml-10" ref={menuRef}>
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
                        className="block text-center bg-[#B80002] text-white px-4 py-2 rounded-lg hover:bg-[#a00002] transition mb-2"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
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
                        className="w-full bg-[#B80002] text-white px-4 py-2 rounded-lg hover:bg-[#a00002] transition mt-2"
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