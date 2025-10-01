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
        icon: "error",
        title: "Data Tidak Lengkap",
        text: "Silakan daftar terlebih dahulu.",
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
        icon: "error",
        title: "Nama Kosong",
        text: "Nama harus diisi.",
      });
      return;
    }

    if (!form.password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Password Kosong", 
        text: "Password harus diisi.",
      });
      return;
    }

    if (form.password !== form.password_confirmation) {
      Swal.fire({
        icon: "error",
        title: "Password Tidak Cocok",
        text: "Konfirmasi password harus sama dengan password.",
      });
      return;
    }

    if (form.password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password Terlalu Pendek",
        text: "Password minimal 8 karakter.",
      });
      return;
    }

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email Tidak Ditemukan",
        text: "Silakan daftar ulang.",
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
          icon: "success",
          title: "Profil Berhasil Disimpan",
          text: "Profil berhasil dilengkapi! Silakan login dengan email dan password Anda.",
          timer: 3000,
          showConfirmButton: false,
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
        icon: "error",
        title: "Gagal Menyimpan Profil",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5CC] p-4 relative">
      <button
        onClick={() => {
          localStorage.removeItem('temp_user_email');
          navigate("/register");
        }}
        className="absolute top-6 left-6 flex items-center gap-2 text-black hover:text-red-600 font-bold transition-colors duration-200"
      >
        <ArrowLeft size={20} /> KEMBALI
      </button>

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border-2 border-black">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-3 rounded-full border border-black">
              <User size={40} className="text-black" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-black mb-2">
            LENGKAPI PROFIL ANDA
          </h2>
          <p className="text-black font-medium">
            Isi informasi dasar untuk menyelesaikan pendaftaran
          </p>
          
          {/* Tampilkan email */}
          {email && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-black">
                <strong>Email terdaftar:</strong> {email}
              </p>
            </div>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="space-y-2">
            <label className="block text-black font-bold text-lg">
              <User size={16} className="inline mr-2" />
              NAMA LENGKAP <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
              className="w-full px-4 py-3 border-2 border-black rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                         transition-colors duration-200 bg-white text-black font-medium"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-black font-bold text-lg">
              <Lock size={16} className="inline mr-2" />
              PASSWORD <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Buat password baru (minimal 8 karakter)"
              className="w-full px-4 py-3 border-2 border-black rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                         transition-colors duration-200 bg-white text-black font-medium"
              required
              minLength={8}
            />
            <p className="text-sm text-black font-medium">
              🔒 Minimal 8 karakter
            </p>
          </div>

          {/* Konfirmasi Password */}
          <div className="space-y-2">
            <label className="block text-black font-bold text-lg">
              <Shield size={16} className="inline mr-2" />
              KONFIRMASI PASSWORD <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Ulangi password Anda"
              className="w-full px-4 py-3 border-2 border-black rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                         transition-colors duration-200 bg-white text-black font-medium"
              required
              minLength={8}
            />
            <p className="text-sm text-black font-medium">
              {form.password_confirmation && form.password !== form.password_confirmation ? (
                <span className="text-red-600">❌ Password tidak cocok</span>
              ) : form.password_confirmation && form.password === form.password_confirmation ? (
                <span className="text-green-600">✅ Password cocok</span>
              ) : (
                "🔒 Harus sama dengan password"
              )}
            </p>
          </div>

          {/* Tombol Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !form.name.trim() || !form.password.trim() || !form.password_confirmation.trim() || form.password !== form.password_confirmation}
              className={`w-full py-3.5 rounded-lg font-bold text-lg border-2 border-black shadow-lg transition-all duration-200
                         ${
                           loading || !form.name.trim() || !form.password.trim() || !form.password_confirmation.trim() || form.password !== form.password_confirmation
                             ? "bg-gray-400 cursor-not-allowed text-black border-gray-400"
                             : "bg-red-600 hover:bg-red-700 text-white transform hover:scale-[1.02] active:scale-[0.98]"
                         }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  MENYIMPAN...
                </span>
              ) : (
                "SIMPAN PROFIL"
              )}
            </button>
          </div>
        </form>

        {/* Info Footer */}
        <div className="mt-6 pt-6 border-t-2 border-black text-center">
          <p className="text-sm text-black font-bold">
            📝 Setelah menyimpan, Anda akan diarahkan ke halaman login
          </p>
        </div>
      </div>
    </div>
  );
}