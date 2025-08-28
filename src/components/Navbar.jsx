function Navbar(props) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="flex justify-between py-4 px-40">
        <div className="font-bold text-gray-800 text-xl">
          {props.title}
        </div>
        <div className="space-x-4">
          <a href="#" className="text-black hover:text-white mx-2">Beranda</a>
          <a href="#" className="text-black hover:text-white mx-2">Tentang</a>
          <a href="#" className="text-black hover:text-white mx-2">Kategori</a>
          <a href="#" className="text-black hover:text-white mx-2">Testimoni</a>
          <a href="#" className="text-black hover:text-white mx-2">Blog</a>
          <a href="#" className="text-black hover:text-white mx-2">kontak</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;