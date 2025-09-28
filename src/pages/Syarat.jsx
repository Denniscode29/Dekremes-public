// pages/Syarat.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Syarat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed md:absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg text-gray-700 hover:text-blue-600 font-medium transition-all hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Kembali</span>
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Harap baca dengan seksama syarat dan ketentuan penggunaan website
            kami
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {[
            {
              number: "1",
              title: "Umum",
              content:
                "Dengan mengakses dan menggunakan website ini, Anda dianggap telah membaca, memahami, dan menyetujui semua syarat dan ketentuan yang berlaku. Website ini dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.",
              icon: "📋",
            },
            {
              number: "2",
              title: "Pemesanan & Pembayaran",
              content:
                "Seluruh pemesanan akan diarahkan ke platform Gojek. Proses pembayaran dan pengantaran mengikuti ketentuan serta layanan yang berlaku di aplikasi Gojek. Kami tidak bertanggung jawab atas kendala teknis atau kesalahan transaksi yang terjadi di luar sistem website ini.",
              icon: "💳",
            },
            {
              number: "3",
              title: "Testimoni",
              content:
                "Pengguna dapat memberikan testimoni melalui website ini. Testimoni yang dikirim wajib menggunakan bahasa yang sopan, tidak mengandung unsur SARA, pornografi, atau konten yang merugikan pihak lain. Admin berhak untuk menyetujui, menolak, atau menghapus testimoni tanpa pemberitahuan terlebih dahulu.",
              icon: "⭐",
            },
            {
              number: "4",
              title: "Hak Cipta & Konten",
              content:
                "Seluruh konten pada website ini dilindungi oleh hak cipta. Dilarang menyalin, menyebarkan, atau menggunakan konten tanpa izin tertulis dari pemilik website.",
              icon: "©️",
            },
            {
              number: "5",
              title: "Perubahan Syarat",
              content:
                "Kami berhak mengubah syarat & ketentuan ini kapan saja. Perubahan akan berlaku setelah dipublikasikan di halaman ini. Pengguna dianjurkan untuk meninjau syarat & ketentuan secara berkala.",
              icon: "🔄",
            },
          ].map((item, index) => (
            <section
              key={index}
              className="flex gap-6 p-6 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
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

          {/* Footer */}
          <div className="pt-8 mt-8 border-t border-gray-200 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-blue-600 font-medium">
                Terakhir diperbarui: September 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syarat;
