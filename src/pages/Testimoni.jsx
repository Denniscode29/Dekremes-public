// pages/Testimoni.jsx
import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";

export default function TestimoniPage() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Adit",
      photo: defaultProfile,
      rating: 5,
      comment: "Ayamnya garing dan bumbunya meresap banget, mantap!",
      date: "20 Agustus 2025",
    },
    {
      id: 2,
      name: "Bunga",
      photo: defaultProfile,
      rating: 4,
      comment: "Rasanya enak, porsinya pas, harganya juga ramah di kantong.",
      date: "25 Agustus 2025",
    },
    {
      id: 3,
      name: "Citra",
      photo: defaultProfile,
      rating: 5,
      comment: "Pokoknya top banget, berasa makan di franchise besar!",
      date: "28 Agustus 2025",
    },
  ]);

  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  // auth state
  const isLoggedIn = AuthController((state) => state.isLoggedIn);
  const user = AuthController((state) => state.user);

  // simulasi: hanya user yang punya role "customer" boleh isi testimoni
  const isCustomer = user?.role === "customer";

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
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow-md rounded-2xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{t.name}</h3>
                  <p className="text-gray-500 text-sm">{t.date}</p>
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
              <p className="text-gray-700">{t.comment}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-[#B80002] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-[#a00002] transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto w-fit"
            >
              <MessageSquare className="w-5 h-5" />
              Login untuk menulis testimoni
            </Link>
          ) : !isCustomer ? (
            <p className="text-gray-600 italic">
              Hanya pelanggan yang sudah mencoba produk yang bisa menulis
              testimoni.
            </p>
          ) : (
            <button className="bg-[#B80002] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-[#a00002] transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto">
              <MessageSquare className="w-5 h-5" />
              Tulis Testimoni Anda
            </button>
          )}
        </div>
      </div>
    </>
  );
}
