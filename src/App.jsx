import { useState, useRef, useEffect, useCallback } from "react";

function App() {
  // Data untuk menu favorit
  const favoriteMenus = [
    {
      name: "Big Mac®",
      description: "Dua patty daging sapi spesial dengan saus Big Mac, selada, keju, acar, bawang.",
      image: "src/assets/chicken.png",
      price: "Rp 35.000"
    },
    {
      name: "Pallas 1",
      description: "Ayam krispi terbaik dengan saus spesial dan sayuran segar dalam roti premium.",
      image: "src/assets/chicken.png",
      price: "Rp 32.000"
    },
    {
      name: "Pallas Special",
      description: "Kreasi istimewa dengan daging ayam pilihan, saus rahasia, dan sayuran segar.",
      image: "src/assets/chicken.png",
      price: "Rp 38.000"
    },
    {
      name: "McChicken",
      description: "Potongan ayam gurih dilapisi tepung krispi, dengan mayones dan selada segar.",
      image: "src/assets/chicken.png",
      price: "Rp 30.000"
    },
    {
      name: "McNuggets®",
      description: "Potongan ayam tanpa tulang yang digoreng hingga garing, cocok dengan saus.",
      image: "src/assets/chicken.png",
      price: "Rp 28.000"
    },
    {
      name: "Crispy Deluxe",
      description: "Ayam crispy dengan saus spesial dan sayuran segar dalam roti premium.",
      image: "src/assets/chicken.png",
      price: "Rp 36.000"
    }
  ];

  // Data gambar kegiatan
  const kegiatanImages = [
    "src/assets/kegiatan/IMG-20240927-WA0001.jpg",
    "src/assets/kegiatan/IMG-20250203-WA0001.jpg",
    "src/assets/kegiatan/IMG-20250203-WA0015.jpg",
    "src/assets/kegiatan/IMG-20250320-WA0134.jpg",
    "src/assets/kegiatan/IMG-20250320-WA0146.jpg",
    "src/assets/kegiatan/IMG20250523081115.jpg",
    "src/assets/kegiatan/IMG20250619072923.jpg"
  ];

  // State untuk carousel menu favorit
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const menuCarouselRef = useRef(null);
  const [menuItemWidth, setMenuItemWidth] = useState(0);

  // State untuk banner carousel
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerData = [
    {
      image: "src/assets/banner.jpg",
      title: "Promo Spesial 1",
      description: "Diskon 20% untuk semua menu ayam crispy"
    },
    {
      image: "src/assets/banner2.jpg", 
      title: "Promo Spesial 2",
      description: "Buy 1 Get 1 untuk pembelian minuman"
    },
    {
      image: "src/assets/banner3.jpg",
      title: "Promo Spesial 3",
      description: "Paket keluarga dengan harga spesial"
    }
  ];

  // Auto slide untuk banner carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [bannerData.length]);

  // Auto slide untuk menu carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMenuIndex((prev) => {
        const visibleItems = getVisibleItemsCount();
        return (prev + 1) % (favoriteMenus.length - visibleItems + 1);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [favoriteMenus.length]);

  // Fungsi navigasi banner carousel
  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerData.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };

  // Fungsi untuk mengatur lebar item menu carousel
  const updateMenuItemWidth = useCallback(() => {
    const containerWidth = window.innerWidth;
    const visibleItems = getVisibleItemsCount();
    const gap = 16; // gap between items
    const padding = 32; // total horizontal padding
    
    // Calculate item width based on container width, gaps and padding
    const calculatedWidth = (containerWidth - padding - (gap * (visibleItems - 1))) / visibleItems;
    setMenuItemWidth(calculatedWidth);
  }, []);

  // Efek untuk mengatur ulang carousel menu saat ukuran layar berubah
  useEffect(() => {
    updateMenuItemWidth();
    window.addEventListener('resize', updateMenuItemWidth);
    return () => window.removeEventListener('resize', updateMenuItemWidth);
  }, [updateMenuItemWidth]);

  // Menghitung jumlah item yang ditampilkan berdasarkan lebar layar
  const getVisibleItemsCount = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  };

  // Navigasi menu carousel
  const nextMenu = () => {
    const visibleItems = getVisibleItemsCount();
    if (currentMenuIndex < favoriteMenus.length - visibleItems) {
      setCurrentMenuIndex(currentMenuIndex + 1);
    }
  };

  const prevMenu = () => {
    if (currentMenuIndex > 0) {
      setCurrentMenuIndex(currentMenuIndex - 1);
    }
  };

  // Menghitung translateX untuk carousel
  const calculateTranslateX = () => {
    const gap = 16;
    return -currentMenuIndex * (menuItemWidth + gap);
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background full layer */}
        <img
          src="src/assets/chicken1.jpg"
          alt="DeKremes Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay biar teks lebih jelas */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Konten Hero */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            DeKremes
            <span className="block text-red-500">& Crispy</span>
          </h1>

          {/* Banner Carousel - Diposisikan di bawah judul */}
          <div className="relative mx-auto mb-8 max-w-4xl overflow-hidden rounded-xl shadow-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
              {bannerData.map((banner, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  <img 
                    src={banner.image} 
                    className="w-full h-56 object-cover" 
                    alt={`Promo ${index+1}`} 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white text-xl font-bold">{banner.title}</h3>
                    <p className="text-gray-200 text-sm">{banner.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons untuk banner carousel */}
            <button 
              onClick={prevBanner}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 text-white p-2 rounded-full hover:bg-black transition"
            >
              &#10094;
            </button>
            <button 
              onClick={nextBanner}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 text-white p-2 rounded-full hover:bg-black transition"
            >
              &#10095;
            </button>

            {/* Indicator dots untuk banner carousel */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {bannerData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentBanner === idx ? 'bg-white scale-125' : 'bg-gray-400'
                  }`}
                ></button>
              ))}
            </div>
          </div>

          <p className="text-gray-200 text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Nikmati promo spesial kami dan rasakan kenikmatan ayam crispy terbaik di kota!
          </p>

          <div className="flex justify-center">
            <button
            onClick={() => window.location.href = '/menu'} 
            className="bg-[#B80000] text-white px-6 py-3 rounded-lg shadow-xl hover:bg-red-700 transition-transform transform hover:scale-105 text-sm md:text-base">
              PESAN SEKARANG
            </button>
          </div>
        </div>
      </div>

      {/* MENU FAVORIT SECTION - Background diubah menjadi #FFF5CC */}
      <div className="text-black w-full py-12 flex flex-col items-center justify-center" style={{backgroundColor: '#FFF5CC'}}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Menu Favorit</h2>
        <p className="max-w-2xl text-center mb-8 text-base md:text-lg mx-auto px-4">
          Temukan menu-menu favorit pelanggan kami yang selalu dinantikan kehadirannya.
        </p>

        {/* Carousel Container - Full width dengan padding */}
        <div className="relative w-full overflow-hidden px-4">
          {/* Carousel Track */}
          <div 
            ref={menuCarouselRef}
            className="flex transition-transform duration-500 ease-out gap-4"
            style={{ 
              transform: `translateX(${calculateTranslateX()}px)`,
              userSelect: 'none'
            }}
          >
            {favoriteMenus.map((menu, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex-shrink-0"
                style={{ 
                  width: `${menuItemWidth}px`,
                  minWidth: `${menuItemWidth}px`
                }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={menu.image} 
                    alt={menu.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-red-600 mb-2">{menu.name}</h3>
                  <p className="text-gray-700 text-sm mb-4 h-12 overflow-hidden">
                    {menu.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-red-600">{menu.price}</span>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition">
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons untuk menu carousel */}
        <div className="flex justify-center mt-6 space-x-3 items-center">
          <button 
            onClick={prevMenu}
            disabled={currentMenuIndex === 0}
            className="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &#10094;
          </button>
          
          {/* Navigation Dots */}
          <div className="flex space-x-2">
            {Array.from({ length: Math.max(1, favoriteMenus.length - getVisibleItemsCount() + 1) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${currentMenuIndex === index ? 'bg-red-600 scale-125' : 'bg-gray-300'}`}
                onClick={() => setCurrentMenuIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextMenu}
            disabled={currentMenuIndex >= Math.max(0, favoriteMenus.length - getVisibleItemsCount())}
            className="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &#10095;
          </button>
        </div>

        {/* View All Menu Button */}
        <div className="mt-8">
          <button 
            onClick={() => window.location.href = '/menu'}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-red-700 transition transform hover:scale-105"
          >
            Lihat Semua Menu
          </button>
        </div>
      </div>

      {/* GALLERY SECTION - Tambahan section baru untuk gambar kegiatan */}
      <div className="py-12 bg-red-600">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Galeri Kegiatan Dekremes</h2>
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll">
            {kegiatanImages.concat(kegiatanImages).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt="Kegiatan Dekremes" 
                className="h-48 md:h-64 w-auto object-cover mx-2 rounded-lg shadow-md" 
              />
            ))}
          </div>
        </div>
      </div>

      {/* CHICKEN POTATO SAUCE */}
      <div className="bg-[#FFF5CC] py-16 flex items-center relative overflow-hidden">
        {/* Tomat Dekorasi di background */}
        <img
          src="src/assets/tomatokiri.png"
          alt="Tomat"
          className="absolute top-10 left-10 w-24 opacity-90"
        />
        <img
          src="src/assets/tomato.png"
          alt="Tomat"
          className="absolute top-16 right-8 w-28 opacity-90"
        />
        <img
          src="src/assets/tomato.png"
          alt="Tomat"
          className="absolute bottom-12 left-16 w-20 opacity-90"
        />
        <img
          src="src/assets/tomato.png"
          alt="Tomat"
          className="absolute bottom-8 right-12 w-24 opacity-90"
        />

        {/* Isi Konten */}
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-10">
          {/* Kiri - Card Gambar */}
          <div className="bg-black p-3 rounded-xl shadow-lg flex justify-center hover:scale-105 transition">
            <img
              src="src/assets/produk/ciken.jpeg"
              alt="Ayam Geprek"
              className="w-52 md:w-72 lg:w-80 rounded-lg object-contain"
            />
          </div>

          {/* Kanan - Teks */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-3">
              Ayam Crispy & Kentang
            </h2>
            <p className="text-gray-700 mb-4 text-base">
              Ayam Crispy kami dibuat dari ayam pilihan yang digoreng hingga renyah,
               kemudian diulek bersama sambal spesial dan menggugah selera.
                Disajikan dengan nasi hangat dan lalapan segar, ayam crispy ini adalah
                 pilihan sempurna untuk Anda yang menyukai cita rasa nikmat dan gurih dalam satu hidangan.
            </p>
            <button className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-transform transform hover:scale-105 text-sm">
              ORDER NOW
            </button>
          </div>
        </div>
      </div>

      {/* HALAL CERTIFICATION SECTION - Dengan efek 3D dan struktur yang diinginkan */}
      <div className="relative bg-[#FFF5CC] pt-20 pb-16 overflow-hidden">
        {/* Lengkungan gradien di atas */}
        <div className="absolute top-0 left-0 w-full">
          <img 
            src="src/assets/payunggradien.png" 
            alt="Gradient Curve" 
            className="w-full h-24 object-cover"
          />
        </div>
        
        {/* Overlay merah dengan opasitas */}
        <div className="absolute inset-0 bg-[#F60000] bg-opacity-10"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Teks - Lebih proporsional */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <img 
                  src="src/assets/Logo_Halal.png" 
                  alt="Logo Halal MUI" 
                  className="w-16 h-16 mr-4 drop-shadow-md"
                />
                <h2 className="text-3xl md:text-4xl font-bold text-[bg-white] drop-shadow-sm">BerSertifikasi Halal</h2>
              </div>
              <p className="text-[white] text-lg leading-relaxed mb-4 font-medium">
                Kami berkomitmen untuk selalu menjaga kualitas dan kepercayaan pelanggan.
              </p>
              <p className="text-[white] text-lg leading-relaxed">
                Seluruh produk kami telah tersedia dengan Sertifikat Halal resmi dari Majelis Ulama Indonesia (MUI), sehingga Anda tidak perlu khawatir dalam menikmati setiap menu yang kami sajikan.
              </p>
              
              <div className="mt-8 flex justify-center lg:justify-start">
                <div className="bg-gradient-to-r from-[#FFD700] to-[#FFB700] px-4 py-2 rounded-lg inline-flex items-center border border-[#8B0000] shadow-md hover:shadow-lg transition-shadow">
                  <svg className="w-5 h-5 text-[#8B0000] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#8B0000] font-medium">Terdaftar resmi di MUI</span>
                </div>
              </div>
            </div>
            
            {/* Gambar Sertifikat - Dengan efek 3D */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative group">
                {/* Efek latar belakang 3D */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#FFD700] to-[#FF6B00] rounded-2xl transform group-hover:rotate-3 group-hover:scale-105 transition-all duration-500 opacity-70 blur-sm group-hover:blur-md"></div>
                
                {/* Frame sertifikat */}
                <div className="relative bg-white p-3 rounded-2xl shadow-xl border-2 border-[#8B0000] transform group-hover:-translate-y-2 transition-transform duration-500">
                  <img 
                    src="src/assets/Halal_sertifikat.png" 
                    alt="Sertifikat Halal MUI" 
                    className="w-full max-w-md rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Stempel logo halal */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#FFD700] to-[#FF6B00] p-2 rounded-full shadow-lg border-2 border-[#8B0000] transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    <img 
                      src="src/assets/Logo_Halal.png" 
                      alt="Logo Halal MUI" 
                      className="w-12 h-12"
                    />
                  </div>
                  
                  {/* Efek kilau saat hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS untuk animasi scroll otomatis */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </>
  );
}

export default App;