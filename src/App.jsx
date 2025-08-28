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
     <div className="bg-red-700 text-white w-full min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Judul */}
     <h2 className="text-[96px] font-bold mb-4">Popular Menu</h2>
      <p className="max-w-4xl text-center mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
      </p>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Item 1 */}
        <div className="flex flex-col items-center text-center">
          <img src="src/assets/chicken.png" alt="Package I" className="w-40 mb-4" />
          <h3 className="font-bold text-lg mb-2">PACKAGE I</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-center text-center">
           <img src="src/assets/chicken.png" alt="Package I" className="w-40 mb-4" />
          <h3 className="font-bold text-lg mb-2">PACKAGE II</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-center text-center">
           <img src="src/assets/chicken.png" alt="Package I" className="w-40 mb-4" />
          <h3 className="font-bold text-lg mb-2">PACKAGE III</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
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
    </>
  );
}

export default App;