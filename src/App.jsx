import { useState, useRef, useEffect } from "react";

function App() {
  // Data untuk menu favorit - menggunakan menu dari American Original Taste
  const favoriteMenus = [
    {
      name: "Ayam Crispy Original Dada",
      description: "AYAM DADA NASI + SAUS SAMBAL - Kerenyahan sempurna dengan daging dada ayam pilihan",
      image: "src/assets/menu/original - dada ayam.png",
      price: "Rp 15.000",
    },
    {
      name: "Ayam Crispy Original Paha Atas",
      description: "AYAM PAHA ATAS NASI + SAUS SAMBAL - Potongan paha atas yang juicy dan gurih",
      image: "src/assets/menu/original - paha atas.png",
      price: "Rp 15.000",
    },
    {
      name: "Ayam Crispy Original Paha Bawah",
      description: "AYAM PAHA BAWAH NASI + SAUS SAMBAL - Tekstur lembut dengan cita rasa original",
      image: "src/assets/menu/original - paha bawah.png",
      price: "Rp 13.000",
    },
    {
      name: "Ayam Crispy Original Sayap",
      description: "AYAM SAYAP NASI + SAUS SAMBAL - Sayap ayam crispy dengan bumbu spesial",
      image: "src/assets/menu/original - sayap ayam.png",
      price: "Rp 13.000",
    },
    {
      name: "Ayam Crispy Cheese Dada",
      description: "AYAM DADA KEJU NASI + SAUS SAMBAL - Kombinasi crispy dan keju yang lumer",
      image: "src/assets/menu/cheese - dada ayam.png",
      price: "Rp 17.000",
    },
    {
      name: "Burger Special",
      description: "BURGER DENGAN AYAM CRISPY SPECIAL - Burger premium dengan ayam crispy terbaik",
      image: "src/assets/menu/burger.png",
      price: "Rp 18.000",
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

  // Data FAQ - hanya 5 yang dipilih
  const faqData = [
    {
      question: "Apa saja menu andalan DeKremes & Crispy?",
      answer: "Kami memiliki beberapa menu andalan seperti Ayam Crispy Original, Ayam Kremes Spesial, Cheese Series, Blackpepper Series, dan berbagai varian burger premium. Semua menu menggunakan bahan-bahan segar dan berkualitas tinggi."
    },
    {
      question: "Apakah DeKremes & Crispy menyediakan layanan pesan antar?",
      answer: "Ya, kami menyediakan layanan pesan antar melalui berbagai platform seperti GoFood, GrabFood, dan juga pesanan langsung via WhatsApp. Minimal pesan Rp 50.000 untuk area tertentu."
    },
    {
      question: "Bagaimana cara menghubungi DeKremes & Crispy?",
      answer: "Anda dapat menghubungi kami melalui WhatsApp di nomor 0877-8814-8113(dengan catatan ada kepentingan seperti pemesanan, acara sekolah dan yang berhubungan dengan kami, selain itu kami tidak akan merespon) atau follow Instagram kami @dekremescrispychicken untuk informasi terbaru dan promo menarik."
    },
    {
      question: "Apakah ada promo atau diskon khusus?",
      answer: "Ya, kami selalu memiliki promo menarik setiap bulannya. Untuk info promo terkini, follow Instagram kami @dekremes_crispy atau cek website secara rutin. Member kartu setia juga dapat penawaran spesial!"
    },
    {
      question: "Apakah DeKremes & Crispy halal?",
      answer: "Sangat halal! Kami memiliki sertifikat halal resmi dari MUI dan semua bahan yang digunakan dipastikan kehalalannya. Daging ayam kami berasal dari supplier terpercaya dengan sistem penyembelihan sesuai syariat Islam."
    }
  ];

  // State untuk menu favorit
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
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
      {/* HERO SECTION - HANYA 3 WARNA: AMBER, RED, WHITE */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-500 via-red-500 to-amber-400"
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
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-30 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 transform ${
          isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
              DeKremes
              <span className="block text-amber-400 text-4xl md:text-7xl">
                & Crispy
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-white mx-auto rounded-full mb-6"></div>
          </div>

          {/* Tagline */}
          <p className="text-white text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Nikmati <span className="text-amber-400 font-semibold">promo spesial</span> kami dan rasakan 
            kenikmatan ayam crispy <span className="text-amber-400 font-semibold">terbaik</span> di kota!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <button
              onClick={() => window.location.href = '/menu'} 
              className="group relative bg-gradient-to-r from-amber-400 to-amber-400 text-white px-6 py-4 md:px-10 md:py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-bold text-base md:text-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
                </svg>
                PESAN SEKARANG
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator - HIDUPKAN DI DESKTOP, HILANGKAN DI MOBILE */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-amber-400 text-sm mb-2">Scroll</span>
            <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-amber-400 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* MENU FAVORIT SECTION DENGAN INFINITE LOOP - DIUBAH: Hanya gambar, nama, dan tombol */}
      <div className="relative py-12 md:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Food Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 bg-red-500/20 rounded-full animate-float-slow"
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
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-red-500 mb-4 relative z-10">
                MENU FAVORIT
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 md:w-48 h-1 md:h-2 bg-amber-400 rounded-full"></div>
            </div>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mt-4 md:mt-6 leading-relaxed">
              Temukan <span className="text-red-500 font-semibold">menu-menu spesial</span> yang selalu dinantikan oleh pelanggan setia kami
            </p>
          </div>

          {/* Infinite Loop Carousel - DIUBAH: Hanya gambar, nama, dan tombol */}
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll-slow">
              {favoriteMenus.concat(favoriteMenus).map((menu, index) => (
                <div 
                  key={index}
                  onClick={() => handleMenuClick(menu)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105 mx-2 flex-shrink-0"
                  style={{ width: '280px' }}
                >
                  {/* Enhanced Card Design */}
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent group-hover:border-amber-400 group-hover:shadow-3xl transition-all duration-300 h-full flex flex-col">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-80 transition duration-700"></div>
                    
                    <div className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col z-10">
                      {/* Image Container */}
                      <div className="relative aspect-square w-full bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-2">
                          <img 
                            src={menu.image} 
                            alt={menu.name} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23fbbf24'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='white'%3EImage%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        {/* Enhanced overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition duration-500"></div>
                        
                        {/* Quick View Badge */}
                        <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          FAVORIT
                        </div>
                      </div>
                      
                      {/* Simplified Content - Hanya nama dan tombol */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 leading-tight text-center">
                          {menu.name}
                        </h3>
                        <div className="mt-auto pt-4 border-t border-amber-100">
                          <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-sm cursor-pointer shadow-lg hover:from-amber-600 hover:to-amber-700 text-center">
                            Pesan Sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8 md:mt-12">
            <button 
              onClick={() => window.location.href = '/menu'}
              className="relative bg-gradient-to-r from-red-500 to-red-500 text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg md:text-xl hover:from-red-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
                </svg>
                LIHAT SEMUA MENU
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL MENU - DIUBAH: Hanya satu tombol "Lihat di Menu" */}
      {showModal && selectedMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            ref={modalRef}
            className={`relative bg-white rounded-3xl shadow-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden ${animationClass}`}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:rotate-90 shadow-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="relative">
              {/* Image Section */}
              <div className="relative aspect-video w-full bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
                <img 
                  src={selectedMenu.image} 
                  alt={selectedMenu.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23fbbf24'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='white'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  FAVORIT
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{selectedMenu.name}</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedMenu.description}</p>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-3xl font-bold text-red-600">{selectedMenu.price}</span>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      window.location.href = '/menu';
                      closeModal();
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-4 rounded-xl font-bold hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-lg shadow-lg"
                  >
                    Lihat di Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY SECTION */}
      <div className="py-8 md:py-12 bg-red-500">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-white">Galeri Kegiatan Dekremes</h2>
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll">
            {kegiatanImages.concat(kegiatanImages).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt="Kegiatan Dekremes" 
                className="h-32 md:h-48 lg:h-64 w-auto object-cover mx-2 rounded-lg shadow-md" 
              />
            ))}
          </div>
        </div>
      </div>

      {/* AYAM CRISPY & KENTANG SECTION DENGAN ANIMASI GELOMBANG */}
      <div className="min-h-screen bg-white flex items-center relative overflow-hidden py-12 md:py-0">
        {/* Background Elements dengan Gelombang */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gelombang 1 - Amber */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
          
          {/* Gelombang 2 - Red */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-500/15 rounded-full blur-3xl animate-float-slow"></div>
          
          {/* Gelombang 3 - Amber dengan animasi */}
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl animate-bounce-slow"></div>
          
          {/* Gelombang 4 - Red dengan animasi */}
          <div className="absolute bottom-1/4 -right-20 w-56 h-56 bg-red-500/10 rounded-full blur-2xl animate-ping-slow"></div>
          
          {/* Floating Food Icons */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 rounded-full animate-float ${
                i % 3 === 0 ? 'bg-amber-400/40' : 
                i % 3 === 1 ? 'bg-red-500/30' : 'bg-amber-600/20'
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 8 + 4}s`
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center px-4 md:px-8 lg:px-20 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Image Card dengan Efek Gelombang */}
          <div className="flex justify-center lg:justify-end relative order-2 lg:order-1">
            <div className="relative group">
              {/* Efek Gelombang di Belakang Gambar */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/30 to-red-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -inset-6 bg-gradient-to-br from-transparent via-amber-400/10 to-transparent rounded-full animate-spin-slow"></div>
              
              {/* Container Gambar dengan Efek */}
              <div className="relative bg-gradient-to-br from-white via-amber-50 to-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl border border-amber-200/50">
                {/* Efek Kilau */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl md:rounded-3xl"></div>
                
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
                  <img
                    src="src/assets/produk/ciken.jpeg"
                    alt="Ayam Crispy & Kentang"
                    className="w-64 md:w-80 lg:w-96 xl:w-[450px] rounded-xl md:rounded-2xl border-4 border-amber-100 transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Efek Corner */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-400 to-amber-500 text-white px-4 py-2 rounded-full shadow-2xl transform rotate-12 animate-bounce border-2 border-white">
                <span className="text-sm font-bold">SPESIAL</span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left lg:pl-4 md:lg:pl-8 order-1 lg:order-2">
            <div className="mb-6 md:mb-8 transform transition-all duration-500 hover:scale-105">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-red-500 mb-3 md:mb-4 leading-tight drop-shadow-sm">
                Ayam Crispy 
                <span className="block text-amber-400 text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2">
                  & Kentang Spesial
                </span>
              </h2>
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-full mb-4 md:mb-6 mx-auto lg:mx-0 animate-pulse"></div>
            </div>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {/* Feature 1 */}
              <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 p-3 md:p-4 bg-gradient-to-r from-amber-50 to-red-50 rounded-xl md:rounded-2xl border border-amber-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm md:text-lg font-semibold group-hover:text-red-600 transition-colors duration-300">
                  Ayam pilihan berkualitas premium
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 p-3 md:p-4 bg-gradient-to-r from-amber-50 to-red-50 rounded-xl md:rounded-2xl border border-amber-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm md:text-lg font-semibold group-hover:text-red-600 transition-colors duration-300">
                  Kentang goreng renyah dan gurih
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 p-3 md:p-4 bg-gradient-to-r from-amber-50 to-red-50 rounded-xl md:rounded-2xl border border-amber-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm md:text-lg font-semibold group-hover:text-red-600 transition-colors duration-300">
                  Sambal spesial racikan tradisional
                </p>
              </div>
            </div>

            {/* Deskripsi dengan Efek */}
            <div className="relative">
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-amber-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <p className="text-gray-600 text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed pl-4 border-l-2 border-amber-200 transform transition-all duration-500 hover:border-amber-400">
                Ayam Crispy kami dibuat dari <span className="text-red-500 font-bold">ayam pilihan terbaik</span> yang digoreng 
                dengan teknik khusus hingga mencapai tingkat kerenyahan sempurna. Disajikan bersama 
                <span className="text-amber-400 font-bold"> kentang goreng premium</span> dan sambal spesial yang menggugah selera.
              </p>
            </div>

            {/* Hanya decorative element tanpa tombol order */}
            <div className="flex justify-center lg:justify-start">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-gradient-to-br from-amber-400 to-red-500 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HALAL CERTIFICATION SECTION - BACKGROUND RED-500 SOLID */}
      <div className="relative bg-red-500 py-12 md:py-20 px-4 md:px-8 overflow-hidden">
        {/* Background Effects dengan Animasi */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Circles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-amber-400/30 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 8 + 4}s`
              }}
            />
          ))}
          
          {/* Pulse Rings */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-amber-400/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-4 border-white/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Animated Corner Decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-amber-400 opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-amber-400 opacity-60 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 border-white opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 border-white opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Certificate dengan Animasi Mewah */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-amber-400 to-red-600 rounded-2xl md:rounded-3xl opacity-30 blur-xl md:blur-2xl group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
              
              {/* Shine Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl md:rounded-3xl"></div>
              
              {/* Frame dengan Animasi */}
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl border-2 md:border-4 border-amber-400">
                <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                  <img
                    src="src/assets/halal.jpg"
                    alt="Sertifikat Halal MUI"
                    className="w-64 md:w-80 lg:w-96 rounded-lg md:rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Seal Badge dengan Animasi */}
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce border-2 md:border-4 border-white group-hover:animate-spin group-hover:duration-1000 transition-all duration-300">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-600/20 rounded-full animate-float" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-amber-400/30 rounded-full animate-float" style={{ animationDelay: '0.7s' }}></div>
            </div>
          </div>

          {/* Text Content dengan Animasi */}
          <div className="text-white text-center lg:text-left order-1 lg:order-2">
            <div className="mb-6 md:mb-8 transform transition-all duration-500 hover:scale-105">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 animate-fade-in-up">
                <span className="text-white drop-shadow-lg">
                  BerSertifikasi Halal
                </span>
              </h2>
              <div className="w-12 md:w-20 h-1 bg-amber-400 rounded-full mb-4 md:mb-6 mx-auto lg:mx-0 animate-pulse"></div>
            </div>

            <div className="space-y-4 md:space-y-6 text-base md:text-lg lg:text-xl">
              {/* Point 1 dengan Animasi */}
              <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 p-3 md:p-4 bg-white/10 rounded-xl md:rounded-2xl backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-amber-400/30 group">
                <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white transform transition-all duration-300 group-hover:scale-125" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/90 leading-relaxed text-sm md:text-base transform transition-all duration-300 group-hover:text-white">
                  Kami berkomitmen untuk selalu menjaga <span className="text-amber-400 font-semibold group-hover:text-amber-300">kualitas dan kepercayaan</span> pelanggan.
                </p>
              </div>

              {/* Point 2 dengan Animasi */}
              <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 p-3 md:p-4 bg-white/10 rounded-xl md:rounded-2xl backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-amber-400/30 group">
                <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white transform transition-all duration-300 group-hover:scale-125" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/90 leading-relaxed text-sm md:text-base transform transition-all duration-300 group-hover:text-white">
                  Seluruh produk kami telah tersedia dengan <span className="text-amber-400 font-semibold group-hover:text-amber-300">Sertifikat Halal resmi</span> dari
                  Majelis Ulama Indonesia (MUI).
                </p>
              </div>
            </div>

            {/* Trust Badges dengan Animasi */}
            <div className="flex flex-wrap gap-2 md:gap-4 mt-6 md:mt-8 justify-center lg:justify-start">
              {['MUI Certified', '100% Halal', 'Quality Guarantee'].map((badge, index) => (
                <span 
                  key={index}
                  className="bg-amber-400/30 text-amber-100 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-amber-400/50 backdrop-blur-sm transform transition-all duration-300 hover:scale-110 hover:bg-amber-400/40 hover:text-white hover:border-amber-300 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Halal Logo di Corner */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 transform transition-all duration-500 hover:scale-110">
          <div className="relative group">
            <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-gradient-to-br from-amber-400 to-amber-500 p-2 md:p-3 rounded-full shadow-2xl border-2 border-white transform transition-all duration-300 group-hover:rotate-12">
              <img
                src="src/assets/Logo_Halal.png"
                alt="Logo Halal MUI"
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ SECTION - DIUBAH: Hanya 5 FAQ dan tombol mengarah ke Kontak.jsx */}
      <div className="relative py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-red-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 md:w-80 h-48 md:h-80 bg-red-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-red-500 mb-3 md:mb-4 relative z-10">
                FAQ
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 md:w-32 h-1 md:h-2 bg-red-500 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 md:w-28 h-0.5 md:h-1 bg-red-400 rounded-full"></div>
            </div>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mt-4 md:mt-6 leading-relaxed">
              Pertanyaan yang sering diajukan tentang <span className="text-red-500 font-semibold">DeKremes & Crispy</span>
            </p>
          </div>

          {/* FAQ Items - Hanya 5 */}
          <div className="space-y-3 md:space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-4 md:px-6 md:py-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 pr-3 md:pr-4 text-left">
                    {faq.question}
                  </h3>
                  <svg 
                    className={`w-5 h-5 md:w-6 md:h-6 text-red-500 transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7-7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`px-4 md:px-6 overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96 pb-4 md:pb-6' : 'max-h-0'
                  }`}
                >
                  <div className="border-t border-gray-200 pt-3 md:pt-4">
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section - DIUBAH: Hanya satu tombol yang mengarah ke Kontak.jsx */}
          <div className="text-center mt-8 md:mt-12">
            <div className="bg-gradient-to-r from-red-500 to-red-500 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                Masih ada pertanyaan?
              </h3>
              <p className="text-red-100 mb-4 md:mb-6 text-base md:text-lg">
                Hubungi customer service kami yang siap membantu 24/7
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => window.location.href = '/kontak'}
                  className="bg-white text-red-500 px-8 py-3 md:px-12 md:py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg md:text-xl shadow-lg hover:shadow-xl"
                >
                  📞 Hubungi Kami
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
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

        @keyframes scroll-slow {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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

        .animate-scroll-slow {
          animation: scroll-slow 60s linear infinite;
          display: flex;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
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