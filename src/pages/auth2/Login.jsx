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
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Data Tidak Lengkap</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Harap isi email dan password untuk melanjutkan.</p>' +
              '</div>',
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#f59e0b",
        background: "#fff",
        color: "#1f2937",
        customClass: {
          popup: 'rounded-2xl shadow-2xl border border-gray-200',
          confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
        }
      });
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        await Swal.fire({
          title: '<div class="flex flex-col items-center">' +
                 '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">' +
                 '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' +
                 '</svg>' +
                 '</div>' +
                 '<h3 class="text-xl font-bold text-gray-800 mb-2">Berhasil Login!</h3>' +
                 '</div>',
          html: '<div class="text-center">' +
                '<p class="text-gray-600">' + result.message + '</p>' +
                '</div>',
          confirmButtonText: "Lanjutkan",
          confirmButtonColor: "#10b981",
          background: "#fff",
          color: "#1f2937",
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-gray-200',
            confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
          },
          showCloseButton: true,
          timer: 2000,
          timerProgressBar: true
        });
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      
      if (err.requires_setup) {
        await Swal.fire({
          title: '<div class="flex flex-col items-center">' +
                 '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">' +
                 '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>' +
                 '</svg>' +
                 '</div>' +
                 '<h3 class="text-xl font-bold text-gray-800 mb-2">Profil Belum Lengkap</h3>' +
                 '</div>',
          html: '<div class="text-center">' +
                '<p class="text-gray-600">Silakan lengkapi profil Anda terlebih dahulu.</p>' +
                '</div>',
          confirmButtonText: "Lengkapi Profil",
          confirmButtonColor: "#3b82f6",
          background: "#fff",
          color: "#1f2937",
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-gray-200',
            confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
          },
          showCloseButton: true
        }).then(() => {
          navigate("/setup-profile");
        });
        return;
      }

      if (err.requires_verification) {
        await Swal.fire({
          title: '<div class="flex flex-col items-center">' +
                 '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">' +
                 '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>' +
                 '</svg>' +
                 '</div>' +
                 '<h3 class="text-xl font-bold text-gray-800 mb-2">Email Belum Terverifikasi</h3>' +
                 '</div>',
          html: '<div class="text-center">' +
                '<p class="text-gray-600">' + err.message + '</p>' +
                '</div>',
          showCancelButton: true,
          confirmButtonText: "Verifikasi Sekarang",
          cancelButtonText: "Nanti",
          confirmButtonColor: "#3b82f6",
          cancelButtonColor: "#6b7280",
          background: "#fff",
          color: "#1f2937",
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-gray-200',
            confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200',
            cancelButton: 'py-3 px-6 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all duration-200'
          },
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/verify-code", { state: { email: err.email } });
          }
        });
        return;
      }

      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Gagal Login</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">' + (err.message || "Email atau password salah") + '</p>' +
              '</div>',
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#ef4444",
        background: "#fff",
        color: "#1f2937",
        customClass: {
          popup: 'rounded-2xl shadow-2xl border border-gray-200',
          confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
        },
        showCloseButton: true
      });
    }
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    window.location.href = `${apiUrl}/api/v1/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-amber-50 py-4 px-4 relative">
      {/* Back Button - Improved Mobile */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md text-gray-700 hover:text-red-600 font-medium transition-all hover:shadow-lg active:scale-95 md:absolute md:top-6 md:left-6 md:px-4 md:py-3 md:rounded-xl md:text-base"
      >
        <ArrowLeft size={18} className="md:size-5" />
        <span className="text-sm md:text-base">Kembali</span>
      </button>

      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-screen pt-16 pb-8 md:min-h-[calc(100vh-4rem)] md:pt-0 md:pb-0">
        {/* Main Container */}
        <div className="bg-white shadow-xl rounded-2xl md:rounded-3xl flex flex-col md:flex-row w-full max-w-md md:max-w-4xl overflow-hidden border border-gray-100 mx-2">
          {/* Left Section - Hidden on mobile */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-500 to-red-700 flex-col items-center justify-center p-8">
            <img
              src={educator}
              alt="Educator"
              className="w-56 h-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-white text-2xl font-bold mt-6 text-center">
              Selamat Datang Kembali!
            </h2>
            <p className="text-white/90 text-sm mt-3 text-center px-4 leading-relaxed">
              Masuk ke akun Anda dan lanjutkan aktivitas Anda.
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            {/* Mobile Header - Improved */}
            <div className="md:hidden mb-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <img 
                  src={educator} 
                  alt="Educator" 
                  className="w-8 h-8 rounded-lg" 
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Selamat Datang Kembali!</h3>
              <p className="text-gray-600 text-xs">Masuk ke akun Anda</p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 md:text-4xl md:mb-8">
              Masuk
            </h2>

            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-sm md:text-base md:py-4 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200 bg-white"
                  placeholder=" "
                  required
                />
                <label className="absolute left-4 -top-2 bg-white px-2 text-xs md:text-sm text-gray-700 transition-all pointer-events-none">
                  Email
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 text-sm md:text-base md:py-4 pr-12 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200 bg-white"
                  placeholder=" "
                  required
                  minLength={8}
                />
                <label className="absolute left-4 -top-2 bg-white px-2 text-xs md:text-sm text-gray-700 transition-all pointer-events-none">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} className="md:size-5" /> : <Eye size={18} className="md:size-5" />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right -mt-2">
                <button
                  type="button"
                  className="text-xs md:text-sm text-red-600 hover:text-red-800 hover:underline transition-colors font-medium"
                  onClick={() => navigate("/forgot-password")}
                >
                  Lupa password?
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs md:text-sm px-3 py-2 md:px-4 md:py-3 rounded-lg text-center">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all duration-200 active:scale-95 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-200 hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center text-sm md:text-base">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Memproses...
                  </span>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4 md:my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-xs md:text-sm">
                <span className="bg-white px-3 text-gray-500">
                  Atau masuk dengan
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center py-3 md:py-4 rounded-lg md:rounded-xl font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 shadow-sm md:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google logo"
                className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3"
              />
              <span>Google</span>
            </button>

            {/* Register Link */}
            <p className="mt-6 text-center text-gray-600 text-xs md:text-base">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-red-600 font-semibold hover:text-red-800 hover:underline ml-1 transition-colors"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Background Decoration for Mobile */}
      <div className="fixed bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none md:hidden"></div>
    </div>
  );
}