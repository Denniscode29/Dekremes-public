import { Link } from "react-router-dom";

function App() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background full layer */}
        <img
          src="src/assets/chicken1.jpg"
          alt="DeKremes Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay biar teks lebih jelas */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Konten Hero */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            DeKremes
            <span className="block text-red-500">Crispy &</span>
          </h1>

          <p className="text-gray-200 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          <div className="flex justify-center">
            <button className="bg-[#B80000] text-white px-8 py-4 rounded-lg shadow-xl hover:bg-red-700 transition-transform transform hover:scale-105">
              ORDER NOW
            </button>
          </div>
        </div>
      </div>

      {/* POPULAR MENU */}
      <div className="bg-red-700 text-white w-full min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <h2 className="text-[72px] md:text-[96px] font-bold mb-4">Popular Menu</h2>
        <p className="max-w-4xl text-center mb-12 text-lg md:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <img src="src/assets/chicken.png" alt="Package I" className="w-40 mb-4" />
            <h3 className="font-bold text-xl mb-2">PACKAGE I</h3>
            <p className="text-sm text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <img src="src/assets/chicken.png" alt="Package II" className="w-40 mb-4" />
            <h3 className="font-bold text-xl mb-2">PACKAGE II</h3>
            <p className="text-sm text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <img src="src/assets/chicken.png" alt="Package III" className="w-40 mb-4" />
            <h3 className="font-bold text-xl mb-2">PACKAGE III</h3>
            <p className="text-sm text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>

      {/* CHICKEN POTATO SAUCE */}
      <div className="bg-[#FFF5CC] min-h-screen flex items-center relative overflow-hidden">
        {/* Tomat Dekorasi di background */}
        <img
          src="src/assets/tomatokiri.png"
          alt="Tomat"
          className="absolute top-10 left-10 w-32 opacity-90"
        />
        <img
          src="src/assets/tomato.png"
          alt="Tomat"
          className="absolute top-20 right-12 w-36 opacity-90"
        />
        <img
          src="src/assets/tomato.png"
          alt="Tomat"
          className="absolute bottom-16 left-20 w-28 opacity-90"
        />
        <img
          src="src/assets/tomato.png"
          alt="Tomat"
          className="absolute bottom-10 right-16 w-32 opacity-90"
        />

        {/* Isi Konten */}
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Kiri - Card Gambar */}
          <div className="bg-black p-4 rounded-2xl shadow-2xl flex justify-center hover:scale-105 transition">
            <img
              src="src/assets/chicken.png"
              alt="Chicken Potato Sauce"
              className="w-64 md:w-96 lg:w-[500px] rounded-lg object-contain"
            />
          </div>

          {/* Kanan - Teks */}
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-bold text-red-600 mb-4">
              CHICKEN POTATO SAUCE
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Vivamus lacinia odio vitae vestibulum vestibulum.
            </p>
            <button className="bg-red-600 text-white font-semibold px-8 py-4 rounded-lg shadow-xl hover:bg-red-700 transition-transform transform hover:scale-105">
              ORDER NOW
            </button>
          </div>
        </div>
      </div>

      {/* COMMENT SECTION */}
      <div className="bg-[#B80000] min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Write your comment here!
          </h1>
          <p className="text-white/90 text-base md:text-lg mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Vivamus lacinia odio vitae vestibulum vestibulum.
          </p>

          <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg mx-auto">
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
