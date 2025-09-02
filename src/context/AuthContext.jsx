import api from "../api"; // Import dari api.js
import { create } from "zustand";

const savedToken = localStorage.getItem("token");
const savedUserRaw = localStorage.getItem("user");
const savedUser =
  savedUserRaw && savedUserRaw !== "undefined"
    ? JSON.parse(savedUserRaw)
    : null;

const useAuthStore = create((set) => ({
  user: savedUser,
  token: savedToken || null,
  error: null,

  // Set user ke state
  setUser: (user) => set(() => ({ user })),

  // Refresh status user
  refreshUserStatus: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await api.get("V1/auth2/register", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user_status", user.status);
      set({ user });
    } catch (err) {
      console.error("Gagal memperbarui status user", err);
    }
  },

  // Login
  login: async (email, password, navigate) => {
    try {
      const res = await api.post("V1/auth2/login", { email, password });
      const { token, user } = res.data;

      set({ token, user, error: null });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user_status", user.status);

      navigate("/");
    } catch (err) {
      set({
        error:
          err.response?.data?.message ||
          "Terjadi kesalahan saat login, coba lagi.",
      });
      throw err;
    }
  },

  // Logout
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_status");
  },

  // Register
  register: async (data, navigate) => {
    try {
      const res = await api.post("V1/auth2/register", data);
      const user = res.data.user;

      set({ user, error: null });
      navigate("/login");
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.errors?.password?.[0] ||
        err.response?.data?.message ||
        "Terjadi kesalahan saat register";
      set({ error: errorMsg });
    }
  },
}));

export default useAuthStore;
