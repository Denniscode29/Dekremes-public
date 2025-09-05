// controllers/AuthController.js
import axios from "axios";
import { create } from "zustand";

const baseUrl = import.meta.env.VITE_API_URL;

// Ambil data tersimpan di localStorage (jaga supaya tidak error)
const savedToken = localStorage.getItem("token");
const savedUserRaw = localStorage.getItem("user");
const savedUser =
  savedUserRaw && savedUserRaw !== "undefined"
    ? JSON.parse(savedUserRaw)
    : null;

// Zustand store untuk authentication
const AuthController = create((set) => ({
  user: savedUser,
  token: savedToken || null,
  error: null,

  // ✅ status login
  isLoggedIn: !!savedToken && !!savedUser,

  // set user manual
  setUser: (user) => set(() => ({ user })),

  // refresh status user dari backend
  refreshUserStatus: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${baseUrl}/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user_status", user.status);
      set({ user, isLoggedIn: true });
    } catch (err) {
      console.error("❌ Gagal memperbarui status user:", err);
      set({ user: null, token: null, isLoggedIn: false });
    }
  },

  // login user
  login: async (email, password, navigate) => {
    try {
      const res = await axios.post(`${baseUrl}/v1/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      // simpan ke state + localStorage
      set({ token, user, error: null, isLoggedIn: true });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user_status", user.status);

      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Terjadi kesalahan";
      set({ error: errorMsg });
      throw err;
    }
  },

  // logout user
  logout: () => {
    set({ user: null, token: null, isLoggedIn: false });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_status");
  },

  // register user baru
  register: async (data, navigate) => {
    try {
      const res = await axios.post(`${baseUrl}/v1/auth/register`, data);

      const user = res.data.user;
      set({ user, error: null, isLoggedIn: false }); // belum login otomatis
      navigate("/login");
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.errors?.password?.[0] ||
        err.response?.data?.message ||
        "Terjadi kesalahan saat register";

      console.error("❌ Register error:", err);
      set({ error: errorMsg });
    }
  },
}));

export default AuthController;
