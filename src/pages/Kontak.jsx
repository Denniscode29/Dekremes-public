import { FaWhatsapp } from "react-icons/fa";

function kontak(){
    return (
        <>
      {/* spasi atas */}
      <div className="h-20"
        style={{ backgroundColor: '#FFF5CC' }}></div>
        <div>
      {/* kosong buat ngejarakin */}
    </div>

      <div className="bg-white">
       {/* Header Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <img
          src="src/assets/chicken1.jpg"
          alt="DeKremes Menu"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Kontak Kami
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Temukan berbagai pilihan menu terbaik dari DeKremes & Crispy 
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-12 px-6">
        {/* Kiri - Contact Info */}
        <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Phone */}
        <div className="relative group rounded-2xl p-[2px] bg-gradient-to-r from-red-600 via-red-400 to-red-600 shadow-lg hover:shadow-red-500/50 transition duration-500">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center h-full transition transform group-hover:-translate-y-2 group-hover:scale-105 duration-500">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-400 text-white text-3xl shadow-lg mb-4 transition group-hover:scale-110">
              📞
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Phone</h3>
            <p className="text-gray-700 text-sm mt-1">207-8767-452</p>
          </div>
        </div>

        {/* Whatsapp */}
        <div className="relative group rounded-2xl p-[2px] bg-gradient-to-r from-red-600 via-red-400 to-red-600 shadow-lg hover:shadow-red-500/50 transition duration-500">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center h-full transition transform group-hover:-translate-y-2 group-hover:scale-105 duration-500">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-400 text-white text-3xl shadow-lg mb-4 transition group-hover:scale-110">
              💬
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Whatsapp</h3>
            <p className="text-gray-700 text-sm mt-1">082-123-234-345</p>
          </div>
        </div>

        {/* Email */}
        <div className="relative group rounded-2xl p-[2px] bg-gradient-to-r from-red-600 via-red-400 to-red-600 shadow-lg hover:shadow-red-500/50 transition duration-500">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center h-full transition transform group-hover:-translate-y-2 group-hover:scale-105 duration-500">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-3xl shadow-lg mb-4 transition group-hover:scale-110">
              📧
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Email</h3>
            <p className="text-gray-700 text-sm mt-1">dekremes@yoursite.com</p>
          </div>
        </div>

        {/* Shop */}
        <div className="relative group rounded-2xl p-[2px] bg-gradient-to-r from-red-600 via-red-400 to-red-600 shadow-lg hover:shadow-red-500/50 transition duration-500">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center h-full transition transform group-hover:-translate-y-2 group-hover:scale-105 duration-500">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-400 text-white text-3xl shadow-lg mb-4 transition group-hover:scale-110">
              🏬
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Lokasi</h3>
            <p className="text-gray-700 text-sm mt-1">Jl. Bayangkhara No.1</p>
          </div>
        </div>
    </div>
          {/* Map */}
          <div className="mt-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.0705616656748!2d106.91946318476204!3d-6.942535838961612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6849358a89774b%3A0x3b578822ab27e72a!2sDekremes%20%26%20Crispy!5e0!3m2!1sid!2sid!4v1757835256781!5m2!1sid!2sid"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-md"
          ></iframe>
        </div>
            </div>

        {/* Kanan - Form (Versi Card Putih) */}
            <div
            className="bg-white border border-gray-200 rounded-2xl shadow-lg 
             w-full flex flex-col p-8 transform transition duration-500 
             hover:shadow-2xl hover:-translate-y-2 hover:border-red-400"
            >
          {/* Judul */}
          <h2
            className="text-2xl font-bold border-b border-gray-300 pb-2 mb-6 text-left transition-colors duration-300"
            style={{ color: '#C62828' }} // Merah lebih elegan
          >
            GET IN TOUCH
          </h2>

          {/* Form */}
          <form className="space-y-6 flex-1 flex flex-col justify-between">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded-md p-3 text-black bg-gray-50 
                            focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-300"
                  placeholder="enter your name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded-md p-3 text-black bg-gray-50 
                            focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-300"
                  placeholder="enter your number"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-400 rounded-md p-3 text-black bg-gray-50 
                          focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-300"
                placeholder="enter your email"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-900 mb-2">
                Your Message
              </label>
              <textarea
                className="w-full border border-gray-400 rounded-md p-3 text-black bg-gray-50 
                          focus:ring-2 focus:ring-red-400 focus:border-red-400 transition duration-300 h-40"
                placeholder="Write your message"
              ></textarea>
            </div>

            {/* Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full text-white py-3 rounded-md font-semibold transition-all duration-500 
                          bg-gradient-to-r from-red-600 to-red-700 
                          hover:from-red-700 hover:to-red-800 hover:shadow-lg"
              >
                SEND MESSAGE
              </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
    );
}
 export default kontak