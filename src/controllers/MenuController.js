import { create } from "zustand";

const MenuController = create((set, get) => ({
  // State
  produk: [],
  categories: [],
  menuData: {},
  loading: false,
  error: null,
  selectedProduct: null,
  isModalOpen: false,

  /**
   * Get base URL dari environment variables
   */
  getBaseURL: () => {
    return import.meta.env.VITE_API_URL || 'http://localhost:8000';
  },

  /**
   * Fetch semua produk dari backend Laravel
   */
  fetchAllProducts: async () => {
    try {
      const baseURL = get().getBaseURL();
      console.log('Fetching all products from:', `${baseURL}/api/v1/produk`);
      
      const response = await fetch(`${baseURL}/api/v1/produk`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('All products response:', data);
      
      if (data.success) {
        const formattedProducts = data.data.map(item => ({
          id: item.id,
          name: item.nama,
          description: item.deskripsi || '',
          price: item.harga_formatted || get().formatHarga(item.harga),
          image: item.gambar_url || item.gambar || '/src/assets/menu-placeholder.png',
          kategori: item.kategori,
          is_available: item.aktif !== false,
          original_price: item.harga,
        }));

        set({ produk: formattedProducts });
        return {
          success: true,
          data: formattedProducts,
          message: data.message
        };
      } else {
        throw new Error(data.message || 'Gagal mengambil data produk');
      }
    } catch (error) {
      console.error('Error fetching all products:', error);
      return {
        success: false,
        data: [],
        message: error.message,
        error: error
      };
    }
  },

  /**
   * Fetch semua kategori dari backend
   */
  fetchCategories: async () => {
    try {
      const baseURL = get().getBaseURL();
      const response = await fetch(`${baseURL}/api/v1/produk/kategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Format categories dari Laravel (array of strings)
        const formattedCategories = data.data.map((categoryName, index) => ({
          id: index + 1,
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
          description: get().generateCategoryDescription(categoryName),
          color: get().generateCategoryColor(categoryName),
          type: get().determineCategoryType(categoryName)
        }));
        
        return {
          success: true,
          data: formattedCategories,
          message: data.message
        };
      } else {
        throw new Error(data.message || 'Gagal mengambil data kategori');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        success: false,
        data: [],
        message: error.message,
        error: error
      };
    }
  },

  /**
   * Determine category type untuk styling
   */
  determineCategoryType: (categoryName) => {
    const lowerName = categoryName.toLowerCase();
    
    if (lowerName.includes('minuman') || lowerName.includes('drink') || 
        lowerName.includes('jus') || lowerName.includes('es')) {
      return 'drinks';
    }
    
    if (lowerName.includes('kremes') || lowerName.includes('geprek') || 
        lowerName.includes('sambal') || lowerName.includes('indonesia')) {
      return 'indonesian';
    }
    
    return 'american'; // default
  },

  /**
   * Load semua data menu dengan dynamic categories
   */
  loadAllMenus: async () => {
    set({ loading: true, error: null });
    try {
      console.log('Starting to load all menus...');
      
      // Fetch products dulu
      const productsResult = await get().fetchAllProducts();
      
      if (productsResult.success && productsResult.data.length > 0) {
        console.log('Successfully fetched products:', productsResult.data);
        
        // Group products by kategori
        const groupedData = {};
        const uniqueCategories = new Set();
        
        productsResult.data.forEach(product => {
          if (product.kategori) {
            uniqueCategories.add(product.kategori);
            
            if (!groupedData[product.kategori]) {
              groupedData[product.kategori] = [];
            }
            groupedData[product.kategori].push(product);
          }
        });

        // Create categories from unique product categories
        const categoriesArray = Array.from(uniqueCategories).map((catName, index) => ({
          id: index + 1,
          name: catName,
          slug: catName.toLowerCase().replace(/\s+/g, '-'),
          description: get().generateCategoryDescription(catName),
          color: get().generateCategoryColor(catName),
          type: get().determineCategoryType(catName)
        }));

        set({ 
          menuData: groupedData,
          categories: categoriesArray,
          loading: false 
        });
        
        return {
          success: true,
          data: groupedData,
          categories: categoriesArray,
          message: 'Data menu berhasil dimuat dari database'
        };
      } else {
        // Fallback ke data dummy
        console.log('No products found, using default data');
        const defaultData = get().getDefaultMenuData();
        
        set({ 
          menuData: defaultData.menuData,
          categories: defaultData.categories,
          loading: false 
        });
        
        return {
          success: true,
          data: defaultData.menuData,
          categories: defaultData.categories,
          message: 'Menggunakan data default'
        };
      }
    } catch (error) {
      console.error('Error loading menus:', error);
      const errorMessage = 'Terjadi kesalahan saat memuat menu';
      set({ 
        error: errorMessage,
        loading: false 
      });
      return {
        success: false,
        data: {},
        message: errorMessage,
        error: error
      };
    }
  },

  /**
   * Generate color berdasarkan nama kategori
   */
  generateCategoryColor: (categoryName) => {
    const colorMap = {
      'ayam': 'red',
      'chicken': 'red',
      'crispy': 'red',
      'original': 'red',
      'paket': 'yellow',
      'package': 'yellow',
      'spesial': 'yellow',
      'special': 'yellow',
      'minuman': 'blue',
      'drink': 'blue',
      'beverage': 'blue',
      'snack': 'orange',
      'dessert': 'orange',
      'cemilan': 'orange',
      'keluarga': 'purple',
      'family': 'purple',
      'sarapan': 'green',
      'breakfast': 'green',
      'kremes': 'amber',
      'geprek': 'amber',
      'keju': 'yellow',
      'cheese': 'yellow',
      'blackpepper': 'gray',
      'lada': 'gray'
    };
    
    const lowerName = categoryName.toLowerCase();
    for (const [key, color] of Object.entries(colorMap)) {
      if (lowerName.includes(key)) {
        return color;
      }
    }
    
    // Random color untuk kategori baru
    const defaultColors = ['red', 'yellow', 'blue', 'orange', 'purple', 'green', 'amber', 'cyan'];
    return defaultColors[Math.floor(Math.random() * defaultColors.length)];
  },

  /**
   * Generate description berdasarkan kategori
   */
  generateCategoryDescription: (categoryName) => {
    const descriptions = {
      'ayam': 'Nikmati kelezatan ayam crispy dengan kualitas terbaik',
      'minuman': 'Segarkan hari dengan minuman terbaik pilihan',
      'paket': 'Paket lengkap dengan harga hemat dan spesial',
      'snack': 'Camilan lezat untuk teman santai Anda',
      'keluarga': 'Paket hemat untuk kebahagiaan keluarga',
      'sarapan': 'Menu spesial untuk memulai hari',
      'kremes': 'Ayam kremes dengan cita rasa tradisional',
      'geprek': 'Ayam geprek dengan sambal pedas menggoda',
      'default': `Nikmati berbagai pilihan ${categoryName.toLowerCase()} terbaik`
    };
    
    const lowerName = categoryName.toLowerCase();
    for (const [key, desc] of Object.entries(descriptions)) {
      if (lowerName.includes(key)) {
        return desc;
      }
    }
    
    return descriptions.default;
  },

  /**
   * Get default menu data untuk fallback
   */
  getDefaultMenuData: () => {
    const categories = [
      {
        id: 1,
        name: 'Ayam Crispy',
        slug: 'ayam-crispy',
        description: 'Nikmati kelezatan ayam crispy dengan kualitas terbaik',
        color: 'red',
        type: 'american'
      },
      {
        id: 2,
        name: 'Paket Spesial',
        slug: 'paket-spesial',
        description: 'Paket lengkap dengan harga spesial',
        color: 'yellow',
        type: 'american'
      }
    ];
    
    const menuData = {
      'Ayam Crispy': [
        {
          id: 1,
          name: 'Ayam Crispy Original',
          description: 'Ayam crispy dengan bumbu original',
          price: 'Rp 15.000',
          image: '/src/assets/menu-placeholder.png',
          kategori: 'Ayam Crispy',
          is_available: true
        }
      ]
    };
    
    return { categories, menuData };
  },

  /**
   * Modal functions
   */
  openModal: (product) => {
    console.log("Opening modal for:", product.name);
    set({ 
      selectedProduct: product,
      isModalOpen: true 
    });
  },

  closeModal: () => {
    set({ 
      isModalOpen: false,
      selectedProduct: null 
    });
  },

  /**
   * Format harga ke Rupiah
   */
  formatHarga: (harga) => {
    if (!harga) return 'Rp 0';
    
    if (typeof harga === 'string' && harga.includes('Rp')) {
      return harga;
    }
    
    const numericHarga = typeof harga === 'string' ? parseFloat(harga) : harga;
    
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numericHarga);
  },

  /**
   * Get image URL lengkap
   */
  getImageUrl: (image) => {
    if (!image) return '/src/assets/menu-placeholder.png';
    if (image.startsWith('http') || image.startsWith('/')) return image;
    
    const baseURL = get().getBaseURL();
    return `${baseURL}/storage/${image}`;
  },

  /**
   * Handle image error
   */
  handleImageError: (event) => {
    event.target.src = '/src/assets/menu-placeholder.png';
    event.target.onerror = null;
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Reset state
   */
  reset: () => {
    set({
      produk: [],
      categories: [],
      menuData: {},
      loading: false,
      error: null,
      selectedProduct: null,
      isModalOpen: false
    });
  }
}));

export default MenuController;