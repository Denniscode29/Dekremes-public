function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between py-4 px-40">
        <div className="text-white font-bold text-xl">MyApp</div>
        <div>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Beranda</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Tentang</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Kategori</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Testimoni</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Blog</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">kontak</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;