import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthController from "../../controllers/AuthController.js";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

export default function SetupProfile() {
  const [form, setForm] = useState({ 
    name: "", 
    password: "",
    password_confirmation: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { setupProfile, loginSuccess } = AuthController();

  // Ambil token dari URL lalu simpan ke localStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    
    if (token) {
      // Token dari Google OAuth callback
      localStorage.setItem("authToken", token);
      // Hapus token dari URL untuk keamanan
      window.history.replaceState({}, document.title, "/setup-profile");
      
      // Coba ambil data user
      loginSuccess(token).catch((err) => {
        console.error("Error loading user data:", err);
      });
    } else if (!localStorage.getItem("authToken")) {
      // Tidak ada token sama sekali
      Swal.fire({
        icon: "error",
        title: "Akses Ditolak",
        text: "Silakan login atau registrasi terlebih dahulu.",
      });
      navigate("/register");
    }
  }, [location, navigate, loginSuccess]);

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

    setLoading(true);
    try {
      const result = await setupProfile({
        name: form.name.trim(),
        password: form.password.trim()
      });

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Profil Berhasil Disimpan",
          text: result.message || "Profil berhasil dilengkapi!",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.error("Setup profile error:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan Profil",
        text: err.message || "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 p-4 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
      >
        <ArrowLeft size={20} /> Kembali
      </button>

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Lengkapi Profil Anda
          </h2>
          <p className="text-gray-600">
            Berikan informasi dasar untuk personalisasi pengalaman Anda
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nama */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                         transition-colors"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Buat password baru (minimal 8 karakter)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                         transition-colors"
              required
              minLength={8}
            />
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Konfirmasi Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Ulangi password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                         transition-colors"
              required
              minLength={8}
            />
          </div>

          {/* Tombol Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !form.name.trim() || !form.password.trim() || !form.password_confirmation.trim()}
              className={`w-full py-3 rounded-lg font-semibold shadow-md transition-colors
                         ${
                           loading || !form.name.trim() || !form.password.trim() || !form.password_confirmation.trim()
                             ? "bg-gray-400 cursor-not-allowed text-white"
                             : "bg-red-600 hover:bg-red-700 text-white"
                         }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Menyimpan...
                </span>
              ) : (
                "Simpan Profil"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}