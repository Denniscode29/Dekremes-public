import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthController from "../../controllers/AuthController.js";
import Swal from "sweetalert2";
import { ArrowLeft, User, Lock, Shield } from "lucide-react";

export default function SetupProfile() {
  const [form, setForm] = useState({ 
    name: "", 
    password: "",
    password_confirmation: ""
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { setupProfile } = AuthController();

  // PERBAIKAN: Ambil email dari state atau localStorage, tanpa pengecekan token
  useEffect(() => {
    const locationEmail = location.state?.email;
    const tempEmail = localStorage.getItem('temp_user_email');
    
    if (locationEmail) {
      setEmail(locationEmail);
      localStorage.setItem('temp_user_email', locationEmail);
    } else if (tempEmail) {
      setEmail(tempEmail);
    } else {
      // Jika tidak ada email, redirect ke register
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Data Tidak Lengkap</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Silakan daftar terlebih dahulu.</p>' +
              '</div>',
        confirmButtonText: "Ke Halaman Daftar",
        confirmButtonColor: "#ef4444",
        background: "#fff",
        color: "#1f2937",
        customClass: {
          popup: 'rounded-2xl shadow-2xl border border-gray-200',
          confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
        }
      }).then(() => {
        navigate("/register");
      });
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi client-side
    if (!form.name.trim()) {
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Nama Kosong</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Nama harus diisi.</p>' +
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

    if (!form.password.trim()) {
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Password Kosong</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Password harus diisi.</p>' +
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

    if (form.password !== form.password_confirmation) {
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Password Tidak Cocok</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Konfirmasi password harus sama dengan password.</p>' +
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

    if (form.password.length < 8) {
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Password Terlalu Pendek</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Password minimal 8 karakter.</p>' +
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
              '<p class="text-gray-600">Silakan daftar ulang.</p>' +
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

    setLoading(true);
    try {
      // PERBAIKAN: Kirim email bersama data form ke backend
      const result = await setupProfile({
        name: form.name.trim(),
        password: form.password.trim(),
        email: email // Kirim email untuk identifikasi di backend
      });

      if (result.success) {
        // PERBAIKAN: Hapus data temporary dan redirect ke login
        localStorage.removeItem('temp_user_email');
        
        await Swal.fire({
          title: '<div class="flex flex-col items-center">' +
                 '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">' +
                 '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' +
                 '</svg>' +
                 '</div>' +
                 '<h3 class="text-xl font-bold text-gray-800 mb-2">Profil Berhasil Disimpan!</h3>' +
                 '</div>',
          html: '<div class="text-center">' +
                '<p class="text-gray-600">Profil berhasil dilengkapi! Silakan login dengan email dan password Anda.</p>' +
                '</div>',
          confirmButtonText: "Ke Login",
          confirmButtonColor: "#10b981",
          background: "#fff",
          color: "#1f2937",
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-gray-200',
            confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
          },
          timer: 3000,
          timerProgressBar: true,
          showCloseButton: true
        });

        navigate("/login");
      }
    } catch (err) {
      console.error("Setup profile error:", err);
      
      // Handle error spesifik
      let errorMessage = err.message || "Terjadi kesalahan. Silakan coba lagi.";
      
      if (err.response?.status === 401) {
        errorMessage = "Sesi pendaftaran telah berakhir. Silakan daftar ulang.";
        localStorage.removeItem('temp_user_email');
        navigate("/register");
        return;
      }
      
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Gagal Menyimpan Profil</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">' + errorMessage + '</p>' +
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

  // Cek apakah form valid untuk enable tombol
  const isFormValid = form.name.trim() && 
                     form.password.trim() && 
                     form.password_confirmation.trim() && 
                     form.password === form.password_confirmation &&
                     form.password.length >= 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-amber-50 py-4 px-4 relative">
      {/* Back Button - Improved Mobile */}
      <button
        onClick={() => {
          localStorage.removeItem('temp_user_email');
          navigate("/register");
        }}
        className="fixed top-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md text-gray-700 hover:text-red-600 font-medium transition-all hover:shadow-lg active:scale-95 md:absolute md:top-6 md:left-6 md:px-4 md:py-3 md:rounded-xl md:text-base"
      >
        <ArrowLeft size={18} className="md:size-5" />
        <span className="text-sm md:text-base">Kembali</span>
      </button>

      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-screen pt-16 pb-8 md:min-h-[calc(100vh-4rem)] md:pt-0 md:pb-0">
        <div className="bg-white shadow-xl rounded-2xl md:rounded-3xl flex flex-col md:flex-row w-full max-w-md md:max-w-2xl overflow-hidden border border-gray-100 mx-2">
          {/* Form Section - Full width since no image */}
          <div className="w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            {/* Mobile Header */}
            <div className="md:hidden mb-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Lengkapi Profil Anda</h3>
              <p className="text-gray-600 text-xs">Isi informasi dasar untuk menyelesaikan pendaftaran</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
                Setup Profil
              </h2>
              <p className="text-gray-600">Lengkapi informasi dasar untuk menyelesaikan pendaftaran</p>
            </div>
            
            {/* Email Display */}
            {email && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg md:rounded-xl">
                <p className="text-sm text-amber-700 text-center">
                  <strong>Email terdaftar:</strong> {email}
                </p>
              </div>
            )}

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Nama Input */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm md:text-base md:py-4 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200 bg-white"
                  placeholder=" "
                  required
                />
                <label className="absolute left-4 -top-2 bg-white px-2 text-xs md:text-sm text-gray-700 transition-all pointer-events-none">
                  Nama Lengkap
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm md:text-base md:py-4 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200 bg-white"
                  placeholder=" "
                  required
                  minLength={8}
                />
                <label className="absolute left-4 -top-2 bg-white px-2 text-xs md:text-sm text-gray-700 transition-all pointer-events-none">
                  Password (minimal 8 karakter)
                </label>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type="password"
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm md:text-base md:py-4 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200 bg-white"
                  placeholder=" "
                  required
                  minLength={8}
                />
                <label className="absolute left-4 -top-2 bg-white px-2 text-xs md:text-sm text-gray-700 transition-all pointer-events-none">
                  Konfirmasi Password
                </label>
              </div>

              {/* Password Match Indicator */}
              {form.password_confirmation && (
                <div className={`text-sm px-3 py-2 rounded-lg text-center ${
                  form.password === form.password_confirmation 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                  {form.password === form.password_confirmation 
                    ? '✅ Password cocok' 
                    : '❌ Password tidak cocok'
                  }
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all duration-200 active:scale-95 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-white" 
                    : !isFormValid
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-200 hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center text-sm md:text-base">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Menyimpan...
                  </span>
                ) : (
                  "Simpan Profil"
                )}
              </button>
            </form>

            {/* Info Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Setelah menyimpan, Anda akan diarahkan ke halaman login
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