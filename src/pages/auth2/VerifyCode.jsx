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
    
    if (resendCooldown > 0) return;
    
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
        startResendCooldown();
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
        className="absolute top-6 left-6 flex items-center gap-2 text-black hover:text-red-600 font-medium transition-colors duration-200"
      >
        <ArrowLeft size={20} /> Kembali
      </button>

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <ShieldCheck size={40} className="text-black" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-black mb-2">Verifikasi Email</h2>
          <div className="flex items-center justify-center gap-2 text-black mb-4">
            <Mail size={16} />
            <span className="text-sm">Kode dikirim ke: <strong className="text-black">{email}</strong></span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Input Kode */}
          <div className="space-y-3">
            <label htmlFor="verificationCode" className="block text-lg font-bold text-black text-center">
              MASUKKAN KODE VERIFIKASI
            </label>
            <div className="flex justify-center">
              <input 
                id="verificationCode"
                type="text" 
                value={code} 
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                placeholder="000000"
                className="w-48 px-4 py-4 text-center text-2xl font-mono border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white text-black"
                maxLength={6}
                required 
                autoComplete="one-time-code"
                inputMode="numeric"
              />
            </div>
            <p className="text-sm text-black text-center mt-2 font-medium">
              Masukkan 6 digit angka yang diterima via email
            </p>
          </div>
          
          {/* Tombol Verifikasi */}
          <button 
            type="submit" 
            disabled={loading || code.length !== 6} 
            className={`w-full py-3.5 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 ${
              loading || code.length !== 6
                ? "bg-gray-400 cursor-not-allowed text-black" 
                : "bg-red-600 hover:bg-red-700 text-white border-2 border-black"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Memverifikasi...
              </span>
            ) : (
              "VERIFIKASI"
            )}
          </button>
        </form>

        {/* Kirim Ulang */}
        <div className="text-center mt-8 pt-6 border-t border-black">
          <p className="text-sm text-black mb-3 font-medium">Tidak menerima kode?</p>
          <button 
            onClick={handleResend} 
            disabled={loading || resendCooldown > 0} 
            className={`font-bold text-black transition-colors duration-200 ${
              loading || resendCooldown > 0
                ? "text-gray-400 cursor-not-allowed"
                : "hover:text-red-600 hover:underline"
            }`}
          >
            {loading ? "Mengirim..." : 
             resendCooldown > 0 ? `Kirim ulang (${resendCooldown}s)` : "KIRIM ULANG KODE"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-black text-center">
          <p className="text-sm text-black font-medium">
            Sudah punya akun?{" "}
            <button 
              onClick={() => navigate("/login")} 
              className="text-red-600 hover:text-red-800 hover:underline font-bold transition-colors duration-200"
            >
              MASUK SEKARANG
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}