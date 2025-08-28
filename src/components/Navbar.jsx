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
          <a href="/Kategori" className="text-black hover:text-white mx-2 font-semibold">Kategori</a>
          <a href="/Testimoni" className="text-black hover:text-white mx-2 font-semibold">Testimoni</a>
          <a href="/Blog" className="text-black hover:text-white mx-2 font-semibold">Blog</a>
          <a href="/Kontak" className="text-black hover:text-white mx-2 font-semibold">kontak</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;