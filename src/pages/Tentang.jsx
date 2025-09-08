function Tentang() {
  return (
    <>
      {/* Header Section */}
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

      {/* Main Content */}
      <div className="bg-[#FFF5CC] py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Company Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-red-600 mb-6">DeKremes & Crispy</h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed">
              DeKremes & Crispy adalah franchise makanan crispy yang berkomitmen menyajikan cita rasa terbaik 
              dengan kualitas premium. Kami melayani berbagai pesanan untuk acara sekolah, pengajian, ulang tahun, 
              dan acara spesial lainnya. Dengan pengalaman dalam bidang kuliner, kami hadir untuk memenuhi kebutuhan 
              catering dengan harga terjangkau dan rasa yang istimewa.
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-red-600 text-center mb-10">Layanan Kami</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* School Event */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-56 overflow-hidden">
                  <img 
                    src="src/assets/kegiatan/IMG-20250320-WA0146.jpg" 
                    alt="Acara Sekolah" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-red-600 mb-3">Acara Sekolah</h4>
                  <p className="text-gray-700">
                    Melayani pesanan untuk acara sekolah seperti pentas seni, bazar, atau perayaan hari besar dengan paket khusus untuk siswa dan guru.
                  </p>
                </div>
              </div>

              {/* Birthday Event */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-56 overflow-hidden">
                  <img 
                    src="src/assets/kegiatan/IMG20250619072923.jpg" 
                    alt="Acara Ulang Tahun" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-red-600 mb-3">Ulang Tahun</h4>
                  <p className="text-gray-700">
                    Membuat acara ulang tahun semakin spesial dengan berbagai pilihan paket crispy yang disukai oleh semua usia.
                  </p>
                </div>
              </div>

              {/* Religious Event */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-56 overflow-hidden">
                  <img 
                    src="src/assets/kegiatan/IMG-20250203-WA0015.jpg" 
                    alt="Acara Pengajian" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-red-600 mb-3">Acara Pengajian</h4>
                  <p className="text-gray-700">
                    Menyediakan catering untuk acara pengajian, syukuran, atau acara keagamaan lainnya dengan menu yang beragam dan halal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="bg-red-700 text-white rounded-2xl shadow-lg p-8 flex items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Komitmen terhadap Kualitas</h3>
                  <p>Kami hanya menggunakan bahan-bahan terbaik untuk memastikan cita rasa yang konsisten dan nikmat.</p>
                </div>
                <img 
                  src="src/assets/meat.png" 
                  alt="Quality Icon" 
                  className="w-20 h-20 ml-6 object-contain" 
                />
              </div>

              <p className="text-red-600 text-xl leading-relaxed text-justify">
                Sejak awal, DeKremes & Crispy berdedikasi untuk menyajikan produk terbaik dengan harga terjangkau. 
                Kami percaya bahwa makanan enak tidak harus mahal, dan setiap acara layak mendapatkan catering terbaik.
              </p>
            </div>

            {/* Center Image */}
            <div className="flex justify-center">
              <img
                src="src/assets/kegiatan/IMG-20240927-WA0001.jpg"
                alt="Chef DeKremes"
                className="w-80 h-auto object-contain"
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="bg-red-700 text-white rounded-2xl shadow-lg p-8 flex items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Pelayanan Terbaik</h3>
                  <p>Tim kami siap melayani pesanan Anda dengan ramah dan profesional untuk berbagai jenis acara.</p>
                </div>
                <img 
                  src="src/assets/chicken.png" 
                  alt="Service Icon" 
                  className="w-20 h-20 ml-6 object-contain" 
                />
              </div>

              <p className="text-red-600 text-xl leading-relaxed text-justify">
                Dengan pengalaman melayani berbagai acara, kami memahami kebutuhan khusus setiap pelanggan. 
                Dari perencanaan menu hingga eksekusi, kami hadir untuk membuat acara Anda sukses.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-red-700 rounded-2xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-4">Tertarik Memesan?</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk konsultasi menu dan penawaran terbaik untuk acara Anda.
            </p>
            <button className="bg-white text-red-700 font-bold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105">
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </>
  );
}   

export default Tentang;