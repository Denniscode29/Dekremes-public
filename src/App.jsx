    import { Link } from "react-router-dom";
    
    function App() {
        return (
          <>
        <div className="bg-[#FFF5CC] min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
            {/* Kiri - Teks */}
            <div className="text-center">
              {/* Judul */}
              <h1 className="text-6xl md:text-7xl font-extrabold text-black leading-tight mb-4">
                DeKremes
                <span className="block text-red-600">Crispy &</span>
              </h1>

              {/* Deskripsi */}
              <p className="text-gray-700 text-lg md:text-xl mb-6 max-w-md mx-auto">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>

              {/* Tombol */}
              <div className="flex justify-center">
                <button className="bg-[#B80000] text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition">
                  ORDER NOW
                </button>
              </div>
            </div>

            {/* Kanan - Gambar */}
            <div className="flex justify-center relative">
              <img
                src="src/assets/chicken.png"
                alt="DeKremes Product"
                className="w-80 md:w-[400px]"
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
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Kiri - Gambar */}
          <div className="bg-black p-4 rounded-lg shadow-lg flex justify-center">
          <img
            src="src/assets/chicken.png"
            alt="Chicken Potato Sauce"
            className="w-64 md:w-96 lg:w-[500px] rounded-lg object-contain"
          />
        </div>
          {/* Kanan - Teks */}
          <div className="text-center md:text-left">
            <h2 className="text-6xl md:text-4xl font-bold text-red-600 mb-4">
              CHICKEN POTATO SAUCE
            </h2>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Vivamus lacinia odio vitae vestibulum vestibulum.
            </p>
            <button className="bg-red-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition">
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#B80000] min-h-screen flex items-center justify-center">
          <div className="text-center max-w-2xl px-6">
            {/* Judul */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Write your comment here!
            </h1>

            {/* Deskripsi */}
            <p className="text-white/90 text-base md:text-lg mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Vivamus lacinia odio vitae vestibulum vestibulum.
            </p>

            {/* Form Input */}
            <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden w-full max-w-lg mx-auto">
              <input
                type="text"
                placeholder="What do u think"
                className="flex-1 px-4 py-3 focus:outline-none text-gray-700"
              />
              <button className="px-6 py-3 text-[#B80000] font-bold hover:text-black transition">
                Send
              </button>
            </div>
          </div>
        </div>
        </>
     );
   }
export default App;