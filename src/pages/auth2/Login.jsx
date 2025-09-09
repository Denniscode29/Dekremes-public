import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController";
import Swal from "sweetalert2";
import educator from "../../assets/undraw_personal-information_h7kf.svg";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = AuthController((state) => state.login);
  const error = AuthController((state) => state.error);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Login...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const success = await login(email, password);

      if (success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Login",
          text: "Selamat datang kembali",
        });

        navigate("/"); // pindah halaman di sini
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text:
          error ||
          err.response?.data?.message ||
          "Email atau password salah",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4 relative"
      style={{ backgroundColor: "#FFF5CC" }}
    >
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition"
      >
        <ArrowLeft size={20} /> Kembali
      </button>

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

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Input Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500"
                required
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500"
                required
                minLength={8} // ✅ disamakan dengan backend
              />
            </div>

            {/* Tampilkan Error */}
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

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