import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white px-10 py-16 min-h-[350px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Left Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">DeKremes&Crispy</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            Nikmati sensasi renyah dan gurih khas DeKremes&Crispy. Kami hadir
            untuk memberikan pengalaman rasa terbaik dengan bahan pilihan dan
            kualitas terjamin.
          </p>
        </div>

        {/* About */}
        <div>
          <h4 className="text-white font-semibold mb-4">Tentang Kami</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/tentang" className="hover:text-white">Tentang</Link></li>
            <li><Link to="/kontak" className="hover:text-white">Kontak</Link></li>
            <li><Link to="/" className="hover:text-white">Beranda</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Layanan</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/CaraMembeli" className="hover:text-white">Cara Membeli</Link></li>
            <li><Link to="/Menu" className="hover:text-white">Produk Kami</Link></li>
            <li><Link to="/Testimoni" className="hover:text-white">Testimoni</Link></li>
          </ul>
        </div>

        {/* Other */}
        <div>
          <h4 className="text-white font-semibold mb-4">Lainnya</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/kontak" className="hover:text-white">Kontak Kami</Link></li>
            <li><Link to="/Syarat" className="hover:text-white">Syarat & Ketentuan</Link></li>
            <li><Link to="/Kebijakan" className="hover:text-white">Kebijakan Privasi</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
