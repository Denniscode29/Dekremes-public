import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// PERBAIKAN: Hapus interceptor token otomatis untuk endpoint setup-profile
api.interceptors.request.use((config) => {
  // Jangan tambahkan token untuk endpoint pendaftaran dan setup-profile
  const noTokenEndpoints = [
    '/auth/register',
    '/auth/verify-code', 
    '/auth/resend-verification-code',
    '/auth/check-registration-status',
    '/auth/setup-profile' // TAMBAHKAN INI
  ];
  
  const requiresToken = !noTokenEndpoints.some(endpoint => 
    config.url.includes(endpoint)
  );
  
  if (requiresToken) {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event('storage'));
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
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoggedIn: !!localStorage.getItem("authToken"),
  error: null,
  loading: false,

  /**
   * CHECK REGISTRATION STATUS
   */
  checkRegistrationStatus: async (email) => {
    try {
      const res = await api.post("/auth/check-registration-status", { email });
      return res.data;
    } catch (err) {
      console.error("Check registration status error:", err);
      return {
        exists: false,
        verified: false,
        profile_completed: false
      };
    }
  },

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
      throw err;
    }
  },

  /**
   * VERIFY CODE - PERBAIKAN: Jangan simpan token, hanya verifikasi
   */
  verifyCode: async (email, code) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/verify-code", { email, code });
      
      // PERBAIKAN: Hanya return data tanpa menyimpan token
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
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
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

      // Handle special cases
      if (err.response?.data) {
        const responseData = err.response.data;
        
        if (responseData.requires_setup) {
          if (responseData.access_token) {
            localStorage.setItem("authToken", responseData.access_token);
          }
          throw {
            message: responseData.message || errorMsg,
            requires_setup: true,
            access_token: responseData.access_token,
          };
        }

        if (responseData.requires_verification) {
          throw {
            message: responseData.message || errorMsg,
            requires_verification: true,
            email: responseData.email,
          };
        }
      }

      throw new Error(errorMsg);
    }
  },

  /**
   * SETUP PROFILE - PERBAIKAN: Kirim email bersama data, tanpa authentication
   */
  setupProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      // PERBAIKAN: Ambil email dari localStorage atau dari parameter
      const email = data.email || localStorage.getItem('temp_user_email');
      
      if (!email) {
        throw new Error("Email tidak ditemukan. Silakan daftar ulang.");
      }

      const res = await api.post("/auth/setup-profile", {
        email: email, // KIRIM EMAIL UNTUK IDENTIFIKASI
        name: data.name,
        password: data.password,
        password_confirmation: data.password_confirmation || data.password,
      });

      // PERBAIKAN: Jangan set login state, hanya return success
      set({ loading: false });
      return {
        success: true,
        message: res.data.message || "Profil berhasil dilengkapi! Silakan login.",
        user: res.data.user
      };
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal setup profil.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * LOGIN WITH GOOGLE ACCESS TOKEN (for mobile/JS SDK)
   */
  loginWithGoogle: async (accessToken) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/google/login", {
        access_token: accessToken
      });

      if (res.data?.access_token) {
        localStorage.setItem("authToken", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        set({
          user: res.data.user,
          isLoggedIn: true,
          loading: false,
        });
      }

      return res.data;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Login dengan Google gagal.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * HANDLE GOOGLE CALLBACK - Untuk OAuth redirect flow
   */
  handleGoogleCallback: (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    set({
      user: userData,
      isLoggedIn: true,
      error: null,
    });
    return { success: true, user: userData };
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
      
      // Update user data
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      set({ user: updatedUser, loading: false });
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
      const res = await api.post("/auth/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Update user data
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      set({ user: updatedUser, loading: false });
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
      
      // Update user data
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      set({ user: updatedUser, loading: false });
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
        new_password_confirmation: newPasswordConfirmation || newPassword,
      });

      set({ loading: false });
      return { success: true, message: "Password berhasil diubah" };
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
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      set({ 
        user: null, 
        isLoggedIn: false, 
        error: null,
        loading: false 
      });
    }
  },

  /**
   * GET USER PROFILE
   */
  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/auth/profile");
      const userData = res.data?.user || res.data;
      
      // Update stored user data
      localStorage.setItem("user", JSON.stringify(userData));
      set({ 
        user: userData, 
        isLoggedIn: true, 
        loading: false 
      });
      return userData;
    } catch (err) {
      const errorMsg = extractErrorMessage(err, "Gagal mengambil data profil.");
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  /**
   * REFRESH USER STATUS - Synchronous version
   */
  refreshUserStatus: () => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        set({ 
          user: userData, 
          isLoggedIn: true 
        });
        return userData;
      } catch (err) {
        console.error("Error parsing user data:", err);
        localStorage.removeItem("user");
        set({ user: null, isLoggedIn: false });
        return null;
      }
    } else {
      set({ user: null, isLoggedIn: false });
      return null;
    }
  },

  /**
   * INIT AUTH - Initialize auth state from localStorage
   */
  initAuth: () => {
    return get().refreshUserStatus();
  },

  /**
   * CLEAR ERROR
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * SET LOADING
   */
  setLoading: (loading) => {
    set({ loading });
  },
}));

export default AuthController;