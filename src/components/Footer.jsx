import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaFacebookF, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight, FaStar, FaUtensils, FaShippingFast, FaAward } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialMedia = [
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/dekremescrispychicken?igsh=MWFhZHI3ZTh5eHQzcg==",
      color: "hover:text-pink-500",
      bgColor: "hover:bg-pink-500",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: FaTiktok,
      url: "https://www.tiktok.com/@dekremescrispy2?_t=ZS-90BnD3Kipb5&_r=1",
      color: "hover:text-black",
      bgColor: "hover:bg-black",
      gradient: "from-gray-800 to-black"
    },
    {
      icon: FaFacebookF,
      url: "https://www.facebook.com/share/16QKQcf2v4/",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-600",
      gradient: "from-blue-600 to-blue-800"
    }
  ];

  const features = [
    {
      icon: FaAward,
      title: "Kualitas Premium",
      description: "Bahan terbaik dengan standar tertinggi",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: FaShippingFast,
      title: "Pengiriman Cepat",
      description: "Pesanan sampai tepat waktu",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FaUtensils,
      title: "Rasa Autentik",
      description: "Resep turun temurun yang terjaga",
      color: "from-red-500 to-red-600"
    },
    {
      icon: FaStar,
      title: "Terpercaya",
      description: "Ribuan pelanggan puas",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500`}></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 group-hover:scale-105 transition-all duration-500">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Section - Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-red-500 rounded-3xl blur opacity-30 animate-glow"></div>
                  <img 
                    src="/logoD&C.png"
                    alt="DeKremes & Crispy Logo" 
                    className="relative w-20 h-20 rounded-2xl object-cover shadow-2xl border-2 border-amber-400/20"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    DeKremes&Crispy
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 font-semibold">Renyah & Gurih Terbaik Sejak Awal</p>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-300 max-w-md">
                Menghadirkan pengalaman kuliner crispy yang tak terlupakan dengan bahan premium 
                dan resep autentik. Setiap gigitan adalah cerita kenikmatan yang sesungguhnya.
              </p>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-red-500 rounded-full mr-3 animate-pulse"></div>
                  Terhubung Dengan Kami
                </h4>
                <div className="flex space-x-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative overflow-hidden w-14 h-14 bg-gray-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 hover:shadow-2xl border border-gray-700/50`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      <social.icon className={`relative z-10 w-6 h-6 text-gray-400 transition-colors duration-300 group-hover:text-white`} />
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-all duration-500"></div>
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
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
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
                        className="text-gray-300 hover:text-amber-400 transition-all duration-300 flex items-center group text-sm py-2"
                      >
                        <div className="w-1 h-1 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <FaArrowRight className="w-3 h-3 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
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
                    { to: "/menu", label: "Menu Spesial" },
                    { to: "/Testimoni", label: "Testimoni" }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.to} 
                        className="text-gray-300 hover:text-orange-400 transition-all duration-300 flex items-center group text-sm py-2"
                      >
                        <div className="w-1 h-1 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <FaArrowRight className="w-3 h-3 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
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
                        className="text-gray-300 hover:text-red-400 transition-all duration-300 flex items-center group text-sm py-2"
                      >
                        <div className="w-1 h-1 bg-red-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <FaArrowRight className="w-3 h-3 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="border-t border-gray-700/50 pt-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Location */}
              <div className="group text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Lokasi Kami</h4>
                    <p className="text-gray-400 text-sm">Kunjungi outlet utama</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Jl. Cikujang, Dayeuhluhur, Kec. Warudoyong<br />
                  Kota Sukabumi, Jawa Barat 43134
                </p>
              </div>

              {/* Phone */}
              <div className="group text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Telepon</h4>
                    <p className="text-gray-400 text-sm">08:00 - 20:00 WIB</p>
                  </div>
                </div>
                <a href="tel:+6287788148113" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-lg font-semibold">
                  +62 877-8814-8113
                </a>
              </div>

              {/* Email */}
              <div className="group text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Email</h4>
                    <p className="text-gray-400 text-sm">Balasan dalam 24 jam</p>
                  </div>
                </div>
                <a href="mailto:dekremescrispychicken@gmail.com" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-lg font-semibold">
                  dekremescrispychicken@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} <span className="text-amber-400 font-semibold">DeKremes&Crispy</span>. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online 24/7</span>
                </span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span>Made with ❤️ for crispy lovers</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/30 animate-pulse"></div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-400/30 animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-orange-400/30 animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/30 animate-pulse"></div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          @keyframes glow {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.5;
            }
          }
          .animate-glow {
            animation: glow 3s ease-in-out infinite;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;