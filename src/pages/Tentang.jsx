function Tentang() {
  return (
    <>
      {/* Header Section - Sama persis seperti Menu.jsx */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <img
          src="src/assets/chicken1.jpg"
          alt="DeKremes Header"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Tentang Kami
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            DeKremes & Crispy - Menyajikan kenikmatan crispy terbaik untuk setiap acara spesial Anda
          </p>
        </div>
      </div>

      {/* Main Content - Responsif Mobile */}
      <div className="bg-[#FFF5CC] py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Company Introduction */}
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-red-600 mb-4 md:mb-6">DeKremes & Crispy</h2>
            <p className="text-base md:text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed">
              DeKremes & Crispy adalah bisnis UMKM dan bergerak di bidang kuliner. Makanan crispy yang berkomitmen menyajikan cita rasa terbaik 
              dengan kualitas premium. Kami melayani berbagai pesanan untuk acara sekolah, pengajian, ulang tahun, 
              dan acara spesial lainnya. Dengan pengalaman dalam bidang kuliner, kami hadir untuk memenuhi kebutuhan 
              pesanan dengan harga terjangkau dan rasa yang istimewa.
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-10 md:mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-red-600 text-center mb-6 md:mb-10">
              Layanan Kami
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
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
                  className="group relative rounded-xl md:rounded-2xl bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 p-[2px] shadow-lg md:shadow-xl hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2"
                >
                  <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-40 md:h-56 overflow-hidden">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70"></div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6 flex flex-col flex-1">
                      <h4 className="text-lg md:text-xl font-bold text-red-600 mb-2 md:mb-3 group-hover:text-yellow-600 transition-colors duration-300">
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

          {/* Values Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch mb-10 md:mb-16">
            {/* Left Column */}
            <div className="space-y-8 md:space-y-12">
              {/* Card 1 */}
              <div className="relative rounded-xl md:rounded-3xl overflow-hidden w-full max-w-full transition duration-700 hover:scale-[1.02] hover:rotate-[0.5deg] shadow-lg md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] group">
                {/* Shimmer Border */}
                <div className="absolute inset-0 rounded-xl md:rounded-3xl p-[2px] bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400 animate-[shimmer_6s_linear_infinite]"></div>
                <div className="relative rounded-xl md:rounded-3xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-red-800 to-red-700 text-white p-4 md:p-8 flex flex-col md:flex-row md:items-center justify-between border-b border-yellow-500/40">
                    <div className="mb-3 md:mb-0 md:flex-1">
                      <h3 className="text-lg md:text-2xl font-extrabold tracking-wide uppercase text-yellow-300 drop-shadow-md">
                        Komitmen terhadap Kualitas
                      </h3>
                      <p className="text-white/80 text-sm md:text-base mt-1 md:mt-2">
                        Kami hanya menggunakan bahan terbaik agar cita rasa konsisten & nikmat.
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-xl p-2 md:p-4 rounded-full shadow-inner group-hover:scale-110 transition self-start md:self-auto">
                      <img
                        src="src/assets/meat.png"
                        alt="Quality Icon"
                        className="w-8 h-8 md:w-14 md:h-14 object-contain"
                      />
                    </div>
                  </div>

                  {/* Isi (Deskripsi) */}
                  <div className="bg-gradient-to-b from-white to-red-50 p-4 md:p-8 leading-relaxed relative">
                    <p className="text-gray-800 text-base md:text-lg text-justify">
                      Sejak awal,{" "}
                      <span className="font-bold text-red-700">DeKremes & Crispy</span>{" "}
                      berdedikasi untuk menyajikan produk terbaik dengan harga terjangkau.
                      Kami percaya bahwa makanan enak tidak harus mahal, dan setiap acara
                      layak mendapatkan pesanan terbaik.
                    </p>
                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-xl md:rounded-3xl ring-1 ring-yellow-300/20 pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative rounded-xl md:rounded-3xl overflow-hidden w-full max-w-full transition duration-700 hover:scale-[1.02] hover:-rotate-[0.5deg] shadow-lg md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] group">
                {/* Shimmer Border */}
                <div className="absolute inset-0 rounded-xl md:rounded-3xl p-[2px] bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400 animate-[shimmer_6s_linear_infinite]"></div>
                <div className="relative rounded-xl md:rounded-3xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-red-800 to-red-700 text-white p-4 md:p-8 flex flex-col md:flex-row md:items-center justify-between border-b border-yellow-500/40">
                    <div className="mb-3 md:mb-0 md:flex-1">
                      <h3 className="text-lg md:text-2xl font-extrabold tracking-wide uppercase text-yellow-300 drop-shadow-md">
                        Pelayanan Terbaik
                      </h3>
                      <p className="text-white/80 text-sm md:text-base mt-1 md:mt-2">
                        Tim kami siap melayani pesanan Anda dengan ramah & profesional.
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-xl p-2 md:p-4 rounded-full shadow-inner group-hover:scale-110 transition self-start md:self-auto">
                      <img
                        src="src/assets/chicken.png"
                        alt="Service Icon"
                        className="w-8 h-8 md:w-14 md:h-14 object-contain"
                      />
                    </div>
                  </div>

                  {/* Isi (Deskripsi) */}
                  <div className="bg-gradient-to-b from-white to-red-50 p-4 md:p-8 leading-relaxed relative">
                    <p className="text-gray-800 text-base md:text-lg text-justify">
                      Dengan pengalaman melayani berbagai acara, kami memahami kebutuhan
                      khusus setiap pelanggan. Dari menu hingga eksekusi, kami hadir untuk
                      membuat acara Anda sukses.
                    </p>
                    <div className="absolute inset-0 rounded-xl md:rounded-3xl ring-1 ring-yellow-300/20 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image Card */}
            <div className="flex justify-center items-center mt-4 md:mt-0">
              <div className="rounded-xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl border-2 md:border-4 border-yellow-500 bg-gradient-to-b from-white to-red-50 w-full max-w-xs md:w-[420px] h-64 md:h-[520px] flex items-center justify-center">
                <img
                  src="src/assets/kegiatan/IMG-20240927-WA0001.jpg"
                  alt="Chef DeKremes"
                  className="w-[calc(100%-20px)] h-[calc(100%-20px)] md:w-[380px] md:h-[480px] object-cover rounded-lg md:rounded-2xl shadow-md transform transition duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-red-700 rounded-xl md:rounded-2xl p-6 md:p-10 text-white">
            <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">Tertarik Memesan?</h3>
            <p className="text-sm md:text-lg mb-4 md:mb-6 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk konsultasi menu dan penawaran terbaik untuk acara Anda.
            </p>
            <button className="bg-white text-red-700 font-bold px-6 py-2 md:px-8 md:py-3 rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105">
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        `}
      </style>
    </>
  );
}   

export default Tentang;