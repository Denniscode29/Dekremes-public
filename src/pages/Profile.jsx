// src/pages/Profile.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";
import { FaEye, FaEyeSlash, FaStar, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import api from "../api/api";
import Swal from "sweetalert2";

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

  // State untuk status testimoni
  const [testimonialStatus, setTestimonialStatus] = useState(null);
  const [testimonialMessage, setTestimonialMessage] = useState(null);
  const [testimonialData, setTestimonialData] = useState(null);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  // Fungsi untuk memeriksa status testimoni
  const checkTestimonialStatus = async () => {
    try {
      const response = await api.get("/testimonials/check");
      const data = response.data;
      
      setTestimonialStatus(data.testimonialStatus);
      setTestimonialData(data.testimonial);
      setHasNewNotification(data.hasNewNotification);
      
      if (data.hasNewNotification && data.notificationMessage) {
        setTestimonialMessage(data.notificationMessage);
        
        // Tampilkan notifikasi jika ada yang baru
        if (data.hasNewNotification && !localStorage.getItem(`profile_notification_shown_${data.testimonial?.id}`)) {
          Swal.fire({
            icon: getNotificationIcon(data.testimonialStatus),
            title: getNotificationTitle(data.testimonialStatus),
            text: data.notificationMessage,
            timer: 5000,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            customClass: {
              popup: 'rounded-2xl shadow-2xl'
            }
          });
          
          if (data.testimonial?.id) {
            localStorage.setItem(`profile_notification_shown_${data.testimonial.id}`, 'true');
          }
        }
      } else {
        setTestimonialMessage(null);
      }
    } catch (error) {
      console.error("Error checking testimonial status:", error);
    }
  };

  // Helper functions untuk notifikasi
  const getNotificationIcon = (status) => {
    switch (status) {
      case 'Disetujui': return 'success';
      case 'Ditolak': return 'error';
      case 'Menunggu': return 'info';
      default: return 'info';
    }
  };

  const getNotificationTitle = (status) => {
    switch (status) {
      case 'Disetujui': return 'Testimoni Disetujui! 🎉';
      case 'Ditolak': return 'Testimoni Ditolak';
      case 'Menunggu': return 'Testimoni Dikirim';
      default: return 'Status Testimoni';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Disetujui': return <FaCheckCircle className="text-green-500" />;
      case 'Ditolak': return <FaTimesCircle className="text-red-500" />;
      case 'Menunggu': return <FaClock className="text-yellow-500" />;
      default: return <FaStar className="text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disetujui': return 'bg-green-100 text-green-800 border-green-200';
      case 'Ditolak': return 'bg-red-100 text-red-800 border-red-200';
      case 'Menunggu': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    refreshUserStatus();
    checkTestimonialStatus();

    // Setup polling setiap 30 detik
    const interval = setInterval(() => {
      checkTestimonialStatus();
    }, 30000);

    return () => clearInterval(interval);
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

    if (!file.type.startsWith("image/")) {
      setMessage({ text: "File harus berupa gambar", type: "error" });
      return;
    }

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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("name", name);
      
      if (newPassword) {
        formData.append("password", newPassword);
        formData.append("password_confirmation", confirmPassword);
      }
      
      if (avatar && avatar instanceof File) {
        formData.append("avatar", avatar);
      } 

      const res = await updateProfile(formData);
      setMessage({ text: res?.message || "Profil berhasil diperbarui", type: "success" });
      
      await refreshUserStatus();
      
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
      
      await refreshUserStatus();
      
      setAvatarPreview(res?.user?.avatar_url || defaultProfile);
    } catch (error) {
      const errMsg = error?.response?.data?.message || error.message || "Gagal menghapus avatar";
      setMessage({ text: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await api.post("/testimonials/mark-notified");
      setHasNewNotification(false);
      setTestimonialMessage(null);
      Swal.fire({
        icon: 'success',
        title: 'Notifikasi ditandai sudah dibaca',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded-lg shadow-sm hover:bg-gray-50 transition mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
          <p className="text-gray-600 mt-2">Kelola informasi profil dan lihat status testimoni Anda</p>
        </div>

        {/* Status Testimoni Section */}
        {testimonialStatus && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-l-[#B80002]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FaStar className="text-yellow-500 mr-2" />
                Status Testimoni
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(testimonialStatus)} flex items-center`}>
                {getStatusIcon(testimonialStatus)}
                <span className="ml-1">{testimonialStatus}</span>
              </span>
            </div>

            {testimonialData && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Rating: {testimonialData.rating}/5</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{testimonialData.content}</p>
                  </div>
                  {testimonialData.product_photo_url && (
                    <img 
                      src={testimonialData.product_photo_url} 
                      alt="Product" 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Dikirim pada: {new Date(testimonialData.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>
            )}

            {testimonialMessage && (
              <div className={`p-4 rounded-lg mb-4 ${
                testimonialStatus === 'Disetujui' ? 'bg-green-50 border border-green-200' :
                testimonialStatus === 'Ditolak' ? 'bg-red-50 border border-red-200' :
                'bg-yellow-50 border border-yellow-200'
              }`}>
                <div className="flex items-start">
                  {getStatusIcon(testimonialStatus)}
                  <div className="ml-3 flex-1">
                    <p className={`text-sm font-medium ${
                      testimonialStatus === 'Disetujui' ? 'text-green-800' :
                      testimonialStatus === 'Ditolak' ? 'text-red-800' :
                      'text-yellow-800'
                    }`}>
                      {testimonialMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/testimoni")}
                className="flex-1 bg-[#B80002] text-white py-2 px-4 rounded-lg hover:bg-[#A00002] transition font-semibold text-center"
              >
                Lihat Testimoni
              </button>
              {hasNewNotification && (
                <button
                  onClick={handleMarkAsRead}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
                >
                  Tandai Dibaca
                </button>
              )}
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {message.text && (
            <div className={`m-6 p-4 rounded-lg ${
              message.type === "success" 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-red-100 text-red-800 border border-red-200"
            }`}>
              {message.text}
            </div>
          )}

          {!isEditing && !isChangingPassword ? (
            /* View Mode */
            <div className="p-8">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl object-cover"
                  />
                  <div className="absolute inset-0 rounded-full shadow-inner"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-600 mb-2">{user?.email}</p>
                <p className="text-sm text-gray-500">Bergabung sejak {new Date(user?.created_at).toLocaleDateString('id-ID')}</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="py-3 px-6 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white rounded-lg shadow-md hover:from-[#A00002] hover:to-[#C00002] transition transform hover:-translate-y-0.5 font-semibold flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profil
                  </button>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="py-3 px-6 bg-white text-gray-800 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition transform hover:-translate-y-0.5 font-semibold flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Ganti Password
                  </button>
                </div>
              </div>
            </div>
          ) : isEditing ? (
            /* Edit Mode */
            <form onSubmit={handleProfileUpdate} className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Edit Profil</h2>

              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <img
                    src={avatarPreview}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                  />
                  <div className="absolute right-0 bottom-0 flex space-x-2">
                    <button
                      type="button"
                      onClick={triggerAvatarSelect}
                      className="bg-[#B80002] text-white p-3 rounded-full shadow-lg hover:bg-[#A00002] transition transform hover:scale-110"
                      title="Ganti avatar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
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
                <p className="text-sm text-gray-500 mt-3">Klik ikon kamera untuk mengganti foto profil</p>
              </div>

              <div className="space-y-6">
                <div>
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

                <div>
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
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-200 transition font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white rounded-lg shadow-md hover:from-[#A00002] hover:to-[#C00002] transition font-semibold disabled:opacity-50 flex items-center justify-center"
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
            /* Password Change Mode */
            <form onSubmit={handlePasswordChange} className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ganti Password</h2>

              <div className="space-y-6">
                <div>
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

                <div>
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

                <div>
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
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-200 transition font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white rounded-lg shadow-md hover:from-[#A00002] hover:to-[#C00002] transition font-semibold disabled:opacity-50 flex items-center justify-center"
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
    </div>
  );
}

export default Profile;