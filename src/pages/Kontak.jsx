import { useState } from "react";
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

function Kontak() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: ""
    });
  };

  return (
    <>
      {/* Header Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <img
          src="src/assets/chicken1.jpg"
          alt="DeKremes Header"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Hubungi Kami
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            DeKremes & Crispy - Siap melayani kebutuhan catering dan acara spesial Anda
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#FFFFFF] py-16 px-6 md:px-20">
  <div className="max-w-7xl mx-auto">
    {/* Contact Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      
      {/* Left Column - Contact Info */}
     <div>
  {/* Judul Section */}
  <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#8B0000] via-[#FF6B00] to-[#FFD700] mb-6 drop-shadow-lg">
    CONTACT US
  </h2>

  {/* Deskripsi */}
  <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-8 max-w-lg font-medium">
    <span className="text-[#8B0000] font-bold">Ada pertanyaan?</span>  
    Jangan ragu untuk menghubungi kami melalui <span className="text-[#FF6B00] font-semibold">Telepon</span>,  
    <span className="text-[#25D366] font-semibold"> WhatsApp</span>,  
    <span className="text-[#1D4ED8] font-semibold"> Email</span>, atau isi formulir yang telah kami sediakan.  
    Tim kami siap membantu Anda dengan cepat dan ramah ✨
  </p>

        {/* Contact Info Card */}
        <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-xl hover:shadow-red-500/50 transition duration-500 hover:scale-105">
          <div className="bg-white rounded-2xl p-8 h-full transition duration-500 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-red-50">
            <h3 className="text-xl font-bold text-red-700 border-b border-gray-300 pb-4 mb-6">
              INFORMASI KONTAK
            </h3>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start group">
                <div className="bg-red-100 p-3 rounded-full mr-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaPhone className="text-red-600 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Telepon</p>
                  <p className="text-gray-600">+62 858-4698-6524</p>
                  <a 
                    href="tel:0909878765" 
                    className="text-red-600 text-sm mt-1 inline-block hover:underline"
                  >
                    Klik untuk menghubungi
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start group">
                <div className="bg-green-100 p-3 rounded-full mr-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaWhatsapp className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">WhatsApp</p>
                  <p className="text-gray-600">+62 858-4698-6524</p>
                  <a 
                    href="https://wa.me/+6285846986524" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 text-sm mt-1 inline-block hover:underline"
                  >
                    Kirim pesan WhatsApp
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start group">
                <div className="bg-blue-100 p-3 rounded-full mr-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaMapMarkerAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Alamat</p>
                  <p className="text-gray-600">Dekremes & Crispy Jl. Cikujang, Dayeuhluhur, Kec. Warudoyong, Kota Sukabumi, Jawa Barat 43134</p>
                  <a 
                    href="https://goo.gl/maps/..." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm mt-1 inline-block hover:underline"
                  >
                    Lihat di Google Maps
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start group">
                <div className="bg-yellow-100 p-3 rounded-full mr-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaEnvelope className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">DeKremes&Crispy@gmail.com</p>
                  <a 
                    href="mailto:DeKremes@enak.com" 
                    className="text-yellow-600 text-sm mt-1 inline-block hover:underline"
                  >
                    Kirim email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Contact Form */}
      <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-xl hover:shadow-red-500/50 transition duration-500 hover:scale-105">
        <div className="bg-white rounded-2xl p-8 h-full transition duration-500 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-red-50">
          <h2 className="text-2xl font-bold text-red-700 border-b border-gray-300 pb-4 mb-6">
            KIRIM PESAN
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  placeholder="Masukkan nomor telepon"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                placeholder="Masukkan alamat email"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Pesan Anda</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                placeholder="Tulis pesan Anda di sini..."
                required
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              KIRIM PESAN
            </button>
          </form>
        </div>
      </div>

    </div>

          {/* Google Maps Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-16">
          <h2 className="text-3xl font-bold text-red-700 text-center mb-8">
            LOKASI KAMI
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.0439235500066!2d106.92210466620436!3d-6.941067647751864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6849358a89774b%3A0x3b578822ab27e72a!2sDekremes%20%26%20Crispy!5e0!3m2!1sid!2sid!4v1757916530969!5m2!1sid!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dekremes & Crispy Location"
              className="rounded-lg"
            ></iframe>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              <strong>Alamat:</strong> Dekremes & Crispy
              Jl. Cikujang, Dayeuhluhur, Kec. Warudoyong, Kota Sukabumi, Jawa Barat 43134
            </p>
            <a
              href="https://www.google.com/maps/place/Dekremes+%26+Crispy/@-6.9410676,106.9221047,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-red-600 font-semibold hover:underline"
            >
              Buka di Google Maps
            </a>
          </div>
        </div>
          {/* Additional Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Telepon */}
            <div className="group relative rounded-2xl p-[2px] bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-xl hover:shadow-red-500/50 transition duration-500 hover:scale-105">
              <div className="bg-white rounded-2xl p-6 text-center h-full transition duration-500 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-red-50">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaPhone className="text-red-600 text-2xl animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Telepon</h3>
                <p className="text-gray-600">0909878765</p>
                <p className="text-gray-500 text-sm mt-2">Setiap hari, 08:00 - 20:00 WIB</p>
              </div>
            </div>
            {/* WhatsApp */}
            <div className="group relative rounded-2xl p-[2px] bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-xl hover:shadow-green-500/50 transition duration-500 hover:scale-105">
              <div className="bg-white rounded-2xl p-6 text-center h-full transition duration-500 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-green-50">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaWhatsapp className="text-green-600 text-2xl animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
                <p className="text-gray-600">0909878765</p>
                <p className="text-gray-500 text-sm mt-2">Respon cepat melalui WhatsApp</p>
              </div>
            </div>
            {/* Email */}
            <div className="group relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-xl hover:shadow-blue-500/50 transition duration-500 hover:scale-105">
              <div className="bg-white rounded-2xl p-6 text-center h-full transition duration-500 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <FaEnvelope className="text-blue-600 text-2xl animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">DeKremes@enak.com</p>
                <p className="text-gray-500 text-sm mt-2">Balasan dalam 1x24 jam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default Kontak;