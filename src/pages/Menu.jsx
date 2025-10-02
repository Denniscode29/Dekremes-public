import { useState, useEffect } from "react";

function Menu() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    setNavbarHeight(70);
  }, []);

  // Data menu sarapan pagi
  const breakfastMenu = [
    {
      name: "Ayam Kremes Sambal Cobek",
      description: "PAKET AYAM KREMES + SAMBAL COBEK",
      price: "Rp 23.000",
      image: "src/assets/produk/Kremes1.jpg"
    },
    {
      name: "Ayam Kremes Sambal Geprek",
      description: "PAKET AYAM KREMES + SAMBAL GEPREK",
      price: "Rp 22.000",
      image: "src/assets/produk/Kremes2.jpg"
    },
    {
      name: "Ayam Crispy Keju Paha Bawah",
      description: "AYAM KEJU PAHA BAWAH NASI",
      price: "Rp 16.000",
      image: "src/assets/produk/keju1.jpg"
    },
    {
      name: "Ayam Crispy Original Sayap",
      description: "AYAM KEJU SAYAP NASI",
      price: "Rp 13.000",
      image: "src/assets/produk/keju2.jpg"
    },
    {
      name: "Ayam Crispy Original Dada",
      description: "AYAM DADA NASI + SAUS SAMBAL",
      price: "Rp 15.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Crispy Original Paha Atas",
      description: "AYAM PAHA ATAS NASI + SAUS SAMBAL",
      price: "Rp 15.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Geprek Paha Bawah",
      description: "AYAM GEPREK (TEMPE/TAHU/ PAHA BAWAH NASI + PILIHAN SALAD/SAYUR",
      price: "Rp 18.500",
      image: "src/assets/produk/geprek1.jpg"
    },
    {
      name: "Ayam Geprek Sayap",
      description: "AYAM GEPREK (TEMPE/TAHU/ SAYAP NASI + PILIHAN SALAD/SAYUR",
      price: "Rp 34.000",
      image: "src/assets/produk/geprek2.jpg"
    }
  ];

  // Data menu ayam crispy
  const chickenMenu = [
    {
      name: "Ayam Crispy Original Paha Bawah",
      description: "AYAM PAHA BAWAH NASI + SAUS SAMBAL",
      price: "Rp 13.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Crispy Original Sayap",
      description: "AYAM PAHA SAYAP NASI + SAUS SAMBAL",
      price: "Rp 13.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Crispy Original Dada",
      description: "AYAM DADA NASI + SAUS SAMBAL",
      price: "Rp 15.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Crispy Original Paha Atas",
      description: "AYAM PAHA ATAS NASI + SAUS SAMBAL",
      price: "Rp 15.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Paket Ayam Crispy 1",
      description: "1 potong ayam crispy + nasi + minum, paket lengkap.",
      price: "Rp 40.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Paket Ayam Crispy 2",
      description: "2 potong ayam crispy + nasi + minum, untuk yang lapar.",
      price: "Rp 55.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Paket Keluarga",
      description: "4 potong ayam crispy + nasi + minum, cocok untuk keluarga.",
      price: "Rp 100.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Paket Rame-Rame",
      description: "Berbagai varian ayam crispy + kentang + minum, untuk dinikmati bersama.",
      price: "Rp 120.000",
      image: "src/assets/chicken.png"
    }
  ];

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
              Menu <span className="text-amber-400">Kami</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-amber-400 mx-auto mt-6 animate-pulse"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Temukan berbagai pilihan menu terbaik dari <span className="text-amber-400 font-semibold">DeKremes & Crispy</span>
          </p>
        </div>
      </div>

      {/* Sarapan Pagi Section - UPGRADE PROFESSIONAL */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"></div>
              <span className="text-sm font-semibold text-red-600 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full border border-red-200">
                Special Menu
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-amber-400 to-red-600"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Makan <span className="text-amber-500">Spesial</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nikmati kerenyahan ayam crispy kami yang cocok untuk teman makan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {breakfastMenu.map((item, index) => (
              <div 
                key={index} 
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden group-hover:scale-[1.02] transition-all duration-500 h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-red-600 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 flex-1 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="font-bold text-red-600 text-lg">{item.price}</span>
                      <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm">
                        Pesan Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ayam Crispy Section - UPGRADE PROFESSIONAL */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-amber-600 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-white"></div>
              <span className="text-sm font-semibold text-amber-300 uppercase tracking-widest bg-amber-500/20 px-4 py-2 rounded-full border border-amber-300/30">
                Premium Menu
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-amber-400 to-white"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Makan <span className="text-amber-300">Top</span>
            </h2>
            <p className="text-lg text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Nikmati kelezatan ayam crispy dengan berbagai pilihan rasa dan paket spesial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {chickenMenu.map((item, index) => (
              <div 
                key={index} 
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-white rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-200/30 overflow-hidden group-hover:scale-[1.02] transition-all duration-500 h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-red-600 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 flex-1 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="font-bold text-red-600 text-lg">{item.price}</span>
                      <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm">
                        Pesan Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - UPGRADE PROFESSIONAL */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden shadow-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-red-500 to-red-600"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10 py-12 md:py-16 px-6 md:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tertarik dengan <span className="text-amber-300">menu kami?</span>
              </h2>
              <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Pesan sekarang dan nikmati kelezatan ayam crispy terbaik dari DeKremes & Crispy
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-amber-400 text-red-900 font-bold px-8 py-4 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg hover:bg-amber-300">
                  Pesan Sekarang
                </button>
                <button className="bg-white/20 text-white font-bold px-8 py-4 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg backdrop-blur-sm border border-white/30 hover:bg-white/30">
                  Lihat Menu Lengkap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          }
          
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

          .animate-fade-in-down {
            animation: fadeInDown 1s ease-out;
          }

          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out;
          }

          .animate-fade-in {
            animation: fadeIn 1.5s ease-out;
          }
        `}
      </style>
    </>
  );
}   

export default Menu;