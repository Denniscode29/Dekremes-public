// src/pages/auth2/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController.js";
import Swal from "sweetalert2";
import educator from "../../assets/undraw_personal-information_h7kf.svg";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearError } = AuthController();
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    clearError();
    
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Data tidak lengkap",
        text: "Harap isi email dan password",
      });
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Login",
          text: result.message,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      
      if (err.requires_setup) {
        Swal.fire({
          icon: "info",
          title: "Profil Belum Lengkap",
          text: "Silakan lengkapi profil Anda terlebih dahulu.",
        }).then(() => {
          navigate("/setup-profile");
        });
        return;
      }

      if (err.requires_verification) {
        Swal.fire({
          icon: "warning",
          title: "Email Belum Terverifikasi",
          text: err.message,
          showCancelButton: true,
          confirmButtonText: "Verifikasi Sekarang",
          cancelButtonText: "Nanti",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/verify-code", { state: { email: err.email } });
          }
        });
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text: err.message || "Email atau password salah",
      });
    }
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    window.location.href = `${apiUrl}/api/v1/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5CC] to-orange-50 p-4 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed md:absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg text-gray-700 hover:text-red-600 font-medium transition-all hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Kembali</span>
      </button>

      {/* Main Container */}
      <div className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl mx-auto my-8 md:my-0">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-500 to-red-700 flex-col items-center justify-center p-8">
          <img
            src={educator}
            alt="Educator"
            className="w-64 h-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-white text-2xl font-bold mt-6 text-center">
            Selamat Datang Kembali!
          </h2>
          <p className="text-white/90 text-sm mt-3 text-center px-4 leading-relaxed">
            Masuk ke akun Anda dan lanjutkan aktivitas Anda.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">
            Masuk
          </h2>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent placeholder-gray-500 text-gray-900 text-sm sm:text-base transition-all duration-200"
                placeholder=" "
                required
              />
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-xs sm:text-sm text-gray-700 transition-all pointer-events-none">
                Email
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent placeholder-gray-500 text-gray-900 text-sm sm:text-base transition-all duration-200"
                placeholder=" "
                required
                minLength={8}
              />
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-xs sm:text-sm text-gray-700 transition-all pointer-events-none">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-xs sm:text-sm text-red-600 hover:text-red-800 hover:underline transition-colors"
                onClick={() => navigate("/forgot-password")}
              >
                Lupa password?
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 active:scale-95 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-200 hover:shadow-xl"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Memproses...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-500 text-xs sm:text-sm">
                Atau masuk dengan
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center py-3 sm:py-4 rounded-xl font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google logo"
              className="w-5 h-5 mr-3"
            />
            <span>Google</span>
          </button>

          {/* Register Link */}
          <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-red-600 font-semibold hover:text-red-800 hover:underline ml-1 transition-colors"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}