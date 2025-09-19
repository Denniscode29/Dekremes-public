import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController.js";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import educator from "../../assets/undraw_personal-information_h7kf.svg";

export default function Register() {
  const [form, setForm] = useState({ email: "" });
  const { register, loading, loginWithGoogle } = AuthController();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ Validasi frontend sebelum request ke server
    if (!form.email || !form.email.includes("@")) {
      Swal.fire({
        icon: "error",
        title: "Email tidak valid",
        text: "Masukkan alamat email yang benar.",
      });
      return;
    }

    try {
      const { success, message } = await register({ email: form.email });
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Daftar",
          text: message,
        });
        navigate("/verify-code", { state: { email: form.email } });
      }
    } catch (err) {
      // ✅ Ambil pesan error dari backend Laravel
      const errorMsg =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        "Silakan coba lagi.";

      Swal.fire({
        icon: "error",
        title: "Gagal Daftar",
        text: errorMsg,
      });
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5CC] relative p-4">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md text-gray-700 hover:text-red-600 font-medium transition-all hover:shadow-lg"
      >
        <ArrowLeft size={20} /> Kembali
      </button>

      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Kiri */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center p-8">
          <img
            src={educator}
            alt="Educator"
            className="w-64 h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-white text-2xl font-semibold mt-6 text-center">
            Buat akun dan lengkapi profilmu!
          </h2>
          <p className="text-white/80 text-sm mt-2 text-center px-4">
            Masukkan data diri agar pengalaman lebih personal.
          </p>
        </div>

        {/* Kanan */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">
            Daftar
          </h2>
          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700 text-gray-900"
                required
              />
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-700 transition-all">
                Email
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold shadow-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#B80002] hover:bg-[#8F0002] text-white"
              }`}
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Atau daftar dengan
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-3 rounded-lg font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition shadow-md"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />{" "}
            Google
          </button>

          <p className="mt-6 text-center text-gray-600">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}