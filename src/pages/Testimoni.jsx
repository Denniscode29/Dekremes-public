// pages/Testimoni.jsx
import { useState, useEffect, useCallback } from "react";
import { Star, MessageSquare, Send, Clock, CheckCircle, XCircle, ImageIcon, Eye, Edit, Trash2, Expand, X } from "lucide-react";
import { Link } from "react-router-dom";
import AuthController from "../controllers/AuthController";
import api from "../api/api";
import Swal from "sweetalert2";

export default function TestimoniPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [komentar, setKomentar] = useState("");
  const [rating, setRating] = useState(0);
  const [gambar, setGambar] = useState(null);
  const [gambarPreview, setGambarPreview] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userTestimonialStatus, setUserTestimonialStatus] = useState(null);
  const [refreshData, setRefreshData] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk modal zoom gambar
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  // auth state - DITAMBAH: refreshUserStatus untuk update data user terbaru
  const { isLoggedIn, user, refreshUserStatus } = AuthController();

  // Fungsi untuk membuka modal zoom gambar
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

  // Fungsi untuk mengurutkan testimoni dari yang terbaru ke terlama
  const sortTestimonialsByDate = useCallback((testimonials) => {
    return testimonials.sort((a, b) => {
      const dateA = new Date(a.updated_at || a.created_at);
      const dateB = new Date(b.updated_at || b.created_at);
      return dateB - dateA; // Descending (terbaru di atas)
    });
  }, []);

  const fetchTestimonials = useCallback(async () => {
    try {
      const response = await api.get("/testimonials/approved");
      if (response.data && response.data.testimonials) {
        // Urutkan testimoni dari yang terbaru ke terlama
        const sortedTestimonials = sortTestimonialsByDate(response.data.testimonials);
        setTestimonials(sortedTestimonials);
        
        if (sortedTestimonials.length > 0) {
          const totalRating = sortedTestimonials.reduce((sum, t) => sum + parseFloat(t.rating), 0);
          const avg = totalRating / sortedTestimonials.length;
          setAverageRating(avg);
        } else {
          setAverageRating(0);
        }
      } else {
        console.error("Unexpected API response structure:", response.data);
        setTestimonials([]);
        setAverageRating(0);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat testimoni.",
      });
    }
  }, [sortTestimonialsByDate]);

  const checkUserTestimonialStatus = useCallback(async () => {
    try {
      const response = await api.get("/testimonials/check");
      setUserTestimonialStatus(response.data);
      
      // Reset status terima kasih jika testimoni sudah ada
      if (response.data.hasSubmitted) {
        setShowThankYou(false);
      }
    } catch (error) {
      console.error("Error checking user testimonial status:", error);
      setUserTestimonialStatus({ hasSubmitted: false, testimonial: null });
    }
  }, []);

  useEffect(() => {
    setNavbarHeight(70);
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchTestimonials();
        if (isLoggedIn) {
          await checkUserTestimonialStatus();
          refreshUserStatus();
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        // Delay minimal untuk smooth loading animation
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    loadData();
  }, [isLoggedIn, refreshData, fetchTestimonials, checkUserTestimonialStatus, refreshUserStatus]);

  // DITAMBAH: Effect untuk refresh data ketika user berubah
  useEffect(() => {
    if (isLoggedIn && user) {
      // Refresh testimonials untuk update avatar
      fetchTestimonials();
      checkUserTestimonialStatus();
    }
  }, [user, isLoggedIn, fetchTestimonials, checkUserTestimonialStatus]);

  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File terlalu besar",
          text: "Ukuran file maksimal 2MB.",
        });
        return;
      }
      
      setGambar(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setGambarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGambar = () => {
    setGambar(null);
    setGambarPreview(null);
  };

  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    
    if (!komentar.trim() || rating === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silakan isi komentar dan berikan rating terlebih dahulu.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('content', komentar.trim());
      formData.append('rating', rating);
      if (gambar) {
        formData.append('product_photo', gambar);
      }

      if (isEditing && editingTestimonialId) {
        // Update testimoni yang sudah ada
        await api.put(`/testimonials/${editingTestimonialId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Buat testimoni baru
        await api.post("/testimonials", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      // Tampilkan pesan sukses
      Swal.fire({
        icon: "success",
        title: isEditing ? "Berhasil Diperbarui!" : "Terima Kasih!",
        text: isEditing 
          ? "Testimoni Anda berhasil diperbarui dan menunggu verifikasi admin." 
          : "Testimoni Anda telah dikirim dan menunggu verifikasi admin.",
      });
      
      // Reset form
      setKomentar("");
      setRating(0);
      setGambar(null);
      setGambarPreview(null);
      setShowForm(false);
      setIsEditing(false);
      setEditingTestimonialId(null);
      
      // Refresh data - DITAMBAH: refresh user status juga
      setRefreshData(prev => prev + 1);
      checkUserTestimonialStatus();
      refreshUserStatus(); // DITAMBAH: Refresh user data
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Terjadi kesalahan saat mengirim testimoni.";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTestimonial = async () => {
    if (userTestimonialStatus?.testimonial) {
      const testimonial = userTestimonialStatus.testimonial;
      setKomentar(testimonial.content);
      setRating(testimonial.rating);
      setGambar(null);
      
      // Set gambar preview jika ada
      if (testimonial.product_photo_url) {
        setGambarPreview(testimonial.product_photo_url);
      }
      
      setIsEditing(true);
      setEditingTestimonialId(testimonial.id);
      setShowForm(true);
    }
  };

  const handleDeleteTestimonial = async () => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Testimoni yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B80002',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/testimonials/${userTestimonialStatus.testimonial.id}`);
        
        Swal.fire({
          icon: "success",
          title: "Terhapus",
          text: "Testimoni berhasil dihapus.",
        });
        
        // Refresh data dan status
        setRefreshData(prev => prev + 1);
        await checkUserTestimonialStatus();
        refreshUserStatus(); // DITAMBAH: Refresh user data
        
        // Reset form state
        setShowForm(false);
        setIsEditing(false);
        setEditingTestimonialId(null);
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response?.data?.message || "Terjadi kesalahan saat menghapus testimoni.",
        });
      }
    }
  };

  const renderTestimonialStatus = () => {
    if (!userTestimonialStatus?.hasSubmitted) return null;
    
    const testimonial = userTestimonialStatus.testimonial;
    
    let statusIcon, statusText, statusColor;
    
    switch(testimonial?.status) {
      case 'Menunggu':
      case 'menunggu':
        statusIcon = <Clock className="w-5 h-5 text-yellow-500" />;
        statusText = "Testimoni Anda sedang dalam proses verifikasi";
        statusColor = "text-yellow-600 bg-yellow-100";
        break;
      case 'Disetujui':
      case 'disetujui':
        statusIcon = <CheckCircle className="w-5 h-5 text-green-500" />;
        statusText = "Testimoni Anda telah disetujui dan dipublikasikan";
        statusColor = "text-green-600 bg-green-100";
        break;
      case 'Ditolak':
      case 'ditolak':
        statusIcon = <XCircle className="w-5 h-5 text-red-500" />;
        statusText = "Testimoni Anda ditolak. Silakan periksa dan kirim ulang testimoni yang sesuai dengan ketentuan.";
        statusColor = "text-red-600 bg-red-100";
        break;
      default:
        return null;
    }
    
    return (
      <div className={`p-4 rounded-lg mb-6 flex items-start space-x-3 ${statusColor}`}>
        {statusIcon}
        <div>
          <p className="font-medium">{statusText}</p>
          {testimonial?.status === 'Ditolak' && (
            <button 
              onClick={() => {
                setIsEditing(false);
                setEditingTestimonialId(null);
                setShowForm(true);
              }}
              className="mt-2 text-sm underline"
            >
              Kirim testimoni baru
            </button>
          )}
        </div>
      </div>
    );
  };

  // Fungsi untuk memformat tanggal dengan benar
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Tanggal tidak valid";
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Tanggal tidak valid";
      }
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Tanggal tidak valid";
    }
  };

  // DITAMBAH: Fungsi untuk mendapatkan avatar URL yang tepat
  const getAvatarUrl = (testimonialUser) => {
    // Jika testimoni ini milik user yang sedang login, gunakan avatar terbaru dari state user
    if (user && testimonialUser && user.id === testimonialUser.id) {
      return user.avatar_url || "/default-avatar.png";
    }
    // Jika bukan, gunakan avatar dari data testimoni
    return testimonialUser?.avatar_url || "/default-avatar.png";
  };

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Fixed spacer untuk navbar */}
      <div style={{ height: `${navbarHeight}px` }} className="w-full bg-white"></div>

      {/* Hero Section Skeleton */}
      <div className="relative flex items-center justify-center overflow-hidden bg-gray-900" style={{ height: `calc(60vh - ${navbarHeight}px)`, minHeight: `calc(500px - ${navbarHeight}px)` }}>
        <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl w-full">
          <div className="mb-8">
            <div className="w-24 h-1 bg-gray-600 mx-auto mb-6 rounded"></div>
            <div className="h-12 bg-gray-700 rounded-lg mb-4 w-3/4 mx-auto animate-pulse"></div>
            <div className="w-32 h-1 bg-gray-600 mx-auto mt-6 rounded"></div>
          </div>
          <div className="h-6 bg-gray-600 rounded w-2/3 mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Summary Rating Skeleton */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-8 h-0.5 bg-gray-300 rounded"></div>
              <div className="w-32 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-8 h-0.5 bg-gray-300 rounded"></div>
            </div>
            
            <div className="bg-gray-300 rounded-2xl shadow-xl max-w-2xl mx-auto p-1">
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
                <div className="flex justify-center space-x-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                  ))}
                </div>
                <div className="h-10 bg-gray-300 rounded w-24 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-40 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Testimonials Grid Skeleton */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-8 h-0.5 bg-gray-300 rounded"></div>
                <div className="w-32 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-8 h-0.5 bg-gray-300 rounded"></div>
              </div>
              <div className="h-10 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 h-full">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                    </div>
                    <div className="mt-4 h-40 bg-gray-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Tampilkan loading skeleton jika masih loading
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Modal untuk Zoom Foto Testimoni */}
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
              <X className="w-6 h-6" />
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

      {/* Fixed spacer untuk navbar - DIUBAH: background menjadi putih */}
      <div 
        style={{ height: `${navbarHeight}px` }} 
        className="w-full bg-white"
      ></div>

      {/* Luxury Hero Section - Responsive */}
      <div 
        className="relative flex items-center justify-center overflow-hidden bg-gray-900"
        style={{ 
          height: `calc(60vh - ${navbarHeight}px)`,
          minHeight: `calc(500px - ${navbarHeight}px)`
        }}
      >
        <div className="absolute inset-0">
          <img
            src="src/assets/chicken1.jpg"
            alt="DeKremes Header"
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        {/* Animated Decorative Elements */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t-2 border-l-2 border-amber-400 opacity-60 animate-pulse"></div>
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b-2 border-r-2 border-amber-400 opacity-60 animate-pulse"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          <div className="mb-6 sm:mb-8">
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-amber-400 to-red-600 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight animate-fade-in-down">
              Testimoni <span className="text-amber-400">Pelanggan</span>
            </h1>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-red-600 to-amber-400 mx-auto mt-4 sm:mt-6 animate-pulse"></div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up px-2">
            Lihat apa kata pelanggan kami tentang <span className="text-amber-400 font-semibold">DeKremes & Crispy</span>
          </p>
        </div>
      </div>

      {/* Main Content - Responsive */}
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 sm:py-12 px-3 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Summary Rating - Responsive */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in">
            <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"></div>
              <span className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-red-200">
                Rating Pelanggan
              </span>
              <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-l from-amber-400 to-red-600"></div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-400 to-red-500 p-[2px] rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl max-w-2xl mx-auto">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Rata-rata Penilaian
                </h2>
                <div className="flex justify-center items-center space-x-1 sm:space-x-2 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${
                        i < Math.round(averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">
                  {isNaN(averageRating) ? '0.0' : averageRating.toFixed(1)}/5.0
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Berdasarkan {testimonials.length} ulasan dari pelanggan
                </p>
              </div>
            </div>
          </div>

          {/* Button Login untuk User yang Belum Login */}
          {!isLoggedIn && (
            <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">
              <Link
                to="/login"
                className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 sm:gap-3 mx-auto w-fit text-sm sm:text-base md:text-lg font-semibold"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                Login untuk menulis testimoni
              </Link>
            </div>
          )}

          {/* Status Testimoni User */}
          {isLoggedIn && renderTestimonialStatus()}

          {/* Tampilan setelah berhasil submit */}
          {isLoggedIn && showThankYou && (
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
                <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Terima Kasih!
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Terima kasih telah memberi penilaian kepada kami, mohon tunggu persetujuan publikasi testimoni anda dari admin.
                </p>
              </div>
            </div>
          )}

          {/* Tombol Tulis/Perbarui Testimoni */}
          {isLoggedIn && !showForm && !showThankYou && (
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">
              <div className="text-center">
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditingTestimonialId(null);
                    setShowForm(true);
                  }}
                  className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base md:text-lg font-semibold"
                >
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                  Tulis/Perbarui Testimoni Anda
                </button>
              </div>
            </div>
          )}

          {/* Tombol Edit untuk testimoni yang sudah ada */}
          {isLoggedIn && userTestimonialStatus?.hasSubmitted && !showForm && (
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8 text-center animate-fade-in-up">
              <button 
                onClick={handleEditTestimonial}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto text-sm sm:text-base"
              >
                <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                Edit Testimoni Anda
              </button>
            </div>
          )}

          {/* Form Testimoni - Responsive */}
          {isLoggedIn && showForm && (
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
                <form onSubmit={handleSubmitTestimonial}>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 text-center">
                    {isEditing ? 'Edit Testimoni' : 'Tulis Testimoni'}
                  </h3>
                  
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <label className="block text-gray-900 mb-2 sm:mb-3 font-semibold text-base sm:text-lg">Rating</label>
                    <div className="flex space-x-1 sm:space-x-2 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 cursor-pointer transition-transform hover:scale-110 ${
                            star <= (hoverRating || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <label className="block text-gray-900 mb-2 sm:mb-3 font-semibold text-base sm:text-lg">Komentar</label>
                    <textarea
                      value={komentar}
                      onChange={(e) => setKomentar(e.target.value)}
                      rows="4"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-900 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Bagikan pengalaman Anda..."
                      maxLength={150}
                    ></textarea>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                      {komentar.length}/150 karakter
                    </p>
                  </div>

                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <label className="block text-gray-900 mb-2 sm:mb-3 font-semibold text-base sm:text-lg">Gambar (Opsional)</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl cursor-pointer hover:border-gray-400 transition-colors duration-300">
                        <div className="flex flex-col items-center justify-center pt-4 pb-5 sm:pt-5 sm:pb-6">
                          <ImageIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-2 sm:mb-3 text-gray-500" />
                          <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-500">
                            <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF (Max. 2MB)
                          </p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleGambarChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                    
                    {gambarPreview && (
                      <div className="mt-3 sm:mt-4 relative">
                        <img
                          src={gambarPreview}
                          alt="Preview"
                          className="w-full h-40 sm:h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(gambarPreview)}
                        />
                        <button
                          type="button"
                          onClick={() => openImageModal(gambarPreview)}
                          className="absolute top-2 right-12 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
                          title="Zoom gambar"
                        >
                          <Expand className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={removeGambar}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setKomentar("");
                        setRating(0);
                        setGambar(null);
                        setGambarPreview(null);
                        setIsEditing(false);
                        setEditingTestimonialId(null);
                      }}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-gray-600 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium text-sm sm:text-base"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-lg sm:rounded-xl hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none transition-all duration-300 font-semibold text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {isEditing ? 'Memperbarui...' : 'Mengirim...'}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          {isEditing ? 'Perbarui Testimoni' : 'Kirim Testimoni'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Testimoni User yang Sudah Disetujui - Tampil di atas */}
          {isLoggedIn && userTestimonialStatus?.hasSubmitted && 
           (userTestimonialStatus?.testimonial?.status === 'Disetujui' || userTestimonialStatus?.testimonial?.status === 'disetujui') && (
            <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
              <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-5 md:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-green-800 flex items-center mb-2 sm:mb-0">
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                      Testimoni Anda
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                      Dipublikasikan
                    </span>
                  </div>
                  
                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      {/* DIUBAH: Selalu gunakan avatar terbaru dari user state */}
                      <img
                        src={user?.avatar_url || "/default-avatar.png"}
                        alt={user?.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-green-200"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800 text-base sm:text-lg md:text-xl">{user?.name}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {userTestimonialStatus.testimonial.updated_at ? 
                            `Diperbarui: ${formatDate(userTestimonialStatus.testimonial.updated_at)}` : 
                            `Dibuat: ${formatDate(userTestimonialStatus.testimonial.created_at)}`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-2 sm:mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                            i < userTestimonialStatus.testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-900 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 leading-relaxed">{userTestimonialStatus.testimonial.content}</p>
                    
                    {userTestimonialStatus.testimonial.product_photo_url && (
                      <div className="mt-4 sm:mt-5 md:mt-6 relative">
                        <img
                          src={userTestimonialStatus.testimonial.product_photo_url}
                          alt="Gambar testimoni"
                          className="w-full max-w-md h-48 sm:h-56 md:h-64 object-cover rounded-lg sm:rounded-xl mx-auto cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(userTestimonialStatus.testimonial.product_photo_url)}
                        />
                        <button
                          onClick={() => openImageModal(userTestimonialStatus.testimonial.product_photo_url)}
                          className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          title="Zoom gambar"
                        >
                          <Expand className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3 mt-4 sm:mt-5 md:mt-6">
                      <button
                        onClick={handleEditTestimonial}
                        className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium text-xs sm:text-sm"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Edit Testimoni
                      </button>
                      <button
                        onClick={handleDeleteTestimonial}
                        className="flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-medium text-xs sm:text-sm"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Grid - Responsive */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="text-center mb-6 sm:mb-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"></div>
                <span className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-red-200">
                  Ulasan Pelanggan
                </span>
                <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-l from-amber-400 to-red-600"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                Apa Kata <span className="text-amber-500">Pelanggan</span> Kami
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                Testimoni terbaru dari pelanggan yang telah merasakan kenikmatan DeKremes & Crispy
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {testimonials.map((t, index) => (
                <div
                  key={t.id}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 rounded-lg sm:rounded-xl md:rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                  <div className="relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg sm:shadow-xl border border-amber-100 group-hover:scale-[1.02] transition-all duration-500 h-full flex flex-col">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      {/* DIUBAH: Gunakan fungsi getAvatarUrl untuk menentukan avatar */}
                      <img
                        src={getAvatarUrl(t.user)}
                        alt={t.user?.name}
                        className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border-2 border-amber-200"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{t.user?.name}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {t.updated_at ? 
                            `Diperbarui: ${formatDate(t.updated_at)}` : 
                            `Dibuat: ${formatDate(t.created_at)}`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-2 sm:mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                            i < t.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-900 text-sm sm:text-base mb-3 sm:mb-4 flex-grow leading-relaxed">{t.content}</p>
                    
                    {t.product_photo_url && (
                      <div className="mt-2 sm:mt-3 md:mt-4 relative">
                        <img
                          src={t.product_photo_url}
                          alt="Gambar testimoni"
                          className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(t.product_photo_url)}
                        />
                        <button
                          onClick={() => openImageModal(t.product_photo_url)}
                          className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
                          title="Zoom gambar"
                        >
                          <Expand className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeInModal {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          .animate-fade-in-down {
            animation: fadeInDown 1s ease-out;
          }

          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out;
          }

          .animate-fade-in {
            animation: fadeIn 1.5s ease-out;
          }

          .animate-fadeIn {
            animation: fadeInModal 0.3s ease-out;
          }
          
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
          }

          /* Responsive adjustments for very small screens */
          @media (max-width: 360px) {
            .text-3xl {
              font-size: 1.75rem;
            }
            .text-2xl {
              font-size: 1.5rem;
            }
          }
        `}
      </style>
    </>
  );
}