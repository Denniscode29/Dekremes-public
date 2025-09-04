import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController";
import Swal from "sweetalert2";
import educator from "../../assets/undraw_barbecue_k11q (1).svg";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const register = AuthController((state) => state.register);
  const error = AuthController((state) => state.error);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Register...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await register(form, navigate);
      Swal.fire({
        icon: "success",
        title: "Berhasil Register",
        text: "Pendaftaran berhasil, silahkan login",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Register",
        text:
          error ||
          err.response?.data?.message ||
          "Pendaftaran gagal, silahkan coba lagi nanti",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4"
      style={{ backgroundColor: "#FFF5CC" }}
    >
      <div className="bg-white shadow-2xl rounded-2xl flex overflow-hidden w-full max-w-5xl h-[654px]">
        {/* Bagian Kiri */}
        <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center p-8">
          <img
            src={educator}
            alt="Educator"
            className="w-72 h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-white text-2xl font-semibold mt-6 text-center">
            Bergabunglah Bersama Kami!
          </h2>
          <p className="text-white/80 text-sm mt-2 text-center px-4">
            Buat akun dan nikmati berbagai layanan menarik dari kami.
          </p>
        </div>

        {/* Bagian Kanan */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            Daftar
          </h2>

          <form className="space-y-5" onSubmit={handleRegister}>
            {/* Input Nama */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nama
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500"
                required
              />
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
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
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Buat password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500"
                required
                minLength={6}
              />
            </div>

            {/* Input Konfirmasi Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="Ulangi password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500"
                required
                minLength={6}
              />
            </div>

            {/* Tampilkan Error di bawah form */}
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            {/* Tombol Daftar */}
            <button
              type="submit"
              className="w-full bg-[#B80002] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#8F0002] active:scale-95 shadow-md transition"
            >
              Daftar
            </button>
          </form>

          {/* Garis pemisah */}
          <div className="my-6 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">Atau</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Tombol Daftar Google */}
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
              Daftar dengan Google
            </span>
          </button>

          {/* Link ke Login */}
          <p className="mt-6 text-center text-gray-600">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Masuk sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;