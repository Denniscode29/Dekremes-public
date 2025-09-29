function Menu() {
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
      <div className="bg-[#FFFFFF] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Makan Spesial</h2>
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
            <h2 className="text-4xl font-bold text-white mb-4">Makan Top</h2>
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
      <div className="bg-[#FFFFFF] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Tertarik dengan menu kami?</h2>
          <p className="text-gray-800 text-lg mb-8">
            Pesan sekarang dan nikmati kelezatan ayam crispy terbaik dari DeKremes & Crispy
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              Pesan Sekarang
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}   

export default Menu;