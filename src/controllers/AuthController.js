import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Tambahkan token otomatis di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      // Bisa redirect ke login kalau mau
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const extractErrorMessage = (err, fallback = "Terjadi kesalahan.") => {
  if (err.response?.data?.errors) {
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
   * REGISTER - Hanya email
   */
  register: async ({ email }) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/register", { email });
      set({ loading: false });
      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal melakukan registrasi.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * VERIFY CODE
   */
  verifyCode: async (email, code) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/verify-code", { email, code });
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
      const res = await api.post("/auth/resend-verification-code", { email });
      set({ loading: false });
      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal mengirim kode verifikasi.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * LOGIN
   */
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/login", { email, password });

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
   * LOGIN SUCCESS (setelah callback Google atau token URL)
   */
  loginSuccess: async (token) => {
    localStorage.setItem("authToken", token);
    try {
      const res = await api.get("/auth/profile");
      const userData = res.data?.user || res.data;
      set({
        user: userData,
        isLoggedIn: true,
        error: null,
      });
      return userData;
    } catch (err) {
      localStorage.removeItem("authToken");
      set({ user: null, isLoggedIn: false, error: "Gagal memuat profil." });
      console.error(err);
      throw new Error("Gagal memuat profil.");
    }
  },

  /**
   * SETUP PROFILE
   */
  setupProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/setup-profile", {
        name: data.name,
        password: data.password,
        password_confirmation: data.password,
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
   * UPDATE PROFILE
   */
  updateProfile: async (formData) => {
  set({ loading: true, error: null });
  try {
    const res = await api.post("/auth/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    set({ user: res.data.user, loading: false });
    return res.data;
  } catch (err) {
    const errorMsg = extractErrorMessage(err, "Gagal update profil.");
    set({ error: errorMsg, loading: false });
    throw new Error(errorMsg);
  }
},


  /**
   * UPLOAD AVATAR
   */
  uploadAvatar: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/upload-avatar", formData);
      set({ user: res.data.user, loading: false });
      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal upload avatar.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * DELETE AVATAR
   */
  deleteAvatar: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete("/auth/avatar");
      set({ user: res.data.user, loading: false });
      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal menghapus avatar.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * CHANGE PASSWORD
   */
  changePassword: async (currentPassword, newPassword, newPasswordConfirmation) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation ?? newPassword,
      });

      set({ loading: false });
      return true;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal mengganti password.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * LOGOUT
   */
  logout: async () => {
    try {
      await api.post("/auth/logout");
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

      const res = await api.get("/auth/profile");
      const userData = res.data?.user || res.data;
      set({ user: userData, isLoggedIn: true, error: null });
    } catch (err) {
        console.error("An error occurred:", err);
        localStorage.removeItem("authToken");
        set({ user: null, isLoggedIn: false });
      }
  },

  /**
   * INIT AUTH
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
