import { Link } from "react-router-dom";
import educator from "../../assets/undraw_personal-information_h7kf.svg";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4"
    style={{ backgroundColor: '#FFF5CC' }}>
      <div className="bg-white shadow-2xl rounded-2xl flex overflow-hidden w-full max-w-5xl h-[654px]">
        
        {/* Bagian Kiri */}
        <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center p-8">
          <img
            src={educator}
            alt="Educator"
            className="w-72 h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-white text-2xl font-semibold mt-6 text-center">
            Selamat Datang Kembali!
          </h2>
          <p className="text-white/80 text-sm mt-2 text-center px-4">
            Masuk ke akun Anda dan lanjutkan aktivitas Anda.
          </p>
        </div>

        {/* Bagian Kanan */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            Masuk
          </h2>

          <form className="space-y-5">
            {/* Input Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan password Anda"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-[#B80002] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#8F0002] active:scale-95 shadow-md transition"
            >
              Login
            </button>
          </form>

          {/* Tombol Login dengan Google */}
          <div className="mt-4">
            <button
              type="button"
              className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">
                Login dengan Google
              </span>
            </button>
          </div>

          {/* Garis pemisah */}
          <div className="my-6 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">Atau</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Link ke Register */}
          <p className="text-center text-gray-600">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
