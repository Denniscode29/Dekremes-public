// src/pages/auth/LoginSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api.js";
import Swal from "sweetalert2";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    async function handleLoginSuccess() {
      try {
        if (!token) {
          throw new Error("Token tidak ditemukan");
        }

        // Simpan token ke localStorage
        localStorage.setItem("token", token);
        
        // Set header Authorization untuk API calls selanjutnya
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Ambil data user
        const res = await api.get("/auth/profile");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: "Selamat datang kembali!",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/"); // redirect ke home

      } catch (err) {
        console.error("Login failed", err);
        
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Terjadi kesalahan saat proses login",
        });
        
        navigate("/login");
      }
    }

    handleLoginSuccess();
  }, [navigate, token]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-semibold">Memproses login...</p>
      </div>
    </div>
  );
}