import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor untuk token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AuthController = create((set) => ({
  user: null,
  isLoggedIn: false, // ✅ tambahkan flag ini
  error: null,
  loading: false,

  // === REGISTER ===
  register: async (form) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/register", form);
      set({ loading: false });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Terjadi kesalahan",
        loading: false,
      });
      throw err;
    }
  },

  // === LOGIN ===
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data?.access_token) {
        localStorage.setItem("token", res.data.access_token);
      }

      set({
        user: res.data.user,
        isLoggedIn: true, // ✅ update status login
        loading: false,
      });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Email atau password salah",
        loading: false,
      });
      throw err;
    }
  },

  // === LOGOUT ===
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout error (ignored):", err);
    }
    localStorage.removeItem("token");
    set({ user: null, isLoggedIn: false }); // ✅ reset status
    return true;
  },

  // === REFRESH USER STATUS ===
  refreshUserStatus: async () => {
    try {
      const res = await api.get("/auth/profile");
      set({ user: res.data, isLoggedIn: true }); // ✅ login kalau token valid
    } catch (err) {
      console.error("Gagal memperbarui status user:", err);
      set({ user: null, isLoggedIn: false });
    }
  },
}));

export default AuthController;
