import { useState, useRef, useEffect, useCallback } from "react";

function App() {
  // Data untuk menu favorit
  const favoriteMenus = [
    {
      name: "Big Mac®",
      description: "Dua patty daging sapi spesial dengan saus Big Mac, selada, keju, acar, bawang.",
      image: "src/assets/chicken.png",
      price: "Rp 35.000",
      badge: "BEST SELLER"
    },
    {
      name: "Pallas 1",
      description: "Ayam krispi terbaik dengan saus spesial dan sayuran segar dalam roti premium.",
      image: "src/assets/chicken.png",
      price: "Rp 32.000",
      badge: "NEW"
    },
    {
      name: "Pallas Special",
      description: "Kreasi istimewa dengan daging ayam pilihan, saus rahasia, dan sayuran segar.",
      image: "src/assets/chicken.png",
      price: "Rp 38.000",
      badge: "PREMIUM"
    },
    {
      name: "McChicken",
      description: "Potongan ayam gurih dilapisi tepung krispi, dengan mayones dan selada segar.",
      image: "src/assets/chicken.png",
      price: "Rp 30.000",
      badge: "FAVORITE"
    },
    {
      name: "McNuggets®",
      description: "Potongan ayam tanpa tulang yang digoreng hingga garing, cocok dengan saus.",
      image: "src/assets/chicken.png",
      price: "Rp 28.000",
      badge: "POPULAR"
    },
    {
      name: "Crispy Deluxe",
      description: "Ayam crispy dengan saus spesial dan sayuran segar dalam roti premium.",
      image: "src/assets/chicken.png",
      price: "Rp 36.000",
      badge: "SPECIAL"
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

  // Data FAQ
  const faqData = [
    {
      question: "Apa saja menu andalan DeKremes & Crispy?",
      answer: "Kami memiliki beberapa menu andalan seperti Ayam Crispy Original, Ayam Kremes Spesial, Big Mac®, Pallas Special, dan berbagai varian burger premium. Semua menu menggunakan bahan-bahan segar dan berkualitas tinggi."
    },
    {
      question: "Apakah DeKremes & Crispy menyediakan layanan pesan antar?",
      answer: "Ya, kami menyediakan layanan pesan antar melalui berbagai platform seperti GoFood, GrabFood, dan juga pesanan langsung via WhatsApp. Minimal pesan Rp 50.000 untuk area tertentu."
    },
    {
      question: "Bagaimana sistem pembayaran yang tersedia?",
      answer: "Kami menerima pembayaran tunai, transfer bank (BCA, BRI, Mandiri), e-wallet (GoPay, OVO, Dana), dan QRIS. Untuk pesanan online, pembayaran dapat dilakukan melalui aplikasi mitra kami."
    },
    {
      question: "Apakah ada promo atau diskon khusus?",
      answer: "Ya, kami selalu memiliki promo menarik setiap bulannya. Untuk info promo terkini, follow Instagram kami @dekremes_crispy atau cek website secara rutin. Member kartu setia juga dapat penawaran spesial!"
    },
    {
      question: "Berapa lama waktu pengiriman pesanan?",
      answer: "Waktu pengiriman bervariasi tergantung lokasi dan volume pesanan. Rata-rata 30-45 menit untuk area dalam kota, dan maksimal 60 menit untuk area pinggiran. Pesanan siap pickup dalam 15-20 menit."
    },
    {
      question: "Apakah DeKremes & Crispy halal?",
      answer: "Sangat halal! Kami memiliki sertifikat halal resmi dari MUI dan semua bahan yang digunakan dipastikan kehalalannya. Daging ayam kami berasal dari supplier terpercaya dengan sistem penyembelihan sesuai syariat Islam."
    },
    {
      question: "Apakah bisa pesan untuk acara catering?",
      answer: "Tentu bisa! Kami melayani pesanan catering untuk berbagai acara seperti ulang tahun, meeting kantor, arisan, dan acara keluarga. Minimal pesan 50 porsi dengan pemesanan H-3. Hubungi kami untuk penawaran khusus."
    },
    {
      question: "Bagaimana cara menjadi member setia?",
      answer: "Daftar member gratis di outlet kami dan dapatkan kartu member. Setiap pembelian terkumpul poin yang bisa ditukar dengan menu gratis atau diskon spesial. Member juga dapat info promo eksklusif!"
    }
  ];

  // State untuk menu favorit
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const menuCarouselRef = useRef(null);
  const [menuItemWidth, setMenuItemWidth] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef(null);
  const modalRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Fungsi toggle FAQ
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Intersection Observer untuk hero section
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
    }, 4000);
    
    return () => clearInterval(interval);
  }, [favoriteMenus.length]);

  // Fungsi untuk mengatur lebar item menu carousel
  const updateMenuItemWidth = useCallback(() => {
    const containerWidth = window.innerWidth;
    const visibleItems = getVisibleItemsCount();
    const gap = 24;
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
    const gap = 24;
    return -currentMenuIndex * (menuItemWidth + gap);
  };

  // Fungsi untuk menangani klik menu
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setAnimationClass("animate-pop-in");
    setShowModal(true);
    
    // Reset animation setelah selesai
    setTimeout(() => {
      setAnimationClass("animate-float");
    }, 500);
  };

  // Tutup modal
  const closeModal = () => {
    setAnimationClass("animate-pop-out");
    setTimeout(() => {
      setShowModal(false);
      setSelectedMenu(null);
    }, 300);
  };

  // Effect untuk close modal ketika klik outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Reset hero animation ketika component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* HERO SECTION - JUDUL MERAH SOLID */}
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
        
        {/* Animated Background Elements - KEMBALI KE AWAL */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-800 rounded-full opacity-30 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`
              }}
            />
          ))}
        </div>

        {/* Main Content - JUDUL MERAH SOLID */}
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 transform ${
          isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Logo/Title dengan efek mewah - MERAH SOLID */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
              DeKremes
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-700 to-red-500">
                & Crispy
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-400 to-red-500 mx-auto rounded-full mb-6"></div>
          </div>

          {/* Tagline - MERAH */}
          <p className="text-gray-200 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Nikmati <span className="text-red-500 font-semibold">promo spesial</span> kami dan rasakan 
            kenikmatan ayam crispy <span className="text-red-500 font-semibold">terbaik</span> di kota!
          </p>

          {/* CTA Buttons - MERAH */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => window.location.href = '/menu'} 
              className="group relative bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 font-bold text-lg md:text-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
                </svg>
                PESAN SEKARANG
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative border-3 border-red-400 text-red-400 px-10 py-5 rounded-full hover:bg-red-700 hover:text-white transition-all duration-300 font-bold text-lg md:text-xl overflow-hidden">
              <span className="relative z-10">LIHAT MENU LENGKAP</span>
              <div className="absolute inset-0 bg-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
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

      {/* MENU FAVORIT SECTION - DESIGN MEWAH */}
      <div className="relative py-20 bg-gradient-to-br from-[#FFF5CC] via-[#FFEBB5] to-[#FFF5CC] overflow-hidden">
        {/* Background Elements Mewah */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-red-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Food Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 bg-red-400/20 rounded-full animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 8 + 6}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section Header Mewah */}
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-red-600 mb-4 relative z-10">
                MENU FAVORIT
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-red-500 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-red-400 rounded-full"></div>
            </div>
            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
              Temukan <span className="text-red-600 font-semibold">menu-menu spesial</span> yang selalu dinantikan oleh pelanggan setia kami
            </p>
          </div>

          {/* Carousel Container Mewah */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={prevMenu}
              disabled={currentMenuIndex === 0}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextMenu}
              disabled={currentMenuIndex >= Math.max(0, favoriteMenus.length - getVisibleItemsCount())}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Items */}
            <div className="relative overflow-hidden rounded-3xl">
              <div 
                ref={menuCarouselRef}
                className="flex transition-transform duration-700 ease-out gap-6 py-4"
                style={{ 
                  transform: `translateX(${calculateTranslateX()}px)`,
                  userSelect: 'none'
                }}
              >
                {favoriteMenus.map((menu, index) => (
                  <div 
                    key={index}
                    onClick={() => handleMenuClick(menu)}
                    className="group cursor-pointer transform transition-all duration-500 hover:scale-105 active:scale-95"
                    style={{ 
                      width: `${menuItemWidth}px`,
                      minWidth: `${menuItemWidth}px`
                    }}
                  >
                    {/* Card Mewah */}
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent group-hover:border-red-400 group-hover:shadow-3xl transition-all duration-300">
                      {/* Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                          menu.badge === "BEST SELLER" ? "bg-red-600" :
                          menu.badge === "NEW" ? "bg-green-500" :
                          menu.badge === "PREMIUM" ? "bg-purple-500" :
                          menu.badge === "FAVORITE" ? "bg-pink-500" :
                          menu.badge === "POPULAR" ? "bg-blue-500" : "bg-orange-500"
                        }`}>
                          {menu.badge}
                        </span>
                      </div>

                      {/* Image Container */}
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={menu.image} 
                          alt={menu.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                            {menu.name}
                          </h3>
                          <div className="w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {menu.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-black text-red-600">{menu.price}</span>
                          <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg group-hover:shadow-xl">
                            Pesan
                          </button>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 border-4 border-red-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: Math.max(1, favoriteMenus.length - getVisibleItemsCount() + 1) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentMenuIndex === index 
                      ? 'bg-red-600 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentMenuIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl group overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
                </svg>
                LIHAT SEMUA MENU
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL MENU MEWAH */}
      {showModal && selectedMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            ref={modalRef}
            className={`relative bg-white rounded-3xl shadow-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden ${animationClass}`}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 transform hover:rotate-90 shadow-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="relative">
              {/* Image Section */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={selectedMenu.image} 
                  alt={selectedMenu.name}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-2xl ${
                    selectedMenu.badge === "BEST SELLER" ? "bg-red-600" :
                    selectedMenu.badge === "NEW" ? "bg-green-500" :
                    selectedMenu.badge === "PREMIUM" ? "bg-purple-500" :
                    selectedMenu.badge === "FAVORITE" ? "bg-pink-500" :
                    selectedMenu.badge === "POPULAR" ? "bg-blue-500" : "bg-orange-500"
                  }`}>
                    {selectedMenu.badge}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
                    {selectedMenu.name}
                  </h3>
                  <div className="w-20 h-1 bg-red-500 rounded-full mx-auto"></div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-6 text-center">
                  {selectedMenu.description}
                </p>

                <div className="text-center mb-8">
                  <span className="text-4xl font-black text-red-600">{selectedMenu.price}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300">
                    Tambah Ke Keranjang
                  </button>
                  <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105">
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY SECTION */}
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

      {/* AYAM CRISPY & KENTANG SECTION */}
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
              <div className="w-24 h-1 bg-red-500 rounded-full mb-6"></div>
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

      {/* HALAL CERTIFICATION SECTION */}
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
            </div>
          </div>

          {/* Text Content Mewah */}
          <div className="text-white text-center lg:text-left">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-red-200">
                  BerSertifikasi Halal
                </span>
              </h2>
              <div className="w-20 h-1 bg-red-400 rounded-full mb-6"></div>
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

      {/* FAQ SECTION - BARU DITAMBAHKAN */}
      <div className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-red-600 mb-4 relative z-10">
                FAQ
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-red-500 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-red-400 rounded-full"></div>
            </div>
            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
              Pertanyaan yang sering diajukan tentang <span className="text-red-600 font-semibold">DeKremes & Crispy</span>
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <svg 
                    className={`w-6 h-6 text-red-600 transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Masih ada pertanyaan?
              </h3>
              <p className="text-red-100 mb-6 text-lg">
                Hubungi customer service kami yang siap membantu 24/7
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  📞 Hubungi Kami
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300">
                  💬 Chat WhatsApp
                </button>
              </div>
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
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes pop-out {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.5); opacity: 0; }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .animate-pop-out {
          animation: pop-out 0.3s ease-in;
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default App;