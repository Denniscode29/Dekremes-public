import { useState, useEffect } from "react";

function Menu() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State loading baru

  useEffect(() => {
    setNavbarHeight(70);
    
    // Simulasi loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Fixed spacer untuk navbar */}
      <div style={{ height: `${navbarHeight}px` }} className="w-full bg-white"></div>

      {/* Hero Section Skeleton */}
      <div className="relative flex items-center justify-center overflow-hidden bg-gray-800" style={{ height: `calc(60vh - ${navbarHeight}px)`, minHeight: `calc(500px - ${navbarHeight}px)` }}>
        <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl w-full">
          <div className="mb-8">
            <div className="w-24 h-1 bg-gray-600 mx-auto mb-6 rounded"></div>
            <div className="h-12 bg-gray-600 rounded-lg mb-4 w-3/4 mx-auto animate-pulse"></div>
            <div className="w-32 h-1 bg-gray-600 mx-auto mt-6 rounded"></div>
          </div>
          <div className="h-6 bg-gray-600 rounded w-2/3 mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* American Taste Section Skeleton */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-12 h-0.5 bg-gray-300 rounded"></div>
              <div className="w-48 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-12 h-0.5 bg-gray-300 rounded"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-64 mx-auto mb-8 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full">
                  <div className="aspect-square bg-gray-300 rounded-t-2xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                      <div className="h-10 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indonesian Taste Section Skeleton */}
          <div className="bg-gray-700 rounded-3xl p-8 mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-4 mb-8">
                <div className="w-12 h-0.5 bg-gray-400 rounded"></div>
                <div className="w-48 h-6 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-12 h-0.5 bg-gray-400 rounded"></div>
              </div>
              <div className="h-10 bg-gray-400 rounded w-64 mx-auto mb-8 animate-pulse"></div>
              <div className="h-4 bg-gray-400 rounded w-96 mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-600 rounded-2xl shadow-lg overflow-hidden h-full">
                    <div className="aspect-square bg-gray-500 rounded-t-2xl"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-400 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-400 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-400 rounded w-5/6 mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-6 bg-gray-400 rounded w-20"></div>
                        <div className="h-10 bg-gray-400 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drinks Section Skeleton */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-12 h-0.5 bg-gray-300 rounded"></div>
              <div className="w-32 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-12 h-0.5 bg-gray-300 rounded"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full">
                  <div className="aspect-square bg-gray-300 rounded-t-2xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                      <div className="h-10 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section Skeleton */}
          <div className="animate-pulse">
            <div className="bg-gray-300 rounded-3xl py-16">
              <div className="text-center">
                <div className="h-8 bg-gray-400 rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-400 rounded w-96 mx-auto mb-8"></div>
                <div className="h-12 bg-gray-400 rounded w-48 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Tampilkan loading skeleton jika masih loading
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // KODE ASLI TANPA PERUBAHAN (hanya return statement yang berubah)
  const openModal = (product) => {
    console.log("Opening modal for:", product.name);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Data American Taste
  const americanTaste = [
    // Original Series
    {
      name: "Ayam Crispy Original Dada",
      description: "AYAM DADA NASI + SAUS SAMBAL",
      price: "Rp 14.000",
      image: "src/assets/menu/original - dada ayam.png",
      category: "Original"
    },
    {
      name: "Ayam Crispy Original Paha Atas",
      description: "AYAM PAHA ATAS NASI + SAUS SAMBAL",
      price: "Rp 14.000",
      image: "src/assets/menu/original - paha atas.png",
      category: "Original"
    },
    {
      name: "Ayam Crispy Original Paha Bawah",
      description: "AYAM PAHA BAWAH NASI + SAUS SAMBAL",
      price: "Rp 11.000",
      image: "src/assets/menu/original - paha bawah.png",
      category: "Original"
    },
    {
      name: "Ayam Crispy Original Sayap",
      description: "AYAM SAYAP NASI + SAUS SAMBAL",
      price: "Rp 11.000",
      image: "src/assets/menu/original - sayap ayam.png",
      category: "Original"
    },
    // Cheese Series
    {
      name: "Ayam Crispy Cheese Dada",
      description: "AYAM DADA KEJU NASI + SAUS SAMBAL",
      price: "Rp 18.500",
      image: "src/assets/menu/cheese - dada ayam.png",
      category: "Cheese"
    },
    {
      name: "Ayam Crispy Cheese Paha Atas",
      description: "AYAM PAHA ATAS KEJU NASI + SAUS SAMBAL",
      price: "Rp 18.500",
      image: "src/assets/menu/cheese - paha atas.png",
      category: "Cheese"
    },
    {
      name: "Ayam Crispy Cheese Paha Bawah",
      description: "AYAM PAHA BAWAH KEJU NASI + SAUS SAMBAL",
      price: "Rp 16.000",
      image: "src/assets/menu/cheese - paha bawah.png",
      category: "Cheese"
    },
    {
      name: "Ayam Crispy Cheese Sayap",
      description: "AYAM SAYAP KEJU NASI + SAUS SAMBAL",
      price: "Rp 16.000",
      image: "src/assets/menu/cheese - sayap ayam.png",
      category: "Cheese"
    },
    // Blackpepper Series
    {
      name: "Ayam Crispy Blackpepper Dada",
      description: "AYAM DADA BLACKPEPPER NASI + SAUS SAMBAL",
      price: "Rp 19.000",
      image: "src/assets/menu/blackpepper - dada ayam.png",
      category: "Blackpepper"
    },
    {
      name: "Ayam Crispy Blackpepper Paha Atas",
      description: "AYAM PAHA ATAS BLACKPEPPER NASI + SAUS SAMBAL",
      price: "Rp 19.000",
      image: "src/assets/menu/blackpepper - paha atas.png",
      category: "Blackpepper"
    },
    {
      name: "Ayam Crispy Blackpepper Paha Bawah",
      description: "AYAM PAHA BAWAH BLACKPEPPER NASI + SAUS SAMBAL",
      price: "Rp 15.000",
      image: "src/assets/menu/blackpepper - paha bawah.png",
      category: "Blackpepper"
    },
    {
      name: "Ayam Crispy Blackpepper Sayap",
      description: "AYAM SAYAP BLACKPEPPER NASI + SAUS SAMBAL",
      price: "Rp 15.000",
      image: "src/assets/menu/blackpepper - sayap ayam.png",
      category: "Blackpepper"
    },
    // Additional Items
    {
      name: "Burger Special",
      description: "BURGER DENGAN AYAM CRISPY SPECIAL",
      price: "Rp 16.000",
      image: "src/assets/menu/burger.png",
      category: "Lainnya"
    },
    {
      name: "Kentang Goreng",
      description: "KENTANG GORENG RENYAH",
      price: "Rp 9.500",
      image: "src/assets/menu/kentang goreng.png",
      category: "Lainnya"
    }
  ];

  // Data Indonesian Taste
  const indonesianTaste = [
    // Kremes Series
    {
      name: "Ayam Kremes Dada/Paha Atas Cobek",
      description: "AYAM KREMES PAHA ATAS/DADA NASI + SAMBAL COBEK",
      price: "Rp 23.000",
      image: "src/assets/menu/kremes - dada ayam.png",
      category: "Kremes"
    },
    {
      name: "Ayam Kremes Sayap/Paha Bawah Cobek",
      description: "AYAM KREMES SAYAP/PAHA BAWAH NASI + SAMBAL COBEK",
      price: "Rp -",
      image: "src/assets/menu/kremes - paha atas.png",
      category: "Kremes"
    },
    {
      name: "Ayam Kremes Dada/Paha Atas Geprek",
      description: "AYAM KREMES PAHA ATAS/DADA NASI + SAMBAL GEPREK",
      price: "Rp 22.000",
      image: "src/assets/menu/kremes - paha bawah.png",
      category: "Kremes"
    },
    {
      name: "Ayam Kremes Sayap/Paha Bawah Geprek",
      description: "AYAM KREMES SAYAP/PAHA BAWAH NASI + SAMBAL GEPREK",
      price: "Rp -",
      image: "src/assets/menu/kremes - sayap ayam.png",
      category: "Kremes"
    },
    // Geprek Series
    {
      name: "Ayam Geprek Dada",
      description: "AYAM GEPREK DADA NASI + SAMBAL GEPREK",
      price: "Rp 19.500",
      image: "src/assets/menu/geprek - dada ayam.png",
      category: "Geprek"
    },
    {
      name: "Ayam Geprek Paha Atas",
      description: "AYAM GEPREK PAHA ATAS NASI + SAMBAL GEPREK",
      price: "Rp 19.500",
      image: "src/assets/menu/geprek - paha atas.png",
      category: "Geprek"
    },
    {
      name: "Ayam Geprek Paha Bawah",
      description: "AYAM GEPREK PAHA BAWAH NASI + SAMBAL GEPREK",
      price: "Rp 17.000",
      image: "src/assets/menu/geprek - paha bawah.png",
      category: "Geprek"
    },
    {
      name: "Ayam Geprek Sayap",
      description: "AYAM GEPREK SAYAP NASI + SAMBAL GEPREK",
      price: "Rp 17.000",
      image: "src/assets/menu/geprek - sayap ayam.png",
      category: "Geprek"
    },
    // Whole Chicken
    {
      name: "Ayam Kremes Utuh",
      description: "AYAM KREMES UTUH + NASI + SAMBAL COBEK",
      price: "Rp -",
      image: "src/assets/menu/whole chicken.png",
      category: "Special"
    }
  ];

  // Data Drinks
  const drinks = [
    {
      name: "Air Mineral",
      description: "AIR MINERAL BOTOL",
      price: "Rp 7.000",
      image: "src/assets/menu/air.png",
      category: "Minuman"
    },
    {
      name: "Pulpy Orange",
      description: "MINUMAN JERUK PULPY",
      price: "Rp 8.000",
      image: "src/assets/menu/pulpy.png",
      category: "Minuman"
    }
  ];

  // Group American Taste by category
  const americanByCategory = americanTaste.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Group Indonesian Taste by category
  const indonesianByCategory = indonesianTaste.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const ProductCard = ({ item, index }) => (
    <div 
      key={index} 
      className="group relative animate-fade-in-up bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-amber-100 overflow-hidden hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-500 h-full flex flex-col"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Enhanced Glow effect */}
      <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 rounded-xl sm:rounded-2xl blur sm:blur-lg opacity-40 group-hover:opacity-80 transition duration-700 group-hover:scale-105"></div>
      
      <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden h-full flex flex-col z-10">
        {/* IMPROVED Image Container - Kotak dengan gambar full width */}
        <div className="relative aspect-square w-full bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-1 sm:p-2">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23fbbf24'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='white'%3EImage%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          {/* Enhanced overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition duration-500"></div>
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold shadow-lg">
            {item.category}
          </div>
        </div>
        
        {/* Enhanced Content */}
        <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {item.name}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 flex-1 leading-relaxed line-clamp-2">
            {item.description}
          </p>
          <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-amber-100 mt-auto">
            <span className="font-bold text-red-600 text-lg sm:text-xl">{item.price}</span>
            <button 
              onClick={() => openModal(item)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 rounded-lg sm:rounded-xl font-bold hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-xs sm:text-sm cursor-pointer shadow-lg hover:from-amber-600 hover:to-amber-700"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductModal = () => {
    if (!isModalOpen || !selectedProduct) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in backdrop-blur-sm"
        onClick={closeModal}
      >
        <div 
          className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Improved Modal Image */}
          <div className="relative aspect-video w-full bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23fbbf24'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='white'%3EImage Not Found%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-amber-500 text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
              {selectedProduct.category}
            </div>
          </div>
          
          <div className="p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">{selectedProduct.name}</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">{selectedProduct.description}</p>
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">{selectedProduct.price}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
              <a 
                href="https://r.grab.com/g/2-1-6-C7NZGJUDJ36HAX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm sm:text-base md:text-lg shadow-lg"
              >
                🛵 Pesan via Grab
              </a>
              <button 
                onClick={closeModal}
                className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-300 text-sm sm:text-base md:text-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Fixed spacer untuk navbar */}
      <div 
        style={{ height: `${navbarHeight}px` }} 
        className="w-full bg-white"
      ></div>

      {/* HERO SECTION YANG DISESUAIKAN DENGAN KONTAK.JSX */}
      <div 
        className="relative flex items-center justify-center overflow-hidden bg-gray-900"
        style={{ 
          height: `calc(60vh - ${navbarHeight}px)`,
          minHeight: `calc(500px - ${navbarHeight}px)`
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
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t-2 border-l-2 border-amber-400 opacity-60 animate-pulse"></div>
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b-2 border-r-2 border-amber-400 opacity-60 animate-pulse"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          <div className="mb-6 sm:mb-8">
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-amber-400 to-red-600 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight animate-fade-in-down">
              Menu <span className="text-amber-400">Kami</span>
            </h1>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-red-600 to-amber-400 mx-auto mt-4 sm:mt-6 animate-pulse"></div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up px-2">
            Jelajahi berbagai pilihan menu terbaik dari <span className="text-amber-400 font-semibold">DeKremes & Crispy</span>
          </p>
        </div>
      </div>

      {/* American Taste Section */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 sm:py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6">
              <div className="w-6 sm:w-8 md:w-12 h-1 bg-gradient-to-r from-amber-400 to-red-600 rounded-full"></div>
              <span className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full border border-red-200 shadow-lg">
                American Original Taste
              </span>
              <div className="w-6 sm:w-8 md:w-12 h-1 bg-gradient-to-l from-amber-400 to-red-600 rounded-full"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 md:mb-8 text-gray-800">
              American <span className="text-amber-500">Taste</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-2">
              Rasakan kerenyahan ayam crispy premium kami dengan berbagai pilihan rasa yang menggugah selera
            </p>
          </div>

          {/* Original Series */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-red-600 mb-4 sm:mb-6 md:mb-8 text-center bg-white py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl sm:rounded-2xl shadow-lg inline-block border border-red-200">
              Original Series
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {americanByCategory.Original?.map((item, index) => (
                <ProductCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Cheese Series */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-red-600 mb-4 sm:mb-6 md:mb-8 text-center bg-white py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl sm:rounded-2xl shadow-lg inline-block border border-red-200">
              Cheese Series
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {americanByCategory.Cheese?.map((item, index) => (
                <ProductCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Blackpepper Series */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-red-600 mb-4 sm:mb-6 md:mb-8 text-center bg-white py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl sm:rounded-2xl shadow-lg inline-block border border-red-200">
              Blackpepper Series
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {americanByCategory.Blackpepper?.map((item, index) => (
                <ProductCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Additional Items */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-red-600 mb-4 sm:mb-6 md:mb-8 text-center bg-white py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl sm:rounded-2xl shadow-lg inline-block border border-red-200">
              Menu Tambahan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
              {americanByCategory.Lainnya?.map((item, index) => (
                <ProductCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Indonesian Taste Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-amber-600 py-8 sm:py-12 md:py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6">
              <div className="w-6 sm:w-8 md:w-12 h-1 bg-gradient-to-r from-amber-400 to-white rounded-full"></div>
              <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-widest bg-amber-500/30 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full border border-amber-300/50 shadow-lg">
                Indonesian Original Taste
              </span>
              <div className="w-6 sm:w-8 md:w-12 h-1 bg-gradient-to-l from-amber-400 to-white rounded-full"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 md:mb-8 text-white">
              Indonesian <span className="text-amber-300">Taste</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-100 max-w-4xl mx-auto leading-relaxed font-light px-2">
              Nikmati kelezatan ayam khas Indonesia dengan cita rasa tradisional yang autentik dan menggugah selera
            </p>
          </div>

          {/* Kremes Series */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-300 mb-4 sm:mb-6 md:mb-8 text-center bg-amber-500/20 py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl sm:rounded-2xl shadow-lg inline-block border border-amber-300/30 backdrop-blur-sm">
              Kremes Series
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {indonesianByCategory.Kremes?.map((item, index) => (
                <ProductCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Geprek Series */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-300 mb-4 sm:mb-6 md:mb-8 text-center bg-amber-500/20 py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl sm:rounded-2xl shadow-lg inline-block border border-amber-300/30 backdrop-blur-sm">
              Geprek Series
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {indonesianByCategory.Geprek?.map((item, index) => (
                <ProductCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Special Items */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-300 mb-4 sm:mb-6 md:mb-8 text-center bg-amber-500/20 py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl sm:rounded-2xl shadow-lg inline-block border border-amber-300/30 backdrop-blur-sm">
              Menu Spesial
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 max-w-md mx-auto">
              {indonesianByCategory.Special?.map((item, index) => (
                <ProductCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drinks Section */}
      <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-8 sm:py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6">
              <div className="w-6 sm:w-8 md:w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-full"></div>
              <span className="text-xs sm:text-sm font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full border border-cyan-200 shadow-lg">
                Refreshing Drinks
              </span>
              <div className="w-6 sm:w-8 md:w-12 h-1 bg-gradient-to-l from-blue-400 to-cyan-600 rounded-full"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 md:mb-8 text-gray-800">
              Minuman <span className="text-cyan-500">Segar</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-2">
              Sempurnakan makanan Anda dengan minuman segar pilihan yang menyegarkan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
            {drinks.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 sm:py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-amber-200">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-red-500 to-red-600"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 md:mb-8">
                Tertarik dengan <span className="text-amber-300">menu kami?</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-100 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                Pesan sekarang dan nikmati kelezatan ayam crispy terbaik dari DeKremes & Crispy dengan pelayanan tercepat
              </p>
              
              <div className="flex justify-center">
                <a 
                  href="https://r.grab.com/g/2-1-6-C7NZGJUDJ36HAX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-amber-400 text-red-900 font-black px-8 py-3 sm:px-12 sm:py-4 md:px-16 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-base sm:text-lg md:text-xl hover:bg-amber-300 shadow-lg border-2 border-amber-300"
                >
                  🚀 Pesan Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal />

      {/* Enhanced Custom Styles */}
      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
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

          .animate-fade-in-down {
            animation: fadeInDown 1s ease-out;
          }

          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out;
          }

          .animate-fade-in {
            animation: fadeIn 1.5s ease-out;
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }

          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }

          /* Responsive adjustments for very small screens */
          @media (max-width: 360px) {
            .text-3xl {
              font-size: 1.75rem;
            }
            .text-2xl {
              font-size: 1.5rem;
            }
          }
        `}
      </style>
    </>
  );
}   

export default Menu;