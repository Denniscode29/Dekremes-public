import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController.js";
import Swal from "sweetalert2";
import educator from "../../assets/undraw_personal-information_h7kf.svg";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, loginWithGoogle } = AuthController();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      if (result.success) {
        Swal.fire({ 
          icon: "success", 
          title: "Berhasil Login", 
          text: result.message,
          timer: 2000,
          showConfirmButton: false
        });
        
        // Login berhasil, redirect ke halaman utama
        navigate("/");
      }
    } catch (err) {
      // Handle setup profile required
      if (err.requires_setup) {
        Swal.fire({ 
          icon: "info", 
          title: "Profil Belum Lengkap", 
          text: "Silakan lengkapi profil Anda terlebih dahulu.",
          timer: 2000,
          showConfirmButton: false
        });
        navigate("/setup-profile");
      } 
      // Handle verification required
      else if (err.requires_verification) {
        Swal.fire({ 
          icon: "warning", 
          title: "Email Belum Terverifikasi", 
          text: err.message,
          showCancelButton: true,
          confirmButtonText: "Verifikasi Sekarang",
          cancelButtonText: "Batal"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/verify-code", { state: { email: err.email } });
          }
        });
      } 
      // Error biasa (wrong credentials, etc)
      else {
        Swal.fire({ 
          icon: "error", 
          title: "Gagal Login", 
          text: err.message || error || "Email atau password salah" 
        });
      }
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5CC] p-4 relative">
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-6 left-6 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md text-gray-700 hover:text-red-600 font-medium transition-all hover:shadow-lg"
      >
        <ArrowLeft size={20} /> Kembali
      </button>

      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center p-8">
          <img 
            src={educator} 
            alt="Educator" 
            className="w-64 h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" 
          />
          <h2 className="text-white text-2xl font-semibold mt-6 text-center">
            Selamat Datang Kembali!
          </h2>
          <p className="text-white/80 text-sm mt-2 text-center px-4">
            Masuk ke akun Anda dan lanjutkan aktivitas Anda.
          </p>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">Masuk</h2>
          
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="relative">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700 text-gray-900" 
                required 
              />
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-700 transition-all">
                Email
              </label>
            </div>
            
            <div className="relative">
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700 text-gray-900" 
                required 
                minLength={8} 
              />
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-700 transition-all">
                Password
              </label>
            </div>
            
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            
            <button 
              type="submit" 
              disabled={loading} 
              className={`w-full py-3 rounded-lg font-semibold shadow-md transition ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed text-white" 
                  : "bg-[#B80002] hover:bg-[#8F0002] text-white"
              }`}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Atau masuk dengan</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin} 
            className="w-full flex items-center justify-center py-3 rounded-lg font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition shadow-md"
          >
            <img 
              src="https://www.svgrepo.com/show/355037/google.svg" 
              alt="Google logo" 
              className="w-5 h-5 mr-2" 
            /> 
            Google
          </button>

          <p className="mt-6 text-center text-gray-600">
            Belum punya akun? 
            <Link to="/register" className="text-blue-600 font-semibold hover:underline ml-1">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}