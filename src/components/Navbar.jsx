import { Link } from "react-router-dom";
import { useState } from "react";
import defaultProfile from "../assets/default-profile.png";

function Navbar(props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="shadow-lg" style={{ backgroundColor: '#FFF5CC' }}>
      <div className="flex justify-between items-center py-4 px-40">
        {/* Logo atau Judul */}
        <div className="font-bold text-gray-800 text-xl">
          {props.title}
        </div>

        {/* Menu Utama */}
        <div className="flex items-center space-x-6">
          {["Beranda", "Tentang", "Blog", "Menu", "Kontak", "Testimoni"].map((item) => (
            <a
              key={item}
              href={item === "Beranda" ? "/" : `/${item}`}
              className="relative text-black font-semibold transition duration-300 group"
            >
              {item}
              {/* Hover underline */}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#B80002] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Tombol Login & Daftar + Profil */}
        <div className="flex items-center space-x-4 ml-8 relative">
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

          {/* Profil Avatar - dengan margin lebih ke kanan */}
          <div className="relative ml-10">
            <img
              src={defaultProfile}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4">
                  <p className="text-gray-800 font-medium mb-2">Halo, Tamu</p>
                  <Link
                    to="/login"
                    className="block text-center bg-[#B80002] text-white px-4 py-2 rounded-lg hover:bg-[#a00002] transition"
                  >
                    Login
                  </Link>
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
