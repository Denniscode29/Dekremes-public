// pages/Testimoni.jsx
import { useState, useEffect } from "react";
import { Star, MessageSquare, Send, Clock, CheckCircle, XCircle, ImageIcon, Eye, Edit, Trash2 } from "lucide-react";
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

  // auth state
  const { isLoggedIn, user } = AuthController();

  useEffect(() => {
    setNavbarHeight(70);
    fetchTestimonials();
    if (isLoggedIn) {
      checkUserTestimonialStatus();
    }
  }, [isLoggedIn, refreshData]);

  // Fungsi untuk mengurutkan testimoni dari yang terbaru ke terlama
  const sortTestimonialsByDate = (testimonials) => {
    return testimonials.sort((a, b) => {
      const dateA = new Date(a.updated_at || a.created_at);
      const dateB = new Date(b.updated_at || b.created_at);
      return dateB - dateA; // Descending (terbaru di atas)
    });
  };

  const fetchTestimonials = async () => {
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
  };

  const checkUserTestimonialStatus = async () => {
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
  };

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

      let response;
      if (isEditing && editingTestimonialId) {
        // Update testimoni yang sudah ada - HAPUS admin_feedback dari data yang dikirim
        response = await api.put(`/testimonials/${editingTestimonialId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Buat testimoni baru
        response = await api.post("/testimonials", formData, {
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
      
      // Refresh data
      setRefreshData(prev => prev + 1);
      checkUserTestimonialStatus();
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

  return (
    <>
      {/* Fixed spacer untuk navbar */}
      <div style={{ height: `${navbarHeight}px` }} className="w-full"></div>

      {/* Luxury Hero Section - Sama persis dengan Kontak.jsx */}
      <div 
        className="relative flex items-center justify-center overflow-hidden bg-gray-900"
        style={{ 
          height: `calc(70vh - ${navbarHeight}px)`,
          minHeight: `calc(600px - ${navbarHeight}px)`
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
        
        {/* Animated Decorative Elements - Sama seperti Kontak.jsx */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-amber-400 opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-amber-400 opacity-60 animate-pulse"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="mb-8">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-600 mx-auto mb-6 animate-pulse"></div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-down">
              Testimoni <span className="text-amber-400">Pelanggan</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-amber-400 mx-auto mt-6 animate-pulse"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Lihat apa kata pelanggan kami tentang <span className="text-amber-400 font-semibold">DeKremes & Crispy</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Summary Rating */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"></div>
              <span className="text-sm font-semibold text-red-600 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full border border-red-200">
                Rating Pelanggan
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-amber-400 to-red-600"></div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-400 to-red-500 p-[2px] rounded-2xl shadow-xl max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Rata-rata Penilaian
                </h2>
                <div className="flex justify-center items-center space-x-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        i < Math.round(averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-3xl font-bold text-red-600 mb-2">
                  {isNaN(averageRating) ? '0.0' : averageRating.toFixed(1)}/5.0
                </p>
                <p className="text-gray-600">
                  Berdasarkan {testimonials.length} ulasan dari pelanggan
                </p>
              </div>
            </div>
          </div>

          {/* Button Login untuk User yang Belum Login */}
          {!isLoggedIn && (
            <div className="text-center mb-10 animate-fade-in-up">
              <Link
                to="/login"
                className="bg-gradient-to-r from-red-700 to-red-800 text-white px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto w-fit text-lg font-semibold"
              >
                <MessageSquare className="w-6 h-6" />
                Login untuk menulis testimoni
              </Link>
            </div>
          )}

          {/* Status Testimoni User */}
          {isLoggedIn && renderTestimonialStatus()}

          {/* Tampilan setelah berhasil submit */}
          {isLoggedIn && showThankYou && (
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-2xl shadow-xl mb-10 animate-fade-in-up">
              <div className="bg-white rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Terima Kasih!
                </h3>
                <p className="text-gray-600 text-lg">
                  Terima kasih telah memberi penilaian kepada kami, mohon tunggu persetujuan publikasi testimoni anda dari admin.
                </p>
              </div>
            </div>
          )}

          {/* Tombol Tulis/Perbarui Testimoni */}
          {isLoggedIn && !showForm && !showThankYou && (
            <div className="max-w-2xl mx-auto mb-10 animate-fade-in-up">
              <div className="text-center">
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditingTestimonialId(null);
                    setShowForm(true);
                  }}
                  className="bg-gradient-to-r from-red-700 to-red-800 text-white px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto text-lg font-semibold"
                >
                  <MessageSquare className="w-6 h-6" />
                  Tulis Testimoni Anda
                </button>
              </div>
            </div>
          )}

          {/* Tombol Edit untuk testimoni yang sudah ada */}
          {isLoggedIn && userTestimonialStatus?.hasSubmitted && !showForm && (
            <div className="max-w-2xl mx-auto mb-8 text-center animate-fade-in-up">
              <button 
                onClick={handleEditTestimonial}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto"
              >
                <Edit className="w-5 h-5" />
                Edit Testimoni Anda
              </button>
            </div>
          )}

          {/* Form Testimoni */}
          {isLoggedIn && showForm && (
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-2xl shadow-2xl mb-12 animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 md:p-8">
                <form onSubmit={handleSubmitTestimonial}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {isEditing ? 'Edit Testimoni' : 'Tulis Testimoni'}
                  </h3>
                  
                  <div className="mb-6">
                    <label className="block text-gray-900 mb-3 font-semibold text-lg">Rating</label>
                    <div className="flex space-x-2 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-10 h-10 cursor-pointer transition-transform hover:scale-110 ${
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
                  
                  <div className="mb-6">
                    <label className="block text-gray-900 mb-3 font-semibold text-lg">Komentar</label>
                    <textarea
                      value={komentar}
                      onChange={(e) => setKomentar(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-900 transition-all duration-300"
                      placeholder="Bagikan pengalaman Anda..."
                      maxLength={150}
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-2">
                      {komentar.length}/150 karakter
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-900 mb-3 font-semibold text-lg">Gambar (Opsional)</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors duration-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="w-8 h-8 mb-3 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
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
                      <div className="mt-4 relative">
                        <img
                          src={gambarPreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeGambar}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-4">
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
                      className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none transition-all duration-300 font-semibold"
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
                          <Send className="w-5 h-5 mr-2" />
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
            <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up">
              <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-2xl shadow-2xl">
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-green-800 flex items-center">
                      <Eye className="w-6 h-6 mr-3" />
                      Testimoni Anda
                    </h3>
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                      Dipublikasikan
                    </span>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={user?.avatar_url || "/default-avatar.png"}
                        alt={user?.name}
                        className="w-14 h-14 rounded-full border-2 border-green-200"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{user?.name}</h3>
                        <p className="text-gray-500">
                          {userTestimonialStatus.testimonial.updated_at ? 
                            `Diperbarui: ${formatDate(userTestimonialStatus.testimonial.updated_at)}` : 
                            `Dibuat: ${formatDate(userTestimonialStatus.testimonial.created_at)}`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < userTestimonialStatus.testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-900 text-lg mb-6 leading-relaxed">{userTestimonialStatus.testimonial.content}</p>
                    
                    {userTestimonialStatus.testimonial.product_photo_url && (
                      <div className="mt-6">
                        <img
                          src={userTestimonialStatus.testimonial.product_photo_url}
                          alt="Gambar testimoni"
                          className="w-full max-w-md h-64 object-cover rounded-xl mx-auto"
                        />
                      </div>
                    )}

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={handleEditTestimonial}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Testimoni
                      </button>
                      <button
                        onClick={handleDeleteTestimonial}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-medium"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Grid */}
          <div className="mb-12">
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"></div>
                <span className="text-sm font-semibold text-red-600 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full border border-red-200">
                  Ulasan Pelanggan
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-amber-400 to-red-600"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Apa Kata <span className="text-amber-500">Pelanggan</span> Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Testimoni terbaru dari pelanggan yang telah merasakan kenikmatan DeKremes & Crispy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((t, index) => (
                <div
                  key={t.id}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-amber-100 group-hover:scale-[1.02] transition-all duration-500 h-full flex flex-col">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={t.user?.avatar_url || "/default-avatar.png"}
                        alt={t.user?.name}
                        className="w-12 h-12 rounded-full border-2 border-amber-200"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{t.user?.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {t.updated_at ? 
                            `Diperbarui: ${formatDate(t.updated_at)}` : 
                            `Dibuat: ${formatDate(t.created_at)}`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < t.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-900 mb-4 flex-grow leading-relaxed">{t.content}</p>
                    
                    {t.product_photo_url && (
                      <div className="mt-4">
                        <img
                          src={t.product_photo_url}
                          alt="Gambar testimoni"
                          className="w-full h-48 object-cover rounded-lg"
                        />
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

          .animate-fade-in-down {
            animation: fadeInDown 1s ease-out;
          }

          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out;
          }

          .animate-fade-in {
            animation: fadeIn 1.5s ease-out;
          }
        `}
      </style>
    </>
  );
}