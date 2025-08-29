import { Link } from "react-router-dom";

function Navbar(props) {
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

        {/* Tombol Login & Daftar */}
        <div className="flex items-center space-x-4 ml-8">
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
</div>

      </div>
    </nav>
  );
}

export default Navbar;
