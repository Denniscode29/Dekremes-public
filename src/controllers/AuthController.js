import { create } from "zustand";
import axios from "axios";

// Setup axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Tambahkan token otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper untuk ekstrak pesan error dari response
const extractErrorMessage = (err, fallback = "Terjadi kesalahan.") => {
  if (err.response?.data?.errors) {
    // Ambil error pertama dari Laravel validation
    const errors = err.response.data.errors;
    const firstKey = Object.keys(errors)[0];
    return errors[firstKey]?.[0] || fallback;
  }
  return err.response?.data?.message || err.message || fallback;
};

const AuthController = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  error: null,
  loading: false,

  /**
   * REGISTER - Hanya menerima email
   */
  register: async ({ email }) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/v1/auth/register", { email });
      set({ loading: false });
      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal melakukan registrasi.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * VERIFY CODE - setelah register
   */
  verifyCode: async (email, code) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/v1/auth/verify-code", { email, code });
      if (res.data?.access_token) {
        localStorage.setItem("authToken", res.data.access_token);
      }
      set({ loading: false });
      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Kode verifikasi salah.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * RESEND VERIFICATION CODE
   */
  resendVerificationCode: async (email) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/v1/auth/resend-verification-code", { email });
      set({ loading: false });
      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal mengirim kode verifikasi.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * LOGIN - Untuk user yang sudah lengkap profilnya
   */
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/v1/auth/login", { email, password });

      if (res.data?.access_token) {
        localStorage.setItem("authToken", res.data.access_token);
        set({
          user: res.data.user,
          isLoggedIn: true,
          loading: false,
        });
      }

      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Email atau password salah.");
      set({ error: errorMsg, loading: false });

      // Handle setup profile required
      if (err.response?.data?.requires_setup) {
        if (err.response?.data?.access_token) {
          localStorage.setItem("authToken", err.response.data.access_token);
        }
        throw {
          message: errorMsg,
          requires_setup: true,
          access_token: err.response.data.access_token,
        };
      }

      // Handle verification required
      if (err.response?.data?.requires_verification) {
        throw {
          message: errorMsg,
          requires_verification: true,
          email: err.response.data.email,
        };
      }

      throw new Error(errorMsg);
    }
  },

  /**
   * LOGIN VIA GOOGLE
   */
  loginWithGoogle: () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/google/redirect`;
  },

  /**
   * LOGIN SUCCESS - setelah callback dari Google atau token dari URL
   */
  loginSuccess: async (token) => {
    localStorage.setItem("authToken", token);
    try {
      const res = await api.get("/api/v1/auth/profile");
      const userData = res.data?.user || res.data;
      set({
        user: userData,
        isLoggedIn: true,
        error: null,
      });
      return userData;
    } catch (err) {
      console.error("Login success error:", err);
      localStorage.removeItem("authToken");
      set({ user: null, isLoggedIn: false, error: "Gagal memuat profil." });
      throw new Error("Gagal memuat profil.");
    }
  },

  /**
   * SETUP PROFILE - input name dan password
   */
  setupProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/v1/auth/setup-profile", {
        name: data.name,
        password: data.password,
        password_confirmation: data.password, // untuk validasi confirmed
      });

      set({
        user: res.data.user,
        isLoggedIn: true,
        loading: false,
      });
      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal setup profil.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * LOGOUT
   */
  logout: async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch (err) {
      console.warn("Logout error (ignored):", err);
    }
    localStorage.removeItem("authToken");
    set({ user: null, isLoggedIn: false, error: null });
  },

  /**
   * REFRESH USER STATUS
   */
  refreshUserStatus: async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        set({ user: null, isLoggedIn: false });
        return;
      }

      const res = await api.get("/api/v1/auth/profile");
      const userData = res.data?.user || res.data;
      set({ user: userData, isLoggedIn: true, error: null });
    } catch (err) {
      console.error("refreshUserStatus error:", err);
      localStorage.removeItem("authToken");
      set({ user: null, isLoggedIn: false });
    }
  },

  /**
   * INIT AUTH - panggil saat app dimulai
   */
  initAuth: async () => {
    await get().refreshUserStatus();
  },

  /**
   * CLEAR ERROR
   */
  clearError: () => {
    set({ error: null });
  },
}));

export default AuthController;
