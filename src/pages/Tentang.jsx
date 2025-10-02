import { useState, useEffect } from "react";

function Tentang() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    setNavbarHeight(70);
  }, []);

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
              Tentang <span className="text-amber-400">Kami</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-amber-400 mx-auto mt-6 animate-pulse"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Menyajikan <span className="text-amber-400 font-semibold">kenikmatan crispy</span>terbaik untuk setiap acara spesial Anda
          </p>
        </div>
      </div>

      {/* Main Content - UPGRADE PROFESSIONAL */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          {/* Premium Story Section - Lebar card disamakan */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center justify-center space-x-4 mb-8">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-600"></div>
              <span className="text-sm font-semibold text-red-600 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full border border-red-200 animate-pulse">
                Our Story
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-red-600"></div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent animate-scale-in">
              DeKremes <span className="text-amber-500">&</span> Crispy
            </h2>
            
            {/* Card Lebar - Disamakan dengan card di bawah */}
            <div className="w-full">
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-12 shadow-2xl border border-amber-200 relative overflow-hidden hover:shadow-3xl transition-all duration-500 animate-float">
                {/* Luxury Pattern Background */}
                <div className="absolute inset-0 opacity-[0.02]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L100 0 L100 100 L0 100 L0 0 Z' fill='%23dc2626'/%3E%3C/svg%3E")`,
                    backgroundSize: '50px 50px'
                  }}></div>
                </div>
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-400 rounded-tl-3xl animate-corner-glow"></div>
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-red-500 rounded-tr-3xl animate-corner-glow delay-100"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-red-500 rounded-bl-3xl animate-corner-glow delay-200"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-400 rounded-br-3xl animate-corner-glow delay-300"></div>
                
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed text-justify font-light relative z-10 animate-text-reveal">
                  <span className="text-3xl md:text-4xl text-red-600 font-serif align-super mr-2 -ml-1">D</span>
                  eKremes & Crispy adalah bisnis UMKM dan bergerak di bidang kuliner. Makanan crispy yang berkomitmen menyajikan cita rasa terbaik 
                  dengan kualitas premium. Kami melayani berbagai pesanan untuk acara sekolah, pengajian, ulang tahun, 
                  dan acara spesial lainnya. Dengan pengalaman dalam bidang kuliner, kami hadir untuk memenuhi kebutuhan 
                  pesanan dengan harga terjangkau dan rasa yang istimewa.
                </p>
                
                <div className="flex justify-center mt-6 md:mt-8 space-x-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div 
                      key={star} 
                      className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-br from-amber-400 to-red-500 rounded-full transform rotate-45 animate-pulse"
                      style={{ animationDelay: `${star * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Services Section */}
          <div className="mb-20">
            <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 to-red-700 bg-clip-text text-transparent">
                Layanan <span className="text-amber-500">Kami</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light px-4">
                Menghadirkan keistimewaan dalam setiap acara dengan sentuhan personal dan profesional
              </p>
            </div>

            {/* Card Layanan - Responsif */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {[
                {
                  title: "Acara Sekolah",
                  img: "src/assets/kegiatan/IMG-20250320-WA0146.jpg",
                  desc: "Melayani pesanan untuk acara sekolah seperti pentas seni, bazar, atau perayaan hari besar dengan paket khusus untuk siswa dan guru.",
                },
                {
                  title: "Ulang Tahun",
                  img: "src/assets/kegiatan/IMG20250619072923.jpg",
                  desc: "Membuat acara ulang tahun semakin spesial dengan berbagai pilihan paket crispy yang disukai oleh semua usia.",
                },
                {
                  title: "Acara Pengajian",
                  img: "src/assets/kegiatan/IMG-20250203-WA0015.jpg",
                  desc: "Menyediakan catering untuk acara pengajian, syukuran, atau acara keagamaan lainnya dengan menu yang beragam dan halal.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl md:rounded-2xl bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] shadow-lg md:shadow-xl hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-500 transform hover:-translate-y-2 animate-card-float"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6 flex flex-col flex-1">
                      <h4 className="text-lg md:text-xl font-bold text-red-600 mb-3 md:mb-4 group-hover:text-yellow-600 transition-colors duration-300 animate-text-glow">
                        {card.title}
                      </h4>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed flex-1">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Values Section - Responsif */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start mb-20">
            
            {/* Left Column - Premium Values */}
            <div className="space-y-6 md:space-y-8">
              {/* Value 1 */}
              <div className="relative group animate-fade-in-left">
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 rounded-2xl md:rounded-3xl blur-lg opacity-30 group-hover:opacity-70 transition duration-1000 animate-glow"></div>
                <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-amber-100 group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <img
                          src="src/assets/meat.png"
                          alt="Quality"
                          className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert transform group-hover:rotate-12 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 animate-text-reveal">
                        Komitmen terhadap Kualitas
                      </h3>
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        Sejak awal, DeKremes & Crispy berdedikasi untuk menyajikan produk terbaik dengan harga terjangkau.
                        Kami percaya bahwa makanan enak tidak harus mahal, dan setiap acara layak mendapatkan pesanan terbaik.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Value 2 */}
              <div className="relative group animate-fade-in-left delay-200">
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-red-500 via-amber-400 to-red-500 rounded-2xl md:rounded-3xl blur-lg opacity-30 group-hover:opacity-70 transition duration-1000 animate-glow"></div>
                <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-red-100 group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <img
                          src="src/assets/chicken.png"
                          alt="Service"
                          className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert transform group-hover:-rotate-12 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 animate-text-reveal">
                        Pelayanan Terbaik
                      </h3>
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        Dengan pengalaman melayani berbagai acara, kami memahami kebutuhan
                        khusus setiap pelanggan. Dari menu hingga eksekusi, kami hadir untuk
                        membuat acara Anda sukses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Premium Image Showcase */}
            <div className="relative animate-fade-in-right mt-8 md:mt-0">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-3xl group hover:shadow-4xl transition-all duration-500">
                <img
                  src="src/assets/kegiatan/IMG-20240927-WA0001.jpg"
                  alt="Chef DeKremes"
                  className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover transform group-hover:scale-105 transition duration-1000"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2 animate-fade-in-up">DeKremes & Crispy</h4>
                  <p className="text-amber-200 text-sm animate-fade-in-up delay-300">Menyajikan kenikmatan crispy terbaik</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-3xl animate-fade-in-up">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-amber-600"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10 text-center py-12 md:py-16 px-4 md:px-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 animate-pulse-slow">
                Tertarik <span className="text-amber-300">Memesan?</span>
              </h3>
              <p className="text-lg md:text-xl text-red-100 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up px-2">
                Hubungi kami sekarang untuk konsultasi menu dan penawaran terbaik untuk acara Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                <button className="bg-amber-400 text-red-900 font-bold px-8 py-3 md:px-12 md:py-4 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-base md:text-lg hover:bg-amber-300 animate-bounce-gentle w-full sm:w-auto">
                  Hubungi Kami
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles dengan Animasi */}
      <style>
        {`
          .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          }
          .shadow-4xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.6);
          }

          /* Animasi Kustom */
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

          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes cardFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          @keyframes bounceSlow {
            0%, 100% {
              transform: translateY(0) rotate(3deg);
            }
            50% {
              transform: translateY(-8px) rotate(3deg);
            }
          }

          @keyframes bounceGentle {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          @keyframes cornerGlow {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }

          @keyframes textReveal {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes glow {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.7;
            }
          }

          @keyframes textGlow {
            0%, 100% {
              text-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
            }
            50% {
              text-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
            }
          }

          /* Kelas Animasi */
          .animate-fade-in-down {
            animation: fadeInDown 1s ease-out;
          }

          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out;
          }

          .animate-fade-in {
            animation: fadeIn 1.5s ease-out;
          }

          .animate-fade-in-left {
            animation: fadeInLeft 1s ease-out;
          }

          .animate-fade-in-right {
            animation: fadeInRight 1s ease-out;
          }

          .animate-scale-in {
            animation: scaleIn 1s ease-out;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-card-float {
            animation: cardFloat 4s ease-in-out infinite;
          }

          .animate-bounce-slow {
            animation: bounceSlow 3s ease-in-out infinite;
          }

          .animate-bounce-gentle {
            animation: bounceGentle 2s ease-in-out infinite;
          }

          .animate-corner-glow {
            animation: cornerGlow 4s ease-in-out infinite;
          }

          .animate-text-reveal {
            animation: textReveal 1.5s ease-out;
          }

          .animate-glow {
            animation: glow 3s ease-in-out infinite;
          }

          .animate-text-glow {
            animation: textGlow 2s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse 3s ease-in-out infinite;
          }

          .delay-100 {
            animation-delay: 100ms;
          }

          .delay-200 {
            animation-delay: 200ms;
          }

          .delay-300 {
            animation-delay: 300ms;
          }
        `}
      </style>
    </>
  );
}

export default Tentang;