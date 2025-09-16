// src/pages/Profile.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Profile() {
  const user = AuthController((state) => state.user);
  const isLoggedIn = AuthController((state) => state.isLoggedIn);
  const updateProfile = AuthController((state) => state.updateProfile);
  const changePassword = AuthController((state) => state.changePassword);
  const refreshUserStatus = AuthController((state) => state.refreshUserStatus);
  const deleteAvatar = AuthController((state) => state.deleteAvatar);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(defaultProfile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    refreshUserStatus();
  }, [isLoggedIn, navigate, refreshUserStatus]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatar(null);
      setAvatarPreview(user.avatar_url || defaultProfile);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ text: "Ukuran file terlalu besar. Maksimal 2MB", type: "error" });
      return;
    }

    setAvatar(file);

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // PERBAIKAN: Menggunakan pendekatan dari kode yang berfungsi
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("name", name);
      
      // PERBAIKAN: Tambahkan password fields seperti pada kode yang berfungsi
      if (newPassword) {
        formData.append("password", newPassword);
        formData.append("password_confirmation", confirmPassword);
      }
      
      if (avatar instanceof File) {
        formData.append("avatar", avatar);
      }

      const res = await updateProfile(formData);
      setMessage({ text: res?.message || "Profil berhasil diperbarui", type: "success" });
      
      // Refresh data user setelah update
      await refreshUserStatus();
      
      // Reset password fields
      setNewPassword("");
      setConfirmPassword("");
      
      setTimeout(() => setIsEditing(false), 1200);
    } catch (error) {
      const errMsg = error?.response?.data?.message || error.message || "Gagal memperbarui profil";
      setMessage({ text: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (newPassword.length < 8) {
      setMessage({ text: "Password baru minimal 8 karakter", type: "error" });
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: "Password baru dan konfirmasi tidak cocok", type: "error" });
      setLoading(false);
      return;
    }

    try {
      await changePassword(oldPassword, newPassword, confirmPassword);
      setMessage({ text: "Password berhasil diubah", type: "success" });
      setTimeout(() => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsChangingPassword(false);
      }, 1200);
    } catch (error) {
      const errMsg = error?.response?.data?.message || error.message || "Gagal mengubah password";
      setMessage({ text: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const triggerAvatarSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteAvatar = async () => {
    if (!confirm("Yakin ingin menghapus avatar?")) return;
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await deleteAvatar();
      setMessage({ text: res?.message || "Avatar dihapus", type: "success" });
      
      // Refresh data user setelah hapus avatar
      await refreshUserStatus();
      
      setAvatarPreview(res?.user?.avatar_url || defaultProfile);
    } catch (error) {
      const errMsg = error?.response?.data?.message || error.message || "Gagal menghapus avatar";
      setMessage({ text: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={() => navigate("/")}
          className="absolute left-4 top-4 bg-gray-100 text-gray-800 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {message.text && (
          <div className={`mb-6 p-3 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
            {message.text}
          </div>
        )}

        {!isEditing && !isChangingPassword ? (
          <>
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={avatarPreview || defaultProfile}
                  alt="Profile"
                  className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute inset-0 rounded-full shadow-inner"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {user?.name || "User"}
              </h2>
              <p className="text-gray-600 mb-6">{user?.email}</p>

              <div className="mt-8 space-y-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white rounded-lg shadow-md hover:from-[#A00002] hover:to-[#C00002] transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#B80002] focus:ring-opacity-50 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profil
                </button>
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full py-3 px-4 bg-white text-gray-800 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Ganti Password
                </button>
              </div>
            </div>
          </>
        ) : isEditing ? (
          <form onSubmit={handleProfileUpdate}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profil</h2>

            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={avatarPreview || defaultProfile}
                  alt="Profile Preview"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute right-0 bottom-0 flex space-x-2">
                  <button
                    type="button"
                    onClick={triggerAvatarSelect}
                    className="bg-[#B80002] text-white p-2 rounded-full shadow-md hover:bg-[#A00002] transition"
                    title="Ganti avatar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAvatar}
                    className="bg-gray-100 text-gray-700 p-2 rounded-full shadow-sm hover:bg-gray-200 transition"
                    title="Hapus avatar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22" />
                    </svg>
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Klik ikon kamera untuk mengganti foto</p>
            </div>

            <div className="mb-5">
              <label className="block text-gray-800 font-medium mb-2" htmlFor="name">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B80002] focus:border-transparent transition text-gray-900 placeholder-gray-500"
                required
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2" htmlFor="email">
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                disabled
              />
              <p className="text-sm text-gray-500 mt-2">Email tidak dapat diubah</p>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white rounded-lg shadow-md hover:from-[#A00002] hover:to-[#C00002] transition focus:outline-none focus:ring-2 focus:ring-[#B80002] disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    </svg>
                    Menyimpan...
                  </>
                ) : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordChange}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ganti Password</h2>

            <div className="mb-5">
              <label className="block text-gray-800 font-medium mb-2" htmlFor="oldPassword">
                Password Lama
              </label>
              <div className="relative">
                <input
                  id="oldPassword"
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B80002] focus:border-transparent transition pr-10 text-gray-900 placeholder-gray-500"
                  required
                  placeholder="Masukkan password lama"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-gray-800 font-medium mb-2" htmlFor="newPassword">
                Password Baru
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B80002] focus:border-transparent transition pr-10 text-gray-900 placeholder-gray-500"
                  required
                  minLength={8}
                  placeholder="Masukkan password baru (min. 8 karakter)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2" htmlFor="confirmPassword">
                Konfirmasi Password Baru
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B80002] focus:border-transparent transition pr-10 text-gray-900 placeholder-gray-500"
                  required
                  minLength={8}
                  placeholder="Konfirmasi password baru"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white rounded-lg shadow-md hover:from-[#A00002] hover:to-[#C00002] transition focus:outline-none focus:ring-2 focus:ring-[#B80002] disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    </svg>
                    Mengubah...
                  </>
                ) : "Ubah Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;