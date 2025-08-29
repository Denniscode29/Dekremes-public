import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = AuthController((state) => state.login);
  const error = AuthController((state) => state.error);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Login...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await login(email, password, navigate);
      Swal.fire({
        icon: "success",
        title: "Berhasil Login",
        text: "Selamat datang kembali",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text: err.response?.data?.message || "Email atau password salah",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
    style={{ backgroundColor: '#DC3545' }}>
      <div className="shadow-lg w-5xl grid-cols-1 md:rounded-3xl rounded-xl"
      style={{ backgroundColor: '#F8F9FA' }}>
        
        <div className="py-15 px-10">
          <h2 className="font-bold text-center text-4xl text-black">Login</h2>
          <form className="mt-5" onSubmit={handleLogin}>
            <div>
              <label className="text-black">Email</label>
              <label className="input validator w-full mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </label>
            </div>
            <div className="mt-3">
              <label className="text-black">Password</label>
              <label className="input validator w-full mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                  minLength={8}
                />
              </label>
            </div>
            <div className="mt-4">
              {error && <p className="text-red-600">{error}</p>}
            </div>
            <div className="mt-4">
              <button
              type="submit"
              className="text-white w-full"
              style={{
                backgroundColor: '#DC3545',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#DC3545')}
            >
              Login
            </button>
            </div>
            <div className="mt-2">
              <small className="text-black">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="w-fit"
                  style={{ color: '#DC3545' }}
                  onMouseEnter={(e) => (e.target.style.color = '#c82333')}
                  onMouseLeave={(e) => (e.target.style.color = '#DC3545')}
                >
                  Daftar sekarang
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;