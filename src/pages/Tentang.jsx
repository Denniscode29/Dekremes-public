function Tentang() {
  return (
    <>
      {/* spasi atas */}
        <div className="h-20"
        style={{ backgroundColor: '#FFF5CC' }}></div>
    <div>
      {/* kosong buat ngejarakin */}
    </div>

      <div className="bg-[#FFF5CC] min-h-screen flex flex-col items-center px-8 py-16">
  {/* Judul */}
  <h2 className="text-4xl font-extrabold text-red-600 mb-12">About us</h2>

  {/* Grid Utama */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full items-start">
    {/* Kolom Kiri */}
    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
      <p className="text-black text-lg leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
      </p>

      {/* Card 1 */}
      <div className="bg-gradient-to-r from-red-700 to-red-500 text-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center w-full">
        <img 
          src="src/assets/meat.png" 
          alt="Meat Icon" 
          className="w-16 h-16 mb-4" 
        />
        <h3 className="text-lg font-bold mb-2">A PASSION FOR CULINARY EXCELLENT</h3>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
      </div>
    </div>

    {/* Kolom Tengah */}
    <div className="flex justify-center">
      <img
        src="src/assets/chef.png"
        alt="Chef"
        className="w-72 h-auto object-contain"
      />
    </div>

    {/* Kolom Kanan */}
    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
      <p className="text-black text-lg leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
      </p>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-red-400 w-full">
        <img 
          src="src/assets/chicken.png" 
          alt="DeKremes Crispy" 
          className="w-20 h-20 mb-4" 
        />
        <h3 className="text-lg font-bold text-red-600 mb-2">DeKremes & Crispy</h3>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
      </div>
    </div>
  </div>
</div>





    </>
  );
}   

export default Tentang;