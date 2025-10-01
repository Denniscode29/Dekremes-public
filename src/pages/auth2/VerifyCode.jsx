import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController.js";
import Swal from "sweetalert2";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const { verifyCode, resendVerificationCode } = AuthController();

  // Timer untuk cooldown kirim ulang
  const startResendCooldown = () => {
    setResendCooldown(60);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Kode Tidak Lengkap</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Masukkan 6 digit kode verifikasi.</p>' +
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
    
    setLoading(true);
    try {
      const result = await verifyCode(email, code);
      
      if (result.success) {
        await Swal.fire({
          title: '<div class="flex flex-col items-center">' +
                 '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">' +
                 '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' +
                 '</svg>' +
                 '</div>' +
                 '<h3 class="text-xl font-bold text-gray-800 mb-2">Email Terverifikasi!</h3>' +
                 '</div>',
          html: '<div class="text-center">' +
                '<p class="text-gray-600">Email berhasil diverifikasi! Silakan lengkapi profil Anda.</p>' +
                '</div>',
          confirmButtonText: "Lanjutkan",
          confirmButtonColor: "#10b981",
          background: "#fff",
          color: "#1f2937",
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-gray-200',
            confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
          },
          timer: 2000,
          timerProgressBar: true,
          showCloseButton: true
        });
        
        // PERBAIKAN: Redirect ke setup-profile tanpa token
        navigate("/setup-profile", { 
          state: { 
            email: email,
            fromVerify: true 
          } 
        });
      }
    } catch (err) {
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Gagal Verifikasi</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">' + (err.message || "Kode salah atau kadaluarsa.") + '</p>' +
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
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Error</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Email tidak ditemukan. Silakan registrasi ulang.</p>' +
              '</div>',
        confirmButtonText: "Ke Halaman Daftar",
        confirmButtonColor: "#ef4444",
        background: "#fff",
        color: "#1f2937",
        customClass: {
          popup: 'rounded-2xl shadow-2xl border border-gray-200',
          confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
        }
      });
      navigate("/register");
      return;
    }
    
    if (resendCooldown > 0) return;
    
    setLoading(true);
    try {
      const result = await resendVerificationCode(email);
      if (result.success) {
        Swal.fire({
          title: '<div class="flex flex-col items-center">' +
                 '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">' +
                 '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' +
                 '</svg>' +
                 '</div>' +
                 '<h3 class="text-xl font-bold text-gray-800 mb-2">Kode Terkirim</h3>' +
                 '</div>',
          html: '<div class="text-center">' +
                '<p class="text-gray-600">' + result.message + '</p>' +
                '</div>',
          confirmButtonText: "Mengerti",
          confirmButtonColor: "#10b981",
          background: "#fff",
          color: "#1f2937",
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-gray-200',
            confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
          },
          timer: 2000,
          timerProgressBar: true
        });
        startResendCooldown();
      }
    } catch (err) {
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Gagal Mengirim Kode</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">' + (err.message || "Silakan coba lagi.") + '</p>' +
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
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    Swal.fire({
      title: '<div class="flex flex-col items-center">' +
             '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
             '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
             '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
             '</svg>' +
             '</div>' +
             '<h3 class="text-xl font-bold text-gray-800 mb-2">Email Tidak Ditemukan</h3>' +
             '</div>',
      html: '<div class="text-center">' +
            '<p class="text-gray-600">Silakan registrasi terlebih dahulu.</p>' +
            '</div>',
      confirmButtonText: "Ke Halaman Daftar",
      confirmButtonColor: "#ef4444",
      background: "#fff",
      color: "#1f2937",
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-gray-200',
        confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
      }
    });
    navigate("/register");
    return null;
  }

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
        <div className="bg-white shadow-xl rounded-2xl md:rounded-3xl flex flex-col md:flex-row w-full max-w-md md:max-w-2xl overflow-hidden border border-gray-100 mx-2">
          {/* Form Section - Full width */}
          <div className="w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            {/* Mobile Header */}
            <div className="md:hidden mb-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Verifikasi Email</h3>
              <p className="text-gray-600 text-xs">Masukkan kode verifikasi yang dikirim ke email Anda</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
                Verifikasi Email
              </h2>
              <p className="text-gray-600">Masukkan kode verifikasi yang dikirim ke email Anda</p>
            </div>

            {/* Email Display */}
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg md:rounded-xl">
              <p className="text-sm text-amber-700 text-center flex items-center justify-center gap-2">
                <Mail size={16} />
                <strong>Kode dikirim ke:</strong> {email}
              </p>
            </div>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Code Input */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-gray-800 text-center">
                  Masukkan Kode Verifikasi
                </label>
                <div className="flex justify-center">
                  <input 
                    type="text" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                    placeholder="000000"
                    className="w-48 px-4 py-4 text-center text-2xl font-mono border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                    maxLength={6}
                    required 
                    autoComplete="one-time-code"
                    inputMode="numeric"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Masukkan 6 digit angka yang diterima via email
                </p>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading || code.length !== 6} 
                className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all duration-200 active:scale-95 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-white" 
                    : code.length !== 6
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-200 hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center text-sm md:text-base">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Memverifikasi...
                  </span>
                ) : (
                  "Verifikasi"
                )}
              </button>
            </form>

            {/* Resend Code */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Tidak menerima kode?</p>
              <button 
                onClick={handleResend} 
                disabled={loading || resendCooldown > 0} 
                className={`font-semibold text-sm transition-colors duration-200 ${
                  loading || resendCooldown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-600 hover:text-red-800 hover:underline"
                }`}
              >
                {loading ? "Mengirim..." : 
                 resendCooldown > 0 ? `Kirim ulang (${resendCooldown}s)` : "Kirim Ulang Kode"}
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Sudah punya akun?{" "}
                <button 
                  onClick={() => navigate("/login")} 
                  className="text-red-600 hover:text-red-800 hover:underline font-semibold transition-colors"
                >
                  Masuk di sini
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration for Mobile */}
      <div className="fixed bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none md:hidden"></div>
    </div>
  );
}