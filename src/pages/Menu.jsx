import { useState, useEffect } from 'react';
import MenuController from '../controllers/MenuController';

function Menu() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const { 
    menuData,
    categories,
    loading, 
    error, 
    selectedProduct,
    isModalOpen,
    loadAllMenus,
    openModal,
    closeModal,
    getImageUrl,
    handleImageError
  } = MenuController();

  useEffect(() => {
    setNavbarHeight(70);
    loadAllMenus();
  }, []);

  // Group categories by type untuk sections
  const groupedCategories = {
    american: categories.filter(cat => cat.type === 'american'),
    indonesian: categories.filter(cat => cat.type === 'indonesian'),
    drinks: categories.filter(cat => cat.type === 'drinks'),
    other: categories.filter(cat => !['american', 'indonesian', 'drinks'].includes(cat.type))
  };

  const ProductCard = ({ item, index }) => (
    <div 
      key={item.id} 
      className="group relative animate-fade-in-up bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden hover:shadow-3xl transition-all duration-500 h-full flex flex-col"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-80 transition duration-700 group-hover:scale-105"></div>
      
      <div className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col z-10">
        <div className="relative aspect-square w-full bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <img 
              src={getImageUrl(item.image)} 
              alt={item.name} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
              onError={handleImageError}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition duration-500"></div>
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed line-clamp-2">
            {item.description}
          </p>
          <div className="flex justify-between items-center pt-4 border-t border-amber-100 mt-auto">
            <span className="font-bold text-red-600 text-xl">{item.price}</span>
            <button 
              onClick={() => openModal(item)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-sm cursor-pointer shadow-lg hover:from-amber-600 hover:to-amber-700"
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
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm"
        onClick={closeModal}
      >
        <div 
          className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden animate-fade-in-up shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative aspect-video w-full bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
            <img 
              src={getImageUrl(selectedProduct.image)} 
              alt={selectedProduct.name} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
          
          <div className="p-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">{selectedProduct.name}</h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedProduct.description}</p>
            <div className="flex justify-between items-center mb-8">
              <span className="text-3xl font-bold text-red-600">{selectedProduct.price}</span>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://r.grab.com/g/2-1-6-C7NZGJUDJ36HAX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-4 rounded-xl font-bold hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-lg shadow-lg"
              >
                🛵 Pesan via Grab
              </a>
              <button 
                onClick={closeModal}
                className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 py-4 rounded-xl font-bold hover:shadow-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-300 text-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CategorySection = ({ title, categories, bgGradient, textColor, badgeColor }) => {
    if (!categories || categories.length === 0) return null;

    return (
      <div className={`${bgGradient} py-20 px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className={`text-5xl md:text-6xl font-black mb-8 ${textColor}`}>
              {title}
            </h2>
          </div>

          {categories.map((category) => {
            const products = menuData[category.name] || [];
            if (products.length === 0) return null;

            return (
              <div key={category.id} className="mb-16">
                <h3 className={`text-3xl font-black mb-8 text-center bg-white/80 py-4 px-8 rounded-2xl shadow-lg inline-block border ${badgeColor}`}>
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {products.map((item, index) => (
                    <ProductCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadAllMenus}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ height: `${navbarHeight}px` }} className="w-full bg-white"></div>

      {/* HERO SECTION */}
      <div className="relative flex items-center justify-center overflow-hidden bg-gray-900"
        style={{ 
          height: `calc(70vh - ${navbarHeight}px)`,
          minHeight: `calc(600px - ${navbarHeight}px)`
        }}>
        <div className="absolute inset-0">
          <img
            src="/src/assets/chicken1.jpg"
            alt="DeKremes Header"
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="mb-8">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-600 mx-auto mb-6 animate-pulse"></div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-down">
              Menu <span className="text-amber-400">Kami</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-amber-400 mx-auto mt-6 animate-pulse"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Jelajahi berbagai pilihan menu terbaik dari <span className="text-amber-400 font-semibold">DeKremes & Crispy</span>
          </p>
        </div>
      </div>

      {/* AMERICAN TASTE SECTION */}
      <CategorySection
        title="American Taste"
        categories={groupedCategories.american}
        bgGradient="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"
        textColor="text-gray-800"
        badgeColor="border-red-200 text-red-600"
      />

      {/* INDONESIAN TASTE SECTION */}
      <CategorySection
        title="Indonesian Taste"
        categories={groupedCategories.indonesian}
        bgGradient="bg-gradient-to-br from-red-600 via-red-700 to-amber-600"
        textColor="text-white"
        badgeColor="border-amber-300/30 text-amber-300 bg-amber-500/20"
      />

      {/* DRINKS SECTION */}
      <CategorySection
        title="Minuman Segar"
        categories={groupedCategories.drinks}
        bgGradient="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100"
        textColor="text-gray-800"
        badgeColor="border-cyan-200 text-cyan-600"
      />

      {/* OTHER CATEGORIES SECTION */}
      <CategorySection
        title="Menu Lainnya"
        categories={groupedCategories.other}
        bgGradient="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
        textColor="text-gray-800"
        badgeColor="border-gray-300 text-gray-600"
      />

      {/* CTA SECTION */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-red-500 to-red-600"></div>
            <div className="relative z-10 py-16 md:py-20 px-6 md:px-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                Tertarik dengan <span className="text-amber-300">menu kami?</span>
              </h2>
              <p className="text-xl md:text-2xl text-amber-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                Pesan sekarang dan nikmati kelezatan ayam crispy terbaik dari DeKremes & Crispy
              </p>
              <div className="flex justify-center">
                <a 
                  href="https://r.grab.com/g/2-1-6-C7NZGJUDJ36HAX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-amber-400 text-red-900 font-black px-16 py-5 rounded-2xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-xl hover:bg-amber-300 shadow-lg border-2 border-amber-300"
                >
                  🚀 Pesan Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductModal />

      <style>
        {`
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in-down { animation: fadeInDown 1s ease-out; }
          .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
          .animate-fade-in { animation: fadeIn 1.5s ease-out; }
          .line-clamp-2 { 
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .shadow-3xl { 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
        `}
      </style>
    </>
  );
}

export default Menu;