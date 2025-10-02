import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaFacebookF, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialMedia = [
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/dekremescrispychicken?igsh=MWFhZHI3ZTh5eHQzcg==",
      color: "hover:text-pink-500",
      bgColor: "hover:bg-pink-500"
    },
    {
      icon: FaTiktok,
      url: "https://www.tiktok.com/@dekremescrispy2?_t=ZS-90BnD3Kipb5&_r=1",
      color: "hover:text-black",
      bgColor: "hover:bg-black"
    },
    {
      icon: FaFacebookF,
      url: "https://www.facebook.com/share/16QKQcf2v4/",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-600"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Section - Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img 
                  src="/logoD&C.png" // Sekarang menggunakan path dari public
                  alt="DeKremes & Crispy Logo" 
                  className="w-16 h-16 rounded-2xl object-cover shadow-2xl"
                />
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    DeKremes&Crispy
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Renyah & Gurih Terbaik</p>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-300 max-w-md">
                Nikmati sensasi renyah dan gurih khas DeKremes&Crispy. Kami hadir
                untuk memberikan pengalaman rasa terbaik dengan bahan pilihan dan
                kualitas terjamin.
              </p>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Ikuti Kami</h4>
                <div className="flex space-x-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-2xl ${social.bgColor} hover:border-0`}
                    >
                      <social.icon className={`w-5 h-5 text-gray-400 transition-colors duration-300 ${social.color}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Tentang Kami
                </h4>
                <ul className="space-y-3">
                  {[
                    { to: "/tentang", label: "Tentang" },
                    { to: "/kontak", label: "Kontak" },
                    { to: "/", label: "Beranda" }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.to} 
                        className="text-gray-300 hover:text-yellow-400 transition-all duration-300 flex items-center group text-sm"
                      >
                        <FaArrowRight className="w-3 h-3 mr-2 transform group-hover:translate-x-1 transition-transform" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  Layanan
                </h4>
                <ul className="space-y-3">
                  {[
                    { to: "/CaraMembeli", label: "Cara Membeli" },
                    { to: "/Menu", label: "Produk Kami" },
                    { to: "/Testimoni", label: "Testimoni" }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.to} 
                        className="text-gray-300 hover:text-orange-400 transition-all duration-300 flex items-center group text-sm"
                      >
                        <FaArrowRight className="w-3 h-3 mr-2 transform group-hover:translate-x-1 transition-transform" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg flex items-center">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                  Lainnya
                </h4>
                <ul className="space-y-3">
                  {[
                    { to: "/kontak", label: "Kontak Kami" },
                    { to: "/Syarat", label: "Syarat & Ketentuan" },
                    { to: "/Kebijakan", label: "Kebijakan Privasi" }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.to} 
                        className="text-gray-300 hover:text-red-400 transition-all duration-300 flex items-center group text-sm"
                      >
                        <FaArrowRight className="w-3 h-3 mr-2 transform group-hover:translate-x-1 transition-transform" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 text-gray-300">
                <FaMapMarkerAlt className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Jl. Cikujang, Dayeuhluhur, Kec. Warudoyong Kota Sukabumi, Jawa Barat 43134</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3 text-gray-300">
                <FaPhone className="w-5 h-5 text-orange-400" />
                <span className="text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3 text-gray-300">
                <FaEnvelope className="w-5 h-5 text-red-400" />
                <span className="text-sm">info@dekremescrispy.com</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} DeKremes&Crispy. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <span>Made with ❤️ for food lovers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/10 rounded-full -translate-x-16 translate-y-16"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-400/10 rounded-full translate-x-12 -translate-y-12"></div>
    </footer>
  );
}

export default Footer;