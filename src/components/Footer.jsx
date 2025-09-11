
 function Footer() {
  return (
   <footer className="bg-black text-white px-10 py-16 min-h-[350px]">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
    {/* Left Section */}
    <div>
      <h3 className="text-lg font-semibold mb-4">DeKremes&Crispy</h3>
      <p className="text-sm leading-relaxed text-gray-300">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
        dignissim nunc, id maximus ex. Etiam nec dignissim elit, at dignissim
        enim.
      </p>
    </div>

    {/* About */}
    <div>
      <h4 className="text-white font-semibold mb-4">Tentang Kami</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#" className="hover:text-white">Tentang</a></li>
        <li><a href="#" className="hover:text-white">Kontak</a></li>
        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
      </ul>
    </div>

    {/* Services */}
    <div>
      <h4 className="text-white font-semibold mb-4">Layanan</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#" className="hover:text-white">Cara Membeli</a></li>
        <li><a href="#" className="hover:text-white">Produk Kami</a></li>
        <li><a href="#" className="hover:text-white">Promo</a></li>
      </ul>
    </div>

    {/* Other */}
    <div>
      <h4 className="text-white font-semibold mb-4">Lainnya</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#" className="hover:text-white">Kontak Kami</a></li>
        <li><a href="#" className="hover:text-white">Bantuan</a></li> 
      </ul>
    </div>
  </div>
</footer>

  );
}
export default Footer;