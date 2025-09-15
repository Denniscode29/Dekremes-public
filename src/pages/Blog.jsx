import { useState } from "react";
import { 
  Calendar, 
  User, 
  Clock,
  Search,
  Heart,
  Bookmark,
  Utensils,
  ChefHat,
  Users,
  Award,
  Clock4,
  Sparkles
} from "lucide-react";

export default function FoodBlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const blogPosts = [
    {
      id: 1,
      title: "Rahasia Kremes Renyah ala DeKremes yang Bikin Ketagihan",
      excerpt: "Temukan rahasia di balik kremes super renyah kami yang menjadi favorit pelanggan. Dari pemilihan bahan hingga teknik menggoreng yang tepat...",
      author: "Chef DeKremes",
      date: "15 September 2025",
      readTime: "6 min read",
      category: "Resep",
      image: "src/assets/blog/kremes.jpg",
      likes: 89,
      shares: 42
    },
    {
      id: 2,
      title: "5 Tips Memilih Ayam Berkualitas untuk Crispy yang Sempurna",
      excerpt: "Bagaimana memilih ayam terbaik untuk hasil gorengan yang crispy di luar dan juicy di dalam. Panduan lengkap untuk Anda...",
      author: "Tim Dapur",
      date: "12 September 2025",
      readTime: "5 min read",
      category: "Tips",
      image: "src/assets/blog/ayam.jpg",
      likes: 76,
      shares: 38
    },
    {
      id: 3,
      title: "Sejarah DeKremes & Crispy: Dari Keluarga ke Meja Makan Anda",
      excerpt: "Perjalanan DeKremes dari resep keluarga turun-temurun hingga menjadi favorit banyak orang. Cerita di balik kelezatan kami...",
      author: "Pendiri DeKremes",
      date: "10 September 2025",
      readTime: "8 min read",
      category: "Cerita Kami",
      image: "src/assets/blog/sejarah.jpg",
      likes: 124,
      shares: 67
    },
    {
      id: 4,
      title: "Menu Terbaru: Chicken Potato Sauce, Perpaduan Lezat Ayam Crispy dan Kentang",
      excerpt: "Perkenalan menu terbaru kami yang memadukan ayam crispy terbaik dengan saus kentang spesial. Sudah coba?",
      author: "Tim Inovasi",
      date: "8 September 2025",
      readTime: "4 min read",
      category: "Menu Baru",
      image: "src/assets/blog/potato-sauce.jpg",
      likes: 95,
      shares: 51
    },
    {
      id: 5,
      title: "Teknik Menggoreng yang Tepat untuk Hasil Crispy Tahan Lama",
      excerpt: "Rahasia menjaga kerenyahan ayam crispy tetap optimal meski sudah beberapa jam dibuat. Tips dari koki profesional kami...",
      author: "Koki Head",
      date: "5 September 2025",
      readTime: "7 min read",
      category: "Teknik",
      image: "src/assets/blog/teknik.jpg",
      likes: 112,
      shares: 63
    },
    {
      id: 6,
      title: "Cara Membuat Saus Spesial DeKremes Versi Rumahan",
      excerpt: "Ingin mencoba membuat saus spesial DeKremes di rumah? Berikut resep rahasianya yang bisa Anda coba...",
      author: "Chef DeKremes",
      date: "3 September 2025",
      readTime: "9 min read",
      category: "Resep",
      image: "src/assets/blog/saus.jpg",
      likes: 143,
      shares: 78
    },
    {
      id: 7,
      title: "Acara Spesial Ulang Tahun DeKremes: Diskon 25% untuk Semua Menu",
      excerpt: "Rayakan hari jadi ke-3 DeKremes dengan promo spesial 25% untuk semua menu. Berlaku hingga akhir bulan...",
      author: "Tim Marketing",
      date: "1 September 2025",
      readTime: "3 min read",
      category: "Promo",
      image: "src/assets/blog/promo.jpg",
      likes: 201,
      shares: 155
    },
    {
      id: 8,
      title: "Behind The Scene: Proses Pembuatan Ayam Crispy DeKremes",
      excerpt: "Jelajahi dapur kami dan lihat bagaimana setiap potong ayam disiapkan dengan standar kualitas tertinggi...",
      author: "Tim Produksi",
      date: "29 Agustus 2025",
      readTime: "6 min read",
      category: "Cerita Kami",
      image: "src/assets/blog/proses.jpg",
      likes: 167,
      shares: 92
    },
    {
      id: 9,
      title: "Pandangan Pelanggan: Testimoni Terbaik Bulan Ini",
      excerpt: "Kumpulan testimoni terbaik dari pelanggan setia DeKremes. Cerita mereka tentang pengalaman menikmati hidangan kami...",
      author: "Tim Layanan",
      date: "25 Agustus 2025",
      readTime: "5 min read",
      category: "Testimoni",
      image: "src/assets/blog/testimoni.jpg",
      likes: 98,
      shares: 45
    }
  ];

  const categories = [
    { name: "Semua", count: blogPosts.length, icon: <Utensils className="w-4 h-4" /> },
    { name: "Resep", count: blogPosts.filter(post => post.category === "Resep").length, icon: <ChefHat className="w-4 h-4" /> },
    { name: "Tips", count: blogPosts.filter(post => post.category === "Tips").length, icon: <Sparkles className="w-4 h-4" /> },
    { name: "Menu Baru", count: blogPosts.filter(post => post.category === "Menu Baru").length, icon: <Award className="w-4 h-4" /> },
    { name: "Cerita Kami", count: blogPosts.filter(post => post.category === "Cerita Kami").length, icon: <Users className="w-4 h-4" /> },
    { name: "Promo", count: blogPosts.filter(post => post.category === "Promo").length, icon: <Clock4 className="w-4 h-4" /> }
  ];

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "Semua" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Header Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <img
          src="src/assets/chicken1.jpg"
          alt="DeKremes Blog Header"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Blog DeKremes
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Temukan resep rahasia, tips memasak, cerita behind the scene, dan informasi terbaru seputar DeKremes & Crispy.
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-[#FFF5CC] py-12 px-6 md:px-20">
        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari resep atau artikel..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B80002]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center w-full md:w-1/2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    activeCategory === category.name
                      ? "bg-[#B80002] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveCategory(category.name)}
                >
                  {category.icon}
                  {category.name} 
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    className="h-64 w-full object-cover md:h-full" 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title} 
                  />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="px-3 py-1 bg-[#B80002] text-white text-xs font-semibold rounded-full">
                      {filteredPosts[0].category}
                    </span>
                    <span className="ml-3 text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {filteredPosts[0].readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-2" />
                      {filteredPosts[0].author}
                    </div>
                    <button className="px-4 py-2 bg-[#B80002] text-white rounded-lg text-sm font-medium hover:bg-[#a00002] transition duration-300">
                      Baca Selengkapnya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPosts.slice(1).map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative">
                  <img 
                    className="h-48 w-full object-cover" 
                    src={post.image} 
                    alt={post.title} 
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#B80002] text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{post.readTime}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center text-gray-500 hover:text-[#B80002]">
                        <Heart className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="text-gray-500 hover:text-[#B80002]">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <button className="mt-4 w-full py-2 bg-[#B80002] text-white rounded-lg text-sm font-medium hover:bg-[#a00002] transition duration-300">
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Tidak ada artikel yang ditemukan</h3>
            <p className="text-gray-600 mt-2">Coba kata kunci pencarian lain atau pilih kategori berbeda</p>
          </div>
        )}
      </div>
    </>
  );
}