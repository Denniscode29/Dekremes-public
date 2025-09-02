import axios from "axios";
import { create } from "zustand";
import Swal from "sweetalert2";

// PERBAIKI URL UNTUK MENYERTAKAN VERSIONING /V1
const baseUrl = `${import.meta.env.VITE_API_URL}/V1`;

// Cek dan parse data user dari localStorage
const savedToken = localStorage.getItem("token");
const savedUserRaw = localStorage.getItem("user");
let savedUser = null;

try {
  savedUser = savedUserRaw && savedUserRaw !== "undefined" 
    ? JSON.parse(savedUserRaw) 
    : null;
} catch (error) {
  console.error("Error parsing saved user:", error);
  localStorage.removeItem("user");
}

// Setup axios default configuration
axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Tetap base URL tanpa /V1
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Tambahkan interceptor untuk request
axios.interceptors.request.use(
  (config) => {
    console.log("Request URL:", config.url); // Debugging
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tambahkan interceptor untuk response
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("Network error - backend may be down");
      Swal.fire({
        icon: "error",
        title: "Koneksi Error",
        text: "Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.",
      });
    } else if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_status");
    }
    return Promise.reject(error);
  }
);

const AuthController = create((set) => ({
  user: savedUser,  
  token: savedToken || null,
  error: null,
  isLoggedIn: !!savedToken,
  isLoading: false,

  setUser: (user) => set(() => ({ user })),

  refreshUserStatus: async () => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem("token");
      
      if (!token) {
        set({ isLoggedIn: false, user: null, isLoading: false });
        return;
      }

      const res = await axios.get(`${baseUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = res.data;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("user_status", userData.status || "");
      set({ user: userData, isLoggedIn: true, error: null });
    } catch (err) {
      console.error("Gagal memperbarui status user:", err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_status");
      }
      
      set({ isLoggedIn: false, user: null, error: err.response?.data?.message || "Gagal memuat data user" });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password, navigate) => {
    try {
      set({ isLoading: true, error: null });
      
      // PERBAIKI URL LENGKAP DENGAN /V1/auth2/login
      const res = await axios.post(`${baseUrl}/auth2/login`, {
        email,
        password,
      });
      
      const { token, user } = res.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user_status", user.status || "");
      
      set({ token, user, error: null, isLoggedIn: true });
      
      if (navigate && typeof navigate === "function") {
        navigate("/");
      }
      
      return { success: true, user };
    } catch (err) {
      console.error("Login error:", err);
      
      let errorMessage = "Terjadi kesalahan saat login";
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        errorMessage = Object.values(errors)[0] || errorMessage;
      }
      
      set({ error: errorMessage, isLoggedIn: false });
      
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: errorMessage,
      });
      
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_status");
    
    set({ user: null, token: null, isLoggedIn: false, error: null });
    
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  },

  register: async (data, navigate) => {
    try {
      set({ isLoading: true, error: null });
      
      console.log("Mencoba register dengan URL:", `${baseUrl}/auth2/register`);
      
      // PERBAIKI URL LENGKAP DENGAN /V1/auth2/register
      const res = await axios.post(`${baseUrl}/auth2/register`, data);
      console.log("Response register:", res.data);
      
      const user = res.data.user;
      
      set({ user, error: null });
      
      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil",
        text: "Silakan login dengan akun Anda",
      });
      
      if (navigate && typeof navigate === "function") {
        navigate("/login");
      }
      
      return { success: true, user };
    } catch (err) {
      console.error("Registration error details:", err);
      console.error("Error response:", err.response?.data);
      
      let errorMsg = "Terjadi kesalahan saat register";
      
      if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
        errorMsg = "Tidak dapat terhubung ke server. Pastikan backend Laravel berjalan.";
      } else if (err.response?.status === 422 && err.response?.data?.errors) {
        const errors = err.response.data.errors;
        errorMsg = Object.values(errors)[0][0] || errorMsg;
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.response?.status === 500) {
        errorMsg = "Error server internal. Silakan coba lagi nanti.";
      }
      
      set({ error: errorMsg });
      
      Swal.fire({
        icon: "error",
        title: "Gagal Register",
        text: errorMsg,
      });
      
      throw new Error(errorMsg);
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default AuthController;