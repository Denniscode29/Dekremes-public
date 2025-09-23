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
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef(null);

  // Intersection Observer untuk hero section saja
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeroVisible(true);
          } else {
            setIsHeroVisible(false);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

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
    const gap = 16;
    const padding = 32;
    
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

  // Reset hero animation ketika component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* HERO SECTION - WARNA MERAH FULL */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-700"
      >
        {/* Background dengan efek parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url("src/assets/chicken1.jpg")',
            transform: 'translateZ(-1px) scale(1.2)'
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        
        {/* Animated Background Elements - MERAH */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-400 rounded-full opacity-30 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`
              }}
            />
          ))}
        </div>

        {/* Main Content - WARNA MERAH FULL */}
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 transform ${
          isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Logo/Title dengan efek mewah - MERAH */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
              DeKremes
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-red-400 to-red-500">
                & Crispy
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-400 to-red-500 mx-auto rounded-full mb-6"></div>
          </div>

          {/* Tagline - MERAH */}
          <p className="text-gray-200 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Nikmati <span className="text-red-300 font-semibold">promo spesial</span> kami dan rasakan 
            kenikmatan ayam crispy <span className="text-red-300 font-semibold">terbaik</span> di kota!
          </p>

          {/* CTA Buttons - MERAH */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => window.location.href = '/menu'} 
              className="group relative bg-gradient-to-r from-red-400 to-red-600 text-white px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 font-bold text-lg md:text-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
                </svg>
                PESAN SEKARANG
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative border-3 border-red-400 text-red-400 px-10 py-5 rounded-full hover:bg-red-400 hover:text-white transition-all duration-300 font-bold text-lg md:text-xl overflow-hidden">
              <span className="relative z-10">LIHAT MENU LENGKAP</span>
              <div className="absolute inset-0 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator - MERAH */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-red-300 text-sm mb-2">Scroll</span>
            <div className="w-6 h-10 border-2 border-red-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-red-400 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* MENU FAVORIT SECTION - Tetap sama */}
      <div className="text-black w-full py-12 flex flex-col items-center justify-center" style={{backgroundColor: '#FFF5CC'}}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Menu Favorit</h2>
        <p className="max-w-2xl text-center mb-8 text-base md:text-lg mx-auto px-4">
          Temukan menu-menu favorit pelanggan kami yang selalu dinantikan kehadirannya.
        </p>

        <div className="relative w-full overflow-hidden px-4">
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

        <div className="flex justify-center mt-6 space-x-3 items-center">
          <button 
            onClick={prevMenu}
            disabled={currentMenuIndex === 0}
            className="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &#10094;
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: Math.max(1, favoriteMenus.length - getVisibleItemsCount() + 1) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${currentMenuIndex === index ? 'bg-red-600 scale-125' : 'bg-gray-300'}`}
                onClick={() => setCurrentMenuIndex(index)}
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

        <div className="mt-8">
          <button 
            onClick={() => window.location.href = '/menu'}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-red-700 transition transform hover:scale-105"
          >
            Lihat Semua Menu
          </button>
        </div>
      </div>

      {/* GALLERY SECTION - Tetap sama */}
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

      {/* AYAM CRISPY & KENTANG SECTION - Dengan Logo Makanan */}
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5CC] via-[#FFEBB5] to-[#FFF5CC] flex items-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-red-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-400/15 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        {/* Logo Bulat Ayam */}
        <div className="absolute top-20 left-20 animate-bounce">
          <div className="w-20 h-20 bg-red-500/30 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-400/50">
            <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>

        {/* Logo Bulat Kentang */}
        <div className="absolute bottom-32 right-32 animate-bounce delay-1000">
          <div className="w-16 h-16 bg-yellow-500/40 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-400/50">
            <svg className="w-8 h-8 text-yellow-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center px-8 lg:px-20 gap-12 max-w-7xl mx-auto">
          {/* Image Card dengan Logo Ayam */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative group">
              <div className="relative bg-white p-4 rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src="src/assets/produk/ciken.jpeg"
                    alt="Ayam Crispy & Kentang"
                    className="w-80 lg:w-96 xl:w-[450px] rounded-xl border-2 border-gray-100 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Badge Merah */}
                <div className="absolute -top-2 -right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  BEST SELLER
                </div>

                {/* Logo Ayam Kecil */}
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left lg:pl-8">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-red-600 mb-4 leading-tight">
                Ayam Crispy 
                <span className="block text-red-500">
                  & Kentang Spesial
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-500 rounded-full mb-6"></div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg font-medium">Ayam pilihan berkualitas premium</p>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg font-medium">Kentang goreng renyah dan gurih</p>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg font-medium">Sambal spesial racikan tradisional</p>
              </div>
            </div>

            <p className="text-gray-600 text-lg lg:text-xl mb-8 leading-relaxed">
              Ayam Crispy kami dibuat dari <span className="text-red-600 font-semibold">ayam pilihan terbaik</span> yang digoreng 
              dengan teknik khusus hingga mencapai tingkat kerenyahan sempurna. Disajikan bersama 
              <span className="text-red-500 font-semibold"> kentang goreng premium</span> dan sambal spesial yang menggugah selera.
            </p>

            {/* Single CTA Button Merah */}
            <div className="flex justify-center lg:justify-start">
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105 text-lg shadow-lg">
                ORDER SEKARANG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HALAL CERTIFICATION SECTION - DESIGN MEWAH DENGAN LOGO */}
      <div className="relative bg-gradient-to-br from-red-800 via-red-700 to-red-600 py-20 px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Logo Bulat Dekorasi */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-400/20 rounded-full animate-pulse border-4 border-red-300/30">
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce">
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-red-300/20 rounded-full animate-ping"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Certificate dengan Frame Mewah */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-red-600 rounded-3xl opacity-40 blur-2xl animate-pulse"></div>
              
              {/* Gold Frame */}
              <div className="relative bg-gradient-to-br from-red-300 via-red-400 to-red-500 p-4 rounded-2xl shadow-2xl">
                <div className="relative overflow-hidden rounded-lg border-4 border-white">
                  <img
                    src="src/assets/Halal_sertifikat.png"
                    alt="Sertifikat Halal MUI"
                    className="w-80 lg:w-96 rounded-lg transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </div>

              {/* Seal Badge */}
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce border-2 border-white">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Corner Decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-500 rounded-full"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-500 rounded-full"></div>
            </div>
          </div>

          {/* Text Content Mewah */}
          <div className="text-white text-center lg:text-left">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-red-400">
                  BerSertifikasi Halal
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-red-300 to-red-400 rounded-full mb-6"></div>
            </div>

            <div className="space-y-6 text-lg lg:text-xl">
              <div className="flex items-center justify-center lg:justify-start gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Kami berkomitmen untuk selalu menjaga <span className="text-red-300 font-semibold">kualitas dan kepercayaan</span> pelanggan.
                </p>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Seluruh produk kami telah tersedia dengan <span className="text-red-300 font-semibold">Sertifikat Halal resmi</span> dari
                  Majelis Ulama Indonesia (MUI).
                </p>
              </div>
            </div>

            {/* Trust Badges Mewah */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              {['MUI Certified', '100% Halal', 'Quality Guarantee'].map((badge, index) => (
                <span key={index} className="bg-red-500/30 text-red-200 px-4 py-2 rounded-full text-sm font-semibold border border-red-400/50 backdrop-blur-sm">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Halal Logo */}
        <div className="absolute bottom-8 right-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
            <div className="relative bg-gradient-to-br from-red-300 to-red-500 p-3 rounded-full shadow-2xl border-2 border-white">
              <img
                src="src/assets/Logo_Halal.png"
                alt="Logo Halal MUI"
                className="w-16 h-16 lg:w-20 lg:h-20 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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
          animation: scroll 30s linear infinite;
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