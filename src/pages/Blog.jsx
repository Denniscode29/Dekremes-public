import { useState } from "react";
import { 
  Calendar, 
  User, 
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Heart,
  Share2,
  Bookmark
} from "lucide-react";

export default function FoodBlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const postsPerPage = 6;

  const blogPosts = [
    {
      id: 1,
      title: "Resep Rahasia Saus Spaghetti ala Restoran Italia",
      excerpt: "Temukan rahasia membuat saus spaghetti yang lezat dan autentik seperti di restoran Italia terbaik...",
      author: "Chef Marco",
      date: "15 September 2025",
      readTime: "8 min read",
      category: "Resep",
      image: "/spaghetti.jpg",
      likes: 42,
      shares: 18
    },
    {
      id: 2,
      title: "5 Bahan Makanan yang Wajib Ada di Dapur Anda",
      excerpt: "Simpan selalu bahan-bahan ini di dapur untuk membuat masakan lezat dalam waktu singkat...",
      author: "Tim Dapur",
      date: "12 September 2025",
      readTime: "5 min read",
      category: "Tips",
      image: "/dapur.jpg",
      likes: 37,
      shares: 22
    },
    {
      id: 3,
      title: "Sejarah dan Cara Menikmati Sushi yang Benar",
      excerpt: "Pelajari sejarah sushi dan etika yang benar dalam menikmati hidangan khas Jepang ini...",
      author: "Food Historian",
      date: "10 September 2025",
      readTime: "10 min read",
      category: "Kuliner",
      image: "/sushi.jpg",
      likes: 56,
      shares: 30
    },
    {
      id: 4,
      title: "Memilih Minyak Goreng Terbaik untuk Kesehatan",
      excerpt: "Panduan lengkap memilih minyak goreng yang sehat tanpa mengorbankan cita rasa masakan...",
      author: "Nutrition Expert",
      date: "8 September 2025",
      readTime: "7 min read",
      category: "Kesehatan",
      image: "/minyak.jpg",
      likes: 29,
      shares: 15
    },
    {
      id: 5,
      title: "Teknik Memanggang Daging yang Sempurna",
      excerpt: "Rahasia mendapatkan tekstur dan cita rasa daging yang sempurna setiap kali memasak...",
      author: "Grill Master",
      date: "5 September 2025",
      readTime: "9 min read",
      category: "Teknik",
      image: "/daging.jpg",
      likes: 63,
      shares: 28
    },
    {
      id: 6,
      title: "Menu Dessert Mudah untuk Pemula",
      excerpt: "Coba resep dessert lezat ini yang bisa dibuat bahkan oleh pemula sekalipun...",
      author: "Pastry Chef",
      date: "3 September 2025",
      readTime: "6 min read",
      category: "Resep",
      image: "/dessert.jpg",
      likes: 48,
      shares: 35
    },
    {
      id: 7,
      title: "Trend Makanan 2025 yang Patut Dicoba",
      excerpt: "Eksplorasi trend makanan terbaru yang akan mendominasi dunia kuliner tahun ini...",
      author: "Food Trend Analyst",
      date: "1 September 2025",
      readTime: "8 min read",
      category: "Trend",
      image: "/trend.jpg",
      likes: 51,
      shares: 40
    },
    {
      id: 8,
      title: "Memahami Berbagai Jenis Kopi dan Penyajiannya",
      excerpt: "Panduan komprehensif untuk memahami karakteristik berbagai jenis kopi dan cara menyajikannya...",
      author: "Barista Professional",
      date: "29 Agustus 2025",
      readTime: "11 min read",
      category: "Minuman",
      image: "/kopi.jpg",
      likes: 67,
      shares: 45
    },
    {
      id: 9,
      title: "Mengurangi Food Waste di Dapur Rumah Tangga",
      excerpt: "Tips praktis mengurangi limbah makanan dan memanfaatkan sisa bahan dengan kreatif...",
      author: "Eco Chef",
      date: "25 Agustus 2025",
      readTime: "7 min read",
      category: "Tips",
      image: "/foodwaste.jpg",
      likes: 39,
      shares: 52
    }
  ];

  const categories = [
    { name: "Semua", count: blogPosts.length },
    { name: "Resep", count: blogPosts.filter(post => post.category === "Resep").length },
    { name: "Tips", count: blogPosts.filter(post => post.category === "Tips").length },
    { name: "Kesehatan", count: blogPosts.filter(post => post.category === "Kesehatan").length },
    { name: "Teknik", count: blogPosts.filter(post => post.category === "Teknik").length },
    { name: "Minuman", count: blogPosts.filter(post => post.category === "Minuman").length }
  ];

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "Semua" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5CC] py-12 px-6 md:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#B80002] transition-all duration-300 hover:scale-105">
          Blog Kuliner Kami
        </h1>
        <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
          Temukan resep, tips memasak, dan informasi terbaru seputar dunia kuliner. 
          Jadikan setiap masakan Anda sebagai pengalaman yang menyenangkan.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari resep atau artikel..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B80002]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center w-full md:w-1/2">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.name
                    ? "bg-[#B80002] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => {
                  setActiveCategory(category.name);
                  setCurrentPage(1);
                }}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      {currentPosts.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.map((post) => (
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
                    <span className="px-2 py-1 bg-[#B80002] text-white text-xs font-semibold rounded">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mb-12">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400' : 'text-[#B80002] hover:bg-[#FFF0F0]'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentPage === number
                      ? 'bg-[#B80002] text-white'
                      : 'text-gray-700 hover:bg-[#FFF0F0]'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400' : 'text-[#B80002] hover:bg-[#FFF0F0]'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl shadow-md">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Tidak ada artikel yang ditemukan</h3>
          <p className="text-gray-600 mt-2">Coba kata kunci pencarian lain atau pilih kategori berbeda</p>
        </div>
      )}

      {/* Newsletter Subscription */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#B80002] to-[#FF5252] rounded-2xl shadow-lg p-8 mb-12 text-white">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h3 className="text-2xl font-bold mb-2">Berlangganan Newsletter Kami</h3>
            <p className="opacity-90">Dapatkan resep eksklusif dan tips memasak langsung di inbox Anda</p>
          </div>
          <div className="flex-1 max-w-md">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Alamat email Anda" 
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-[#FFF5CC] text-[#B80002] font-semibold px-6 py-3 rounded-r-lg hover:bg-[#FFE999] transition duration-300">
                Berlangganan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}