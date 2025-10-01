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
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Persetujuan Diperlukan</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Anda harus menyetujui syarat dan ketentuan serta kebijakan privasi untuk melanjutkan.</p>' +
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

    // Validasi email
    if (!form.email || !form.email.includes("@")) {
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Email Tidak Valid</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Masukkan alamat email yang benar.</p>' +
              '</div>',
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#ef4444",
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
      setIsCheckingEmail(true);

      // Cek status email terlebih dahulu
      const status = await checkRegistrationStatus(form.email);
      
      if (status.exists) {
        // Email sudah terdaftar - handle berdasarkan status
        if (!status.verified) {
          // Belum verify - arahkan ke verify code
          await Swal.fire({
            title: '<div class="flex flex-col items-center">' +
                   '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">' +
                   '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>' +
                   '</svg>' +
                   '</div>' +
                   '<h3 class="text-xl font-bold text-gray-800 mb-2">Lanjutkan Verifikasi</h3>' +
                   '</div>',
            html: '<div class="text-center">' +
                  '<p class="text-gray-600 mb-1">Email ini sudah terdaftar tetapi belum diverifikasi.</p>' +
                  '<p class="text-gray-600">Silakan lanjutkan verifikasi.</p>' +
                  '</div>',
            confirmButtonText: "Lanjutkan Verifikasi",
            confirmButtonColor: "#3b82f6",
            background: "#fff",
            color: "#1f2937",
            customClass: {
              popup: 'rounded-2xl shadow-2xl border border-gray-200',
              confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
            },
            showCloseButton: true
          });
          
          // SIMPAN EMAIL KE LOCALSTORAGE SEBELUM NAVIGASI
          localStorage.setItem('temp_user_email', form.email);
          
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
            title: '<div class="flex flex-col items-center">' +
                   '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">' +
                   '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>' +
                   '</svg>' +
                   '</div>' +
                   '<h3 class="text-xl font-bold text-gray-800 mb-2">Lanjutkan Setup Profile</h3>' +
                   '</div>',
            html: '<div class="text-center">' +
                  '<p class="text-gray-600 mb-1">Email sudah terverifikasi.</p>' +
                  '<p class="text-gray-600">Silakan lengkapi profil Anda.</p>' +
                  '</div>',
            confirmButtonText: "Lanjutkan",
            confirmButtonColor: "#3b82f6",
            background: "#fff",
            color: "#1f2937",
            customClass: {
              popup: 'rounded-2xl shadow-2xl border border-gray-200',
              confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
            },
            showCloseButton: true
          });
          
          // SIMPAN EMAIL KE LOCALSTORAGE SEBELUM NAVIGASI
          localStorage.setItem('temp_user_email', form.email);
          
          navigate("/setup-profile", { 
            state: { 
              email: form.email
            } 
          });
          return;
        } else {
          // Sudah lengkap - arahkan ke login
          await Swal.fire({
            title: '<div class="flex flex-col items-center">' +
                   '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">' +
                   '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>' +
                   '</svg>' +
                   '</div>' +
                   '<h3 class="text-xl font-bold text-gray-800 mb-2">Akun Sudah Ada</h3>' +
                   '</div>',
            html: '<div class="text-center">' +
                  '<p class="text-gray-600 mb-1">Akun dengan email ini sudah terdaftar dan lengkap.</p>' +
                  '<p class="text-gray-600">Silakan login.</p>' +
                  '</div>',
            confirmButtonText: "Ke Login",
            confirmButtonColor: "#10b981",
            background: "#fff",
            color: "#1f2937",
            customClass: {
              popup: 'rounded-2xl shadow-2xl border border-gray-200',
              confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
            },
            showCloseButton: true
          });
          navigate("/login");
          return;
        }
      }

      // Email belum terdaftar - lanjutkan pendaftaran baru
      const result = await register({ email: form.email });
      
      if (result.success) {
        // SIMPAN EMAIL KE LOCALSTORAGE SETELAH REGISTER BERHASIL
        localStorage.setItem('temp_user_email', form.email);
        
        // ALERT BERHASIL DAFTAR
        await Swal.fire({
          title: '<div class="flex flex-col items-center">' +
                 '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">' +
                 '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' +
                 '</svg>' +
                 '</div>' +
                 '<h3 class="text-xl font-bold text-gray-800 mb-2">Berhasil Daftar!</h3>' +
                 '</div>',
          html: '<div class="text-center">' +
                '<p class="text-gray-600 mb-1">Registrasi berhasil!</p>' +
                '<p class="text-gray-600">Silakan cek email Anda untuk kode verifikasi.</p>' +
                '</div>',
          confirmButtonText: "Buka Email",
          confirmButtonColor: "#10b981",
          background: "#fff",
          color: "#1f2937",
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-gray-200',
            confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
          },
          showCloseButton: true,
          focusConfirm: false,
          allowEscapeKey: false,
          allowOutsideClick: false
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
            // SIMPAN EMAIL KE LOCALSTORAGE
            localStorage.setItem('temp_user_email', form.email);
            
            navigate("/verify-code", { 
              state: { 
                email: form.email,
                resend: true 
              } 
            });
            return;
          } else if (status.exists && status.verified && !status.profile_completed) {
            // SIMPAN EMAIL KE LOCALSTORAGE
            localStorage.setItem('temp_user_email', form.email);
            
            navigate("/setup-profile", { 
              state: { 
                email: form.email
              } 
            });
            return;
          }
        } catch (checkError) {
          // Fallback ke error message biasa
          console.error("Error checking status in catch:", checkError);
        }
      }

      // ALERT ERROR
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Gagal Daftar</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">' + errorMsg + '</p>' +
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
      setIsCheckingEmail(false);
    }
  };

  // Cek apakah form valid untuk enable tombol
  const isFormValid = form.email.includes("@") && acceptedTerms;

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
        <div className="bg-white shadow-xl rounded-2xl md:rounded-3xl flex flex-col md:flex-row w-full max-w-md md:max-w-4xl overflow-hidden border border-gray-100 mx-2">
          {/* Left Section - Hidden on mobile */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-500 to-red-700 flex-col items-center justify-center p-8">
            <img
              src={educator}
              alt="Join Community"
              className="w-56 h-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-white text-2xl font-bold mt-6 text-center">
              Daftar Akun Baru
            </h2>
            <p className="text-white/90 text-sm mt-3 text-center px-4 leading-relaxed">
              Masukkan email untuk memulai proses pendaftaran.
            </p>
          </div>

          {/* Right Section - Register Form */}
          <div className="w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            {/* Mobile Header - Improved */}
            <div className="md:hidden mb-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <img 
                  src={educator} 
                  alt="Join Community" 
                  className="w-8 h-8 rounded-lg" 
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Daftar Akun Baru</h3>
              <p className="text-gray-600 text-xs">Mulai dengan memasukkan email Anda</p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 md:text-4xl md:mb-8">
              Daftar
            </h2>
            
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm md:text-base md:py-4 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200 bg-white"
                  placeholder=" "
                  required
                  disabled={isCheckingEmail || loading}
                />
                <label className="absolute left-4 -top-2 bg-white px-2 text-xs md:text-sm text-gray-700 transition-all pointer-events-none">
                  Email
                </label>
              </div>

              {isCheckingEmail && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm text-amber-700 text-center flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Memeriksa status email...
                  </p>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 p-3 md:p-4 bg-amber-50 rounded-lg md:rounded-xl border border-amber-100">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 md:w-5 md:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  disabled={isCheckingEmail || loading}
                />
                <label htmlFor="terms" className="text-xs md:text-sm text-gray-600 leading-relaxed cursor-pointer">
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
                className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all duration-200 active:scale-95 ${
                  loading || isCheckingEmail
                    ? "bg-gray-400 cursor-not-allowed text-white" 
                    : !isFormValid
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-200 hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center text-sm md:text-base">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Memproses...
                  </span>
                ) : isCheckingEmail ? (
                  "Memeriksa..."
                ) : (
                  "Daftar Sekarang"
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-gray-600 text-xs md:text-base">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-red-600 font-semibold hover:text-red-800 hover:underline ml-1 transition-colors"
              >
                Masuk di sini
              </Link>
            </p>

            {/* Mobile Footer */}
            <div className="md:hidden mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Sistem akan otomatis mendeteksi status pendaftaran email Anda
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