import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController.js";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import educator from "../../assets/undraw_barbecue_k11q (1).svg";

export default function Register() {
  const [form, setForm] = useState({ email: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const { register, loading, checkRegistrationStatus } = AuthController();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi terms and conditions
    if (!acceptedTerms) {
      Swal.fire({
        icon: "warning",
        title: "Persetujuan Diperlukan",
        text: "Anda harus menyetujui syarat dan ketentuan serta kebijakan privasi untuk melanjutkan.",
      });
      return;
    }

    // Validasi email
    if (!form.email || !form.email.includes("@")) {
      Swal.fire({
        icon: "error",
        title: "Email tidak valid",
        text: "Masukkan alamat email yang benar.",
      });
      return;
    }

    try {
      setIsCheckingEmail(true);

      // Cek status email terlebih dahulu
      const status = await checkRegistrationStatus(form.email);
      
      if (status.exists) {
        // Email sudah terdaftar - handle berdasarkan status
        if (!status.verified) {
          // Belum verify - arahkan ke verify code
          await Swal.fire({
            icon: "info",
            title: "Lanjutkan Verifikasi",
            text: "Email ini sudah terdaftar tetapi belum diverifikasi. Silakan lanjutkan verifikasi.",
            confirmButtonText: "Lanjutkan Verifikasi"
          });
          navigate("/verify-code", { 
            state: { 
              email: form.email,
              resend: true 
            } 
          });
          return;
        } else if (!status.profile_completed) {
          // Sudah verify tapi belum setup profile
          await Swal.fire({
            icon: "info",
            title: "Lanjutkan Setup Profile",
            text: "Email sudah terverifikasi. Silakan lengkapi profil Anda.",
            confirmButtonText: "Lanjutkan"
          });
          navigate("/setup-profile", { 
            state: { 
              email: form.email,
              userData: status.userData 
            } 
          });
          return;
        } else {
          // Sudah lengkap - arahkan ke login
          await Swal.fire({
            icon: "info",
            title: "Akun Sudah Ada",
            text: "Akun dengan email ini sudah terdaftar dan lengkap. Silakan login.",
            confirmButtonText: "Ke Login"
          });
          navigate("/login");
          return;
        }
      }

      // Email belum terdaftar - lanjutkan pendaftaran baru
      const result = await register({ email: form.email });
      
      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil Daftar",
          text: result.message,
        });
        navigate("/verify-code", { state: { email: form.email } });
      }

    } catch (err) {
      console.error("Register error:", err);
      
      // Handle error dari backend
      let errorMsg = err.message || "Terjadi kesalahan. Silakan coba lagi.";

      // Jika error karena email sudah terdaftar (race condition), handle secara khusus
      if (err.response?.status === 422 && err.response?.data?.message?.includes('Email sudah terdaftar')) {
        errorMsg = "Email sudah terdaftar. Silakan lanjutkan proses pendaftaran yang sebelumnya.";
        
        // Cek ulang status untuk redirect yang tepat
        try {
          const status = await checkRegistrationStatus(form.email);
          if (status.exists && !status.verified) {
            navigate("/verify-code", { 
              state: { 
                email: form.email,
                resend: true 
              } 
            });
            return;
          } else if (status.exists && status.verified && !status.profile_completed) {
            navigate("/setup-profile", { 
              state: { 
                email: form.email,
                userData: status.userData 
              } 
            });
            return;
          }
        } catch (checkError) {
          // Fallback ke error message biasa
        }
      }

      Swal.fire({
        icon: "error",
        title: "Gagal Daftar",
        text: errorMsg,
      });
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Cek apakah form valid untuk enable tombol
  const isFormValid = form.email.includes("@") && acceptedTerms;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5CC] to-orange-50 relative p-4 sm:p-6">
      {/* Back Button - Mobile Optimized */}
      <button
        onClick={() => navigate("/")}
        className="fixed md:absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg text-gray-700 hover:text-red-600 font-medium transition-all hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <ArrowLeft size={18} /> 
        <span className="hidden sm:inline">Kembali</span>
      </button>

      <div className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden mx-auto my-8 md:my-0">
        {/* Left Section - Hidden on mobile */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-500 to-red-700 flex-col items-center justify-center p-8">
          <img
            src={educator}
            alt="Join Community"
            className="w-64 h-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-white text-2xl font-bold mt-6 text-center">
            Daftar Akun Baru
          </h2>
          <p className="text-white/90 text-sm mt-3 text-center px-4 leading-relaxed">
            Masukkan email untuk memulai proses pendaftaran.
          </p>
        </div>

        {/* Right Section - Register Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          {/* Mobile Header */}
          <div className="md:hidden mb-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
              <img 
                src={educator} 
                alt="Join Community" 
                className="w-12 h-12 rounded-lg" 
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Daftar Akun Baru</h3>
            <p className="text-gray-600 text-sm mt-1">Mulai dengan memasukkan email Anda</p>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">
            Daftar
          </h2>
          
          <form className="space-y-4 sm:space-y-5" onSubmit={handleRegister}>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent placeholder-gray-500 text-gray-900 text-sm sm:text-base transition-all duration-200"
                placeholder=" "
                required
                disabled={isCheckingEmail || loading}
              />
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-xs sm:text-sm text-gray-700 transition-all pointer-events-none">
                Email
              </label>
            </div>

            {isCheckingEmail && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700 text-center">
                  🔍 Memeriksa status email...
                </p>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <input 
                type="checkbox" 
                id="terms" 
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                disabled={isCheckingEmail || loading}
              />
              <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 leading-tight cursor-pointer">
                Saya menyetujui{" "}
                <Link to="/Syarat" className="text-red-600 hover:text-red-800 underline font-medium">
                  syarat dan ketentuan
                </Link>{" "}
                serta{" "}
                <Link to="/Kebijakan" className="text-red-600 hover:text-red-800 underline font-medium">
                  kebijakan privasi
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid || isCheckingEmail}
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 active:scale-95 ${
                loading || isCheckingEmail
                  ? "bg-gray-400 cursor-not-allowed text-white" 
                  : !isFormValid
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-200 hover:shadow-xl"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Memproses...
                </span>
              ) : isCheckingEmail ? (
                "Memeriksa..."
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-red-600 font-semibold hover:text-red-800 hover:underline ml-1 transition-colors"
            >
              Masuk
            </Link>
          </p>

          {/* Mobile Footer */}
          <div className="md:hidden mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Sistem akan otomatis mendeteksi status pendaftaran email Anda
            </p>
          </div>
        </div>
      </div>

      {/* Background Decoration for Mobile */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-red-500/5 to-transparent pointer-events-none md:hidden"></div>
    </div>
  );
}