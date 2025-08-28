function App() {
  return (
    <>
     <div className="bg-[#FFF5CC] min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Kiri - Teks */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            DeKremes Crispy & Gurih 🍗
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Lorem Ipsum is simply dummy text of the
           printing and typesetting industry.
          </p>
          <button className="bg-[#B80000] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition">
            Order Now
          </button>
        </div>

        {/* Kanan - Gambar */}
        <div className="flex justify-center">
          <img
            src="src/assets/chicken.png" 
            alt="DeKremes Product"
            className="w-80 md:w-[400px] rounded-2xl"
          />
        </div>
      </div>
    </div>
    <div className="bg-gray-50"></div>
    </>
  );
}

export default App;