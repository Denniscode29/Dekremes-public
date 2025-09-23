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
      {/* HERO SECTION - Full gambar seperti sebelumnya */}
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

          <p className="text-gray-200 text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Nikmati promo spesial kami dan rasakan kenikmatan ayam crispy terbaik di kota!
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => window.location.href = '/menu'} 
              className="bg-[#B80000] text-white px-6 py-3 rounded-lg shadow-xl hover:bg-red-700 transition-transform transform hover:scale-105 text-sm md:text-base"
            >
              PESAN SEKARANG
            </button>
          </div>
        </div>
      </div>

      {/* MENU FAVORIT SECTION - TIDAK DIUBAH (sama seperti sebelumnya) */}
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

      {/* GALLERY SECTION - Dengan animasi yang lebih keren */}
      <div className="py-16 bg-red-600 relative overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"></div>
        
        <h2 className="text-4xl font-bold text-center mb-12 text-white relative z-10">
          Galeri Kegiatan Dekremes
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-6 px-6">
            {kegiatanImages.concat(kegiatanImages).map((img, index) => (
              <div key={index} className="relative group flex-shrink-0">
                <img 
                  src={img} 
                  alt="Kegiatan Dekremes" 
                  className="h-64 w-64 object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHICKEN POTATO SAUCE SECTION - Dengan animasi */}
      <div className="min-h-screen bg-[#FFF5CC] flex items-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-400/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center px-12 md:px-20 gap-8 max-w-7xl mx-auto">
          {/* Image Card dengan animasi */}
          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl opacity-75 blur-xl animate-pulse"></div>
              
              <div className="relative bg-black p-3 rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105">
                <img
                  src="src/assets/produk/ciken.jpeg"
                  alt="Ayam Geprek"
                  className="w-72 md:w-96 lg:w-[420px] rounded-lg object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Text Content dengan animasi */}
          <div className="text-center md:text-left md:pl-6">
            <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
              Ayam Crispy <span className="text-yellow-600">& Kentang</span>
            </h2>
            <p className="text-gray-700 mb-8 text-lg md:text-xl leading-relaxed">
              Ayam Crispy kami dibuat dari ayam pilihan yang digoreng hingga renyah,
              kemudian diulek bersama sambal spesial dan menggugah selera.
              Disajikan dengan nasi hangat dan lalapan segar, ayam crispy ini adalah
              pilihan sempurna untuk Anda yang menyukai cita rasa nikmat dan gurih
              dalam satu hidangan.
            </p>
            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 text-lg">
              ORDER NOW
            </button>
          </div>
        </div>
      </div>

      {/* HALAL CERTIFICATION SECTION - Dengan animasi mewah */}
      <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 py-20 px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Certificate Image dengan animasi */}
          <div className="flex justify-center md:justify-start">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl opacity-75 blur-xl animate-pulse"></div>
              <img
                src="src/assets/Halal_sertifikat.png"
                alt="Sertifikat Halal MUI"
                className="relative w-72 md:w-[320px] rounded-2xl shadow-2xl border-4 border-white transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Text Content dengan animasi */}
          <div className="text-white text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              BerSertifikasi <span className="text-yellow-300">Halal</span>
            </h2>
            <div className="space-y-4 text-lg md:text-xl">
              <p className="flex items-center justify-center md:justify-start gap-3">
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Kami berkomitmen untuk selalu menjaga kualitas dan kepercayaan pelanggan.
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Seluruh produk kami telah tersedia dengan Sertifikat Halal resmi dari
                Majelis Ulama Indonesia (MUI), sehingga Anda tidak perlu khawatir dalam
                menikmati setiap menu yang kami sajikan.
              </p>
            </div>
          </div>
        </div>

        {/* Halal Logo dengan animasi */}
        <div className="absolute bottom-8 right-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
            <img
              src="src/assets/Logo_Halal.png"
              alt="Logo Halal MUI"
              className="relative w-20 h-20 md:w-24 md:h-24 drop-shadow-2xl animate-float"
            />
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-16 right-16 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
      </div>

      {/* Custom Styles untuk animasi */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}

export default App;