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

  // auth state
  const { isLoggedIn, user } = AuthController();

  useEffect(() => {
    fetchTestimonials();
    if (isLoggedIn) {
      checkUserTestimonialStatus();
    }
  }, [isLoggedIn, refreshData]);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get("/testimonials/approved");
      if (response.data && response.data.testimonials) {
        setTestimonials(response.data.testimonials);
        
        if (response.data.testimonials.length > 0) {
          const totalRating = response.data.testimonials.reduce((sum, t) => sum + parseFloat(t.rating), 0);
          const avg = totalRating / response.data.testimonials.length;
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
        // HAPUS admin_feedback karena kolom tidak ada di database
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
      {/* Header Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <img
          src="src/assets/chicken1.jpg"
          alt="Testimoni Header"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Testimoni Pelanggan
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Lihat apa kata pelanggan kami tentang produk DeKremes & Crispy
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-[#FFFFFF] py-12 px-6 md:px-20">
        {/* Summary Rating */}
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-2xl shadow-xl max-w-2xl mx-auto mb-10">
          <div className="bg-white rounded-2xl p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Rata-rata Penilaian
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              {isNaN(averageRating) ? '0.0' : averageRating.toFixed(1)} dari {testimonials.length} ulasan
            </p>
          </div>
        </div>

        {/* Button Login untuk User yang Belum Login */}
        {!isLoggedIn && (
          <div className="text-center mb-10">
            <Link
              to="/login"
              className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto w-fit"
            >
              <MessageSquare className="w-5 h-5" />
              Login untuk menulis testimoni
            </Link>
          </div>
        )}

        {/* Status Testimoni User */}
        {isLoggedIn && renderTestimonialStatus()}

        {/* Tampilan setelah berhasil submit */}
        {isLoggedIn && showThankYou && (
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-2xl shadow-xl mb-10">
            <div className="bg-white rounded-2xl p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Terima Kasih!
              </h3>
              <p className="text-gray-600">
                Terima kasih telah memberi penilaian kepada kami, mohon tunggu persetujuan publikasi testimoni anda dari admin.
              </p>
            </div>
          </div>
        )}

        {/* Tombol Tulis/Perbarui Testimoni - Selalu tampil jika user login dan tidak sedang menampilkan form atau thank you message */}
        {isLoggedIn && !showForm && !showThankYou && (
          <div className="max-w-2xl mx-auto mb-10">
            <div className="text-center">
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditingTestimonialId(null);
                  setShowForm(true);
                }}
                className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto"
              >
                <MessageSquare className="w-5 h-5" />
                Tulis Testimoni Anda
              </button>
            </div>
          </div>
        )}

        {/* Tombol Edit untuk testimoni yang sudah ada */}
        {isLoggedIn && userTestimonialStatus?.hasSubmitted && !showForm && (
          <div className="max-w-2xl mx-auto mb-6 text-center">
            <button 
              onClick={handleEditTestimonial}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto"
            >
              <Edit className="w-5 h-5" />
              Edit Testimoni Anda
            </button>
          </div>
        )}

        {/* Form Testimoni - Muncul ketika showForm true */}
        {isLoggedIn && showForm && (
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-2xl shadow-xl mb-10">
            <div className="bg-white rounded-2xl p-6">
              <form onSubmit={handleSubmitTestimonial}>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {isEditing ? 'Edit Testimoni' : 'Tulis Testimoni'}
                </h3>
                
                <div className="mb-4">
                  <label className="block text-gray-900 mb-2 font-medium">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer ${
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
                
                <div className="mb-4">
                  <label className="block text-gray-900 mb-2 font-medium">Komentar</label>
                  <textarea
                    value={komentar}
                    onChange={(e) => setKomentar(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B80002] text-gray-900"
                    placeholder="Bagikan pengalaman Anda..."
                    maxLength={150}
                    style={{ color: '#000' }}
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">
                    {komentar.length}/150 karakter
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-900 mb-2 font-medium">Gambar (Opsional)</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-gray-400">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
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
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3">
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
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-md hover:opacity-90 disabled:opacity-50 transition-colors"
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
                        <Send className="w-4 h-4 mr-1" />
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
          <div className="max-w-2xl mx-auto mb-10">
            <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] rounded-2xl shadow-xl">
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-green-800 flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Testimoni Anda
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Dipublikasikan
                  </span>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={user?.avatar_url || "/default-avatar.png"}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full border border-gray-300"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {userTestimonialStatus.testimonial.updated_at ? 
                          `Diperbarui: ${formatDate(userTestimonialStatus.testimonial.updated_at)}` : 
                          `Dibuat: ${formatDate(userTestimonialStatus.testimonial.created_at)}`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < userTestimonialStatus.testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-900 mb-4">{userTestimonialStatus.testimonial.content}</p>
                  
                  {userTestimonialStatus.testimonial.product_photo_url && (
                    <div className="mt-4">
                      <img
                        src={userTestimonialStatus.testimonial.product_photo_url}
                        alt="Gambar testimoni"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={handleEditTestimonial}
                      className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Testimoni
                    </button>
                    <button
                      onClick={handleDeleteTestimonial}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative rounded-2xl bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] shadow-xl hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="bg-white rounded-2xl p-6 flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={t.user?.avatar_url || "/default-avatar.png"}
                    alt={t.user?.name}
                    className="w-12 h-12 rounded-full border border-gray-300"
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
                <div className="flex mb-2">
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
                <p className="text-gray-900 mb-4 flex-grow">{t.content}</p>
                
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
    </>
  );
}