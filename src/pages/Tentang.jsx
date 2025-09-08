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
   <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-10">
      <p className="text-red-600 text-2xl leading-relaxed max-w-md text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Curabitur non nulla sit amet nisl tempus 
        convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta.
      </p>

      {/* Card 1 */}
      <div className="bg-red-700 text-white rounded-2xl shadow-lg p-10 flex flex-row justify-between items-center w-full h-[240px]">
        {/* Text di kiri */}
        <div className="flex flex-col text-left">
          <h3 className="text-2xl font-bold leading-snug">
            A PASSION FOR <br /> CULINARY <br /> EXCELLENT
          </h3>
        </div>
        {/* Logo di kanan */}
        <img 
          src="src/assets/meat.png" 
          alt="Meat Icon" 
          className="w-24 h-24 ml-6 object-contain" 
        />
      </div>
    </div>
 
    {/* Kolom Tengah */}
    <div className="flex justify-center">
      <img
        src="src/assets/chef.png"
        alt="Chef"
        className="w-80 h-auto object-contain"
      />
    </div>

    {/* Kolom Kanan */}
    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-10">
      <p className="text-red-600 text-2xl leading-relaxed max-w-md text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
        odio vitae vestibulum vestibulum. Nulla quis lorem ut libero malesuada feugiat. 
        Pellentesque in ipsum id orci porta dapibus.
      </p>

      {/* Card 2 */}
      <div className="bg-red-700 text-white rounded-2xl shadow-lg p-10 flex flex-row justify-between items-center w-full h-[240px]">
        {/* Text di kiri */}
        <div className="flex flex-col text-left">
          <h3 className="text-2xl font-bold leading-snug">
            DeKremes <br /> & <br /> Crispy
          </h3>
        </div>
        {/* Logo di kanan */}
        <img 
          src="src/assets/chicken.png" 
          alt="DeKremes Crispy" 
          className="w-24 h-24 ml-6 object-contain" 
        />
      </div>
    </div>
  </div>
</div>







    </>
  );
}   

export default Tentang;