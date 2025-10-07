// src/pages/Profile.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";
import { FaEye, FaEyeSlash, FaStar, FaCheckCircle, FaTimesCircle, FaClock, FaExpand, FaTimes, FaCamera, FaEdit, FaKey, FaHome } from "react-icons/fa";
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

  // State untuk modal zoom foto
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  // Fungsi untuk membuka modal zoom foto
  const openImageModal = (imageUrl) => {
    setModalImage(imageUrl);
    setShowImageModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  // Fungsi untuk menutup modal
  const closeImageModal = () => {
    setShowImageModal(false);
    setModalImage("");
    document.body.style.overflow = 'auto'; // Restore scroll
  };

  // Handle klik di luar modal untuk menutup
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeImageModal();
    }
  };

  // Keyboard event untuk menutup modal dengan ESC
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.keyCode === 27 && showImageModal) {
        closeImageModal();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [showImageModal]);

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
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 px-4 sm:px-6 lg:px-8">
      {/* Spasi atas untuk menghindari ketutupan navbar */}
      <div className="h-20"></div>
      
      {/* Modal untuk Zoom Foto */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={handleModalClick}
        >
          <div className="relative max-w-4xl max-h-full w-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-4 -right-4 z-10 bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-all duration-200 shadow-2xl transform hover:scale-110"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <img
              src={modalImage}
              alt="Preview Full"
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-scaleIn"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              Klik di luar gambar untuk menutup
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto pb-8">
        {/* Header yang lebih baik dengan tombol kembali yang tidak tertutup navbar */}
        <div className="text-center mb-8 relative">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 mb-6 border border-white/20 hover:scale-105 group"
          >
            <FaHome className="w-4 h-4 mr-3 text-[#B80002] group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Kembali ke Beranda</span>
          </button>
          
          <div className="bg-gradient-to-r from-[#B80002] to-[#D90003] bg-clip-text text-transparent">
            <h1 className="text-4xl font-bold mb-3">Profil Saya</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Kelola informasi profil Anda dan pantau status testimoni dengan mudah
          </p>
        </div>

        {/* Status Testimoni Section yang lebih menarik */}
        {testimonialStatus && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 mb-8 border border-white/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B80002]/5 to-transparent rounded-bl-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <FaStar className="text-white text-xl" />
                  </div>
                  Status Testimoni Anda
                </h2>
                <span className={`px-4 py-2 rounded-2xl text-sm font-semibold ${getStatusColor(testimonialStatus)} border-2 flex items-center shadow-lg`}>
                  {getStatusIcon(testimonialStatus)}
                  <span className="ml-2">{testimonialStatus}</span>
                </span>
              </div>

              {testimonialData && (
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i}
                              className={`text-xl ${
                                i < testimonialData.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-3 font-semibold text-gray-900">{testimonialData.rating}/5</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{testimonialData.content}</p>
                    </div>
                    {testimonialData.product_photo_url && (
                      <div className="mt-4 md:mt-0 md:ml-6 relative">
                        <img 
                          src={testimonialData.product_photo_url} 
                          alt="Product" 
                          className="w-20 h-20 rounded-xl object-cover shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                          onClick={() => openImageModal(testimonialData.product_photo_url)}
                        />
                        <div className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                          <FaExpand className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-4 flex items-center">
                    <FaClock className="w-3 h-3 mr-2" />
                    Dikirim pada: {new Date(testimonialData.created_at).toLocaleDateString('id-ID', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {testimonialMessage && (
                <div className={`p-5 rounded-2xl mb-6 border-l-4 ${
                  testimonialStatus === 'Disetujui' ? 'bg-green-50 border-green-400' :
                  testimonialStatus === 'Ditolak' ? 'bg-red-50 border-red-400' :
                  'bg-yellow-50 border-yellow-400'
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(testimonialStatus)}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className={`text-sm font-semibold ${
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

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/testimoni")}
                  className="flex-1 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white py-4 px-6 rounded-2xl hover:from-[#A00002] hover:to-[#C00002] transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <FaStar className="w-5 h-5 mr-3" />
                  Lihat Halaman Testimoni
                </button>
                {hasNewNotification && (
                  <button
                    onClick={handleMarkAsRead}
                    className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    <FaCheckCircle className="w-5 h-5 mr-3" />
                    Tandai Dibaca
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Profile Card yang lebih modern */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {message.text && (
            <div className={`m-6 p-4 rounded-2xl ${
              message.type === "success" 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-red-100 text-red-800 border border-red-200"
            }`}>
              <div className="flex items-center">
                {message.type === "success" ? (
                  <FaCheckCircle className="w-5 h-5 mr-3 text-green-500" />
                ) : (
                  <FaTimesCircle className="w-5 h-5 mr-3 text-red-500" />
                )}
                <span>{message.text}</span>
              </div>
            </div>
          )}

          {!isEditing && !isChangingPassword ? (
            /* View Mode - Desain Lebih Modern */
            <div className="p-8">
              <div className="text-center">
                {/* Profile Photo dengan efek lebih menarik */}
                <div className="relative inline-block group">
                  <div className="relative">
                    <img
                      src={avatarPreview}
                      alt="Profile"
                      className="w-40 h-40 rounded-3xl mx-auto mb-6 border-4 border-white shadow-2xl object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => openImageModal(avatarPreview)}
                    />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#B80002]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button
                      onClick={() => openImageModal(avatarPreview)}
                      className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                      title="Lihat foto"
                    >
                      <FaExpand className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Camera icon untuk edit */}
                  <button
                    onClick={triggerAvatarSelect}
                    className="absolute bottom-2 right-2 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white p-3 rounded-full shadow-2xl hover:from-[#A00002] hover:to-[#C00002] transition-all duration-300 transform hover:scale-110 group-hover:scale-110"
                    title="Ganti foto profil"
                  >
                    <FaCamera className="w-5 h-5" />
                  </button>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-600 mb-2 text-lg">{user?.email}</p>
                <p className="text-sm text-gray-500 bg-gray-100 inline-block px-4 py-2 rounded-full">
                  Bergabung sejak {new Date(user?.created_at).toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>

                {/* Action Buttons dengan desain lebih baik */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="group py-4 px-6 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white rounded-2xl shadow-2xl hover:from-[#A00002] hover:to-[#C00002] transition-all duration-300 transform hover:-translate-y-1 font-semibold flex items-center justify-center"
                  >
                    <FaEdit className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    Edit Profil
                  </button>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="group py-4 px-6 bg-white text-gray-800 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 font-semibold flex items-center justify-center"
                  >
                    <FaKey className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    Ganti Password
                  </button>
                </div>
              </div>
            </div>
          ) : isEditing ? (
            /* Edit Mode - Desain Lebih Modern */
            <form onSubmit={handleProfileUpdate} className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Edit Profil
              </h2>

              {/* Profile Photo Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <img
                    src={avatarPreview}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-3xl border-4 border-white shadow-2xl object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => openImageModal(avatarPreview)}
                  />
                  <button
                    type="button"
                    onClick={triggerAvatarSelect}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white p-4 rounded-full shadow-2xl hover:from-[#A00002] hover:to-[#C00002] transition-all duration-300 transform hover:scale-110"
                    title="Ganti avatar"
                  >
                    <FaCamera className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Klik ikon kamera untuk mengganti foto profil
                  <br />
                  <span className="text-xs">Format: JPG, PNG (Maks. 2MB)</span>
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="name">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#B80002]/20 focus:border-[#B80002] transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg"
                    required
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div>
                  <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="email">
                    Alamat Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-gray-100 cursor-not-allowed text-gray-700 text-lg"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-3 flex items-center">
                    <FaTimesCircle className="w-4 h-4 mr-2" />
                    Email tidak dapat diubah
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-4 px-6 bg-gray-100 text-gray-800 rounded-2xl border border-gray-300 shadow-lg hover:bg-gray-200 transition-all duration-300 font-semibold text-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white rounded-2xl shadow-2xl hover:from-[#A00002] hover:to-[#C00002] transition-all duration-300 font-semibold disabled:opacity-50 flex items-center justify-center text-lg transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Menyimpan...
                    </>
                  ) : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          ) : (
            /* Password Change Mode - Desain Lebih Modern */
            <form onSubmit={handlePasswordChange} className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Ganti Password
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="oldPassword">
                    Password Lama
                  </label>
                  <div className="relative">
                    <input
                      id="oldPassword"
                      type={showPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#B80002]/20 focus:border-[#B80002] transition-all duration-300 pr-12 text-gray-900 placeholder-gray-500 text-lg"
                      required
                      placeholder="Masukkan password lama Anda"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="newPassword">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#B80002]/20 focus:border-[#B80002] transition-all duration-300 pr-12 text-gray-900 placeholder-gray-500 text-lg"
                      required
                      minLength={8}
                      placeholder="Masukkan password baru (minimal 8 karakter)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="confirmPassword">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#B80002]/20 focus:border-[#B80002] transition-all duration-300 pr-12 text-gray-900 placeholder-gray-500 text-lg"
                      required
                      minLength={8}
                      placeholder="Konfirmasi password baru Anda"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="flex-1 py-4 px-6 bg-gray-100 text-gray-800 rounded-2xl border border-gray-300 shadow-lg hover:bg-gray-200 transition-all duration-300 font-semibold text-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-[#B80002] to-[#D90003] text-white rounded-2xl shadow-2xl hover:from-[#A00002] hover:to-[#C00002] transition-all duration-300 font-semibold disabled:opacity-50 flex items-center justify-center text-lg transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Mengubah...
                    </>
                  ) : "Ubah Password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Custom CSS untuk animasi */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Profile;