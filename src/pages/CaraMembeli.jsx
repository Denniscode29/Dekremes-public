import { Link } from "react-router-dom";

function CaraMembeli() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Tombol Kembali */}
      <div className="mb-8">
        <Link
          to="/"
          className="text-yellow-600 hover:text-yellow-700 font-semibold"
        >
          ← Kembali
        </Link>
      </div>

      {/* Judul */}
      <h1 className="text-3xl font-bold mb-12 text-center text-yellow-600">
        Cara Membeli di DeKremes&Crispy
      </h1>

      {/* Step Container */}
      <div className="space-y-10">
        {/* Step 1 */}
        <div className="flex items-start space-x-5">
          <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white flex items-center justify-center rounded-full font-bold shadow-md">
            1
          </div>
          <div>
            <h2 className="text-xl font-semibold">Masuk ke Website</h2>
            <p className="text-gray-600 mt-1">
              Buka website resmi <span className="font-medium">DeKremes&Crispy</span> melalui
              browser di HP atau komputer kamu.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start space-x-5">
          <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white flex items-center justify-center rounded-full font-bold shadow-md">
            2
          </div>
          <div>
            <h2 className="text-xl font-semibold">Buka Halaman Menu</h2>
            <p className="text-gray-600 mt-1">
              Pilih menu favoritmu dari daftar menu yang tersedia di website kami.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start space-x-5">
          <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white flex items-center justify-center rounded-full font-bold shadow-md">
            3
          </div>
          <div>
            <h2 className="text-xl font-semibold">Pesan lewat GoJek</h2>
            <p className="text-gray-600 mt-1">
              Klik tombol <span className="font-medium">“Pesan via GoJek”</span> untuk melanjutkan pesanan
              melalui aplikasi GoFood.
            </p>
          </div>
        </div>
      </div>

      {/* Tombol GoJek */}
      <div className="mt-14 flex justify-center">
        <a
          href="https://gofood.co.id"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-green-700 transition"
        >
          Pesan via GoJek
        </a>
      </div>
    </div>
  );
}

export default CaraMembeli;
