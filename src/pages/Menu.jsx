function Menu() {
  // Data menu sarapan pagi
  const breakfastMenu = [
    {
      name: "Ayam Geprek",
      description: "(tempe/tahu)/paha bawah/sayap + nasi pilihan salad/sayur",
      price: "Rp 18.500",
      image: "src/assets/produk/ayam_geprek.jpg"
    },
    {
      name: "Ayam Keju",
      description: "Ayam keju paha bawah/sayap nasi",
      price: "Rp 16.000",
      image: "src/assets/produk/ayam_keju.jpg"
    },
    {
      name: "Sausage McMuffin with Egg",
      description: "Sosis gurih dengan telur dan muffin, sarapan penuh energi.",
      price: "Rp 30.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Sausage McMuffin",
      description: "Sosis lezat dalam muffin hangat, praktis dan mengenyangkan.",
      price: "Rp 27.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Sausage Wrap",
      description: "Sosis dibungkus tortilla dengan saus spesial, sarapan yang mudah dinikmati.",
      price: "Rp 26.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Big Breakfast",
      description: "Paket lengkap dengan telur, sosis, kentang, dan muffin untuk sarapan besar.",
      price: "Rp 35.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Crispy Original",
      description: "Ayam crispy dengan bumbu original, renyah di luar lembut di dalam.",
      price: "Rp 32.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Crispy Pedas",
      description: "Ayam crispy dengan bumbu pedas spesial, untuk yang suka tantangan.",
      price: "Rp 34.000",
      image: "src/assets/chicken.png"
    }
  ];

  // Data menu ayam crispy
  const chickenMenu = [
    {
      name: "Ayam Crispy Original",
      description: "Ayam crispy dengan bumbu original, renyah di luar lembut di dalam.",
      price: "Rp 32.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Crispy Pedas",
      description: "Ayam crispy dengan bumbu pedas spesial, untuk yang suka tantangan.",
      price: "Rp 34.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Crispy BBQ",
      description: "Ayam crispy dengan saus BBQ, perpaduan manis dan gurih.",
      price: "Rp 35.000",
      image: "src/assets/chicken.png"
    },
    {
      name: "Ayam Crispy Keju",
      description: "Ayam crispy dengan taburan keju leleh, semakin nikmat.",
      price: "Rp 36.000",
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
      {/* Header Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <img
          src="src/assets/chicken1.jpg"
          alt="DeKremes Menu"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Menu Kami
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Temukan berbagai pilihan menu terbaik dari DeKremes & Crispy
          </p>
        </div>
      </div>

      {/* Sarapan Pagi Section */}
      <div className="bg-[#FFF5CC] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Makan Nikmat</h2>
            <p className="text-gray-800 text-lg max-w-3xl mx-auto">
              Nikmati kerenyahan ayam crispy kami yang cocok untuk teman makan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {breakfastMenu.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-red-600 mb-2">{item.name}</h3>
                  <p className="text-gray-700 text-sm mb-4 h-12 overflow-hidden">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-red-600">{item.price}</span>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition">
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ayam Crispy Section */}
      <div className="bg-red-700 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ayam Crispy</h2>
            <p className="text-gray-100 text-lg max-w-3xl mx-auto">
              Nikmati kelezatan ayam crispy dengan berbagai pilihan rasa dan paket spesial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {chickenMenu.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-red-600 mb-2">{item.name}</h3>
                  <p className="text-gray-700 text-sm mb-4 h-12 overflow-hidden">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-red-600">{item.price}</span>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition">
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FFF5CC] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Tertarik dengan menu kami?</h2>
          <p className="text-gray-800 text-lg mb-8">
            Pesan sekarang dan nikmati kelezatan ayam crispy terbaik dari DeKremes & Crispy
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              Pesan Sekarang
            </button>
            <button className="bg-white text-red-600 border border-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition">
              Lihat Menu Lainnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
}   

export default Menu;