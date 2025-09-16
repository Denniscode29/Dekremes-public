import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController.js";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const { verifyCode, resendVerificationCode } = AuthController();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      Swal.fire({ 
        icon: "error", 
        title: "Kode tidak lengkap", 
        text: "Masukkan 6 digit kode verifikasi." 
      });
      return;
    }
    
    setLoading(true);
    try {
      const result = await verifyCode(email, code);
      
      if (result.success) {
        Swal.fire({ 
          icon: "success", 
          title: "Email Terverifikasi", 
          text: result.message,
          timer: 2000,
          showConfirmButton: false
        });
        
        // Redirect ke setup profile setelah verifikasi berhasil
        navigate("/setup-profile");
      }
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Gagal Verifikasi", 
        text: err.message || "Kode salah atau kadaluarsa." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: "Email tidak ditemukan. Silakan registrasi ulang." 
      });
      navigate("/register");
      return;
    }
    
    setLoading(true);
    try {
      const result = await resendVerificationCode(email);
      if (result.success) {
        Swal.fire({ 
          icon: "success", 
          title: "Kode Terkirim", 
          text: result.message,
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Gagal Mengirim Kode", 
        text: err.message || "Silakan coba lagi." 
      });
    } finally {
      setLoading(false);
    }
  };

  // Jika tidak ada email, redirect ke register
  if (!email) {
    Swal.fire({
      icon: "error",
      title: "Email tidak ditemukan",
      text: "Silakan registrasi terlebih dahulu."
    });
    navigate("/register");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5CC] p-4 relative">
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium"
      >
        <ArrowLeft size={20} /> Kembali
      </button>

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Verifikasi Email</h2>
        <p className="text-gray-600 mb-4 text-center">
          Masukkan kode verifikasi yang dikirim ke{" "}
          <span className="font-medium text-blue-600">{email}</span>
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="text-center">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} 
              placeholder="000000"
              className="w-32 px-4 py-3 text-center text-2xl font-mono border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" 
              maxLength={6}
              required 
            />
            <p className="text-sm text-gray-500 mt-2">Masukkan 6 digit kode verifikasi</p>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || code.length !== 6} 
            className={`w-full py-3 rounded-lg font-semibold shadow-md transition ${
              loading || code.length !== 6
                ? "bg-gray-400 cursor-not-allowed text-white" 
                : "bg-[#B80002] hover:bg-[#8F0002] text-white"
            }`}
          >
            {loading ? "Memverifikasi..." : "Verifikasi"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-2">Tidak menerima kode?</p>
          <button 
            onClick={handleResend} 
            disabled={loading} 
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium disabled:text-gray-400"
          >
            {loading ? "Mengirim..." : "Kirim ulang kode"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <button 
              onClick={() => navigate("/login")} 
              className="text-blue-600 hover:underline font-medium"
            >
              Masuk sekarang
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}