  // import { useState } from "react";
  import { Link } from "react-router-dom";


function Navbar(props) {
  return (
    <nav className="shadow-lg" style={{ backgroundColor: '#FFF5CC' }}>
      <div className="flex justify-between py-4 px-40">
        <div className="font-bold text-gray-800 text-xl">
          {props.title}
        </div>
        <div className="space-x-4">
          <a href="/" className="text-black hover:text-white mx-2 font-semibold">Beranda</a>
          <a href="/About" className="text-black hover:text-white mx-2 font-semibold">Tentang</a>
          <a href="/Blog" className="text-black hover:text-white mx-2 font-semibold">Blog</a>
          <a href="/Menu" className="text-black hover:text-white mx-2 font-semibold">Menu</a>
          <a href="/Kontak" className="text-black hover:text-white mx-2 font-semibold">kontak</a>
          <a href="/Testimoni" className="text-black hover:text-white mx-2 font-semibold">Testimoni</a>
          <Link
              to="/login"
              className="flex-1 text-center bg-yellow-400 text-white px-4 py-2 rounded-sm hover:bg-yellow-500 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 mt-4 text-center bg-gray-600 text-white px-4 py-2 rounded-sm hover:bg-gray-700 transition"
            >
              Daftar
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;