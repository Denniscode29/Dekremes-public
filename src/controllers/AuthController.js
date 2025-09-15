// src/controllers/AuthController.js
import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/V1`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const AuthController = create((set) => ({
  user: null,
  isLoggedIn: false,
  error: null,
  loading: false,

  register: async (form) => {
    set({ loading: true, error: null });
    try {
      const headers = form instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined;
      const res = await api.post("/auth/register", form, { headers });
      if (res.data?.access_token) {
        localStorage.setItem("token", res.data.access_token);
      }
      set({ loading: false, user: res.data.user, isLoggedIn: true });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Terjadi kesalahan",
        loading: false,
      });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data?.access_token) {
        localStorage.setItem("token", res.data.access_token);
      }

      set({
        user: res.data.user,
        isLoggedIn: true,
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

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout error (ignored):", err);
    }
    localStorage.removeItem("token");
    set({ user: null, isLoggedIn: false });
    return true;
  },

  refreshUserStatus: async () => {
    try {
      const res = await api.get("/auth/profile");
      set({ user: res.data.user, isLoggedIn: true });
    } catch (err) {
      console.error("Gagal memperbarui status user:", err);
      set({ user: null, isLoggedIn: false });
    }
  },

  // PERBAIKAN: Jangan hapus header Content-Type untuk FormData
  updateProfile: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/update-profile", formData);
      set({
        user: res.data.user,
        loading: false,
      });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Terjadi kesalahan",
        loading: false,
      });
      throw err;
    }
  },

  uploadAvatar: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/upload-avatar", formData);
      set({ user: res.data.user, loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Gagal upload avatar", loading: false });
      throw err;
    }
  },

  deleteAvatar: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete("/auth/avatar");
      set({ user: res.data.user, loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Gagal menghapus avatar", loading: false });
      throw err;
    }
  },

  changePassword: async (currentPassword, newPassword, newPasswordConfirmation) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation ?? newPassword
      });

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
}));

export default AuthController;