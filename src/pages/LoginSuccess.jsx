import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthController from "../controllers/AuthController.js";
import Swal from "sweetalert2";

export default function LoginSuccess() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginSuccess } = AuthController();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const error = params.get("error");

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Terjadi kesalahan saat login dengan Google. Silakan coba lagi.",
        });
        navigate("/login");
        return;
      }

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Token Tidak Ditemukan",
          text: "Token tidak valid. Silakan login kembali.",
        });
        navigate("/login");
        return;
      }

      try {
        const result = await loginSuccess(token);
        
        if (result.success) {
          // Cek apakah perlu setup profile
          if (result.requires_profile_setup) {
            Swal.fire({
              icon: "info",
              title: "Lengkapi Profil",
              text: "Silakan lengkapi profil Anda untuk melanjutkan.",
              timer: 2000,
              showConfirmButton: false
            });
            navigate("/setup-profile");
          } else {
            Swal.fire({
              icon: "success",
              title: "Login Berhasil",
              text: "Selamat datang kembali!",
              timer: 2000,
              showConfirmButton: false
            });
            navigate("/");
          }
        }
      } catch (err) {
        console.error("Login success error:", err);
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Terjadi kesalahan. Silakan coba login kembali.",
        });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [location, navigate, loginSuccess]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5CC]">
        <div className="bg-white shadow-2xl rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Memproses Login...</h2>
          <p className="text-gray-600">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return null;
}