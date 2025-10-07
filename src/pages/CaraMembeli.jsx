import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CaraMembeli() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-100 py-8 px-4 relative">
      {/* Tombol Kembali di Atas Kiri */}
      <button
        onClick={() => navigate(-1)}
        className="fixed md:absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg text-gray-700 hover:text-amber-600 font-medium transition-all hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Kembali</span>
      </button>

      <div className="max-w-4xl mx-auto mt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Cara Membeli
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Panduan lengkap untuk memesan menu favorit Anda dari DeKremes & Crispy 
            dengan mudah melalui GrabFood
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {[
            {
              number: "1",
              title: "Buka Website Kami",
              content: "Akses website resmi DeKremes & Crispy melalui browser di smartphone atau komputer Anda. Jelajahi berbagai menu menarik yang kami tawarkan.",
              icon: "🌐",
            },
            {
              number: "2",
              title: "Pilih Menu Favorit",
              content: "Telusuri halaman menu kami dan pilih menu favorit Anda. Kami memiliki berbagai pilihan dari American Taste hingga Indonesian Taste yang siap memanjakan lidah Anda.",
              icon: "📱",
            },
            {
              number: "3",
              title: "Pesan via GrabFood",
              content: "Klik tombol 'Pesan via Grab' yang tersedia di setiap menu. Anda akan diarahkan ke aplikasi GrabFood untuk menyelesaikan pemesanan.",
              icon: "🛵",
            },
            {
              number: "4",
              title: "Proses Pembayaran",
              content: "Lakukan pembayaran melalui metode yang tersedia di GrabFood. Kami menerima berbagai metode pembayaran seperti GoPay, OVO, Dana, kartu kredit, atau tunai.",
              icon: "💳",
            },
            {
              number: "5",
              title: "Tunggu Pesanan",
              content: "Tunggu pesanan Anda diproses dan dikirim oleh driver Grab. Anda dapat melacak pesanan secara real-time melalui aplikasi GrabFood.",
              icon: "⏱️",
            },
            {
              number: "6",
              title: "Nikmati Pesanan",
              content: "Pesanan Anda akan tiba di lokasi dengan kondisi terbaik. Nikmati kelezatan DeKremes & Crispy dan jangan lupa beri rating di aplikasi GrabFood!",
              icon: "🍗",
            },
          ].map((item, index) => (
            <section
              key={index}
              className="flex gap-6 p-6 rounded-xl border border-gray-100 hover:border-amber-200 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-lg">
                  {item.number}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </section>
          ))}

          {/* CTA Section */}
          <div className="pt-8 mt-8 border-t border-gray-200 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Siap Menikmati Kelezatan Kami?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Pesan sekarang melalui GrabFood dan rasakan kenikmatan ayam crispy 
                terbaik dari DeKremes & Crispy dengan pelayanan tercepat
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <a 
                href="https://r.grab.com/g/2-1-6-C7NZGJUDJ36HAX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center space-x-3"
              >
                <span>🛵</span>
                <span>Pesan via GrabFood</span>
              </a>
              
              <button
                onClick={() => navigate('/menu')}
                className="group bg-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center space-x-3"
              >
                <span>📋</span>
                <span>Lihat Menu Lengkap</span>
              </button>
            </div>

            {/* Info Tambahan */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">08:00 - 20:00 WIB</p>
                  <p className="text-xs text-gray-500">Setiap Hari</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Sukabumi & Sekitarnya</p>
                  <p className="text-xs text-gray-500">Area Pengiriman</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Pembayaran Aman</p>
                  <p className="text-xs text-gray-500">Tunai & Digital</p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                Butuh bantuan dalam pemesanan?
              </p>
              <a 
                href="https://wa.me/+6285846986524" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
              >
                <span>💬</span>
                <span>Hubungi WhatsApp Kami</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}