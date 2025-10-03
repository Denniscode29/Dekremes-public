import { useState, useEffect } from "react";
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaStar, FaChevronDown } from "react-icons/fa";

function Kontak() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    message: ""
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Add margin top to account for fixed navbar
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Estimate navbar height - adjust this value based on your actual navbar height
    setNavbarHeight(70); // Typical navbar height in pixels
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategorySelect = (value) => {
    setFormData({
      ...formData,
      category: value
    });
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      category: "",
      message: ""
    });
  };

  const categories = [
    { value: "pujian", label: "Pujian", icon: "⭐", color: "from-green-500 to-green-600" },
    { value: "keluhan", label: "Keluhan", icon: "😔", color: "from-red-500 to-red-600" },
    { value: "pertanyaan", label: "Pertanyaan", icon: "❓", color: "from-blue-500 to-blue-600" },
    { value: "saran", label: "Saran", icon: "💡", color: "from-purple-500 to-purple-600" },
    { value: "komentar", label: "Komentar", icon: "💬", color: "from-indigo-500 to-indigo-600" },
    { value: "kerjasama", label: "Kerjasama", icon: "🤝", color: "from-amber-500 to-amber-600" },
    { value: "catering", label: "Pemesanan Catering", icon: "🍽️", color: "from-orange-500 to-orange-600" }
  ];

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <>
      {/* Fixed spacer untuk navbar - DIUBAH: background menjadi putih */}
      <div 
        style={{ height: `${navbarHeight}px` }} 
        className="w-full bg-white" // DIUBAH: menambahkan bg-white untuk mengubah warna gelap menjadi putih
      ></div>

      {/* Luxury Hero Section - Adjusted for navbar */}
      <div 
        className="relative flex items-center justify-center overflow-hidden bg-gray-900"
        style={{ 
          height: `calc(70vh - ${navbarHeight}px)`,
          minHeight: `calc(600px - ${navbarHeight}px)`
        }}
      >
        <div className="absolute inset-0">
          <img
            src="src/assets/chicken1.jpg"
            alt="DeKremes Header"
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        {/* Animated Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-amber-400 opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-amber-400 opacity-60 animate-pulse"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="mb-8">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-600 mx-auto mb-6 animate-pulse"></div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-down">
              Hubungi <span className="text-amber-400">Kami</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-amber-400 mx-auto mt-6 animate-pulse"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Sambut <span className="text-amber-400 font-semibold">kenikmatan crispy</span> dalam setiap acara spesial Anda
          </p>
        </div>
      </div>

      {/* Luxury Main Content */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          {/* Premium Contact Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 mb-20">
            
            {/* Left Column - Luxury Contact Info */}
            <div className="space-y-6">
              {/* Premium Header */}
              <div className="text-left">
                <div className="inline-flex items-center space-x-3 mb-4">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"></div>
                  <span className="text-sm font-semibold text-red-600 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full border border-red-200">
                    Get In Touch
                  </span>
                  <div className="w-8 h-0.5 bg-gradient-to-l from-amber-400 to-red-600"></div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                  Mari Berkolaborasi <span className="text-amber-500">Bersama</span>
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Tim profesional kami siap membantu mewujudkan acara spesial Anda dengan 
                  sentuhan kuliner yang tak terlupakan. Hubungi kami untuk konsultasi gratis.
                </p>
              </div>

              {/* Luxury Contact Cards */}
              <div className="space-y-4">
                {/* WhatsApp - Premium Card */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-green-100 group-hover:scale-[1.02] transition-all duration-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                          <FaWhatsapp className="text-white text-2xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">WhatsApp Priority</h3>
                        <p className="text-green-600 font-semibold text-lg mb-1">+62 858-4698-6524</p>
                        <p className="text-gray-500 text-sm">Respon instan - 24/7</p>
                        <a 
                          href="https://wa.me/+6285846986524" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-green-600 font-semibold text-sm hover:underline"
                        >
                          Mulai Percakapan →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone - Premium Card */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-red-100 group-hover:scale-[1.02] transition-all duration-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                          <FaPhone className="text-white text-2xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Telepon Eksklusif</h3>
                        <p className="text-red-600 font-semibold text-lg mb-1">+62 858-4698-6524</p>
                        <p className="text-gray-500 text-sm">08:00 - 20:00 WIB</p>
                        <a 
                          href="tel:+6285846986524" 
                          className="inline-block mt-2 text-red-600 font-semibold text-sm hover:underline"
                        >
                          Panggil Sekarang →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email - Premium Card */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-amber-100 group-hover:scale-[1.02] transition-all duration-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                          <FaEnvelope className="text-white text-2xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Email Premium</h3>
                        <p className="text-amber-600 font-semibold text-lg mb-1">DeKremes&Crispy@gmail.com</p>
                        <p className="text-gray-500 text-sm">Balasan dalam 1x24 jam</p>
                        <a 
                          href="mailto:DeKremes&Crispy@gmail.com" 
                          className="inline-block mt-2 text-amber-600 font-semibold text-sm hover:underline"
                        >
                          Kirim Email →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Luxury Contact Form */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-red-500 rounded-3xl blur-lg opacity-20 animate-glow"></div>
              <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-amber-100 h-full flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Konsultasi <span className="text-amber-500">Eksklusif</span>
                  </h2>
                  <p className="text-gray-600">Isi formulir untuk konsultasi menu dan penawaran spesial</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                  {/* Name + Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:shadow-lg"
                        placeholder="Nama Anda"
                        required
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:shadow-lg"
                        placeholder="+62 xxx xxxx xxxx"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:shadow-lg"
                      placeholder="email@domain.com"
                      required
                    />
                  </div>

                  {/* Custom Dropdown */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori Pesan</label>
                    <div className="relative">
                      {/* Dropdown Trigger */}
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full border border-gray-200 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:shadow-lg bg-white text-left flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          {selectedCategory ? (
                            <>
                              <span className="text-xl">{selectedCategory.icon}</span>
                              <span className="font-medium">{selectedCategory.label}</span>
                            </>
                          ) : (
                            <span className="text-gray-500">Pilih kategori pesan...</span>
                          )}
                        </div>
                        <FaChevronDown 
                          className={`text-gray-400 transition-transform duration-300 ${
                            isDropdownOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-dropdown-fade">
                          <div className="max-h-60 overflow-y-auto">
                            {categories.map((category) => (
                              <button
                                key={category.value}
                                type="button"
                                onClick={() => handleCategorySelect(category.value)}
                                className={`w-full p-4 text-left hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3 border-b border-gray-100 last:border-b-0 group ${
                                  formData.category === category.value ? 'bg-amber-50 border-amber-200' : ''
                                }`}
                              >
                                <span className="text-xl">{category.icon}</span>
                                <span className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors">
                                  {category.label}
                                </span>
                                {formData.category === category.value && (
                                  <div className="ml-auto w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="group flex-1 flex flex-col">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan Spesial</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full border border-gray-200 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 group-hover:shadow-lg resize-none flex-1"
                      placeholder="Ceritakan kebutuhan acara spesial Anda..."
                      required
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:from-amber-600 hover:to-amber-700"
                    >
                      KIRIM PERMOHONAN KONSULTASI
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Luxury Location Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"></div>
                <span className="text-sm font-semibold text-red-600 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full border border-red-200">
                  Visit Us
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-amber-400 to-red-600"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Lokasi <span className="text-amber-500">Eksklusif</span> Kami
              </h2>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-3xl group hover:shadow-4xl transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Map */}
                <div className="lg:col-span-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.0439235500066!2d106.92210466620436!3d-6.941067647751864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6849358a89774b%3A0x3b578822ab27e72a!2sDekremes%20%26%20Crispy!5e0!3m2!1sid!2sid!4v1757916530969!5m2!1sid!2sid"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dekremes & Crispy Location"
                    className="group-hover:scale-105 transition-transform duration-700"
                  ></iframe>
                </div>
                
                {/* Address Info */}
                <div className="bg-gradient-to-br from-gray-900 to-red-900 text-white p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
                      <FaMapMarkerAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Alamat Kami</h3>
                      <p className="text-amber-200 text-sm">Kunjungi outlet utama kami</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-300 text-sm mb-1">Alamat Lengkap</p>
                      <p className="font-semibold">Jl. Cikujang, Dayeuhluhur, Kec. Warudoyong</p>
                      <p className="font-semibold">Kota Sukabumi, Jawa Barat 43134</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-300 text-sm mb-1">Jam Operasional</p>
                      <div className="flex items-center space-x-2">
                        <FaClock className="text-amber-400" />
                        <p className="font-semibold">Setiap Hari: 08:00 - 20:00 WIB</p>
                      </div>
                    </div>
                    
                    <a
                      href="https://www.google.com/maps/place/Dekremes+%26+Crispy/@-6.9410676,106.9221047,17z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 mt-4"
                    >
                      <FaMapMarkerAlt />
                      <span>Buka di Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Service Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: FaStar,
                title: "Kualitas Premium",
                description: "Bahan terbaik dengan standar kualitas tertinggi",
                gradient: "from-amber-500 to-amber-600"
              },
              {
                icon: FaClock,
                title: "Respon Cepat",
                description: "Balasan dalam 15 menit melalui WhatsApp",
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: FaEnvelope,
                title: "Konsultasi Gratis",
                description: "Konsultasi menu dan kebutuhan acara Anda",
                gradient: "from-red-500 to-red-600"
              }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500`}></div>
                <div className="relative bg-white rounded-2xl p-6 text-center shadow-xl border border-gray-100 group-hover:scale-105 transition-all duration-500">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          }
          .shadow-4xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.6);
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes glow {
            0%, 100% {
              opacity: 0.2;
            }
            50% {
              opacity: 0.3;
            }
          }

          @keyframes dropdownFade {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-down {
            animation: fadeInDown 1s ease-out;
          }

          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out;
          }

          .animate-glow {
            animation: glow 3s ease-in-out infinite;
          }

          .animate-dropdown-fade {
            animation: dropdownFade 0.2s ease-out;
          }

          /* Custom scrollbar for dropdown */
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}
      </style>
    </>
  );
}

export default Kontak;