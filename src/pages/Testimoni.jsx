// pages/Testimoni.jsx
import { useState, useEffect } from "react";
import { Star, MessageSquare, Send } from "lucide-react";
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
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // auth state
  const isLoggedIn = AuthController((state) => state.isLoggedIn);
  const user = AuthController((state) => state.user);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get("/testimonials");
      setTestimonials(response.data);
      
      // Calculate average rating
      if (response.data.length > 0) {
        const avg = response.data.reduce((sum, t) => sum + t.rating, 0) / response.data.length;
        setAverageRating(avg);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
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
      await api.post("/testimonials", {
        komentar: komentar.trim(),
        rating: rating
      });
      
      Swal.fire({
        icon: "success",
        title: "Terima Kasih!",
        text: "Testimoni Anda telah dikirim dan menunggu verifikasi admin.",
      });
      
      setKomentar("");
      setRating(0);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan saat mengirim testimoni.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* spasi atas */}
      <div className="h-20" style={{ backgroundColor: "#FFF5CC" }}></div>

      <div className="min-h-screen bg-[#FFF5CC] py-12 px-6 md:px-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#B80002]">
            Apa Kata Pelanggan Kami
          </h1>
          <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
            Kami hanya menampilkan ulasan asli dari pelanggan yang sudah mencoba
            produk <span className="font-bold">DeKremes&Crispy</span>.
          </p>
        </div>

        {/* Summary Rating */}
        <div className="bg-white shadow-md rounded-2xl p-6 max-w-2xl mx-auto mb-10 text-center hover:shadow-xl transition duration-300">
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
            {averageRating.toFixed(1)} dari {testimonials.length} ulasan
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow-md rounded-2xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={t.user?.avatar || "/default-avatar.png"}
                  alt={t.user?.name}
                  className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{t.user?.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(t.created_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
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
              <p className="text-gray-700">{t.komentar}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Form atau Call to Action */}
        {isLoggedIn && user?.role === "customer" ? (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
            {!showForm ? (
              <div className="text-center">
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-[#B80002] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-[#a00002] transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto"
                >
                  <MessageSquare className="w-5 h-5" />
                  Tulis Testimoni Anda
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitTestimonial}>
                <h3 className="text-xl font-semibold mb-4">Tulis Testimoni</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
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
                  <label className="block text-gray-700 mb-2">Komentar</label>
                  <textarea
                    value={komentar}
                    onChange={(e) => setKomentar(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B80002]"
                    placeholder="Bagikan pengalaman Anda..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center px-4 py-2 bg-[#B80002] text-white rounded-md hover:bg-[#a00002] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-1" />
                        Kirim Testimoni
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="text-center">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-[#B80002] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-[#a00002] transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto w-fit"
              >
                <MessageSquare className="w-5 h-5" />
                Login untuk menulis testimoni
              </Link>
            ) : (
              <p className="text-gray-600 italic">
                Hanya pelanggan yang sudah mencoba produk yang bisa menulis testimoni.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}