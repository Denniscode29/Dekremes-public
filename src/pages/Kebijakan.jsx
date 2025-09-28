// src/pages/Kebijakan.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Kebijakan() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 relative">
      {/* Tombol Kembali di Atas Kiri */}
      <button
        onClick={() => navigate(-1)}
        className="fixed md:absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg text-gray-700 hover:text-blue-600 font-medium transition-all hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Kembali</span>
      </button>

      <div className="max-w-4xl mx-auto mt-12">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana
            informasi Anda dikumpulkan, digunakan, dan dilindungi di website
            kami.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {[
            {
              number: "1",
              title: "Informasi yang Kami Kumpulkan",
              content:
                "Kami dapat mengumpulkan informasi seperti nama, email, nomor telepon, serta data yang Anda masukkan saat melakukan pemesanan melalui Gojek atau menulis testimoni di website.",
              icon: "📥",
            },
            {
              number: "2",
              title: "Penggunaan Informasi",
              content:
                "Informasi digunakan untuk memproses pesanan, menjaga keamanan layanan, serta menampilkan testimoni dengan persetujuan Anda.",
              icon: "⚙️",
            },
            {
              number: "3",
              title: "Keamanan Data",
              content:
                "Kami berusaha melindungi data Anda dengan langkah keamanan yang wajar, namun tidak dapat menjamin sepenuhnya keamanan data yang dikirim melalui internet.",
              icon: "🔒",
            },
            {
              number: "4",
              title: "Testimoni Pengguna",
              content:
                "Testimoni yang Anda tulis dapat ditampilkan di website sebagai referensi bagi pengguna lain. Kami berhak menyunting atau menghapus testimoni yang dianggap tidak pantas.",
              icon: "⭐",
            },
            {
              number: "5",
              title: "Perubahan Kebijakan",
              content:
                "Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan akan diumumkan di halaman ini agar Anda selalu mengetahui bagaimana privasi Anda dijaga.",
              icon: "🔄",
            },
            {
              number: "6",
              title: "Kontak Kami",
              content:
                "Jika ada pertanyaan terkait Kebijakan Privasi ini, silakan hubungi kami melalui email resmi yang tercantum di website.",
              icon: "📧",
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
                Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
